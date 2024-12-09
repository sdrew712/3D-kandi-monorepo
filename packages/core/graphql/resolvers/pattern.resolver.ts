import {
  ID,
  Authorized,
  Resolver,
  Query,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
} from "type-graphql";
import { Pattern } from "../types/pattern.type";
import { getPattern } from "../../src/getPattern";
import { getPatterns } from "../../src/getPatterns";
import { createPattern } from "../../src/createPattern";
import { mapDBPatternToPattern } from "../utils/mapDBPatternToPattern";
import { type Context } from "../types/context.type";

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

@Authorized()
@Resolver()
export class PatternResolver {
  @Query((_returns) => Pattern, { nullable: true })
  async pattern(
    @Arg("id", (_type) => ID)
    id: string,
    @Ctx() ctx: Context
  ) {
    const pattern = await getPattern({ id, userId: ctx.userId });

    if (!pattern) return null;
    return mapDBPatternToPattern(pattern);
  }

  @Query((_returns) => [Pattern], { nullable: true })
  async patterns(@Ctx() ctx: Context) {
    const patterns = await getPatterns({ userId: ctx.userId });

    if (!patterns) return null;

    const mappedPatterns = patterns.map((pattern) =>
      mapDBPatternToPattern(pattern)
    );
    return mappedPatterns;
  }

  @Mutation((_returns) => Pattern)
  async createPattern(
    @Arg("planes", (_type) => [PlaneInput], { nullable: true })
    planes: PlaneInput[],
    @Arg("title", { nullable: true }) title: string,
    @Ctx() ctx: Context
  ): Promise<Pattern> {
    const newPattern = await createPattern({
      userId: ctx.userId,
      planes,
      title,
    });

    return mapDBPatternToPattern(newPattern);
  }
}
