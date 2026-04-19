/**
 * Typed client for the AskUcits pipeline's consumption API.
 *
 * Contract lives in the pipeline repo at docs/08-api-contract.md. Regenerate
 * this file's shapes by running `uv run python -m scripts.export_openapi` in
 * the pipeline repo and diffing; today we hand-mirror the shapes since the
 * contract is small enough to keep in one place.
 */

// Empty string -> same-origin, which hits the demo-data route handlers in
// app/api/v1/. Set NEXT_PUBLIC_API_BASE to the live pipeline host (e.g.
// https://api.askucits.com) to proxy the real data instead.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export type Confidence = "high" | "medium" | "low";

export interface CategoryFlow {
  category: string;
  etp_count: number;
  total_aum_eur: number;
  total_net_flow_eur_7d: number;
  total_net_flow_eur_prior_7d: number;
  week_over_week_delta_eur: number;
}

export interface LatestFlow {
  isin: string;
  ticker: string;
  name: string;
  issuer: string;
  category: string | null;
  asset_class: string;
  fund_currency: string;
  as_of_date: string | null;
  aum_eur: number | null;
  daily_return: number | null;
  estimated_net_flow_eur: number | null;
  confidence: Confidence;
  anomaly_flag: boolean;
}

export interface LatestCommentary {
  as_of_date: string;
  tldr_headline: string;
  big_move_block: string;
  under_radar_block: string;
  published_at: string | null;
  prompt_version: string;
  model_used: string;
}

async function fetchJson<T>(path: string, revalidate = 600): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${path} returned ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[askucits-web] fetch failed`, path, err);
    return null;
  }
}

// When API_BASE is empty we're in "demo mode" — skip HTTP entirely and read
// the synthetic constants directly. Keeps the pages statically rendered at
// build time without needing a running API and avoids the same-origin
// relative-URL fetch error that breaks `next build`.
const DEMO_MODE = API_BASE === "";

export async function getWeeklyByCategory(): Promise<CategoryFlow[]> {
  if (DEMO_MODE) {
    const { DEMO_WEEKLY } = await import("./demoData");
    return DEMO_WEEKLY.items as unknown as CategoryFlow[];
  }
  const body = await fetchJson<{ count: number; items: CategoryFlow[] }>(
    "/api/v1/flows/weekly",
  );
  return body?.items ?? [];
}

export async function getLatestFlows(limit = 25): Promise<LatestFlow[]> {
  if (DEMO_MODE) {
    const { DEMO_LATEST } = await import("./demoData");
    return DEMO_LATEST.items.slice(0, limit) as unknown as LatestFlow[];
  }
  const body = await fetchJson<{ count: number; items: LatestFlow[] }>(
    `/api/v1/flows/latest?limit=${limit}`,
  );
  return body?.items ?? [];
}

export async function getLatestCommentary(): Promise<LatestCommentary | null> {
  if (DEMO_MODE) {
    const { DEMO_COMMENTARY } = await import("./demoData");
    return DEMO_COMMENTARY as unknown as LatestCommentary;
  }
  return fetchJson<LatestCommentary>("/api/v1/commentary/latest", 3600);
}

export function formatEUR(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(value / 1e3).toFixed(0)}k`;
  return value.toFixed(0);
}

export function prettyCategory(slug: string): string {
  return slug
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
