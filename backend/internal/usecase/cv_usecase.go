package usecase

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"

	"github.com/example/cv-backend/internal/domain/entity"
	domainrepo "github.com/example/cv-backend/internal/domain/repository"
)

type CvUseCase interface {
	GetCV(ctx context.Context, userID uuid.UUID) (json.RawMessage, error)
	SaveCV(ctx context.Context, userID uuid.UUID, data json.RawMessage) error
}

type cvUseCase struct {
	repo domainrepo.CvRepository
}

func NewCvUseCase(repo domainrepo.CvRepository) CvUseCase {
	return &cvUseCase{repo: repo}
}

func (u *cvUseCase) GetCV(ctx context.Context, userID uuid.UUID) (json.RawMessage, error) {
	cv, err := u.repo.FindByUserID(ctx, userID)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return json.RawMessage("{}"), nil
	}
	if err != nil {
		return nil, fmt.Errorf("get cv: %w", err)
	}
	return json.RawMessage(cv.Data), nil
}

func (u *cvUseCase) SaveCV(ctx context.Context, userID uuid.UUID, data json.RawMessage) error {
	if !json.Valid(data) {
		return errors.New("invalid json")
	}
	cv := &entity.Cv{
		UserID: userID,
		Data:   datatypes.JSON(data),
	}
	return u.repo.Upsert(ctx, cv)
}
