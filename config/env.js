import { config } from "dotenv";

const env = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: env });

export const { PORT, NODE_ENV, MONGODB_URI, PHOTO_URL } = process.env;
