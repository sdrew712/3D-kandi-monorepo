import { Config } from "sst/node/config";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export function db() {
  const credentials = {
    region: Config.AWS_REGION,
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  };

  return new DynamoDB({
    credentials,
  });
}
