import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, getIdToken, User } from "firebase/auth";
import firebase_app from "../../../core/src/firebase/config";

const auth = getAuth(firebase_app);

export function useAuth() {
  let token = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(token ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await getIdToken(user);
        setAuthToken(token);
        localStorage.setItem("token", token);
      } else {
        setAuthToken(null);
        localStorage.setItem("token", "");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    userId: user?.uid,
    authToken,
    loading,
    isAuthenticated: Boolean(authToken),
  };
}
