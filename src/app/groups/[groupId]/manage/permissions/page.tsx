"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import SectionPermissions from "@/components/dashboard/group-manage/SectionPermissions";
import DropdownGlass, { type DropdownOption } from "@/components/shared/DropdownGlass";
import PermissionsEmptyState from "@/components/dashboard/group-manage/PermissionsEmptyState";
import type { PermissionDefinition } from "@/components/dashboard/group-manage/CardPermission";
import { RANK_ORDER, type RankName } from "@/utils/ranks";

// Example mock permissions using existing ranks
const mockPermissions: PermissionDefinition[] = [
  {
    key: "manage_group_settings",
    title: "Manage Group Settings",
    description: "Update group name, logo, description, and configuration.",
    category: "Administration",
    minRank: "Admin",
    recommendedRank: "Owner",
  },
  {
    key: "manage_ranks",
    title: "Manage Ranks",
    description: "Create, update, and reorder group ranks.",
    category: "Administration",
    minRank: "Admin",
    recommendedRank: "Admin",
  },
  {
    key: "promote_demote_members",
    title: "Promote/Demote Members",
    description: "Adjust member ranks according to performance and criteria.",
    category: "Moderation",
    minRank: "Moderator",
    recommendedRank: "Senior Member",
  },
  {
    key: "assign_medals",
    title: "Assign Medals",
    description: "Award medals to recognize achievements.",
    category: "Recognition",
    minRank: "Senior Member",
    recommendedRank: "Moderator",
  },
  {
    key: "manage_qualifications",
    title: "Manage Qualifications",
    description: "Issue, update, or revoke qualifications.",
    category: "Recognition",
    minRank: "Moderator",
  },
  {
    key: "view_audit_log",
    title: "View Audit Log",
    description: "Access and review group activity logs.",
    category: "Auditing",
    minRank: "Member",
  },
  {
    key: "ban_members",
    title: "Ban Members",
    description: "Blacklist and restrict access for violating members.",
    category: "Safety",
    minRank: "Admin",
  },
  {
    key: "manage_blacklists",
    title: "Manage Blacklists",
    description: "Add or remove users and groups from blacklists.",
    category: "Safety",
    minRank: "Moderator",
  },
  {
    key: "create_events",
    title: "Create Events",
    description: "Schedule and manage group events.",
    category: "Operations",
    minRank: "Senior Member",
  },
  {
    key: "post_announcements",
    title: "Post Announcements",
    description: "Publish announcements to the group feed and Discord.",
    category: "Communications",
    minRank: "Moderator",
  },
  {
    key: "manage_integrations",
    title: "Manage Integrations",
    description: "Configure Discord and external service integrations.",
    category: "Integrations",
    minRank: "Admin",
    recommendedRank: "Admin",
  },
  {
    key: "view_insights",
    title: "View Insights",
    description: "Access analytics and growth reports.",
    category: "Analytics",
    minRank: "Member",
  },
];

export default function GroupPermissionsPage(): JSX.Element {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [minRankFilter, setMinRankFilter] = useState<RankName | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<string | "All">("All");
  const [groupBy, setGroupBy] = useState<"Category" | "Rank" | "Alphabetical">("Category");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    for (const p of mockPermissions) map[p.key] = true;
    return map;
  });
  const [minRankMap, setMinRankMap] = useState<Record<string, RankName>>(() => {
    const map: Record<string, RankName> = {};
    for (const p of mockPermissions) map[p.key] = p.minRank;
    return map;
  });

  // Debounce search indicator
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  function debouncedSetSearching(value: boolean): void {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setIsSearching(value);
    }, value ? 0 : 300);
  }

  // Listen for search events from the layout's top search bar
  useEffect(() => {
    function handleSearch(event: CustomEvent<string>): void {
      setSearchQuery(event.detail);
      if (event.detail) {
        debouncedSetSearching(true);
      } else {
        setIsSearching(false);
      }
    }

    // initial query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get("search") || "";
    setSearchQuery(initialSearch);
    if (initialSearch) {
      debouncedSetSearching(true);
    }

    window.addEventListener("permissionsSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      window.removeEventListener("permissionsSearch", handleSearch as EventListener);
    };
  }, []);

  // Group permissions by category for a settings-like presentation
  const categories = useMemo(() => {
    const record: Record<string, PermissionDefinition[]> = {};
    for (const perm of mockPermissions) {
      if (!record[perm.category]) record[perm.category] = [];
      record[perm.category].push(perm);
    }
    return record;
  }, []);

  const filteredBySearch = useMemo(() => {
    if (isSearching) {
      debouncedSetSearching(false);
    }
    const query = searchQuery.trim().toLowerCase();
    const next: PermissionDefinition[] = mockPermissions.filter((p) => {
      const values = [p.title, p.description, p.category, p.minRank, p.recommendedRank ?? ""].map((v) =>
        String(v).toLowerCase()
      );
      const matchesSearch = !query || values.some((v) => v.includes(query));
      const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    if (minRankFilter === "All") return next;
    const selectedIndex = RANK_ORDER.indexOf(minRankFilter);
    return next.filter((p) => RANK_ORDER.indexOf(p.minRank) <= selectedIndex);
  }, [searchQuery, isSearching, minRankFilter, categoryFilter]);

  const filteredByCategory = useMemo(() => {
    const map: Record<string, PermissionDefinition[]> = {};
    for (const perm of filteredBySearch) {
      if (!map[perm.category]) map[perm.category] = [];
      map[perm.category].push(perm);
    }
    return map;
  }, [filteredBySearch]);

  const groupedByRank = useMemo(() => {
    const map: Record<string, PermissionDefinition[]> = {};
    for (const perm of filteredBySearch) {
      const key = perm.minRank;
      if (!map[key]) map[key] = [];
      map[key].push(perm);
    }
    // Sort by RANK_ORDER
    const ordered: Record<string, PermissionDefinition[]> = {};
    for (const r of RANK_ORDER) {
      if (map[r]) ordered[r] = map[r];
    }
    return ordered;
  }, [filteredBySearch]);

  const allEmpty = Object.values(filteredByCategory).every((arr) => arr.length === 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 px-2 sm:px-4 font-[Poppins]">
      {/* Header / Controls Panel */}
      <div className={`rounded-2xl overflow-visible relative group p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap sticky top-2 z-[100] ${theme === 'dark' ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'}`}>
        <div className={`pointer-events-none absolute inset-0 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-[#1D203A]/50 via-[#14162a]/40 to-[#101225]/50' : 'bg-white/70'} border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/60'} shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]`} />
        <div className="relative w-full space-y-4">
          <h2 className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Group Permissions
          </h2>
          <div className="grid grid-cols-12 gap-3 sm:gap-4 items-end">
            <div className="col-span-12 md:col-span-4">
              <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Min Rank</label>
              <DropdownGlass
                value={minRankFilter}
                options={[{ label: 'All', value: 'All' }, ...RANK_ORDER.map<DropdownOption>((r) => ({ label: r, value: r }))]}
                onChange={(next) => setMinRankFilter(next as RankName | 'All')}
                ariaLabel="Filter by minimum rank"
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
              <DropdownGlass
                value={categoryFilter}
                options={[{ label: 'All', value: 'All' }, ...Object.keys(categories).map<DropdownOption>((c) => ({ label: c, value: c }))]}
                onChange={(next) => setCategoryFilter(next as string | 'All')}
                ariaLabel="Filter by category"
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Group by</label>
              <DropdownGlass
                value={groupBy}
                options={[
                  { label: 'Category', value: 'Category' },
                  { label: 'Rank', value: 'Rank' },
                  { label: 'Alphabetical', value: 'Alphabetical' },
                ]}
                onChange={(next) => setGroupBy(next as 'Category' | 'Rank' | 'Alphabetical')}
                ariaLabel="Group by option"
              />
            </div>

            {/* Search removed; top navbar search handles filtering */}
          </div>
        </div>
      </div>

      {allEmpty ? (
        <PermissionsEmptyState query={searchQuery} />
      ) : (
        <div className="space-y-6">
          {groupBy === "Category"
            ? Object.entries(filteredByCategory).map(([category, perms]) => (
                perms.length > 0 && (
                  <SectionPermissions
                    key={category}
                    title={category}
                   permissions={perms}
                   selectableKeys={undefined}
                   onToggleSelect={undefined}
                    asRows
                    enabledMap={enabledMap}
                    onToggleEnabled={(key, enabled) => setEnabledMap((prev) => ({ ...prev, [key]: enabled }))}
                    minRankMap={minRankMap}
                    onChangeMinRank={(key, rank) => setMinRankMap((prev) => ({ ...prev, [key]: rank as RankName }))}
                  />
                )
              ))
            : groupBy === "Rank"
            ? Object.entries(groupedByRank).map(([rank, perms]) => (
                perms.length > 0 && (
                  <SectionPermissions
                    key={rank}
                    title={`Min Rank: ${rank}`}
                     permissions={perms}
                     selectableKeys={undefined}
                     onToggleSelect={undefined}
                    asRows
                    enabledMap={enabledMap}
                    onToggleEnabled={(key, enabled) => setEnabledMap((prev) => ({ ...prev, [key]: enabled }))}
                    minRankMap={minRankMap}
                    onChangeMinRank={(key, rank) => setMinRankMap((prev) => ({ ...prev, [key]: rank as RankName }))}
                  />
                )
              ))
            : (
              <SectionPermissions
                key="all"
                title="All Permissions"
                permissions={[...filteredBySearch].sort((a, b) => a.title.localeCompare(b.title))}
                selectableKeys={undefined}
                onToggleSelect={undefined}
                asRows
                enabledMap={enabledMap}
                onToggleEnabled={(key, enabled) => setEnabledMap((prev) => ({ ...prev, [key]: enabled }))}
                minRankMap={minRankMap}
                onChangeMinRank={(key, rank) => setMinRankMap((prev) => ({ ...prev, [key]: rank as RankName }))}
              />
            )}
        </div>
      )}
    </div>
  );
}

