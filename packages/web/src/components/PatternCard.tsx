import { Pattern } from "../../../core/src/types";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/pattern/${pattern.id}`)}
      className={styles.patternCard}
    >
      {pattern.title}
    </div>
  );
}
