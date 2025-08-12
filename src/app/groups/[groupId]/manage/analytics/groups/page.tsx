"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import DropdownGlass, { type DropdownOption } from "@/components/shared/DropdownGlass";
import { getGroupMembersTimeseries, type GroupTimeseriesPoint } from "@/data/mock/analytics/groups";

type RangeKey = "31" | "60" | "90" | "180" | "365";

const RANGE_OPTIONS: Array<{ label: string; value: RangeKey }> = [
  { label: "Last 31 days", value: "31" },
  { label: "Last 60 days", value: "60" },
  { label: "Last 90 days", value: "90" },
  { label: "Last 180 days", value: "180" },
  { label: "Last 365 days", value: "365" },
];

function formatTick(dateISO: string): string {
  const d = new Date(dateISO);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

export default function GroupsAnalyticsPage(): JSX.Element {
  const theme = useTheme();
  const params = useParams();
  const groupId = params.groupId as string;

  const [range, setRange] = useState<RangeKey>("31");

  const series = useMemo<GroupTimeseriesPoint[]>(() => {
    return getGroupMembersTimeseries(groupId, Number(range));
  }, [groupId, range]);

  // Animated series (resampled to fixed length) for smooth transitions
  const RESAMPLE_N = 120;
  const resample = (src: GroupTimeseriesPoint[], n: number): number[] => {
    if (src.length === 0) return Array(n).fill(0);
    const out: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      const r = i / (n - 1);
      const pos = r * (src.length - 1);
      const lo = Math.floor(pos);
      const hi = Math.min(src.length - 1, lo + 1);
      const t = pos - lo;
      const v = src[lo].value * (1 - t) + src[hi].value * t;
      out[i] = v;
    }
    return out;
  };

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const [animValues, setAnimValues] = useState<number[]>(() => resample(series, RESAMPLE_N));
  const [animYMin, setAnimYMin] = useState<number>(() => Math.min(...animValues));
  const [animYMax, setAnimYMax] = useState<number>(() => Math.max(...animValues));
  const animRef = useRef<number | null>(null);
  const prevDaysRef = useRef<number>(Number(range));

  useEffect(() => {
    const startValues = animValues.slice();
    const endValues = resample(series, RESAMPLE_N);
    const startMin = Math.min(...startValues);
    const startMax = Math.max(...startValues);
    const endMinRaw = Math.min(...endValues);
    const endMaxRaw = Math.max(...endValues);
    const padStart = Math.max(50, Math.round((startMax - startMin) * 0.1));
    const padEnd = Math.max(50, Math.round((endMaxRaw - endMinRaw) * 0.1));
    const startMinP = Math.max(0, startMin - padStart);
    const startMaxP = startMax + padStart;
    const endMinP = Math.max(0, endMinRaw - padEnd);
    const endMaxP = endMaxRaw + padEnd;

    // build a right-anchored starting array so expanding range feels like revealing history
    const prevDays = prevDaysRef.current;
    const currDays = Number(range);
    prevDaysRef.current = currDays;

    const alignedFrom = (() => {
      if (prevDays === currDays) return startValues;
      const out = new Array(RESAMPLE_N);
      for (let i = 0; i < RESAMPLE_N; i++) {
        const dNew = (RESAMPLE_N - 1) - i; // distance from right edge
        const oldIdx = (RESAMPLE_N - 1) - dNew * (prevDays / currDays);
        const lo = Math.max(0, Math.min(RESAMPLE_N - 1, Math.floor(oldIdx)));
        const hi = Math.max(0, Math.min(RESAMPLE_N - 1, Math.ceil(oldIdx)));
        const t = Math.max(0, Math.min(1, oldIdx - lo));
        const a = startValues[lo];
        const b = startValues[hi];
        out[i] = a + (b - a) * t;
      }
      return out;
    })();

    const duration = 400;
    const t0 = performance.now();
    function step(now: number) {
      const t = Math.min(1, (now - t0) / duration);
      const e = easeInOut(t);
      const blended = alignedFrom.map((sv, i) => sv + (endValues[i] - sv) * e);
      setAnimValues(blended);
      setAnimYMin(startMinP + (endMinP - startMinP) * e);
      setAnimYMax(startMaxP + (endMaxP - startMaxP) * e);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    }
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series]);

  // chart dims (responsive width via ResizeObserver)
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(900);
  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) setChartWidth(w);
      }
    });
    ro.observe(el);
    // initial
    setChartWidth(el.clientWidth || 900);
    return () => ro.disconnect();
  }, []);

  const width = chartWidth;
  // take the full height of the viewport minus header offsets
  const [vh, setVh] = useState<number>(360);
  useEffect(() => {
    const handler = () => {
      const h = window.innerHeight;
      // subtract top navbar (approx 64) + header card (approx 80) + spacing
      setVh(Math.max(220, h - 64 - 100 - 48));
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const height = vh;
  const margin = { top: 24, right: 24, bottom: 56, left: 48 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const x = (i: number) => (i / (RESAMPLE_N - 1)) * innerW;
  const y = (v: number) => innerH - ((v - animYMin) / (animYMax - animYMin || 1)) * innerH;

  const pathD = useMemo(() => {
    if (animValues.length === 0) return "";
    const pts = animValues.map((v, i) => ({ x: x(i), y: y(v) }));
    // Smooth path using simple cubic Bezier interpolation
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const cx = (p0.x + p1.x) / 2; // mid control x for smoothness
      d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
  }, [animValues, animYMin, animYMax, innerW, innerH]);

  // X-axis tick interval per range requirements
  const ticks = useMemo(() => {
    if (series.length === 0) return [] as Array<{ i: number; label: string }>;
    const r = Number(range);
    const baseInterval = r === 31 ? 1 : (r === 60 || r === 90) ? 2 : 5; // 180 & 365 => 5 days
    const result: Array<{ i: number; label: string }> = [];
    for (let i = 0; i < series.length; i += baseInterval) {
      result.push({ i, label: formatTick(series[i].date) });
    }
    if (result[result.length - 1]?.i !== series.length - 1) {
      result.push({ i: series.length - 1, label: formatTick(series[series.length - 1].date) });
    }
    return result;
  }, [series, range]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl overflow-hidden relative group p-4 sm:p-5 flex items-center justify-between gap-4 ${
        theme === 'dark' ? 'backdrop-blur-2xl bg-white/5 border border-white/10' : 'backdrop-blur-xl bg-white/70 border border-gray-200/60'
      }`}>
        <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Groups Analytics</h2>
        <div className="w-44">
          <DropdownGlass
            value={range}
            options={RANGE_OPTIONS.map<DropdownOption>((o) => ({ label: o.label, value: o.value }))}
            onChange={(v) => setRange(v as RangeKey)}
            ariaLabel="Select date range"
          />
        </div>
      </div>

      {/* Chart Card */}
      <div className={`rounded-2xl overflow-hidden relative group ${
        theme === 'dark' ? 'backdrop-blur-2xl bg-white/5 border border-white/10' : 'backdrop-blur-xl bg-white/70 border border-gray-200/60'
      }`}>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.7)]" />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>Total Members</span>
            </div>
          </div>

          <div ref={chartContainerRef} className="w-full">
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

              {/* Axes */}
              <g transform={`translate(${margin.left},${margin.top})`}>
                {/* Y gridlines */}
                {Array.from({ length: 5 }).map((_, idx) => {
                  const t = idx / 4;
                  const yPos = t * innerH;
                  const val = Math.round(animYMax - t * (animYMax - animYMin));
                  return (
                    <g key={idx}>
                      <line x1={0} x2={innerW} y1={yPos} y2={yPos} stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'} />
                      <text x={-10} y={yPos} fill={theme === 'dark' ? '#cbd5e1' : '#475569'} fontSize={10} textAnchor="end" alignmentBaseline="middle">
                        {val.toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {/* X ticks every 5 days */}
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

                {/* Area under line */}
                <path d={`${pathD} L ${innerW},${innerH} L 0,${innerH} Z`} fill="url(#areaGrad)" />
                {/* Line */}
                <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth={3} />

                {/* Data point dots at each date, sampled from animated path */}
                {series.map((_, i) => {
                  if (series.length <= 1) return null;
                  const r = i / (series.length - 1);
                  const pos = r * (animValues.length - 1);
                  const lo = Math.floor(pos);
                  const hi = Math.min(animValues.length - 1, lo + 1);
                  const t = pos - lo;
                  const v = animValues[lo] * (1 - t) + animValues[hi] * t;
                  const cx = (i / (series.length - 1)) * innerW;
                  const cy = y(v);
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={2}
                      fill="#6366F1"
                      stroke={theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'white'}
                      strokeWidth={0.6}
                      style={{ pointerEvents: 'none' }}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

