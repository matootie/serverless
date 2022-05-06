/**
 * Main runner for development.
 */

// Application imports.
import { app } from "@app"

// Utility imports.
import { BaseTable } from "@utils/tables"
import { logger } from "@utils/logger"

/**
 * Main runner function.
 */
async function run() {
  // Do some pre-run async tasks.
  await BaseTable.sync()

  // Run the server.
  app.listen(3000, () => {
    logger.info("Listening...")
  })
}

// Run the application.
run().catch((error) => logger.error(error))
