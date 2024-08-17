import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { type Context } from "./context.type";
import { PatternResolver } from "./pattern.resolver";

export async function main() {
  const schema = await buildSchema({
    resolvers: [PatternResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer<Context>({ schema });

  server.start();
}

export const handler = main();
