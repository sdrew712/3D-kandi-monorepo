import { useState } from "react";
import * as THREE from "three";
import Square from "../components/Square";
import { Pattern } from "../../../core/src/types";
import { handleMouseMove } from "@/utils/handleMouseMove";
import { changeColor } from "@/utils/changeColor";
import {
  useMutation,
  gql,
  OperationVariables,
  ApolloQueryResult,
} from "@apollo/client";

export function renderPattern(
  pattern: Pattern,
  refetchPattern: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
) {
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
    z: number | null;
  }>({ x: null, y: null, z: null });
  const [currentPlane, setCurrentPlane] = useState<{
    id: string;
    x: number | null;
    y: number | null;
    z: number | null;
  }>({ id: pattern.planes[0].id, x: null, y: null, z: 0 });

  const [addBeadsToPattern] = useMutation(ADD_BEADS_TO_PATTERN, {
    variables: {
      patternId: pattern.id,
      planeId: currentPlane.id,
      beads: [
        {
          x: mousePosition.x,
          y: mousePosition.y,
          z: mousePosition.z,
          color: "#3c32a8",
        },
      ],
    },
    onCompleted: () => {
      refetchPattern();
    },
  });

  let shouldDisplayPositionSquare = true;

  pattern.planes.forEach((plane) => {
    if (
      plane.beads.some(
        (bead) => bead.x === mousePosition.x && bead.y === mousePosition.y
      )
    ) {
      shouldDisplayPositionSquare = false;
    }
  });

  return (
    <mesh
      layers={pattern.planes.length}
      onPointerMove={(e) => handleMouseMove({ e, setMousePosition })}
      onClick={() => {
        addBeadsToPattern();
      }}
    >
      {pattern.planes.map((plane) =>
        plane.beads.map((bead) => {
          if (!shouldDisplayPositionSquare) {
            if (bead.x === mousePosition.x && bead.y === mousePosition.y) {
              return (
                <Square
                  key={`${bead.x} ${bead.y} ${bead.z}`}
                  x={bead.x}
                  y={bead.y}
                  z={bead.z ?? 0}
                  color={changeColor(1, bead.color) || ""}
                />
              );
            }

            return (
              <Square
                key={`${bead.x} ${bead.y} ${bead.z}`}
                x={bead.x}
                y={bead.y}
                z={bead.z ?? 0}
                color={bead.color}
              />
            );
          }
          return (
            <Square
              key={`${bead.x} ${bead.y} ${bead.z}`}
              x={bead.x}
              y={bead.y}
              z={bead.z ?? 0}
              color={bead.color}
            />
          );
        })
      )}
      <gridHelper
        args={[50, 50, 0xff0000, "gray"]}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        position={new THREE.Vector3(0.5, 0.5, 0.5)}
      />
      <gridHelper
        args={[50, 50, 0xff0000, "gray"]}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        position={new THREE.Vector3(0.5, 0.5, -0.5)}
      />
      {shouldDisplayPositionSquare && (
        <Square
          x={currentPlane.x ?? mousePosition.x}
          y={currentPlane.y ?? mousePosition.y}
          z={currentPlane.z ?? mousePosition.z}
          color="#cbdcf7"
        />
      )}
    </mesh>
  );
}

const ADD_BEADS_TO_PATTERN = gql`
  mutation addBeadsToPattern(
    $beads: [BeadInput!]!
    $patternId: String!
    $planeId: String!
  ) {
    addBeadsToPattern(beads: $beads, patternId: $patternId, planeId: $planeId) {
      id
      userId
      planes {
        beads {
          x
          y
          z
          color
        }
      }
    }
  }
`;
