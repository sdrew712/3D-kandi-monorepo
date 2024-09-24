import { marshall } from "@aws-sdk/util-dynamodb";
import { DBUser } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";
import { db } from "./dynamo/db";

import signUp from "./firebase/auth/signup";

export async function createUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}): Promise<DBUser> {
  const newUser: DBUser = {
    pk: `USER#${nanoid()}`,
    sk: "USER",
    email,
    username,
  };

  try {
    await db().putItem({
      TableName: Config.KANDI_TABLE_NAME,
      Item: marshall(newUser),
    });
  } catch (err) {
    throw new GraphQLError("Error creating user");
  }

  try {
    await signUp({
      email,
      password,
    });
  } catch (err) {
    throw new GraphQLError("Error signing up user");
  }
  return newUser;
}
