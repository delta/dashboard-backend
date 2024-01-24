import Fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  RawServerDefault,
} from "fastify";
import { AppRegistry } from "../registry";
import { AppRouter } from "../routers";
import { envToLogConfig } from "./log";
import { config, metricsConfig, swaggerConfig } from "../config";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { getFastifyPlugin } from "swagger-stats";
import fastifyExpress from "@fastify/express";
import { IncomingMessage, ServerResponse } from "http";

const buildServer = async (): Promise<
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
  >
> => {
  const server = Fastify({
    logger: envToLogConfig[config.env],
  }).withTypeProvider<TypeBoxTypeProvider>();
  server.log.info("Sever Instance Created");

  server.log.info("Applying Swagger Options...");
  await server.register(fastifySwagger, swaggerConfig.swaggerOptions);
  await server.register(fastifySwaggerUI, swaggerConfig.swaggerUiOptions);

  // Setup Database
  await AppRegistry.SetUpDatabase(server);

  server.log.info("Creating AppController Instance...");
  const appController = AppRegistry.NewAppController();

  server.log.info("Setting up metrics...");
  await server.register(fastifyExpress);
  server.log.info("Registering swagger-stats...");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await server.register(getFastifyPlugin, metricsConfig);

  server.log.info("Setting up routes...");
  await AppRouter.setupRoutes(server, appController);

  return server;
};

export { buildServer };
