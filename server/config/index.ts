import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { ConnectOptions } from "mongoose";
import { feelingBlue } from "../utils/swaggerUITheme";
import { IncomingMessage } from "http";

interface IConfig {
  // General Config
  env: "development" | "production" | "test";
  host: string;
  port: number;

  // Auth Config
  auth: {
    dauth: {
      authorizeURL: string;
      clientId: string;
      redirectUri: string;
      responseType: string;
      grantType: string;
      scope: string;
      nonce: string;
      clientSecret: string;
    };
    jwt: {
      secret: string;
      expiresIn: string;
    };
  };

  // Database Config
  database: {
    mongoUri: string;
    moogooseConnectionOptions?: ConnectOptions;
  };

  // Log Config, Production only
  log: {
    file: string;
    level: string;
  };
}

type MetricsConfig = Partial<{
  uriPath: string;
  authentication: boolean;
  onAuthenticate: (
    req: IncomingMessage,
    username: string,
    password: string
  ) => boolean | Promise<boolean>;
}>;

interface ISwaggerConfig {
  swaggerOptions: SwaggerOptions;
  swaggerUiOptions: FastifySwaggerUiOptions;
}

const getEnv = () => {
  switch (process.env.APP_ENV) {
    case "production":
      return "production";
    case "test":
      return "test";
    default:
      return "development";
  }
};

const getDBUri = () => {
  switch (getEnv()) {
    case "production":
      return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
    default:
      return `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  }
};

const config: IConfig = {
  env: getEnv(),
  host: process.env.SERVER_HOST || "",
  port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
  auth: {
    dauth: {
      authorizeURL: "https://auth.delta.nitt.edu/authorize",
      clientId: process.env.DAUTH_CLIENT_ID || "",
      redirectUri: process.env.DAUTH_REDIRECT_URI || "",
      responseType: "code",
      grantType: "authorization_code",
      scope: "email+openid+profile+user",
      nonce: "",
      clientSecret: process.env.DAUTH_CLIENT_SECRET || "",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "test",
      expiresIn: process.env.JWT_EXPIRES_IN || "1d", // 1 day by default,
    },
  },
  database: {
    mongoUri: getDBUri(),
  },
  log: {
    file: "./logs/prod.log",
    level: "info",
  },
};

const swaggerConfig: ISwaggerConfig = {
  swaggerOptions: {
    openapi: {
      info: {
        title: "Dashboard API",
        description: "Dashboard API",
        version: "1.0",
      },
      servers: [
        {
          url: `http://${config.host}`,
        },
      ],
      tags: [{ name: "User", description: "User related end-points" }],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
      },
    },
  },
  swaggerUiOptions: {
    routePrefix: "/docs",
    theme: {
      title: "Dashboard API",
      favicon: [
        {
          filename: "favicon-16x16.png",
          type: "image/png",
          rel: "icon",
          sizes: "16x16",
          content: "https://fastify.io/favicon-16x16.png",
        },
      ],
      css: [
        {
          filename: "swagger-ui-feeling-blue.css",
          content: feelingBlue,
        },
      ],
    },
  },
};

const metricsConfig: MetricsConfig = {
  uriPath: "/metrics",
  authentication: true,
  onAuthenticate: function (req, username, password) {
    return (
      username === process.env.METRICS_USERNAME &&
      password === process.env.METRICS_PASSWORD
    );
  },
};

export { config, swaggerConfig, metricsConfig };
