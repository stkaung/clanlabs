"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";
import BlacklistModal, { type BlacklistEditable, type BlacklistType } from "@/components/dashboard/group-manage/BlacklistModal";

interface GroupBlacklist {
  id: number;
  name: string;
  type: BlacklistType;
  description: string;
}

const mockBlacklists: GroupBlacklist[] = [
  { id: 1, name: "ToxicUser123", type: "Username", description: "Harassment in chat" },
  { id: 2, name: "87654321", type: "Group", description: "Raid attempts and spam" },
  { id: 3, name: "SpamBot999", type: "Username", description: "Automated spam account" },
];

export default function GroupBlacklistsPage(): JSX.Element {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [editingBlacklist, setEditingBlacklist] = useState<BlacklistEditable | null>(null);

  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  function debouncedSetSearching(value: boolean): void {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setIsSearching(value), value ? 0 : 300);
  }

  const columns: Column<GroupBlacklist>[] = [
    { key: "name", header: "Name", width: "30%", renderCell: (row) => <div className="font-medium truncate">{row.name}</div> },
    { key: "type", header: "Blacklist Type", width: "20%", renderCell: (row) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.type === 'Group' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
        {row.type === 'Group' ? <i className="fas fa-users mr-1.5" /> : <i className="fas fa-user mr-1.5" />} {row.type}
      </span>
    ) },
    { key: "description", header: "Description", width: "50%", renderCell: (row) => (
      <div className="text-gray-600 dark:text-gray-300 line-clamp-2">{row.description}</div>
    ) },
  ];

  const actions: Action<GroupBlacklist>[] = [
    { label: "Update", icon: "fas fa-edit", onClick: (row) => {
      const editable: BlacklistEditable = { id: row.id, name: row.name, type: row.type, description: row.description };
      setEditingBlacklist(editable);
      setIsUpdateOpen(true);
    }, variant: "primary" },
    { label: "Delete", icon: "fas fa-trash", onClick: (row) => { console.log("Delete blacklist:", row); }, variant: "danger" },
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
    window.addEventListener("blacklistsSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      window.removeEventListener("blacklistsSearch", handleSearch as EventListener);
    };
  }, []);

  const filteredData = useMemo<GroupBlacklist[]>(() => {
    if (isSearching) debouncedSetSearching(false);
    return mockBlacklists.filter((rec) => {
      const values = [rec.name, rec.type, rec.description];
      return !searchQuery || values.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [searchQuery, isSearching]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Group Blacklists</h2>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setEditingBlacklist({ id: Date.now(), type: 'Username', name: '', description: '' });
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
            <span>Create Blacklist</span>
          </button>
        </div>
      </div>

      <DataTable<GroupBlacklist>
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        searchQuery={searchQuery}
        rowKeyField="id"
        emptyMessage="No blacklists found"
        pageSize={8}
      />

      <BlacklistModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        blacklist={editingBlacklist}
        onSave={async (updated) => { console.log("Saving blacklist:", updated); setIsUpdateOpen(false); }}
      />

      <BlacklistModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        blacklist={editingBlacklist}
        mode="create"
        onSave={async (created) => { console.log("Creating blacklist:", created); setIsCreateOpen(false); }}
      />
    </div>
  );
}

