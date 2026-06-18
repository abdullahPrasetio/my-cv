package usecase_test

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/example/cv-backend/internal/domain/entity"
	"github.com/example/cv-backend/internal/usecase"
)

// mockCvRepository is a hand-written mock for domainrepo.CvRepository.
type mockCvRepository struct{ mock.Mock }

func (m *mockCvRepository) FindByID(ctx context.Context, id uuid.UUID) (*entity.Cv, error) {
	args := m.Called(ctx, id)
	if v := args.Get(0); v != nil {
		return v.(*entity.Cv), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockCvRepository) FindAll(ctx context.Context) ([]*entity.Cv, error) {
	args := m.Called(ctx)
	if v := args.Get(0); v != nil {
		return v.([]*entity.Cv), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockCvRepository) Create(ctx context.Context, e *entity.Cv) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockCvRepository) Update(ctx context.Context, e *entity.Cv) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockCvRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return m.Called(ctx, id).Error(0)
}

func (m *mockCvRepository) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	args := m.Called(ctx, email)
	return args.Bool(0), args.Error(1)
}

// --- Tests ---

func TestCvUseCase_GetCv_OK(t *testing.T) {
	repo := new(mockCvRepository)
	uc := usecase.NewCvUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	want := &entity.Cv{ID: id}
	repo.On("FindByID", ctx, id).Return(want, nil)

	got, err := uc.GetCv(ctx, id.String())
	assert.NoError(t, err)
	assert.Equal(t, want, got)
	repo.AssertExpectations(t)
}

func TestCvUseCase_GetCv_NotFound(t *testing.T) {
	repo := new(mockCvRepository)
	uc := usecase.NewCvUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	repo.On("FindByID", ctx, id).Return(nil, usecase.ErrCvNotFound)

	_, err := uc.GetCv(ctx, id.String())
	assert.ErrorIs(t, err, usecase.ErrCvNotFound)
	repo.AssertExpectations(t)
}

func TestCvUseCase_GetCv_InvalidUUID(t *testing.T) {
	uc := usecase.NewCvUseCase(new(mockCvRepository))
	_, err := uc.GetCv(context.Background(), "not-a-uuid")
	assert.ErrorIs(t, err, usecase.ErrCvInvalidUUID)
}

func TestCvUseCase_ListCvs_OK(t *testing.T) {
	repo := new(mockCvRepository)
	uc := usecase.NewCvUseCase(repo)
	ctx := context.Background()

	want := []*entity.Cv{{ID: uuid.New()}}
	repo.On("FindAll", ctx).Return(want, nil)

	got, err := uc.ListCvs(ctx)
	assert.NoError(t, err)
	assert.Len(t, got, 1)
	repo.AssertExpectations(t)
}

func TestCvUseCase_CreateCv_OK(t *testing.T) {
	repo := new(mockCvRepository)
	uc := usecase.NewCvUseCase(repo)
	ctx := context.Background()

	req := &usecase.CreateCvRequest{
		// TODO: populate required fields
	}
	repo.On("Create", ctx, mock.AnythingOfType("*entity.Cv")).Return(nil)

	got, err := uc.CreateCv(ctx, req)
	assert.NoError(t, err)
	assert.NotNil(t, got)
	repo.AssertExpectations(t)
}

func TestCvUseCase_DeleteCv_OK(t *testing.T) {
	repo := new(mockCvRepository)
	uc := usecase.NewCvUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	existing := &entity.Cv{ID: id}
	repo.On("FindByID", ctx, id).Return(existing, nil)
	repo.On("Delete", ctx, id).Return(nil)

	err := uc.DeleteCv(ctx, id.String())
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}
