"use client";

import { useState } from "react";
import signUp from "../../../../core/src/firebase/auth/signup";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { error } = await signUp({ email, password });

    if (error) {
      //todo: error toast
    }

    return router.push("/");
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Create Account</h1>
        <p>Start creating your own patterns</p>

        <form className={styles.authForm} onSubmit={handleForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.authInput}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.authInput}
          />
          <button type="submit" className={styles.primaryButton}>
            Create account
          </button>
        </form>

        <p className={styles.authSwitch}>
          Already have an account?{" "}
          <Link href="/signin" className={styles.authLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
