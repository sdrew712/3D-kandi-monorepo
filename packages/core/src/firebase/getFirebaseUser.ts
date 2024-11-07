import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";
import { Config } from "sst/node/config";

const key = `-----BEGIN PRIVATE KEY-----${Config.FIREBASE_PRIVATE_KEY}-----END PRIVATE KEY-----`;

initializeApp({
  credential: admin.credential.cert({
    projectId: Config.FIREBASE_PROJECT_ID,
    privateKey: key,
    clientEmail: Config.FIREBASE_CLIENT_EMAIL,
  }),
});

export async function getFirebaseUser(authToken: string) {
  const token = authToken.replace("Bearer ", "");

  let firebaseUser = await admin.auth().verifyIdToken(token);

  return {
    userId: firebaseUser.user_id,
    email: firebaseUser.email,
  };
}
