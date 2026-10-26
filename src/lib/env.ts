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
  CONTACT_EMAIL_ENABLED: process.env.CONTACT_EMAIL_ENABLED,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
