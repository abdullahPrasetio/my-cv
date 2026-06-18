package storage

import (
	"bytes"
	"context"
	"fmt"
	"path/filepath"

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

// Upload stores data in R2 under key and returns the public URL.
func (r *R2Storage) Upload(ctx context.Context, key string, data []byte, contentType string) (string, error) {
	_, err := r.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(r.bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(data),
		ContentType: aws.String(contentType),
	})
	if err != nil {
		return "", fmt.Errorf("r2 upload: %w", err)
	}
	return fmt.Sprintf("%s/%s", r.publicURL, key), nil
}

// KeyFor returns a deterministic object key from a user ID, folder, and filename.
func KeyFor(userID, folder, filename string) string {
	return fmt.Sprintf("%s/%s/%s", userID, folder, filepath.Base(filename))
}
