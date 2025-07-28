"use client";
import BaseStatsCard from "@/components/dashboard/shared/BaseStatsCard";
import type { GroupInfo } from "@/types/group-profile";

interface GroupInfoCardProps {
  groupInfo: GroupInfo;
  className?: string;
}

function GroupInfoCard({ groupInfo, className = "" }: GroupInfoCardProps) {
  function formatMemberCount(count: number): string {
    if (count === 1) return "1 Member";
    if (count < 1000) return `${count} Members`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K Members`;
    return `${(count / 1000000).toFixed(1)}M Members`;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  const stats = [
    {
      icon: "fas fa-calendar-plus",
      iconColor: "#22C55E",
      value: formatDate(groupInfo.createdDate),
      label: "Established",
    },
    {
      icon: "fas fa-hashtag",
      iconColor: "#A855F7",
      value: groupInfo.id.slice(-6).toUpperCase(),
      label: "Group ID",
    },
  ];

  const subtitle = (
    <>
      <i className="fas fa-user-crown text-sm" style={{ color: "#F59E0B" }} />{" "}
      By: {groupInfo.creator.name}
    </>
  );

  const tags = [
    {
      text: formatMemberCount(groupInfo.memberCount),
      color: "#3B82F6",
      icon: "fas fa-users",
    },
  ];

  return (
    <BaseStatsCard
      title={groupInfo.name}
      subtitle={subtitle}
      imageUrl={groupInfo.logo}
      fallbackInitials={groupInfo.abbreviation}
      imageSize="md"
      imageBorderColor="#3B82F6"
      imageShape="square"
      badge={{
        text: "✓",
        color: "#22C55E",
        position: "top-right",
      }}
      tags={tags}
      description={groupInfo.description}
      stats={stats}
      className={className}
    />
  );
}

export default GroupInfoCard;
