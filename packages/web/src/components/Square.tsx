import * as THREE from "three";

export default function Square({
  x,
  y,
  z = 0,
  color,
}: {
  x: number | null;
  y: number | null;
  z: number | null;
  color: string;
}) {
  if (x === null || y === null || z === null) return null;

  const positionArray: [x: number, y: number, z: number] = [x, y, z];

  return (
    <mesh position={positionArray}>
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
