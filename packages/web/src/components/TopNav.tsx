"use client";

import Link from "next/link";
import styles from "../page.module.css";
import signOut from "../../../core/src/firebase/auth/signout";
import { useAuth } from "../utils/useAuth";

export default function TopNav() {
  return (
    <nav className={styles.topNav}>
      <div className={styles.centered}>
        <Link href="/">Home</Link>

        <Link href="/patterns">Patterns</Link>
      </div>

      {renderAuthOptions()}
    </nav>
  );
}

function renderAuthOptions() {
  const { user } = useAuth();

  if (user) {
    return <button onClick={signOut}>Sign out</button>;
  }

  return (
    <div className={styles.centered}>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
}
