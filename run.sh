docker container stop onelink
docker container rm onelink
docker image rm --force onelink:latest
# docker build -t onelink:latest .
docker build -f Dockerfile.dev -t onelink:latest .
docker run -e DEVELOPMENT=true \
  -e LOG_LEVEL=info \
  -e HTTP_SERVER_NAME="www.example.xyz" \
  -e HTTPS_SERVER_NAME="www.example.xyz" \
  -e SERVER_ADMIN="admin@example.xyz" \
  -e TZ="Europe/Berlin" \
  -e PHP_MEMORY_LIMIT="512M" \
  -e UPLOAD_MAX_FILESIZE="16M" \
  --publish 8082:8080 \
  --hostname onelink \
  --name onelink onelink:latest