import { Static, Type } from "@sinclair/typebox";

/* ============================== AuthHeader ============================== */
/* This model is used as the header of the request that has to be authenticated */
// Creating a TypeBox model
const AuthHeaders = Type.Object({
  authorization: Type.String(),
});

// Creating a type from the TypeBox model
type AuthHeadersType = Static<typeof AuthHeaders>;

/* ============================== MessageResponse ============================== */
/* This model is used to send a message back to the client */
// Creating a TypeBox model
const MessageResponse = Type.Object({
  message: Type.String(),
});

// Creating a type from the TypeBox model
type MessageResponseType = Static<typeof MessageResponse>;

// Exporting the TypeBox model and the type of the model
export { AuthHeaders, MessageResponse };
export type { AuthHeadersType, MessageResponseType };
