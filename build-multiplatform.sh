#!/bin/bash
# Script to build multi-architecture Docker images

# Setup buildx for multi-architecture builds
setup_buildx() {
  echo "Setting up Docker Buildx..."
  docker buildx create --name multiarch --use || docker buildx use multiarch
  docker buildx inspect --bootstrap
}

# Build and push the image
build_and_push() {
  echo "Building and pushing multi-platform image..."
  docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t tfan2437/orbit:latest \
    --push \
    .
}

# Build and push only for amd64
build_and_push_amd64() {
  echo "Building and pushing amd64-only image..."
  docker buildx build \
    --platform linux/amd64 \
    -t tfan2437/orbit:amd64 \
    --push \
    .
}

# Main execution
setup_buildx
build_and_push
echo "Multi-platform build complete!"

# Uncomment to build amd64-only
build_and_push_amd64
echo "AMD64-only build complete!" 