import { DBUser } from "../../src/dbTypes";
import { User } from "../../src/types";

export function mapDBUserToUser(DBUser: DBUser): User {
  return {
    id: DBUser.pk.replace("USER#", ""),
    email: DBUser.email,
    username: DBUser.username,
  };
}
