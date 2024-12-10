"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { renderPattern } from "@/utils/renderPattern";
import { useSuspenseQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import { Pattern as PatternType } from "../../../../../core/src/types";
import styles from "../../../page.module.css";

export default function Pattern() {
  const { patternId } = useParams();

  const result = useSuspenseQuery(GET_PATTERN, {
    variables: {
      patternId,
    },
  });

  //todo: fix this type
  const pattern = (result.data as any).pattern as PatternType;

  if (!pattern) {
    return <div>Pattern not found.</div>;
  }

  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{
          position: [0, 0, 35],
        }}
      >
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {renderPattern(pattern)}
      </Canvas>
    </div>
  );
}

const GET_PATTERN = gql`
  query Query($patternId: ID!) {
    pattern(id: $patternId) {
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
