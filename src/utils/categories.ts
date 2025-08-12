// Utilities for category-based color classes to keep UI consistent

export function getCategoryBadgeClasses(category: string): string {
  switch (category) {
    case "Administration":
      return "bg-indigo-500/15 text-indigo-300 border border-indigo-400/20";
    case "Moderation":
      return "bg-blue-500/15 text-blue-300 border border-blue-400/20";
    case "Recognition":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20";
    case "Auditing":
      return "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20";
    case "Safety":
      return "bg-rose-500/15 text-rose-300 border border-rose-400/20";
    case "Operations":
      return "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/20";
    case "Communications":
      return "bg-amber-500/15 text-amber-300 border border-amber-400/20";
    case "Integrations":
      return "bg-teal-500/15 text-teal-300 border border-teal-400/20";
    case "Analytics":
      return "bg-violet-500/15 text-violet-300 border border-violet-400/20";
    default:
      return "bg-white/10 text-white/80 border border-white/15";
  }
}

export function getCategoryHeaderClasses(category: string): string {
  switch (category) {
    case "Administration":
      return "bg-indigo-500/10 text-indigo-200 border-indigo-400/30";
    case "Moderation":
      return "bg-blue-500/10 text-blue-200 border-blue-400/30";
    case "Recognition":
      return "bg-emerald-500/10 text-emerald-200 border-emerald-400/30";
    case "Auditing":
      return "bg-cyan-500/10 text-cyan-200 border-cyan-400/30";
    case "Safety":
      return "bg-rose-500/10 text-rose-200 border-rose-400/30";
    case "Operations":
      return "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-400/30";
    case "Communications":
      return "bg-amber-500/10 text-amber-200 border-amber-400/30";
    case "Integrations":
      return "bg-teal-500/10 text-teal-200 border-teal-400/30";
    case "Analytics":
      return "bg-violet-500/10 text-violet-200 border-violet-400/30";
    default:
      return "bg-white/10 text-white/80 border-white/20";
  }
}

export function getCategoryHeaderClassesLight(category: string): string {
  // Stronger contrast for light mode
  switch (category) {
    case "Administration":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Moderation":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Recognition":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Auditing":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case "Safety":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "Operations":
      return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200";
    case "Communications":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "Integrations":
      return "bg-teal-50 text-teal-700 border-teal-200";
    case "Analytics":
      return "bg-violet-50 text-violet-700 border-violet-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

