import { buildServer } from "./utils/buildServer";
import { config } from "./config";

const startServer = async () => {
  const server = await buildServer();
  await server.ready();
  server.log.info("Starting server...");
  await server.listen({
    port: config.port,
    host: config.host,
  });
};

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
