package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// Cv stores CV data as JSONB per user. One row per user (unique UserID).
type Cv struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;not null"              json:"id"`
	UserID    uuid.UUID      `gorm:"type:uuid;not null;uniqueIndex"             json:"user_id"`
	Data      datatypes.JSON `gorm:"type:jsonb;not null;default:'{}'"           json:"data"`
	CreatedAt time.Time      `                                                  json:"created_at"`
	UpdatedAt time.Time      `                                                  json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"                                      json:"-"`
}

// BeforeCreate sets a random UUID if the ID is not already set.
func (e *Cv) BeforeCreate(_ *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

// TableName overrides GORM's default table naming.
func (Cv) TableName() string { return "cvs" }
