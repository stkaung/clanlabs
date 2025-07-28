"use client";
import useTheme from "@/hooks/useTheme";

function DashboardHeader() {
  const theme = useTheme();

  return (
    <header
      className={`h-16 border-b transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h1
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* User profile and actions will be populated from redesign.md */}
          <div
            className={`w-8 h-8 rounded-full ${
              theme === "dark" ? "bg-slate-600" : "bg-gray-300"
            } flex items-center justify-center cursor-pointer`}
          >
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              U
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
