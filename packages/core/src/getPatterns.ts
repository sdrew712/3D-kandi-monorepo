import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";

export async function getPatterns({
  userId,
}: {
  userId: string;
}): Promise<DBPattern[] | null> {
  try {
    const results = await db().query({
      TableName: Config.KANDI_TABLE_NAME,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: marshall({
        ":pk": `USER#${userId}`,
      }),
    });

    if (!results.Items) return null;

    const patterns = results.Items.map((item) => unmarshall(item) as DBPattern);

    return patterns;
  } catch (err) {
    throw new GraphQLError("Error getting pattern");
  }
}
