package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/wapcv/internal/delivery/http/handler"
	pkgauth "github.com/example/wapcv/pkg/auth"
)

func RegisterAuthRoutes(router fiber.Router, h *handler.AuthHandler, jwtCfg *pkgauth.Config) {
	auth := router.Group("/auth")
	auth.Post("/register", h.Register)
	auth.Post("/login", h.Login)
	auth.Get("/me", pkgauth.Middleware(jwtCfg), h.Me)
}
