"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import GroupCard from "./GroupCard";
import { useDashboard } from "@/components/dashboard/layout/DashboardLayout";
import { groups } from "@/data/mock";

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
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [displayedCount, setDisplayedCount] = useState<number>(0);

  // Use mock data from centralized database
  const [groupsData] = useState<GroupData[]>(groups as GroupData[]);

  const filteredGroups = groupsData.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search loading simulation and count animation
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      // Instant search - no artificial delay for real-time results
      const searchTimer = setTimeout(() => {
        setIsSearching(false);
      }, 100); // Very brief loading state for smooth transitions

      return () => clearTimeout(searchTimer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Animate the count changes instantly for real-time search
  useEffect(() => {
    const targetCount = filteredGroups.length;
    if (displayedCount !== targetCount) {
      const countTimer = setTimeout(
        () => {
          setDisplayedCount(targetCount);
        },
        isSearching ? 120 : 0
      ); // Very brief delay to sync with loading state

      return () => clearTimeout(countTimer);
    }
  }, [filteredGroups.length, displayedCount, isSearching]);

  function handleViewProfile(groupId: string): void {
    router.push(`/groups/${groupId}/profile`);
  }

  function handleSettings(groupId: string): void {
    router.push(`/groups/${groupId}/manage/home`);
  }

  function handleCreateGroup(): void {
    if (onCreateGroup) {
      onCreateGroup();
    } else {
      openSetupModal();
    }
  }

  // Helper function to highlight search matches
  function highlightMatch(text: string, query: string): React.ReactNode {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-blue-500/30 text-blue-200"
                  : "bg-blue-200/60 text-blue-800"
              } px-1 rounded font-semibold transition-all duration-200`}
              style={{
                boxShadow:
                  theme === "dark"
                    ? "0 0 0 1px rgba(59, 130, 246, 0.3)"
                    : "0 0 0 1px rgba(59, 130, 246, 0.2)",
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3">
            <h2
              className={`text-xl sm:text-3xl font-bold transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-blue-500"
              } ${
                searchQuery ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow:
                  theme === "dark"
                    ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                    : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {searchQuery ? "Search Results" : "Your Groups"}
            </h2>

            {/* Enhanced Count Badge with Loading State */}
            <div className="relative">
              <div
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold inline-flex items-center w-fit transition-all duration-300 ${
                  isSearching ? "animate-pulse" : "animate-none"
                } ${
                  searchQuery
                    ? theme === "dark"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-green-100 text-green-700 border border-green-300/30"
                    : theme === "dark"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }`}
                style={{
                  boxShadow: searchQuery
                    ? theme === "dark"
                      ? "0 0 0 1px rgba(34, 197, 94, 0.2), 0 2px 8px rgba(34, 197, 94, 0.15)"
                      : "0 0 0 1px rgba(34, 197, 94, 0.1), 0 1px 4px rgba(34, 197, 94, 0.1)"
                    : undefined,
                }}
              >
                {isSearching ? (
                  <>
                    <div className="w-3 h-3 mr-1 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <i
                      className={`${
                        searchQuery ? "fas fa-search" : "fas fa-users"
                      } mr-1 transition-all duration-200`}
                    />
                    <span className="transition-all duration-300">
                      {displayedCount} {searchQuery ? "Found" : "Total"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Search Status */}
          <div
            className={`space-y-2 transition-all duration-300 ${
              searchQuery
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            {searchQuery && (
              <div
                className={`flex items-center space-x-2 text-xs transition-all duration-500 ${
                  isSearching ? "opacity-50" : "opacity-100"
                }`}
              >
                <div
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800/50 border border-gray-700/50"
                      : "bg-gray-50 border border-gray-200/50"
                  }`}
                >
                  <i
                    className={`fas fa-search transition-all duration-200 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={`transition-all duration-200 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Showing {displayedCount} of {groups.length} groups matching{" "}
                    <span
                      className={`font-semibold ${
                        theme === "dark" ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      &quot;{searchQuery}&quot;
                    </span>
                  </span>
                  {!isSearching && searchQuery && (
                    <div
                      className={`ml-2 w-2 h-2 rounded-full transition-all duration-200 ${
                        filteredGroups.length > 0
                          ? "bg-green-500 shadow-lg shadow-green-500/30"
                          : "bg-red-500 shadow-lg shadow-red-500/30"
                      }`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleCreateGroup}
            className={`flex items-center space-x-2 sm:space-x-3 py-2 sm:py-4 px-4 sm:px-8 rounded-lg font-bold text-white text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap ${
              searchQuery ? "opacity-75 hover:opacity-100" : "opacity-100"
            }`}
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
      </div>

      {/* Enhanced Groups Grid with Search Highlighting */}
      {filteredGroups.length > 0 ? (
        <div
          className={`transition-all duration-500 ${
            isSearching ? "opacity-50 scale-98" : "opacity-100 scale-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <div
                key={group.id}
                className="transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <GroupCard
                  group={{
                    ...group,
                    name: searchQuery ? group.name : group.name, // We'll enhance GroupCard separately
                    abbreviation: searchQuery
                      ? group.abbreviation
                      : group.abbreviation,
                  }}
                  onViewProfile={handleViewProfile}
                  onSettings={handleSettings}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`text-center py-12 rounded-lg border-2 border-dashed transition-all duration-500 ${
            isSearching ? "opacity-50" : "opacity-100"
          }`}
          style={{
            borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
            backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9FAFB",
          }}
        >
          {isSearching ? (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
              >
                Searching...
              </h3>
              <p
                className="text-sm"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              >
                Looking for groups matching &quot;{searchQuery}&quot;
              </p>
            </>
          ) : searchQuery ? (
            <>
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <i
                  className="fas fa-search-minus text-2xl"
                  style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
                />
              </div>
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
                No groups match &quot;
                <span
                  className={`font-semibold ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {searchQuery}
                </span>
                &quot;
              </p>
              <p
                className="text-xs"
                style={{ color: theme === "dark" ? "#6B7280" : "#9CA3AF" }}
              >
                Try searching with different keywords or create a new group
              </p>
            </>
          ) : (
            <>
              <i
                className="fas fa-users text-4xl mb-4"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              />
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
              >
                No groups yet
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
              >
                You don&apos;t have any groups yet
              </p>
              <button
                onClick={handleCreateGroup}
                className="inline-flex items-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
              >
                <i className="fas fa-plus text-sm" />
                <span>Create Your First Group</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GroupsGrid;
