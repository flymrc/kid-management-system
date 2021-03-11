set -ex

function build {
  local LATEST=$CI_REGISTRY_IMAGE:latest

  docker pull $LATEST || true
  docker build --cache-from $LATEST . --tag $LATEST
  docker push $LATEST

  local TAG=$CI_REGISTRY_IMAGE:${CI_COMMIT_TAG:-$CI_COMMIT_SHORT_SHA}
  docker tag $LATEST $TAG
  docker push $TAG
}

build "$@"