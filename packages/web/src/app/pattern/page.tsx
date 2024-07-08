"use client";

import styles from "../page.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Excision } from "../../sample-patterns/excision";
import { renderPattern } from "@/utils/renderPattern";

export default function Pattern() {
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
        {renderPattern(Excision)}
      </Canvas>
    </div>
  );
}
