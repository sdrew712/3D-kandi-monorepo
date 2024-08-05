import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { type Context } from "./context.type";
import { PatternResolver } from "./pattern.resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PatternResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer<Context>({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      user: {
        id: 1,
        name: "Sample user",
        roles: ["REGULAR"],
      },
    }),
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap().catch(console.error);
