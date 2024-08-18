import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Pattern } from "./types";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Config } from "sst/node/config";

export async function getPattern({
  id,
}: {
  id: string;
}): Promise<Pattern | undefined> {
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
    const results = await dynamoDb.getItem({
      //todo: get table name from env
      TableName: Config.PATTERNS_TABLE_NAME,
      Key: marshall({
        patternId: id,
        //todo: get userId from auth
        userId: ""
      }),
    });

    const DBPattern = results.Item as unknown as DBPattern;

    const pattern = mapDBPatternToPattern({
      DBPattern: unmarshall(DBPattern),
    });

    return pattern;
  } catch (err) {
    console.error(err);
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
