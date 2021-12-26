ARG VARIANT="16-bullseye"
ARG DENO_VERSION="1.17.0"
FROM --platform=amd64 mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

WORKDIR /source

RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends \
        fish

RUN useradd -m -u 1999 -s /usr/bin/fish me

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno && \
    curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.17.1 && \
    chown -R me /deno && \
    ln -s /deno/bin/deno /usr/local/bin/deno

RUN mkdir "/tmp/aws" && \
    cd "/tmp/aws" && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" \
        -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

RUN chown -R me:npm /usr/local/share/npm-global
USER me

RUN npm install -g npm aws-cdk
