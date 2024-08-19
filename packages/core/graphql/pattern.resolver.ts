import "reflect-metadata";
import { ID, Authorized, Resolver, Query, Arg } from "type-graphql";
import { Pattern } from "./pattern.type";
import { getPattern } from "../src/getPattern";

@Resolver()
export class PatternResolver {
  @Query((_returns) => Pattern, { nullable: true })
  async pattern(
    @Arg("id", (_type) => ID, { nullable: false })
    id: string
  ) {
    return getPattern({ id });
  }
}
