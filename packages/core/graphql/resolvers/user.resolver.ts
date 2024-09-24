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
import { User } from "../types/user.type";
import { createUser } from "../../src/createUser";
import { getUser } from "../../src/getUser";
import { mapDBUserToUser } from "../utils/mapDBUserToUser";

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: true })
  async user(
    @Arg("id", (_type) => ID)
    id: string
  ) {
    const user = await getUser({ id });
    return mapDBUserToUser(user);
  }

  @Mutation((_returns) => User)
  async createUser(
    @Arg("email", (_type) => String)
    email: string,
    @Arg("username", (_type) => String)
    username: string,
    @Arg("password", (_type) => String)
    password: string
  ): Promise<User> {
    const newUser = await createUser({ email, username, password });

    return mapDBUserToUser(newUser);
  }
}
