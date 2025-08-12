"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import DropdownGlass, { type DropdownOption } from "@/components/shared/DropdownGlass";

interface AuditLogRow {
  id: string;
  audit: string;
  createdAt: string; // ISO string
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} – ${hh}:${min}`;
}

export default function GroupAuditLogsPage(): JSX.Element {
  const theme = useTheme();
  const params = useParams();
  const groupId = params.groupId as string;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [sourceFilter, setSourceFilter] = useState<"All" | "API" | "System">("All");
  const [timeFilter, setTimeFilter] = useState<"All" | "24h" | "7d">("All");
  const [rows, setRows] = useState<AuditLogRow[]>(() => {
    // simple mock logs
    const now = Date.now();
    return [
      { id: `${groupId}-1`, audit: "(API): Changed CarterBandit's XP from 101 to 102!", createdAt: new Date(now - 1000 * 60 * 3).toISOString() },
      { id: `${groupId}-2`, audit: "(System): Promoted Alex to Moderator", createdAt: new Date(now - 1000 * 60 * 20).toISOString() },
      { id: `${groupId}-3`, audit: "(API): Revoked medal 'Mentor' from John", createdAt: new Date(now - 1000 * 60 * 60 * 2).toISOString() },
      { id: `${groupId}-4`, audit: "(System): Created qualification 'Tactics I'", createdAt: new Date(now - 1000 * 60 * 60 * 5).toISOString() },
      { id: `${groupId}-5`, audit: "(API): Updated quota points for Jane from 25 to 30", createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString() },
    ];
  });

  // debounce helper
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  function debouncedSetSearching(value: boolean): void {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setIsSearching(value), value ? 0 : 300);
  }

  // columns
  const columns: Column<AuditLogRow>[] = [
    {
      key: "audit",
      header: "Audit",
      width: "70%",
      renderCell: (row) => {
        const isAPI = row.audit.startsWith("(API)");
        const isSystem = row.audit.startsWith("(System)");
        const badgeClass = isAPI
          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-400/20"
          : isSystem
          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
          : "bg-white/10 text-white/80 border border-white/15";
        const icon = isAPI ? "fas fa-cloud" : isSystem ? "fas fa-gear" : "fas fa-circle-info";

        const highlighted = row.audit
          .replace(/^\((API|System)\):\s*/, "")
          .replace(/(\d+)/g, '<span class="text-emerald-300 font-semibold">$1<\/span>')
          .replace(/'(.*?)'/g, '<span class="text-amber-300 font-medium">\'$1\'<\/span>');

        return (
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
              <i className={`${icon} text-xs ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {(isAPI || isSystem) && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${badgeClass}`}>{isAPI ? 'API' : 'System'}</span>
                )}
              </div>
              <div
                className="font-medium text-sm sm:text-base leading-relaxed"
                title={row.audit}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created At",
      width: "30%",
      align: "right",
      renderCell: (row) => (
        <div className="text-xs sm:text-sm opacity-80">{formatTimestamp(row.createdAt)}</div>
      ),
    },
  ];

  // listen for top navbar search: event name derives from page title "Audit Logs" => auditlogsSearch
  useEffect(() => {
    function handleSearch(event: CustomEvent<string>): void {
      setSearchQuery(event.detail);
      if (event.detail) debouncedSetSearching(true);
      else setIsSearching(false);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const initial = urlParams.get("search") || "";
    setSearchQuery(initial);
    if (initial) debouncedSetSearching(true);

    window.addEventListener("auditlogsSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      window.removeEventListener("auditlogsSearch", handleSearch as EventListener);
    };
  }, []);

  const filtered = useMemo(() => {
    if (isSearching) debouncedSetSearching(false);
    const q = searchQuery.trim().toLowerCase();
    const now = Date.now();
    const withinTime = (iso: string) => {
      if (timeFilter === "All") return true;
      const ms = timeFilter === "24h" ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
      return now - new Date(iso).getTime() <= ms;
    };
    return rows.filter((r) => {
      const matchesText = !q || r.audit.toLowerCase().includes(q);
      const isAPI = r.audit.startsWith("(API)");
      const isSystem = r.audit.startsWith("(System)");
      const matchesSource =
        sourceFilter === "All" || (sourceFilter === "API" && isAPI) || (sourceFilter === "System" && isSystem);
      return matchesText && matchesSource && withinTime(r.createdAt);
    });
  }, [rows, searchQuery, isSearching, sourceFilter, timeFilter]);

  function handleRefresh(): void {
    setIsRefreshing(true);
    setTimeout(() => {
      // simulate refresh by shuffling
      setRows((prev) => [...prev].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 400);
  }

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl overflow-hidden relative group p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap ${
        theme === 'dark' ? 'backdrop-blur-2xl bg-white/5 border border-white/10' : 'backdrop-blur-xl bg-white/70 border border-gray-200/60'
      }`}>
        <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Audit Logs</h2>
        <div className="flex items-center gap-3">
          <div className="w-40">
            <DropdownGlass
              value={sourceFilter}
              options={[{label:'All',value:'All'},{label:'API',value:'API'},{label:'System',value:'System'}] as DropdownOption[]}
              onChange={(v)=>setSourceFilter(v as any)}
              ariaLabel="Filter by source"
            />
          </div>
          <div className="w-40">
            <DropdownGlass
              value={timeFilter}
              options={[{label:'All Time',value:'All'},{label:'Last 24h',value:'24h'},{label:'Last 7d',value:'7d'}] as DropdownOption[]}
              onChange={(v)=>setTimeFilter(v as any)}
              ariaLabel="Filter by time"
            />
          </div>
        </div>
      </div>

      <DataTable<AuditLogRow>
        data={filtered}
        columns={columns}
        isLoading={isSearching || isRefreshing}
        searchQuery={searchQuery}
        rowKeyField="id"
        emptyMessage="No audit logs found"
        pageSize={10}
      />
    </div>
  );
}

