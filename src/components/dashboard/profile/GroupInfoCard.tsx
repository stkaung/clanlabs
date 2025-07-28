"use client";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import type { GroupInfo } from "@/types/group-profile";

interface GroupInfoCardProps {
  groupInfo: GroupInfo;
  className?: string;
}

function GroupInfoCard({ groupInfo, className = "" }: GroupInfoCardProps) {
  const theme = useTheme();

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

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800/80 via-slate-800/70 to-gray-900/80 border-white/10 shadow-2xl"
          : "bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/70 border-blue-200/30 shadow-lg"
      } ${className}`}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Group Logo */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl overflow-hidden border-4 flex items-center justify-center"
            style={{
              borderColor: "#3B82F6",
              backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
            }}
          >
            {groupInfo.logo ? (
              <Image
                src={groupInfo.logo}
                alt={groupInfo.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <span
                className="text-2xl font-bold"
                style={{
                  color: "#3B82F6",
                }}
              >
                {groupInfo.abbreviation}
              </span>
            )}
          </div>

          {/* Verified Badge */}
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: "#22C55E",
              borderColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
            }}
          >
            <i className="fas fa-check text-white text-xs" />
          </div>
        </div>

        {/* Group Info */}
        <div className="flex-1">
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#1F2937",
            }}
          >
            {groupInfo.name}
          </h2>

          {/* Creator */}
          <div className="flex items-center space-x-2 mb-2">
            <i
              className="fas fa-user-crown text-sm"
              style={{ color: "#F59E0B" }}
            />
            <span
              className="text-sm font-medium"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              By: {groupInfo.creator.name}
            </span>
          </div>

          {/* Member Count */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-users text-sm" style={{ color: "#3B82F6" }} />
            <span
              className="text-sm font-medium"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              {formatMemberCount(groupInfo.memberCount)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {groupInfo.description && (
        <div className="mb-6">
          <p
            className="text-sm leading-relaxed"
            style={{
              color: theme === "dark" ? "#A0A0A0" : "#6B7280",
            }}
          >
            {groupInfo.description}
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div
        className="pt-4 border-t"
        style={{
          borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Created Date */}
          <div className="text-center">
            <div
              className="text-xl font-bold mb-1"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              <i
                className="fas fa-calendar-plus text-lg mr-2"
                style={{ color: "#22C55E" }}
              />
              {formatDate(groupInfo.createdDate)}
            </div>
            <p
              className="text-sm"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              Established
            </p>
          </div>

          {/* Group ID */}
          <div className="text-center">
            <div
              className="text-xl font-bold mb-1 font-mono"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              <i
                className="fas fa-hashtag text-lg mr-2"
                style={{ color: "#A855F7" }}
              />
              {groupInfo.id.slice(-6).toUpperCase()}
            </div>
            <p
              className="text-sm"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              Group ID
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupInfoCard;
