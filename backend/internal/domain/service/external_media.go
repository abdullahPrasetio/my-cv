package service

import (
	"context"

	"github.com/example/cv-backend/internal/domain/entity"
)

// ExternalMediaService is the interface for fetching media data from another microservice.
// Implementation lives in pkg/httpclient/media_client.go.
type ExternalMediaService interface {
	GetMedia(ctx context.Context, id string) (*entity.Media, error)
}
