"use client";
import BaseSidebar from "./BaseSidebar";
import type { GroupListItem } from "@/types/group-profile";

interface GroupsSidebarProps {
  groups: GroupListItem[];
  currentGroupId: string;
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

function GroupsSidebar({
  groups,
  currentGroupId,
  collapsed,
  onToggle,
  isMobile = false,
}: GroupsSidebarProps) {
  return (
    <BaseSidebar
      collapsed={collapsed}
      onToggle={onToggle}
      isMobile={isMobile}
      mode="groups"
      title="Clan Labs"
      groups={groups}
      currentGroupId={currentGroupId}
    />
  );
}

export default GroupsSidebar;
