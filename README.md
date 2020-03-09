# Docker Hub Description

Docker Image used to update the description on Docker Hub repos.
The image comes with pandoc so you convert your documents to markdown.

## Usage

You can run the Docker container locally like so.

```bash
touch .env
docker run -rm -v README.md:/app/README.md --env-file .env hmajid2301/dockerhub-descriptions-updater
```

Where `.env` is like:

```.env
DOCKERHUB_USERNAME=hmajid2301
DOCKERHUB_PASSWORD=MY_PASS
DOCKERHUB_REPO_PREFIX=hmajid2301
DOCKERHUB_REPO_NAME=dockerhub-descriptions-updater
README_PATH=/app/README.md
```

### .gitlab-ci.yml

You can also use it during CI/CD. The image comes with `pandoc`, so you can convert
documents to markdown and then update the full description to the specified repo.

```yaml
publish-readme:hub:
  stage: pre-publish
  image:
    name: hmajid2301/dockerhub-descriptions
    entrypoint: [""]
  variables:
    DOCKERHUB_USERNAME: hmajid2301
    DOCKERHUB_PASSWORD: ${DOCKER_PASSWORD}
    DOCKERHUB_REPO_PREFIX: hmajid2301
    DOCKERHUB_REPO_NAME: markdown-to-devto
    README_PATH: README.md
  script:
    - pandoc --from rst README.rst --to markdown_strict -o README.md
    - ./publish.sh
```
