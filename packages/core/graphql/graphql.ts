import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { type Context } from "./context.type";
import { PatternResolver } from "./pattern.resolver";

export async function handler() {
  const schema = await buildSchema({
    resolvers: [PatternResolver],
    emitSchemaFile: "packages/core/graphql/schema.graphql",
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  const lambdaHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
  );

  return lambdaHandler;
}
