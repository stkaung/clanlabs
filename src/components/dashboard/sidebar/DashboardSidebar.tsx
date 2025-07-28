"use client";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

function DashboardSidebar({
  collapsed,
  onToggle,
  isMobile = false,
}: DashboardSidebarProps) {
  const theme = useTheme();

  const navigationItems = [
    { name: "Groups", icon: "fas fa-users", active: true },
    { name: "Developer Panel", icon: "fas fa-code", active: false },
    { name: "Settings", icon: "fas fa-cog", active: false },
  ];

  function handleVerification(): void {
    console.log("Verification clicked");
  }

  function handleLogout(): void {
    console.log("Logout clicked");
  }

  return (
    <aside
      className={`${
        isMobile ? "w-64" : collapsed ? "w-20" : "w-64"
      } min-h-screen transition-all duration-300 border-r flex flex-col`}
      style={{
        backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
        borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
      }}
    >
      {/* Logo Section */}
      <div
        className={`${
          collapsed ? "p-4" : "p-6"
        } border-b flex justify-center items-center`}
        style={{ borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB" }}
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
              Clan Labs
            </h2>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-grow">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center ${
                collapsed && !isMobile ? "justify-center" : "space-x-3"
              } ${
                collapsed && !isMobile ? "p-4" : "p-3"
              } rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                item.active ? "shadow-lg" : ""
              }`}
              style={{
                backgroundColor: item.active
                  ? "#3B82F6"
                  : theme === "dark"
                  ? "transparent"
                  : "transparent",
                color: item.active
                  ? "#FFFFFF"
                  : theme === "dark"
                  ? "#A0A0A0"
                  : "#6B7280",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor =
                    theme === "dark" ? "#2A2A2A" : "#F3F4F6";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <i
                className={`${item.icon} ${
                  collapsed && !isMobile ? "text-lg" : "text-sm"
                }`}
              />
              {(!collapsed || isMobile) && (
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-300 ${
                    collapsed && !isMobile
                      ? "opacity-0 transform translate-x-2 scale-95"
                      : "opacity-100 transform translate-x-0 scale-100"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section - User Panel + Copyright */}
      <div className="mt-auto">
        {/* User Panel */}
        <div
          className="p-4 border-t"
          style={{ borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB" }}
        >
          {collapsed && !isMobile ? (
            <div className="flex flex-col items-center space-y-3">
              {/* User Avatar - collapsed */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                }}
              >
                <i
                  className="fas fa-user text-lg"
                  style={{ color: theme === "dark" ? "#A0A0A0" : "#6B7280" }}
                />
              </div>

              {/* Action Buttons - collapsed */}
              <button
                onClick={handleVerification}
                className="w-12 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
                title="Verification"
              >
                <i className="fas fa-shield-check text-sm" />
              </button>

              <button
                onClick={handleLogout}
                className="w-12 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
                title="Logout"
              >
                <i className="fas fa-sign-out-alt text-sm" />
              </button>

              {/* Collapse Toggle */}
              <button
                onClick={onToggle}
                className="w-12 h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                  }}
                >
                  <i
                    className="fas fa-user text-sm"
                    style={{
                      color: theme === "dark" ? "#A0A0A0" : "#6B7280",
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
                      color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                    }}
                  >
                    shin
                  </p>
                  <p
                    className="text-xs whitespace-nowrap"
                    style={{
                      color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                    }}
                  >
                    Wondering_Dev
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleVerification}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
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
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
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
                  className="w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
                    color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                  }}
                >
                  <i className="fas fa-chevron-left text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
