"use client";
import React from "react";
import signUp from "../../../../core/src/firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp({ email, password });

    if (error) {
      //todo: error toast
      return console.log(error);
    }

    return router.push("/pattern");
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
