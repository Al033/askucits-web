import { notFound } from "next/navigation";
import Link from "next/link";
import DemoBanner from "@/components/DemoBanner";
import Sparkline from "@/components/Sparkline";
import { formatEUR, prettyCategory } from "@/lib/api";
import { DEMO_AS_OF, DEMO_PRODUCTS, getProduct } from "@/lib/demoData";

export const revalidate = 600;

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((p) => ({ isin: p.isin }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ isin: string }>;
}) {
  const { isin } = await params;
  const product = getProduct(isin);
  if (!product) notFound();

  const flowColour =
    product.net_flow_eur_7d > 0
      ? "text-in"
      : product.net_flow_eur_7d < 0
        ? "text-out"
        : "text-muted";

  const confidenceStyle =
    product.confidence === "high"
      ? "bg-in text-white"
      : product.confidence === "medium"
        ? "bg-amber-200 text-amber-900"
        : "bg-out text-white";

  return (
    <>
      <DemoBanner />

      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:underline">
          ← This week
        </Link>
        <span className="mx-2">·</span>
        <Link
          href={`/issuer/${product.issuer}`}
          className="hover:underline"
        >
          {product.issuer}
        </Link>
        <span className="mx-2">·</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:underline"
        >
          {prettyCategory(product.category)}
        </Link>
      </nav>

      <article className="rounded border border-border bg-card p-6">
        <header className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold leading-tight">{product.name}</h1>
            <p className="mt-1 text-sm text-muted">
              <span className="font-mono">{product.ticker}</span>
              <span className="mx-2">·</span>
              <span className="font-mono">{product.isin}</span>
              <span className="mx-2">·</span>
              {product.fund_currency}
              <span className="mx-2">·</span>
              {product.domicile}
              <span className="mx-2">·</span>
              {product.ter_bps}bps
            </p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${confidenceStyle}`}
          >
            {product.confidence}
          </span>
        </header>

        <dl className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              7d net flow
            </dt>
            <dd className={`mt-1 text-lg font-bold tabular-nums ${flowColour}`}>
              {product.net_flow_eur_7d > 0 ? "+" : ""}
              €{formatEUR(product.net_flow_eur_7d)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Today
            </dt>
            <dd className={`mt-1 text-lg font-bold tabular-nums`}>
              €{formatEUR(product.net_flow_eur_today)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              AUM
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums">
              €{formatEUR(product.aum_eur)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              NAV
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums">
              {product.fund_currency} {product.nav_native.toFixed(2)}
            </dd>
          </div>
        </dl>

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Daily net flow, trailing 30 days
          </h2>
          <Sparkline values={product.flow_history_30d} />
          <p className="mt-2 text-xs text-muted">
            Green = inflow days · red = outflow days · dashed line = zero.
          </p>
        </section>
      </article>

      <p className="mt-4 text-right text-[10px] text-muted">
        as of {DEMO_AS_OF}
      </p>
    </>
  );
}
