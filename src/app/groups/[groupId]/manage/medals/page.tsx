"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";
import { discordRoles, type DiscordRole, emojis } from "@/data/mock";
import MedalModal, { type MedalEditable } from "@/components/dashboard/group-manage/MedalModal";

interface GroupMedal {
  id: number;
  name: string;
  emoji: string;
  discordRoleId: string; // reference to mock discord roles
  description: string;
}

// Temporary placeholder data; replace with API data when available
const mockMedals: GroupMedal[] = [
  { id: 1, name: "Valor", emoji: "🛡️", discordRoleId: "114", description: "Awarded for exceptional bravery in operations." },
  { id: 2, name: "Service", emoji: "🎖️", discordRoleId: "115", description: "Recognizes long-term dedication and service." },
  { id: 3, name: "Excellence", emoji: "🏅", discordRoleId: "112", description: "Granted for outstanding performance and leadership." },
  { id: 4, name: "Mentor", emoji: "📘", discordRoleId: "116", description: "For members who consistently mentor and uplift others." },
  { id: 5, name: "Initiate", emoji: "✨", discordRoleId: "117", description: "Entry-level commendation for new recruits." },
];

export default function GroupMedalsPage(): JSX.Element {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [editingMedal, setEditingMedal] = useState<MedalEditable | null>(null);
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

  function getRoleById(id: string): DiscordRole | undefined {
    return discordRoles.find((r) => r.id === id);
  }

  // Columns configuration
  const columns: Column<GroupMedal>[] = [
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
      key: "emoji",
      header: "Emoji",
      width: "10%",
      renderCell: (row) => <div className="text-xl pl-2 select-none">{row.emoji}</div>,
    },
    {
      key: "discordRoleId",
      header: "Discord Role",
      width: "20%",
      renderCell: (row) => {
        const role = getRoleById(row.discordRoleId);
        return role ? (
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
            <span className="text-sm">{role.name}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">Unknown</span>
        );
      },
    },
    {
      key: "description",
      header: "Description",
      width: "40%",
      renderCell: (row) => (
        <div className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {row.description}
        </div>
      ),
    },
  ];

  // Actions configuration
  const actions: Action<GroupMedal>[] = [
    {
      label: "Update",
      icon: "fas fa-edit",
      onClick: (row) => {
        const emojiId = (emojis.find((e) => e.symbol === row.emoji) || emojis[0])?.id;
        const editable: MedalEditable = {
          id: row.id,
          name: row.name,
          emojiId,
          discordRoleIds: row.discordRoleId ? [row.discordRoleId] : [],
          description: row.description,
        };
        setEditingMedal(editable);
        setIsUpdateOpen(true);
      },
      variant: "primary",
    },
    {
      label: "Delete",
      icon: "fas fa-trash",
      onClick: (row) => {
        console.log("Delete medal:", row);
      },
      variant: "danger",
    },
  ];

  // Listen for search events from the TopNavBar ("medalsSearch")
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

    window.addEventListener("medalsSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      window.removeEventListener("medalsSearch", handleSearch as EventListener);
    };
  }, []);

  // Filter data based on search query
  const filteredData = useMemo<GroupMedal[]>(() => {
    if (isSearching) {
      debouncedSetSearching(false);
    }
    return mockMedals.filter((medal) => {
      const roleName = getRoleById(medal.discordRoleId)?.name ?? "";
      const values: Array<string> = [
        medal.name,
        medal.id.toString(),
        medal.emoji,
        roleName,
        medal.description,
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
          Group Medals
        </h2>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setEditingMedal({ id: Date.now(), name: "", emojiId: (emojis[0]?.id || ""), discordRoleIds: [], description: "" });
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
            <span>Create Medal</span>
          </button>
        </div>
      </div>

      <DataTable<GroupMedal>
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        searchQuery={searchQuery}
        rowKeyField="id"
        emptyMessage="No medals found"
        pageSize={8}
      />

      <MedalModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        medal={editingMedal}
        onSave={async (updated) => {
          // TODO: connect to API; for now just log
          console.log("Saving medal changes:", updated);
          setIsUpdateOpen(false);
        }}
      />

      <MedalModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        medal={editingMedal}
        mode="create"
        onSave={async (created) => {
          // TODO: connect to API; for now just log
          console.log("Creating medal:", created);
          setIsCreateOpen(false);
        }}
      />
    </div>
  );
}

