/**
 * Error middlewares.
 */

// External imports.
import { ErrorRequestHandler } from "express"
import { StructError } from "superstruct"

// Utility imports.
import { HTTPError, ServerError } from "@utils/exceptions"

/**
 * Error handler logic.
 */
interface CheckErrorInput {
  error: any
}
interface CheckErrorOutput {
  status: number
  message?: string
  error: string
}
function checkError({ error }: CheckErrorInput): CheckErrorOutput {
  if (error instanceof HTTPError) {
    return {
      status: error.status,
      message: error.message,
      error: error.error,
    }
  } else if (error instanceof StructError) {
    return {
      status: 400,
      message: error.message,
      error: "Request validation error.",
    }
  } else if (error.expose && error.statusCode) {
    return {
      status: error.statusCode,
      error: "Invalid request.",
    }
  } else {
    const serverError = new ServerError("An unknown error has occurred.")
    return {
      status: serverError.status,
      message: serverError.message,
      error: serverError.error,
    }
  }
}

/**
 * Express error handler.
 */
export const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  // Skip if headers have been sent.
  if (res.headersSent) return next(err)
  // Check the type of error and build the appropriate response.
  const { status, ...rest } = checkError({ error: err })
  // Send the error response.
  res.status(status).send(rest)
}
