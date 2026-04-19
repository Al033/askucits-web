import CategoryTable from "@/components/CategoryTable";
import CommentaryBlock from "@/components/CommentaryBlock";
import DemoBanner from "@/components/DemoBanner";
import TopMovers from "@/components/TopMovers";
import { getLatestCommentary, getWeeklyByCategory } from "@/lib/api";
import { getTopMovers } from "@/lib/demoData";

export const revalidate = 600; // 10 minutes; pipeline updates once per night.

export default async function HomePage() {
  const [categories, commentary] = await Promise.all([
    getWeeklyByCategory(),
    getLatestCommentary(),
  ]);

  // Top movers use the synthetic DemoProduct type directly for now — they
  // carry richer per-product context (ticker, issuer, 7d flow) than the
  // compact LatestFlow API shape. When real data is live, swap this for a
  // fetch of /api/v1/flows/latest and adapt the DemoProduct->LatestFlow
  // shape inside TopMovers.
  const inflows = getTopMovers("inflow", 8);
  const outflows = getTopMovers("outflow", 8);

  return (
    <>
      <DemoBanner />

      <section className="mb-10">
        <CommentaryBlock commentary={commentary} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold">Top movers</h2>
        <TopMovers inflows={inflows} outflows={outflows} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">This week by category</h2>
        <CategoryTable rows={categories} />
        <p className="mt-3 text-xs text-muted">
          7-day trailing net flows in EUR, from the{" "}
          <a href="/methodology" className="underline hover:text-fg">
            AUM-delta method
          </a>
          . Green = inflows, red = outflows, grey = within noise.
        </p>
      </section>
    </>
  );
}
