// Import all mock data
import bansData from './bans.json';
import clansData from './clans.json';
import groupsData from './groups.json';
import serialKeysData from './serialKeys.json';
import profileData from './profile.json';
import groupManagementData from './groupManagement.json';
import groupMembersData from './groupMembers.json';
import userProfilesData from './userProfiles.json';

// Export the data
export const bans = bansData.bans;
export const clans = clansData.clans;
export const groups = groupsData.groups;
export const serialKeys = serialKeysData.serialKeys;
export const profile = profileData;
export const groupManagement: Record<string, GroupManagementData> = groupManagementData.groupManagement as Record<string, GroupManagementData>;
export const groupMembers: Record<string, GroupMember[]> = groupMembersData.groupMembers as Record<string, GroupMember[]>;
export const userProfiles: Record<string, UserProfile> = userProfilesData.userProfiles as Record<string, UserProfile>;

// Export types for TypeScript
export interface BanRecord {
  id: string;
  name: string;
  type: "User" | "Group";
  date: string;
  description: string;
}

export interface ClanRecord {
  id: string;
  name: string;
  subscriptionStatus: "Inactive" | "Partnered" | "Active";
  expiryDate: string;
  botAccount: string;
  divisions: number;
}

export interface GroupData {
  id: string;
  name: string;
  abbreviation: string;
  permissionLevel: string;
  expiryDate: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "PENDING";
}

export interface SerialKey {
  key: string;
  type: "Division" | "Subscription";
  status: "Available" | "Redeemed";
  length: string;
  created: string;
  redemption?: {
    discordUsername: string;
    discordUserId: string;
    groupId: string;
    redeemedAt: string;
  };
}

export interface GroupManagementData {
  id: string;
  name: string;
  logo: string;
  owner: string;
  members: number;
  role: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "PENDING";
  expiryDays: number;
  expiryHours: number;
  expiryMinutes: number;
  memberGrowth: string;
  permissions: string;
}

export interface GroupMember {
  id: string;
  username: string;
  rank: string;
  experience: number;
  quotaPoints: number;
  medals: number;
  qualifications: number;
}

export interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: string;
  earnedDate: string;
}

export interface Qualification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  status: string;
  issuedDate: string;
  expiryDate: string;
  credentialUrl: string;
}

export interface AuditLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  performedBy: string;
  category: string;
}

export interface UserProfile {
  id: string;
  username: string;
  profilePicture: string;
  rank: string;
  experience: number;
  quotaPoints: number;
  medals: Medal[];
  qualifications: Qualification[];
  auditLogs: AuditLog[];
}

// Re-export all data as default
export default {
  bans,
  clans,
  groups,
  serialKeys,
  profile,
  groupManagement
}; 