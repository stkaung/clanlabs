"use client";

import { Column, Action } from "./types";
import useTheme from "@/hooks/useTheme";

interface TableRowProps<T = any> {
  row: T;
  columns: Column<T>[];
  actions?: Action<T>[];
  isEven: boolean;
  actionButtonClassName?: string;
  actionsAlign?: 'left' | 'center' | 'right';
  actionContainerWidth?: string;
}

function TableRow<T>({ row, columns, actions, isEven, actionButtonClassName, actionsAlign = 'right', actionContainerWidth = '180px' }: TableRowProps<T>) {
  const theme = useTheme();
  const justifyClass = actionsAlign === 'center' ? 'justify-center' : actionsAlign === 'left' ? 'justify-start' : 'justify-end';

  return (
    <div
      className={`group relative z-0 overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
        theme === "dark"
          ? `${
              isEven
                ? "bg-gradient-to-r from-gray-800/90 via-gray-800/80 to-gray-900/90"
                : "bg-gradient-to-r from-gray-800/80 via-gray-800/70 to-gray-900/80"
            } border-white/10 hover:border-blue-500/30`
          : `${
              isEven
                ? "bg-gradient-to-r from-white/95 via-white/90 to-blue-50/95"
                : "bg-gradient-to-r from-white/90 via-white/85 to-blue-50/90"
            } border-blue-200/30 hover:border-blue-400/40`
      }`}
      style={{
        backdropFilter: "blur(16px)",
        boxShadow:
          theme === "dark"
            ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(59, 130, 246, 0.1) inset"
            : "0 4px 20px rgba(59, 130, 246, 0.1), 0 1px 0 rgba(255, 255, 255, 0.8) inset",
      }}
    >
      <div className="relative flex items-center p-4 md:p-6 space-x-4">
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
            <div
              className={`text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {column.renderCell
                ? column.renderCell(row)
                : (row as any)[column.key]}
            </div>
          </div>
        ))}

        {actions && actions.length > 0 && (
          <div
            className={`flex items-center ${justifyClass} space-x-3`}
            style={{ width: actionContainerWidth }}
          >
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => action.onClick(row)}
                disabled={action.disabled?.(row)}
                className={`group/btn relative overflow-hidden rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                  actionButtonClassName || "h-9 px-6 text-sm min-w-[90px]"
                } ${
                  action.disabled?.(row) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  backgroundImage:
                    action.variant === "danger"
                      ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                      : action.variant === "secondary"
                      ? theme === "dark"
                        ? "linear-gradient(135deg, #4B5563 0%, #374151 100%)"
                        : "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)"
                      : "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 50%",
                  transition: "background-position 400ms ease, transform 300ms ease, box-shadow 300ms ease",
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow:
                    action.variant === "danger"
                      ? "0 4px 15px rgba(239, 68, 68, 0.3)"
                      : action.variant === "secondary"
                      ? "0 4px 15px rgba(75, 85, 99, 0.3)"
                      : "0 4px 15px rgba(59, 130, 246, 0.3)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!action.disabled?.(row)) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 50%";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!action.disabled?.(row)) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 50%";
                  }
                }}
              >
                {action.icon && <i className={`${action.icon} mr-1.5`} />}
                <span className="relative top-px">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Glow Effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
        }}
      />
    </div>
  );
}

export default TableRow;