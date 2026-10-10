import { Dispatch, SetStateAction } from "react";
import styles from "../page.module.css";

export function HideGridTool({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className={`${styles.toolButton} ${styles.hideGridTool}`}
      aria-pressed={isToggled}
      onClick={() => setIsToggled(!isToggled)}
    >
      <svg
        className={styles.toolIcon}
        viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect x="5" y="1" width="2" height="14" fill="currentColor" />
        <rect x="9" y="1" width="2" height="14" fill="currentColor" />
        <rect x="1" y="5" width="14" height="2" fill="currentColor" />
        <rect x="1" y="9" width="14" height="2" fill="currentColor" />
        {isToggled && (
          <rect
            className={styles.hideGridSlash}
            x="-2"
            y="7"
            width="20"
            height="2"
            transform="rotate(45 8 8)"
          />
        )}
      </svg>
      <span>Hide Grid</span>
      <span className={styles.toolState}>{isToggled ? "On" : "Off"}</span>
    </button>
  );
}
