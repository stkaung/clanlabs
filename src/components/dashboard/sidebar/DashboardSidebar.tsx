"use client";
import BaseSidebar from "./BaseSidebar";

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
  const navigationItems = [
    { name: "Groups", icon: "fas fa-users", active: true, href: "/groups" },
    {
      name: "Developer Panel",
      icon: "fas fa-code",
      active: false,
      href: "/dev-panel/bans",
    },
    { name: "Settings", icon: "fas fa-cog", active: false, href: "#" },
  ];

  return (
    <BaseSidebar
      collapsed={collapsed}
      onToggle={onToggle}
      isMobile={isMobile}
      mode="dashboard"
      title="Clan Labs"
      navigationItems={navigationItems}
    />
  );
}

export default DashboardSidebar;
