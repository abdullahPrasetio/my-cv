package httpclient

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/example/cv-backend/internal/domain/entity"
)

// ErrPortfolioConfigNotFound is returned when the remote service returns HTTP 404.
var ErrPortfolioConfigNotFound = errors.New("portfolio_config not found")

// PortfolioConfigClient implements domain/service.ExternalPortfolioConfigService by calling the
// remote portfolio_config microservice over HTTP.
type PortfolioConfigClient struct {
	client  *Client
	baseURL string
}

// NewPortfolioConfigClient creates a PortfolioConfigClient pointing at baseURL (<NAME>_SERVICE_URL config key).
//
// To record outgoing calls as APM/OTel child spans, wire the observability
// provider's transport wrapper from cmd/api/main.go:
//
//	client := httpclient.NewPortfolioConfigClient(cfg.Services.PortfolioConfigURL, httpclient.Options{
//	    TransportWrapper: obsProvider.WrapTransport,
//	})
//
// The wrapper works for every backend (OTel exports spans; Elastic APM receives
// them via the apmotel bridge; "none" is a no-op).
func NewPortfolioConfigClient(baseURL string, opts Options) *PortfolioConfigClient {
	return &PortfolioConfigClient{client: New(opts), baseURL: baseURL}
}

// GetPortfolioConfig fetches a single portfolio_config by ID from the remote portfolio_config service.
func (c *PortfolioConfigClient) GetPortfolioConfig(ctx context.Context, id string) (*entity.PortfolioConfig, error) {
	url := fmt.Sprintf("%s/portfolio_configs/%s", c.baseURL, id)

	resp, body, err := c.client.Get(ctx, url)
	if err != nil {
		return nil, fmt.Errorf("portfolio_config_client: get portfolio_config %s: %w", id, err)
	}

	switch resp.StatusCode {
	case http.StatusOK:
		// handled below
	case http.StatusNotFound:
		return nil, ErrPortfolioConfigNotFound
	default:
		return nil, fmt.Errorf("portfolio_config_client: unexpected status %d for portfolio_config %s", resp.StatusCode, id)
	}

	var envelope struct {
		Data entity.PortfolioConfig `json:"data"`
	}
	if err := json.Unmarshal(body, &envelope); err != nil {
		return nil, fmt.Errorf("portfolio_config_client: decode response: %w", err)
	}
	return &envelope.Data, nil
}
