"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";
import { discordRoles, type DiscordRole } from "@/data/mock";

export interface RankEditable {
  id: number;
  name: string;
  locked: boolean;
  prefix: string;
  discordRoleIds: string[];
  experience: number;
  quotaPoints: number;
  gamepass?: string;
  shirt?: string;
  badge?: string;
}

interface RankModalProps {
  isOpen: boolean;
  onClose: () => void;
  rank: RankEditable | null;
  onSave: (updated: RankEditable) => Promise<void> | void;
  mode?: 'create' | 'update';
}

export default function RankModal({ isOpen, onClose, rank, onSave, mode = 'update' }: RankModalProps) {
  const theme = useTheme();
  const [form, setForm] = useState<RankEditable | null>(rank);
  const [isSaving, setIsSaving] = useState(false);
  const allRoles: DiscordRole[] = useMemo(() => discordRoles, []);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [roleQuery, setRoleQuery] = useState("");
  const rolesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setForm(rank);
  }, [rank]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (rolesRef.current && !rolesRef.current.contains(target)) {
        setIsRolesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const effectiveForm: RankEditable = form ?? {
    id: 0,
    name: "",
    locked: false,
    prefix: "",
    discordRoleIds: [],
    experience: 0,
    quotaPoints: 0,
    gamepass: "",
    shirt: "",
    badge: "",
  };

  function toggleRole(roleId: string): void {
    const current = form ?? effectiveForm;
    const exists = current.discordRoleIds.includes(roleId);
    const nextIds = exists
      ? current.discordRoleIds.filter((id) => id !== roleId)
      : [...current.discordRoleIds, roleId];
    setForm({ ...current, discordRoleIds: nextIds });
  }

  function handleNumberChange(key: "experience" | "quotaPoints", delta: number): void {
    const current = form ?? effectiveForm;
    const next = Math.max(0, (current[key] ?? 0) + delta);
    setForm({ ...current, [key]: next } as RankEditable);
  }

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

  const selectedRoles = effectiveForm.discordRoleIds
    .map((id) => allRoles.find((r) => r.id === id))
    .filter(Boolean) as DiscordRole[];
  const filteredRoles = useMemo(() => {
    const q = roleQuery.trim().toLowerCase();
    if (!q) return allRoles;
    return allRoles.filter((r) => r.name.toLowerCase().includes(q));
  }, [roleQuery, allRoles]);

  const title = mode === 'create' ? `Create Rank` : `Update Rank - ${effectiveForm.name || 'Unnamed Rank'}`;
  const primaryLabel = mode === 'create' ? 'Create Rank' : 'Save Changes';

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="3xl"
      withinContainer
    >
      <div className="space-y-6">
        {/* Basics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Locked</label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={effectiveForm.locked}
                onChange={(e) => setForm({ ...(form ?? effectiveForm), locked: e.target.checked })}
                className="toggle toggle-success"
              />
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Locked</span>
            </label>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Prefix</label>
            <input
              type="text"
              value={effectiveForm.prefix}
              onChange={(e) => setForm({ ...(form ?? effectiveForm), prefix: e.target.value })}
              placeholder="N/A"
              className={`w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Discord Roles */}
        <div ref={rolesRef} className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Discord Roles</label>
            {selectedRoles.length > 0 && (
              <button
                type="button"
                onClick={() => setForm({ ...(form ?? effectiveForm), discordRoleIds: [] })}
                className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-rose-300 hover:bg-rose-900/30' : 'text-rose-700 hover:bg-rose-50'}`}
              >
                Clear roles
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsRolesOpen((v) => !v)}
            className={`w-full min-h-11 px-3 py-2 rounded-lg border flex items-center gap-2 flex-wrap ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
          >
            {selectedRoles.length === 0 ? (
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Add roles</span>
            ) : (
              selectedRoles.map((role) => (
                <span key={role.id} className="inline-flex items-center gap-2 px-2.5 h-8 rounded-full text-xs font-medium border" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                  <span className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>{role.name}</span>
                </span>
              ))
            )}
            <i className={`ml-auto fas fa-chevron-${isRolesOpen ? 'up' : 'down'} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>

          {isRolesOpen && (
            <div className={`absolute left-0 right-0 z-10 rounded-xl border p-3 mt-2 shadow-xl ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white border-gray-200/60'} transition-all`}>
              <div className="mb-2">
                <input
                  value={roleQuery}
                  onChange={(e) => setRoleQuery(e.target.value)}
                  placeholder="Search roles..."
                  className={`w-full h-10 px-3 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'}`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {filteredRoles.map((role) => {
                  const active = effectiveForm.discordRoleIds.includes(role.id);
                  return (
                    <button
                      key={role.id}
                      onClick={() => toggleRole(role.id)}
                      className={`flex items-center justify-between w-full px-3 h-10 rounded-lg border transition ${
                        active
                          ? theme === "dark" ? "bg-emerald-900/40 border-emerald-700/40" : "bg-emerald-50 border-emerald-200"
                          : theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                        <span className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>{role.name}</span>
                      </div>
                      {active && <i className="fas fa-check text-emerald-500" />}
                    </button>
                  );
                })}
                {filteredRoles.length === 0 && (
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No roles found</div>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsRolesOpen(false)}
                  className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Done
                </button>
                {selectedRoles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...(form ?? effectiveForm), discordRoleIds: [] })}
                    className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-rose-300 hover:bg-rose-900/30' : 'text-rose-700 hover:bg-rose-50'}`}
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Numeric fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(["experience", "quotaPoints"] as const).map((key) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                {key === "experience" ? "Experience Required" : "Quota Points"}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNumberChange(key, -1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border"
                >
                  <i className="fas fa-minus" />
                </button>
                <input
                  type="number"
                  min={0}
                  value={effectiveForm[key]}
                  onChange={(e) => setForm({ ...(form ?? effectiveForm), [key]: Math.max(0, Number(e.target.value) || 0) } as RankEditable)}
                  className={`w-full h-11 px-3 rounded-lg border text-center ${
                    theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <button
                  onClick={() => handleNumberChange(key, +1)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center border"
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gamepass / Shirt / Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["gamepass", "shirt", "badge"].map((key) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                {key[0].toUpperCase() + (key as string).slice(1)}
              </label>
              <input
                type="text"
                value={(effectiveForm as any)[key] ?? ""}
                onChange={(e) => setForm({ ...(form ?? effectiveForm), [key]: e.target.value } as RankEditable)}
                placeholder="N/A"
                className={`w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 sticky bottom-0 pb-1" style={{
          background: theme === 'dark' ? 'linear-gradient(to top, rgba(17,24,39,0.9), rgba(17,24,39,0.0))' : 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.0))'
        }}>
          <button
            onClick={onClose}
            className={`px-4 h-11 rounded-lg font-medium transition-all ${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 h-11 rounded-lg font-semibold text-white transition-all"
            style={{ background: isSaving ? "#3B82F6" : "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)" }}
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

