package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/delivery/http/handler"
	pkgauth "github.com/example/cv-backend/pkg/auth"
)

func RegisterPortfolioConfigRoutes(router fiber.Router, h *handler.PortfolioConfigHandler, jwtCfg *pkgauth.Config) {
	cfg := router.Group("/config", pkgauth.Middleware(jwtCfg))
	cfg.Get("/", h.GetConfig)
	cfg.Put("/", h.SaveConfig)
}
