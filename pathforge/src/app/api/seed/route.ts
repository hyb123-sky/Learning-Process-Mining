import { NextResponse } from "next/server";
import { execSync } from "node:child_process";

// Dev-only bootstrap. In production, disable behind env.
export const dynamic = "force-dynamic";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "disabled in prod" }, { status: 403 });
  }
  try {
    const out = execSync("npx prisma db seed", { cwd: process.cwd() }).toString();
    return NextResponse.json({ ok: true, out });
  } catch (e: unknown) {
    const err = e as { message?: string; stderr?: Buffer };
    return NextResponse.json({ ok: false, error: err.message, stderr: err.stderr?.toString() }, { status: 500 });
  }
}
