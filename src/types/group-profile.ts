// User profile data within a group
export interface UserProfile {
  id: string;
  username: string;
  profilePicture?: string;
  role: UserRole;
  xpLevel: number;
  xpUnit: string; // Customizable unit name (e.g., "XP", "bigcoins", "points", etc.)
  joinedDate: string;
}

// Group information
export interface GroupInfo {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
  creator: {
    id: string;
    name: string;
  };
  memberCount: number;
  description?: string;
  createdDate: string;
}

// User role within a group
export interface UserRole {
  name: string;
  color: string;
  permissions: string[];
}

// Group list item for sidebar
export interface GroupListItem {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
  role: string;
  isActive?: boolean;
}

// XP level information
export interface XPLevel {
  level: number;
  name: string;
  color: string;
  minXP: number;
  maxXP: number;
}
