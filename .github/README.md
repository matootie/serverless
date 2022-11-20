# Serverless Template

Using this template:

- Update the stack name in `/packages/cdk/bin/cdk.ts`
- (Optional) Update the region in `/packages/cdk/bin/cdk.ts`
- Update metadata files in `/.github` most importantly `FUNDING.yml`, `CODEOWNERS`, and `README.md`

- Write your UI library in `/packages/ui`
- Write your shared utilities in `/packages/utils`

- Write your client functionality in `/services/client`, a React SPA built using Vite
- Write your API in `/services/api`, an Express.js app bundled using ESBuild
  - I recommend treating this API as an edge service — a "back-end for front-end" — and simply use it to call downstream data-domain or business logic APIs

## Demo

View a deployed demo of the template at [`d3slgoye2hovbp.cloudfront.net`](https://d3slgoye2hovbp.cloudfront.net)

The API is accessible on [`/api/*`](https://d3slgoye2hovbp.cloudfront.net/api), the client is accessible on all other endpoints.
