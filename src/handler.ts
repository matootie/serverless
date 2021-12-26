import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "https://deno.land/x/lambda@1.17.1/mod.ts"

export function handler(
  event: APIGatewayProxyEventV2,
  context: Context,
): APIGatewayProxyResultV2 {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version: Deno.version,
      requestId: context.awsRequestId,
      path: event.rawPath,
    }),
  }
}
