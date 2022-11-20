import { parse } from "path"

import { Handler, CloudFrontRequestEvent } from "aws-lambda"

export const handler: Handler<CloudFrontRequestEvent> = async (
  event,
  _context,
  callback
) => {
  const { request } = event.Records[0].cf

  const parsed = parse(request.uri)
  if (parsed.ext === "") {
    request.uri = "/index.html"
  }

  return callback(null, request)
}
