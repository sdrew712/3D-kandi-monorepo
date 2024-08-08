export type Pattern = {
  id: string;
  userId: string;
  planes: Plane[];
};

export type Plane = {
  beads: Bead[];
};

export type Bead = { x: number; y: number; z?: number; color: string };
