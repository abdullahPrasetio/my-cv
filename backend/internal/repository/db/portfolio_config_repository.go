package db

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"github.com/example/cv-backend/internal/domain/entity"
	domainrepo "github.com/example/cv-backend/internal/domain/repository"
)

type portfolioConfigRepository struct {
	db *gorm.DB
}

func NewPortfolioConfigRepository(db *gorm.DB) domainrepo.PortfolioConfigRepository {
	return &portfolioConfigRepository{db: db}
}

func (r *portfolioConfigRepository) FindByUserID(ctx context.Context, userID uuid.UUID) (*entity.PortfolioConfig, error) {
	var e entity.PortfolioConfig
	result := r.db.WithContext(ctx).First(&e, "user_id = ?", userID)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	if result.Error != nil {
		return nil, fmt.Errorf("find portfolio_config by user_id: %w", result.Error)
	}
	return &e, nil
}

func (r *portfolioConfigRepository) Upsert(ctx context.Context, e *entity.PortfolioConfig) error {
	if err := r.db.WithContext(ctx).
		Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "user_id"}},
			DoUpdates: clause.AssignmentColumns([]string{"default_version", "updated_at"}),
		}).
		Create(e).Error; err != nil {
		return fmt.Errorf("upsert portfolio_config: %w", err)
	}
	return nil
}
