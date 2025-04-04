"use client";

import { useState } from "react";
import signIn from "../../../../core/src/firebase/auth/signin";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { error } = await signIn({ email, password });

    if (error) {
      return console.log(error);
    }

    return router.push("/");
  };
  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Welcome Back</h1>
        <p>Sign in to continue creating patterns</p>

        <form className={styles.authForm} onSubmit={handleForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.authInput}
          />
          <div className={styles.passwordContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.authInput}
            />
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" className={styles.primaryButton}>
            Sign in
          </button>
        </form>

        <p className={styles.authSwitch}>
          Don't have an account?{" "}
          <Link href="/signup" className={styles.authLink}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
