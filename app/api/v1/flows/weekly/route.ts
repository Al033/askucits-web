import { NextResponse } from "next/server";
import { DEMO_WEEKLY } from "@/lib/demoData";

// Demo-mode fallback — returns synthetic `docs/08-api-contract.md`-shaped data.
// Wire to the real pipeline API by pointing NEXT_PUBLIC_API_BASE at it.
export async function GET() {
  return NextResponse.json(DEMO_WEEKLY, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" },
  });
}
