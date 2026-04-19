import { NextResponse } from "next/server";
import { DEMO_LATEST } from "@/lib/demoData";

export async function GET() {
  return NextResponse.json(DEMO_LATEST, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" },
  });
}
