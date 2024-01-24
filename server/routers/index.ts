import { FastifyInstance } from "fastify";
import { AppController } from "../controllers";
import { UserRouter } from "./user.router";

class AppRouter {
  static async setupRoutes(
    server: FastifyInstance,
    appController: AppController
  ) {
    const userRouter = new UserRouter(appController.User);
    await userRouter.setupRoutes(server);
  }
}

export { AppRouter };
