"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";
import useTheme from "@/hooks/useTheme";
import CreateBanModal from "./CreateBanModal";
import UpdateBanModal from "./UpdateBanModal";
import TypeFilterHeader from "./TypeFilterHeader";
import { bans } from "@/data/mock";

interface BanRecord {
  id: string;
  name: string;
  type: "User" | "Group";
  date: string;
  description: string;
}

function BansList() {
  const theme = useTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [updateModalData, setUpdateModalData] = useState<{ isOpen: boolean; ban: BanRecord | null }>({
    isOpen: false,
    ban: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"all" | "User" | "Group">("all");
  
  // Debounce search state updates
  const searchTimeout = useRef<NodeJS.Timeout>();
  const debouncedSetSearching = (value: boolean) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setIsSearching(value);
    }, value ? 0 : 300); // Show loading immediately, hide with delay
  };
  // Use mock data from centralized database
  const data: BanRecord[] = bans;

  // Example columns configuration
  const columns: Column<BanRecord>[] = [
    {
      key: "name",
      header: "Name",
      width: "25%",
      renderCell: (row) => (
        <div className="font-medium truncate">{row.name}</div>
      ),
    },
    {
      key: "type",
      header: "Type",
      headerExtra: () => <TypeFilterHeader onFilterChange={setTypeFilter} />,
      width: "15%",
      renderCell: (row) => (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.type === "User"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
          }`}
        >
          {row.type === "User" ? (
            <i className="fas fa-user mr-1.5" />
          ) : (
            <i className="fas fa-users mr-1.5" />
          )}
          {row.type}
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: "20%",
      renderCell: (row) => (
        <div className="text-gray-600 dark:text-gray-300">{row.date}</div>
      ),
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

  // Example actions configuration
  const actions: Action<BanRecord>[] = [
    {
      label: "Update",
      icon: "fas fa-edit",
      onClick: (row) => {
        setUpdateModalData({ isOpen: true, ban: row });
      },
      variant: "primary",
    },
    {
      label: "Unban",
      icon: "fas fa-ban",
      onClick: (row) => {
        console.log("Unban:", row);
      },
      variant: "danger",
    },
  ];

  // Listen for search events from the TopNavBar
  useEffect(() => {
    function handleSearch(event: CustomEvent<string>) {
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

    window.addEventListener("bansSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      window.removeEventListener("bansSearch", handleSearch as EventListener);
    };
  }, []);

  // Filter data based on search query and type
  const filteredData = useMemo(() => {
    // If searching, add artificial delay to simulate API call
    if (isSearching) {
      debouncedSetSearching(false);
    }
    return data.filter((record) => {
      // Apply search filter
      const matchesSearch = !searchQuery || Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply type filter
      const matchesType = typeFilter === "all" || record.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Banned Users & Groups
        </h2>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className={`flex items-center space-x-2 sm:space-x-3 py-2 sm:py-4 px-4 sm:px-8 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap`}
            style={{
              background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              boxShadow:
                theme === "dark"
                  ? "0 8px 25px rgba(21, 128, 61, 0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                  : "0 8px 25px rgba(21, 128, 61, 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #166534 0%, #15803D 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #15803D 0%, #166534 100%)";
            }}
          >
            <i className="fas fa-plus text-xs sm:text-sm" />
            <span>Create Ban</span>
          </button>
        </div>
      </div>

      <CreateBanModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <UpdateBanModal
        isOpen={updateModalData.isOpen}
        onClose={() => setUpdateModalData({ isOpen: false, ban: null })}
        initialDescription={updateModalData.ban?.description || ""}
        banName={updateModalData.ban?.name || ""}
        onUpdate={async (newDescription) => {
          // Here you would typically make an API call
          console.log("Updating ban description:", {
            banId: updateModalData.ban?.id,
            newDescription,
          });
          // For now, let's simulate an API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        }}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        rowKeyField="id"
        emptyMessage="No bans found"
        pageSize={10}
      />
    </div>
  );
}

export default BansList;