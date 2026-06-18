package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/delivery/http/handler"
	pkgauth "github.com/example/cv-backend/pkg/auth"
)

func RegisterCvRoutes(router fiber.Router, h *handler.CvHandler, jwtCfg *pkgauth.Config) {
	cv := router.Group("/cv", pkgauth.Middleware(jwtCfg))
	cv.Get("/", h.GetCV)
	cv.Put("/", h.SaveCV)
}
