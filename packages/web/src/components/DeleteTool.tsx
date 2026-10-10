import { Dispatch, SetStateAction } from "react";
import styles from "../page.module.css";

export function DeleteTool({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className={styles.toolButton}
      aria-pressed={isToggled}
      onClick={() => setIsToggled(!isToggled)}
    >
      <svg
        className={styles.toolIcon}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="12" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="1" y="4" width="6" height="8" fill="currentColor" />
        <rect x="9" y="14" width="2" height="2" fill="currentColor" />
        <rect x="12" y="14" width="3" height="2" fill="currentColor" />
      </svg>
      <span>Erase Beads</span>
      <span className={styles.toolState}>{isToggled ? "On" : "Off"}</span>
    </button>
  );
}
