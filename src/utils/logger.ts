import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ level, message, timestamp }) => {
      if (level === "error") {
        return `😵 ${timestamp} [${level.toUpperCase()}]: ${message}`;
      }
      if (level === "warn") {
        return `⚠️ ${timestamp} [${level.toUpperCase()}]: ${message}`;
      }
      return `✅ ${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
  exitOnError: false, // Continue logging even if an error occurs while logging itself
});

export default logger;
