import { Pattern } from "../../src/types";
import { DBPattern } from "../../src/dbTypes";

export function mapDBPatternToPattern(DBPattern: DBPattern): Pattern {
  return {
    id: DBPattern.sk.replace("PATTERN#", ""),
    userId: DBPattern.pk.replace("USER#", ""),
    planes: JSON.parse(DBPattern.planes),
  };
}
