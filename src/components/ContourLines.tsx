// Decorative bathymetric-isoline field, generated deterministically at module
// load. Rings are irregular closed loops (sine harmonics on a circle) rendered
// as smooth beziers — the visual language of a depth chart. Purely decorative:
// aria-hidden, stroke inherits currentColor so parents control the tint.

interface Point {
  x: number;
  y: number;
}

const ringPath = (cx: number, cy: number, radius: number, seed: number): string => {
  const steps = 24;
  const pts: Point[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    // Three low-frequency harmonics make the ring read as a natural isoline.
    const wobble =
      Math.sin(a * 2 + seed) * 0.1 +
      Math.sin(a * 3 + seed * 2.7) * 0.06 +
      Math.sin(a * 5 + seed * 1.3) * 0.035;
    const r = radius * (1 + wobble);
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.78 });
  }

  // Catmull-Rom through the points, converted to cubic beziers.
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < steps; i++) {
    const p0 = pts[(i - 1 + steps) % steps];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % steps];
    const p3 = pts[(i + 2) % steps];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return `${d} Z`;
};

const RINGS = Array.from({ length: 9 }, (_, i) => ({
  d: ringPath(560, 300, 70 + i * 62, i * 1.7 + 0.9),
  opacity: 0.32 - i * 0.028,
}));

const ContourLines = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 1100 600"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    {RINGS.map((ring, i) => (
      <path
        key={i}
        d={ring.d}
        stroke="currentColor"
        strokeWidth={i === 0 ? 1.5 : 1}
        opacity={ring.opacity}
      />
    ))}
  </svg>
);

export default ContourLines;
