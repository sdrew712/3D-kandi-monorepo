import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Pattern, Plane } from "./types";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";

export async function createPattern({
  userId,
  planes,
}: {
  userId: string;
  planes?: Plane[];
}): Promise<Pattern | null> {
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

  try {
    const results = await dynamoDb.putItem({
      TableName: Config.PATTERNS_TABLE_NAME,
      Item: marshall({
        patternId: "123",
        userId,
        planes: JSON.stringify(planes || []),
      }),
    });

    //get pattern to return it with ID
    return pattern;
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
