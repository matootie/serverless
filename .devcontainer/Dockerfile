ARG VARIANT=14-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends \
        fish \
        gnupg

RUN su node -c "npm install -g npm aws-cdk"
