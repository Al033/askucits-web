import Link from "next/link";
import type { CategoryFlow } from "@/lib/api";
import { formatEUR, prettyCategory } from "@/lib/api";

export default function CategoryTable({ rows }: { rows: CategoryFlow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded border border-border bg-card p-6 text-sm text-muted">
        No category data yet. The pipeline publishes once adapters are wired.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3 text-right">ETPs</th>
            <th className="px-4 py-3 text-right">AUM (€)</th>
            <th className="px-4 py-3 text-right">7d flow (€)</th>
            <th className="px-4 py-3 text-right">WoW Δ (€)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const flowColor =
              r.total_net_flow_eur_7d > 0
                ? "text-in"
                : r.total_net_flow_eur_7d < 0
                  ? "text-out"
                  : "text-muted";
            return (
              <tr
                key={r.category}
                className="border-b border-border last:border-0 hover:bg-amber-50"
              >
                <td className="px-4 py-3 font-medium">
                  <Link
                    href={`/category/${r.category}`}
                    className="hover:underline"
                  >
                    {prettyCategory(r.category)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-muted">
                  {r.etp_count}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatEUR(r.total_aum_eur)}
                </td>
                <td
                  className={`px-4 py-3 text-right tabular-nums ${flowColor}`}
                >
                  {r.total_net_flow_eur_7d > 0 ? "+" : ""}
                  {formatEUR(r.total_net_flow_eur_7d)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted">
                  {r.week_over_week_delta_eur > 0 ? "+" : ""}
                  {formatEUR(r.week_over_week_delta_eur)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
