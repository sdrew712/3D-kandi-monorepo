"use client";

import styles from "../page.module.css";
import { Pattern } from "../../../core/src/types";

export function BeadCounter({ pattern }: { pattern: Pattern }) {
  const beads: {
    color: string;
    count: number;
  }[] = pattern.planes
    ?.flatMap((plane) => plane.beads)
    .reduce((acc, bead) => {
      const existingBead = acc.find((b) => b.color === bead.color);
      if (existingBead) {
        existingBead.count++;
      } else {
        acc.push({ color: bead.color, count: 1 });
      }
      return acc;
    }, [] as { color: string; count: number }[]);

  console.log(beads);

  return (
    <div className={styles.beadCounter}>
      <h4>Bead Counter</h4>
      <div className={styles.beadGrid}>
        {beads.map((bead) => (
          <div key={bead.color} className={styles.beadItem}>
            <div
              className={styles.colorSquare}
              style={{ backgroundColor: bead.color }}
            />
            <div className={styles.beadCount}>{bead.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
