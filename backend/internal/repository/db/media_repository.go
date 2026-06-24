package db

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/example/wapcv/internal/domain/entity"
	domainrepo "github.com/example/wapcv/internal/domain/repository"
)

type mediaRepository struct {
	db *gorm.DB
}

// NewMediaRepository creates a GORM-backed MediaRepository.
func NewMediaRepository(db *gorm.DB) domainrepo.MediaRepository {
	return &mediaRepository{db: db}
}

func (r *mediaRepository) FindByID(ctx context.Context, id uuid.UUID) (*entity.Media, error) {
	var e entity.Media
	result := r.db.WithContext(ctx).First(&e, "id = ?", id)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, gorm.ErrRecordNotFound
	}
	if result.Error != nil {
		return nil, fmt.Errorf("find media by id: %w", result.Error)
	}
	return &e, nil
}

func (r *mediaRepository) FindAll(ctx context.Context) ([]*entity.Media, error) {
	var items []*entity.Media
	if err := r.db.WithContext(ctx).Find(&items).Error; err != nil {
		return nil, fmt.Errorf("find all medias: %w", err)
	}
	return items, nil
}

func (r *mediaRepository) Create(ctx context.Context, e *entity.Media) error {
	if err := r.db.WithContext(ctx).Create(e).Error; err != nil {
		return fmt.Errorf("create media: %w", err)
	}
	return nil
}

func (r *mediaRepository) Update(ctx context.Context, e *entity.Media) error {
	if err := r.db.WithContext(ctx).Save(e).Error; err != nil {
		return fmt.Errorf("update media: %w", err)
	}
	return nil
}

func (r *mediaRepository) Delete(ctx context.Context, id uuid.UUID) error {
	if err := r.db.WithContext(ctx).Delete(&entity.Media{}, "id = ?", id).Error; err != nil {
		return fmt.Errorf("delete media: %w", err)
	}
	return nil
}
