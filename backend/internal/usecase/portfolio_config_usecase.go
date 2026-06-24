package usecase

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/example/wapcv/internal/domain/entity"
	domainrepo "github.com/example/wapcv/internal/domain/repository"
)

type SaveConfigRequest struct {
	DefaultVersion string `json:"default_version" validate:"required,oneof=v1 v2 v3 v4 v5 v6 v7 v8 v9 v10"`
}

type PortfolioConfigUseCase interface {
	GetConfig(ctx context.Context, userID uuid.UUID) (*entity.PortfolioConfig, error)
	SaveConfig(ctx context.Context, userID uuid.UUID, req *SaveConfigRequest) (*entity.PortfolioConfig, error)
}

type portfolioConfigUseCase struct {
	repo domainrepo.PortfolioConfigRepository
}

func NewPortfolioConfigUseCase(repo domainrepo.PortfolioConfigRepository) PortfolioConfigUseCase {
	return &portfolioConfigUseCase{repo: repo}
}

func (u *portfolioConfigUseCase) GetConfig(ctx context.Context, userID uuid.UUID) (*entity.PortfolioConfig, error) {
	cfg, err := u.repo.FindByUserID(ctx, userID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return &entity.PortfolioConfig{UserID: userID, DefaultVersion: "v1"}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("get config: %w", err)
	}
	return cfg, nil
}

func (u *portfolioConfigUseCase) SaveConfig(ctx context.Context, userID uuid.UUID, req *SaveConfigRequest) (*entity.PortfolioConfig, error) {
	cfg := &entity.PortfolioConfig{
		UserID:         userID,
		DefaultVersion: req.DefaultVersion,
	}
	if err := u.repo.Upsert(ctx, cfg); err != nil {
		return nil, fmt.Errorf("save config: %w", err)
	}
	return cfg, nil
}
