import { serverEnv } from "@/lib/env";
import { createContactPostHandler, createRateLimiter } from "./handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createContactPostHandler({
  isProduction: process.env.NODE_ENV === "production",
  // Never send before the domain, mailbox and Resend credentials are verified.
  enabled: serverEnv.CONTACT_EMAIL_ENABLED === "true",
  rateLimiter: createRateLimiter(
    serverEnv.UPSTASH_REDIS_REST_URL,
    serverEnv.UPSTASH_REDIS_REST_TOKEN,
  ),
  resendApiKey: serverEnv.RESEND_API_KEY,
  resendFromEmail: serverEnv.RESEND_FROM_EMAIL,
  resendRecipientEmail: serverEnv.CONTACT_RECIPIENT_EMAIL,
});
