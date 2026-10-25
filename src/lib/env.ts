import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  ERP_WEBHOOK_SECRET: z.string().min(16).optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://sewt-group.ma"),
});

export const serverEnv = serverEnvSchema.parse({
  ERP_WEBHOOK_SECRET: process.env.ERP_WEBHOOK_SECRET,
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
