/**
 * AWS Lambda handler for the Express application.
 */

// External imports.
import { Handler, APIGatewayEvent } from "aws-lambda"
import serverlessExpress from "@vendia/serverless-express"

// Application imports.
import { app } from "@app"

// Cache a copy of the wrapped handler.
let cachedHandler: Handler<APIGatewayEvent> | undefined

/**
 * Converts and returns Express app as an AWS Lambda handler.
 * Check for cached handler first.
 */
function bootstrap() {
  if (!cachedHandler) {
    cachedHandler = serverlessExpress({ app })
  }
  return cachedHandler
}

/**
 * The AWS Lambda handler.
 */
export const handler: Handler<APIGatewayEvent> = async (
  event,
  context,
  callback,
) => {
  // Convert the Express app into a handler.
  const expressHandler = bootstrap()

  // Return the result of the handler.
  return await expressHandler(event, context, callback)
}
