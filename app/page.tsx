import CategoryTable from "@/components/CategoryTable";
import CommentaryBlock from "@/components/CommentaryBlock";
import {
  getLatestCommentary,
  getWeeklyByCategory,
} from "@/lib/api";

export const revalidate = 600; // 10 minutes; pipeline updates once per night.

export default async function HomePage() {
  const [categories, commentary] = await Promise.all([
    getWeeklyByCategory(),
    getLatestCommentary(),
  ]);

  return (
    <>
      <section className="mb-10">
        <CommentaryBlock commentary={commentary} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">This week by category</h2>
        <CategoryTable rows={categories} />
        <p className="mt-3 text-xs text-muted">
          7-day trailing net flows in EUR, from the{" "}
          <a
            href="/methodology"
            className="underline hover:text-fg"
          >
            AUM-delta method
          </a>
          . Green = inflows, red = outflows, grey = within noise.
        </p>
      </section>
    </>
  );
}
