export type Pattern = Plane[];

export type Plane = {
  beads: { x: number; y: number; z?: number; color: string }[];
};
