import winston from "winston"

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
})
