"use client";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import type { UserProfile } from "@/types/group-profile";

interface ProfileCardProps {
  userProfile: UserProfile;
  className?: string;
}

function ProfileCard({ userProfile, className = "" }: ProfileCardProps) {
  const theme = useTheme();

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
        {/* Profile Picture */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-4"
            style={{
              borderColor: userProfile.role.color,
            }}
          >
            {userProfile.profilePicture ? (
              <Image
                src={userProfile.profilePicture}
                alt={userProfile.username}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                }}
              >
                <i
                  className="fas fa-user text-2xl"
                  style={{
                    color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                  }}
                />
              </div>
            )}
          </div>

          {/* XP Level Badge */}
          <div
            className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg border-2"
            style={{
              backgroundColor: xpInfo.color,
              borderColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
            }}
          >
            {xpInfo.level}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2
            className="text-2xl font-bold mb-1"
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#1F2937",
            }}
          >
            {userProfile.username}
          </h2>

          {/* Tags Container */}
          <div className="space-y-2">
            {/* Role Tag */}
            <div
              className="flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white w-fit"
              style={{
                backgroundColor: userProfile.role.color,
              }}
            >
              <i className="fas fa-shield-alt mr-2 text-xs" />
              {userProfile.role.name}
            </div>

            {/* XP Level Tag */}
            <div
              className="flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white w-fit"
              style={{
                backgroundColor: xpInfo.color,
              }}
            >
              <i className="fas fa-star mr-2 text-xs" />
              {userProfile.xpLevel} {userProfile.xpUnit}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="pt-4 border-t"
        style={{
          borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Joined Date */}
          <div className="text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              <i
                className="fas fa-calendar-alt text-lg mr-2"
                style={{ color: "#3B82F6" }}
              />
              {new Date(userProfile.joinedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <p
              className="text-sm"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              Joined
            </p>
          </div>

          {/* XP Progress */}
          <div className="text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              <i
                className="fas fa-trophy text-lg mr-2"
                style={{ color: xpInfo.color }}
              />
              {userProfile.xpLevel}
            </div>
            <p
              className="text-sm"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              {userProfile.xpUnit}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        <button
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 text-white"
          style={{ backgroundColor: "#3B82F6" }}
        >
          <i className="fas fa-edit text-xs" />
          <span>Edit Profile</span>
        </button>

        <button
          className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
            color: theme === "dark" ? "#A0A0A0" : "#6B7280",
          }}
        >
          <i className="fas fa-cog text-sm" />
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
