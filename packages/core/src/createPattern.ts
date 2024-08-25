import { marshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Pattern, Plane } from "./types";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";

export async function createPattern({
  userId,
  planes,
}: {
  userId: string;
  planes?: Plane[];
}): Promise<DBPattern | null> {
  //todo: extract this to a shared function
  const credentials = {
    region: Config.AWS_REGION,
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  };

  const dynamoDb = new DynamoDB({
    credentials,
    region: "us-west-2",
  });

  const newPattern: DBPattern = {
    patternId: nanoid(),
    userId,
    planes: JSON.stringify(planes || []),
  };

  try {
    await dynamoDb.putItem({
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
