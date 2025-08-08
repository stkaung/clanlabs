"use client";

import { useState } from "react";
import Image from "next/image";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";
import { UserProfile, AuditLog } from "@/data/mock";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
}

function UserProfileModal({ isOpen, onClose, userProfile }: UserProfileModalProps) {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<"overview" | "medals" | "qualifications" | "audit">("overview");

  if (!userProfile) return null;

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "Owner":
        return "fas fa-crown";
      case "Admin":
        return "fas fa-shield-alt";
      case "Moderator":
        return "fas fa-user-shield";
      case "Senior Member":
        return "fas fa-star";
      case "Member":
        return "fas fa-user";
      case "Junior Member":
        return "fas fa-user-graduate";
      default:
        return "fas fa-user";
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Moderator":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Senior Member":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "role_change":
        return "fas fa-user-tag";
      case "development":
        return "fas fa-code";
      case "meeting":
        return "fas fa-users";
      case "project":
        return "fas fa-project-diagram";
      case "moderation":
        return "fas fa-shield-alt";
      case "design":
        return "fas fa-palette";
      case "analytics":
        return "fas fa-chart-bar";
      case "documentation":
        return "fas fa-file-alt";
      case "bug_report":
        return "fas fa-bug";
      case "group_creation":
        return "fas fa-plus-circle";
      case "settings":
        return "fas fa-cog";
      case "member_management":
        return "fas fa-user-minus";
      case "assets":
        return "fas fa-image";
      case "feedback":
        return "fas fa-comment";
      default:
        return "fas fa-info-circle";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "role_change":
        return "text-blue-500";
      case "development":
        return "text-green-500";
      case "meeting":
        return "text-purple-500";
      case "project":
        return "text-orange-500";
      case "moderation":
        return "text-red-500";
      case "design":
        return "text-pink-500";
      case "analytics":
        return "text-indigo-500";
      case "documentation":
        return "text-gray-500";
      case "bug_report":
        return "text-yellow-500";
      case "group_creation":
        return "text-emerald-500";
      case "settings":
        return "text-slate-500";
      case "member_management":
        return "text-rose-500";
      case "assets":
        return "text-cyan-500";
      case "feedback":
        return "text-violet-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${userProfile.username}`}
      subtitle="Member Profile"
      maxWidth="7xl"
      withinContainer={true}
    >
      <div className="space-y-8">
        {/* Glassmorphic Profile Header */}
        <div className={`text-center p-8 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-200/50 dark:border-white/10 shadow-lg">
            <Image
              src={userProfile.profilePicture}
              alt={userProfile.username}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {userProfile.username}
          </h3>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRankColor(userProfile.rank)} shadow-lg`}>
            <i className={`${getRankIcon(userProfile.rank)} mr-2`} />
            {userProfile.rank}
          </div>
        </div>

        {/* Glassmorphic Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className={`text-center p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
            theme === "dark" 
              ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
              : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-blue-300" : "text-blue-600"
            }`}>
              {userProfile.experience.toLocaleString()}
            </div>
            <div className={`text-sm ${
              theme === "dark" ? "text-blue-200" : "text-blue-700"
            }`}>
              Experience
            </div>
          </div>
          
          <div className={`text-center p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
            theme === "dark" 
              ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
              : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-purple-300" : "text-purple-600"
            }`}>
              {userProfile.quotaPoints.toLocaleString()}
            </div>
            <div className={`text-sm ${
              theme === "dark" ? "text-purple-200" : "text-purple-700"
            }`}>
              Quota Points
            </div>
          </div>
        </div>

        {/* Glassmorphic Medals */}
        <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <h4 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <i className="fas fa-medal mr-2 text-yellow-500"></i>
            Medals ({userProfile.medals.length})
          </h4>
          {userProfile.medals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No medals earned yet
            </div>
          ) : (
            <div className="space-y-3">
              {userProfile.medals.map((medal) => (
                <div key={medal.id} className={`flex items-center p-4 rounded-xl backdrop-blur-sm border ${
                  theme === "dark" 
                    ? "bg-white/5 border-white/5" 
                    : "bg-white/50 border-gray-200/30"
                }`}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-lg"
                    style={{ backgroundColor: medal.color }}
                  >
                    <i className={`${medal.icon} text-white`} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {medal.name}
                    </div>
                    <div className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {medal.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Glassmorphic Qualifications */}
        <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <h4 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <i className="fas fa-certificate mr-2 text-blue-500"></i>
            Qualifications ({userProfile.qualifications.length})
          </h4>
          {userProfile.qualifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No qualifications added yet
            </div>
          ) : (
            <div className="space-y-3">
              {userProfile.qualifications.map((qualification) => (
                <div key={qualification.id} className={`p-4 rounded-xl backdrop-blur-sm border ${
                  theme === "dark" 
                    ? "bg-white/5 border-white/5" 
                    : "bg-white/50 border-gray-200/30"
                }`}>
                  <div className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {qualification.title}
                  </div>
                  <div className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {qualification.issuer}
                  </div>
                  <div className={`text-sm mt-1 ${
                    qualification.status === "active" ? "text-green-500" : "text-red-500"
                  }`}>
                    {qualification.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Glassmorphic Audit Logs */}
        <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <h4 className={`text-lg font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <i className="fas fa-history mr-2 text-gray-500"></i>
            Audit Logs ({userProfile.auditLogs.length})
          </h4>
          <div className="text-center py-8">
            <div className={`text-gray-500 mb-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              {userProfile.auditLogs.length} audit entries available
            </div>
            <button className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              theme === "dark"
                ? "bg-[#A84CFB]/20 text-[#A84CFB] hover:bg-[#A84CFB]/30"
                : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
            }`}>
              View Logs
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default UserProfileModal; 