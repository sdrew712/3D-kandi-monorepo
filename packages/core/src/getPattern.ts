import { DBPattern } from "./dbTypes";
import { Pattern } from "./types";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export async function getPattern({
  id,
}: {
  id: string;
}): Promise<Pattern | undefined> {
  //TODO: ENV VARIABLES

  //todo: fix type
  const dynamoDb = DynamoDBDocument.from(
    new DynamoDB({
      credentials,
    }),
    {
      marshallOptions: {
        convertEmptyValues: false,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    }
  );

  try {
    const results = await dynamoDb.get({
      //todo: get table name from env
      TableName: ""
      Key: {
        patternId: id,
        //todo: get userId from auth
        userId: ""
      },
    });

    const DBPattern = results.Item as unknown as DBPattern;

    const pattern = mapDBPatternToPattern({
      DBPattern,
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
