/**
 * Shown whenever we're rendering demo data (i.e. when the same-origin route
 * handlers in app/api/v1/ are in play). Renders nothing when
 * NEXT_PUBLIC_API_BASE points at a real pipeline host.
 */
export default function DemoBanner() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
  const isDemoMode = base === "" || base.includes("vercel.app");
  if (!isDemoMode) return null;

  return (
    <div className="mb-6 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
      <strong className="font-bold">DEMO DATA.</strong> Every number on this
      page is synthetic and shipped with the code. The real pipeline is in{" "}
      <a
        href="https://github.com/Al033/askucits-flow-radar"
        className="underline hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        askucits-flow-radar
      </a>
      ; once it's producing live flows on the Hetzner VPS, this banner
      disappears and the numbers become real.
    </div>
  );
}
