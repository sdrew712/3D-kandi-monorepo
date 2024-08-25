import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Pattern } from "./types";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";

export async function getPattern({
  id,
}: {
  id: string;
}): Promise<Pattern | null> {
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

    const DBPattern = unmarshall(results.Item) as DBPattern;

    const pattern = mapDBPatternToPattern({
      DBPattern,
    });

    return pattern;
  } catch (err) {
    throw new GraphQLError("Error getting pattern");
  }
}

function mapDBPatternToPattern({
  DBPattern,
}: {
  DBPattern: DBPattern;
}): Pattern {
  return {
    id: DBPattern.patternId,
    userId: DBPattern.userId,
    planes: JSON.parse(DBPattern.planes),
  };
}
