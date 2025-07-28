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
  openRenewalModal: (groupName: string) => void;
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
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState<boolean>(false);
  const [renewalGroupName, setRenewalGroupName] = useState<string>("");

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

  function openRenewalModal(groupName: string): void {
    setRenewalGroupName(groupName);
    setIsRenewalModalOpen(true);
  }

  const contextValue: DashboardContextType = {
    openSetupModal,
    openRenewalModal,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div
        className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
          isSetupModalOpen ? "blur-sm" : ""
        }`}
        style={{
          backgroundColor: theme === "dark" ? "#0F0F0F" : "#F8FAFC",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        }}
      >
        {/* Main content container */}
        <div className="flex min-h-screen">
          {/* Mobile Overlay - positioned above navbar but below sidebar */}
          {isMobile && !sidebarCollapsed && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
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
            {/* Top Navigation Bar - Always visible */}
            <div className="relative z-20">
              <TopNavBar
                onDrawerToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                breadcrumb={["Dashboard", "Groups"]}
                sidebarCollapsed={!isMobile && sidebarCollapsed}
              />
            </div>

            {/* Page content with max-width container */}
            <div
              className={`flex-1 relative overflow-hidden pt-12`}
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #0F0F23 0%, #1A1A3A 50%, #0F0F23 100%)"
                    : "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 50%, #EBF4FF 100%)",
              }}
            >
              {/* Flowing background waves - same as hero section */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1200 800"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="dashboardGradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={theme === "dark" ? "#1e40af" : "#3b82f6"}
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="100%"
                        stopColor={theme === "dark" ? "#7c3aed" : "#a855f7"}
                        stopOpacity="0.5"
                      />
                    </linearGradient>
                    <linearGradient
                      id="dashboardGradient2"
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={theme === "dark" ? "#06b6d4" : "#06b6d4"}
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,400 Q400,200 800,400 T1200,400 L1200,800 L0,800 Z"
                    fill="url(#dashboardGradient1)"
                  />
                  <path
                    d="M0,600 Q600,500 1200,600 L1200,800 L0,800 Z"
                    fill="url(#dashboardGradient2)"
                    className="animate-pulse"
                    style={{ animationDelay: "2s" }}
                  />
                </svg>
              </div>

              {/* Content Container - positioned above background layers */}
              <div className="relative z-10 max-w-7xl mx-auto px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Setup Group Modal - Outside main container to avoid blur */}
      <SetupGroupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      {/* Renewal Modal - Same level as setup modal */}
      <SetupGroupModal
        isOpen={isRenewalModalOpen}
        onClose={() => setIsRenewalModalOpen(false)}
        mode="renewal"
        groupName={renewalGroupName}
      />
    </DashboardContext.Provider>
  );
}

export default DashboardLayout;
