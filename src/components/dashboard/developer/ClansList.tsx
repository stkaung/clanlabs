"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Column } from "@/components/shared/data-table/types";
import { DataTable } from "@/components/shared/data-table";
import useTheme from "@/hooks/useTheme";
import UpdateClanModal from "./UpdateClanModal";  

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
  const searchTimeout = useRef<NodeJS.Timeout>();
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

  // Example data - in real app this would come from an API
  const data: ClanRecord[] = [
    {
      id: "1",
      name: "Elite Warriors",
      subscriptionStatus: "Active",
      expiryDate: "15/04/24",
      botAccount: "EliteBot#1234",
      divisions: 5,
    },
    {
      id: "2",
      name: "Shadow Hunters",
      subscriptionStatus: "Partnered",
      expiryDate: "20/03/24",
      botAccount: "ShadowBot#5678",
      divisions: 3,
    },
    {
      id: "3",
      name: "Dragon Legion",
      subscriptionStatus: "Inactive",
      expiryDate: "01/03/24",
      botAccount: "DragonBot#9012",
      divisions: 2,
    },
    {
      id: "4",
      name: "Phoenix Rising",
      subscriptionStatus: "Active",
      expiryDate: "18/04/24",
      botAccount: "PhoenixBot#4321",
      divisions: 4,
    },
    {
      id: "5",
      name: "Storm Raiders",
      subscriptionStatus: "Partnered",
      expiryDate: "12/04/24",
      botAccount: "StormBot#8765",
      divisions: 6,
    },
    {
      id: "6",
      name: "Mystic Order",
      subscriptionStatus: "Inactive",
      expiryDate: "28/02/24",
      botAccount: "MysticBot#2468",
      divisions: 1,
    },
    {
      id: "7",
      name: "Crimson Knights",
      subscriptionStatus: "Active",
      expiryDate: "25/04/24",
      botAccount: "CrimsonBot#1357",
      divisions: 7,
    },
    {
      id: "8",
      name: "Frost Wolves",
      subscriptionStatus: "Partnered",
      expiryDate: "08/04/24",
      botAccount: "FrostBot#9876",
      divisions: 4,
    },
    {
      id: "9",
      name: "Thunder Squad",
      subscriptionStatus: "Inactive",
      expiryDate: "15/02/24",
      botAccount: "ThunderBot#3579",
      divisions: 2,
    },
    {
      id: "10",
      name: "Solar Empire",
      subscriptionStatus: "Active",
      expiryDate: "30/04/24",
      botAccount: "SolarBot#2580",
      divisions: 8,
    },
    {
      id: "11",
      name: "Lunar Dynasty",
      subscriptionStatus: "Partnered",
      expiryDate: "05/04/24",
      botAccount: "LunarBot#1470",
      divisions: 5,
    },
    {
      id: "12",
      name: "Ocean Guardians",
      subscriptionStatus: "Inactive",
      expiryDate: "10/02/24",
      botAccount: "OceanBot#3690",
      divisions: 3,
    },
    {
      id: "13",
      name: "Terra Force",
      subscriptionStatus: "Active",
      expiryDate: "22/04/24",
      botAccount: "TerraBot#8520",
      divisions: 6,
    },
    {
      id: "14",
      name: "Nebula Nomads",
      subscriptionStatus: "Partnered",
      expiryDate: "17/04/24",
      botAccount: "NebulaBot#7410",
      divisions: 4,
    },
    {
      id: "15",
      name: "Void Walkers",
      subscriptionStatus: "Inactive",
      expiryDate: "05/02/24",
      botAccount: "VoidBot#9630",
      divisions: 2,
    },
    {
      id: "16",
      name: "Astral Seekers",
      subscriptionStatus: "Active",
      expiryDate: "28/04/24",
      botAccount: "AstralBot#1590",
      divisions: 7,
    },
    {
      id: "17",
      name: "Quantum Legion",
      subscriptionStatus: "Partnered",
      expiryDate: "14/04/24",
      botAccount: "QuantumBot#7530",
      divisions: 5,
    },
    {
      id: "18",
      name: "Cyber Sentinels",
      subscriptionStatus: "Inactive",
      expiryDate: "20/02/24",
      botAccount: "CyberBot#8520",
      divisions: 1,
    },
    {
      id: "19",
      name: "Galactic Pioneers",
      subscriptionStatus: "Active",
      expiryDate: "26/04/24",
      botAccount: "GalacticBot#4680",
      divisions: 9,
    },
    {
      id: "20",
      name: "Infinity Squad",
      subscriptionStatus: "Partnered",
      expiryDate: "10/04/24",
      botAccount: "InfinityBot#2570",
      divisions: 6,
    }
  ];

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
      width: "25%",
      align: "center",
      renderCell: (row) => (
        <div className="text-center">{row.name}</div>
      ),
    },
    {
      key: "subscriptionStatus",
      header: "Subscription",
      headerExtra: () => <StatusFilterHeader />,
      width: "25%",
      align: "center",
      renderCell: (row) => {
        const styles = getStatusStyles(row.subscriptionStatus);
        return (
          <div className="flex items-center justify-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-sm font-semibold`}>
              <i className={`${styles.icon} mr-1.5 text-xs`} />
              {row.subscriptionStatus}
            </div>
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
      width: "15%",
      align: "center",
      renderCell: (row) => (
        <div className="text-center">{row.expiryDate}</div>
      ),
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
      width: "25%",
      align: "center",
      renderCell: (row) => (
        <div className="text-center">{row.botAccount}</div>
      ),
    },
    {
      key: "divisions",
      header: "Divisions",
      width: "10%",
      align: "center",
      renderCell: (row) => (
        <div className="text-center">{row.divisions}</div>
      ),
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