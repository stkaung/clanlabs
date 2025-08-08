"use client";

import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

// Map route segments to display names
const routeDisplayNames: Record<string, string> = {
  bans: "Bans",
  "serial-keys": "Serial Keys",
  clans: "Clans",
  servers: "Servers",
};

export default function DevPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Get the current section from the pathname
  const section = pathname.split("/").pop();
  const sectionName = section ? routeDisplayNames[section] || section : "";
  const showSearch = section !== "serial-keys";

  return (
    <DashboardLayout
      isDeveloperPanel={true}
      breadcrumb={["Developer Panel", sectionName]}
      showBackButton={true}
      showSearch={showSearch}
      searchPlaceholder={showSearch ? `Search ${sectionName.toLowerCase()}...` : undefined}
      onSearch={(query) => {
        if (!showSearch) return;
        try {
          // Update URL params
          const url = new URL(window.location.href);
          if (query) {
            url.searchParams.set("search", query);
          } else {
            url.searchParams.delete("search");
          }
          window.history.pushState({}, "", url);

          // Dispatch the appropriate event based on the current section
          const eventName = section ? `${section}Search` : "";
          if (eventName) {
            window.dispatchEvent(new CustomEvent(eventName, { detail: query }));
          }
        } catch {}
      }}
    >
      {children}
    </DashboardLayout>
  );
}