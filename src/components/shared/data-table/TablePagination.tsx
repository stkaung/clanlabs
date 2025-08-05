"use client";

import useTheme from "@/hooks/useTheme";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  startIndex,
  endIndex,
}: TablePaginationProps) {
  const theme = useTheme();

  function handlePreviousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      {/* Page Info */}
      <div
        className={`text-sm transition-all duration-300 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} items
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          }`}
          style={{
            backgroundColor:
              theme === "dark"
                ? "rgba(59, 130, 246, 0.15)"
                : "rgba(59, 130, 246, 0.1)",
            color: theme === "dark" ? "#DBEAFE" : "#1E40AF",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor:
              theme === "dark"
                ? "rgba(59, 130, 246, 0.3)"
                : "rgba(59, 130, 246, 0.2)",
          }}
        >
          <i className="fas fa-chevron-left mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first page, last page, current page, and pages around current
            const showPage =
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1;

            if (!showPage && page === 2 && currentPage > 4) {
              return (
                <span
                  key="ellipsis-start"
                  className={`px-2 py-1 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ...
                </span>
              );
            }

            if (
              !showPage &&
              page === totalPages - 1 &&
              currentPage < totalPages - 3
            ) {
              return (
                <span
                  key="ellipsis-end"
                  className={`px-2 py-1 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ...
                </span>
              );
            }

            if (!showPage) {
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  page === currentPage ? "shadow-lg" : ""
                }`}
                style={{
                  backgroundColor:
                    page === currentPage
                      ? theme === "dark"
                        ? "rgba(59, 130, 246, 0.25)"
                        : "rgba(59, 130, 246, 0.15)"
                      : theme === "dark"
                      ? "rgba(30, 41, 59, 0.4)"
                      : "rgba(241, 245, 249, 0.6)",
                  color:
                    page === currentPage
                      ? theme === "dark"
                        ? "#FFFFFF"
                        : "#1E40AF"
                      : theme === "dark"
                      ? "#CBD5E1"
                      : "#64748B",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor:
                    page === currentPage
                      ? theme === "dark"
                        ? "rgba(59, 130, 246, 0.4)"
                        : "rgba(59, 130, 246, 0.3)"
                      : "transparent",
                  boxShadow:
                    page === currentPage
                      ? theme === "dark"
                        ? "0 4px 12px rgba(59, 130, 246, 0.2)"
                        : "0 4px 12px rgba(59, 130, 246, 0.15)"
                      : "none",
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          }`}
          style={{
            backgroundColor:
              theme === "dark"
                ? "rgba(59, 130, 246, 0.15)"
                : "rgba(59, 130, 246, 0.1)",
            color: theme === "dark" ? "#DBEAFE" : "#1E40AF",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor:
              theme === "dark"
                ? "rgba(59, 130, 246, 0.3)"
                : "rgba(59, 130, 246, 0.2)",
          }}
        >
          Next
          <i className="fas fa-chevron-right ml-1" />
        </button>
      </div>
    </div>
  );
}

export default TablePagination;