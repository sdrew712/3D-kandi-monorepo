import { Pattern } from "../../../core/src/types";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/pattern/${pattern.id}`)}
      className={styles.patternCard}
    >
      <DeleteOutlineIcon className={styles.deleteIcon} />
      {pattern.title}
    </div>
  );
}
