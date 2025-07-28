"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import type { MedalsProps, Medal } from "@/types/profile-sections";

function MedalsSection({ medals, className = "" }: MedalsProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function getRarityColor(rarity: Medal["rarity"]): string {
    switch (rarity) {
      case "common":
        return "#6B7280";
      case "rare":
        return "#3B82F6";
      case "epic":
        return "#A855F7";
      case "legendary":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800/80 via-slate-800/70 to-gray-900/80 border-white/10 shadow-2xl"
          : "bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/70 border-blue-200/30 shadow-lg"
      } ${className}`}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div
        className="p-6 border-b cursor-pointer"
        style={{
          borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#F59E0B",
              }}
            >
              <i className="fas fa-medal text-white text-lg" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                }}
              >
                Medals
              </h3>
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                {medals.length} earned
              </p>
            </div>
          </div>
          <i
            className="fas fa-chevron-down text-sm transition-all duration-300 ease-in-out"
            style={{
              color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          {medals.length === 0 ? (
            <div className="text-center py-8">
              <i
                className="fas fa-medal text-4xl mb-3"
                style={{
                  color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                }}
              />
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                No medals earned yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {medals.map((medal, index) => (
                <div
                  key={medal.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 transform ${
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                    borderColor: getRarityColor(medal.rarity),
                    transitionDelay: isExpanded
                      ? `${index * 100}ms`
                      : `${(medals.length - index - 1) * 50}ms`,
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: getRarityColor(medal.rarity),
                      }}
                    >
                      <i className={`${medal.icon} text-white text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4
                          className="font-semibold text-sm truncate"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                          }}
                        >
                          {medal.name}
                        </h4>
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide flex-shrink-0 ml-2"
                          style={{
                            backgroundColor: `${getRarityColor(
                              medal.rarity
                            )}20`,
                            color: getRarityColor(medal.rarity),
                          }}
                        >
                          {medal.rarity}
                        </span>
                      </div>
                      <p
                        className="text-xs mb-2 line-clamp-2"
                        style={{
                          color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                        }}
                      >
                        {medal.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs"
                          style={{
                            color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                          }}
                        >
                          {formatDate(medal.earnedDate)}
                        </span>
                        {medal.progress && (
                          <div className="flex items-center space-x-1">
                            <div
                              className="w-16 h-2 rounded-full overflow-hidden"
                              style={{
                                backgroundColor:
                                  theme === "dark" ? "#4B5563" : "#E5E7EB",
                              }}
                            >
                              <div
                                className="h-full transition-all duration-300"
                                style={{
                                  backgroundColor: getRarityColor(medal.rarity),
                                  width: `${
                                    (medal.progress.current /
                                      medal.progress.total) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                            <span
                              className="text-xs"
                              style={{
                                color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                              }}
                            >
                              {medal.progress.current}/{medal.progress.total}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedalsSection;
