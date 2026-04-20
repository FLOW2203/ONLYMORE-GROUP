import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EngagementSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(100),
  city: z.string().min(2).max(150),
  country: z.string().min(2).max(5),
  rgpd: z.literal(true),
});

// In-memory rate limiter. One process instance, reset on cold start.
// Caps each IP at 5 successful engagements per hour.
// TODO(@florent): replace with Upstash Redis once Supabase is wired.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
type RateEntry = { count: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anon";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true;
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "cross-origin forbidden" }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "rate limit exceeded, try again later" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = EngagementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // TODO(@florent): wire Supabase table goat_ame_engagements + Turnstile
  // after Florent creates envs. See docs/GOAT_AME_CITY_ACTIVATION_TODO.md
  // for the exact schema, RLS, env vars, and cron cadence of the
  // leaderboard regeneration.
  console.log("[concours.engage] accepted", {
    ip,
    city: parsed.data.city,
    country: parsed.data.country,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    todo: "wire Supabase + Turnstile in next session",
  });
}

export async function GET() {
  return NextResponse.json({ error: "method not allowed" }, { status: 405 });
}
