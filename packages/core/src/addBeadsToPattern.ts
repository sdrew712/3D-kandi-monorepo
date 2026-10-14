import { marshall } from "@aws-sdk/util-dynamodb";
import { DBPattern } from "./dbTypes";
import { Config } from "sst/node/config";
import { GraphQLError } from "graphql";
import { db } from "./dynamo/db";
import { Bead } from "./types";
import { getPattern } from "./getPattern";
import { mapDBPatternToPattern } from "../graphql/utils/mapDBPatternToPattern";
import { mapPatternToDBPattern } from "../graphql/utils/mapPatternToDBPattern";

export async function addBeadsToPattern({
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
    throw new Error("Error finding current pattern in addBeadsToPattern");
  }

  const currentPattern = mapDBPatternToPattern(currentDBPattern);

  const newPattern = mapPatternToDBPattern({
    ...currentPattern,
    planes: [
      ...currentPattern.planes.map((plane) => {
        if (plane.id === planeId) {
          // we cannot have 2 beads in 1 spot (matching x, y, z)
          // if we are trying to overwrite a bead, we should replace it with the new one and its new color.
          const prevBeads = plane.beads;

          const newBeads = beads;

          const prevBeadsWithDupesRemoved = prevBeads.filter((bead) => {
            const foundPreexisting = newBeads.find(
              (element) =>
                element.x === bead.x &&
                element.y === bead.y &&
                element.z === bead.z,
            );

            if (foundPreexisting) {
              return false;
            } else {
              return true;
            }
          });

          const newConstructedBeads = [...prevBeadsWithDupesRemoved, ...beads];

          return {
            ...plane,
            beads: newConstructedBeads,
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
    throw new GraphQLError("Error adding beads to pattern");
  }
}
