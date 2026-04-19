import { notFound } from "next/navigation";
import Link from "next/link";
import DemoBanner from "@/components/DemoBanner";
import { formatEUR, prettyCategory } from "@/lib/api";
import { DEMO_AS_OF, getProductsByIssuer, listIssuers } from "@/lib/demoData";

export const revalidate = 600;

export function generateStaticParams() {
  return listIssuers().map((slug) => ({ slug }));
}

const ISSUER_DISPLAY: Record<string, string> = {
  ishares: "iShares (BlackRock)",
  wisdomtree: "WisdomTree",
  vanguard: "Vanguard",
  invesco: "Invesco",
  xtrackers: "Xtrackers (DWS)",
  amundi: "Amundi",
  lyxor: "Lyxor",
  spdr: "SPDR (State Street)",
  vaneck: "VanEck",
  hanetf: "HANetf",
  globalx: "Global X",
  twentyoneshares: "21Shares",
  coinshares: "CoinShares",
  etcgroup: "ETC Group",
  fidelity: "Fidelity",
  jpmam: "JPMAM",
  ubs: "UBS",
};

export default async function IssuerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = getProductsByIssuer(slug);
  if (products.length === 0) notFound();

  const totalAum = products.reduce((a, p) => a + p.aum_eur, 0);
  const totalFlow = products.reduce((a, p) => a + p.net_flow_eur_7d, 0);
  const display = ISSUER_DISPLAY[slug] ?? slug;

  return (
    <>
      <DemoBanner />

      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:underline">
          ← This week
        </Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-xl font-bold">{display}</h1>
        <p className="mt-2 text-sm text-muted">
          <span className="font-mono">{slug}</span>
          <span className="mx-2">·</span>
          {products.length} products covered
          <span className="mx-2">·</span>
          AUM €{formatEUR(totalAum)}
          <span className="mx-2">·</span>
          7d flow{" "}
          <span
            className={
              totalFlow > 0
                ? "text-in"
                : totalFlow < 0
                  ? "text-out"
                  : "text-muted"
            }
          >
            {totalFlow > 0 ? "+" : ""}€{formatEUR(totalFlow)}
          </span>
        </p>
      </header>

      <div className="overflow-x-auto rounded border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">AUM (€)</th>
              <th className="px-4 py-3 text-right">7d flow (€)</th>
              <th className="px-4 py-3 text-right">TER</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const colour =
                p.net_flow_eur_7d > 0
                  ? "text-in"
                  : p.net_flow_eur_7d < 0
                    ? "text-out"
                    : "text-muted";
              return (
                <tr
                  key={p.isin}
                  className="border-b border-border last:border-0 hover:bg-amber-50"
                >
                  <td className="px-4 py-3 font-mono">
                    <Link
                      href={`/product/${p.isin}`}
                      className="hover:underline"
                    >
                      {p.ticker}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/product/${p.isin}`}
                      className="hover:underline"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    <Link
                      href={`/category/${p.category}`}
                      className="hover:underline"
                    >
                      {prettyCategory(p.category)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatEUR(p.aum_eur)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right tabular-nums ${colour}`}
                  >
                    {p.net_flow_eur_7d > 0 ? "+" : ""}
                    {formatEUR(p.net_flow_eur_7d)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted">
                    {p.ter_bps}bps
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-right text-[10px] text-muted">as of {DEMO_AS_OF}</p>
    </>
  );
}
