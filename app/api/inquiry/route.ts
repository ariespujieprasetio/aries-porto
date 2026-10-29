import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { inquiryConfig, inquiryOrigins } from "@/lib/inquiry-config";
import { validateInquiry } from "@/lib/inquiry";
export const runtime = "nodejs";
const requests = new Map<string, { count: number; expires: number }>();
function limited(key: string) {
  const now = Date.now();
  for (const [k, v] of requests) {
    if (v.expires <= now) requests.delete(k);
  }
  const item = requests.get(key);
  if (item && item.count >= 5) return true;
  if (item) item.count++;
  else {
    if (requests.size >= 10000) return true;
    requests.set(key, { count: 1, expires: now + 600000 });
  }
  return false;
}
const error = (code: string, status: number) =>
  NextResponse.json(
    { code },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = inquiryOrigins();
  if (
    !origin ||
    (!allowedOrigins.includes(origin) &&
      !(
        process.env.NODE_ENV === "development" &&
        origin === request.nextUrl.origin
      ))
  )
    return error("origin", 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  )
    return error("content_type", 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return error("size", 413);
  let raw = "";
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("validation", 400);
    const decoder = new TextDecoder();
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) {
        await reader.cancel();
        return error("size", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return error("validation", 400);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return error("validation", 400);
  }
  const data = validateInquiry(parsed);
  if (!data || data.website) return error("validation", 400);
  const ip = process.env.VERCEL
    ? (request.headers.get("x-vercel-forwarded-for") ?? "unknown")
    : "local";
  const key = createHash("sha256").update(ip).digest("hex");
  if (limited(key)) return error("rate_limit", 429);
  const config = inquiryConfig();
  if (!config.ready) return error("not_configured", 503);
  const { token, requestId } = parsed as Record<string, unknown>;
  if (
    typeof token !== "string" ||
    !token ||
    token.length > 2048 ||
    typeof requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    return error("validation", 400);
  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: config.secret,
          response: token,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!verification.ok) return error("verification_unavailable", 503);
    const result = await verification.json();
    if (
      result.success !== true ||
      result.action !== "project_inquiry" ||
      result.hostname !== new URL(origin!).hostname
    )
      return error("verification", 400);
  } catch {
    return error("verification_unavailable", 503);
  }
  const text = [
    "New project inquiry - ARIES.",
    "Name: " + data.name,
    "Company: " + data.company,
    "Email: " + data.email,
    "Contact: " + data.phone,
    "Project: " + data.project,
    "Budget: " + data.budget,
    "Timeline: " + data.timeline,
    "Language: " + data.locale,
    "",
    "Project description:",
    data.description,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Idempotency-Key": "inquiry/" + requestId,
        Authorization: "Bearer " + config.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: data.email,
        subject: "Project inquiry: " + data.project,
        text,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return error("delivery", 502);
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id.trim())
      return error("delivery", 502);
    return NextResponse.json(
      { ok: true, delivery: "accepted" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return error("delivery", 502);
  }
}
