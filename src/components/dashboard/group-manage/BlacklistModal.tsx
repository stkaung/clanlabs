"use client";

import { useEffect, useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";

export type BlacklistType = "Group" | "Username";

export interface BlacklistEditable {
  id: number;
  type: BlacklistType;
  name: string; // display name: username or group id for now
  description: string;
}

interface BlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  blacklist: BlacklistEditable | null;
  onSave: (updated: BlacklistEditable) => Promise<void> | void;
  mode?: "create" | "update";
}

export default function BlacklistModal({ isOpen, onClose, blacklist, onSave, mode = "update" }: BlacklistModalProps) {
  const theme = useTheme();
  const [form, setForm] = useState<BlacklistEditable | null>(blacklist);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(blacklist);
  }, [blacklist]);

  const effectiveForm: BlacklistEditable = form ?? {
    id: 0,
    type: "Username",
    name: "",
    description: "",
  };

  async function handleSave(): Promise<void> {
    const current = form ?? { ...effectiveForm, id: Date.now() };
    setIsSaving(true);
    try {
      await onSave(current);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  const title = mode === "create" ? "Create Blacklist" : `Update Blacklist - ${effectiveForm.name || "Unnamed"}`;
  const primaryLabel = mode === "create" ? "Create Blacklist" : "Save Changes";

  const isCreate = mode === "create";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} maxWidth="lg" withinContainer>
      <div className="space-y-6">
        {isCreate ? (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Blacklist Type</label>
              <select
                value={effectiveForm.type}
                onChange={(e) => setForm({ ...(form ?? effectiveForm), type: e.target.value as BlacklistType, name: "" })}
                className={`w-full h-11 px-3 rounded-lg border focus:outline-none ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option>Username</option>
                <option>Group</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                {effectiveForm.type === "Username" ? "Username" : "Group ID"}
              </label>
              <input
                type="text"
                value={effectiveForm.name}
                onChange={(e) => setForm({ ...(form ?? effectiveForm), name: e.target.value })}
                placeholder={effectiveForm.type === "Username" ? "Enter username" : "Enter group ID"}
                className={`w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Blacklist Type</label>
              <input
                type="text"
                value={effectiveForm.type}
                disabled
                className={`w-full h-11 px-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Name</label>
              <input
                type="text"
                value={effectiveForm.name}
                disabled
                className={`w-full h-11 px-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-600'}`}
              />
            </div>
          </div>
        )}

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Description</label>
          <textarea
            value={effectiveForm.description}
            onChange={(e) => setForm({ ...(form ?? effectiveForm), description: e.target.value })}
            placeholder="Enter description..."
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className={`px-4 h-11 rounded-lg font-medium transition-all ${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || (isCreate && !effectiveForm.name.trim())}
            className="px-6 h-11 rounded-lg font-semibold text-white transition-all"
            style={{ background: isSaving ? "#10B981" : "linear-gradient(135deg, #10B981 0%, #059669 100%)" }}
          >
            {isSaving ? (
              <span className="flex items-center"><i className="fas fa-spinner fa-spin mr-2" />Saving...</span>
            ) : (
              primaryLabel
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

