"use client";

import styles from "../../page.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { renderPattern } from "@/utils/renderPattern";
import { useSuspenseQuery, gql } from "@apollo/client";

export default function Pattern() {
  const result = useSuspenseQuery(GET_PATTERN, {
    variables: {
      //todo: get pattern with ID
      patternId: "eQ71dQ1scxh5T1nivXQ_-",
    },
  });

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
        {/* todo: fix this type */}
        {renderPattern(result.data.pattern)}
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
