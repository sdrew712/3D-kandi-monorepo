import { Authorized, Field, Float, Int, ID, ObjectType } from "type-graphql";
import "reflect-metadata";

@ObjectType()
class Bead {
  @Field((type) => Int)
  x: number;

  @Field((type) => Int)
  y: number;

  @Field((type) => Int, { nullable: true })
  z?: number;

  @Field()
  color: string;
}

@ObjectType()
export class Plane {
  @Field((type) => [Bead])
  beads: Bead[];
}

@ObjectType()
export class Pattern {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field((type) => [Plane])
  planes: Plane[];
}
