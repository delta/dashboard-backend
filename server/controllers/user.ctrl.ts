import { RouteHandler } from "fastify";
import { UserService } from "../services/user.svc";

import { AuthHeadersType, MessageResponseType } from "../models";
import {
  AuthCallbackRequestQueryType,
  AuthCallbackResponseBodyType,
  UserType,
} from "../models/user";
import { dauthAuthorizeURL } from "../utils/auth";

// This class is used to handle the user routes
// Prefix: /user
class UserController {
  private userService: UserService;

  constructor(us: UserService) {
    this.userService = us;
  }

  // GET /auth
  // This method is used to handle the auth route
  // It will redirect the user to the OAuth2 provider
  public auth: RouteHandler<{
    Reply: {
      500: MessageResponseType; // Internal Server Error
    };
  }> = async (_, reply) => {
    try {
      // Redirecting the user to the OAuth2 provider
      return reply.redirect(dauthAuthorizeURL.toString());
    } catch (error) {
      reply.log.error(error);
      return reply.status(500).send({
        message: "Some Error Occurred",
      });
    }
  };

  // GET /auth/callback
  // This method is used to handle the auth callback route
  // It will create a new user in the database if the user does not exist
  // It will then return a JWT token to the user
  public authCallback: RouteHandler<{
    Querystring: AuthCallbackRequestQueryType;
    Reply: {
      200: AuthCallbackResponseBodyType; // Success
      500: MessageResponseType; // Internal Server Error
    };
  }> = async (req, reply) => {
    try {
      // Getting the code from the query
      const { code } = req.query;

      // Create a new user or get the user from the database with the code
      const [user, err] = await this.userService.authCallback(code);

      // If there was an error, return the error
      if (err || user === null) {
        req.log.error(err);
        return reply.status(500).send({
          message: "Some Error Occurred",
        });
      }

      // Return the user
      return reply.status(200).send({
        user,
      });
    } catch (error) {
      reply.log.error(error);
      return reply.status(500).send({
        message: "Some Error Occurred",
      });
    }
  };

  // GET /get
  // This method is used to get the user from the database
  // It will return the user if the user is logged in
  public get: RouteHandler<{
    Headers: AuthHeadersType;
    Reply: {
      200: UserType; // Success
      401: MessageResponseType; // Unauthorized
      500: MessageResponseType; // Internal Server Error
    };
  }> = async (req, reply) => {
    let userId = req.headers.userId;

    // If the user id is not present, return an error
    if (!userId) {
      return reply.status(401).send({
        message: "Unauthorized",
      });
    }

    // If the user id is an array, get the first element
    if (Array.isArray(userId)) {
      userId = userId[0];
    }

    try {
      // Get the user from the database
      const [user, err] = await this.userService.getUserFromId(userId);

      // If there was an error, return an error
      if (err) {
        req.log.error(err);
        return reply.status(500).send({
          message: "Some Error Occurred",
        });
      }

      // If the user is not present, return an error
      if (user === null) {
        return reply.status(401).send({
          message: "Unauthorized",
        });
      }

      // Return the user
      return reply.status(200).send(user);
    } catch (error) {
      reply.log.error(error);
      return reply.status(500).send({
        message: "Some Error Occurred",
      });
    }
  };
}

export { UserController };
