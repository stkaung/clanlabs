"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DevPanelPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to bot-accounts as the default dev panel page
    router.replace("/dev-panel/bot-accounts");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Redirecting to Developer Panel...
        </p>
      </div>
    </div>
  );
}
