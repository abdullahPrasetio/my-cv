package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/delivery/http/handler"
	pkgauth "github.com/example/cv-backend/pkg/auth"
	"github.com/example/cv-backend/pkg/observability"
)

func Setup(
	app *fiber.App,
	authHandler *handler.AuthHandler,
	cvHandler *handler.CvHandler,
	configHandler *handler.PortfolioConfigHandler,
	mediaHandler *handler.MediaHandler,
	portfolioHandler *handler.PortfolioHandler,
	healthHandler *handler.HealthHandler,
	jwtCfg *pkgauth.Config,
	appEnv string,
) {
	app.Get("/", welcomeHandler(appEnv))
	app.Get("/health", healthHandler.Check)
	app.Get("/metrics", prodGuard(appEnv), observability.MetricsHandler())

	v1 := app.Group("/api/v1")
	RegisterAuthRoutes(v1, authHandler, jwtCfg)
	RegisterCvRoutes(v1, cvHandler, jwtCfg)
	RegisterPortfolioConfigRoutes(v1, configHandler, jwtCfg)
	RegisterMediaRoutes(v1, mediaHandler, jwtCfg)
	RegisterPortfolioRoutes(v1, portfolioHandler)
}

func prodGuard(appEnv string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		if appEnv == "production" {
			return fiber.ErrNotFound
		}
		return c.Next()
	}
}

func welcomeHandler(appEnv string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		links := fiber.Map{"health": "/health"}
		if appEnv != "production" {
			links["metrics"] = "/metrics"
		}
		return c.JSON(fiber.Map{
			"service": "cv-backend",
			"version": "1.0.0",
			"env":     appEnv,
			"links":   links,
		})
	}
}
