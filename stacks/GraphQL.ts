import { Api, Config, Function, StackContext } from "sst/constructs";

export function GraphQL({ stack }: StackContext) {
  const AWS_REGION = new Config.Secret(stack, "AWS_REGION");
  const AWS_ACCESS_KEY_ID = new Config.Secret(stack, "AWS_ACCESS_KEY_ID");
  const AWS_SECRET_ACCESS_KEY = new Config.Secret(
    stack,
    "AWS_SECRET_ACCESS_KEY"
  );
  const PATTERNS_TABLE_NAME = new Config.Secret(stack, "PATTERNS_TABLE_NAME");

  const graphQLHandler = new Function(stack, "MyFunction", {
    handler: "packages/core/graphql/graphql.handler",
    bind: [
      AWS_REGION,
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
      PATTERNS_TABLE_NAME,
    ],
  });

  const graphQL = new Api(stack, "Api", {
    cors: {
      allowMethods: ["GET", "POST"],
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: graphQLHandler,
      },
      "GET /graphql": {
        type: "graphql",
        function: graphQLHandler,
      },
    },
  });

  stack.addOutputs({
    url: graphQL.url,
  });

  return graphQL;
}
