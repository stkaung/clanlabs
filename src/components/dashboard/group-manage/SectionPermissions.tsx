"use client";

import CardPermission, { type PermissionDefinition } from "./CardPermission";
import useTheme from "@/hooks/useTheme";
import { getCategoryHeaderClasses, getCategoryHeaderClassesLight } from "@/utils/categories";

interface SectionPermissionsProps {
  title: string;
  description?: string;
  permissions: PermissionDefinition[];
  selectableKeys?: Set<string>;
  onToggleSelect?: (key: string, checked: boolean) => void;
  asRows?: boolean;
  enabledMap?: Record<string, boolean>;
  onToggleEnabled?: (key: string, enabled: boolean) => void;
  minRankMap?: Record<string, string>;
  onChangeMinRank?: (key: string, rank: string) => void;
}

export default function SectionPermissions({ title, description, permissions, selectableKeys, onToggleSelect, asRows = false, enabledMap, onToggleEnabled, minRankMap, onChangeMinRank }: SectionPermissionsProps): JSX.Element {
  const theme = useTheme();
  return (
    <section className="space-y-3 font-[Poppins]">
      <div className="px-2 sm:px-1">
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md shadow-sm ${theme === 'dark' ? getCategoryHeaderClasses(title) : getCategoryHeaderClassesLight(title)}`}>
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
            <i className="fas fa-layer-group text-[10px]" />
          </div>
          <h4 className="text-sm font-semibold tracking-wide">{title}</h4>
        </div>
        {description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>}
      </div>

      {asRows ? (
        <div className={`rounded-2xl overflow-hidden relative group ${theme === 'dark' ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'}`}>
          <div className={`absolute inset-0 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-[#1D203A]/50 via-[#14162a]/40 to-[#101225]/50' : 'bg-white/70'} border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/60'} shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]`} />
          <div className="relative">
            {permissions.map((perm) => (
              <div
                key={perm.key}
                className={`w-full text-left transition-all duration-300 cursor-default border-t first:border-t-0 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/70'} group/row hover:bg-white/5 hover:dark:bg-white/5 focus:outline-none`}
              >
                <CardPermission
                  permission={perm}
                  selectable={false}
                  selected={false}
                  variant="row"
                  isEnabled={enabledMap?.[perm.key] ?? true}
                  onToggleEnabled={(enabled) => onToggleEnabled?.(perm.key, enabled)}
                  currentMinRank={(minRankMap?.[perm.key] as any) ?? perm.minRank}
                  onChangeMinRank={(rank) => onChangeMinRank?.(perm.key, rank)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {permissions.map((perm) => (
            <CardPermission
              key={perm.key}
              permission={perm}
              selectable={!!selectableKeys}
              selected={!!selectableKeys?.has(perm.key)}
              onSelectChange={(checked) => onToggleSelect?.(perm.key, checked)}
              variant="card"
            />
          ))}
        </div>
      )}
    </section>
  );
}

