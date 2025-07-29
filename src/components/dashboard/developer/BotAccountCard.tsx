"use client";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

interface BotAccountData {
  id: string;
  name: string;
  avatar: string;
  groupCount: number;
  isDefault: boolean;
  isDevelopment: boolean;
}

interface BotAccountCardProps {
  botAccount: BotAccountData;
  onUpdate: (botId: string) => void;
  onDelete: (botId: string) => void;
}

function BotAccountCard({
  botAccount,
  onUpdate,
  onDelete,
}: BotAccountCardProps) {
  const theme = useTheme();

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800/90 via-gray-800/80 to-gray-900/90 border-white/10 hover:border-purple-500/30"
          : "bg-gradient-to-r from-white/95 via-white/90 to-purple-50/95 border-purple-200/30 hover:border-purple-400/40"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(139, 92, 246, 0.1) inset"
            : "0 4px 20px rgba(139, 92, 246, 0.1), 0 1px 0 rgba(255, 255, 255, 0.8) inset",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.03) 50%, rgba(139, 92, 246, 0.05) 100%)"
              : "linear-gradient(90deg, rgba(139, 92, 246, 0.03) 0%, rgba(124, 58, 237, 0.02) 50%, rgba(139, 92, 246, 0.03) 100%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6">
        {/* Left Section: Avatar & Bot Info */}
        <div className="flex items-center space-x-4 min-w-0 md:w-[280px]">
          {/* Avatar without Status */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-110 ${
                theme === "dark"
                  ? "border-purple-400/40"
                  : "border-purple-300/60"
              }`}
            >
              <Image
                src={botAccount.avatar || "/img/misc/default-avatar.svg"}
                alt={`${botAccount.name} avatar`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/img/misc/default-avatar.svg";
                }}
              />
            </div>
          </div>

          {/* Bot Identity */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-1">
              <h3
                className={`text-lg font-bold truncate ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  textShadow:
                    theme === "dark"
                      ? "0 1px 2px rgba(0,0,0,0.5)"
                      : "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {botAccount.name}
              </h3>
              <i
                className="fas fa-robot text-sm opacity-80 md:ml-0"
                style={{
                  color: theme === "dark" ? "#A78BFA" : "#8B5CF6",
                }}
              />
            </div>
          </div>
        </div>

        {/* Center Section: Stats Dashboard - matches header layout exactly */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-8 min-w-0">
          {/* Groups Count - matches header width */}
          <div className="text-center" style={{ width: "80px" }}>
            <div
              className={`text-2xl font-bold mb-1 ${
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow: "0 1px 2px rgba(139, 92, 246, 0.3)",
              }}
            >
              {botAccount.groupCount}
            </div>
            <div
              className={`text-xs font-medium uppercase tracking-wider ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Groups
            </div>
          </div>

          {/* Feature Badges - matches header width */}
          <div className="flex flex-col space-y-2" style={{ width: "120px" }}>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 text-center ${
                botAccount.isDefault
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-200 text-gray-500"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <i className="fas fa-star mr-1" />
              Default
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 text-center ${
                botAccount.isDevelopment
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-200 text-gray-500"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <i className="fas fa-code mr-1" />
              {botAccount.isDevelopment ? "Dev Mode" : "Production"}
            </div>
          </div>
        </div>

        {/* Right Section: Action Controls - matches header width exactly */}
        <div
          className="flex flex-col md:flex-row items-center md:justify-center space-y-2 md:space-y-0 md:space-x-3"
          style={{ width: "200px" }}
        >
          {/* Update Button */}
          <button
            onClick={() => onUpdate(botAccount.id)}
            className="group/btn relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)";
            }}
          >
            <i className="fas fa-edit mr-2" />
            Update
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(botAccount.id)}
            className={`relative overflow-hidden p-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg ${
              theme === "dark"
                ? "bg-red-600/20 hover:bg-red-600/30 border border-red-500/30"
                : "bg-red-50 hover:bg-red-100 border border-red-200"
            }`}
            style={{
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.2)",
            }}
          >
            <i
              className="fas fa-trash text-sm"
              style={{
                color: theme === "dark" ? "#F87171" : "#DC2626",
              }}
            />
          </button>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
        }}
      />
    </div>
  );
}

export default BotAccountCard;
