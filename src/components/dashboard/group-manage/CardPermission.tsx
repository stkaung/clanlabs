"use client";

import { getRankBadgeClasses, getRankIcon, type RankName, RANK_ORDER } from "@/utils/ranks";
import DropdownGlass from "@/components/shared/DropdownGlass";

export interface PermissionDefinition {
  key: string;
  title: string;
  description: string;
  category: string;
  minRank: RankName;
  recommendedRank?: RankName; // will be ignored visually per latest requirement
}

interface PermissionCardProps {
  permission: PermissionDefinition;
  selectable?: boolean; // selection is handled by parent row click; no UI checkbox here
  selected?: boolean; // affects visual highlight only
  onSelectChange?: (checked: boolean) => void; // unused inside; kept for API compatibility
  variant?: "row" | "card";
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
  compact?: boolean;
  showRoleDropdown?: boolean;
  roleOptions?: string[];
  currentMinRank?: RankName;
  onChangeMinRank?: (rank: RankName) => void;
}

export default function CardPermission({ permission, selectable = false, selected = false, onSelectChange, variant = "row", isEnabled = true, onToggleEnabled, compact = false, showRoleDropdown = false, roleOptions = [], currentMinRank, onChangeMinRank }: PermissionCardProps): JSX.Element {
  const {
    title,
    description,
    category,
    minRank,
    recommendedRank,
  } = permission;

  // Category badge now lives only in section header. Keep function for compatibility if needed elsewhere

  const content = (
    <div className={`${compact ? 'p-4' : 'p-5 sm:p-6'} gap-4 font-[Poppins]`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`${compact ? 'text-base' : 'text-base sm:text-lg'} mt-1 font-semibold leading-tight flex items-center gap-2 text-gray-900 dark:text-white truncate`}>
            {title}
          </h3>
          <p className={`${compact ? 'text-sm' : 'text-sm sm:text-base'} mt-1 text-gray-600 dark:text-gray-300`}>{description}</p>
        </div>
        {variant === 'row' && (
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wide ${isEnabled ? 'text-emerald-400' : 'text-gray-400'}`}>{isEnabled ? 'Enabled' : 'Disabled'}</span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ring-1 ${isEnabled ? 'bg-emerald-500/70 ring-emerald-400/50' : 'bg-white/10 ring-white/20'} hover:brightness-110`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleEnabled?.(!isEnabled);
                }}
                aria-pressed={isEnabled}
                aria-label={`Toggle ${title}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isEnabled ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {onChangeMinRank ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-300">Min Rank:</span>
            <div className="min-w-[140px]">
              <DropdownGlass
                value={(currentMinRank ?? minRank) as string}
                options={[...RANK_ORDER].map((r) => ({ label: r, value: r }))}
                onChange={(next) => onChangeMinRank(next as RankName)}
                ariaLabel={`Change minimum rank for ${title}`}
                buttonClassName="h-8 text-xs"
              />
            </div>
          </div>
        ) : (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRankBadgeClasses(minRank)}`}>
            <i className={`${getRankIcon(minRank)} mr-1.5`} />
            Min: {minRank}
          </span>
        )}

        {/* Recommended rank pill intentionally removed per latest requirement */}
      </div>

      {variant === 'card' && (
        <div className="mt-4 flex items-center justify-end gap-3">
          {showRoleDropdown && isEnabled && (
            <select className="select select-xs sm:select-sm select-bordered bg-white/90 dark:bg-gray-800/70 text-gray-900 dark:text-white border-gray-200 dark:border-white/10">
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          )}
          <label className="label cursor-pointer gap-2" aria-label="Enable permission">
            <span className="text-xs text-gray-600 dark:text-gray-300 hidden sm:inline">Enabled</span>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={isEnabled}
              onChange={(e) => onToggleEnabled?.(e.target.checked)}
              aria-checked={isEnabled}
              aria-label={`Toggle ${title}`}
            />
          </label>
        </div>
      )}
    </div>
  );

  if (variant === "card") {
    return (
      <div className={`rounded-2xl border bg-white/90 dark:bg-gray-800/70 border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] ${selected ? 'ring-2 ring-indigo-400/40 dark:ring-indigo-500/30' : ''}`}>
        {content}
      </div>
    );
  }

  // Row variant: rely on parent panel styling and dividers
  return <div className={`w-full transition-all duration-300 hover:bg-white/5 hover:dark:bg-white/5 ${selected ? 'bg-white/5 dark:bg-white/5' : ''}`}>{content}</div>;
}

