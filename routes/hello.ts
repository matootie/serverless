import { wrap } from "@utils/wrap"
import { InvalidRequestError } from "@utils/exceptions"

export const handler = wrap(async ({ event, context }) => {
  const message = event.queryStringParameters?.message
  const id = context.awsRequestId
  if (!message)
    throw new InvalidRequestError("Missing message query parameter.")
  return {
    message,
    id,
  }
})
