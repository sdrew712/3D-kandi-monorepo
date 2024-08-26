import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";

export async function getPattern({
  id,
}: {
  id: string;
}): Promise<DBPattern | null> {
  try {
    const results = await db().getItem({
      TableName: Config.PATTERNS_TABLE_NAME,
      Key: marshall({
        patternId: id,
        //todo: get userId from input
        userId: "79cca841-1992-44dd-858c-39bdaa4ac6b7",
      }),
    });

    if (!results.Item) throw new Error();

    const pattern = unmarshall(results.Item) as DBPattern;

    return pattern;
  } catch (err) {
    throw new GraphQLError("Error getting pattern");
  }
}
