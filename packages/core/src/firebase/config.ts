import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const firebaseConfig = {
  apiKey: "AIzaSyCNKCgXhqhFvDv6CcOpiudLbeF336ZzG5c",
  authDomain: "d-kandi-site-7edba.firebaseapp.com",
  projectId: "d-kandi-site-7edba",
  storageBucket: "d-kandi-site-7edba.appspot.com",
  messagingSenderId: "334531264743",
  appId: "1:334531264743:web:5eb98b1a29ce27c4682242",
  measurementId: "G-YEJDM0632L",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { auth, firebase_app };
