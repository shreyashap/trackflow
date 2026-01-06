import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  nodeEnv: z.enum(["development", "test", "production"]).default("development"),

  port: z.number().default(3000),

  databaseUrl: z.string(),

  accessTokenSecret: z.string().min(1),
  accessTokenExpiry: z.string(),

  refreshTokenSecret: z.string().min(1),
  refreshTokenExpiry: z.string(),
});

export const envData = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
};

export const env = envSchema.parse(envData);
