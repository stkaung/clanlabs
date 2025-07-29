"use client";
import { useRouter, usePathname } from "next/navigation";
import BaseSidebar from "./BaseSidebar";

interface DeveloperSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

function DeveloperSidebar({
  collapsed,
  onToggle,
  isMobile = false,
}: DeveloperSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Servers",
      icon: "fas fa-server",
      active: pathname.startsWith("/dev-panel/servers"),
      href: "/dev-panel/servers",
      disabled: true, // As requested by user
    },
    {
      name: "Bot Accounts",
      icon: "fas fa-robot",
      active: pathname.startsWith("/dev-panel/bot-accounts"),
      href: "/dev-panel/bot-accounts",
    },
    {
      name: "Ban List",
      icon: "fas fa-ban",
      active: pathname.startsWith("/dev-panel/ban-list"),
      href: "/dev-panel/ban-list",
    },
    {
      name: "Clans",
      icon: "fas fa-shield-alt",
      active: pathname.startsWith("/dev-panel/clans"),
      href: "/dev-panel/clans",
    },
    {
      name: "Serial Keys",
      icon: "fas fa-key",
      active: pathname.startsWith("/dev-panel/serial-keys"),
      href: "/dev-panel/serial-keys",
    },
  ];

  function handleToggle(): void {
    onToggle();
  }

  return (
    <BaseSidebar
      collapsed={collapsed}
      onToggle={handleToggle}
      isMobile={isMobile}
      mode="dashboard"
      title="Clan Labs"
      navigationItems={navigationItems}
      username="shin"
      userSubtitle="Wondering_Dev"
    />
  );
}

export default DeveloperSidebar;
