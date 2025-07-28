"use client";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

interface StatItem {
  icon: string;
  iconColor: string;
  value: string;
  label: string;
}

interface BaseStatsCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  fallbackInitials?: string;
  imageSize?: "sm" | "md" | "lg";
  imageBorderColor?: string;
  imageShape?: "circle" | "square";
  badge?: {
    text: string;
    color: string;
    icon?: string;
    position?: "top-right" | "bottom-right";
  };
  tags?: Array<{
    text: string;
    color: string;
    icon?: string;
  }>;
  description?: string;
  stats: StatItem[];
  className?: string;
}

function BaseStatsCard({
  title,
  subtitle,
  imageUrl,
  fallbackInitials,
  imageSize = "md",
  imageBorderColor = "#3B82F6",
  imageShape = "circle",
  badge,
  tags = [],
  description,
  stats,
  className = "",
}: BaseStatsCardProps) {
  const theme = useTheme();

  const imageSizeMap = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm flex flex-col h-full ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800/80 via-slate-800/70 to-gray-900/80 border-white/10 shadow-2xl"
          : "bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/70 border-blue-200/30 shadow-lg"
      } ${className}`}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Content Area - grows to push stats to bottom */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Image/Avatar */}
          <div className="relative">
            <div
              className={`${imageSizeMap[imageSize]} ${imageShape} overflow-hidden border-4 flex items-center justify-center`}
              style={{
                borderColor: imageBorderColor,
                borderRadius: imageShape === "circle" ? "9999px" : "1rem",
                backgroundColor: theme === "dark" ? "#2A2A2A" : "#F3F4F6",
              }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  width={imageSize === "lg" ? 96 : imageSize === "md" ? 80 : 64}
                  height={
                    imageSize === "lg" ? 96 : imageSize === "md" ? 80 : 64
                  }
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: imageBorderColor,
                  }}
                >
                  {fallbackInitials}
                </span>
              )}
            </div>

            {/* Badge */}
            {badge && (
              <div
                className={`absolute ${
                  badge.position === "bottom-right"
                    ? "-bottom-2 -right-2"
                    : "-top-2 -right-2"
                } ${
                  badge.icon ? "px-2 py-1" : "w-6 h-6"
                } rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg border-2`}
                style={{
                  backgroundColor: badge.color,
                  borderColor: theme === "dark" ? "#1A1A1A" : "#FFFFFF",
                }}
              >
                {badge.icon ? (
                  <>
                    <i className={`${badge.icon} mr-1`} />
                    {badge.text}
                  </>
                ) : (
                  badge.text
                )}
              </div>
            )}
          </div>

          {/* Title Area */}
          <div className="flex-1">
            <h2
              className="text-2xl font-bold mb-1"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#1F2937",
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className="text-sm font-medium"
                  style={{
                    color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                  }}
                >
                  {subtitle}
                </span>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="space-y-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white w-fit"
                    style={{
                      backgroundColor: tag.color,
                    }}
                  >
                    {tag.icon && <i className={`${tag.icon} mr-2 text-xs`} />}
                    {tag.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mb-6">
            <p
              className="text-sm leading-relaxed"
              style={{
                color: theme === "dark" ? "#A0A0A0" : "#6B7280",
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div
        className="pt-4 border-t"
        style={{
          borderColor: theme === "dark" ? "#2A2A2A" : "#E5E7EB",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center flex flex-col justify-center min-h-[80px]"
            >
              <div
                className="text-xl font-bold mb-1 flex items-center justify-center"
                style={{
                  color: theme === "dark" ? "#FFFFFF" : "#1F2937",
                }}
              >
                <i
                  className={`${stat.icon} text-lg mr-2`}
                  style={{ color: stat.iconColor }}
                />
                <span>{stat.value}</span>
              </div>
              <p
                className="text-sm"
                style={{
                  color: theme === "dark" ? "#A0A0A0" : "#6B7280",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BaseStatsCard;
