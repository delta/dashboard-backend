import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.ctrl";
import { MessageResponse } from "../models";
import {
  AuthCallbackRequestQuery,
  AuthCallbackResponseBody,
  User,
} from "../models/user";
import { authenticateJwt } from "../middlewares/auth";

class UserRouter {
  private userController: UserController;
  private urlPrefix: string = "/user";

  constructor(uc: UserController) {
    this.userController = uc;
  }

  public async setupRoutes(server: FastifyInstance) {
    await server.register((server, opts, done) => {
      server.get(
        this.urlPrefix + "/auth",
        {
          schema: {
            description:
              "Redirect to OAuth2 provider with the client id and information",
            tags: ["User"],
            response: {
              500: MessageResponse,
            },
          },
        },
        this.userController.auth
      );
      server.get(
        this.urlPrefix + "/auth/callback",
        {
          schema: {
            description:
              "Callback route for OAuth2 provider to redirect to after authentication",
            tags: ["User"],
            querystring: AuthCallbackRequestQuery,
            response: {
              200: AuthCallbackResponseBody,
              500: MessageResponse,
            },
          },
        },
        this.userController.authCallback
      );
      server.get(
        this.urlPrefix + "/get",
        {
          schema: {
            description: "Get the current user",
            tags: ["User"],
            response: {
              200: User,
              401: MessageResponse,
              500: MessageResponse,
            },
            security: [
              {
                apiKey: [],
              },
            ],
          },
          preValidation: [authenticateJwt],
        },
        this.userController.get
      );
      // Add more routes here
      done();
    });
  }
}

export { UserRouter };
