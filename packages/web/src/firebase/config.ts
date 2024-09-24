import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
