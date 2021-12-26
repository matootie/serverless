/**
 * Main runner for development.
 */

// Application imports.
import { app } from "@app"

/**
 * Main runner function.
 */
async function run() {
  // Do some pre-run async tasks.

  // Run the server.
  app.listen(3000)
}

// Run the application.
run()
