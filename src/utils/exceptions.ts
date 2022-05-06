/**
 * Exception utilities.
 *
 * Useful HTTP error codes in throwable errors.
 */

/**
 * Base HTTP error.
 */
export abstract class HTTPError extends Error {
  abstract status: number
  abstract error: string
  constructor(message?: string) {
    super(message)
  }
}

/**
 * Invalid request error.
 */
export class InvalidRequestError extends HTTPError {
  status = 400
  error = "Invalid request."
}

/**
 * Unauthorized error.
 */
export class UnauthorizedError extends HTTPError {
  status = 401
  error = "Unauthorized."
}

/**
 * Forbidden error.
 */
export class ForbiddenError extends HTTPError {
  status = 403
  error = "Forbidden."
}

/**
 * Not found error.
 */
export class NotFoundError extends HTTPError {
  status = 404
  error = "Not found."
}

/**
 * Not implemented error.
 */
export class NotImplementedError extends HTTPError {
  status = 404
  error = "Not yet implemented."
}

/**
 * Too many requests error.
 */
export class TooManyRequestsError extends HTTPError {
  status = 429
  error = "You are being rate limited."
}

/**
 * Server error.
 */
export class ServerError extends HTTPError {
  status = 500
  error = "Internal server error."
}
