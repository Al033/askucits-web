import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AskUcits Flow Radar",
  description:
    "Daily UCITS ETP flows for UK institutional allocators. Free, editorial, methodology public.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <header className="mb-10">
            <div className="flex items-baseline justify-between gap-6">
              <h1 className="text-2xl font-bold">AskUcits Flow Radar</h1>
              <nav className="text-sm text-muted">
                <a href="/" className="hover:underline">
                  This week
                </a>
                <span className="mx-2">·</span>
                <a href="/methodology" className="hover:underline">
                  Methodology
                </a>
              </nav>
            </div>
            <p className="mt-2 text-sm text-muted">
              Daily UCITS ETP flows for UK institutional allocators.
            </p>
          </header>
          <main>{children}</main>
          <footer className="mt-20 border-t border-border pt-6 text-xs text-muted">
            <p>
              Alan Boulhimez is Associate Director, UK Sales at WisdomTree
              Europe. AskUcits.com Flow Radar is a personal editorial project.
              WisdomTree products are covered using the same publicly documented
              methodology as every other issuer; no special weighting, ranking,
              or framing applies.
            </p>
            <p className="mt-3">
              Information only. Not investment advice. Not a financial
              promotion. ETPs can fall as well as rise; capital is at risk.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
