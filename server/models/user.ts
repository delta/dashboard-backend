import { Static, Type } from "@sinclair/typebox";
import { genders, batches } from "../utils/constants";

/* ============================== UserType ============================== */
// This model is the schema of the user that will be shared with the client
// Creating a TypeBox model
const User = Type.Object({
  name: Type.String(),
  rollNumber: Type.String(),
  gender: Type.Union(genders.map((gender) => Type.Literal(gender))),
  batch: Type.Union(batches.map((batch) => Type.Literal(batch))),
});

const UserWithToken = Type.Intersect([
  User,
  Type.Object({
    token: Type.String(),
  }),
]);

// Creating a type from the TypeBox model
type UserType = Static<typeof User>;
type UserWithTokenType = Static<typeof UserWithToken>;

/* ============================== AuthCallbackRequestQuery ============================== */
// This model is the query of the auth callback route
// Creating a TypeBox model
const AuthCallbackRequestQuery = Type.Object({
  code: Type.String(),
});

// Creating a type from the TypeBox model
type AuthCallbackRequestQueryType = Static<typeof AuthCallbackRequestQuery>;

/* ============================== AuthCallbackResponseBody ============================== */
// This model is the response body of the auth callback route
// Creating a TypeBox model
const AuthCallbackResponseBody = Type.Object({
  user: UserWithToken,
});

// Creating a type from the TypeBox model
type AuthCallbackResponseBodyType = Static<typeof AuthCallbackResponseBody>;

// Exporting the TypeBox model and the type of the model
export {
  User,
  UserWithToken,
  AuthCallbackRequestQuery,
  AuthCallbackResponseBody,
};
export type {
  UserType,
  UserWithTokenType,
  AuthCallbackRequestQueryType,
  AuthCallbackResponseBodyType,
};
