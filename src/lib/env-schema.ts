import { z } from "zod";

const serverEnvSchema = z.object({
  ERP_WEBHOOK_SECRET: z.string().min(16).optional(),
  // Optional integration values are validated at the point of use so partial
  // configuration can return a controlled 503 instead of preventing startup.
  CONTACT_WEBHOOK_URL: z.string().optional(),
  CONTACT_WEBHOOK_SECRET: z.string().optional(),
  CONTACT_EMAIL_ENABLED: z.enum(["true", "false"]).optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  CONTACT_RECIPIENT_EMAIL: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

export function parseServerEnv(input: Record<string, string | undefined>) {
  return serverEnvSchema.parse(input);
}
