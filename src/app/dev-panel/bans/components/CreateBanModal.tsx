"use client";

import { useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";

interface CreateBanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BanType = "User" | "Group";

interface FormData {
  type: BanType;
  discordUserId?: string;
  robloxUsername?: string;
  robloxGroupId?: string;
  description: string;
}

function CreateBanModal({ isOpen, onClose }: CreateBanModalProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    type: "User",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Handle ban creation
    onClose();
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Ban"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ban Type Selection */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({
              ...formData,
              type: e.target.value as BanType,
              // Clear fields when type changes
              discordUserId: undefined,
              robloxUsername: undefined,
              robloxGroupId: undefined,
            })}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
            }`}
            required
          >
            <option value="User">User</option>
            <option value="Group">Group</option>
          </select>
        </div>

        {/* Conditional Fields Based on Type */}
        {formData.type === "User" ? (
          <>
            {/* Discord User ID */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Discord User ID *
              </label>
              <input
                type="text"
                value={formData.discordUserId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, discordUserId: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                }`}
                placeholder="Enter Discord User ID"
                required
              />
            </div>

            {/* Roblox Username */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Roblox Username *
              </label>
              <input
                type="text"
                value={formData.robloxUsername || ""}
                onChange={(e) =>
                  setFormData({ ...formData, robloxUsername: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                }`}
                placeholder="Enter Roblox Username"
                required
              />
            </div>
          </>
        ) : (
          /* Roblox Group ID */
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Roblox Group ID *
            </label>
            <input
              type="text"
              value={formData.robloxGroupId || ""}
              onChange={(e) =>
                setFormData({ ...formData, robloxGroupId: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
              }`}
              placeholder="Enter Roblox Group ID"
              required
            />
          </div>
        )}

        {/* Description */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 min-h-[100px] ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
            }`}
            placeholder="Enter ban reason"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
            }}
          >
            Create Ban
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

export default CreateBanModal;