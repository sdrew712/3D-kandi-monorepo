import { marshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";
import { Bead } from "./types";
import { getPattern } from "./getPattern";
import { mapDBPatternToPattern } from "../graphql/utils/mapDBPatternToPattern";
import { mapPatternToDBPattern } from "../graphql/utils/mapPatternToDBPattern";

const beadKey = (bead: Bead) => `${bead.x},${bead.y},${bead.z ?? 0}`;

export async function deleteBeadsFromPattern({
  userId,
  patternId,
  planeId,
  beads,
}: {
  userId: string;
  patternId: string;
  planeId: string;
  beads: Bead[];
}): Promise<DBPattern> {
  const currentDBPattern = await getPattern({
    id: patternId,
    userId,
  });

  if (!currentDBPattern) {
    throw new Error("Error finding current pattern in deleteBeadsFromPattern");
  }

  const currentPattern = mapDBPatternToPattern(currentDBPattern);
  const beadsToDelete = new Set(beads.map(beadKey));

  const newPattern = mapPatternToDBPattern({
    ...currentPattern,
    planes: [
      ...currentPattern.planes.map((plane) => {
        if (plane.id === planeId) {
          return {
            ...plane,
            beads: plane.beads.filter(
              (bead) => !beadsToDelete.has(beadKey(bead)),
            ),
          };
        }
        return plane;
      }),
    ],
  });

  try {
    await db().updateItem({
      TableName: Config.KANDI_TABLE_NAME,
      Key: {
        pk: {
          S: `USER#${userId}`,
        },
        sk: {
          S: `PATTERN#${patternId}`,
        },
      },
      UpdateExpression: "SET #planes = :planes",
      ExpressionAttributeNames: {
        "#planes": "planes",
      },
      ExpressionAttributeValues: marshall({ ":planes": newPattern.planes }),
    });

    return newPattern;
  } catch (err) {
    console.error(err);
    throw new GraphQLError("Error removing beads from pattern");
  }
}
