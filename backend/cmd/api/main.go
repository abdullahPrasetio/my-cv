package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"

	"github.com/example/wapcv/config"
	"github.com/example/wapcv/internal/delivery/http/handler"
	mw "github.com/example/wapcv/internal/delivery/http/middleware"
	"github.com/example/wapcv/internal/delivery/http/route"
	"github.com/example/wapcv/internal/domain/entity"
	dbrepo "github.com/example/wapcv/internal/repository/db"
	"github.com/example/wapcv/internal/usecase"
	pkgauth "github.com/example/wapcv/pkg/auth"
	"github.com/example/wapcv/pkg/database"
	applogger "github.com/example/wapcv/pkg/logger"
	"github.com/example/wapcv/pkg/observability"
	"github.com/example/wapcv/pkg/storage"
	"github.com/example/wapcv/pkg/validator"
)

const version = "1.0.0"

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to load config")
	}

	applogger.Setup(cfg.App.Env, cfg.Log.Level, cfg.Log.FilePath, cfg.Log.ToFile, cfg.App.Name)

	if err := applogger.SetupSinks(applogger.SinkConfig{
		Dir:        cfg.Log.Dir,
		Rotation:   cfg.Log.Rotation,
		MaxAgeDays: cfg.Log.MaxAgeDays,
		Console:    cfg.App.Env != "production",
	}); err != nil {
		log.Fatal().Err(err).Msg("failed to setup log sinks")
	}

	log.Info().Str("version", version).Str("env", cfg.App.Env).Msg("starting cv-backend")

	obsProvider, err := observability.New(context.Background(), &cfg.Observability, cfg.App.Name, version, cfg.App.Env)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to setup observability")
	}

	db, err := database.NewConnection(&cfg.DB)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}
	if err := obsProvider.InstrumentGORM(db); err != nil {
		log.Warn().Err(err).Msg("gorm instrumentation failed")
	}
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get underlying sql.DB")
	}

	if cfg.DB.AutoMigrate {
		if err := db.AutoMigrate(
			&entity.User{},
			&entity.Cv{},
			&entity.PortfolioConfig{},
		); err != nil {
			log.Fatal().Err(err).Msg("auto-migrate failed")
		}
	}

	// JWT config
	if len(cfg.JWT.Secret) < 32 {
		log.Fatal().Msg("JWT_SECRET must be at least 32 characters — set it in .env or environment")
	}
	jwtCfg := &pkgauth.Config{
		Secret:   cfg.JWT.Secret,
		Issuer:   cfg.JWT.Issuer,
		Audience: cfg.JWT.Audience,
	}
	if d, err := time.ParseDuration(cfg.JWT.Expiry); err == nil {
		jwtCfg.Expiry = d
	}

	// Repositories
	userRepo := dbrepo.NewUserRepository(db)
	cvRepo := dbrepo.NewCvRepository(db)
	configRepo := dbrepo.NewPortfolioConfigRepository(db)

	// Usecases
	authUC := usecase.NewAuthUseCase(userRepo, jwtCfg)
	cvUC := usecase.NewCvUseCase(cvRepo)
	configUC := usecase.NewPortfolioConfigUseCase(configRepo)

	// R2 storage (optional — skip if not configured)
	var mediaUC usecase.MediaUseCase
	if cfg.R2.AccountID != "" {
		r2, err := storage.NewR2Storage(storage.R2Config{
			AccountID: cfg.R2.AccountID,
			AccessKey: cfg.R2.AccessKey,
			SecretKey: cfg.R2.SecretKey,
			Bucket:    cfg.R2.Bucket,
			PublicURL: cfg.R2.PublicURL,
		})
		if err != nil {
			log.Fatal().Err(err).Msg("failed to init R2 storage")
		}
		mediaUC = usecase.NewMediaUseCase(r2)
	}

	val := validator.New()
	startTime := time.Now()

	// Handlers
	authHandler := handler.NewAuthHandler(authUC, val)
	cvHandler := handler.NewCvHandler(cvUC)
	configHandler := handler.NewPortfolioConfigHandler(configUC, val)
	portfolioHandler := handler.NewPortfolioHandler(userRepo, cvUC, configUC)
	healthHandler := handler.NewHealthHandler(sqlDB, startTime, version)

	var mediaHandler *handler.MediaHandler
	if mediaUC != nil {
		mediaHandler = handler.NewMediaHandler(mediaUC)
	}

	app := fiber.New(fiber.Config{
		AppName:               cfg.App.Name,
		BodyLimit:             10 * 1024 * 1024, // 10MB for file uploads
		ReadTimeout:           10 * time.Second,
		WriteTimeout:          10 * time.Second,
		IdleTimeout:           120 * time.Second,
		DisableStartupMessage: true,
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"status":  false,
				"message": http.StatusText(code),
			})
		},
	})

	app.Use(mw.Recover())
	app.Use(mw.RequestID())
	app.Use(mw.SecurityHeaders())
	app.Use(mw.RateLimiter())
	app.Use(mw.RequestLogger())
	app.Use(mw.CORS(cfg.App.CORSAllowedOrigins))
	app.Use(obsProvider.HTTPMiddleware())
	app.Use(observability.MetricsMiddleware())
	app.Use(mw.AccessLog(mw.AccessLogOptions{
		BodyMaxBytes:  cfg.Log.BodyMaxBytes,
		CaptureBodies: cfg.Log.HTTPBodies,
	}))

	route.Setup(app, authHandler, cvHandler, configHandler, mediaHandler, portfolioHandler, healthHandler, jwtCfg, cfg.App.Env)

	go func() {
		addr := ":" + cfg.App.Port
		log.Info().Str("addr", addr).Msg("http server listening")
		if err := app.Listen(addr); err != nil {
			log.Fatal().Err(err).Msg("http server error")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	log.Info().Msg("shutdown signal received")
	shutCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := app.ShutdownWithContext(shutCtx); err != nil {
		log.Error().Err(err).Msg("http server forced shutdown")
	}
	if err := obsProvider.Shutdown(shutCtx); err != nil {
		log.Error().Err(err).Msg("observability provider shutdown error")
	}
	sqlDB.Close() //nolint:errcheck

	log.Info().Msg("shutdown complete")
}
