import { Pattern } from "../../../core/src/types";
export function useAddPatternSquare({ pattern }: { pattern: Pattern }) {
  function addPatternSquare({
    coordinates,
    color,
  }: {
    coordinates: { x: number | null; y: number | null; z: number | null };
    color: string;
  }) {
    if (
      coordinates.x === null ||
      coordinates.y === null ||
      coordinates.z === null
    )
      return;
    pattern[0].beads.push({
      x: coordinates.x,
      y: coordinates.y,
      z: coordinates.z,
      color,
    });
  }

  return {
    addPatternSquare,
  };
}
