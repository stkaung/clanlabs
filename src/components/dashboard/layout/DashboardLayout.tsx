"use client";
import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import useTheme from "@/hooks/useTheme";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";
import TopNavBar from "@/components/dashboard/layout/TopNavBar";
import SetupGroupModal from "@/components/dashboard/groups/SetupGroupModal";

// Create context for setup modal
interface DashboardContextType {
  openSetupModal: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardLayout");
  }
  return context;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const wasMobile = isMobile;

      setIsMobile(mobile);

      // Auto-collapse sidebar when switching to mobile
      if (mobile && !wasMobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile, sidebarCollapsed]);

  function openSetupModal(): void {
    setIsSetupModalOpen(true);
  }

  const contextValue: DashboardContextType = {
    openSetupModal,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div
        className="min-h-screen transition-all duration-500 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        }}
      >
        {/* Main content container */}
        <div className="flex min-h-screen">
          {/* Mobile Overlay */}
          {isMobile && !sidebarCollapsed && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={() => setSidebarCollapsed(true)}
              onTouchEnd={() => setSidebarCollapsed(true)}
            />
          )}

          {/* Sidebar Container */}
          <div className="relative">
            <div
              className={`${
                isMobile
                  ? `fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
                      sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
                    }`
                  : "relative"
              }`}
            >
              <DashboardSidebar
                collapsed={!isMobile && sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">
            {/* Top Navigation Bar - Hidden when sidebar is open on mobile */}
            {!(isMobile && !sidebarCollapsed) && (
              <TopNavBar
                onDrawerToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                breadcrumb={["Dashboard", "Groups"]}
              />
            )}

            {/* Page content with max-width container */}
            <div
              className={`flex-1 px-6 ${
                !(isMobile && !sidebarCollapsed) ? "py-8" : "py-4"
              }`}
            >
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>

            {/* Footer */}
            <footer className="py-6 text-center">
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                2025 © Software Ventures Pty Ltd. All rights reserved.
              </p>
            </footer>
          </main>
        </div>

        {/* Setup Group Modal */}
        <SetupGroupModal
          isOpen={isSetupModalOpen}
          onClose={() => setIsSetupModalOpen(false)}
        />
      </div>
    </DashboardContext.Provider>
  );
}

export default DashboardLayout;
