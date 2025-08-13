"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";
import { discordRoles, type DiscordRole, emojis, type Emoji } from "@/data/mock";

export interface QualificationEditable {
  id: number;
  name: string;
  emojiId: string;
  discordRoleIds: string[];
  description: string;
}

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualification: QualificationEditable | null;
  onSave: (updated: QualificationEditable) => Promise<void> | void;
  mode?: "create" | "update";
}

export default function QualificationModal({ isOpen, onClose, qualification, onSave, mode = "update" }: QualificationModalProps) {
  const theme = useTheme();
  const [form, setForm] = useState<QualificationEditable | null>(qualification);
  const [isSaving, setIsSaving] = useState(false);
  const allRoles: DiscordRole[] = useMemo(() => discordRoles, []);
  const allEmojis: Emoji[] = useMemo(() => emojis, []);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [emojiQuery, setEmojiQuery] = useState("");
  const [roleQuery, setRoleQuery] = useState("");
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const rolesRef = useRef<HTMLDivElement | null>(null);
  const MAX_NAME = 50;
  const MAX_DESC = 200;

  useEffect(() => {
    setForm(qualification);
  }, [qualification]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (emojiRef.current && !emojiRef.current.contains(target)) setIsEmojiOpen(false);
      if (rolesRef.current && !rolesRef.current.contains(target)) setIsRolesOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const effectiveForm: QualificationEditable = form ?? {
    id: 0,
    name: "",
    emojiId: allEmojis[0]?.id || "",
    discordRoleIds: [],
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

  function toggleRole(roleId: string): void {
    const current = form ?? effectiveForm;
    const exists = current.discordRoleIds.includes(roleId);
    const nextIds = exists ? current.discordRoleIds.filter((id) => id !== roleId) : [...current.discordRoleIds, roleId];
    setForm({ ...current, discordRoleIds: nextIds });
  }

  const selectedRoles = effectiveForm.discordRoleIds
    .map((id) => allRoles.find((r) => r.id === id))
    .filter(Boolean) as DiscordRole[];
  const selectedEmoji = allEmojis.find((e) => e.id === effectiveForm.emojiId);
  const filteredEmojis = useMemo(() => {
    const q = emojiQuery.trim().toLowerCase();
    if (!q) return allEmojis;
    return allEmojis.filter((e) => e.name.toLowerCase().includes(q) || e.symbol.includes(emojiQuery));
  }, [emojiQuery, allEmojis]);
  const filteredRoles = useMemo(() => {
    const q = roleQuery.trim().toLowerCase();
    if (!q) return allRoles;
    return allRoles.filter((r) => r.name.toLowerCase().includes(q));
  }, [roleQuery, allRoles]);

  const title = mode === "create" ? "Create Qualification" : `Update Qualification - ${effectiveForm.name || "Unnamed Qualification"}`;
  const primaryLabel = mode === "create" ? "Create Qualification" : "Save Changes";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} maxWidth="3xl" withinContainer>
      <div className="space-y-6">
        {/* Preview */}
        <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${theme === "dark" ? "bg-gray-800/60 border-gray-700/50" : "bg-gray-50/70 border-gray-200/60"}`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner" style={{
                background: theme === 'dark' ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.1))' : 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.08))'
              }}>
                <span className="text-2xl leading-none select-none">{selectedEmoji?.symbol ?? '🎓'}</span>
              </div>
              <div>
                <div className={`text-sm uppercase tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Preview</div>
                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{effectiveForm.name || 'Unnamed Qualification'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedRoles.length > 0 && (
                <span className={`px-2.5 h-8 rounded-full text-xs font-semibold inline-flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                  <i className="fas fa-user-group" /> {selectedRoles.length} role{selectedRoles.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Name / Description */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Name</label>
            <input
              type="text"
              value={effectiveForm.name}
              onChange={(e) => setForm({ ...(form ?? effectiveForm), name: e.target.value.slice(0, 50) })}
              placeholder={effectiveForm.name || "Name"}
              className={`w-full h-11 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Description</label>
            <textarea
              value={effectiveForm.description}
              onChange={(e) => setForm({ ...(form ?? effectiveForm), description: e.target.value.slice(0, 200) })}
              placeholder={effectiveForm.description || "Description"}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px] ${
                theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Emoji selector */}
        <div ref={emojiRef} className="relative">
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Emoji</label>
          <button
            type="button"
            onClick={() => setIsEmojiOpen((v) => !v)}
            className={`w-full h-11 px-3 rounded-lg border flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl leading-none">{selectedEmoji?.symbol ?? '🎓'}</span>
              <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{selectedEmoji?.name ?? 'Choose emoji'}</span>
            </span>
            <i className={`fas fa-chevron-${isEmojiOpen ? 'up' : 'down'} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          {isEmojiOpen && (
            <div className={`absolute left-0 right-0 z-10 rounded-xl border p-3 mt-2 shadow-xl ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white border-gray-200/60'} transition-all`}>
              <div className="mb-2">
                <input
                  value={emojiQuery}
                  onChange={(e) => setEmojiQuery(e.target.value)}
                  placeholder="Search emoji..."
                  className={`w-full h-10 px-3 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'}`}
                />
              </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto overscroll-contain pr-1"
            onWheelCapture={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              e.preventDefault();
              e.stopPropagation();
              const next = el.scrollTop + e.deltaY;
              const max = el.scrollHeight - el.clientHeight;
              el.scrollTop = Math.max(0, Math.min(max, next));
            }}
            onTouchMoveCapture={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
                {filteredEmojis.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setForm({ ...(form ?? effectiveForm), emojiId: e.id })}
                    className={`flex items-center gap-2 w-full px-3 h-10 rounded-lg border transition ${
                      effectiveForm.emojiId === e.id
                        ? theme === 'dark' ? 'bg-indigo-900/40 border-indigo-700/40' : 'bg-indigo-50 border-indigo-200'
                        : theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{e.symbol}</span>
                    <span className="text-sm">{e.name}</span>
                  </button>
                ))}
                {filteredEmojis.length === 0 && (
                  <div className={`col-span-full text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No emojis found</div>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button type="button" onClick={() => setIsEmojiOpen(false)} className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Done</button>
                <button type="button" onClick={() => setForm({ ...(form ?? effectiveForm), emojiId: allEmojis[0]?.id || '' })} className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-indigo-300 hover:bg-indigo-900/30' : 'text-indigo-700 hover:bg-indigo-50'}`}>Reset</button>
              </div>
            </div>
          )}
        </div>

        {/* Discord Roles */}
        <div ref={rolesRef} className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Discord Roles</label>
            {selectedRoles.length > 0 && (
              <button type="button" onClick={() => setForm({ ...(form ?? effectiveForm), discordRoleIds: [] })} className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-rose-300 hover:bg-rose-900/30' : 'text-rose-700 hover:bg-rose-50'}`}>Clear roles</button>
            )}
          </div>
          <button type="button" onClick={() => setIsRolesOpen((v) => !v)} className={`w-full min-h-11 px-3 py-2 rounded-lg border flex items-center gap-2 flex-wrap ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            {selectedRoles.length === 0 ? (
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Add roles</span>
            ) : (
              selectedRoles.map((role) => (
                <span key={role.id} className="inline-flex items-center gap-2 px-2.5 h-8 rounded-full text-xs font-medium border" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                  <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{role.name}</span>
                </span>
              ))
            )}
            <i className={`ml-auto fas fa-chevron-${isRolesOpen ? 'up' : 'down'} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          {isRolesOpen && (
            <div className={`absolute left-0 right-0 z-10 rounded-xl border p-3 mt-2 shadow-xl ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white border-gray-200/60'} transition-all`}>
              <div className="mb-2">
                <input value={roleQuery} onChange={(e) => setRoleQuery(e.target.value)} placeholder="Search roles..." className={`w-full h-10 px-3 rounded-lg border text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'}`} />
              </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto overscroll-contain pr-1"
            onWheelCapture={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              e.preventDefault();
              e.stopPropagation();
              const next = el.scrollTop + e.deltaY;
              const max = el.scrollHeight - el.clientHeight;
              el.scrollTop = Math.max(0, Math.min(max, next));
            }}
            onTouchMoveCapture={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
                {filteredRoles.map((role) => {
                  const active = effectiveForm.discordRoleIds.includes(role.id);
                  return (
                    <button key={role.id} onClick={() => toggleRole(role.id)} className={`flex items-center justify-between w-full px-3 h-10 rounded-lg border transition ${active ? (theme === 'dark' ? 'bg-emerald-900/40 border-emerald-700/40' : 'bg-emerald-50 border-emerald-200') : (theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50')}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                        <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{role.name}</span>
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
                <button type="button" onClick={() => setIsRolesOpen(false)} className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Done</button>
                {selectedRoles.length > 0 && (
                  <button type="button" onClick={() => setForm({ ...(form ?? effectiveForm), discordRoleIds: [] })} className={`px-3 h-9 rounded-lg text-xs ${theme === 'dark' ? 'text-rose-300 hover:bg-rose-900/30' : 'text-rose-700 hover:bg-rose-50'}`}>Clear all</button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 sticky bottom-0 pb-1" style={{
          background: theme === 'dark' ? 'linear-gradient(to top, rgba(17,24,39,0.9), rgba(17,24,39,0.0))' : 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.0))'
        }}>
          <button onClick={onClose} className={`px-4 h-11 rounded-lg font-medium transition-all ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`} disabled={isSaving}>Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 h-11 rounded-lg font-semibold text-white transition-all" style={{ background: isSaving ? '#3B82F6' : 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' }}>{isSaving ? (<span className="flex items-center"><i className="fas fa-spinner fa-spin mr-2" />Saving...</span>) : (primaryLabel)}</button>
        </div>
      </div>
    </BaseModal>
  );
}

