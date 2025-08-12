"use client";

import { useParams, usePathname } from "next/navigation";
import { groupManagement } from "@/data/mock";
import GroupManageSidebar from "@/components/dashboard/group-manage/GroupManageSidebar";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

export default function GroupManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const groupId = params.groupId as string;

  // Get group data
  const groupData = groupManagement[groupId];
  const groupName = groupData?.name || "Unknown Group";

  // Get current page name from pathname
  const getPageName = (path: string) => {
    const segments = path.split('/');
    
    // Handle analytics sub-pages
    if (segments.includes('analytics')) {
      const analyticsSegment = segments[segments.indexOf('analytics') + 1];
      if (analyticsSegment) {
        const analyticsPageMap: Record<string, string> = {
          'groups': 'Groups Analytics',
          'games': 'Games Analytics'
        };
        return analyticsPageMap[analyticsSegment] || 'Analytics';
      }
      return 'Analytics';
    }
    
    const lastSegment = segments[segments.length - 1];
    
    // Map route segments to display names
    const pageNameMap: Record<string, string> = {
      'home': 'Home',
      'members': 'Members',
      'ranks': 'Ranks',
      'medals': 'Medals',
      'qualifications': 'Qualifications',
      'blacklists': 'Blacklists',
      'permissions': 'Permissions',
      'audits': 'Audit Logs',
      'analytics': 'Analytics',
      'settings': 'Settings'
    };

    return pageNameMap[lastSegment] || 'Home';
  };

  const currentPageName = getPageName(pathname);
  const breadcrumb = [groupName, "Manage", currentPageName];
  const isAnalytics = pathname.includes('/analytics');

  return (
    <DashboardLayout 
      customSidebar={<GroupManageSidebar groupId={groupId} />}
      breadcrumb={breadcrumb}
      showBackButton={true}
      showSearch={true}
      onSearch={(query: string) => {
        try {
          const eventBase = currentPageName.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
          const eventName = `${eventBase}Search`;
          window.dispatchEvent(new CustomEvent(eventName, { detail: query } as CustomEventInit<string>));
        } catch (_) {
          // no-op
        }
      }}
      searchPlaceholder={
        (
          {
            Members: 'Search members...',
            Permissions: 'Search permissions...',
            'Audit Logs': 'Search audit logs...'
          } as Record<string, string>
        )[currentPageName] || 'Search...'
      }
    >
      <div className={isAnalytics ? "p-0" : "p-2"}>{children}</div>
    </DashboardLayout>
  );
}