"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import type { Column, Action } from "@/components/shared/data-table";
import useTheme from "@/hooks/useTheme";
import { groupMembers, userProfiles, type GroupMember, type UserProfile } from "@/data/mock";
import UserProfileModal from "@/components/dashboard/group-manage/UserProfileModal";

export default function GroupMembersPage() {
  const params = useParams();
  const theme = useTheme();
  const groupId = params.groupId as string;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Debounce search state updates
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const debouncedSetSearching = (value: boolean) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setIsSearching(value);
    }, value ? 0 : 300);
  };

  // Get members data for this specific group
  const data: GroupMember[] = groupMembers[groupId] || [];

  // Columns configuration
  const columns: Column<GroupMember>[] = [
    {
      key: "username",
      header: "Username",
      width: "20%",
      renderCell: (row) => (
        <div className="font-medium truncate">{row.username}</div>
      ),
    },
    {
      key: "rank",
      header: "Rank",
      width: "15%",
      renderCell: (row) => (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.rank === "Owner"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              : row.rank === "Admin"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              : row.rank === "Moderator"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              : row.rank === "Senior Member"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {row.rank === "Owner" && <i className="fas fa-crown mr-1.5" />}
          {row.rank === "Admin" && <i className="fas fa-shield-alt mr-1.5" />}
          {row.rank === "Moderator" && <i className="fas fa-user-shield mr-1.5" />}
          {row.rank === "Senior Member" && <i className="fas fa-star mr-1.5" />}
          {row.rank === "Member" && <i className="fas fa-user mr-1.5" />}
          {row.rank === "Junior Member" && <i className="fas fa-user-graduate mr-1.5" />}
          {row.rank}
        </div>
      ),
    },
    {
      key: "experience",
      header: "Experience",
      width: "15%",
      renderCell: (row) => (
        <div className="text-sm pl-8">
          {row.experience.toLocaleString()}
        </div>
      ),
    },
    {
      key: "quotaPoints",
      header: "Quota Points",
      width: "15%",
      renderCell: (row) => (
        <div className="text-sm pl-12">
          {row.quotaPoints.toLocaleString()}
        </div>
      ),
    },
    {
      key: "medals",
      header: "Medals",
      width: "12%",
      renderCell: (row) => (
        <div className="text-sm pl-8">
          {row.medals.toLocaleString()}
        </div>
      ),
    },
    {
      key: "qualifications",
      header: "Qualifications",
      width: "13%",
      renderCell: (row) => (
        <div className="text-sm pl-16">
          {row.qualifications.toLocaleString()}
        </div>
      ),
    },
  ];

  // Actions configuration
  const actions: Action<GroupMember>[] = [
    {
      label: "View Profile",
      icon: "fas fa-eye",
      onClick: (row) => {
        const userProfile = userProfiles[row.username];
        if (userProfile) {
          setSelectedUserProfile(userProfile);
          setIsProfileModalOpen(true);
        } else {
          console.log("User profile not found for:", row.username);
        }
      },
      variant: "primary",
    },
    {
      label: "Update",
      icon: "fas fa-edit",
      onClick: (row) => {
        console.log("Update member:", row);
        // Open update modal or navigate to update page
      },
      variant: "secondary",
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

    window.addEventListener("membersSearch", handleSearch as EventListener);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      window.removeEventListener("membersSearch", handleSearch as EventListener);
    };
  }, []);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    // If searching, add artificial delay to simulate API call
    if (isSearching) {
      debouncedSetSearching(false);
    }
    return data.filter((member) => {
      // Apply search filter
      const matchesSearch = !searchQuery || Object.values(member).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesSearch;
    });
  }, [searchQuery, data]);

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUserProfile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          Group Members
        </h2>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        actions={actions}
        isLoading={isSearching}
        rowKeyField="id"
        emptyMessage="No members found"
        pageSize={10}
        actionButtonClassName="h-7 px-6 text-[10px] min-w-[70px]"
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        userProfile={selectedUserProfile}
      />
    </div>
  );
} 