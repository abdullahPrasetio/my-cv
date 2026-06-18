package httpclient

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/example/cv-backend/internal/domain/entity"
)

// ErrMediaNotFound is returned when the remote service returns HTTP 404.
var ErrMediaNotFound = errors.New("media not found")

// MediaClient implements domain/service.ExternalMediaService by calling the
// remote media microservice over HTTP.
type MediaClient struct {
	client  *Client
	baseURL string
}

// NewMediaClient creates a MediaClient pointing at baseURL (<NAME>_SERVICE_URL config key).
//
// To record outgoing calls as APM/OTel child spans, wire the observability
// provider's transport wrapper from cmd/api/main.go:
//
//	client := httpclient.NewMediaClient(cfg.Services.MediaURL, httpclient.Options{
//	    TransportWrapper: obsProvider.WrapTransport,
//	})
//
// The wrapper works for every backend (OTel exports spans; Elastic APM receives
// them via the apmotel bridge; "none" is a no-op).
func NewMediaClient(baseURL string, opts Options) *MediaClient {
	return &MediaClient{client: New(opts), baseURL: baseURL}
}

// GetMedia fetches a single media by ID from the remote media service.
func (c *MediaClient) GetMedia(ctx context.Context, id string) (*entity.Media, error) {
	url := fmt.Sprintf("%s/medias/%s", c.baseURL, id)

	resp, body, err := c.client.Get(ctx, url)
	if err != nil {
		return nil, fmt.Errorf("media_client: get media %s: %w", id, err)
	}

	switch resp.StatusCode {
	case http.StatusOK:
		// handled below
	case http.StatusNotFound:
		return nil, ErrMediaNotFound
	default:
		return nil, fmt.Errorf("media_client: unexpected status %d for media %s", resp.StatusCode, id)
	}

	var envelope struct {
		Data entity.Media `json:"data"`
	}
	if err := json.Unmarshal(body, &envelope); err != nil {
		return nil, fmt.Errorf("media_client: decode response: %w", err)
	}
	return &envelope.Data, nil
}
