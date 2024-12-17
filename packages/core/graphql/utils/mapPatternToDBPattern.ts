import { Pattern } from "../../src/types";
import { DBPattern } from "../../src/dbTypes";

export function mapPatternToDBPattern(pattern: Pattern): DBPattern {
  return {
    pk: `USER#${pattern.userId}`,
    sk: `PATTERN${pattern.id}`,
    planes: JSON.stringify(pattern.planes),
    title: pattern.title,
  };
}
