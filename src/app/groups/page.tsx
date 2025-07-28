"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import GroupsGrid from "@/components/dashboard/groups/GroupsGrid";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Groups Section */}
        <GroupsGrid searchQuery="" />
      </div>
    </DashboardLayout>
  );
}
