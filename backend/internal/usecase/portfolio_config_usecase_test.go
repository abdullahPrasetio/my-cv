package usecase_test

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/example/wapcv/internal/domain/entity"
	"github.com/example/wapcv/internal/usecase"
)

// mockPortfolioConfigRepository is a hand-written mock for domainrepo.PortfolioConfigRepository.
type mockPortfolioConfigRepository struct{ mock.Mock }

func (m *mockPortfolioConfigRepository) FindByID(ctx context.Context, id uuid.UUID) (*entity.PortfolioConfig, error) {
	args := m.Called(ctx, id)
	if v := args.Get(0); v != nil {
		return v.(*entity.PortfolioConfig), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockPortfolioConfigRepository) FindAll(ctx context.Context) ([]*entity.PortfolioConfig, error) {
	args := m.Called(ctx)
	if v := args.Get(0); v != nil {
		return v.([]*entity.PortfolioConfig), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockPortfolioConfigRepository) Create(ctx context.Context, e *entity.PortfolioConfig) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockPortfolioConfigRepository) Update(ctx context.Context, e *entity.PortfolioConfig) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockPortfolioConfigRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return m.Called(ctx, id).Error(0)
}

func (m *mockPortfolioConfigRepository) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	args := m.Called(ctx, email)
	return args.Bool(0), args.Error(1)
}

// --- Tests ---

func TestPortfolioConfigUseCase_GetPortfolioConfig_OK(t *testing.T) {
	repo := new(mockPortfolioConfigRepository)
	uc := usecase.NewPortfolioConfigUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	want := &entity.PortfolioConfig{ID: id}
	repo.On("FindByID", ctx, id).Return(want, nil)

	got, err := uc.GetPortfolioConfig(ctx, id.String())
	assert.NoError(t, err)
	assert.Equal(t, want, got)
	repo.AssertExpectations(t)
}

func TestPortfolioConfigUseCase_GetPortfolioConfig_NotFound(t *testing.T) {
	repo := new(mockPortfolioConfigRepository)
	uc := usecase.NewPortfolioConfigUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	repo.On("FindByID", ctx, id).Return(nil, usecase.ErrPortfolioConfigNotFound)

	_, err := uc.GetPortfolioConfig(ctx, id.String())
	assert.ErrorIs(t, err, usecase.ErrPortfolioConfigNotFound)
	repo.AssertExpectations(t)
}

func TestPortfolioConfigUseCase_GetPortfolioConfig_InvalidUUID(t *testing.T) {
	uc := usecase.NewPortfolioConfigUseCase(new(mockPortfolioConfigRepository))
	_, err := uc.GetPortfolioConfig(context.Background(), "not-a-uuid")
	assert.ErrorIs(t, err, usecase.ErrPortfolioConfigInvalidUUID)
}

func TestPortfolioConfigUseCase_ListPortfolioConfigs_OK(t *testing.T) {
	repo := new(mockPortfolioConfigRepository)
	uc := usecase.NewPortfolioConfigUseCase(repo)
	ctx := context.Background()

	want := []*entity.PortfolioConfig{{ID: uuid.New()}}
	repo.On("FindAll", ctx).Return(want, nil)

	got, err := uc.ListPortfolioConfigs(ctx)
	assert.NoError(t, err)
	assert.Len(t, got, 1)
	repo.AssertExpectations(t)
}

func TestPortfolioConfigUseCase_CreatePortfolioConfig_OK(t *testing.T) {
	repo := new(mockPortfolioConfigRepository)
	uc := usecase.NewPortfolioConfigUseCase(repo)
	ctx := context.Background()

	req := &usecase.CreatePortfolioConfigRequest{
		// TODO: populate required fields
	}
	repo.On("Create", ctx, mock.AnythingOfType("*entity.PortfolioConfig")).Return(nil)

	got, err := uc.CreatePortfolioConfig(ctx, req)
	assert.NoError(t, err)
	assert.NotNil(t, got)
	repo.AssertExpectations(t)
}

func TestPortfolioConfigUseCase_DeletePortfolioConfig_OK(t *testing.T) {
	repo := new(mockPortfolioConfigRepository)
	uc := usecase.NewPortfolioConfigUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	existing := &entity.PortfolioConfig{ID: id}
	repo.On("FindByID", ctx, id).Return(existing, nil)
	repo.On("Delete", ctx, id).Return(nil)

	err := uc.DeletePortfolioConfig(ctx, id.String())
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}
