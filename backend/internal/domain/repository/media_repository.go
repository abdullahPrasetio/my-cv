package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/example/cv-backend/internal/domain/entity"
)

// MediaRepository defines persistence operations for the media domain.
// Implementation lives in internal/repository/postgres/.
type MediaRepository interface {
	FindByID(ctx context.Context, id uuid.UUID) (*entity.Media, error)
	FindAll(ctx context.Context) ([]*entity.Media, error)
	Create(ctx context.Context, e *entity.Media) error
	Update(ctx context.Context, e *entity.Media) error
	Delete(ctx context.Context, id uuid.UUID) error
}
