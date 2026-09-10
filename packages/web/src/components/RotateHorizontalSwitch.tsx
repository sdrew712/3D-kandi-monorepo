import { Dispatch, SetStateAction } from "react";
import styles from "../page.module.css";

export function RotateHorizontalSwitch({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <label className={styles.switchRow}>
      <span className={styles.switchLabel}>Rotate Horizontally</span>
      <span className={styles.switch}>
        <input
          type="checkbox"
          checked={isToggled}
          onChange={() => setIsToggled(!isToggled)}
        />
        <span className={styles.switchTrack} aria-hidden="true">
          <span className={styles.switchThumb} />
        </span>
      </span>
    </label>
  );
}
