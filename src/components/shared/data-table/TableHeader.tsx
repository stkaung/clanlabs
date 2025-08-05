"use client";

import { Column } from "./types";
import useTheme from "@/hooks/useTheme";

interface TableHeaderProps<T = any> {
  columns: Column<T>[];
  hasActions?: boolean;
}

function TableHeader<T>({ columns, hasActions }: TableHeaderProps<T>) {
  const theme = useTheme();

  return (
    <div
      className={`relative z-[9999] mb-4 px-6 py-3 rounded-lg border transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800/50 border-gray-700/50"
          : "bg-gray-50/80 border-gray-200/50"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-center">
        {columns.map((column) => (
          <div
            key={column.key}
            className="flex items-center"
            style={{
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              textAlign: column.align || "left",
            }}
          >
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-semibold uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {typeof column.header === "function" ? column.header() : column.header}
              </span>
              {column.headerExtra && column.headerExtra()}
            </div>
          </div>
        ))}

        {hasActions && (
          <div
            className="flex items-center justify-center"
            style={{ width: "180px" }}
          >
            <span
              className={`text-sm font-semibold uppercase tracking-wider ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Actions
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableHeader;