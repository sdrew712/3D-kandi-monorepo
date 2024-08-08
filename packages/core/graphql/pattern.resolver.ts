import {
  Authorized,
  Resolver,
  Field,
  Float,
  Int,
  ID,
  Query,
  ObjectType,
  Arg,
} from "type-graphql";
import "reflect-metadata";
import { Pattern } from "./pattern.type";
import { getPattern } from "../src/getPattern";

@Resolver(Pattern)
export class PatternResolver {
  @Query((_returns) => Pattern)
  async pattern(@Arg("id") id: string): Promise<Pattern> {
    return getPattern({ id });
  }
}
