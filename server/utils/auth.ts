import { config } from "../config";
import jwt from "jsonwebtoken";

const dauthAuthorizeURL = new URL(config.auth.dauth.authorizeURL);

dauthAuthorizeURL.searchParams.append("client_id", config.auth.dauth.clientId);
dauthAuthorizeURL.searchParams.append(
  "redirect_uri",
  config.auth.dauth.redirectUri
);
dauthAuthorizeURL.searchParams.append(
  "response_type",
  config.auth.dauth.responseType
);
dauthAuthorizeURL.searchParams.append(
  "grant_type",
  config.auth.dauth.grantType
);
dauthAuthorizeURL.searchParams.append("scope", config.auth.dauth.scope);
dauthAuthorizeURL.searchParams.append("nonce", config.auth.dauth.nonce);

const generateJwtToken = (id: string): string => {
  return jwt.sign(
    {
      id,
    },
    config.auth.jwt.secret,
    {
      expiresIn: config.auth.jwt.expiresIn,
    }
  );
};

const getUserIdFromJwtToken = (token: string): string => {
  const { id } = jwt.verify(token, config.auth.jwt.secret) as { id: string };
  return id;
};

export { dauthAuthorizeURL, generateJwtToken, getUserIdFromJwtToken };
