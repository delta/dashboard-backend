import { FastifyLoggerOptions } from "fastify";
import { config } from "../config";

const devLogConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname,reqId,responseTime,req,res",
      messageFormat: "{msg} {req.method} {req.url}",
    },
  },
};

const prodLogConfig: FastifyLoggerOptions = {
  level: config.log.level,
  file: config.log.file,
};

const envToLogConfig = {
  development: devLogConfig,
  production: prodLogConfig,
  test: false,
};

export { envToLogConfig };
