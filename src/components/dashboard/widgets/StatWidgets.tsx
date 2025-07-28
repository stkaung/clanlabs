"use client";
import useTheme from "@/hooks/useTheme";

interface StatData {
  id: string;
  label: string;
  value: number;
  icon: string;
  iconColor: string;
  bgColor: string;
}

interface StatWidgetsProps {
  className?: string;
}

function StatWidgets({ className = "" }: StatWidgetsProps) {
  const theme = useTheme();
  const stats: StatData[] = [
    {
      id: "total-groups",
      label: "Total Groups",
      value: 3,
      icon: "fas fa-users",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "active-subs",
      label: "Active Subscriptions",
      value: 3,
      icon: "fas fa-briefcase",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      id: "expiring-soon",
      label: "Expiring Soon",
      value: 2,
      icon: "fas fa-clock",
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  function handleStatClick(statId: string): void {
    console.log(`Stat clicked: ${statId}`);
  }

  return (
    <div className={className}>
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <h3
            className="text-xl font-bold text-teal-400"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Statistics Overview
          </h3>
          <div
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              theme === "dark"
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            <i className="fas fa-chart-line mr-1" />
            Live Data
          </div>
        </div>
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Real-time insights into your list of clans
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] backdrop-blur-sm overflow-hidden ${
              theme === "dark"
                ? "bg-gradient-to-r from-slate-800/90 via-gray-800/90 to-slate-900/90 border-slate-600/30 hover:border-emerald-500/30 shadow-lg hover:shadow-emerald-500/10"
                : "bg-gradient-to-r from-white/95 via-slate-50/90 to-gray-100/95 border-gray-200/50 hover:border-emerald-400/50 shadow-md hover:shadow-emerald-200/20"
            }`}
            style={{
              backdropFilter: "blur(8px)",
            }}
            onClick={() => handleStatClick(stat.id)}
          >
            {/* Background Pattern */}
            <div
              className={`absolute inset-0 opacity-5 ${
                theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"
              }`}
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* Content */}
            <div className="relative flex items-center space-x-4">
              {/* Icon Section */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/20"
                    : "bg-gradient-to-br from-emerald-100 to-cyan-100 border border-emerald-300/30"
                }`}
              >
                <i
                  className={`${stat.icon} text-xl`}
                  style={{
                    backgroundImage:
                      theme === "dark"
                        ? "linear-gradient(135deg, #10B981, #06B6D4)"
                        : "linear-gradient(135deg, #059669, #0891B2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 1px 1px rgba(16, 185, 129, 0.3))",
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <p
                  className={`text-xs font-medium mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    backgroundImage:
                      theme === "dark"
                        ? "linear-gradient(135deg, #FFFFFF, #E5E7EB)"
                        : "linear-gradient(135deg, #1F2937, #374151)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow:
                      theme === "dark"
                        ? "0 1px 2px rgba(255,255,255,0.1)"
                        : "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <i
                    className="fas fa-arrow-up mr-2"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #22C55E, #10B981)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 1px 1px rgba(34, 197, 94, 0.3))",
                    }}
                  />
                  <span
                    className={`text-xs font-medium ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    +12.5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatWidgets;
