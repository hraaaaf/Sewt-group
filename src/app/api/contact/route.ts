import { serverEnv } from "@/lib/env";
import { createContactPostHandler, createRateLimiter } from "./handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createContactPostHandler({
  isProduction: process.env.NODE_ENV === "production",
  rateLimiter: createRateLimiter(
    serverEnv.UPSTASH_REDIS_REST_URL,
    serverEnv.UPSTASH_REDIS_REST_TOKEN,
  ),
  webhookUrl: serverEnv.CONTACT_WEBHOOK_URL,
  webhookSecret: serverEnv.CONTACT_WEBHOOK_SECRET,
});
