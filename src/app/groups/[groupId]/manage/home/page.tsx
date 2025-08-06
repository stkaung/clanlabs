"use client";

import { useState } from "react";
import Image from "next/image";

export default function GroupManageHomePage() {
  const [serialKey, setSerialKey] = useState("");
  const [showFullExpiry, setShowFullExpiry] = useState(true);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#10132A] to-[#1C1E35]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-[#1D203A] to-[#2B2D44] flex items-center justify-center shadow-lg shadow-purple-500/10 relative">
              <Image
                src="/img/logo/develop-team.png"
                alt="Develop Team"
                width={40}
                height={40}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Development Team</h1>
            <div className="flex items-center space-x-2 text-[#E0E0E0]/80">
              <i className="fas fa-gear text-sm animate-spin-slow" />
              <span className="text-sm">Group Management Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Group Information */}
        <div className="rounded-2xl bg-[#1D203A] overflow-hidden shadow-xl shadow-purple-500/10 relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#A84CFB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer group/header border-b border-white/5">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative">
                  <i className="fas fa-info text-[#A84CFB] text-xl group-hover/header:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-white font-medium text-lg">Group Information</span>
            </div>
            <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center group-hover/header:bg-white/10 transition-colors duration-300">
              <i className="fas fa-chevron-right text-[#E0E0E0] text-sm group-hover/header:translate-x-0.5 transition-transform duration-200" />
            </div>
          </div>

          {/* Owner Card */}
          <div className="p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer border-b border-white/5 group/owner">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative group-hover/owner:bg-gradient-to-br group-hover/owner:from-[#A84CFB]/30 group-hover/owner:to-[#7B5EFF]/30 transition-all duration-300">
                  <i className="fas fa-crown text-[#A84CFB] text-2xl group-hover/owner:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1D203A] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
                </div>
              </div>
              <div>
                <div className="text-sm text-[#E0E0E0]/80 uppercase tracking-wider font-medium">GROUP OWNER</div>
                <div className="text-lg font-semibold bg-gradient-to-r from-[#A84CFB] to-[#7B5EFF] bg-clip-text text-transparent">Software Ventures</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="rounded-xl bg-[#2B2D44] p-4 hover:bg-[#2B2D44]/80 transition-all duration-300 cursor-pointer group/stat relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B5EFF]/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#7B5EFF] mb-3">
                <i className="fas fa-users text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">MEMBERS</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#7B5EFF]/10 flex items-center justify-center group-hover/stat:bg-[#7B5EFF]/20 transition-colors duration-300">
                  <i className="fas fa-arrow-up text-[10px] group-hover/stat:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white group-hover/stat:text-[#7B5EFF] transition-colors duration-300">856</div>
              <div className="text-xs text-[#7B5EFF] mt-1">+12% this month</div>
            </div>
            <div className="rounded-xl bg-[#2B2D44] p-4 hover:bg-[#2B2D44]/80 transition-all duration-300 cursor-pointer group/stat relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#00FF9C] mb-3">
                <i className="fas fa-layer-group text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">ROLE</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#00FF9C]/10 flex items-center justify-center group-hover/stat:bg-[#00FF9C]/20 transition-colors duration-300">
                  <i className="fas fa-circle-info text-[10px] group-hover/stat:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white group-hover/stat:text-[#00FF9C] transition-colors duration-300">Admin</div>
              <div className="text-xs text-[#00FF9C] mt-1">Active permissions</div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-2xl bg-[#1D203A] overflow-hidden shadow-xl shadow-purple-500/10 relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#A84CFB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer group/header border-b border-white/5">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A84CFB] to-[#7B5EFF] rounded-2xl blur opacity-20"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A84CFB]/20 to-[#7B5EFF]/20 flex items-center justify-center relative">
                  <i className="fas fa-credit-card text-[#A84CFB] text-xl group-hover/header:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-white font-medium text-lg">Subscription</span>
            </div>
            <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center group-hover/header:bg-white/10 transition-colors duration-300">
              <i className="fas fa-chevron-right text-[#E0E0E0] text-sm group-hover/header:translate-x-0.5 transition-transform duration-200" />
            </div>
          </div>

          {/* Status Card */}
          <div className="p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer border-b border-white/5 group/status">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00FF9C] to-[#00D98B] rounded-2xl blur opacity-20"></div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00FF9C]/20 to-[#00D98B]/20 flex items-center justify-center relative group-hover/status:bg-gradient-to-br group-hover/status:from-[#00FF9C]/30 group-hover/status:to-[#00D98B]/30 transition-all duration-300">
                  <i className="fas fa-shield-halved text-[#00FF9C] text-2xl group-hover/status:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1D203A] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
                </div>
              </div>
              <div>
                <div className="text-sm text-[#E0E0E0]/80 uppercase tracking-wider font-medium">SUBSCRIPTION STATUS</div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-lg bg-[#00FF9C]/10 flex items-center justify-center">
                    <i className="fas fa-check text-[#00FF9C] text-xs" />
                  </div>
                  <span className="text-[#00FF9C] font-medium">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Info */}
          <div className="p-5 group/expiry">
            <div className="rounded-xl bg-[#2B2D44] p-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9C]/10 to-transparent opacity-0 group-hover/expiry:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="flex items-center space-x-2 text-[#00FF9C] mb-3">
                <i className="fas fa-clock text-sm" />
                <span className="text-xs font-medium uppercase tracking-wider">EXPIRES IN</span>
                <div className="ml-auto h-6 w-6 rounded-lg bg-[#00FF9C]/10 flex items-center justify-center">
                  <i className="fas fa-arrow-left text-[10px]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white group-hover/expiry:text-[#00FF9C] transition-colors duration-300">
                {showFullExpiry ? (
                  <span>142 days, 19 hours, and 58 minutes</span>
                ) : (
                  <span>142 days</span>
                )}
              </div>
              <button 
                onClick={() => setShowFullExpiry(!showFullExpiry)}
                className="text-xs text-[#00FF9C] mt-2 hover:text-[#00D98B] transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Click to {showFullExpiry ? 'simplify' : 'show full time'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Key Section */}
      <div className="rounded-2xl bg-[#1D203A] p-6 mt-8 shadow-xl shadow-purple-500/10 relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B6EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3B6EFF] to-[#7A83FF] rounded-2xl blur opacity-20"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B6EFF]/20 to-[#7A83FF]/20 flex items-center justify-center relative">
              <i className="fas fa-key text-[#3B6EFF] text-xl" />
            </div>
          </div>
          <span className="text-white font-medium text-lg">Redeem Key</span>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <div className="text-sm text-[#E0E0E0]/80 uppercase tracking-wider font-medium mb-2">Serial Key</div>
            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3B6EFF]/50 to-[#7A83FF]/50 rounded-xl blur opacity-0 group-focus-within/input:opacity-20 transition duration-300"></div>
              <input
                type="text"
                value={serialKey}
                onChange={(e) => setSerialKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#2B2D44] border border-white/5 text-white placeholder-[#E0E0E0]/50 focus:outline-none focus:border-[#3B6EFF]/50 transition-all duration-300 relative"
                placeholder="Enter your serial key..."
              />
            </div>
          </div>
          <button className="h-[46px] px-6 rounded-xl bg-gradient-to-r from-[#3B6EFF] to-[#7A83FF] hover:from-[#3B6EFF]/90 hover:to-[#7A83FF]/90 text-white font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-[#3B6EFF]/20 relative group/button">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B6EFF] to-[#7A83FF] rounded-xl blur opacity-50 group-hover/button:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <i className="fas fa-lock text-sm" />
              <span>Redeem Key</span>
            </div>
          </button>
        </div>

        <div className="text-center">
          <div className="text-sm text-[#E0E0E0]/80 mb-3">Need a new subscription?</div>
          <button className="h-[46px] px-6 rounded-xl bg-gradient-to-r from-[#00D98B] to-[#00FF9C] hover:from-[#00D98B]/90 hover:to-[#00FF9C]/90 text-white font-medium transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg shadow-[#00D98B]/20 relative group/store">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D98B] to-[#00FF9C] rounded-xl blur opacity-50 group-hover/store:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <i className="fas fa-shopping-cart text-sm" />
              <span>Visit Store</span>
              <i className="fas fa-external-link text-xs ml-2 group-hover/store:translate-x-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}