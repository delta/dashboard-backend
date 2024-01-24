import Fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  RawServerDefault,
} from "fastify";
import { AppRouter } from "../routers";
import { envToLogConfig } from "../utils/log";
import { config } from "../config";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { IncomingMessage, ServerResponse } from "http";
import { AppRegistry } from "../registry";

const buildMockServer = async (): Promise<
  FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
  >
> => {
  config.env = "test";
  const server = Fastify({
    logger: envToLogConfig[config.env],
  }).withTypeProvider<TypeBoxTypeProvider>();
  server.log.info("Sever Instance Created");

  server.log.info("Creating AppController Instance...");
  const appController = AppRegistry.NewAppController();

  server.log.info("Setting up routes...");
  await AppRouter.setupRoutes(server, appController);

  return server;
};

export { buildMockServer };
