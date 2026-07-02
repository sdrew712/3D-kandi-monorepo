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
import { BeadCounter } from "@/components/BeadCounter";
import { RotateHorizontalSwitch } from "@/components/RotateHorizontalSwitch";
import { Slider } from "@mui/material";

export default function Pattern() {
  const { patternId } = useParams();
  const [horizontalSliderPos, setHorizontalSliderPos] = useState<number>(0);
  const [isHorizontalModeToggled, setIsHorizontalModeToggled] = useState(false);

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
      <div className={styles.topSliderContainer}>
        <Slider
          aria-label="Adjust x-axis"
          marks={true}
          value={horizontalSliderPos}
          onChange={(e, value) => setHorizontalSliderPos(value as number)}
          valueLabelDisplay="auto"
          color="primary"
          min={-50}
          max={50}
          step={1}
        />
      </div>
      <div className={styles.leftSideContainer}>
        <SketchPicker
          onChange={(c: ColorResult) => {
            setSelectedColor(c.hex);
          }}
          color={selectedColor}
        />
        <BeadCounter pattern={pattern} />
      </div>
      <div className={styles.rightSideContainer}>
        <div className={styles.toolContainer}>
          <RotateHorizontalSwitch
            isToggled={isHorizontalModeToggled}
            setIsToggled={setIsHorizontalModeToggled}
          />
        </div>
      </div>
      <Canvas
        camera={{
          //change this when we orient axis
          position: [0, 0, 35],
        }}
        className={styles.canvas}
      >
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {renderPattern(
          pattern,
          refetchPattern,
          selectedColor,
          horizontalSliderPos,
        )}
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
