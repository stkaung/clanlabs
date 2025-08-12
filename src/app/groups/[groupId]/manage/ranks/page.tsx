"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import RankModal, { type RankEditable } from "@/components/dashboard/group-manage/RankModal";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";

interface GroupRank {
  id: number;
  name: string;
  locked: boolean;
  prefix: string;
  discordRoles: number;
  experience: number;
  quotaPoints: number;
}

// Temporary placeholder data; replace with API data when available
const mockRanks: GroupRank[] = [
  { id: 255, name: "Owner", locked: true, prefix: "N/A", discordRoles: 3, experience: 0, quotaPoints: 0 },
  { id: 254, name: "Admin", locked: true, prefix: "N/A", discordRoles: 4, experience: 0, quotaPoints: 0 },
  { id: 200, name: "Moderator", locked: false, prefix: "N/A", discordRoles: 2, experience: 0, quotaPoints: 0 },
  { id: 150, name: "Senior Member", locked: false, prefix: "N/A", discordRoles: 1, experience: 1200, quotaPoints: 45 },
  { id: 100, name: "Member", locked: false, prefix: "N/A", discordRoles: 1, experience: 600, quotaPoints: 20 },
  { id: 75, name: "Junior Member", locked: false, prefix: "N/A", discordRoles: 1, experience: 250, quotaPoints: 10 },
  { id: 50, name: "Recruit", locked: false, prefix: "N/A", discordRoles: 0, experience: 100, quotaPoints: 5 },
  { id: 1, name: "Guest", locked: false, prefix: "N/A", discordRoles: 0, experience: 0, quotaPoints: 0 },
];

export default function GroupRanksPage(): JSX.Element {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [editingRank, setEditingRank] = useState<RankEditable | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  // Debounce search state updates
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  function debouncedSetSearching(value: boolean): void {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setIsSearching(value);
    }, value ? 0 : 300);
  }

  // Columns configuration
  const columns: Column<GroupRank>[] = [
    {
      key: "name",
      header: "Name",
      width: "20%",
      renderCell: (row) => <div className="font-medium truncate">{row.name}</div>,
    },
    {
      key: "id",
      header: "ID",
      width: "10%",
      renderCell: (row) => <div className="text-sm pl-4">{row.id.toLocaleString()}</div>,
    },
    {
      key: "locked",
      header: "Locked",
      width: "12%",
      renderCell: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.locked
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          <i className={`fas ${row.locked ? "fa-lock" : "fa-unlock"} mr-1.5`} />
          {row.locked ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "prefix",
      header: "Prefix",
      width: "12%",
      renderCell: () => <div className="text-sm text-gray-600 dark:text-gray-300">N/A</div>,
    },
    {
      key: "discordRoles",
      header: "Discord Roles",
      width: "15%",
      renderCell: (row) => <div className="text-sm pl-6">{row.discordRoles.toLocaleString()}</div>,
    },
    {
      key: "experience",
      header: "Experience",
      width: "15%",
      renderCell: (row) => <div className="text-sm pl-8">{row.experience.toLocaleString()}</div>,
    },
    {
      key: "quotaPoints",
      header: "Quota Points",
      width: "16%",
      renderCell: (row) => <div className="text-sm pl-10">{row.quotaPoints.toLocaleString()}</div>,
    },
  ];

  // Actions configuration (Update only)
  const actions: Action<GroupRank>[] = [
    {
      label: "Update",
      icon: "fas fa-edit",
      onClick: (row) => {
        const editable: RankEditable = {
          id: row.id,
          name: row.name,
          locked: row.locked,
          prefix: row.prefix,
          discordRoleIds: [],
          experience: row.experience,
          quotaPoints: row.quotaPoints,
          gamepass: "",
          shirt: "",
          badge: "",
        };
        setEditingRank(editable);
        setIsUpdateOpen(true);
      },
      variant: "primary",
    },
  ];

  // Listen for search events from the TopNavBar ("ranksSearch")
  useEffect(() => {
    function handleSearch(event: CustomEvent<string>): void {
      setSearchQuery(event.detail);
      if (event.detail) {
        debouncedSetSearching(true);
      } else {
        setIsSearching(false);
      }
    }

    // Get initial search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get("search") || "";
    setSearchQuery(initialSearch);
    if (initialSearch) {
      debouncedSetSearching(true);
    }

    window.addEventListener("ranksSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      window.removeEventListener("ranksSearch", handleSearch as EventListener);
    };
  }, []);

  // Filter data based on search query
  const filteredData = useMemo<GroupRank[]>(() => {
    if (isSearching) {
      debouncedSetSearching(false);
    }
    return mockRanks.filter((rank) => {
      const values: Array<string> = [
        rank.name,
        rank.id.toString(),
        rank.locked ? "yes" : "no",
        "N/A",
        rank.discordRoles.toString(),
        rank.experience.toString(),
        rank.quotaPoints.toString(),
      ];
      return (
        !searchQuery ||
        values.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery, isSearching]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Group Ranks
        </h2>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setEditingRank({ id: Date.now(), name: "", locked: false, prefix: "", discordRoleIds: [], experience: 0, quotaPoints: 0, gamepass: "", shirt: "", badge: "" });
              setIsCreateOpen(true);
            }}
            className={`flex items-center space-x-2 sm:space-x-3 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap`}
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow: theme === "dark" ? "0 8px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255,255,255,0.06)" : "0 8px 25px rgba(16, 185, 129, 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #059669 0%, #10B981 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";
            }}
          >
            <i className="fas fa-plus text-xs sm:text-sm" />
            <span>Create Rank</span>
          </button>
        </div>
      </div>

      <DataTable<GroupRank>
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        searchQuery={searchQuery}
        rowKeyField="id"
        emptyMessage="No ranks found"
        pageSize={8}
        actionsAlign="center"
        actionContainerWidth="180px"
        actionButtonClassName="h-10 px-8 text-sm min-w-[110px]"
      />

      <RankModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        rank={editingRank}
        onSave={async (updated) => {
          // Replace with API call later; for now, log and update local mock where applicable
          console.log("Saving rank changes:", updated);
          setIsUpdateOpen(false);
        }}
      />

      <RankModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        rank={editingRank}
        mode="create"
        onSave={async (created) => {
          console.log("Creating rank:", created);
          setIsCreateOpen(false);
        }}
      />
    </div>
  );
}

