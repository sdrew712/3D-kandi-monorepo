"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../core/src/firebase/config";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Reset Password</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </label>
          <div className="buttons">
            <button type="submit">Send Reset Link</button>
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="secondary"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
