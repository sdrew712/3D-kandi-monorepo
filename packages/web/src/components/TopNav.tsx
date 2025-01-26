"use client";

import Link from "next/link";
import styles from "../page.module.css";
import signOut from "../../../core/src/firebase/auth/signout";
import { useAuth } from "../hooks/useAuth";

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
    return <div onClick={signOut}>Sign out</div>;
  }

  return (
    <div className={styles.centered}>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
}
