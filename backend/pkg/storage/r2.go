package storage

import (
	"bytes"
	"context"
	"fmt"
	"path/filepath"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type R2Config struct {
	AccountID  string
	AccessKey  string
	SecretKey  string
	Bucket     string
	PublicURL  string
}

type R2Storage struct {
	client    *s3.Client
	bucket    string
	publicURL string
}

func NewR2Storage(cfg R2Config) (*R2Storage, error) {
	if cfg.AccountID == "" || cfg.AccessKey == "" || cfg.SecretKey == "" {
		return nil, fmt.Errorf("R2 credentials are required")
	}
	endpoint := fmt.Sprintf("https://%s.r2.cloudflarestorage.com", cfg.AccountID)
	client := s3.New(s3.Options{
		Region:      "auto",
		BaseEndpoint: aws.String(endpoint),
		Credentials: aws.NewCredentialsCache(credentials.NewStaticCredentialsProvider(
			cfg.AccessKey, cfg.SecretKey, "",
		)),
	})
	return &R2Storage{
		client:    client,
		bucket:    cfg.Bucket,
		publicURL: cfg.PublicURL,
	}, nil
}

// Delete removes an object from R2 by its public URL.
func (r *R2Storage) Delete(ctx context.Context, publicURL string) error {
	if publicURL == "" || r.publicURL == "" {
		return nil
	}
	prefix := r.publicURL + "/"
	if !strings.HasPrefix(publicURL, prefix) {
		return nil
	}
	key := strings.TrimPrefix(publicURL, prefix)
	if i := strings.Index(key, "?"); i != -1 {
		key = key[:i]
	}
	_, err := r.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(r.bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return fmt.Errorf("r2 delete: %w", err)
	}
	return nil
}

type UploadOptions struct {
	ContentDisposition string // e.g. "attachment; filename=\"resume.pdf\""
}

// Upload stores data in R2 under key and returns the public URL.
func (r *R2Storage) Upload(ctx context.Context, key string, data []byte, contentType string, opts ...UploadOptions) (string, error) {
	input := &s3.PutObjectInput{
		Bucket:      aws.String(r.bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(data),
		ContentType: aws.String(contentType),
	}
	if len(opts) > 0 && opts[0].ContentDisposition != "" {
		input.ContentDisposition = aws.String(opts[0].ContentDisposition)
	}
	_, err := r.client.PutObject(ctx, input)
	if err != nil {
		return "", fmt.Errorf("r2 upload: %w", err)
	}
	return fmt.Sprintf("%s/%s", r.publicURL, key), nil
}

// KeyFor returns a deterministic object key from a user ID, folder, and filename.
func KeyFor(userID, folder, filename string) string {
	return fmt.Sprintf("%s/%s/%s", userID, folder, filepath.Base(filename))
}
