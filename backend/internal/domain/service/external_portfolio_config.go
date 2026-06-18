package service

import (
	"context"

	"github.com/example/cv-backend/internal/domain/entity"
)

// ExternalPortfolioConfigService is the interface for fetching portfolio_config data from another microservice.
// Implementation lives in pkg/httpclient/portfolio_config_client.go.
type ExternalPortfolioConfigService interface {
	GetPortfolioConfig(ctx context.Context, id string) (*entity.PortfolioConfig, error)
}
