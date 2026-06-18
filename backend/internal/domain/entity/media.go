package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Media is the GORM model and domain entity for the media aggregate.
type Media struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;not null" json:"id"`
	CreatedAt time.Time      `                                      json:"created_at"`
	UpdatedAt time.Time      `                                      json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"                          json:"-"`
}

// BeforeCreate sets a random UUID if the ID is not already set.
func (e *Media) BeforeCreate(_ *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

// TableName overrides GORM's default table naming.
func (Media) TableName() string { return "medias" }
