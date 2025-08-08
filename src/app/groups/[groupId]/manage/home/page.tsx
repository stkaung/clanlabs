"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import { groupManagement, type GroupManagementData } from "@/data/mock";

export default function GroupManageHomePage() {
  const params = useParams();
  const theme = useTheme();
  const groupId = params.groupId as string;
  const [serialKey, setSerialKey] = useState("");
  
  // Get the management data for this specific group
  const groupData: GroupManagementData | undefined = groupManagement[groupId];
  
  // Function to format expiry time
  const formatExpiryTime = (days: number, hours: number, minutes: number) => {
    return `${days} days, ${hours} hours, and ${minutes} minutes`;
  };
  
  // If group data doesn't exist, show a fallback or error
  if (!groupData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Group Not Found</h1>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>The requested group management data could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`rounded-2xl backdrop-blur-xl overflow-hidden border shadow-xl relative group mb-8 p-5 ${
        theme === "dark" 
          ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
          : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          theme === "dark" ? "from-[#A84CFB]/5 to-transparent" : "from-blue-500/5 to-transparent"
        }`}></div>
        <div className="flex items-center flex-wrap gap-4 sm:gap-5">
          <div className="relative group/icon">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20 group-hover/icon:opacity-30 transition duration-500"></div>
            <div className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg relative ${
              theme === "dark" 
                ? "bg-gradient-to-br from-[#1D203A] to-[#2B2D44] shadow-purple-500/10" 
                : "bg-gradient-to-br from-white to-gray-50 shadow-blue-500/10"
            }`}>
              <Image
                src={groupData.logo}
                alt={groupData.name}
                width={40}
                height={40}
                className="object-contain group-hover/icon:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent truncate ${
              theme === "dark" 
                ? "from-white to-white/80" 
                : "from-gray-900 to-gray-700"
            }`}>{groupData.name}</h1>
            <div className={`flex items-center space-x-2 text-sm ${
              theme === "dark" ? "text-[#E0E0E0]/80" : "text-gray-600"
            }`}>
              <i className="fas fa-gear animate-spin-slow" />
              <span>Group Management Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Group Information */}
        <div className={`rounded-2xl backdrop-blur-xl overflow-hidden border shadow-xl relative group ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            theme === "dark" ? "from-[#A84CFB]/5 to-transparent" : "from-blue-500/5 to-transparent"
          }`}></div>
          
          {/* Header */}
          <div className={`flex items-center justify-between p-5 hover:backdrop-blur-2xl transition-all duration-300 cursor-pointer group/header border-b ${
            theme === "dark" 
              ? "hover:bg-white/10 border-white/5" 
              : "hover:bg-gray-50/80 border-gray-200/50"
          }`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative">
                  <i className="fas fa-info text-[#A84CFB] text-xl group-hover/header:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className={`font-medium text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Group Information</span>
            </div>
          </div>

          {/* Owner Card */}
          <div className={`p-5 hover:backdrop-blur-2xl transition-all duration-300 cursor-pointer border-b ${
            theme === "dark" 
              ? "hover:bg-white/10 border-white/5" 
              : "hover:bg-gray-50/80 border-gray-200/50"
          } group/owner`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative group-hover/owner:bg-gradient-to-br group-hover/owner:from-[#A84CFB]/30 group-hover/owner:to-[#7B5EFF]/30 transition-all duration-300">
                  <i className="fas fa-crown text-[#A84CFB] text-2xl group-hover/owner:scale-110 transition-transform duration-300" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-[#1D203A]" : "bg-white"
                }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
                </div>
              </div>
              <div>
                <div className={`text-sm uppercase tracking-wider font-medium ${
                  theme === "dark" ? "text-[#E0E0E0]/80" : "text-gray-600"
                }`}>GROUP OWNER</div>
                <div className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{groupData.owner}</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
            <div className={`rounded-xl backdrop-blur-md border p-4 hover:border-white/10 transition-all duration-300 cursor-pointer group/stat relative ${
              theme === "dark" 
                ? "bg-[#2B2D44]/30 border-white/5 hover:bg-[#2B2D44]/40" 
                : "bg-gray-50/80 border-gray-200/50 hover:bg-gray-100/80 hover:border-gray-300/50"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B5EFF]/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#7B5EFF] mb-3">
                <i className="fas fa-users text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">MEMBERS</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#7B5EFF]/10 flex items-center justify-center group-hover/stat:bg-[#7B5EFF]/20 transition-colors duration-300">
                  <i className="fas fa-arrow-up text-[10px] group-hover/stat:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className={`text-3xl font-bold group-hover/stat:text-[#7B5EFF] transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{groupData.members}</div>
              <div className="text-xs text-[#7B5EFF] mt-1">{groupData.memberGrowth}</div>
            </div>
            <div className={`rounded-xl backdrop-blur-md border p-4 hover:border-white/10 transition-all duration-300 cursor-pointer group/stat relative ${
              theme === "dark" 
                ? "bg-[#2B2D44]/30 border-white/5 hover:bg-[#2B2D44]/40" 
                : "bg-gray-50/80 border-gray-200/50 hover:bg-gray-100/80 hover:border-gray-300/50"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#00FF9C] mb-3">
                <i className="fas fa-layer-group text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">ROLE</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#00FF9C]/10 flex items-center justify-center group-hover/stat:bg-[#00FF9C]/20 transition-colors duration-300">
                  <i className="fas fa-circle-info text-[10px] group-hover/stat:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className={`text-3xl font-bold group-hover/stat:text-[#00FF9C] transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>{groupData.role}</div>
              <div className="text-xs text-[#00FF9C] mt-1">{groupData.permissions}</div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className={`rounded-2xl backdrop-blur-xl overflow-hidden border shadow-xl relative group ${
          theme === "dark" 
            ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
            : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            theme === "dark" ? "from-[#A84CFB]/5 to-transparent" : "from-blue-500/5 to-transparent"
          }`}></div>
          
          {/* Header */}
          <div className={`flex items-center justify-between p-5 hover:backdrop-blur-2xl transition-all duration-300 cursor-pointer group/header border-b ${
            theme === "dark" 
              ? "hover:bg-white/10 border-white/5" 
              : "hover:bg-gray-50/80 border-gray-200/50"
          }`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative">
                  <i className="fas fa-credit-card text-[#A84CFB] text-xl group-hover/header:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className={`font-medium text-lg ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Subscription</span>
            </div>
          </div>

          {/* Status Card */}
          <div className={`p-5 hover:backdrop-blur-2xl transition-all duration-300 cursor-pointer border-b ${
            theme === "dark" 
              ? "hover:bg-white/10 border-white/5" 
              : "hover:bg-gray-50/80 border-gray-200/50"
          } group/status`}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00FF9C] to-[#00D98B] rounded-2xl blur opacity-20"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00FF9C]/20 to-[#00D98B]/20 flex items-center justify-center relative group-hover/status:bg-gradient-to-br group-hover/status:from-[#00FF9C]/30 group-hover/status:to-[#00D98B]/30 transition-all duration-300">
                  <i className="fas fa-shield-halved text-[#00FF9C] text-2xl group-hover/status:scale-110 transition-transform duration-300" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-[#1D203A]" : "bg-white"
                }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
                </div>
              </div>
              <div>
                <div className={`text-sm uppercase tracking-wider font-medium ${
                  theme === "dark" ? "text-[#E0E0E0]/80" : "text-gray-600"
                }`}>SUBSCRIPTION STATUS</div>
                <div className="flex items-center space-x-2">
                  <div className={`h-5 w-5 rounded-lg flex items-center justify-center ${
                    groupData.subscriptionStatus === "ACTIVE" 
                      ? "bg-[#00FF9C]/10" 
                      : groupData.subscriptionStatus === "PENDING"
                      ? "bg-[#F59E0B]/10"
                      : "bg-[#EF4444]/10"
                  }`}>
                    <i className={`text-xs ${
                      groupData.subscriptionStatus === "ACTIVE" 
                        ? "fas fa-check text-[#00FF9C]" 
                        : groupData.subscriptionStatus === "PENDING"
                        ? "fas fa-clock text-[#F59E0B]"
                        : "fas fa-times text-[#EF4444]"
                    }`} />
                  </div>
                  <span className={`font-medium ${
                    groupData.subscriptionStatus === "ACTIVE" 
                      ? "text-[#00FF9C]" 
                      : groupData.subscriptionStatus === "PENDING"
                      ? "text-[#F59E0B]"
                      : "text-[#EF4444]"
                  }`}>{groupData.subscriptionStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Info */}
          <div className="p-5 group/expiry">
            <div className={`rounded-xl backdrop-blur-md border p-4 relative ${
              theme === "dark" 
                ? "bg-[#2B2D44]/30 border-white/5" 
                : "bg-gray-50/80 border-gray-200/50"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/10 to-transparent opacity-0 group-hover/expiry:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#00FF9C] mb-3">
                <i className="fas fa-clock text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">EXPIRES IN</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#00FF9C]/10 flex items-center justify-center">
                  <i className="fas fa-arrow-left text-[10px]" />
                </div>
              </div>
              <div className={`text-lg font-semibold group-hover/expiry:text-[#00FF9C] transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                <span>
                  {formatExpiryTime(groupData.expiryDays, groupData.expiryHours, groupData.expiryMinutes)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Key Section */}
        <div className={`rounded-2xl backdrop-blur-xl overflow-hidden border shadow-xl relative group mt-8 ${
        theme === "dark" 
          ? "bg-[#1D203A]/40 border-white/5 shadow-purple-500/10" 
          : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          theme === "dark" ? "from-[#3B6EFF]/5 to-transparent" : "from-blue-500/5 to-transparent"
        }`}></div>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-5 hover:backdrop-blur-2xl transition-all duration-300 cursor-pointer group/header border-b ${
          theme === "dark" 
            ? "hover:bg-white/10 border-white/5" 
            : "hover:bg-gray-50/80 border-gray-200/50"
        }`}>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3B6EFF] to-[#7A83FF] rounded-2xl blur opacity-20"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B6EFF]/20 to-[#7A83FF]/20 flex items-center justify-center relative">
                <i className="fas fa-key text-[#3B6EFF] text-xl group-hover/header:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <span className={`font-medium text-lg ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Redeem Key</span>
          </div>
          <div className={`h-8 w-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-white/5 group-hover/header:bg-white/10" 
              : "bg-gray-100/50 group-hover/header:bg-gray-200/50"
          }`}>
            <i className={`fas fa-chevron-right text-sm group-hover/header:translate-x-0.5 transition-transform duration-200 ${
              theme === "dark" ? "text-[#E0E0E0]" : "text-gray-600"
            }`} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
            <div className="flex-1">
              <div className={`text-sm uppercase tracking-wider font-medium mb-2 ${
                theme === "dark" ? "text-[#E0E0E0]/80" : "text-gray-600"
              }`}>Serial Key</div>
              <div className="relative group/input">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3B6EFF]/50 to-[#7A83FF]/50 rounded-xl blur opacity-0 group-focus-within/input:opacity-20 transition duration-300"></div>
                <input
                  type="text"
                  value={serialKey}
                  onChange={(e) => setSerialKey(e.target.value)}
                  className={`w-full h-[46px] px-4 rounded-xl backdrop-blur-md border focus:outline-none focus:border-[#3B6EFF]/50 transition-all duration-300 relative ${
                    theme === "dark" 
                      ? "bg-[#2B2D44]/30 border-white/5 text-white placeholder-[#E0E0E0]/50" 
                      : "bg-gray-50/80 border-gray-200/50 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Enter your serial key..."
                />
              </div>
            </div>
            <button 
              disabled={!serialKey.trim()}
              className={`h-[46px] px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto ${
                serialKey.trim() 
                  ? 'bg-[#3B6EFF] hover:bg-[#3B6EFF]/90 text-white shadow-lg shadow-[#3B6EFF]/20 cursor-pointer' 
                  : theme === "dark"
                    ? 'bg-[#2B2D44]/50 text-[#E0E0E0]/40 cursor-not-allowed'
                    : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="fas fa-lock text-sm" />
              <span>Redeem</span>
            </button>
          </div>

          <div className={`flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs ${
            theme === "dark" ? "text-[#E0E0E0]/60" : "text-gray-500"
          }`}>
            <span>Need a new subscription?</span>
            <button className={`px-3 py-1.5 rounded-lg hover:bg-[#00FF9C]/20 text-[#00FF9C] hover:text-[#00D98B] transition-all duration-200 flex items-center space-x-1 border hover:border-[#00FF9C]/40 ${
              theme === "dark" 
                ? "bg-[#00FF9C]/10 border-[#00FF9C]/20" 
                : "bg-[#00FF9C]/5 border-[#00FF9C]/30"
            }`}>
              <span>Visit Store</span>
              <i className="fas fa-external-link text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}