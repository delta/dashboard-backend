import { RouteHandler } from "fastify";
import { getUserIdFromJwtToken } from "../utils/auth";
import { AuthHeadersType } from "../models";

// This middleware is used to check if there is JWT token in the header
// If there is a token, it will verify it and get the user id from it
// It is a prevalidation middleware
const authenticateJwt: RouteHandler<{
  Headers: AuthHeadersType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Reply: any;
}> = async (req, reply) => {
  const headers = req.headers;

  // If the user is not logged in, return an error
  if (!headers.authorization) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  // Checking if the header starts with Bearer
  if (!headers.authorization.startsWith("Bearer")) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  // Getting the token from the header
  const token = headers.authorization.split(" ")[1];

  // If the token is not present, return an error
  if (!token) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  let id: string | null = null;

  // Verifying the token and get the user id from it
  try {
    id = getUserIdFromJwtToken(token);
  } catch (error) {
    req.log.error(error);
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  // If the user id is not present, return an error
  if (!id) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }

  req.headers.userId = id;
};

export { authenticateJwt };
