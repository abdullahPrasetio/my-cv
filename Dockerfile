# Stage 1: Build
FROM node:20-alpine as build-stage
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Salin config instalasi
COPY package*.json ./
RUN npm install

# Salin source code (folder docs akan diabaikan oleh .dockerignore)
COPY . .

# Gunakan data dummy untuk build image publik
# Hapus file asli jika ada (untuk keamanan build lokal)
RUN rm -f public/cv.json public/resume.pdf src/data/cv.json

# Inject data dummy & buat PDF kosong
RUN mkdir -p public && \
    cp src/data/dummy-cv.json public/cv.json && \
    touch public/resume.pdf

RUN npm run build

# Stage 2: Production
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=build-stage /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
