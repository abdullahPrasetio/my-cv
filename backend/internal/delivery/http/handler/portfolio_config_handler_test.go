package handler_test

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/example/cv-backend/internal/delivery/http/handler"
	"github.com/example/cv-backend/internal/domain/entity"
	"github.com/example/cv-backend/internal/usecase"
	"github.com/example/cv-backend/pkg/validator"
)

// mockPortfolioConfigUC is a simple struct-based mock for usecase.PortfolioConfigUseCase.
type mockPortfolioConfigUC struct {
	item *entity.PortfolioConfig
	list []*entity.PortfolioConfig
	err  error
}

func (m *mockPortfolioConfigUC) GetPortfolioConfig(_ context.Context, _ string) (*entity.PortfolioConfig, error) {
	return m.item, m.err
}
func (m *mockPortfolioConfigUC) ListPortfolioConfigs(_ context.Context) ([]*entity.PortfolioConfig, error) {
	return m.list, m.err
}
func (m *mockPortfolioConfigUC) CreatePortfolioConfig(_ context.Context, _ *usecase.CreatePortfolioConfigRequest) (*entity.PortfolioConfig, error) {
	return m.item, m.err
}
func (m *mockPortfolioConfigUC) UpdatePortfolioConfig(_ context.Context, _ string, _ *usecase.UpdatePortfolioConfigRequest) (*entity.PortfolioConfig, error) {
	return m.item, m.err
}
func (m *mockPortfolioConfigUC) DeletePortfolioConfig(_ context.Context, _ string) error {
	return m.err
}

// testPortfolioConfigApp wires the handler onto a minimal Fiber app.
func testPortfolioConfigApp(h *handler.PortfolioConfigHandler) *fiber.App {
	app := fiber.New(fiber.Config{DisableStartupMessage: true})
	app.Get("/portfolio_configs/:id", h.GetPortfolioConfig)
	app.Get("/portfolio_configs", h.ListPortfolioConfigs)
	app.Post("/portfolio_configs", h.CreatePortfolioConfig)
	app.Put("/portfolio_configs/:id", h.UpdatePortfolioConfig)
	app.Delete("/portfolio_configs/:id", h.DeletePortfolioConfig)
	return app
}

func fakePortfolioConfig() *entity.PortfolioConfig {
	return &entity.PortfolioConfig{}
}

func portfolioConfigJSONBody(t *testing.T, v interface{}) *bytes.Buffer {
	t.Helper()
	b, err := json.Marshal(v)
	require.NoError(t, err)
	return bytes.NewBuffer(b)
}

// ── GetPortfolioConfig ──────────────────────────────────────────────────────────────

func TestGetPortfolioConfig_200(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{item: fakePortfolioConfig()}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs/some-id", nil)
	resp, err := testPortfolioConfigApp(h).Test(req)
	require.NoError(t, err)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestGetPortfolioConfig_NotFound(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: usecase.ErrPortfolioConfigNotFound}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs/some-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestGetPortfolioConfig_InvalidUUID(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: usecase.ErrPortfolioConfigInvalidUUID}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs/bad", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestGetPortfolioConfig_InternalError(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs/some-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── ListPortfolioConfigs ────────────────────────────────────────────────────────────

func TestListPortfolioConfigs_200(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{list: []*entity.PortfolioConfig{fakePortfolioConfig()}}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestListPortfolioConfigs_InternalError(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: errors.New("err")}, validator.New())
	req := httptest.NewRequest("GET", "/portfolio_configs", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── CreatePortfolioConfig ───────────────────────────────────────────────────────────

func TestCreatePortfolioConfig_201(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{item: fakePortfolioConfig()}, validator.New())
	body := portfolioConfigJSONBody(t, map[string]string{
		// TODO: add required fields
	})
	req := httptest.NewRequest("POST", "/portfolio_configs", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 201, resp.StatusCode)
}

func TestCreatePortfolioConfig_InvalidBody(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{}, validator.New())
	req := httptest.NewRequest("POST", "/portfolio_configs", bytes.NewBufferString("not json{{{"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestCreatePortfolioConfig_InternalError(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: errors.New("db down")}, validator.New())
	body := portfolioConfigJSONBody(t, map[string]string{})
	req := httptest.NewRequest("POST", "/portfolio_configs", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── UpdatePortfolioConfig ───────────────────────────────────────────────────────────

func TestUpdatePortfolioConfig_200(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{item: fakePortfolioConfig()}, validator.New())
	body := portfolioConfigJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/portfolio_configs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestUpdatePortfolioConfig_BadBody(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{item: fakePortfolioConfig()}, validator.New())
	req := httptest.NewRequest("PUT", "/portfolio_configs/some-id", bytes.NewBufferString("{bad"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestUpdatePortfolioConfig_NotFound(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: usecase.ErrPortfolioConfigNotFound}, validator.New())
	body := portfolioConfigJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/portfolio_configs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestUpdatePortfolioConfig_InternalError(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: errors.New("db down")}, validator.New())
	body := portfolioConfigJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/portfolio_configs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── DeletePortfolioConfig ───────────────────────────────────────────────────────────

func TestDeletePortfolioConfig_200(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{}, validator.New())
	req := httptest.NewRequest("DELETE", "/portfolio_configs/some-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestDeletePortfolioConfig_NotFound(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: usecase.ErrPortfolioConfigNotFound}, validator.New())
	req := httptest.NewRequest("DELETE", "/portfolio_configs/some-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestDeletePortfolioConfig_InvalidUUID(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: usecase.ErrPortfolioConfigInvalidUUID}, validator.New())
	req := httptest.NewRequest("DELETE", "/portfolio_configs/bad-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestDeletePortfolioConfig_InternalError(t *testing.T) {
	h := handler.NewPortfolioConfigHandler(&mockPortfolioConfigUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("DELETE", "/portfolio_configs/some-id", nil)
	resp, _ := testPortfolioConfigApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}
