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
import { mapDBUserToUser } from "../utils/mapDBUserToUser";

@Resolver()
export class UserResolver {
  @Mutation((_returns) => User)
  async createUser(
    @Arg("email", (_type) => String)
    email: string,
    @Arg("username", (_type) => String)
    username: string
  ): Promise<User> {
    const newUser = await createUser({ email, username });

    return mapDBUserToUser(newUser);
  }
}
