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

// mockMediaUC is a simple struct-based mock for usecase.MediaUseCase.
type mockMediaUC struct {
	item *entity.Media
	list []*entity.Media
	err  error
}

func (m *mockMediaUC) GetMedia(_ context.Context, _ string) (*entity.Media, error) {
	return m.item, m.err
}
func (m *mockMediaUC) ListMedias(_ context.Context) ([]*entity.Media, error) {
	return m.list, m.err
}
func (m *mockMediaUC) CreateMedia(_ context.Context, _ *usecase.CreateMediaRequest) (*entity.Media, error) {
	return m.item, m.err
}
func (m *mockMediaUC) UpdateMedia(_ context.Context, _ string, _ *usecase.UpdateMediaRequest) (*entity.Media, error) {
	return m.item, m.err
}
func (m *mockMediaUC) DeleteMedia(_ context.Context, _ string) error {
	return m.err
}

// testMediaApp wires the handler onto a minimal Fiber app.
func testMediaApp(h *handler.MediaHandler) *fiber.App {
	app := fiber.New(fiber.Config{DisableStartupMessage: true})
	app.Get("/medias/:id", h.GetMedia)
	app.Get("/medias", h.ListMedias)
	app.Post("/medias", h.CreateMedia)
	app.Put("/medias/:id", h.UpdateMedia)
	app.Delete("/medias/:id", h.DeleteMedia)
	return app
}

func fakeMedia() *entity.Media {
	return &entity.Media{}
}

func mediaJSONBody(t *testing.T, v interface{}) *bytes.Buffer {
	t.Helper()
	b, err := json.Marshal(v)
	require.NoError(t, err)
	return bytes.NewBuffer(b)
}

// ── GetMedia ──────────────────────────────────────────────────────────────

func TestGetMedia_200(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{item: fakeMedia()}, validator.New())
	req := httptest.NewRequest("GET", "/medias/some-id", nil)
	resp, err := testMediaApp(h).Test(req)
	require.NoError(t, err)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestGetMedia_NotFound(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: usecase.ErrMediaNotFound}, validator.New())
	req := httptest.NewRequest("GET", "/medias/some-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestGetMedia_InvalidUUID(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: usecase.ErrMediaInvalidUUID}, validator.New())
	req := httptest.NewRequest("GET", "/medias/bad", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestGetMedia_InternalError(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("GET", "/medias/some-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── ListMedias ────────────────────────────────────────────────────────────

func TestListMedias_200(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{list: []*entity.Media{fakeMedia()}}, validator.New())
	req := httptest.NewRequest("GET", "/medias", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestListMedias_InternalError(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: errors.New("err")}, validator.New())
	req := httptest.NewRequest("GET", "/medias", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── CreateMedia ───────────────────────────────────────────────────────────

func TestCreateMedia_201(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{item: fakeMedia()}, validator.New())
	body := mediaJSONBody(t, map[string]string{
		// TODO: add required fields
	})
	req := httptest.NewRequest("POST", "/medias", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 201, resp.StatusCode)
}

func TestCreateMedia_InvalidBody(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{}, validator.New())
	req := httptest.NewRequest("POST", "/medias", bytes.NewBufferString("not json{{{"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestCreateMedia_InternalError(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: errors.New("db down")}, validator.New())
	body := mediaJSONBody(t, map[string]string{})
	req := httptest.NewRequest("POST", "/medias", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── UpdateMedia ───────────────────────────────────────────────────────────

func TestUpdateMedia_200(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{item: fakeMedia()}, validator.New())
	body := mediaJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/medias/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestUpdateMedia_BadBody(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{item: fakeMedia()}, validator.New())
	req := httptest.NewRequest("PUT", "/medias/some-id", bytes.NewBufferString("{bad"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestUpdateMedia_NotFound(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: usecase.ErrMediaNotFound}, validator.New())
	body := mediaJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/medias/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestUpdateMedia_InternalError(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: errors.New("db down")}, validator.New())
	body := mediaJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/medias/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── DeleteMedia ───────────────────────────────────────────────────────────

func TestDeleteMedia_200(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{}, validator.New())
	req := httptest.NewRequest("DELETE", "/medias/some-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestDeleteMedia_NotFound(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: usecase.ErrMediaNotFound}, validator.New())
	req := httptest.NewRequest("DELETE", "/medias/some-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestDeleteMedia_InvalidUUID(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: usecase.ErrMediaInvalidUUID}, validator.New())
	req := httptest.NewRequest("DELETE", "/medias/bad-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestDeleteMedia_InternalError(t *testing.T) {
	h := handler.NewMediaHandler(&mockMediaUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("DELETE", "/medias/some-id", nil)
	resp, _ := testMediaApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}
