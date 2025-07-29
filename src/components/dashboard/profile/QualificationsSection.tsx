"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import type {
  QualificationsProps,
  Qualification,
} from "@/types/profile-sections";

function QualificationsSection({
  qualifications,
  className = "",
}: QualificationsProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Group qualifications by title and count them
  const groupedQualifications = qualifications.reduce((acc, qualification) => {
    const key = qualification.title;
    if (acc[key]) {
      acc[key].count += 1;
    } else {
      acc[key] = { ...qualification, count: 1 };
    }
    return acc;
  }, {} as Record<string, Qualification & { count: number }>);

  const uniqueQualifications = Object.values(groupedQualifications);

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
                backgroundColor: "#3B82F6",
              }}
            >
              <i className="fas fa-certificate text-white text-lg" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                }}
              >
                Qualifications
              </h3>
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                {uniqueQualifications.length} unique credentials
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
          {uniqueQualifications.length === 0 ? (
            <div className="text-center py-8">
              <i
                className="fas fa-certificate text-4xl mb-3"
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
                No qualifications added yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uniqueQualifications.map((qualification, index) => (
                <div
                  key={qualification.id}
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
                      : `${(uniqueQualifications.length - index - 1) * 25}ms`,
                  }}
                >
                  {/* Count Badge */}
                  {qualification.count > 1 && (
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        backgroundColor: "#3B82F6",
                      }}
                    >
                      {qualification.count}
                    </div>
                  )}

                  {/* Qualification Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{
                      backgroundColor: "#3B82F6",
                    }}
                  >
                    <i
                      className="fas fa-certificate text-lg"
                      style={{
                        color: "#FFFFFF",
                      }}
                    />
                  </div>

                  {/* Qualification Title */}
                  <h4
                    className="font-semibold text-xs text-center line-clamp-2"
                    style={{
                      color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                    }}
                    title={qualification.title}
                  >
                    {qualification.title}
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

export default QualificationsSection;
