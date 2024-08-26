import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  username: string;
}
