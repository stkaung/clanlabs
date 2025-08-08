import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { serialKeys } from "@/data/mock";

const poppinsClass = "font-['Poppins']";

// Use mock data from centralized database
const mockSerialKeys = serialKeys;

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
  const [hasSearched, setHasSearched] = useState(false);
  const poppinsClass = "font-['Poppins']";

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResult(null);
      setHasSearched(false);
      return;
    }
    const result = mockSerialKeys.find(key => key.key === trimmed);
    setSearchResult(result || null);
    setHasSearched(true);
  };

  return (
    <div className={`rounded-lg border ${poppinsClass} ${
      theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-200"
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${poppinsClass} ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
            Search Serial Key
          </h3>
          <button
            onClick={handleSearch}
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              theme === "dark" ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <i className="fas fa-magnifying-glass" />
            Lookup
          </button>
        </div>

        <label className={`block mb-2 text-sm ${poppinsClass} ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Serial Key to Search
        </label>
        {/* Search Input */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Enter a serial key (e.g., CL-SUB-2025-XXXXXXXX...)"
              className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 w-full placeholder:${poppinsClass} ${
                theme === "dark"
                  ? "bg-slate-800/60 border-blue-500/20 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/40"
                  : "bg-white/60 border-blue-300/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40"
              }`}
              style={{ backdropFilter: "blur(12px)" }}
            />
          </div>
          <button
            onClick={handleSearch}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${poppinsClass} transition-all duration-200 shrink-0 ${
              theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <i className="fas fa-magnifying-glass mr-2" />
            Search
          </button>
        </div>

        {/* Empty / Not found state */}
        {!searchResult && hasSearched && (
          <div
            className={`text-center py-10 rounded-xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50 text-gray-300"
                : "bg-gray-50 border-gray-200/50 text-gray-700"
            }`}
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-red-500/10 ${poppinsClass}`}>
              <i className="fas fa-circle-xmark text-red-500" />
            </div>
            <span className={poppinsClass}>No serial key found. Please check the key and try again.</span>
          </div>
        )}

        {searchResult && (
          <div
            className={`rounded-lg border ${
              theme === "dark" ? "bg-[#1B2537] border-white/5" : "bg-white border-gray-200"
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === "dark" ? "bg-[#A855F7]/20" : "bg-violet-100"
                    }`}
                  >
                    <i className={`fas fa-key ${theme === "dark" ? "text-[#A855F7]" : "text-violet-600"}`}></i>
                  </div>
                  <div>
                    <div className={`font-mono text-base ${poppinsClass} ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{searchResult.key}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          theme === "dark" ? "bg-[#A855F7]/20 text-[#A855F7]" : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {searchResult.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          searchResult.status === "Redeemed"
                            ? theme === "dark" ? "bg-[#EF4444]/20 text-[#EF4444]" : "bg-red-100 text-red-700"
                            : theme === "dark" ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {searchResult.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-[#22C55E]/20" : "bg-emerald-100"
                  }`}
                >
                  <i className={`fas fa-check text-sm ${theme === "dark" ? "text-[#22C55E]" : "text-emerald-700"}`}></i>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#171F2B]" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#2563EB]/20" : "bg-blue-100"}`}>
                      <i className={`fas fa-ruler ${theme === "dark" ? "text-[#2563EB]" : "text-blue-600"}`}></i>
                    </div>
                    <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>LENGTH</span>
                  </div>
                  <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-lg ${poppinsClass}`}>{searchResult.length}</div>
                </div>
                <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#171F2B]" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#22C55E]/20" : "bg-emerald-100"}`}>
                      <i className={`fas fa-calendar ${theme === "dark" ? "text-[#22C55E]" : "text-emerald-700"}`}></i>
                    </div>
                    <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>CREATED</span>
                  </div>
                  <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-lg ${poppinsClass}`}>{formatDate(searchResult.created)}</div>
                </div>
              </div>

              {searchResult.status === "Redeemed" && searchResult.redemption && (
                <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#251B1E]" : "bg-rose-50"}`}>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#DC2626]/20" : "bg-rose-100"}`}>
                      <i className={`fas fa-user ${theme === "dark" ? "text-[#DC2626]" : "text-rose-600"}`}></i>
                    </div>
                    <span className={`${theme === "dark" ? "text-[#DC2626]" : "text-rose-700"} text-sm font-semibold ${poppinsClass}`}>Redemption Details</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#1F1518]" : "bg-white border border-rose-100"}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#2563EB]/20" : "bg-blue-100"}`}>
                          <i className={`fab fa-discord text-xs ${theme === "dark" ? "text-[#2563EB]" : "text-blue-600"}`}></i>
                        </div>
                        <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>DISCORD USERNAME</span>
                      </div>
                      <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-sm ${poppinsClass}`}>{searchResult.redemption.discordUsername}</div>
                    </div>
                    <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#1F1518]" : "bg-white border border-rose-100"}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#A855F7]/20" : "bg-violet-100"}`}>
                          <i className={`fas fa-fingerprint text-xs ${theme === "dark" ? "text-[#A855F7]" : "text-violet-600"}`}></i>
                        </div>
                        <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>DISCORD USER ID</span>
                      </div>
                      <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-sm font-mono ${poppinsClass}`}>{searchResult.redemption.discordUserId}</div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 mb-4 ${theme === "dark" ? "bg-[#1F1518]" : "bg-white border border-rose-100"}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#22C55E]/20" : "bg-emerald-100"}`}>
                        <i className={`fas fa-users text-xs ${theme === "dark" ? "text-[#22C55E]" : "text-emerald-700"}`}></i>
                      </div>
                      <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>GROUP ID</span>
                    </div>
                    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-sm font-mono ${poppinsClass}`}>{searchResult.redemption.groupId}</div>
                  </div>

                  <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#1F1518]" : "bg-white border border-rose-100"}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${theme === "dark" ? "bg-[#F97316]/20" : "bg-orange-100"}`}>
                        <i className={`fas fa-clock text-xs ${theme === "dark" ? "text-[#F97316]" : "text-orange-600"}`}></i>
                      </div>
                      <span className={`${theme === "dark" ? "text-[#94A3B8]" : "text-gray-500"} text-xs uppercase tracking-wider ${poppinsClass}`}>REDEEMED AT</span>
                    </div>
                    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-sm ${poppinsClass}`}>{formatDateTime(searchResult.redemption.redeemedAt)}</div>
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