import { Api, StackContext } from "sst/constructs";

export function GraphQL({ stack }: StackContext) {
  const graphQL = new Api(stack, "Api", {
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: "packages/core/graphql/graphql.handler",
      },
      "GET /graphql": {
        type: "graphql",
        function: "packages/core/graphql/graphql.handler",
      },
    },
  });

  stack.addOutputs({
    url: graphQL.url,
  });

  return graphQL;
}
