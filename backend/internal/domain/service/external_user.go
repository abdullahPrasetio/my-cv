package service

import (
	"context"

	"github.com/example/cv-backend/internal/domain/entity"
)

type ExternalUserService interface {
	GetUser(ctx context.Context, id string) (*entity.User, error)
}
