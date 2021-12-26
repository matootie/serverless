ARG VARIANT=14-bullseye
FROM --platform=amd64 mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

WORKDIR /source

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends fish

RUN useradd -m -u 1999 -s /usr/bin/fish me

RUN mkdir "/tmp/aws" && \
    cd "/tmp/aws" && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" \
        -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

RUN chown -R me:npm /usr/local/share/npm-global

USER me

RUN npm i -g npm aws-cdk
