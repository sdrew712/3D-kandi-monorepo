"use client";

import { useEffect, useState } from "react";
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
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>,
  selectedColor: string,
  horizontalSliderPos: number,
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

  useEffect(() => {
    //updates the current plane data in respect to horizontal scroll
    //this logic will need to be updated to support multi directional horizontal scroll
    if (currentPlane.z !== horizontalSliderPos) {
      setCurrentPlane((plane) => ({
        id: plane.id,
        x: plane.x,
        y: plane.y,
        z: horizontalSliderPos,
      }));
    }
  }, [horizontalSliderPos]);

  const [shouldUpdateSquare, setShouldUpdateSquare] = useState(false);

  const [addBeadsToPattern] = useMutation(ADD_BEADS_TO_PATTERN, {
    variables: {
      patternId: pattern.id,
      planeId: currentPlane.id,
      beads: [
        {
          x: mousePosition.x,
          y: mousePosition.y,
          z: mousePosition.z,
          color: selectedColor,
        },
      ],
    },
    optimisticResponse: {
      addBeadsToPattern: {
        __typename: "Pattern",
        id: pattern.id,
        userId: pattern.userId,
        planes: pattern.planes.map((plane) => ({
          __typename: "Plane",
          id: plane.id,
          beads:
            plane.id === currentPlane.id
              ? [
                  ...plane.beads,
                  {
                    __typename: "Bead",
                    x: mousePosition.x,
                    y: mousePosition.y,
                    z: mousePosition.z,
                    color: selectedColor,
                  },
                ]
              : plane.beads,
        })),
      },
    },
    onCompleted: () => {
      refetchPattern();
    },
    onError() {
      alert("Something went wrong adding beads to your pattern :(");
    },
  });

  //using the shouldUpdateSquare value to only fire off the addBeadsToPattern mutation once.
  //otherwise, it will happen like 13 times because of the
  useEffect(() => {
    if (shouldUpdateSquare) {
      addBeadsToPattern();
    }
    setShouldUpdateSquare(false);
  }, [shouldUpdateSquare]);

  let shouldDisplayPositionSquare = true;

  pattern.planes.forEach((plane) => {
    if (
      plane.beads.some(
        (bead) => bead.x === mousePosition.x && bead.y === mousePosition.y,
      )
    ) {
      shouldDisplayPositionSquare = false;
    }
  });

  return (
    <mesh
      layers={pattern.planes.length}
      onPointerMove={(e) =>
        handleMouseMove({
          e,
          currentPlane,
          setMousePosition,
        })
      }
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
                  setShouldUpdateSquare={setShouldUpdateSquare}
                />
              );
            }
          }
          return (
            <Square
              key={`${bead.x} ${bead.y} ${bead.z}`}
              x={bead.x}
              y={bead.y}
              z={bead.z ?? 0}
              color={bead.color}
              setShouldUpdateSquare={setShouldUpdateSquare}
            />
          );
        }),
      )}
      <Grid horizontalSliderPos={horizontalSliderPos} />
      {shouldDisplayPositionSquare && (
        <Square
          x={currentPlane.x ?? mousePosition.x}
          y={currentPlane.y ?? mousePosition.y}
          z={currentPlane.z ?? mousePosition.z}
          color="#cbdcf7"
          setShouldUpdateSquare={setShouldUpdateSquare}
        />
      )}
    </mesh>
  );
}

function Grid({ horizontalSliderPos }: { horizontalSliderPos: number }) {
  const grid1Positions = {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  };

  const grid2Positions = {
    x: 0.5,
    y: 0.5,
    z: -0.5,
  };

  if (horizontalSliderPos !== 0) {
    grid1Positions.z = 0.5 + horizontalSliderPos;
    grid2Positions.z = -0.5 + horizontalSliderPos;
  }

  return (
    <>
      {/* grid1 */}
      <gridHelper
        args={[50, 50, 0xff0000, "gray"]}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        position={
          new THREE.Vector3(
            grid1Positions.x,
            grid1Positions.y,
            grid1Positions.z,
          )
        }
      />
      {/* grid2 */}
      <gridHelper
        args={[50, 50, 0xff0000, "gray"]}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        position={
          new THREE.Vector3(
            grid2Positions.x,
            grid2Positions.y,
            grid2Positions.z,
          )
        }
      />
    </>
  );
}

const ADD_BEADS_TO_PATTERN = gql`
  mutation addBeadsToPattern(
    $beads: [BeadInput!]!
    $patternId: ID!
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
