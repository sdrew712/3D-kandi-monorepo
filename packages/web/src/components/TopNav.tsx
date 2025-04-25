"use client";

import Link from "next/link";
import styles from "../page.module.css";
import signOut from "../../../core/src/firebase/auth/signout";
import { useAuth } from "../hooks/useAuth";

export default function TopNav() {
  return (
    <nav className={styles.topNav}>
      {renderNavOptions()}
      {renderAuthOptions()}
    </nav>
  );
}

function renderNavOptions() {
  const { user } = useAuth();

  return (
    <div className={styles.centered}>
      <Link href="/">Home</Link>

      {user && <Link href="/patterns">Patterns</Link>}
    </div>
  );
}

function renderAuthOptions() {
  const { user } = useAuth();

  if (user) {
    return <a onClick={signOut}>Sign out</a>;
  }

  return (
    <div className={styles.centered}>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
}
