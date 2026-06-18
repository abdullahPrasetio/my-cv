package handler

import (
	"github.com/gofiber/fiber/v2"

	"github.com/example/cv-backend/internal/usecase"
	"github.com/example/cv-backend/pkg/response"
)

type MediaHandler struct {
	uc usecase.MediaUseCase
}

func NewMediaHandler(uc usecase.MediaUseCase) *MediaHandler {
	return &MediaHandler{uc: uc}
}

func (h *MediaHandler) Upload(c *fiber.Ctx) error {
	userID, err := claimsUserID(c)
	if err != nil {
		return fiber.ErrUnauthorized
	}

	file, err := c.FormFile("file")
	if err != nil {
		return response.BadRequest(c, "file is required")
	}

	folder := c.FormValue("folder", "projects")
	if folder != "avatar" && folder != "projects" && folder != "resume" {
		folder = "projects"
	}

	f, err := file.Open()
	if err != nil {
		return response.InternalError(c)
	}
	defer f.Close()

	data := make([]byte, file.Size)
	if _, err := f.Read(data); err != nil {
		return response.InternalError(c)
	}

	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	res, err := h.uc.Upload(c.UserContext(), userID, &usecase.UploadMediaRequest{
		Filename:    file.Filename,
		Data:        data,
		ContentType: contentType,
		Folder:      folder,
	})
	if err != nil {
		return response.InternalError(c)
	}
	return response.Created(c, "uploaded", res)
}
