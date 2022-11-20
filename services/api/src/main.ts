import { app } from "./app"
import { logger } from "@app/utils"

app.listen(3001, () => {
  logger.debug("Listening...")
})
