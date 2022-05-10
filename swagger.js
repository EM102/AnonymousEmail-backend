export const json = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "My User Project CRUD",
    description: "My User Project Application API",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:8888",
  basePath: "/",
  tags: [
    {
      name: "Users",
      description: "API for users in the system",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  paths: {
    "/client/signin": {
      post: {
        tags: ["Users"],
        description: "signin",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "signin",
            schema: {
              $ref: "#/definitions/signin",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Signed in",
            schema: {
              $ref: "#/definitions/singin",
            },
          },
        },
      },
    },
    "/client/sendEmail": {
      post: {
        tags: ["Emails"],
        description: "Send email",
        parameters: [
          {
            name: "email",
            in: "body",
            description: "Send Email",
            schema: {
              $ref: "#/definitions/sendEmail",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Email sent",
            schema: {
              $ref: "#/definitions/sendEmail",
            },
          },
        },
      },
    },
  },
  definitions: {
    signin: {
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    sendEmail: {
      required: ["email", "Subject", "Text"],
      properties: {
        email: { type: "string" },
        subject: { type: "string" },
        text: { type: "string" },
      },
    },
  },
};
