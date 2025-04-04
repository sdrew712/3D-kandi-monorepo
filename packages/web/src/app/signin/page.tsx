"use client";

import { useState } from "react";
import signIn from "../../../../core/src/firebase/auth/signin";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await signIn({ email, password });

    if (error) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    return router.push("/");
  };
  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Welcome Back</h1>
        <p>Sign in to continue creating patterns</p>

        <form className={styles.authForm} onSubmit={handleForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.authInput}
            disabled={isLoading}
          />
          <div className={styles.passwordContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.authInput}
              disabled={isLoading}
            />
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            text="Sign in"
            loadingText="Signing in..."
          />
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
