import Link from "next/link";
import styles from "./page.module.css";

export default function TopNav() {
  return (
    <nav className={styles.topNav}>
      <div>
        <Link href="/">Home</Link>

        <Link href="/pattern">Pattern</Link>
      </div>

      <div>
        <Link href="/signin">Sign Out</Link>
      </div>
    </nav>
  );
}
