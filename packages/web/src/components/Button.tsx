import styles from "../page.module.css";

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({ text, isLoading, loadingText }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${styles.primaryButton} ${isLoading ? styles.loading : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <div className={styles.spinner}></div>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}
