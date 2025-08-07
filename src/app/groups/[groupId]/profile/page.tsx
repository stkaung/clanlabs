"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
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
import { profile } from "@/data/mock";

export default function GroupProfilePage() {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const groupId = params.groupId as string;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Use mock data from centralized database
  const mockGroups: GroupListItem[] = profile.groups.map(group => ({
    ...group,
    isActive: group.id === groupId
  }));

  const mockUserProfile: UserProfile = profile.userProfile;

  const mockGroupInfo: GroupInfo = profile.groupInfo;

  const mockMedals: Medal[] = profile.medals as Medal[];

  const mockQualifications: Qualification[] = profile.qualifications as Qualification[];

  const mockAuditLogs: AuditLogEntry[] = profile.auditLogs as unknown as AuditLogEntry[];

  const breadcrumb = ["Groups", mockGroupInfo.name, "Profile"];

  return (
    <DashboardLayout
      breadcrumb={breadcrumb}
      showSearch={false}
      showBackButton={true}
      isDeveloperPanel={false}
      isGroupsPage={true}
      groups={mockGroups}
      currentGroupId={groupId}
    >
      <div
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
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
      </div>
    </DashboardLayout>
  );
}
