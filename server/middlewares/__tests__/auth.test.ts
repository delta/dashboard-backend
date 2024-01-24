import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  FastifyInstance,
  RawServerDefault,
  FastifyBaseLogger,
  RouteHandler,
} from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import { buildMockServer } from "../../mocks/server";
import { authenticateJwt } from "../auth";
import { generateJwtToken } from "../../utils/auth";

const PROTECTED_ROUTE = "/some_protected_route";

describe("Auth Middleware", () => {
  let server: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
  >;

  // Setup the server before all tests
  beforeAll(async () => {
    server = await buildMockServer();
    const someProtectedRoute: RouteHandler = async (req, reply) => {
      return reply.status(200).send({
        id: req.headers.userId,
      });
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    server.get(
      PROTECTED_ROUTE,
      {
        preValidation: [authenticateJwt],
      },
      someProtectedRoute
    );
  });

  // Request validation
  test("Invalid Requests", async () => {
    const requestHeaders: {
      [key: string]: string;
    } = {};

    const res = await server.inject({
      method: "GET",
      url: PROTECTED_ROUTE,
      headers: requestHeaders,
    });
    expect(res.statusCode).toBe(401);

    requestHeaders["authorization"] = "Some random string";

    const res2 = await server.inject({
      method: "GET",
      url: PROTECTED_ROUTE,
      headers: requestHeaders,
    });
    expect(res2.statusCode).toBe(401);

    requestHeaders["authorization"] = "Bearer invalid_token";

    const res3 = await server.inject({
      method: "GET",
      url: PROTECTED_ROUTE,
      headers: requestHeaders,
    });
    expect(res3.statusCode).toBe(401);
  });

  // Token verification
  test("Token Verification", async () => {
    const id = "some_random_id";
    const token = generateJwtToken(id);

    const res4 = await server.inject({
      method: "GET",
      url: PROTECTED_ROUTE,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    expect(res4.statusCode).toBe(200); // This should be 200
    expect(res4.json()).toEqual({
      id,
    }); // This should be equal to { id } which is the id we passed to the generateJwtToken function
  });

  // Close the server after all tests
  afterAll(async () => {
    await server.close();
  });
});
