"use client";

import { useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";

interface UpdateBanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDescription: string;
  banName: string;
  onUpdate: (newDescription: string) => void;
}

export default function UpdateBanModal({
  isOpen,
  onClose,
  initialDescription,
  banName,
  onUpdate,
}: UpdateBanModalProps) {
  const theme = useTheme();
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call
      await onUpdate(description);
      onClose();
    } catch (error) {
      console.error("Failed to update ban:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Ban - ${banName}`}
      titleClass="text-xl font-bold"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="description"
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[120px] ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Enter the reason for the ban..."
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark"
                ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !description.trim()}
            className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting || !description.trim()
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <i className="fas fa-spinner fa-spin mr-2" />
                Updating...
              </span>
            ) : (
              "Update Ban"
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}