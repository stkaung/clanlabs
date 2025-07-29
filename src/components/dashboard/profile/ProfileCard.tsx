"use client";
import BaseStatsCard from "@/components/dashboard/shared/BaseStatsCard";
import type { UserProfile } from "@/types/group-profile";

interface ProfileCardProps {
  userProfile: UserProfile;
  className?: string;
}

function ProfileCard({ userProfile, className = "" }: ProfileCardProps) {
  function getXPLevelInfo(xpLevel: number) {
    const levels = [
      { level: 1, name: "Novice", color: "#6B7280", minXP: 0, maxXP: 99 },
      {
        level: 2,
        name: "Apprentice",
        color: "#22C55E",
        minXP: 100,
        maxXP: 299,
      },
      { level: 3, name: "Skilled", color: "#3B82F6", minXP: 300, maxXP: 599 },
      { level: 4, name: "Expert", color: "#A855F7", minXP: 600, maxXP: 999 },
      { level: 5, name: "Master", color: "#F59E0B", minXP: 1000, maxXP: 1999 },
      {
        level: 6,
        name: "Legend",
        color: "#EF4444",
        minXP: 2000,
        maxXP: Infinity,
      },
    ];

    return (
      levels.find((l) => xpLevel >= l.minXP && xpLevel <= l.maxXP) || levels[0]
    );
  }

  const xpInfo = getXPLevelInfo(userProfile.xpLevel);

  const stats = [
    {
      icon: "fas fa-calendar-alt",
      iconColor: "#3B82F6",
      value: new Date(userProfile.joinedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      label: "Joined",
    },
    {
      icon: "fas fa-trophy",
      iconColor: xpInfo.color,
      value: userProfile.xpLevel.toString(),
      label: userProfile.xpUnit,
    },
  ];

  const tags = [
    {
      text: userProfile.role.name,
      color: userProfile.role.color,
      icon: "fas fa-shield-alt",
    },
    {
      text: `${userProfile.xpLevel} ${userProfile.xpUnit}`,
      color: xpInfo.color,
      icon: "fas fa-star",
    },
  ];

  return (
    <BaseStatsCard
      title={userProfile.username}
      imageUrl={userProfile.profilePicture}
      imageSize="md"
      imageBorderColor={userProfile.role.color}
      imageShape="circle"
      tags={tags}
      stats={stats}
      className={className}
    />
  );
}

export default ProfileCard;
