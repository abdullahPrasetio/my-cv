package usecase

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/example/cv-backend/pkg/storage"
)

type UploadMediaRequest struct {
	Filename    string
	Data        []byte
	ContentType string
	Folder      string // "avatar" | "projects" | "resume"
}

type UploadMediaResponse struct {
	URL string `json:"url"`
}

type MediaUseCase interface {
	Upload(ctx context.Context, userID uuid.UUID, req *UploadMediaRequest) (*UploadMediaResponse, error)
}

type mediaUseCase struct {
	storage *storage.R2Storage
}

func NewMediaUseCase(s *storage.R2Storage) MediaUseCase {
	return &mediaUseCase{storage: s}
}

func (u *mediaUseCase) Upload(ctx context.Context, userID uuid.UUID, req *UploadMediaRequest) (*UploadMediaResponse, error) {
	key := storage.KeyFor(userID.String(), req.Folder, req.Filename)
	url, err := u.storage.Upload(ctx, key, req.Data, req.ContentType)
	if err != nil {
		return nil, fmt.Errorf("upload media: %w", err)
	}
	return &UploadMediaResponse{URL: url}, nil
}
