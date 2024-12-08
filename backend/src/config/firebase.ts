import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

export function initializeFirebaseAdmin() {
  const {
    FIREBASE_TYPE,
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_CERT_URL,
    FIREBASE_CLIENT_CERT_URL,
  } = process.env;
  console.log(process.env);
  if (
    !FIREBASE_TYPE ||
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_PRIVATE_KEY_ID ||
    !FIREBASE_PRIVATE_KEY ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_CLIENT_ID ||
    !FIREBASE_AUTH_URI ||
    !FIREBASE_TOKEN_URI ||
    !FIREBASE_AUTH_PROVIDER_CERT_URL ||
    !FIREBASE_CLIENT_CERT_URL
  ) {
    throw new Error(
      "One or more required Firebase environment variables are missing."
    );
  }

  try {
    const firebaseConfig = {
      type: FIREBASE_TYPE,
      project_id: FIREBASE_PROJECT_ID,
      private_key_id: FIREBASE_PRIVATE_KEY_ID,
      private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: FIREBASE_CLIENT_EMAIL,
      client_id: FIREBASE_CLIENT_ID,
      auth_uri: FIREBASE_AUTH_URI,
      token_uri: FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: FIREBASE_CLIENT_CERT_URL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
    });

    console.log("Firebase Admin SDK initialized successfully.");
    return admin.firestore();
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw error;
  }
}
