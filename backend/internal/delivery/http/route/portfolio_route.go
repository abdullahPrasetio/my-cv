package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/wapcv/internal/delivery/http/handler"
)

func RegisterPortfolioRoutes(router fiber.Router, h *handler.PortfolioHandler) {
	router.Get("/portfolio/:username", h.GetByUsername)
}
