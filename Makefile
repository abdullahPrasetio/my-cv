REGISTRY   ?= abdullahprasetio
APP        ?= my-cv
VERSION    ?= latest

PORTFOLIO_IMG = $(REGISTRY)/$(APP):$(VERSION)
ADMIN_IMG     = $(REGISTRY)/$(APP)-admin:$(VERSION)
API_IMG       = $(REGISTRY)/$(APP)-api:$(VERSION)

.PHONY: build push release build-portfolio build-admin build-api push-portfolio push-admin push-api

## Build all images
build: build-portfolio build-admin build-api

build-portfolio:
	docker build -t $(PORTFOLIO_IMG) ./portfolio

build-admin:
	docker build -t $(ADMIN_IMG) ./admin

build-api:
	docker build -t $(API_IMG) ./backend

## Push all images
push: push-portfolio push-admin push-api

push-portfolio:
	docker push $(PORTFOLIO_IMG)

push-admin:
	docker push $(ADMIN_IMG)

push-api:
	docker push $(API_IMG)

## Build + push all (single command)
release: build push

## Tag existing latest as VERSION
tag:
	docker tag $(REGISTRY)/$(APP):latest $(PORTFOLIO_IMG)
	docker tag $(REGISTRY)/$(APP)-admin:latest $(ADMIN_IMG)
	docker tag $(REGISTRY)/$(APP)-api:latest $(API_IMG)
