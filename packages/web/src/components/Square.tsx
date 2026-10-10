"use client";

import { Dispatch, SetStateAction } from "react";
import * as THREE from "three";

export default function Square({
  x,
  y,
  z = 0,
  color,
  setShouldUpdateSquare,
  isDeleteModeToggled,
  deleteBeadsFromPattern,
}: {
  x: number | null;
  y: number | null;
  z: number | null;
  color: string;
  setShouldUpdateSquare: Dispatch<SetStateAction<boolean>>;
  isDeleteModeToggled: boolean;
  deleteBeadsFromPattern: () => void;
}) {
  if (x === null || y === null || z === null) return null;

  const positionArray: [x: number, y: number, z: number] = [x, y, z];

  return (
    <mesh
      position={positionArray}
      onClick={async (e) => {
        e.stopPropagation();
        if (isDeleteModeToggled) {
          await deleteBeadsFromPattern();
        } else {
          setShouldUpdateSquare(true);
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
