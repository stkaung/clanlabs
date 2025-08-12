"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";
import { discordRoles, type DiscordRole, emojis } from "@/data/mock";
import QualificationModal, { type QualificationEditable } from "@/components/dashboard/group-manage/QualificationModal";

interface GroupQualification {
  id: number;
  name: string;
  emoji: string;
  discordRoleId: string;
  description: string;
}

const mockQualifications: GroupQualification[] = [
  { id: 1, name: "Trainer", emoji: "🎓", discordRoleId: "114", description: "Qualified to train new recruits." },
  { id: 2, name: "Observer", emoji: "👀", discordRoleId: "115", description: "Can observe sessions and provide feedback." },
  { id: 3, name: "Field Medic", emoji: "🩺", discordRoleId: "112", description: "Certified to administer field aid." },
  { id: 4, name: "Logistics", emoji: "📦", discordRoleId: "116", description: "Skilled in supply and logistics ops." },
];

export default function GroupQualificationsPage(): JSX.Element {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [editingQualification, setEditingQualification] = useState<QualificationEditable | null>(null);

  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  function debouncedSetSearching(value: boolean): void {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setIsSearching(value), value ? 0 : 300);
  }

  function getRoleById(id: string): DiscordRole | undefined {
    return discordRoles.find((r) => r.id === id);
  }

  const columns: Column<GroupQualification>[] = [
    { key: "name", header: "Name", width: "20%", renderCell: (row) => <div className="font-medium truncate">{row.name}</div> },
    { key: "emoji", header: "Emoji", width: "10%", renderCell: (row) => <div className="text-xl pl-2 select-none">{row.emoji}</div> },
    { key: "discordRoleId", header: "Discord Role", width: "20%", renderCell: (row) => {
      const role = getRoleById(row.discordRoleId);
      return role ? (
        <div className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
          <span className="text-sm">{role.name}</span>
        </div>
      ) : (
        <span className="text-sm text-gray-500">Unknown</span>
      );
    } },
    { key: "description", header: "Description", width: "50%", renderCell: (row) => (
      <div className="text-gray-600 dark:text-gray-300 line-clamp-2">{row.description}</div>
    ) },
  ];

  const actions: Action<GroupQualification>[] = [
    { label: "Update", icon: "fas fa-edit", onClick: (row) => {
      const emojiId = (emojis.find((e) => e.symbol === row.emoji) || emojis[0])?.id;
      const editable: QualificationEditable = { id: row.id, name: row.name, emojiId, discordRoleIds: row.discordRoleId ? [row.discordRoleId] : [], description: row.description };
      setEditingQualification(editable);
      setIsUpdateOpen(true);
    }, variant: "primary" },
    { label: "Delete", icon: "fas fa-trash", onClick: (row) => { console.log("Delete qualification:", row); }, variant: "danger" },
  ];

  useEffect(() => {
    function handleSearch(event: CustomEvent<string>): void {
      setSearchQuery(event.detail);
      debouncedSetSearching(!!event.detail);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get("search") || "";
    setSearchQuery(initialSearch);
    if (initialSearch) debouncedSetSearching(true);
    window.addEventListener("qualificationsSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      window.removeEventListener("qualificationsSearch", handleSearch as EventListener);
    };
  }, []);

  const filteredData = useMemo<GroupQualification[]>(() => {
    if (isSearching) debouncedSetSearching(false);
    return mockQualifications.filter((q) => {
      const roleName = getRoleById(q.discordRoleId)?.name ?? "";
      const values = [q.name, q.emoji, roleName, q.description];
      return !searchQuery || values.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [searchQuery, isSearching]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Group Qualifications</h2>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setEditingQualification({ id: Date.now(), name: "", emojiId: (emojis[0]?.id || ""), discordRoleIds: [], description: "" });
              setIsCreateOpen(true);
            }}
            className={`flex items-center space-x-2 sm:space-x-3 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap`}
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow: theme === "dark" ? "0 8px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(255,255,255,0.06)" : "0 8px 25px rgba(16, 185, 129, 0.2)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #059669 0%, #10B981 100%)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)"; }}
          >
            <i className="fas fa-plus text-xs sm:text-sm" />
            <span>Create Qualification</span>
          </button>
        </div>
      </div>

      <DataTable<GroupQualification>
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        searchQuery={searchQuery}
        rowKeyField="id"
        emptyMessage="No qualifications found"
        pageSize={8}
      />

      <QualificationModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        qualification={editingQualification}
        onSave={async (updated) => { console.log("Saving qualification:", updated); setIsUpdateOpen(false); }}
      />

      <QualificationModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        qualification={editingQualification}
        mode="create"
        onSave={async (created) => { console.log("Creating qualification:", created); setIsCreateOpen(false); }}
      />
    </div>
  );
}

