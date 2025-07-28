"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import GroupCard from "./GroupCard";
import { useDashboard } from "@/components/dashboard/layout/DashboardLayout";

interface GroupData {
  id: string;
  name: string;
  abbreviation: string;
  permissionLevel: string;
  expiryDate: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "PENDING";
}

interface GroupsGridProps {
  searchQuery?: string;
  onCreateGroup?: () => void;
}

function GroupsGrid({ searchQuery = "", onCreateGroup }: GroupsGridProps) {
  const theme = useTheme();
  const router = useRouter();
  const { openSetupModal } = useDashboard();

  // Mock data - replace with actual data from API
  const [groups] = useState<GroupData[]>([
    {
      id: "1",
      name: "Software Ventures",
      abbreviation: "SV",
      permissionLevel: "Member",
      expiryDate: "8/11/2025",
      subscriptionStatus: "ACTIVE",
    },
    {
      id: "2",
      name: "Development Team",
      abbreviation: "DT",
      permissionLevel: "Admin",
      expiryDate: "12/25/2025",
      subscriptionStatus: "ACTIVE",
    },
    {
      id: "3",
      name: "Beta Testers",
      abbreviation: "BT",
      permissionLevel: "Member",
      expiryDate: "3/15/2024",
      subscriptionStatus: "EXPIRED",
    },
  ]);

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleViewProfile(groupId: string): void {
    router.push(`/groups/${groupId}/profile`);
  }

  function handleSettings(groupId: string): void {
    console.log("Opening settings for group:", groupId);
  }

  function handleCreateGroup(): void {
    if (onCreateGroup) {
      onCreateGroup();
    } else {
      openSetupModal();
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3">
            <h2
              className={`text-xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-blue-500"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow:
                  theme === "dark"
                    ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                    : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Your Groups
            </h2>
            <div
              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold inline-flex items-center ${
                theme === "dark"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <i className="fas fa-users mr-1" />
              {filteredGroups.length} Total
            </div>
          </div>

          <div className="space-y-2">
            {searchQuery && (
              <div className="flex items-center space-x-2 text-xs">
                <i
                  className={`fas fa-search ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <span
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Showing {filteredGroups.length} of {groups.length} groups
                  matching &quot;{searchQuery}&quot;
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleCreateGroup}
          className="flex items-center space-x-2 sm:space-x-3 py-2 sm:py-4 px-4 sm:px-8 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
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
          <span>Setup Group</span>
        </button>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onViewProfile={handleViewProfile}
              onSettings={handleSettings}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded-lg border-2 border-dashed"
          style={{
            borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
            backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9FAFB",
          }}
        >
          <i
            className="fas fa-search text-4xl mb-4"
            style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
          />
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
          >
            No groups found
          </h3>
          <p
            className="text-sm mb-4"
            style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
          >
            {searchQuery
              ? `No groups match "${searchQuery}"`
              : "You don't have any groups yet"}
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreateGroup}
              className="inline-flex items-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
            >
              <i className="fas fa-plus text-sm" />
              <span>Create Your First Group</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GroupsGrid;
