// Standard imports.
import { createInterface } from "readline"
import { writeFileSync } from "fs"

// Config imports.
import config from "@config"

// Initialize a new CLI parser.
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Initialize a new configuration object.
const newConfig = {}

// For every key and value of the existing config object...
async function run() {
  for (const [key, value] of Object.entries(config)) {
    await new Promise<void>((resolve) => {
      readline.question(
        `Update setting '${key}'? Current: '${value}' : `,
        (answer) => {
          if (answer) {
            newConfig[key] = answer
            console.log("Updated!")
          } else {
            newConfig[key] = value
            console.log("Skipped.")
          }
          resolve()
        },
      )
    })
  }
  readline.close()
}

run()
  .then(() =>
    writeFileSync("./config.json", JSON.stringify(newConfig, null, 2)),
  )
  .then(() => console.log("\nDone."))
