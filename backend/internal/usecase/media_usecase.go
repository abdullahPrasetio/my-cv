package usecase

import (
	"context"
	"fmt"
	"path/filepath"
	"time"

	"github.com/google/uuid"

	"github.com/example/wapcv/pkg/storage"
)

type UploadMediaRequest struct {
	Filename    string
	Data        []byte
	ContentType string
	Folder      string // "avatar" | "projects" | "resume"
	OldURL      string // public URL of old file to delete before uploading
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
	// delete old file for avatar and resume to avoid orphaned objects
	if req.OldURL != "" && (req.Folder == "avatar" || req.Folder == "resume") {
		_ = u.storage.Delete(ctx, req.OldURL)
	}

	filename := req.Filename
	if req.Folder == "avatar" || req.Folder == "resume" {
		ext := filepath.Ext(req.Filename)
		filename = fmt.Sprintf("%s_%d%s", req.Folder, time.Now().UnixMilli(), ext)
	}
	key := storage.KeyFor(userID.String(), req.Folder, filename)

	var opts storage.UploadOptions
	if req.Folder == "resume" {
		opts.ContentDisposition = fmt.Sprintf(`attachment; filename="%s"`, filepath.Base(req.Filename))
	}

	url, err := u.storage.Upload(ctx, key, req.Data, req.ContentType, opts)
	if err != nil {
		return nil, fmt.Errorf("upload media: %w", err)
	}
	return &UploadMediaResponse{URL: url}, nil
}
