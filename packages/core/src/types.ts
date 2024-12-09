export type Pattern = {
  id: string;
  userId: string;
  planes: Plane[];
  title: string;
};

export type Plane = {
  beads: Bead[];
};

export type Bead = { x: number; y: number; z?: number; color: string };

export type User = {
  id: string;
  email: string;
  username: string;
};
