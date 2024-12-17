"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { renderPattern } from "@/utils/renderPattern";
import { useSuspenseQuery, gql, useQuery } from "@apollo/client";
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

  const {
    loading,
    error,
    data,
    refetch: refetchPattern,
  } = useQuery(GET_PATTERN, {
    variables: {
      patternId,
    },
  });

  const pattern = data.pattern;

  if (!pattern) {
    return <div>Pattern not found.</div>;
  }

  if (loading) {
    return <div>loading...</div>;
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
        {renderPattern(pattern, refetchPattern)}
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
        id
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
