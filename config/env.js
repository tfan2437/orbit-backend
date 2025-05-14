import { config } from "dotenv";

const env = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: env });

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  PHOTO_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
} = process.env;
