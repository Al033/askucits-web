import type { LatestCommentary } from "@/lib/api";

export default function CommentaryBlock({
  commentary,
}: {
  commentary: LatestCommentary | null;
}) {
  if (commentary === null) {
    return (
      <div className="rounded border border-border bg-card p-6 text-sm text-muted">
        No approved commentary yet. Latest-approved is published here once the
        nightly pipeline + 1-click approval completes.
      </div>
    );
  }

  return (
    <article className="rounded border border-border bg-card p-6">
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-bold leading-tight">
          {commentary.tldr_headline}
        </h2>
        <time className="shrink-0 text-xs text-muted">
          {commentary.as_of_date}
        </time>
      </header>

      <section className="mb-6">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          The Big Move
        </h3>
        <div className="space-y-3 text-sm leading-relaxed">
          {commentary.big_move_block.split(/\n\s*\n/).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Under the Radar
        </h3>
        <p className="text-sm leading-relaxed">{commentary.under_radar_block}</p>
      </section>

      <footer className="mt-4 text-right text-[10px] text-muted">
        model: {commentary.model_used} · prompt: {commentary.prompt_version}
      </footer>
    </article>
  );
}
