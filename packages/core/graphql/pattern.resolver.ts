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

@Resolver(Pattern)
export class PatternResolver {
  @Query((_returns) => Pattern)
  async pattern(@Arg("id") id: string): Promise<Pattern> {
    return {
      id: "123",
      userId: "123",
      planes: [
        {
          beads: [{ x: 1, y: 2, z: 3, color: "#ffff" }],
        },
      ],
    };
  }
}
