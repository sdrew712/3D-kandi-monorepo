"use client";

import * as THREE from "three";

export default function Square({
  x,
  y,
  z = 0,
  color,
  addBeadsToPattern,
  isDeleteModeToggled,
  deleteBeadsFromPattern,
  userIsPanning,
}: {
  x: number | null;
  y: number | null;
  z: number | null;
  color: string;
  addBeadsToPattern: () => void;
  isDeleteModeToggled: boolean;
  deleteBeadsFromPattern: () => void;
  userIsPanning: boolean;
}) {
  if (x === null || y === null || z === null) return null;

  const positionArray: [x: number, y: number, z: number] = [x, y, z];

  return (
    <mesh
      position={positionArray}
      onClick={async (e) => {
        //delete or add a bead based on mode selected
        e.stopPropagation();
        if (userIsPanning) return;

        if (isDeleteModeToggled) {
          await deleteBeadsFromPattern();
        } else {
          addBeadsToPattern();
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial color={color} />

      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(1, 1, 1)]}
        />
        <lineBasicMaterial attach="material" color="gray" />
      </lineSegments>
    </mesh>
  );
}
