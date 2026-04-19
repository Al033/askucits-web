import Link from "next/link";
import { formatEUR, type LatestFlow } from "@/lib/api";

export default function TopMovers({
  inflows,
  outflows,
  mode,
}: {
  inflows: LatestFlow[];
  outflows: LatestFlow[];
  /** "live" = flows populated; "awaiting" = day 0 (show AUM only). */
  mode: "live" | "awaiting";
}) {
  if (mode === "awaiting") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <AumColumn title="Largest products (by AUM)" products={inflows} />
        <div className="rounded border border-dashed border-border bg-card p-4 text-sm text-muted">
          <p className="font-semibold text-foreground">Flow data: awaiting history</p>
          <p className="mt-2">
            The pipeline has day-0 AUM snapshots from{" "}
            <span className="font-mono">{inflows.length}</span> products. Net-flow
            rows appear once tomorrow's nightly run observes t−1 and t together.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FlowColumn title="Top inflows (7d)" products={inflows} tint="in" />
      <FlowColumn title="Top outflows (7d)" products={outflows} tint="out" />
    </div>
  );
}

function FlowColumn({
  title,
  products,
  tint,
}: {
  title: string;
  products: LatestFlow[];
  tint: "in" | "out";
}) {
  const colour = tint === "in" ? "text-in" : "text-out";
  return (
    <div className="rounded border border-border bg-card">
      <h3 className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h3>
      <ol className="divide-y divide-border text-sm">
        {products.map((p) => (
          <li key={p.isin}>
            <Link
              href={`/product/${p.isin}`}
              className="flex items-baseline justify-between gap-3 px-4 py-3 hover:bg-amber-50"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{p.name}</div>
                <div className="mt-0.5 truncate text-[11px] text-muted">
                  <span className="font-mono">{p.ticker}</span>
                  <span className="mx-1.5">·</span>
                  {p.issuer}
                </div>
              </div>
              <div className={`shrink-0 tabular-nums ${colour}`}>
                {(p.estimated_net_flow_eur ?? 0) > 0 ? "+" : ""}€
                {formatEUR(p.estimated_net_flow_eur ?? 0)}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AumColumn({ title, products }: { title: string; products: LatestFlow[] }) {
  return (
    <div className="rounded border border-border bg-card">
      <h3 className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h3>
      <ol className="divide-y divide-border text-sm">
        {products.map((p) => (
          <li key={p.isin}>
            <Link
              href={`/product/${p.isin}`}
              className="flex items-baseline justify-between gap-3 px-4 py-3 hover:bg-amber-50"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{p.name}</div>
                <div className="mt-0.5 truncate text-[11px] text-muted">
                  <span className="font-mono">{p.ticker}</span>
                  <span className="mx-1.5">·</span>
                  {p.issuer}
                </div>
              </div>
              <div className="shrink-0 tabular-nums text-muted">
                €{formatEUR(p.aum_eur ?? 0)}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
