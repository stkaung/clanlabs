"use client";

import { useState } from "react";
import useTheme from "@/hooks/useTheme";

const poppinsClass = "font-['Poppins']";

export default function SerialKeyDelete() {
  const theme = useTheme();
  const [keysToDelete, setKeysToDelete] = useState("");

  const handleDelete = () => {
    // Split by newline, comma, or space and filter out empty strings
    const keys = keysToDelete
      .split(/[\n,\s]+/)
      .filter(key => key.trim().length > 0);
    
    if (keys.length === 0) return;

    // Here you would make the API call to delete the keys
    console.log("Deleting keys:", keys);
  };

  return (
    <div className={`rounded-lg border ${
      theme === "dark" ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-200"
    }`}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${poppinsClass} ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
            Delete Serial Keys
          </h2>
          <button className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm ${poppinsClass} ${
            theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-500"
          }`}>
            <i className="fas fa-trash-alt" />
            <span>Bulk Delete</span>
          </button>
        </div>

        <div>
          <label className={`block mb-2 text-sm text-gray-500 ${poppinsClass}`}>Serial Keys to Delete</label>
          <textarea
            value={keysToDelete}
            onChange={(e) => setKeysToDelete(e.target.value)}
            placeholder="Enter serial keys to delete (one per line, comma separated, or space separated)"
            className={`w-full h-32 px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 font-mono placeholder:${poppinsClass} ${
              theme === "dark"
                ? "bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:ring-red-500/20"
                : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-red-500/30"
            }`}
          />
          <p className={`mt-2 text-sm ${poppinsClass} ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            You can enter multiple keys separated by newlines, commas, or spaces
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setKeysToDelete("")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${poppinsClass} ${
              theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Clear
          </button>
          <button
            onClick={handleDelete}
            disabled={!keysToDelete.trim()}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${poppinsClass} ${
              !keysToDelete.trim()
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:scale-105"
            } text-white`}
          >
            <i className="fas fa-trash" />
            <span>Delete Keys</span>
          </button>
        </div>
      </div>
    </div>
  );
}