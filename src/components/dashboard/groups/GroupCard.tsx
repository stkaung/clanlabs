"use client";
import useTheme from "@/hooks/useTheme";

interface GroupData {
  id: string;
  name: string;
  abbreviation: string;
  permissionLevel: string;
  expiryDate: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "PENDING";
}

interface GroupCardProps {
  group: GroupData;
  onViewProfile: (groupId: string) => void;
  onSettings: (groupId: string) => void;
}

function GroupCard({ group, onViewProfile, onSettings }: GroupCardProps) {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "#22C55E";
      case "EXPIRED":
        return "#EF4444";
      case "PENDING":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800/80 via-slate-800/70 to-gray-900/80 border-white/10 shadow-2xl hover:shadow-blue-500/20"
          : "bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/70 border-blue-200/30 shadow-lg hover:shadow-blue-300/30"
      }`}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`text-xl font-bold bg-clip-text text-transparent ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-400 to-cyan-300"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                filter:
                  theme === "dark"
                    ? "drop-shadow(0 1px 2px rgba(59, 130, 246, 0.3))"
                    : "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
              }}
            >
              {group.abbreviation}
            </span>
            <span
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-blue-700/80"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow:
                  theme === "dark"
                    ? "0 1px 2px rgba(0,0,0,0.5)"
                    : "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {group.name}
            </span>
          </div>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-blue-600/70"
            }`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              textShadow:
                theme === "dark"
                  ? "0 1px 1px rgba(0,0,0,0.3)"
                  : "0 1px 1px rgba(0,0,0,0.1)",
            }}
          >
            Permission: {group.permissionLevel}
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border ${
            theme === "dark" ? "border-white/20" : "border-white/30"
          }`}
          style={{
            backgroundImage: `linear-gradient(135deg, ${getStatusColor(
              group.subscriptionStatus
            )}, ${getStatusColor(group.subscriptionStatus)}dd)`,
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          {group.subscriptionStatus}
        </div>
      </div>

      {/* Details */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-3">
            <i
              className="fas fa-calendar-alt"
              style={{
                backgroundImage:
                  theme === "dark"
                    ? "linear-gradient(135deg, #3B82F6, #06B6D4)"
                    : "linear-gradient(135deg, #1E40AF, #0EA5E9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 1px 1px rgba(59, 130, 246, 0.3))",
              }}
            />
            <span
              className={`${
                theme === "dark" ? "text-gray-300" : "text-blue-600/80"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow:
                  theme === "dark"
                    ? "0 1px 1px rgba(0,0,0,0.3)"
                    : "0 1px 1px rgba(0,0,0,0.1)",
              }}
            >
              Expires: {group.expiryDate}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onViewProfile(group.id)}
          className="flex-1 flex items-center justify-center space-x-3 py-3 px-6 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, #1E6FD9 0%, #0A2D5A 100%)",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            backdropFilter: "blur(8px)",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(255,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background =
              "linear-gradient(135deg, #0A2D5A 0%, #1E6FD9 100%)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background =
              "linear-gradient(135deg, #1E6FD9 0%, #0A2D5A 100%)";
          }}
        >
          <i className="fas fa-user text-xs" />
          <span>View Profile</span>
        </button>

        <button
          onClick={() => onSettings(group.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 backdrop-blur-sm border shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-700/80 to-gray-800/80 border-white/10"
              : "bg-gradient-to-br from-white/80 to-gray-50/80 border-blue-200/30"
          }`}
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <i
            className="fas fa-cog text-sm"
            style={{
              backgroundImage:
                theme === "dark"
                  ? "linear-gradient(135deg, #6B7280, #9CA3AF)"
                  : "linear-gradient(135deg, #4B5563, #6B7280)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default GroupCard;
