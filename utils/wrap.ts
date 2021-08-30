import {
  APIGatewayEvent,
  APIGatewayProxyEvent,
  Context,
  Handler,
} from "aws-lambda"
import { HTTPError } from "@utils/exceptions"

interface Request {
  event: APIGatewayProxyEvent
  context: Context
}

type Wrappable = (req: Request) => Promise<any>

export const wrap = (func: Wrappable): any => {
  const wrapped: Handler<APIGatewayEvent> = async (event, context) => {
    // @ts-expect-error event.source is unique to Lambda warmup trigger.
    if ("source" in event && event.source === "serverless-plugin-warmup") {
      await new Promise((r) => setTimeout(r, 25))
      return "Lambda is warm!"
    }

    try {
      const response = await func({ event, context })
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Success!",
            data: response,
          },
          null,
          2,
        ),
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        return {
          statusCode: error.status,
          body: JSON.stringify(
            {
              message: error.message || undefined,
              error: error.error,
            },
            null,
            2,
          ),
        }
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify(
            {
              message: "An unknown error has occurred.",
              error: "Internal server error.",
            },
            null,
            2,
          ),
        }
      }
    }
  }

  return wrapped
}
