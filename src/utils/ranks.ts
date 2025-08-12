// Shared rank utilities for consistent UI across pages

export type RankName =
  | "Owner"
  | "Admin"
  | "Moderator"
  | "Senior Member"
  | "Member"
  | "Junior Member";

export const RANK_ORDER: RankName[] = [
  "Owner",
  "Admin",
  "Moderator",
  "Senior Member",
  "Member",
  "Junior Member",
];

export function getRankOrderIndex(rank: RankName): number {
  return RANK_ORDER.indexOf(rank);
}

export function getRankIcon(rank: RankName): string {
  switch (rank) {
    case "Owner":
      return "fas fa-crown";
    case "Admin":
      return "fas fa-shield-alt";
    case "Moderator":
      return "fas fa-user-shield";
    case "Senior Member":
      return "fas fa-star";
    case "Member":
      return "fas fa-user";
    case "Junior Member":
      return "fas fa-user-graduate";
    default:
      return "fas fa-user";
  }
}

export function getRankBadgeClasses(rank: RankName): string {
  switch (rank) {
    case "Owner":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "Admin":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Moderator":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Senior Member":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Member":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "Junior Member":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}

export function formatMinimumRankLabel(rank: RankName): string {
  return `${rank} and above`;
}

