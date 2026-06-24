package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/example/wapcv/internal/domain/entity"
)

// CvRepository defines persistence operations for the cv domain.
type CvRepository interface {
	FindByUserID(ctx context.Context, userID uuid.UUID) (*entity.Cv, error)
	Upsert(ctx context.Context, e *entity.Cv) error
}
