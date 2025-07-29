"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import type { MedalsProps, Medal } from "@/types/profile-sections";

function MedalsSection({ medals, className = "" }: MedalsProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Group medals by type and count them
  const groupedMedals = medals.reduce((acc, medal) => {
    const key = medal.name;
    if (acc[key]) {
      acc[key].count += 1;
    } else {
      acc[key] = { ...medal, count: 1 };
    }
    return acc;
  }, {} as Record<string, Medal & { count: number }>);

  const uniqueMedals = Object.values(groupedMedals);

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
                {uniqueMedals.length} unique medals
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
          {uniqueMedals.length === 0 ? (
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uniqueMedals.map((medal, index) => (
                <div
                  key={medal.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 transform ${
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                    borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                    transitionDelay: isExpanded
                      ? `${index * 50}ms`
                      : `${(uniqueMedals.length - index - 1) * 25}ms`,
                  }}
                >
                  {/* Count Badge */}
                  {medal.count > 1 && (
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        backgroundColor: "#3B82F6",
                      }}
                    >
                      {medal.count}
                    </div>
                  )}

                  {/* Medal Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{
                      backgroundColor: "#3B82F6",
                    }}
                  >
                    <i className={`${medal.icon} text-white text-lg`} />
                  </div>

                  {/* Medal Name */}
                  <h4
                    className="font-semibold text-xs text-center line-clamp-2"
                    style={{
                      color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                    }}
                    title={medal.name}
                  >
                    {medal.name}
                  </h4>
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
