import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";

export async function getPattern({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<DBPattern | null> {
  try {
    const results = await db().getItem({
      TableName: Config.KANDI_TABLE_NAME,
      Key: marshall({
        pk: `USER#${userId}`,
        sk: `PATTERN#${id}`,
      }),
    });

    if (!results.Item) return null;

    const pattern = unmarshall(results.Item) as DBPattern;

    return pattern;
  } catch (err) {
    throw new GraphQLError("Error getting pattern");
  }
}
