"use client";

import { useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";

interface UpdateClanModalProps {
  isOpen: boolean;
  onClose: () => void;
  clanName: string;
  initialBotAccount: string;
  onUpdate: (newBotAccount: string) => Promise<void>;
}

export default function UpdateClanModal({
  isOpen,
  onClose,
  clanName,
  initialBotAccount,
  onUpdate,
}: UpdateClanModalProps) {
  const theme = useTheme();
  const [botAccount, setBotAccount] = useState(initialBotAccount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!botAccount.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate(botAccount);
      onClose();
    } catch (error) {
      console.error("Failed to update clan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal opens with new data
  useState(() => {
    setBotAccount(initialBotAccount);
  }, [initialBotAccount]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Bot Account - ${clanName}`}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="botAccount"
            className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Bot Account
          </label>
          <div className="relative">
            <input
              id="botAccount"
              type="text"
              value={botAccount}
              onChange={(e) => setBotAccount(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/20"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
              }`}
              placeholder="Enter bot account (e.g., BotName#1234)"
              pattern=".+#[0-9]{4}"
              title="Format: BotName#1234"
              disabled={isSubmitting}
              required
            />
            <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              <i className="fas fa-robot text-sm" />
            </div>
          </div>
          <p className={`mt-1.5 text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Format: BotName#1234
          </p>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !botAccount.trim() || !botAccount.match(/.+#[0-9]{4}/)}
            className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting || !botAccount.trim() || !botAccount.match(/.+#[0-9]{4}/)
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <i className="fas fa-spinner fa-spin mr-2" />
                Updating...
              </span>
            ) : (
              "Update Bot Account"
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}