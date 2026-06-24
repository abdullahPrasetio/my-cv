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

// mockMediaRepository is a hand-written mock for domainrepo.MediaRepository.
type mockMediaRepository struct{ mock.Mock }

func (m *mockMediaRepository) FindByID(ctx context.Context, id uuid.UUID) (*entity.Media, error) {
	args := m.Called(ctx, id)
	if v := args.Get(0); v != nil {
		return v.(*entity.Media), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockMediaRepository) FindAll(ctx context.Context) ([]*entity.Media, error) {
	args := m.Called(ctx)
	if v := args.Get(0); v != nil {
		return v.([]*entity.Media), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *mockMediaRepository) Create(ctx context.Context, e *entity.Media) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockMediaRepository) Update(ctx context.Context, e *entity.Media) error {
	return m.Called(ctx, e).Error(0)
}

func (m *mockMediaRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return m.Called(ctx, id).Error(0)
}

func (m *mockMediaRepository) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	args := m.Called(ctx, email)
	return args.Bool(0), args.Error(1)
}

// --- Tests ---

func TestMediaUseCase_GetMedia_OK(t *testing.T) {
	repo := new(mockMediaRepository)
	uc := usecase.NewMediaUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	want := &entity.Media{ID: id}
	repo.On("FindByID", ctx, id).Return(want, nil)

	got, err := uc.GetMedia(ctx, id.String())
	assert.NoError(t, err)
	assert.Equal(t, want, got)
	repo.AssertExpectations(t)
}

func TestMediaUseCase_GetMedia_NotFound(t *testing.T) {
	repo := new(mockMediaRepository)
	uc := usecase.NewMediaUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	repo.On("FindByID", ctx, id).Return(nil, usecase.ErrMediaNotFound)

	_, err := uc.GetMedia(ctx, id.String())
	assert.ErrorIs(t, err, usecase.ErrMediaNotFound)
	repo.AssertExpectations(t)
}

func TestMediaUseCase_GetMedia_InvalidUUID(t *testing.T) {
	uc := usecase.NewMediaUseCase(new(mockMediaRepository))
	_, err := uc.GetMedia(context.Background(), "not-a-uuid")
	assert.ErrorIs(t, err, usecase.ErrMediaInvalidUUID)
}

func TestMediaUseCase_ListMedias_OK(t *testing.T) {
	repo := new(mockMediaRepository)
	uc := usecase.NewMediaUseCase(repo)
	ctx := context.Background()

	want := []*entity.Media{{ID: uuid.New()}}
	repo.On("FindAll", ctx).Return(want, nil)

	got, err := uc.ListMedias(ctx)
	assert.NoError(t, err)
	assert.Len(t, got, 1)
	repo.AssertExpectations(t)
}

func TestMediaUseCase_CreateMedia_OK(t *testing.T) {
	repo := new(mockMediaRepository)
	uc := usecase.NewMediaUseCase(repo)
	ctx := context.Background()

	req := &usecase.CreateMediaRequest{
		// TODO: populate required fields
	}
	repo.On("Create", ctx, mock.AnythingOfType("*entity.Media")).Return(nil)

	got, err := uc.CreateMedia(ctx, req)
	assert.NoError(t, err)
	assert.NotNil(t, got)
	repo.AssertExpectations(t)
}

func TestMediaUseCase_DeleteMedia_OK(t *testing.T) {
	repo := new(mockMediaRepository)
	uc := usecase.NewMediaUseCase(repo)
	ctx := context.Background()

	id := uuid.New()
	existing := &entity.Media{ID: id}
	repo.On("FindByID", ctx, id).Return(existing, nil)
	repo.On("Delete", ctx, id).Return(nil)

	err := uc.DeleteMedia(ctx, id.String())
	assert.NoError(t, err)
	repo.AssertExpectations(t)
}
