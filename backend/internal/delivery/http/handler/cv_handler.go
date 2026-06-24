package handler

import (
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"github.com/example/wapcv/internal/usecase"
	pkgauth "github.com/example/wapcv/pkg/auth"
	"github.com/example/wapcv/pkg/response"
)

type CvHandler struct {
	uc usecase.CvUseCase
}

func NewCvHandler(uc usecase.CvUseCase) *CvHandler {
	return &CvHandler{uc: uc}
}

func (h *CvHandler) GetCV(c *fiber.Ctx) error {
	userID, err := claimsUserID(c)
	if err != nil {
		return fiber.ErrUnauthorized
	}
	data, err := h.uc.GetCV(c.UserContext(), userID)
	if err != nil {
		return response.InternalError(c)
	}
	return c.JSON(fiber.Map{"status": true, "message": "cv retrieved", "data": json.RawMessage(data)})
}

func (h *CvHandler) SaveCV(c *fiber.Ctx) error {
	userID, err := claimsUserID(c)
	if err != nil {
		return fiber.ErrUnauthorized
	}
	body := c.Body()
	if len(body) == 0 {
		return response.BadRequest(c, "empty body")
	}
	if err := h.uc.SaveCV(c.UserContext(), userID, json.RawMessage(body)); err != nil {
		return response.BadRequest(c, fmt.Sprintf("save cv: %s", err.Error()))
	}
	return response.Success(c, "cv saved", nil)
}

func claimsUserID(c *fiber.Ctx) (uuid.UUID, error) {
	claims := pkgauth.GetClaims(c)
	if claims == nil {
		return uuid.Nil, fiber.ErrUnauthorized
	}
	return uuid.Parse(claims.Subject)
}
