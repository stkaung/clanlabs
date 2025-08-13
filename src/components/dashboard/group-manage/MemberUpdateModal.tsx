"use client";

import { useEffect, useMemo, useState } from "react";
import DropdownGlass from "@/components/shared/DropdownGlass";
import BaseModal from "@/components/dashboard/shared/BaseModal";
import useTheme from "@/hooks/useTheme";
import type { GroupMember, Medal, Qualification, UserProfile } from "@/data/mock";

interface MemberUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: GroupMember | null;
  profile?: UserProfile | null;
  onSave: (
    updated: GroupMember,
    profileUpdate?: { username: string; medals: Medal[]; qualifications: Qualification[] }
  ) => void;
}

export default function MemberUpdateModal({ isOpen, onClose, member, onSave, profile }: MemberUpdateModalProps) {
  const theme = useTheme();
  
  const [experience, setExperience] = useState<number>(0);
  const [quotaPoints, setQuotaPoints] = useState<number>(0);
  const [tab, setTab] = useState<"stats" | "medals" | "quals">("stats");
  const [medals, setMedals] = useState<Medal[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [selectedMedalId, setSelectedMedalId] = useState<string>("");
  const [selectedQualificationId, setSelectedQualificationId] = useState<string>("");

  // Options sourced from mock concepts to keep consistency
  const MEDAL_OPTIONS: Medal[] = [
    { id: "medal-1", name: "First Contribution", description: "Made your first contribution to the group project", icon: "fas fa-code", color: "#3B82F6", rarity: "common", earnedDate: new Date().toISOString() },
    { id: "medal-2", name: "Team Player", description: "Collaborated effectively with 10+ team members", icon: "fas fa-users", color: "#A855F7", rarity: "epic", earnedDate: new Date().toISOString() },
    { id: "medal-3", name: "Bug Hunter", description: "Found and reported critical bugs", icon: "fas fa-bug", color: "#F59E0B", rarity: "legendary", earnedDate: new Date().toISOString() },
    { id: "medal-4", name: "Design Master", description: "Created 50+ design assets", icon: "fas fa-palette", color: "#EC4899", rarity: "rare", earnedDate: new Date().toISOString() },
    { id: "medal-5", name: "Code Review Master", description: "Completed 100+ code reviews", icon: "fas fa-eye", color: "#10B981", rarity: "rare", earnedDate: new Date().toISOString() },
  ];

  const QUALIFICATION_OPTIONS: Qualification[] = [
    { id: "qual-1", title: "Elite Combat Specialist", issuer: "Roblox Military Academy", description: "Mastery in tactical combat operations", status: "active", issuedDate: new Date().toISOString(), expiryDate: new Date(Date.now() + 1000*60*60*24*365*3).toISOString(), credentialUrl: "#" },
    { id: "qual-2", title: "Advanced Builder Certification", issuer: "Roblox Builders Guild", description: "Advanced building and scripting", status: "active", issuedDate: new Date().toISOString(), expiryDate: new Date(Date.now() + 1000*60*60*24*365*3).toISOString(), credentialUrl: "#" },
    { id: "qual-3", title: "UI/UX Design Certification", issuer: "Design Institute", description: "Professional UI/UX design", status: "active", issuedDate: new Date().toISOString(), expiryDate: new Date(Date.now() + 1000*60*60*24*365*3).toISOString(), credentialUrl: "#" },
  ];

  useEffect(() => {
    if (member) {
      setExperience(member.experience);
      setQuotaPoints(member.quotaPoints);
      setMedals(profile?.medals ?? []);
      setQualifications(profile?.qualifications ?? []);
      setTab("stats");
    }
  }, [member, profile]);

  const canSave = useMemo(() => {
    return experience >= 0 && quotaPoints >= 0 && !!member;
  }, [experience, quotaPoints, member]);

  function handleSave(): void {
    if (!member) return;
    if (!canSave) return;
    const updated: GroupMember = {
      ...member,
      experience: Math.floor(experience),
      quotaPoints: Math.floor(quotaPoints),
      medals: medals.length,
      qualifications: qualifications.length,
    };
    onSave(updated, {
      username: member.username,
      medals,
      qualifications,
    });
  }

  if (!member) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update ${member.username}`}
      subtitle="Member maintenance"
      maxWidth="xl"
      withinContainer={true}
    >
      <div className="font-[Poppins]">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {([
            { key: "stats", label: "Stats", icon: "fas fa-signal" },
            { key: "medals", label: "Medals", icon: "fas fa-medal" },
            { key: "quals", label: "Qualifications", icon: "fas fa-certificate" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                tab === t.key
                  ? theme === "dark"
                    ? "bg-white/10 text-white"
                    : "bg-gray-900/5 text-gray-900"
                  : theme === "dark"
                    ? "bg-white/5 text-gray-300 hover:bg-white/10"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className={`${t.icon} text-xs`} /> {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        {tab === "stats" && (
          <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
            theme === "dark" ? "bg-[#1D203A]/40 border-white/10 shadow-purple-500/10" : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Experience</label>
                <input
                  type="number"
                  min={0}
                  value={experience}
                  onChange={(e) => setExperience(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-colors ${
                    theme === "dark"
                      ? "bg-[#1D203A]/40 border-white/10 text-white placeholder-white/40"
                      : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500"
                  } focus:outline-none`}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Quota Points</label>
                <input
                  type="number"
                  min={0}
                  value={quotaPoints}
                  onChange={(e) => setQuotaPoints(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl backdrop-blur-xl border transition-colors ${
                    theme === "dark"
                      ? "bg-[#1D203A]/40 border-white/10 text-white placeholder-white/40"
                      : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500"
                  } focus:outline-none`}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}

        {tab === "medals" && (
        <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" ? "bg-[#1D203A]/40 border-white/10 shadow-purple-500/10" : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Medals <span className="text-xs text-gray-400">({medals.length})</span></h4>
          </div>
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 mb-2">
            <label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Medals</label>
            <DropdownGlass
              value={selectedMedalId}
              onChange={setSelectedMedalId}
              options={MEDAL_OPTIONS.map((m) => ({
                value: m.id,
                label: m.name,
              }))}
              placeholder="Choose medal..."
            />
            <button
              type="button"
              onClick={() => {
                const option = MEDAL_OPTIONS.find((m) => m.id === selectedMedalId);
                if (!option) return;
                setMedals((prev) => (prev.some((x) => x.id === option.id) ? prev : [...prev, { ...option, earnedDate: new Date().toISOString() }]));
                setSelectedMedalId("");
              }}
              className={`h-10 px-4 rounded-xl text-sm font-medium ${
                theme === "dark"
                  ? "bg-white/5 text-white/80 hover:bg-white/10"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {medals.length === 0 ? (
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No medals yet</div>
            ) : (
              medals.map((m) => (
                <div key={m.id} className={`grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 rounded-xl border ${
                  theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/70 border-gray-200"
                } shadow-sm`}> 
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{m.name}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMedals((prev) => prev.filter((x) => x.id !== m.id))}
                    className={`text-sm px-3 py-1.5 rounded-lg ${theme === "dark" ? "bg-white/5 text-red-300 hover:bg-white/10" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        )}

        {tab === "quals" && (
        <div className={`p-6 rounded-2xl backdrop-blur-xl border shadow-xl ${
          theme === "dark" ? "bg-[#1D203A]/40 border-white/10 shadow-purple-500/10" : "bg-white/80 border-gray-200/50 shadow-blue-500/10"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Qualifications <span className="text-xs text-gray-400">({qualifications.length})</span></h4>
          </div>
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 mb-2">
            <label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Qualifications</label>
            <DropdownGlass
              value={selectedQualificationId}
              onChange={setSelectedQualificationId}
              options={QUALIFICATION_OPTIONS.map((q) => ({ value: q.id, label: q.title }))}
              placeholder="Choose qualification..."
            />
            <button
              type="button"
              onClick={() => {
                const option = QUALIFICATION_OPTIONS.find((q) => q.id === selectedQualificationId);
                if (!option) return;
                setQualifications((prev) => (prev.some((x) => x.id === option.id) ? prev : [...prev, { ...option }]));
                setSelectedQualificationId("");
              }}
              className={`h-10 px-4 rounded-xl text-sm font-medium ${
                theme === "dark"
                  ? "bg-white/5 text-white/80 hover:bg-white/10"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {qualifications.length === 0 ? (
              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No qualifications yet</div>
            ) : (
              qualifications.map((q) => (
                <div key={q.id} className={`grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 rounded-xl border ${
                  theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/70 border-gray-200"
                } shadow-sm`}>
                  <div className="flex items-center gap-3">
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>{q.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQualifications((prev) => prev.filter((x) => x.id !== q.id))}
                    className={`text-sm px-3 py-1.5 rounded-lg ${theme === "dark" ? "bg-white/5 text-red-300 hover:bg-white/10" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-white/5 text-gray-300 hover:bg-white/10"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all ${
              canSave
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

