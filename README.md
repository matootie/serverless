# Serverless API template

This template is a **WORK IN PROGRESS**.

### Features

- The Express framework you know and love, deployed to AWS Lambda. (`npm run develop`)
- A mini bootstrap CLI to customize core settings. (`npm run bootstrap`)
  - Customize the CDK Stack name.
  - Customize the expected JWT token issuer and audience.
- TypeScript for less error-prone code. (`npm run check:types`)
- ESLint for code lint. (`npm run check:lint`)
- Prettier for code formatting. (`npm run check:format`)
- Jest for code testing. (`npm run test`)
- GitHub Actions for CI/CD. (_soon_)
- Docker Compose and Visual Studio Code Devcontainers for easy development environment setup.
- The AWS CDK for an easy way to deploy, and a predictable way to orchestrate resources.
  - Structure your DynamoDB Table in code (`src/utils/tables.ts@BaseTableClass`) and have your changes automatically be reflected in the CDK. The Table will be provisioned locally and automatically in development.
    - _Settings not yet supported are `SSESpecification`, `StreamSpecification`, `TableClass` and `Tags`._

### Deploy steps

- Will be automated with GitHub Actions.
  - Build the project
    - `npm run build`
      - Bundle code to `/dist`.
        - `npm run build:bundle`
      - Zip code to `/out/function.zip`.
        - `npm run build:package`
  - Run CDK.
    - `npm run deploy`

### Goals

- Custom domain name for the API.
- Configurable warmup to keep the Lambda warm.
