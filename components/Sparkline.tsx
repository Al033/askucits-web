/**
 * Minimal SVG sparkline for a daily-flow timeseries. No dependencies — raw
 * SVG path math. Positive bars green, negative bars red, zero line in grey.
 */
export default function Sparkline({
  values,
  width = 560,
  height = 120,
}: {
  values: readonly number[];
  width?: number;
  height?: number;
}) {
  if (values.length === 0) {
    return <div className="text-xs text-muted">No history.</div>;
  }

  const minV = Math.min(0, ...values);
  const maxV = Math.max(0, ...values);
  const range = Math.max(Math.abs(minV), Math.abs(maxV)) || 1;

  const padY = 8;
  const innerH = height - padY * 2;
  const zeroY = padY + innerH / 2;

  const barW = width / values.length;
  const scale = innerH / 2 / range;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-32 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="30-day daily flow sparkline"
    >
      <line
        x1={0}
        x2={width}
        y1={zeroY}
        y2={zeroY}
        stroke="currentColor"
        strokeOpacity={0.2}
        strokeDasharray="2 3"
      />
      {values.map((v, i) => {
        const x = i * barW + barW * 0.15;
        const w = barW * 0.7;
        const h = Math.abs(v) * scale;
        const y = v >= 0 ? zeroY - h : zeroY;
        const fill = v >= 0 ? "var(--in, #047857)" : "var(--out, #b91c1c)";
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={Math.max(h, 1)}
            fill={fill}
            fillOpacity={0.85}
          />
        );
      })}
    </svg>
  );
}
