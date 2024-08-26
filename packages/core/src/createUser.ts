import { marshall } from "@aws-sdk/util-dynamodb";
import { DBUser } from "./dbTypes";
import { User, Plane } from "./types";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";
import { db } from "./dynamo/db";

export async function createUser({
  email,
  username,
}: {
  email: string;
  username: string;
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

    return newUser;
  } catch (err) {
    console.error(err);
    throw new GraphQLError("Error creating user");
  }
}
