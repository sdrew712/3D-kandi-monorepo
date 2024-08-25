import "reflect-metadata";
import {
  ID,
  Authorized,
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
} from "type-graphql";
import { Pattern } from "../types/pattern.type";
import { getPattern } from "../../src/getPattern";
import { createPattern } from "../../src/createPattern";
import { mapDBPatternToPattern } from "../utils/mapDBPatternToPattern";

@InputType()
export class PlaneInput {
  @Field(() => [BeadInput], { nullable: true })
  beads: BeadInput[];
}

@InputType()
export class BeadInput {
  @Field(() => String)
  color: string;

  @Field(() => Number)
  x: number;

  @Field(() => Number)
  y: number;

  @Field(() => Number, { nullable: true })
  z?: number;
}

@Resolver()
export class PatternResolver {
  @Query((_returns) => Pattern, { nullable: true })
  async pattern(
    @Arg("id", (_type) => ID)
    id: string
  ) {
    return getPattern({ id });
  }

  @Mutation((_returns) => Pattern)
  async createPattern(
    @Arg("userId", (_type) => String)
    userId: string,
    @Arg("planes", (_type) => [PlaneInput], { nullable: true })
    planes: PlaneInput[]
  ): Promise<Pattern> {
    const newPattern = await createPattern({ userId, planes });

    return mapDBPatternToPattern(newPattern);
  }
}
