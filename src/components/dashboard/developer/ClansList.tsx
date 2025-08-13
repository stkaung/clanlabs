"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Column } from "@/components/shared/data-table/types";
import { DataTable } from "@/components/shared/data-table";
import useTheme from "@/hooks/useTheme";
import UpdateClanModal from "./UpdateClanModal";
import { clans } from "@/data/mock";  

interface ClanRecord {
  id: string;
  name: string;
  subscriptionStatus: "Inactive" | "Partnered" | "Active";
  expiryDate: string;
  botAccount: string;
  divisions: number;
}

function ClansList() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [updateModalData, setUpdateModalData] = useState<{ isOpen: boolean; clan: ClanRecord | null }>({
    isOpen: false,
    clan: null,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "Inactive" | "Partnered" | "Active">("all");
  
  // Debounce search state updates
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const debouncedSetSearching = (value: boolean) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setIsSearching(value);
    }, value ? 0 : 300); // Show loading immediately, hide with delay
  };
  const [sortConfig, setSortConfig] = useState<{
    key: "expiryDate" | "botAccount" | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  // Use mock data from centralized database
  const data: ClanRecord[] = clans as ClanRecord[];

  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      setSearchQuery(event.detail);
      if (event.detail) {
        debouncedSetSearching(true);
      } else {
        setIsSearching(false);
      }
    };
    window.addEventListener("clansSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      window.removeEventListener("clansSearch", handleSearch as EventListener);
    };
  }, []);

  const getStatusStyles = (status: ClanRecord["subscriptionStatus"]) => {
    switch (status) {
      case "Active":
        return {
          bg: theme === "dark" ? "bg-green-500/20" : "bg-green-100",
          text: "text-green-500",
          border: theme === "dark" ? "border-green-500/20" : "border-green-200",
          icon: "fas fa-check-circle"
        };
      case "Partnered":
        return {
          bg: theme === "dark" ? "bg-purple-500/20" : "bg-purple-100",
          text: "text-purple-500",
          border: theme === "dark" ? "border-purple-500/20" : "border-purple-200",
          icon: "fas fa-handshake"
        };
      case "Inactive":
        return {
          bg: theme === "dark" ? "bg-red-500/20" : "bg-red-100",
          text: "text-red-500",
          border: theme === "dark" ? "border-red-500/20" : "border-red-200",
          icon: "fas fa-times-circle"
        };
      default:
        return {
          bg: "",
          text: "",
          border: "",
          icon: ""
        };
    }
  };

  const StatusFilterHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const options = ["all", "Active", "Partnered", "Inactive"];

    return (
      <div className="relative inline-flex items-center space-x-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 focus:outline-none"
        >
          <i className={`fas fa-chevron-${isOpen ? "up" : "down"} text-xs ${
            statusFilter !== "all" ? "text-blue-500" : theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`} />
        </button>

        {isOpen && (
          <div
            className={`absolute z-[100] mt-2 -left-2 w-48 rounded-lg border shadow-lg transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-800/95 border-gray-700"
                : "bg-white/95 border-gray-200"
            }`}
            style={{
              backdropFilter: "blur(16px)",
              top: "100%",
            }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setStatusFilter(option as any);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-blue-500/10 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } ${statusFilter === option ? "font-semibold" : ""}`}
              >
                {option === "all" ? "All Subscriptions" : option}
                {statusFilter === option && (
                  <i className="fas fa-check text-blue-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const columns: Column<ClanRecord>[] = [
    {
      key: "name",
      header: "Name",
      width: "30%",
      align: "left",
      renderCell: (row) => (
        <div className="pl-2 md:pl-0">{row.name}</div>
      ),
      renderMobileCell: (row) => (
        <div className="font-semibold">{row.name}</div>
      ),
    },
    {
      key: "subscriptionStatus",
      header: "Subscription",
      headerExtra: () => <StatusFilterHeader />,
      width: "25%",
      align: "left",
      renderCell: (row) => {
        const styles = getStatusStyles(row.subscriptionStatus);
        return (
          <div className="w-full flex items-center justify-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-sm font-semibold`}>
              <i className={`${styles.icon} mr-1.5 text-xs`} />
              {row.subscriptionStatus}
            </div>
          </div>
        );
      },
      renderMobileCell: (row) => {
        const styles = getStatusStyles(row.subscriptionStatus);
        return (
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-xs font-semibold`}>
            <i className={`${styles.icon} mr-1 text-[10px]`} />
            {row.subscriptionStatus}
          </div>
        );
      },
    },
    {
      key: "expiryDate",
      header: () => (
        <div 
          className="flex items-center justify-center cursor-pointer"
          onClick={() => {
            setSortConfig(prev => ({
              key: "expiryDate",
              direction: prev.key === "expiryDate" && prev.direction === "asc" ? "desc" : "asc"
            }));
          }}
        >
          <span>Expiry Date</span>
          {sortConfig.key === "expiryDate" && (
            <i className={`fas fa-sort-${sortConfig.direction === "asc" ? "up" : "down"} ml-2 text-blue-500`} />
          )}
        </div>
      ),
      width: "20%",
      align: "left",
      renderCell: (row) => (
        <div className="w-full text-center">{row.expiryDate}</div>
      ),
      renderMobileCell: (row) => (
        <div className="text-sm">{row.expiryDate}</div>
      ),
      mobileLabel: "Expiry",
    },
    {
      key: "botAccount",
      header: () => (
        <div 
          className="flex items-center justify-center cursor-pointer"
          onClick={() => {
            setSortConfig(prev => ({
              key: "botAccount",
              direction: prev.key === "botAccount" && prev.direction === "asc" ? "desc" : "asc"
            }));
          }}
        >
          <span>Bot Account</span>
          {sortConfig.key === "botAccount" && (
            <i className={`fas fa-sort-${sortConfig.direction === "asc" ? "up" : "down"} ml-2 text-blue-500`} />
          )}
        </div>
      ),
      width: "20%",
      align: "left",
      renderCell: (row) => (
        <div className="w-full text-center">{row.botAccount}</div>
      ),
      renderMobileCell: (row) => (
        <code className="text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">{row.botAccount}</code>
      ),
      mobileLabel: "Bot Account",
    },
    {
      key: "divisions",
      header: "Divisions",
      width: "5%",
      align: "left",
      renderCell: (row) => (
        <div className="w-full text-center">{row.divisions}</div>
      ),
      renderMobileCell: (row) => (
        <span className="text-sm font-semibold">{row.divisions}</span>
      ),
      mobileLabel: "Divisions",
    },
  ];

  // Filter and sort data
  const processedData = useMemo(() => {
    // If searching, add artificial delay to simulate API call
    if (isSearching) {
      debouncedSetSearching(false);
    }

    let result = [...data];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((record) => record.subscriptionStatus === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (sortConfig.key === "expiryDate") {
          // Convert DD/MM/YY to comparable date
          const [aDay, aMonth, aYear] = aValue.split("/").map(Number);
          const [bDay, bMonth, bYear] = bValue.split("/").map(Number);
          const aDate = new Date(2000 + aYear, aMonth - 1, aDay);
          const bDate = new Date(2000 + bYear, bMonth - 1, bDay);
          return sortConfig.direction === "asc" 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }
        
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return result;
  }, [data, searchQuery, statusFilter, sortConfig]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
          Clans
        </h1>
      </div>
      <UpdateClanModal
        isOpen={updateModalData.isOpen}
        onClose={() => setUpdateModalData({ isOpen: false, clan: null })}
        clanName={updateModalData.clan?.name || ""}
        initialBotAccount={updateModalData.clan?.botAccount || ""}
        onUpdate={async (newBotAccount) => {
          // Here you would typically make an API call
          console.log("Updating clan bot account:", {
            clanId: updateModalData.clan?.id,
            newBotAccount,
          });
          // For now, let's simulate an API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        }}
      />

      <DataTable
        data={processedData}
        columns={columns}
        isLoading={isSearching}
        actions={[
          {
            label: "Update",
                  onClick: (row) => {
        setUpdateModalData({ isOpen: true, clan: row });
      },
            icon: "fas fa-edit",
          },
        ]}
        rowKeyField="id"
        emptyMessage="No clans found"
        pageSize={10}
      />
    </div>
  );
}

export default ClansList;