import { Handler, APIGatewayEvent } from "aws-lambda"
import serverless from "serverless-http"

import { app } from "./app"

const appHandler = serverless(app, {
  basePath: "/api",
})

export const handler: Handler<APIGatewayEvent> = async (event, context) => {
  return await appHandler(event, context)
}
