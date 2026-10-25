import "server-only";
import { z } from "zod";
import { parseServerEnv } from "./env-schema";

export { parseServerEnv } from "./env-schema";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://sewt-group.ma"),
});

export const serverEnv = parseServerEnv({
  ERP_WEBHOOK_SECRET: process.env.ERP_WEBHOOK_SECRET,
  CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL,
  CONTACT_WEBHOOK_SECRET: process.env.CONTACT_WEBHOOK_SECRET,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
