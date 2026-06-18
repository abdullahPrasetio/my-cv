package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/usecase"
	"github.com/example/cv-backend/pkg/response"
	"github.com/example/cv-backend/pkg/validator"
)

type PortfolioConfigHandler struct {
	uc  usecase.PortfolioConfigUseCase
	val *validator.Validator
}

func NewPortfolioConfigHandler(uc usecase.PortfolioConfigUseCase, val *validator.Validator) *PortfolioConfigHandler {
	return &PortfolioConfigHandler{uc: uc, val: val}
}

func (h *PortfolioConfigHandler) GetConfig(c *fiber.Ctx) error {
	userID, err := claimsUserID(c)
	if err != nil {
		return fiber.ErrUnauthorized
	}
	cfg, err := h.uc.GetConfig(c.UserContext(), userID)
	if err != nil {
		return response.InternalError(c)
	}
	return response.Success(c, "config retrieved", cfg)
}

func (h *PortfolioConfigHandler) SaveConfig(c *fiber.Ctx) error {
	userID, err := claimsUserID(c)
	if err != nil {
		return fiber.ErrUnauthorized
	}
	var req usecase.SaveConfigRequest
	if err := c.BodyParser(&req); err != nil {
		return response.BadRequest(c, "invalid request body")
	}
	if err := h.val.Validate(&req); err != nil {
		return response.BadRequest(c, err.Error())
	}
	cfg, err := h.uc.SaveConfig(c.UserContext(), userID, &req)
	if err != nil {
		return response.InternalError(c)
	}
	return response.Success(c, "config saved", cfg)
}
