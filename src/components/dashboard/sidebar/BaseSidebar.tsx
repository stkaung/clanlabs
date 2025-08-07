"use client";
import Image from "next/image";
import Link from "next/link";
import useTheme from "@/hooks/useTheme";
import type { GroupListItem } from "@/types/group-profile";

interface NavigationItem {
  name: string;
  icon: string;
  active: boolean;
  href?: string;
  disabled?: boolean;
  isDropdown?: boolean;
  dropdownItems?: NavigationItem[];
}

interface BaseSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  mode: "groups" | "dashboard";
  title: string;
  groups?: GroupListItem[];
  currentGroupId?: string;
  navigationItems?: NavigationItem[];
  username?: string;
  userSubtitle?: string;
}

function BaseSidebar({
  collapsed,
  onToggle,
  isMobile = false,
  mode = "dashboard",
  title,
  groups = [],
  currentGroupId = "",
  navigationItems = [],
  username = "shin",
  userSubtitle = "Wondering_Dev",
}: BaseSidebarProps) {
  const theme = useTheme();

  function handleVerification(): void {
    console.log("Verification clicked");
  }

  function handleLogout(): void {
    console.log("Logout clicked");
  }

  return (
    <>
      {/* Custom scrollbar styles for groups mode */}
      {mode === "groups" && (
        <style jsx>{`
          .groups-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: ${theme === "dark"
              ? "#6B7280 transparent"
              : "#9CA3AF transparent"};
          }
          .groups-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .groups-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .groups-scrollbar::-webkit-scrollbar-thumb {
            background: ${theme === "dark" ? "#6B7280" : "#9CA3AF"};
            border-radius: 3px;
          }
          .groups-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${theme === "dark" ? "#9CA3AF" : "#6B7280"};
          }
        `}</style>
      )}

      <aside
        className={`h-full ${
          isMobile ? "w-64" : collapsed ? "w-20" : "w-64"
        } backdrop-blur-xl border-r flex flex-col transition-all duration-300`}
        style={{
          backgroundColor:
            theme === "dark"
              ? "rgba(15, 23, 42, 0.85)"
              : "rgba(248, 250, 252, 0.85)",
          borderColor:
            theme === "dark"
              ? "rgba(59, 130, 246, 0.2)"
              : "rgba(30, 64, 175, 0.15)",
          boxShadow:
            theme === "dark"
              ? "4px 0 24px rgba(0, 0, 0, 0.15), inset -1px 0 0 rgba(59, 130, 246, 0.1)"
              : "2px 0 16px rgba(0, 0, 0, 0.06), inset -1px 0 0 rgba(255, 255, 255, 0.2)",
          height: "100vh",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(180deg, rgba(59, 130, 246, 0.02) 0%, rgba(124, 58, 237, 0.01) 50%, rgba(6, 182, 212, 0.02) 100%)"
                : "linear-gradient(180deg, rgba(59, 130, 246, 0.015) 0%, rgba(124, 58, 237, 0.01) 50%, rgba(6, 182, 212, 0.015) 100%)",
          }}
        />

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div
            className={`${
              collapsed ? "p-4" : "p-6"
            } border-b flex justify-center items-center shrink-0`}
            style={{
              borderColor:
                theme === "dark"
                  ? "rgba(59, 130, 246, 0.15)"
                  : "rgba(30, 64, 175, 0.1)",
              background:
                theme === "dark"
                  ? "rgba(30, 41, 59, 0.3)"
                  : "rgba(241, 245, 249, 0.5)",
            }}
          >
            <div
              className={`flex items-center ${
                collapsed && !isMobile ? "justify-center" : "space-x-3"
              }`}
            >
              <div
                className={`${
                  collapsed && !isMobile ? "w-10 h-10" : "w-8 h-8"
                } flex items-center justify-center`}
              >
                <Image
                  src="/img/logo/mainlogo.png"
                  alt="Clan Labs"
                  width={collapsed && !isMobile ? 40 : 32}
                  height={collapsed && !isMobile ? 40 : 32}
                  className="object-contain"
                  priority
                />
              </div>
              {(!collapsed || isMobile) && (
                <h2
                  className={`text-xl font-bold transition-all duration-300 whitespace-nowrap ${
                    collapsed && !isMobile
                      ? "opacity-0 transform translate-x-2 scale-95"
                      : "opacity-100 transform translate-x-0 scale-100"
                  }`}
                  style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
                >
                  {title}
                </h2>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <nav className="flex-1 p-4 overflow-y-auto">
              {mode === "groups" ? (
                // Groups List
                <div className="h-full overflow-y-auto space-y-2 pr-2 groups-scrollbar">
                  {groups.map((group) => (
                    <Link
                      key={group.id}
                      href={`/groups/${group.id}/profile`}
                      className={`flex items-center ${
                        collapsed && !isMobile ? "justify-center" : "space-x-3"
                      } ${
                        collapsed && !isMobile ? "p-4" : "py-2 px-3"
                      } rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                        group.id === currentGroupId ? "shadow-lg" : ""
                      }`}
                      style={{
                        backgroundColor:
                          group.id === currentGroupId
                            ? theme === "dark"
                              ? "rgba(59, 130, 246, 0.15)"
                              : "rgba(59, 130, 246, 0.1)"
                            : "transparent",
                        borderColor:
                          group.id === currentGroupId
                            ? theme === "dark"
                              ? "rgba(59, 130, 246, 0.3)"
                              : "rgba(59, 130, 246, 0.2)"
                            : "transparent",
                        color:
                          group.id === currentGroupId
                            ? theme === "dark"
                              ? "#DBEAFE"
                              : "#1E40AF"
                            : theme === "dark"
                            ? "#CBD5E1"
                            : "#64748B",
                        boxShadow:
                          group.id === currentGroupId
                            ? theme === "dark"
                              ? "0 4px 12px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(59, 130, 246, 0.2)"
                              : "0 4px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(59, 130, 246, 0.15)"
                            : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (group.id !== currentGroupId) {
                          e.currentTarget.style.backgroundColor =
                            theme === "dark"
                              ? "rgba(30, 41, 59, 0.4)"
                              : "rgba(241, 245, 249, 0.6)";
                          e.currentTarget.style.borderColor =
                            theme === "dark"
                              ? "rgba(59, 130, 246, 0.15)"
                              : "rgba(30, 64, 175, 0.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (group.id !== currentGroupId) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }
                      }}
                    >
                      {/* Group Logo */}
                      <div
                        className={`${
                          collapsed && !isMobile ? "w-8 h-8" : "w-6 h-6"
                        } flex items-center justify-center rounded-full overflow-hidden`}
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                        }}
                      >
                        {group.logo ? (
                          <Image
                            src={group.logo}
                            alt={group.name}
                            width={collapsed && !isMobile ? 32 : 24}
                            height={collapsed && !isMobile ? 32 : 24}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <span
                            className={`${
                              collapsed && !isMobile ? "text-sm" : "text-xs"
                            } font-bold`}
                            style={{
                              color:
                                group.id === currentGroupId
                                  ? "#FFFFFF"
                                  : theme === "dark"
                                  ? "#A0A0A0"
                                  : "#6B7280",
                            }}
                          >
                            {group.abbreviation}
                          </span>
                        )}
                      </div>

                      {/* Group Info */}
                      {(!collapsed || isMobile) && (
                        <div
                          className={`flex-1 transition-all duration-300 ${
                            collapsed && !isMobile
                              ? "opacity-0 transform translate-x-2 scale-95"
                              : "opacity-100 transform translate-x-0 scale-100"
                          }`}
                        >
                          <p className="font-medium text-sm whitespace-nowrap truncate">
                            {group.name}
                          </p>
                          <p className="text-xs opacity-75 whitespace-nowrap">
                            {group.role}
                          </p>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                // Standard Navigation Items
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const className = `flex items-center ${
                      collapsed && !isMobile ? "justify-center" : "space-x-3"
                    } ${
                      collapsed && !isMobile ? "p-4" : "py-2 px-3"
                    } rounded-xl transition-all duration-200 backdrop-blur-sm border ${
                      item.active ? "shadow-lg" : ""
                    } ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:scale-105"
                    }`;

                    const style = {
                      backgroundColor: item.active
                        ? theme === "dark"
                          ? "rgba(59, 130, 246, 0.15)"
                          : "rgba(59, 130, 246, 0.1)"
                        : "transparent",
                      borderColor: item.active
                        ? theme === "dark"
                          ? "rgba(59, 130, 246, 0.3)"
                          : "rgba(59, 130, 246, 0.2)"
                        : "transparent",
                      color: item.active
                        ? theme === "dark"
                          ? "#DBEAFE"
                          : "#1E40AF"
                        : theme === "dark"
                        ? "#FFFFFF"
                        : "#374151",
                    };

                    const content = (
                      <>
                        <i
                          className={item.icon}
                          style={{
                            fontSize:
                              collapsed && !isMobile ? "1.25rem" : "1rem",
                          }}
                        />
                        {(!collapsed || isMobile) && (
                          <span
                            className="font-medium whitespace-nowrap transition-all duration-300 text-xs"
                            style={{
                              transform:
                                collapsed && !isMobile
                                  ? "translateX(8px) scale(0.95)"
                                  : "translateX(0) scale(1)",
                              opacity: collapsed && !isMobile ? 0 : 1,
                            }}
                          >
                            {item.name}
                          </span>
                        )}
                      </>
                    );

                    if (item.isDropdown) {
                      return (
                        <div key={item.name} className="space-y-1">
                          <button
                            className={`${className} w-full`}
                            style={style}
                            onClick={() => {
                              // Toggle dropdown
                              const btn = document.getElementById(`dropdown-${item.name}`);
                              const icon = document.getElementById(`dropdown-icon-${item.name}`);
                              if (btn && icon) {
                                btn.classList.toggle("hidden");
                                icon.classList.toggle("rotate-180");
                              }
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <i className={`${item.icon} w-4 h-4`} />
                              {(!collapsed || isMobile) && (
                                <span className="font-medium whitespace-nowrap text-xs">{item.name}</span>
                              )}
                              <i id={`dropdown-icon-${item.name}`} className="fas fa-chevron-down text-[10px] transition-transform duration-200" />
                            </div>
                          </button>
                          <div id={`dropdown-${item.name}`} className="hidden pl-4 ml-2 border-l border-gray-800 space-y-1">
                            {item.dropdownItems?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href || "#"}
                                className={`flex items-center ${
                                  collapsed && !isMobile ? "justify-center" : "space-x-3"
                                } ${
                                  collapsed && !isMobile ? "p-4" : "p-3"
                                } rounded-xl transition-all duration-200 backdrop-blur-sm border ${
                                  subItem.active ? "shadow-lg" : ""
                                } cursor-pointer hover:scale-105`}
                                style={{
                                  backgroundColor: subItem.active
                                    ? theme === "dark"
                                      ? "rgba(59, 130, 246, 0.15)"
                                      : "rgba(59, 130, 246, 0.1)"
                                    : "transparent",
                                  borderColor: subItem.active
                                    ? theme === "dark"
                                      ? "rgba(59, 130, 246, 0.3)"
                                      : "rgba(59, 130, 246, 0.2)"
                                    : "transparent",
                                  color: subItem.active
                                    ? theme === "dark"
                                      ? "#DBEAFE"
                                      : "#1E40AF"
                                    : theme === "dark"
                                    ? "#FFFFFF"
                                    : "#374151",
                                }}
                              >
                                <i className={`${subItem.icon} w-4 h-4`} />
                                {(!collapsed || isMobile) && (
                                  <span className="font-medium whitespace-nowrap text-xs">
                                    {subItem.name}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    
                    return item.disabled ? (
                      <div key={item.name} className={className} style={style}>
                        {content}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href || "#"}
                        className={className}
                        style={style}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              )}
            </nav>
          </div>

          {/* Bottom Section - User Panel */}
          <div
            className="border-t shrink-0"
            style={{
              borderColor:
                theme === "dark"
                  ? "rgba(59, 130, 246, 0.15)"
                  : "rgba(30, 64, 175, 0.1)",
              backgroundColor:
                theme === "dark"
                  ? "rgba(30, 41, 59, 0.3)"
                  : "rgba(241, 245, 249, 0.5)",
            }}
          >
            <div className="p-3">
              {collapsed && !isMobile ? (
                <div className="flex flex-col items-center space-y-2">
                  {/* User Avatar - collapsed */}
                  <div
                                          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(30, 41, 59, 0.6)"
                          : "rgba(241, 245, 249, 0.8)",
                      borderColor:
                        theme === "dark"
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(30, 64, 175, 0.15)",
                      boxShadow:
                        theme === "dark"
                          ? "0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(59, 130, 246, 0.1)"
                          : "0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <i
                      className="fas fa-user text-lg"
                      style={{
                        color: theme === "dark" ? "#CBD5E1" : "#64748B",
                      }}
                    />
                  </div>

                  {/* Action Buttons - collapsed */}
                  <button
                    onClick={handleVerification}
                                          className="w-12 h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-150 hover:scale-105 backdrop-blur-sm border hover:!bg-green-500 hover:!text-white"
                    style={{
                      background:
                        theme === "dark"
                          ? "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.1))"
                          : "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
                      color: "#22C55E",
                      borderColor: "rgba(34, 197, 94, 0.3)",
                      boxShadow: "0 2px 8px rgba(34, 197, 94, 0.15)",
                    }}
                    title="Verification"
                  >
                    <i className="fas fa-shield-check text-sm" />
                  </button>

                  <button
                    onClick={handleLogout}
                                          className="w-12 h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-150 hover:scale-105 backdrop-blur-sm border hover:!bg-red-500 hover:!text-white"
                    style={{
                      background:
                        theme === "dark"
                          ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.1))"
                          : "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))",
                      color: "#EF4444",
                      borderColor: "rgba(239, 68, 68, 0.3)",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
                    }}
                    title="Logout"
                  >
                    <i className="fas fa-sign-out-alt text-sm" />
                  </button>

                  {/* Collapse Toggle */}
                  <button
                    onClick={onToggle}
                                          className="w-12 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(30, 41, 59, 0.4)"
                          : "rgba(241, 245, 249, 0.6)",
                      color: theme === "dark" ? "#CBD5E1" : "#64748B",
                      borderColor:
                        theme === "dark"
                          ? "rgba(59, 130, 246, 0.15)"
                          : "rgba(30, 64, 175, 0.1)",
                    }}
                  >
                    <i className="fas fa-chevron-right text-sm" />
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(30, 41, 59, 0.6)"
                            : "rgba(241, 245, 249, 0.8)",
                        borderColor:
                          theme === "dark"
                            ? "rgba(59, 130, 246, 0.2)"
                            : "rgba(30, 64, 175, 0.15)",
                        boxShadow:
                          theme === "dark"
                            ? "0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(59, 130, 246, 0.1)"
                            : "0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <i
                        className="fas fa-user text-sm"
                        style={{
                          color: theme === "dark" ? "#CBD5E1" : "#64748B",
                        }}
                      />
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        collapsed && !isMobile
                          ? "opacity-0 transform translate-x-2 scale-95"
                          : "opacity-100 transform translate-x-0 scale-100"
                      }`}
                    >
                      <p
                        className="font-semibold text-sm whitespace-nowrap"
                        style={{
                          color: theme === "dark" ? "#F1F5F9" : "#1E293B",
                        }}
                      >
                        {username}
                      </p>
                      <p
                        className="text-xs whitespace-nowrap"
                        style={{
                          color: theme === "dark" ? "#CBD5E1" : "#64748B",
                        }}
                      >
                        {userSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-1.5">
                    <button
                      onClick={handleVerification}
                      className="w-full flex items-center justify-center space-x-2 py-1.5 px-4 rounded-xl font-medium text-sm transition-all duration-150 hover:scale-105 backdrop-blur-sm border hover:!bg-green-500 hover:!text-white"
                      style={{
                        background:
                          theme === "dark"
                            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.1))"
                            : "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
                        color: "#22C55E",
                        borderColor: "rgba(34, 197, 94, 0.3)",
                        boxShadow: "0 2px 8px rgba(34, 197, 94, 0.15)",
                      }}
                    >
                      <i className="fas fa-shield-check text-xs" />
                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${
                          collapsed && !isMobile
                            ? "opacity-0 transform translate-x-2 scale-95 w-0"
                            : "opacity-100 transform translate-x-0 scale-100"
                        }`}
                      >
                        Verification
                      </span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl font-medium text-sm transition-all duration-150 hover:scale-105 backdrop-blur-sm border hover:!bg-red-500 hover:!text-white"
                      style={{
                        background:
                          theme === "dark"
                            ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.1))"
                            : "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))",
                        color: "#EF4444",
                        borderColor: "rgba(239, 68, 68, 0.3)",
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
                      }}
                    >
                      <i className="fas fa-sign-out-alt text-xs" />
                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${
                          collapsed && !isMobile
                            ? "opacity-0 transform translate-x-2 scale-95 w-0"
                            : "opacity-100 transform translate-x-0 scale-100"
                        }`}
                      >
                        Logout
                      </span>
                    </button>

                    {/* Collapse Toggle for expanded view */}
                    <button
                      onClick={onToggle}
                      className="w-full flex items-center justify-center py-2 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 backdrop-blur-sm border"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(30, 41, 59, 0.4)"
                            : "rgba(241, 245, 249, 0.6)",
                        color: theme === "dark" ? "#CBD5E1" : "#64748B",
                        borderColor:
                          theme === "dark"
                            ? "rgba(59, 130, 246, 0.15)"
                            : "rgba(30, 64, 175, 0.1)",
                      }}
                    >
                      <i className="fas fa-chevron-left text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default BaseSidebar;
