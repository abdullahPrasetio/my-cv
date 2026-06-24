package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"

	"github.com/example/wapcv/internal/usecase"
	pkgauth "github.com/example/wapcv/pkg/auth"
	"github.com/example/wapcv/pkg/response"
	"github.com/example/wapcv/pkg/validator"
)

type AuthHandler struct {
	uc  usecase.AuthUseCase
	val *validator.Validator
}

func NewAuthHandler(uc usecase.AuthUseCase, val *validator.Validator) *AuthHandler {
	return &AuthHandler{uc: uc, val: val}
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var req usecase.RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return response.BadRequest(c, "invalid request body")
	}
	if err := h.val.Validate(&req); err != nil {
		return response.BadRequest(c, err.Error())
	}
	res, err := h.uc.Register(c.UserContext(), &req)
	if err != nil {
		return h.mapError(c, err)
	}
	return response.Created(c, "registered", res)
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var req usecase.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return response.BadRequest(c, "invalid request body")
	}
	if err := h.val.Validate(&req); err != nil {
		return response.BadRequest(c, err.Error())
	}
	res, err := h.uc.Login(c.UserContext(), &req)
	if err != nil {
		return h.mapError(c, err)
	}
	return response.Success(c, "login successful", res)
}

func (h *AuthHandler) Me(c *fiber.Ctx) error {
	claims := pkgauth.GetClaims(c)
	if claims == nil {
		return fiber.ErrUnauthorized
	}
	user, err := h.uc.Me(c.UserContext(), claims.Subject)
	if err != nil {
		return response.InternalError(c)
	}
	return response.Success(c, "authenticated", user)
}

func (h *AuthHandler) mapError(c *fiber.Ctx, err error) error {
	switch {
	case errors.Is(err, usecase.ErrEmailConflict):
		return response.Error(c, fiber.StatusConflict, response.ErrConflict, "email already in use")
	case errors.Is(err, usecase.ErrUsernameConflict):
		return response.Error(c, fiber.StatusConflict, response.ErrConflict, "username already taken")
	case errors.Is(err, usecase.ErrInvalidPassword):
		return response.Error(c, fiber.StatusUnauthorized, response.ErrUnauthorized, "invalid email or password")
	default:
		return response.InternalError(c)
	}
}
