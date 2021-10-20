import path from "path";

import winston, { format } from "winston";
const { combine, label, timestamp } = format;

const loggingFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const createLogger = (filename: string) => {
  return winston.createLogger({
    level: "debug",
    format: combine(
      label({ label: path.basename(filename) }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSSZZ" }),
      loggingFormat
    ),
    transports: [
      new winston.transports.File({
        filename: "logs/combined.log",
        level: "debug",
        maxsize: 100 * 1000_000 /* 100Mb */,
        maxFiles: 1,
        tailable: true,
      }),
      new winston.transports.Console(),
    ],
  });
};
