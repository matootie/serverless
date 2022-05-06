/**
 * Express application.
 */

// External imports.
import express from "express"
import cors from "cors"

// Middleware imports.
import { authMiddleware } from "@middlewares/auth.middlewares"
import { errorMiddleware } from "@middlewares/error.middlewares"

// Initialize the app.
export const app = express()

// Use the JSON middleware.
app.use(express.json())

// Use the CORS middleware.
app.use(cors())
app.options("*", (_req, res) => res.status(204).send())

// Use the auth middleware.
app.use(authMiddleware)

// Use routes.
app.get("/hello", (_req, res) => {
  res.status(200).send("Hello!")
})

// Use the error middleware.
app.use(errorMiddleware)
