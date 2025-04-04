"use client";

import { useState } from "react";
import signUp from "../../../../core/src/firebase/auth/signup";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await signUp({ email, password });

    if (error) {
      setError("Failed to create account. Please try again.");
      setIsLoading(false);
      return;
    }

    return router.push("/");
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Create Account</h1>
        <p>Start creating your own patterns</p>

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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.authInput}
            disabled={isLoading}
          />
          <Button
            text="Create account"
            isLoading={isLoading}
            loadingText="Creating account..."
          />
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
