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

	"github.com/example/wapcv/internal/delivery/http/handler"
	"github.com/example/wapcv/internal/domain/entity"
	"github.com/example/wapcv/internal/usecase"
	"github.com/example/wapcv/pkg/validator"
)

// mockCvUC is a simple struct-based mock for usecase.CvUseCase.
type mockCvUC struct {
	item *entity.Cv
	list []*entity.Cv
	err  error
}

func (m *mockCvUC) GetCv(_ context.Context, _ string) (*entity.Cv, error) {
	return m.item, m.err
}
func (m *mockCvUC) ListCvs(_ context.Context) ([]*entity.Cv, error) {
	return m.list, m.err
}
func (m *mockCvUC) CreateCv(_ context.Context, _ *usecase.CreateCvRequest) (*entity.Cv, error) {
	return m.item, m.err
}
func (m *mockCvUC) UpdateCv(_ context.Context, _ string, _ *usecase.UpdateCvRequest) (*entity.Cv, error) {
	return m.item, m.err
}
func (m *mockCvUC) DeleteCv(_ context.Context, _ string) error {
	return m.err
}

// testCvApp wires the handler onto a minimal Fiber app.
func testCvApp(h *handler.CvHandler) *fiber.App {
	app := fiber.New(fiber.Config{DisableStartupMessage: true})
	app.Get("/cvs/:id", h.GetCv)
	app.Get("/cvs", h.ListCvs)
	app.Post("/cvs", h.CreateCv)
	app.Put("/cvs/:id", h.UpdateCv)
	app.Delete("/cvs/:id", h.DeleteCv)
	return app
}

func fakeCv() *entity.Cv {
	return &entity.Cv{}
}

func cvJSONBody(t *testing.T, v interface{}) *bytes.Buffer {
	t.Helper()
	b, err := json.Marshal(v)
	require.NoError(t, err)
	return bytes.NewBuffer(b)
}

// ── GetCv ──────────────────────────────────────────────────────────────

func TestGetCv_200(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{item: fakeCv()}, validator.New())
	req := httptest.NewRequest("GET", "/cvs/some-id", nil)
	resp, err := testCvApp(h).Test(req)
	require.NoError(t, err)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestGetCv_NotFound(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: usecase.ErrCvNotFound}, validator.New())
	req := httptest.NewRequest("GET", "/cvs/some-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestGetCv_InvalidUUID(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: usecase.ErrCvInvalidUUID}, validator.New())
	req := httptest.NewRequest("GET", "/cvs/bad", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestGetCv_InternalError(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("GET", "/cvs/some-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── ListCvs ────────────────────────────────────────────────────────────

func TestListCvs_200(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{list: []*entity.Cv{fakeCv()}}, validator.New())
	req := httptest.NewRequest("GET", "/cvs", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestListCvs_InternalError(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: errors.New("err")}, validator.New())
	req := httptest.NewRequest("GET", "/cvs", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── CreateCv ───────────────────────────────────────────────────────────

func TestCreateCv_201(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{item: fakeCv()}, validator.New())
	body := cvJSONBody(t, map[string]string{
		// TODO: add required fields
	})
	req := httptest.NewRequest("POST", "/cvs", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 201, resp.StatusCode)
}

func TestCreateCv_InvalidBody(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{}, validator.New())
	req := httptest.NewRequest("POST", "/cvs", bytes.NewBufferString("not json{{{"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestCreateCv_InternalError(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: errors.New("db down")}, validator.New())
	body := cvJSONBody(t, map[string]string{})
	req := httptest.NewRequest("POST", "/cvs", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── UpdateCv ───────────────────────────────────────────────────────────

func TestUpdateCv_200(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{item: fakeCv()}, validator.New())
	body := cvJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/cvs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestUpdateCv_BadBody(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{item: fakeCv()}, validator.New())
	req := httptest.NewRequest("PUT", "/cvs/some-id", bytes.NewBufferString("{bad"))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestUpdateCv_NotFound(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: usecase.ErrCvNotFound}, validator.New())
	body := cvJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/cvs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestUpdateCv_InternalError(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: errors.New("db down")}, validator.New())
	body := cvJSONBody(t, map[string]string{})
	req := httptest.NewRequest("PUT", "/cvs/some-id", body)
	req.Header.Set("Content-Type", "application/json")
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}

// ── DeleteCv ───────────────────────────────────────────────────────────

func TestDeleteCv_200(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{}, validator.New())
	req := httptest.NewRequest("DELETE", "/cvs/some-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 200, resp.StatusCode)
}

func TestDeleteCv_NotFound(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: usecase.ErrCvNotFound}, validator.New())
	req := httptest.NewRequest("DELETE", "/cvs/some-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 404, resp.StatusCode)
}

func TestDeleteCv_InvalidUUID(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: usecase.ErrCvInvalidUUID}, validator.New())
	req := httptest.NewRequest("DELETE", "/cvs/bad-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 400, resp.StatusCode)
}

func TestDeleteCv_InternalError(t *testing.T) {
	h := handler.NewCvHandler(&mockCvUC{err: errors.New("db down")}, validator.New())
	req := httptest.NewRequest("DELETE", "/cvs/some-id", nil)
	resp, _ := testCvApp(h).Test(req)
	assert.Equal(t, 500, resp.StatusCode)
}
