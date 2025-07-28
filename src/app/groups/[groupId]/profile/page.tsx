"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useTheme from "@/hooks/useTheme";
import GroupsSidebar from "@/components/dashboard/sidebar/GroupsSidebar";
import GroupProfileTopNav from "@/components/dashboard/layout/GroupProfileTopNav";
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import GroupInfoCard from "@/components/dashboard/profile/GroupInfoCard";
import type {
  UserProfile,
  GroupInfo,
  GroupListItem,
} from "@/types/group-profile";
import type {
  Medal,
  Qualification,
  AuditLogEntry,
} from "@/types/profile-sections";
import MedalsSection from "@/components/dashboard/profile/MedalsSection";
import QualificationsSection from "@/components/dashboard/profile/QualificationsSection";
import AuditLogsSection from "@/components/dashboard/profile/AuditLogsSection";

export default function GroupProfilePage() {
  const params = useParams();
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const groupId = params.groupId as string;

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const wasMobile = isMobile;

      setIsMobile(mobile);

      // Auto-collapse sidebar when switching to mobile
      if (mobile && !wasMobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  function toggleSidebar(): void {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  // Mock data - replace with actual API calls
  const mockGroups: GroupListItem[] = [
    {
      id: "1",
      name: "Software Ventures",
      abbreviation: "SV",
      logo: "/img/groups/software-ventures.png", // Optional, will fallback to abbreviation
      role: "Member",
      isActive: groupId === "1",
    },
    {
      id: "2",
      name: "Development Team",
      abbreviation: "DT",
      role: "Admin",
      isActive: groupId === "2",
    },
    {
      id: "3",
      name: "Beta Testers",
      abbreviation: "BT",
      role: "Member",
      isActive: groupId === "3",
    },
  ];

  const mockUserProfile: UserProfile = {
    id: "user-123",
    username: "shin",
    profilePicture: "/img/profiles/shin.png", // Optional, will fallback to icon
    role: {
      name: "Senior Developer",
      color: "#3B82F6",
      permissions: ["read", "write", "moderate"],
    },
    xpLevel: 1250,
    xpUnit: "XP", // Customizable unit - could be "XP", "points", "coins", etc.
    joinedDate: "2024-03-15T00:00:00.000Z",
  };

  const mockGroupInfo: GroupInfo = {
    id: groupId,
    name: mockGroups.find((g) => g.id === groupId)?.name || "Unknown Group",
    abbreviation:
      mockGroups.find((g) => g.id === groupId)?.abbreviation || "UG",
    logo: mockGroups.find((g) => g.id === groupId)?.logo,
    creator: {
      id: "creator-456",
      name: "Wondering_Dev",
    },
    memberCount: 247,
    description:
      "A collaborative community focused on building innovative software solutions and fostering developer growth through shared knowledge and cutting-edge projects.",
    createdDate: "2023-08-15T00:00:00.000Z",
  };

  // Mock data for profile sections
  const mockMedals: Medal[] = [
    {
      id: "medal-1",
      name: "First Contribution",
      description: "Made your first contribution to the group project",
      icon: "fas fa-code",
      color: "#3B82F6",
      rarity: "common",
      earnedDate: "2024-03-20T00:00:00.000Z",
    },
    {
      id: "medal-2",
      name: "Team Player",
      description: "Collaborated effectively with 10+ team members",
      icon: "fas fa-users",
      color: "#A855F7",
      rarity: "epic",
      earnedDate: "2024-04-15T00:00:00.000Z",
      progress: { current: 8, total: 10 },
    },
    {
      id: "medal-3",
      name: "Bug Hunter",
      description: "Found and reported 50+ critical bugs",
      icon: "fas fa-bug",
      color: "#F59E0B",
      rarity: "legendary",
      earnedDate: "2024-05-10T00:00:00.000Z",
    },
  ];

  const mockQualifications: Qualification[] = [
    {
      id: "qual-1",
      title: "Elite Combat Specialist",
      issuer: "Roblox Military Academy",
      description:
        "Demonstrates mastery in tactical combat operations and leadership in military simulation games",
      status: "active",
      issuedDate: "2024-01-15T00:00:00.000Z",
      expiryDate: "2027-01-15T00:00:00.000Z",
      credentialUrl: "https://roblox.com/military-academy/verify",
      tags: ["Combat", "Leadership", "Tactics"],
    },
    {
      id: "qual-2",
      title: "Certified Clan Commander",
      issuer: "Roblox Clan Federation",
      description:
        "Certified to lead and manage large-scale clan operations and strategic planning",
      status: "verified",
      issuedDate: "2023-11-20T00:00:00.000Z",
      expiryDate: "2025-11-20T00:00:00.000Z",
      credentialUrl: "https://roblox.com/clan-federation/verify",
      tags: ["Leadership", "Strategy", "Management"],
    },
    {
      id: "qual-3",
      title: "Master Builder Architect",
      issuer: "Roblox Studio Guild",
      description:
        "Advanced certification for building complex structures and designing immersive game experiences",
      status: "pending",
      issuedDate: "2024-06-01T00:00:00.000Z",
      tags: ["Building", "Design", "Creativity"],
    },
  ];

  const mockAuditLogs: AuditLogEntry[] = [
    {
      id: "log-1",
      action: "Profile Updated",
      description: "Updated profile picture and bio information",
      timestamp: "2024-06-15T14:30:00.000Z",
      type: "success",
      details: {
        field: "profile_picture",
        previousValue: "default.png",
        newValue: "shin-avatar.png",
      },
    },
    {
      id: "log-2",
      action: "Role Assignment",
      description: "Assigned Senior Developer role",
      timestamp: "2024-06-10T09:15:00.000Z",
      type: "info",
      performedBy: {
        id: "admin-1",
        name: "Wondering_Dev",
        role: "Group Admin",
      },
      details: { previousRole: "Developer", newRole: "Senior Developer" },
    },
    {
      id: "log-3",
      action: "Permission Granted",
      description: "Granted write access to main repository",
      timestamp: "2024-06-08T16:45:00.000Z",
      type: "success",
      performedBy: {
        id: "admin-1",
        name: "Wondering_Dev",
        role: "Group Admin",
      },
      details: { repository: "main-project", permission: "write" },
    },
    {
      id: "log-4",
      action: "Failed Login Attempt",
      description: "Multiple failed login attempts detected",
      timestamp: "2024-06-05T11:20:00.000Z",
      type: "warning",
      details: { ipAddress: "192.168.1.100", attempts: 3 },
    },
    {
      id: "log-5",
      action: "Account Created",
      description: "Group account successfully created",
      timestamp: "2024-03-15T08:00:00.000Z",
      type: "success",
      details: { initialRole: "Member", invitedBy: "Wondering_Dev" },
    },
  ];

  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        backgroundColor: theme === "dark" ? "#0F0F0F" : "#F8FAFC",
      }}
    >
      {/* Groups Sidebar */}
      <GroupsSidebar
        groups={mockGroups}
        currentGroupId={groupId}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Top Navigation */}
      <GroupProfileTopNav
        onSidebarToggle={toggleSidebar}
        groupName={mockGroupInfo.name}
        breadcrumb={["Groups", mockGroupInfo.name, "Profile"]}
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen overflow-hidden transition-all duration-300 pt-16 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Content Container */}
        <div
          className="flex-1 p-6 overflow-auto"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)"
                : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #F8FAFC 100%)",
          }}
        >
          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Profile Card */}
            <ProfileCard userProfile={mockUserProfile} />

            {/* Group Info Card */}
            <GroupInfoCard groupInfo={mockGroupInfo} />
          </div>

          {/* Profile Activity Sections */}
          <div className="mt-8 max-w-7xl mx-auto space-y-6">
            {/* Medals Section */}
            <MedalsSection medals={mockMedals} />

            {/* Qualifications Section */}
            <QualificationsSection qualifications={mockQualifications} />

            {/* Audit Logs Section */}
            <AuditLogsSection auditLogs={mockAuditLogs} />
          </div>

          {/* Footer */}
          <footer
            className="py-6 text-center border-t mt-8 max-w-7xl mx-auto"
            style={{
              borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
            }}
          >
            <p
              className="text-sm"
              style={{
                color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              © 2025 Software Ventures Pty Ltd. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
