package httpclient

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/example/wapcv/internal/domain/entity"
)

// ErrCvNotFound is returned when the remote service returns HTTP 404.
var ErrCvNotFound = errors.New("cv not found")

// CvClient implements domain/service.ExternalCvService by calling the
// remote cv microservice over HTTP.
type CvClient struct {
	client  *Client
	baseURL string
}

// NewCvClient creates a CvClient pointing at baseURL (<NAME>_SERVICE_URL config key).
//
// To record outgoing calls as APM/OTel child spans, wire the observability
// provider's transport wrapper from cmd/api/main.go:
//
//	client := httpclient.NewCvClient(cfg.Services.CvURL, httpclient.Options{
//	    TransportWrapper: obsProvider.WrapTransport,
//	})
//
// The wrapper works for every backend (OTel exports spans; Elastic APM receives
// them via the apmotel bridge; "none" is a no-op).
func NewCvClient(baseURL string, opts Options) *CvClient {
	return &CvClient{client: New(opts), baseURL: baseURL}
}

// GetCv fetches a single cv by ID from the remote cv service.
func (c *CvClient) GetCv(ctx context.Context, id string) (*entity.Cv, error) {
	url := fmt.Sprintf("%s/cvs/%s", c.baseURL, id)

	resp, body, err := c.client.Get(ctx, url)
	if err != nil {
		return nil, fmt.Errorf("cv_client: get cv %s: %w", id, err)
	}

	switch resp.StatusCode {
	case http.StatusOK:
		// handled below
	case http.StatusNotFound:
		return nil, ErrCvNotFound
	default:
		return nil, fmt.Errorf("cv_client: unexpected status %d for cv %s", resp.StatusCode, id)
	}

	var envelope struct {
		Data entity.Cv `json:"data"`
	}
	if err := json.Unmarshal(body, &envelope); err != nil {
		return nil, fmt.Errorf("cv_client: decode response: %w", err)
	}
	return &envelope.Data, nil
}
