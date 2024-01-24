# Documentation for Dashboard Backend

Make sure you have read the main [README](../README.md) before reading this.

## Setup

- Copy the `.env.example` file to `.env` and fill in the values. These values are required for the backend to run and determine the environment.

### Docker Development

1. Make sure you have docker installed on your system. If not, follow the instructions [here](https://docs.docker.com/get-docker/).
1. Just run `docker-compose up` or `docker compose up` in the root directory of the project. This will start the backend service and the database service.

### Local Development

1. Make sure your .env file is filled with the required values.
1. Run `yarn install` to install all the dependencies.
1. Run `yarn dev` to start the development server.

## Testing

We use [Jest](https://jestjs.io/) for testing. To run the tests, run `yarn test` or use docker to run the tests. To run in docker, run `docker build -t sevrer-test -f Dockerfile.test .` and then `docker run --rm sevrer-test`.

## Development

We use [Fastify](https://www.fastify.io/) as the HTTP server library. We use [fastify-type-provider-typebox](https://github.com/fastify/fastify-type-provider-typebox) to integrate [TypeBox](https://github.com/sinclairzx81/typebox) with Fastify. This allows us to validate the request as well as generate the OpenAPI schema for the API.

### Some key terms:

1. **Schemas** (location: `server/schemas`): These are the database schemas. We use [Mongoose](https://mongoosejs.com/) to define the schemas.
1. **Models** (location: `server/models`): These are the type definitions for the all sorts of data that we use in the backend. These are used to validate the request and response data. Naming models is crucial for readability.
1. **Repositories** (location: `server/repositories`): These are the classes that interact with the database. These classes are used by the service layers.
1. **Services** (location: `server/services`): These are the classes that interact with the repositories and perform the business logic. These classes are used by the controllers.
1. **Controllers** (location: `server/controllers`): These are the classes that interact with the services and perform the HTTP operations. These classes are used by the routes.
1. **Routers** (location: `server/routers`): These are the classes that define the HTTP routes. These classes are used by the server.
1. **Middlewares** (location: `server/middlewares`): These are the functions that are used to perform some operations before the request reaches the controller. These functions are used by the routes. You can find the lifecycle of a request [here](https://www.fastify.io/docs/latest/Lifecycle/), which will help you understand where the middlewares are used.
1. **Mocks** (location: `server/mocks`): These are the code that is used to mock the data for testing purposes.
1. **Registry** (location: `server/registry`): This is the file that is used to register all the routers and other plugins with the server.

### Creating a Controller

1. Make sure you have the service layer ready for the controller. Thereby, you should have the repositories ready for the service layer.
1. Find what registry the controller should be registered in. If you are creating a new registry, make sure you register it in the `server/registry/index.ts` file while building th registry in the `server/registry` directory.
1. Create a new controller file in the `server/controllers/<registry-name.ctrl.ts>` directory as function of the controller class.
   Example:

```ts
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
   // Code to get the user
   // ...
};
```

As we see above, give a tag with `REQUEST_METHOD /request_url` (ex: `GET /get`) and give a short description of the method in the comment above the method. Also, make sure you give the type of the request and response in the comment above the method. This will be used to validate the request and response data. Create these as models.

4. Add the router in the router file in the `server/routers/<registry-name.router.ts>` directory.
   Example:

```ts
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
    },
    preValidation: [authenticateJwt],
  },
  this.userController.get
);
```

As we see above, use server.METHOD to define the route. Give the url as the first argument. Give the schema along with the middlewares as the second argument. Give the controller method as the third argument. Make sure to specify the tags in the schema. This will be used to generate the OpenAPI schema.
