"use client";
import { usePathname } from "next/navigation";
import BaseSidebar from "../sidebar/BaseSidebar";

interface GroupManageSidebarProps {
  groupId: string;
  collapsed?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export default function GroupManageSidebar({
  groupId,
  collapsed = false,
  onToggle = () => {},
  isMobile = false,
}: GroupManageSidebarProps) {
  const pathname = usePathname();
  const baseUrl = `/groups/${groupId}/manage`;

  const navigationItems = [
    { name: "Home", icon: "fas fa-home", active: pathname === `${baseUrl}/home`, href: `${baseUrl}/home` },
    { name: "Members", icon: "fas fa-users", active: pathname === `${baseUrl}/members`, href: `${baseUrl}/members` },
    { name: "Ranks", icon: "fas fa-layer-group", active: pathname === `${baseUrl}/ranks`, href: `${baseUrl}/ranks` },
    { name: "Medals", icon: "fas fa-medal", active: pathname === `${baseUrl}/medals`, href: `${baseUrl}/medals` },
    { name: "Qualifications", icon: "fas fa-certificate", active: pathname === `${baseUrl}/qualifications`, href: `${baseUrl}/qualifications` },
    { name: "Blacklists", icon: "fas fa-ban", active: pathname === `${baseUrl}/blacklists`, href: `${baseUrl}/blacklists` },
    { name: "Permissions", icon: "fas fa-shield-halved", active: pathname === `${baseUrl}/permissions`, href: `${baseUrl}/permissions` },
    { name: "Audits", icon: "fas fa-list-check", active: pathname === `${baseUrl}/audits`, href: `${baseUrl}/audits` },
    { 
      name: "Analytics", 
      icon: "fas fa-chart-line", 
      active: pathname.startsWith(`${baseUrl}/analytics`),
      href: "#",
      isDropdown: true,
      dropdownItems: [
        { name: "Groups", icon: "fas fa-users-rectangle", active: pathname === `${baseUrl}/analytics/groups`, href: `${baseUrl}/analytics/groups` },
        { name: "Games", icon: "fas fa-gamepad", active: pathname === `${baseUrl}/analytics/games`, href: `${baseUrl}/analytics/games` }
      ]
    },
    { name: "Settings", icon: "fas fa-gear", active: pathname === `${baseUrl}/settings`, href: `${baseUrl}/settings` }
  ];

  return (
    <div className="group-manage-sidebar">
      <style jsx global>{`
        .group-manage-sidebar .profile-section {
          margin-bottom: 0.5rem !important;
        }
        .group-manage-sidebar .profile-section > div {
          margin-bottom: 0.5rem !important;
        }
        .group-manage-sidebar .profile-section .avatar {
          width: 2rem !important;
          height: 2rem !important;
        }
        .group-manage-sidebar .profile-section .user-info {
          font-size: 0.75rem !important;
        }
        .group-manage-sidebar .profile-section .action-buttons {
          gap: 0.25rem !important;
        }
        .group-manage-sidebar .profile-section .action-buttons button {
          padding: 0.375rem 0.75rem !important;
          font-size: 0.75rem !important;
          border-radius: 0.5rem !important;
        }
        .group-manage-sidebar .profile-section .action-buttons i {
          font-size: 0.75rem !important;
        }
        /* Override font size for group management navigation items to keep them small */
        .group-manage-sidebar nav span {
          font-size: 0.75rem !important;
        }
      `}</style>
      <BaseSidebar
        collapsed={collapsed}
        onToggle={onToggle}
        isMobile={isMobile}
        mode="dashboard"
        title="Clan Labs"
        navigationItems={navigationItems}
      />
    </div>
  );
}