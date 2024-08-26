import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { type Context } from "./types/context.type";
import { PatternResolver } from "./resolvers/pattern.resolver";
import { UserResolver } from "./resolvers/user.resolver";

export async function createHandler() {
  const schema = await buildSchema({
    resolvers: [PatternResolver, UserResolver],
    //only emit schema file in dev
    // emitSchemaFile: "packages/core/graphql/schema.graphql",
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  return startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
  );
}

export const handler = async (event, context, callback) => {
  const lambdaHandler = await createHandler();
  return lambdaHandler(event, context, callback);
};
