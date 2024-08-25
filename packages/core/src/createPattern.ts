import { marshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Pattern, Plane } from "./types";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";
import { db } from "./dynamo/db";

export async function createPattern({
  userId,
  planes,
}: {
  userId: string;
  planes?: Plane[];
}): Promise<DBPattern | null> {
  const newPattern: DBPattern = {
    patternId: nanoid(),
    userId,
    planes: JSON.stringify(planes || []),
  };

  try {
    await db().putItem({
      TableName: Config.PATTERNS_TABLE_NAME,
      Item: marshall(newPattern),
    });

    return newPattern;
  } catch (err) {
    console.error(err);
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
