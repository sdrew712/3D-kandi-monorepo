"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../core/src/firebase/config";
import styles from "../../page.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      alert("Something went wrong resetting your password :(");
    }
  };

  if (emailSent) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authContainer}>
          <h1>Check Your Email</h1>
          <p>We've sent password reset instructions to your email</p>
          <Link href="/signin" className={styles.primaryButton}>
            Return to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Reset Password</h1>
        <p>Enter your email to receive reset instructions</p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.authInput}
          />
          <button type="submit" className={styles.primaryButton}>
            Send Reset Link
          </button>
        </form>

        <p className={styles.authSwitch}>
          Remember your password?{" "}
          <Link href="/signin" className={styles.authLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
