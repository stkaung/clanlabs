"use client";

import { useState, useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import { DataTableProps } from "./types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";

function DataTable<T>({
  data,
  columns,
  actions,
  rowKeyField,
  isLoading = false,
  emptyMessage = "No data available",
  pageSize = 10,
  currentPage: controlledCurrentPage,
  totalItems: controlledTotalItems,
  onPageChange,
  searchQuery = "",
  onSearch,
  className = "",
}: DataTableProps<T>) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Use controlled or uncontrolled pagination
  const effectiveCurrentPage = controlledCurrentPage || currentPage;
  const totalItems = controlledTotalItems || data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Calculate pagination indices
  const startIndex = (effectiveCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Get current page data
  const currentData = data.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (!controlledCurrentPage) {
      setCurrentPage(1);
    }
  }, [searchQuery, controlledCurrentPage]);

  // Handle search loading simulation
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const searchTimer = setTimeout(() => {
        setIsSearching(false);
      }, 100);

      return () => clearTimeout(searchTimer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Animate the count changes
  useEffect(() => {
    const targetCount = totalItems;
    if (displayedCount !== targetCount) {
      const countTimer = setTimeout(
        () => {
          setDisplayedCount(targetCount);
        },
        isSearching ? 120 : 0
      );

      return () => clearTimeout(countTimer);
    }
  }, [totalItems, displayedCount, isSearching]);

  function handlePageChange(page: number) {
    if (!controlledCurrentPage) {
      setCurrentPage(page);
    }
    onPageChange?.(page);
  }

  // Shared styles for empty and loading states
  const stateContainerStyle = {
    backgroundColor: theme === "dark" 
      ? "rgba(30, 41, 59, 0.4)"
      : "rgba(241, 245, 249, 0.6)",
    borderColor: theme === "dark"
      ? "rgba(59, 130, 246, 0.15)"
      : "rgba(30, 64, 175, 0.1)",
    backdropFilter: "blur(16px)",
    boxShadow: theme === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(59, 130, 246, 0.1) inset"
      : "0 4px 20px rgba(59, 130, 246, 0.1), 0 1px 0 rgba(255, 255, 255, 0.8) inset"
  };

  return (
    <div className={className}>
      {/* Section Header with Search Count */}
      {searchQuery && (
        <div
          className={`flex items-center space-x-2 text-xs mb-4 transition-all duration-500 ${
            isSearching ? "opacity-50" : "opacity-100"
          }`}
        >
          <div
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800/50 border border-gray-700/50"
                : "bg-gray-50 border border-gray-200/50"
            }`}
          >
            <i
              className={`fas fa-search transition-all duration-200 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <span
              className={`transition-all duration-200 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
              {totalItems} items matching{" "}
              <span
                className={`font-semibold ${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}
              >
                &quot;{searchQuery}&quot;
              </span>
            </span>
            {!isSearching && searchQuery && (
              <div
                className={`ml-2 w-2 h-2 rounded-full transition-all duration-200 ${
                  totalItems > 0
                    ? "bg-green-500 shadow-lg shadow-green-500/30"
                    : "bg-red-500 shadow-lg shadow-red-500/30"
                }`}
              />
            )}
          </div>
        </div>
      )}

      {/* Table Header */}
      <TableHeader columns={columns} hasActions={!!actions?.length} />

      {/* Table Body */}
      {isLoading ? (
        <div
          className="text-center py-12 rounded-xl border transition-all duration-500 overflow-hidden relative"
          style={stateContainerStyle}
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: theme === "dark"
                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(124, 58, 237, 0.03) 50%, rgba(59, 130, 246, 0.05) 100%)"
                : "linear-gradient(90deg, rgba(59, 130, 246, 0.03) 0%, rgba(124, 58, 237, 0.02) 50%, rgba(59, 130, 246, 0.03) 100%)",
            }}
          />
          <div className="relative z-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: theme === "dark" ? "#FFFFFF" : "#1F2937" }}
            >
              Loading...
            </h3>
          </div>
        </div>
      ) : currentData.length > 0 ? (
        <div className="space-y-3">
          {currentData.map((row, index) => (
            <TableRow
              key={String(row[rowKeyField])}
              row={row}
              columns={columns}
              actions={actions}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded-xl border transition-all duration-500 overflow-hidden relative"
          style={stateContainerStyle}
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: theme === "dark"
                ? "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(124, 58, 237, 0.03) 50%, rgba(59, 130, 246, 0.05) 100%)"
                : "linear-gradient(90deg, rgba(59, 130, 246, 0.03) 0%, rgba(124, 58, 237, 0.02) 50%, rgba(59, 130, 246, 0.03) 100%)",
            }}
          />
          <div className="relative z-10">
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-gray-800/60 border border-gray-700/30" 
                  : "bg-white/60 border border-gray-200/30"
              }`}
              style={{
                backdropFilter: "blur(8px)",
                boxShadow: theme === "dark"
                  ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                  : "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <i
                className="fas fa-table text-2xl"
                style={{ 
                  color: theme === "dark" ? "#93C5FD" : "#3B82F6",
                  filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
                }}
              />
            </div>
            <h3
              className={`text-lg font-medium mb-2 ${
                theme === "dark" 
                  ? "text-white" 
                  : "text-gray-900"
              }`}
              style={{
                textShadow: theme === "dark"
                  ? "0 2px 4px rgba(0, 0, 0, 0.3)"
                  : "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {emptyMessage}
            </h3>
            {searchQuery && (
              <p
                className={`text-sm ${
                  theme === "dark" 
                    ? "text-gray-300" 
                    : "text-gray-600"
                }`}
              >
                Try searching with different keywords
              </p>
            )}
          </div>

          {/* Bottom Glow Effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-60"
            style={{
              background: theme === "dark"
                ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
                : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
            }}
          />
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <TablePagination
          currentPage={effectiveCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={pageSize}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
    </div>
  );
}

export default DataTable;