import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBUser } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";

export async function getUser({ id }: { id: string }): Promise<DBUser | null> {
  try {
    const results = await db().getItem({
      TableName: Config.KANDI_TABLE_NAME,
      Key: marshall({
        pk: `USER#${id}`,
        sk: "USER",
      }),
    });

    if (!results.Item) return null;

    const user = unmarshall(results.Item) as DBUser;

    return user;
  } catch (err) {
    throw new GraphQLError("Error getting user");
  }
}
