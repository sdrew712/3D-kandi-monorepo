import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, getIdToken, User } from "firebase/auth";
import firebase_app from "../../../core/src/firebase/config";

const auth = getAuth(firebase_app);

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await getIdToken(user);
        setAuthToken(token);
      } else {
        setAuthToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  console.log(authToken);

  return { user, userId: user?.uid, authToken, loading };
}
