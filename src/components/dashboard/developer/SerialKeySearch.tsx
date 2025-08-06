import { useState } from "react";
import useTheme from "@/hooks/useTheme";

const poppinsClass = "font-['Poppins']";

// Mock database of serial keys
const mockSerialKeys = [
  {
    key: "CL-DIV-2024-XYZ789GH1012",
    type: "Division",
    status: "Redeemed",
    length: "5 months",
    created: "2024-01-14T12:00:00Z",
    redemption: {
      discordUsername: "ShadowHunter#1234",
      discordUserId: "123456789012345678",
      groupId: "GRP-001",
      redeemedAt: "2024-01-21T05:09:57Z"
    }
  },
  {
    key: "CL-SUB-2024-ABC123XY4567",
    type: "Subscription",
    status: "Available",
    length: "12 months",
    created: "2024-01-15T14:30:00Z"
  },
  {
    key: "CL-DIV-2024-DEF456UV8901",
    type: "Division",
    status: "Available",
    length: "3 months",
    created: "2024-01-16T09:15:00Z"
  },
  {
    key: "CL-SUB-2024-GHI789WX2345",
    type: "Subscription",
    status: "Redeemed",
    length: "6 months",
    created: "2024-01-17T16:45:00Z",
    redemption: {
      discordUsername: "NightRider#5678",
      discordUserId: "987654321098765432",
      groupId: "GRP-002",
      redeemedAt: "2024-01-20T18:22:33Z"
    }
  },
  {
    key: "CL-DIV-2024-JKL012PQ6789",
    type: "Division",
    status: "Available",
    length: "1 month",
    created: "2024-01-18T11:20:00Z"
  }
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}`;
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })} at ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })}`;
}

export default function SerialKeySearch() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<typeof mockSerialKeys[0] | null>(null);

  const handleSearch = () => {
    const result = mockSerialKeys.find(key => key.key === searchQuery);
    setSearchResult(result || null);
  };

  return (
    <div className={`rounded-lg border ${
      theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-200"
    }`}>
      <div className="p-6">


        {searchResult && (
          <div className="rounded-lg bg-[#1B2537]">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
                    <i className="fas fa-key text-[#A855F7]"></i>
                  </div>
                  <div>
                    <div className="font-mono text-base text-white">{searchResult.key}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#A855F7]/20 text-[#A855F7]">
                        {searchResult.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        searchResult.status === "Redeemed" 
                          ? "bg-[#EF4444]/20 text-[#EF4444]"
                          : "bg-[#22C55E]/20 text-[#22C55E]"
                      }`}>
                        {searchResult.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                  <i className="fas fa-check text-[#22C55E] text-sm"></i>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg bg-[#171F2B] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded bg-[#2563EB]/20 flex items-center justify-center">
                      <i className="fas fa-ruler text-[#2563EB]"></i>
                    </div>
                    <span className="text-[#64748B] text-xs uppercase tracking-wider">LENGTH</span>
                  </div>
                  <div className="text-white text-lg">{searchResult.length}</div>
                </div>
                <div className="rounded-lg bg-[#171F2B] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded bg-[#22C55E]/20 flex items-center justify-center">
                      <i className="fas fa-calendar text-[#22C55E]"></i>
                    </div>
                    <span className="text-[#64748B] text-xs uppercase tracking-wider">CREATED</span>
                  </div>
                  <div className="text-white text-lg">{formatDate(searchResult.created)}</div>
                </div>
              </div>

              {searchResult.status === "Redeemed" && searchResult.redemption && (
                <div className="rounded-lg bg-[#251B1E] p-4">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 rounded bg-[#DC2626]/20 flex items-center justify-center">
                      <i className="fas fa-user text-[#DC2626]"></i>
                    </div>
                    <span className="text-[#DC2626] text-sm font-semibold">Redemption Details</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-[#1F1518] p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-[#2563EB]/20 flex items-center justify-center">
                          <i className="fab fa-discord text-xs text-[#2563EB]"></i>
                        </div>
                        <span className="text-[#94A3B8] text-xs uppercase tracking-wider">DISCORD USERNAME</span>
                      </div>
                      <div className="text-white text-sm">{searchResult.redemption.discordUsername}</div>
                    </div>
                    <div className="rounded-lg bg-[#1F1518] p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded bg-[#A855F7]/20 flex items-center justify-center">
                          <i className="fas fa-fingerprint text-xs text-[#A855F7]"></i>
                        </div>
                        <span className="text-[#94A3B8] text-xs uppercase tracking-wider">DISCORD USER ID</span>
                      </div>
                      <div className="text-white text-sm font-mono">{searchResult.redemption.discordUserId}</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#1F1518] p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded bg-[#22C55E]/20 flex items-center justify-center">
                        <i className="fas fa-users text-xs text-[#22C55E]"></i>
                      </div>
                      <span className="text-[#94A3B8] text-xs uppercase tracking-wider">GROUP ID</span>
                    </div>
                    <div className="text-white text-sm font-mono">{searchResult.redemption.groupId}</div>
                  </div>

                  <div className="rounded-lg bg-[#1F1518] p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded bg-[#F97316]/20 flex items-center justify-center">
                        <i className="fas fa-clock text-xs text-[#F97316]"></i>
                      </div>
                      <span className="text-[#94A3B8] text-xs uppercase tracking-wider">REDEEMED AT</span>
                    </div>
                    <div className="text-white text-sm">{formatDateTime(searchResult.redemption.redeemedAt)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}