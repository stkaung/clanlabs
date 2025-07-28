"use client";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  variant?: "default" | "positive" | "danger";
}

function SidebarDrawer({
  isOpen,
  onClose,
  activeItem = "groups",
}: SidebarDrawerProps) {
  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-chart-pie",
      href: "/dashboard",
    },
    {
      id: "groups",
      label: "Groups",
      icon: "fas fa-users",
      href: "/dashboard",
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: "fas fa-credit-card",
      href: "/dashboard/subscriptions",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "fas fa-cog",
      href: "/dashboard/settings",
    },
    {
      id: "verification",
      label: "Verification",
      icon: "fas fa-shield-check",
      href: "/dashboard/verification",
      variant: "positive",
    },
    {
      id: "logout",
      label: "Logout",
      icon: "fas fa-sign-out-alt",
      href: "#",
      variant: "danger",
    },
  ];

  function handleNavigation(item: NavigationItem): void {
    console.log(`Navigating to: ${item.label}`);
    if (item.id === "logout") {
      console.log("Logging out...");
    }
    // Close drawer on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  }

  function getItemClasses(item: NavigationItem): string {
    const baseClasses =
      "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-neutral-700";

    if (item.id === activeItem) {
      return `${baseClasses} bg-blue-500 text-white font-medium`;
    }

    if (item.variant === "positive") {
      return `${baseClasses} text-green-400 hover:bg-green-900/20`;
    }

    if (item.variant === "danger") {
      return `${baseClasses} text-red-400 hover:bg-red-900/20`;
    }

    return `${baseClasses} text-gray-300 hover:text-white`;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-neutral-800 rounded-r-2xl shadow-lg z-50 transition-transform duration-300 ease-in-out pt-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:z-auto`}
        style={{ width: "280px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className="text-white font-semibold text-lg">Menu</span>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle lg:hidden"
            aria-label="Close menu"
          >
            <i className="fas fa-times w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4">
          <ul className="menu p-0 space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={getItemClasses(item)}
                >
                  <i className={`${item.icon} w-5 h-5 flex-shrink-0`} />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-700">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center">
                <span className="text-sm font-medium text-white">S</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">shin</p>
              <p className="text-xs text-gray-400">Wondering_Dev</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarDrawer;
