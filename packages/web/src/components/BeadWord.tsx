import styles from "../page.module.css";

export default function BeadWord({
  word,
  size = "md",
}: {
  word: string;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={`${styles.beadWord} ${size === "lg" ? styles.beadWordLg : ""}`}
      aria-label={word}
    >
      {word.split("").map((letter, i) => (
        <span key={i} className={styles.beadLetter} aria-hidden="true">
          {letter}
        </span>
      ))}
    </span>
  );
}
