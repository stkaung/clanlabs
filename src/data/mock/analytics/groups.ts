export interface GroupTimeseriesPoint {
  date: string; // ISO date (YYYY-MM-DD)
  value: number; // members count
}

function formatISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Simple deterministic pseudo-random generator based on a seed
function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Cache a 365-day base series per group, then slice for requested range to keep
// the last-day value consistent across ranges (cumulative behavior)
const baseCache = new Map<string, GroupTimeseriesPoint[]>();

function getBase365(groupId: string): GroupTimeseriesPoint[] {
  const cached = baseCache.get(groupId);
  if (cached) return cached;

  const seed = groupId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = seededRandom(seed);
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (365 - 1));

  // Start value between 800 and 2,000 members
  let current = Math.floor(800 + rand() * 1200);
  const series: GroupTimeseriesPoint[] = [];
  for (let i = 0; i < 365; i++) {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    // cumulative non-decreasing increments between 0 and ~1.2% with slight noise
    const pct = rand() * 0.012; // 0%..1.2%
    const inc = Math.max(0, Math.round(current * pct));
    current = current + inc;
    // add occasional tiny plateau
    if (rand() < 0.08) current += 0;
    series.push({ date: formatISO(dt), value: current });
  }

  baseCache.set(groupId, series);
  return series;
}

export function getGroupMembersTimeseries(groupId: string, days: number): GroupTimeseriesPoint[] {
  const base = getBase365(groupId);
  const startIndex = Math.max(0, base.length - days);
  return base.slice(startIndex);
}

