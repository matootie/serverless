export abstract class HTTPError extends Error {
  abstract status: number
  abstract error: string
  constructor(message?: string) {
    super(message)
  }
}

export class InvalidRequestError extends HTTPError {
  status = 400
  error = "Invalid request."
}

export class UnauthorizedError extends HTTPError {
  status = 401
  error = "Unauthorized."
}

export class ForbiddenError extends HTTPError {
  status = 403
  error = "Forbidden."
}

export class NotFoundError extends HTTPError {
  status = 404
  error = "Not found."
}

export class ServerError extends HTTPError {
  status = 500
  error = "Internal server error."
}
