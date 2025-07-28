"use client";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import type { AuditLogsProps, AuditLogEntry } from "@/types/profile-sections";

function AuditLogsSection({ auditLogs, className = "" }: AuditLogsProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function getTypeColor(type: AuditLogEntry["type"]): string {
    switch (type) {
      case "success":
        return "#22C55E";
      case "warning":
        return "#F59E0B";
      case "error":
        return "#EF4444";
      case "info":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  }

  function getTypeIcon(type: AuditLogEntry["type"]): string {
    switch (type) {
      case "success":
        return "fas fa-check-circle";
      case "warning":
        return "fas fa-exclamation-triangle";
      case "error":
        return "fas fa-times-circle";
      case "info":
        return "fas fa-info-circle";
      default:
        return "fas fa-circle";
    }
  }

  function formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatFullTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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
                backgroundColor: "#A855F7",
              }}
            >
              <i className="fas fa-history text-white text-lg" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                }}
              >
                Audit Logs
              </h3>
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                {auditLogs.length} recent activities
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
      {isExpanded && (
        <div className="p-6 animate-in slide-in-from-top-2 duration-500">
          <style jsx>{`
            .audit-scroll {
              scrollbar-width: thin;
              scrollbar-color: ${theme === "dark"
                ? "#6B7280 transparent"
                : "#9CA3AF transparent"};
            }
            .audit-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .audit-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .audit-scroll::-webkit-scrollbar-thumb {
              background: ${theme === "dark" ? "#6B7280" : "#9CA3AF"};
              border-radius: 3px;
            }
            .audit-scroll::-webkit-scrollbar-thumb:hover {
              background: ${theme === "dark" ? "#9CA3AF" : "#6B7280"};
            }
          `}</style>
          {auditLogs.length === 0 ? (
            <div className="text-center py-8">
              <i
                className="fas fa-history text-4xl mb-3"
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
                No audit logs available
              </p>
            </div>
          ) : (
            <div
              className="audit-scroll space-y-3 max-h-80 overflow-y-scroll overscroll-contain"
              style={{
                touchAction: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {auditLogs.map((log, index) => (
                <div
                  key={log.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-[1.01] transform ${
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                    transitionDelay: isExpanded
                      ? `${index * 100}ms`
                      : `${(auditLogs.length - index - 1) * 50}ms`,
                  }}
                >
                  {/* Type Icon */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${getTypeColor(log.type)}20`,
                    }}
                  >
                    <i
                      className={`${getTypeIcon(log.type)} text-sm`}
                      style={{ color: getTypeColor(log.type) }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4
                        className="font-medium text-sm"
                        style={{
                          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                        }}
                      >
                        {log.action}
                      </h4>
                      <span
                        className="text-xs flex-shrink-0 ml-2"
                        style={{
                          color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                        }}
                        title={formatFullTimestamp(log.timestamp)}
                      >
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>

                    <p
                      className="text-xs mb-2"
                      style={{
                        color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                      }}
                    >
                      {log.description}
                    </p>

                    {/* Performed By */}
                    {log.performedBy && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className="text-xs"
                          style={{
                            color: theme === "dark" ? "#6B7280" : "#9CA3AF",
                          }}
                        >
                          by
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: theme === "dark" ? "#D1D5DB" : "#374151",
                          }}
                        >
                          {log.performedBy.name}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#4B5563" : "#E5E7EB",
                            color: theme === "dark" ? "#D1D5DB" : "#374151",
                          }}
                        >
                          {log.performedBy.role}
                        </span>
                      </div>
                    )}

                    {/* Details */}
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div
                        className="text-xs p-2 rounded-md mt-2"
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#374151" : "#F9FAFB",
                          border: `1px solid ${
                            theme === "dark" ? "#4B5563" : "#E5E7EB"
                          }`,
                        }}
                      >
                        <details className="cursor-pointer">
                          <summary
                            className="font-medium"
                            style={{
                              color: theme === "dark" ? "#D1D5DB" : "#374151",
                            }}
                          >
                            View Details
                          </summary>
                          <div className="mt-2 space-y-1">
                            {Object.entries(log.details).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center space-x-2"
                              >
                                <span
                                  className="font-medium"
                                  style={{
                                    color:
                                      theme === "dark" ? "#9CA3AF" : "#6B7280",
                                  }}
                                >
                                  {key}:
                                </span>
                                <span
                                  style={{
                                    color:
                                      theme === "dark" ? "#D1D5DB" : "#374151",
                                  }}
                                >
                                  {String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>

                  {/* Timeline connector */}
                  {index < auditLogs.length - 1 && (
                    <div
                      className="absolute left-9 mt-8 w-0.5 h-6"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#4B5563" : "#E5E7EB",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AuditLogsSection;
