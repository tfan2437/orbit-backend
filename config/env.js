import { config } from "dotenv";

const env = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: env });

const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const processedPrivateKey = rawPrivateKey
  ? rawPrivateKey.replace(/\\n/g, "\n")
  : undefined;

export const {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
} = process.env;

export const FIREBASE_PRIVATE_KEY = processedPrivateKey;
