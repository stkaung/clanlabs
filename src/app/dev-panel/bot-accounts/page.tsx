"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import BotAccountsGrid from "@/components/dashboard/developer/BotAccountsGrid";

export default function BotAccountsPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function handleSearch(query: string): void {
    setSearchQuery(query);
  }

  return (
    <DashboardLayout
      breadcrumb={["Dashboard", "Developer Panel", "Bot Accounts"]}
      showSearch={true}
      onSearch={handleSearch}
      searchPlaceholder="Search bot accounts..."
      showBackButton={true}
      isDeveloperPanel={true}
    >
      <div
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Bot Accounts Section */}
        <BotAccountsGrid searchQuery={searchQuery} />
      </div>
    </DashboardLayout>
  );
}
