package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/delivery/http/handler"
	pkgauth "github.com/example/cv-backend/pkg/auth"
)

func RegisterMediaRoutes(router fiber.Router, h *handler.MediaHandler, jwtCfg *pkgauth.Config) {
	media := router.Group("/media", pkgauth.Middleware(jwtCfg))
	media.Post("/upload", h.Upload)
}
