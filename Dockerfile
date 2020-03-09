FROM pandoc/core:2.9.2

LABEL maintainer="Haseeb Majid<hello@haseebmajid.dev>"

ENV README_FILEPATH="./README.md"
ENV DOCKERHUB_USERNAME=""
ENV DOCKERHUB_PASSWORD=""
ENV DOCKERHUB_REPO_PREFIX=""
ENV DOCKERHUB_REPO_NAME=""
ENV README_PATH="./README.md"

WORKDIR /app
COPY lib/index.js package*.json ./

RUN apk add nodejs npm && \
    npm install

ENTRYPOINT [ "node", "/app/index.js" ]