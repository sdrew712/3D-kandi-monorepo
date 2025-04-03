import Link from "next/link";
import styles from "../page.module.css";

export default function Unauthenticated() {
  return (
    <div className={styles.unauthenticated}>
      <h1>Welcome to 3D Kandi</h1>
      <p>Create and share beautiful bead patterns</p>
      <div className={styles.authButtons}>
        <Link href="/signin" className={styles.primaryButton}>
          Sign in
        </Link>
        <Link href="/signup" className={styles.secondaryButton}>
          Create account
        </Link>
      </div>
    </div>
  );
}
