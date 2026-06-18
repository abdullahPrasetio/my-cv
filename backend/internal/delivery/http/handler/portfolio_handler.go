package handler

import (
	"encoding/json"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/example/cv-backend/internal/usecase"
	domainrepo "github.com/example/cv-backend/internal/domain/repository"
	"github.com/example/cv-backend/pkg/response"
)

type PortfolioHandler struct {
	userRepo   domainrepo.UserRepository
	cvUC       usecase.CvUseCase
	configUC   usecase.PortfolioConfigUseCase
}

func NewPortfolioHandler(
	userRepo domainrepo.UserRepository,
	cvUC usecase.CvUseCase,
	configUC usecase.PortfolioConfigUseCase,
) *PortfolioHandler {
	return &PortfolioHandler{userRepo: userRepo, cvUC: cvUC, configUC: configUC}
}

func (h *PortfolioHandler) GetByUsername(c *fiber.Ctx) error {
	username := c.Params("username")
	user, err := h.userRepo.FindByUsername(c.UserContext(), username)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return response.NotFound(c, "portfolio not found")
	}
	if err != nil {
		return response.InternalError(c)
	}

	userID := user.ID
	cvData, err := h.cvUC.GetCV(c.UserContext(), userID)
	if err != nil {
		return response.InternalError(c)
	}

	cfg, err := h.configUC.GetConfig(c.UserContext(), userID)
	if err != nil {
		return response.InternalError(c)
	}

	return c.JSON(fiber.Map{
		"status":  true,
		"message": "portfolio retrieved",
		"data": fiber.Map{
			"user":           fiber.Map{"id": user.ID, "username": user.Username, "name": user.Name},
			"cv":             json.RawMessage(cvData),
			"default_version": cfg.DefaultVersion,
		},
	})
}

// parseUUIDFromClaims is an alias used by cv and config handlers in the same package.
// The actual implementation is claimsUserID in cv_handler.go.
var _ = uuid.Nil
