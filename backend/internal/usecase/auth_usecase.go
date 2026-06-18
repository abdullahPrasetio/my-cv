package usecase

import (
	"context"
	"errors"
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/example/cv-backend/internal/domain/entity"
	domainrepo "github.com/example/cv-backend/internal/domain/repository"
	"github.com/example/cv-backend/pkg/auth"
)

var (
	ErrUsernameConflict = errors.New("username already taken")
	ErrInvalidPassword  = errors.New("invalid email or password")
)

type RegisterRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50,alphanum"`
	Name     string `json:"name"     validate:"required,min=2,max=100"`
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=72"`
}

type LoginRequest struct {
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type AuthResponse struct {
	Token     string       `json:"token"`
	ExpiresAt time.Time    `json:"expires_at"`
	User      *entity.User `json:"user"`
}

type AuthUseCase interface {
	Register(ctx context.Context, req *RegisterRequest) (*AuthResponse, error)
	Login(ctx context.Context, req *LoginRequest) (*AuthResponse, error)
}

type authUseCase struct {
	userRepo domainrepo.UserRepository
	jwtCfg   *auth.Config
}

func NewAuthUseCase(userRepo domainrepo.UserRepository, jwtCfg *auth.Config) AuthUseCase {
	return &authUseCase{userRepo: userRepo, jwtCfg: jwtCfg}
}

func (u *authUseCase) Register(ctx context.Context, req *RegisterRequest) (*AuthResponse, error) {
	emailExists, err := u.userRepo.ExistsByEmail(ctx, req.Email)
	if err != nil {
		return nil, fmt.Errorf("register check email: %w", err)
	}
	if emailExists {
		return nil, ErrEmailConflict
	}

	usernameExists, err := u.userRepo.ExistsByUsername(ctx, req.Username)
	if err != nil {
		return nil, fmt.Errorf("register check username: %w", err)
	}
	if usernameExists {
		return nil, ErrUsernameConflict
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("hash password: %w", err)
	}

	user := &entity.User{
		Username: req.Username,
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hash),
	}
	if err := u.userRepo.Create(ctx, user); err != nil {
		return nil, fmt.Errorf("create user: %w", err)
	}

	return u.issueToken(user)
}

func (u *authUseCase) Login(ctx context.Context, req *LoginRequest) (*AuthResponse, error) {
	user, err := u.userRepo.FindByEmail(ctx, req.Email)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrInvalidPassword
	}
	if err != nil {
		return nil, fmt.Errorf("find user: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, ErrInvalidPassword
	}

	return u.issueToken(user)
}

func (u *authUseCase) issueToken(user *entity.User) (*AuthResponse, error) {
	token, err := auth.Sign(user.ID.String(), []string{"user"}, u.jwtCfg)
	if err != nil {
		return nil, fmt.Errorf("sign token: %w", err)
	}
	expiry := u.jwtCfg.Expiry
	if expiry == 0 {
		expiry = 24 * time.Hour
	}
	return &AuthResponse{
		Token:     token,
		ExpiresAt: time.Now().Add(expiry),
		User:      user,
	}, nil
}
