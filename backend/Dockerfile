FROM golang:1.25-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o cv-backend ./cmd/api

FROM gcr.io/distroless/static:nonroot
WORKDIR /app
COPY --from=build /app/cv-backend .
EXPOSE 4000
USER nonroot:nonroot
ENTRYPOINT ["/app/cv-backend"]
