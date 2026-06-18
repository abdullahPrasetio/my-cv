package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// PortfolioConfig stores which version each user's portfolio displays. One row per user.
type PortfolioConfig struct {
	ID             uuid.UUID      `gorm:"type:uuid;primaryKey;not null"  json:"id"`
	UserID         uuid.UUID      `gorm:"type:uuid;not null;uniqueIndex" json:"user_id"`
	DefaultVersion string         `gorm:"size:10;not null;default:'v1'"  json:"default_version"`
	CreatedAt      time.Time      `                                      json:"created_at"`
	UpdatedAt      time.Time      `                                      json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index"                          json:"-"`
}

// BeforeCreate sets a random UUID if the ID is not already set.
func (e *PortfolioConfig) BeforeCreate(_ *gorm.DB) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	return nil
}

// TableName overrides GORM's default table naming.
func (PortfolioConfig) TableName() string { return "portfolio_configs" }
