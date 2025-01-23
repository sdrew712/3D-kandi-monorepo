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
import { customAuthChecker } from "./authChecker";
import { getFirebaseUser } from "../src/firebase/getFirebaseUser";

export async function createHandler() {
  const schema = await buildSchema({
    resolvers: [PatternResolver, UserResolver],
    authChecker: customAuthChecker,
    authMode: "null",
    //only emit schema file in dev
    emitSchemaFile: "packages/core/graphql/schema.graphql",
  });

  const server = new ApolloServer<Context>({
    schema,
    introspection: true,
  });

  return startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
    {
      context: async (req) => {
        const { userId, email } = await getFirebaseUser(
          req.event.headers.authorization
        );
        return { userId, email };
      },
      // context: async (req) => ({
      //   authorization: req.event.headers.authorization,
      // }),
    }
  );
}

export const handler = async (event, context, callback) => {
  const lambdaHandler = await createHandler();
  return lambdaHandler(event, context, callback);
};
