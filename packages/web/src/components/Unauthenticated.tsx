import Link from "next/link";
import styles from "../page.module.css";

export default function Unauthenticated() {
  return (
    <div className={styles.unauthenticated}>
      <h1>
        Welcome to 3d kandi! Please sign in or make an account to continue.
      </h1>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
}
