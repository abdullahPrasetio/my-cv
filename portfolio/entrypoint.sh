#!/bin/sh
# Substitute BACKEND_URL into nginx config (default: http://api:4000)
export BACKEND_URL="${BACKEND_URL:-http://api:4000}"
envsubst '${BACKEND_URL}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf
echo "Portfolio starting... (API proxy → ${BACKEND_URL})"
exec nginx -g "daemon off;"
