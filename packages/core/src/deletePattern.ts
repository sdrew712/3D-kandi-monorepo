import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";
import { getPattern } from "./getPattern";

export async function deletePattern({
  userId,
  patternId,
}: {
  userId: string;
  patternId: string;
}): Promise<DBPattern> {
  const currentDBPattern = await getPattern({
    id: patternId,
    userId,
  });

  if (!currentDBPattern) {
    throw new Error("Error finding current pattern in deletePattern");
  }

  try {
    await db().deleteItem({
      TableName: Config.KANDI_TABLE_NAME,
      Key: {
        pk: {
          S: `USER#${userId}`,
        },
        sk: {
          S: `PATTERN#${patternId}`,
        },
      },
    });

    return currentDBPattern;
  } catch (err) {
    console.error(err);
    throw new GraphQLError("Error removing beads in pattern");
  }
}
