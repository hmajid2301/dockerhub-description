# Docker Hub Description

Docker Image used to update the description on Docker Hub repos. The image comes with pandoc so you convert your
documents to markdown.

## Usage

You can the node script like so.

```
npm install
touch .env
source .env
npm run start
```

### Args

```bash
npm run start -- --help
Usage: src [options]

  Updates description of Docker Hub repository.

Options:
  --version         Show version number                               [boolean]
  -u, --username    Docker Hub username.                              [required]
  -p, --password    Docker Hub password (cannot be an access token).  [required]
  -r, --repoName    The repository name that you want to update the description
                    off.                                              [required]
  -x, --repoPrefix  The prefix of the repository you want to  update, If not set
                    defaults to username.
  -f, --readmePath  Path to README file which will be used as the description of
                    repository on Docker Hub.           [default: "./README.md"]
  -h, --help        Show help                                          [boolean]
```

### Docker

You can run the Docker container locally like so.

```bash
touch .env
docker run -rm -v README.md:/app/README.md --env-file .env hmajid2301/dockerhub-descriptions-updater
```

or you can build it locally

```
npm run build
docker build -t dockerhub-descriptions-updater .
docker run -v README.md:/app/README.md --env-file .env dockerhub-descriptions-updater
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

You can also use it during CI/CD. The image comes with `pandoc`, so you can conver documents to markdown and
then update the full description to the specified repo.

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
    publish-readme:hub:
  script:
    - pandoc --from rst README.rst --to markdown_strict -o README.md
    - node /app/index.js
```

## Appendix

- Inspired by [sheogorath/readme-to-dockerhub](https://hub.docker.com/r/sheogorath/readme-to-dockerhub/dockerfile)