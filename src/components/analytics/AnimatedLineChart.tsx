"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";

export interface TimeseriesPoint { date: string; value: number }
export type RangeKey = "31" | "60" | "90" | "180" | "365";

interface AnimatedLineChartProps {
  series: TimeseriesPoint[];
  range: RangeKey;
  legendLabel?: string;
}

function formatTick(dateISO: string): string {
  const d = new Date(dateISO);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

export default function AnimatedLineChart({ series, range, legendLabel = "Total" }: AnimatedLineChartProps): JSX.Element {
  const theme = useTheme();

  // Responsive width
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(900);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(Math.max(320, Math.floor(e.contentRect.width)));
    });
    ro.observe(el);
    setWidth(el.clientWidth || 900);
    return () => ro.disconnect();
  }, []);

  const height = 360;
  const margin = { top: 24, right: 24, bottom: 56, left: 48 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  // Animation prep
  const RESAMPLE_N = 160;
  const resample = (src: TimeseriesPoint[], n: number): number[] => {
    if (src.length === 0) return Array(n).fill(0);
    const out: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      const r = i / (n - 1);
      const pos = r * (src.length - 1);
      const lo = Math.floor(pos);
      const hi = Math.min(src.length - 1, lo + 1);
      const t = pos - lo;
      out[i] = src[lo].value * (1 - t) + src[hi].value * t;
    }
    return out;
  };

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const [animValues, setAnimValues] = useState<number[]>(() => resample(series, RESAMPLE_N));
  const [yMin, setYMin] = useState<number>(() => Math.min(...animValues));
  const [yMax, setYMax] = useState<number>(() => Math.max(...animValues));
  const rafRef = useRef<number | null>(null);
  const prevDaysRef = useRef<number>(Number(range));

  useEffect(() => {
    const startValues = animValues.slice();
    const endValues = resample(series, RESAMPLE_N);
    const sMin = Math.min(...startValues);
    const sMax = Math.max(...startValues);
    const eMin0 = Math.min(...endValues);
    const eMax0 = Math.max(...endValues);
    const padS = Math.max(50, Math.round((sMax - sMin) * 0.1));
    const padE = Math.max(50, Math.round((eMax0 - eMin0) * 0.1));
    const sMinP = Math.max(0, sMin - padS);
    const sMaxP = sMax + padS;
    const eMinP = Math.max(0, eMin0 - padE);
    const eMaxP = eMax0 + padE;

    // Right-anchored reveal when expanding range
    const prev = prevDaysRef.current;
    const curr = Number(range);
    prevDaysRef.current = curr;
    let from = startValues;
    if (curr > prev) {
      // expanding: pad start with leading values equal to first sample to align to right
      const deficit = RESAMPLE_N - startValues.length;
      if (deficit > 0) from = Array(deficit).fill(startValues[0]).concat(startValues);
    }

    const duration = 500;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const e = easeInOut(t);
      const blended = new Array(RESAMPLE_N);
      for (let i = 0; i < RESAMPLE_N; i++) {
        const a = from[i] ?? startValues[Math.min(i, startValues.length - 1)];
        const b = endValues[i];
        blended[i] = a + (b - a) * e;
      }
      setAnimValues(blended);
      setYMin(sMinP + (eMinP - sMinP) * e);
      setYMax(sMaxP + (eMaxP - sMaxP) * e);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, range]);

  const x = (i: number) => (i / (RESAMPLE_N - 1)) * innerW;
  const y = (v: number) => innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;

  const pathD = useMemo(() => {
    if (animValues.length === 0) return "";
    const pts = animValues.map((v, i) => ({ x: x(i), y: y(v) }));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
  }, [animValues, yMin, yMax, innerW, innerH]);

  // ticks per range
  const ticks = useMemo(() => {
    const r = Number(range);
    const base = r === 31 ? 1 : (r === 60 || r === 90) ? 2 : 5;
    const result: Array<{ i: number; label: string }> = [];
    for (let i = 0; i < series.length; i += base) result.push({ i, label: formatTick(series[i].date) });
    if (result[result.length - 1]?.i !== series.length - 1) result.push({ i: series.length - 1, label: formatTick(series[series.length - 1].date) });
    return result;
  }, [series, range]);

  return (
    <div className={`rounded-2xl overflow-hidden relative group ${theme === 'dark' ? 'backdrop-blur-2xl bg-white/5 border border-white/10' : 'backdrop-blur-xl bg-white/70 border border-gray-200/60'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.7)]" />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>{legendLabel}</span>
        </div>
        <div ref={containerRef} className="w-full">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full block">
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g transform={`translate(${margin.left},${margin.top})`}>
              {/* Y gridlines */}
              {Array.from({ length: 5 }).map((_, idx) => {
                const t = idx / 4;
                const yPos = t * innerH;
                const val = Math.round(yMax - t * (yMax - yMin));
                return (
                  <g key={idx}>
                    <line x1={0} x2={innerW} y1={yPos} y2={yPos} stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'} />
                    <text x={-10} y={yPos} fill={theme === 'dark' ? '#cbd5e1' : '#475569'} fontSize={10} textAnchor="end" alignmentBaseline="middle">
                      {val.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* X ticks */}
              {ticks.map((t) => (
                <g key={t.i}>
                  <text
                    x={(t.i / (series.length - 1)) * innerW}
                    y={innerH + 18}
                    fill={theme === 'dark' ? '#cbd5e1' : '#475569'}
                    fontSize={10}
                    textAnchor="end"
                    transform={`rotate(-45 ${(t.i / (series.length - 1)) * innerW} ${innerH + 18})`}
                  >
                    {t.label}
                  </text>
                </g>
              ))}

              {/* Area + Line */}
              <path d={`${pathD} L ${innerW},${innerH} L 0,${innerH} Z`} fill="url(#areaGrad)" />
              <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth={3} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

