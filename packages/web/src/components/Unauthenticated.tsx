import Link from "next/link";
import styles from "../page.module.css";

export default function Unauthenticated() {
  return (
    <div className={styles.unauthenticated}>
      <h1>Welcome to 3D Kandi</h1>
      <p>Where you can create and share 3D bead patterns!</p>
      <p>Built for 3D perler art, but flexible for any type of 3D pixel art.</p>
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
