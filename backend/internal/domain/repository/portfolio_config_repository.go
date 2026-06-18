package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/example/cv-backend/internal/domain/entity"
)

// PortfolioConfigRepository defines persistence operations for the portfolio_config domain.
type PortfolioConfigRepository interface {
	FindByUserID(ctx context.Context, userID uuid.UUID) (*entity.PortfolioConfig, error)
	Upsert(ctx context.Context, e *entity.PortfolioConfig) error
}
