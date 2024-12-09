import { Authorized, Field, Float, Int, ID, ObjectType } from "type-graphql";

@ObjectType()
class Bead {
  @Field((type) => Int)
  x: number;

  @Field((type) => Int)
  y: number;

  @Field((type) => Int, { nullable: true })
  z?: number;

  @Field((type) => String)
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

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  title: string;

  @Field((type) => [Plane], { nullable: "items" })
  planes: Plane[];
}
