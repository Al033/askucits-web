import CategoryTable from "@/components/CategoryTable";
import CommentaryBlock from "@/components/CommentaryBlock";
import DemoBanner from "@/components/DemoBanner";
import TopMovers from "@/components/TopMovers";
import {
  getLatestCommentary,
  getLatestFlows,
  getWeeklyByCategory,
} from "@/lib/api";

export const revalidate = 600; // 10 minutes; pipeline updates once per night.

export default async function HomePage() {
  const [categories, commentary, latestAll] = await Promise.all([
    getWeeklyByCategory(),
    getLatestCommentary(),
    getLatestFlows(200),
  ]);

  const withFlows = latestAll.filter(
    (p) => p.estimated_net_flow_eur !== null && p.estimated_net_flow_eur !== 0,
  );
  const haveFlowData = withFlows.length > 0;

  const inflows = haveFlowData
    ? withFlows
        .filter((p) => (p.estimated_net_flow_eur ?? 0) > 0)
        .sort(
          (a, b) => (b.estimated_net_flow_eur ?? 0) - (a.estimated_net_flow_eur ?? 0),
        )
        .slice(0, 8)
    : latestAll
        .slice()
        .sort((a, b) => (b.aum_eur ?? 0) - (a.aum_eur ?? 0))
        .slice(0, 8);
  const outflows = haveFlowData
    ? withFlows
        .filter((p) => (p.estimated_net_flow_eur ?? 0) < 0)
        .sort(
          (a, b) => (a.estimated_net_flow_eur ?? 0) - (b.estimated_net_flow_eur ?? 0),
        )
        .slice(0, 8)
    : [];

  return (
    <>
      <DemoBanner />

      <section className="mb-10">
        <CommentaryBlock commentary={commentary} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold">Top movers</h2>
        <TopMovers
          inflows={inflows}
          outflows={outflows}
          mode={haveFlowData ? "live" : "awaiting"}
        />
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
