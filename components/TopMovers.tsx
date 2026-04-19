import Link from "next/link";
import { formatEUR } from "@/lib/api";
import type { DemoProduct } from "@/lib/demoData";

export default function TopMovers({
  inflows,
  outflows,
}: {
  inflows: DemoProduct[];
  outflows: DemoProduct[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MoverColumn title="Top inflows (7d)" products={inflows} tint="in" />
      <MoverColumn title="Top outflows (7d)" products={outflows} tint="out" />
    </div>
  );
}

function MoverColumn({
  title,
  products,
  tint,
}: {
  title: string;
  products: DemoProduct[];
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
                {p.net_flow_eur_7d > 0 ? "+" : ""}€{formatEUR(p.net_flow_eur_7d)}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
