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

  function getStatusColor(status: Qualification["status"]): string {
    switch (status) {
      case "active":
        return "#22C55E";
      case "verified":
        return "#3B82F6";
      case "pending":
        return "#F59E0B";
      case "expired":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  }

  function getStatusIcon(status: Qualification["status"]): string {
    switch (status) {
      case "active":
        return "fas fa-check-circle";
      case "verified":
        return "fas fa-shield-check";
      case "pending":
        return "fas fa-clock";
      case "expired":
        return "fas fa-exclamation-triangle";
      default:
        return "fas fa-question-circle";
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function isExpiring(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
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
                {qualifications.length} credentials
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
          {qualifications.length === 0 ? (
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
            <div className="space-y-4">
              {qualifications.map((qualification, index) => (
                <div
                  key={qualification.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] transform ${
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                    borderColor: getStatusColor(qualification.status),
                    transitionDelay: isExpanded
                      ? `${index * 100}ms`
                      : `${(qualifications.length - index - 1) * 50}ms`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${getStatusColor(
                            qualification.status
                          )}20`,
                        }}
                      >
                        <i
                          className={`${getStatusIcon(
                            qualification.status
                          )} text-lg`}
                          style={{
                            color: getStatusColor(qualification.status),
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-semibold text-sm mb-1"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                          }}
                        >
                          {qualification.title}
                        </h4>
                        <p
                          className="text-xs mb-2"
                          style={{
                            color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                          }}
                        >
                          Issued by {qualification.issuer}
                        </p>
                        <p
                          className="text-xs mb-3 line-clamp-2"
                          style={{
                            color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                          }}
                        >
                          {qualification.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide"
                        style={{
                          backgroundColor: `${getStatusColor(
                            qualification.status
                          )}20`,
                          color: getStatusColor(qualification.status),
                        }}
                      >
                        {qualification.status}
                      </span>
                      {isExpiring(qualification.expiryDate) && (
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "#F59E0B20",
                            color: "#F59E0B",
                          }}
                        >
                          Expiring Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {qualification.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {qualification.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-md"
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#4B5563" : "#E5E7EB",
                            color: theme === "dark" ? "#D1D5DB" : "#374151",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dates and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <span
                        style={{
                          color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                        }}
                      >
                        Issued: {formatDate(qualification.issuedDate)}
                      </span>
                      {qualification.expiryDate && (
                        <span
                          style={{
                            color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                          }}
                        >
                          Expires: {formatDate(qualification.expiryDate)}
                        </span>
                      )}
                    </div>
                    {qualification.credentialUrl && (
                      <button
                        className="text-xs px-3 py-1 rounded-md transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: "#3B82F6",
                          color: "#FFFFFF",
                        }}
                        onClick={() =>
                          window.open(qualification.credentialUrl, "_blank")
                        }
                      >
                        View Credential
                      </button>
                    )}
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

export default QualificationsSection;
