package db

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"github.com/example/wapcv/internal/domain/entity"
	domainrepo "github.com/example/wapcv/internal/domain/repository"
)

type cvRepository struct {
	db *gorm.DB
}

func NewCvRepository(db *gorm.DB) domainrepo.CvRepository {
	return &cvRepository{db: db}
}

func (r *cvRepository) FindByUserID(ctx context.Context, userID uuid.UUID) (*entity.Cv, error) {
	var e entity.Cv
	result := r.db.WithContext(ctx).First(&e, "user_id = ?", userID)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	if result.Error != nil {
		return nil, fmt.Errorf("find cv by user_id: %w", result.Error)
	}
	return &e, nil
}

func (r *cvRepository) Upsert(ctx context.Context, e *entity.Cv) error {
	if err := r.db.WithContext(ctx).
		Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "user_id"}},
			DoUpdates: clause.AssignmentColumns([]string{"data", "updated_at"}),
		}).
		Create(e).Error; err != nil {
		return fmt.Errorf("upsert cv: %w", err)
	}
	return nil
}
