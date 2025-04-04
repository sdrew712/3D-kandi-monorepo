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
  title,
}: {
  userId: string;
  //todo: use generated type
  planes?: Omit<Plane, "id">[];
  title: string;
}): Promise<DBPattern> {
  const newPattern: DBPattern = {
    pk: `USER#${userId}`,
    sk: `PATTERN#${nanoid()}`,
    title,
    planes: JSON.stringify([
      {
        id: nanoid(),
        beads: [],
      },
    ]),
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
