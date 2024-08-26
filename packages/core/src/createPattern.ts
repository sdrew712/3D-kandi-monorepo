import { marshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Plane } from "./types";
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
    pk: `USER#${userId}`,
    sk: `PATTERN#${nanoid()}`,
    planes: JSON.stringify(planes || []),
  };

  try {
    await db().putItem({
      TableName: Config.KANDI_TABLE_NAME,
      Item: marshall(newPattern),
    });

    return newPattern;
  } catch (err) {
    console.error(err);
    throw new GraphQLError("Error creating pattern");
  }
}
