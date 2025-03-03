"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { renderPattern } from "@/utils/renderPattern";
import { useSuspenseQuery, gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { Pattern as PatternType } from "../../../../../core/src/types";
import styles from "../../../page.module.css";
import { SketchPicker, ColorResult } from "react-color";

export default function Pattern() {
  const { patternId } = useParams();

  const [selectedColor, setSelectedColor] = useState<string>("");

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
      <SketchPicker
        className={styles.colorPicker}
        onChange={(c: ColorResult) => {
          setSelectedColor(c.hex);
        }}
        color={selectedColor}
      />

      <Canvas
        camera={{
          position: [0, 0, 35],
        }}
        className={styles.canvas}
      >
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {renderPattern(pattern, refetchPattern, selectedColor)}
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
