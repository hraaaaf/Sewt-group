import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  ERP_WEBHOOK_SECRET: z.string().min(16).optional(),
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
  CONTACT_WEBHOOK_SECRET: z.string().min(32).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
}).superRefine((env, ctx) => {
  if (Boolean(env.CONTACT_WEBHOOK_URL) !== Boolean(env.CONTACT_WEBHOOK_SECRET)) {
    ctx.addIssue({ code: "custom", message: "CONTACT_WEBHOOK_URL and CONTACT_WEBHOOK_SECRET must be configured together" });
  }
  if (Boolean(env.UPSTASH_REDIS_REST_URL) !== Boolean(env.UPSTASH_REDIS_REST_TOKEN)) {
    ctx.addIssue({ code: "custom", message: "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be configured together" });
  }
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://sewt-group.ma"),
});

export const serverEnv = serverEnvSchema.parse({
  ERP_WEBHOOK_SECRET: process.env.ERP_WEBHOOK_SECRET,
  CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL,
  CONTACT_WEBHOOK_SECRET: process.env.CONTACT_WEBHOOK_SECRET,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
