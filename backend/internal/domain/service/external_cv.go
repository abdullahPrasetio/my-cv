package service

import (
	"context"

	"github.com/example/cv-backend/internal/domain/entity"
)

// ExternalCvService is the interface for fetching cv data from another microservice.
// Implementation lives in pkg/httpclient/cv_client.go.
type ExternalCvService interface {
	GetCv(ctx context.Context, id string) (*entity.Cv, error)
}
