import { Pattern } from "../types/pattern.type";
import { DBPattern } from "../../src/dbTypes";

export function mapDBPatternToPattern(DBPattern: DBPattern): Pattern {
  return {
    id: DBPattern.patternId,
    userId: DBPattern.userId,
    planes: JSON.parse(DBPattern.planes),
  };
}
