#!/bin/sh
# Entrypoint untuk aplikasi universal portofolio

# 1. Buat runtime config JSON
echo "{\"defaultVersion\": \"${DEFAULT_VERSION:-v2}\"}" > /usr/share/nginx/html/config.json

# 2. Pastikan file memiliki permission yang benar untuk Nginx
chmod 644 /usr/share/nginx/html/config.json
chmod 644 /usr/share/nginx/html/cv.json

echo "Runtime configuration generated (Version: ${DEFAULT_VERSION:-v2})"

# 3. Jalankan Nginx
exec nginx -g "daemon off;"
