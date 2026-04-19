export const metadata = {
  title: "Methodology — AskUcits Flow Radar",
};

export default function MethodologyPage() {
  return (
    <article className="prose prose-sm max-w-none">
      <h2 className="mb-6 text-xl font-bold">Methodology</h2>

      <p className="text-sm text-muted">
        The text below is published verbatim from the pipeline repo&apos;s{" "}
        <a
          href="https://github.com/Al033/askucits-flow-radar/blob/main/docs/05-flow-methodology.md"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/05-flow-methodology.md
        </a>
        . Material changes trigger a{" "}
        <code className="rounded bg-border px-1 py-0.5 text-xs">
          calculation_method
        </code>{" "}
        version bump and a public changelog entry.
      </p>

      <h3 className="mt-8 text-base font-bold">Why &quot;estimated net flows&quot;</h3>
      <p className="mt-2 text-sm leading-relaxed">
        Exchanges that list UCITS ETPs do not publish per-product authoritative
        creation / redemption tickets. The industry-standard workaround — used
        by CoinShares, Morningstar Direct and the academic literature — is the{" "}
        <strong>AUM-delta method</strong>: back out flow from the change in AUM
        that cannot be explained by the underlying market return.
      </p>

      <h3 className="mt-6 text-base font-bold">Formula</h3>
      <pre className="mt-2 overflow-x-auto rounded border border-border bg-card p-3 text-xs">
        flow(t) = aum(t) − aum(t−1) × (1 + return(t))
      </pre>
      <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed">
        <li>
          <code>aum(t)</code>: total fund AUM in EUR on day <code>t</code>,
          after market close.
        </li>
        <li>
          <code>return(t)</code>: decimal NAV return from{" "}
          <code>t−1</code> to <code>t</code>, gross of distributions.
        </li>
        <li>Positive = inflow. Negative = outflow.</li>
      </ul>

      <h3 className="mt-6 text-base font-bold">Confidence tiers</h3>
      <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">
        <li>
          <strong className="text-in">high</strong> — same source as{" "}
          <code>t−1</code>, AUM + NAV both present, fresh ECB FX, no anomaly.
        </li>
        <li>
          <strong>medium</strong> — a non-critical field reconstructed, or a
          fallback adapter was used.
        </li>
        <li>
          <strong className="text-out">low</strong> — distribution data missing
          on a distributing share class, fewer than 5 prior observations, or FX
          rate stale &gt;3 trading days.
        </li>
      </ul>

      <h3 className="mt-6 text-base font-bold">What the method cannot see</h3>
      <p className="mt-2 text-sm leading-relaxed">
        Authorised Participant inventory shifts; in-kind institutional
        transfers; same-day creation + redemption pairs; partial-day
        publications. These are noted wherever a number is published.
      </p>

      <p className="mt-8 text-xs text-muted">
        Every published number links back to its source URL, fetch timestamp,
        and a SHA-256 of the raw response body. If we cannot reproduce a number
        from those three fields, we do not publish it.
      </p>
    </article>
  );
}
