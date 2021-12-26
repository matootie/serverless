# Serverless API template

This template is a **WORK IN PROGRESS**.

### Deploy steps

- Will be automated with GitHub Actions.
  - Build code to `/dist`.
  - Zip code to `/out/function.zip`.
  - Run CDK.

### Goals

- Make the `.devcontainer/Dockerfile` platform agnostic.
  - Currently it forces the platform `linux/amd64` because of a manual AWS CLI installation. It would be great to have this be a little more platform agnostic.. at least to support `linux/arm64` for developers running Apple Silicon.
- _More..._