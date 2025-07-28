# Group Profile Components

## Overview

This module contains reusable components for displaying user profiles within groups and group information. All components follow the established design patterns from the Current Implementation document and are built to be modular and backend-ready.

## Components

### ProfileCard

**Location:** `src/components/dashboard/profile/ProfileCard.tsx`

**Purpose:** Displays user profile information including profile picture, username, role, XP level, and quick actions.

**Props:**

```typescript
interface ProfileCardProps {
  userProfile: UserProfile;
  className?: string;
}
```

**Features:**

- Profile picture with role-colored border
- XP level badge system with automatic color coding
- Role tags with custom colors
- Customizable point/currency units (XP, bigcoins, points, etc.)
- Statistics display (joined date, custom units)
- Action buttons (Edit Profile, Settings)
- Full theme support (dark/light)

**XP Level System:**

- Level 1: Novice (0-99 XP) - Grey
- Level 2: Apprentice (100-299 XP) - Green
- Level 3: Skilled (300-599 XP) - Blue
- Level 4: Expert (600-999 XP) - Purple
- Level 5: Master (1000-1999 XP) - Orange
- Level 6: Legend (2000+ XP) - Red

### GroupInfoCard

**Location:** `src/components/dashboard/profile/GroupInfoCard.tsx`

**Purpose:** Displays comprehensive group information including logo, creator, member count, and group stats.

**Props:**

```typescript
interface GroupInfoCardProps {
  groupInfo: GroupInfo;
  className?: string;
}
```

**Features:**

- Group logo with fallback to abbreviation
- Verified group badge
- Creator information with crown icon
- Member count with smart formatting (1K, 1M)
- Establishment date display
- Group ID display (last 6 characters)
- Action buttons (View Members, Share, More Options)

### GroupsSidebar

**Location:** `src/components/dashboard/sidebar/GroupsSidebar.tsx`

**Purpose:** Replaces the standard dashboard sidebar with a groups-focused navigation showing all user's groups.

**Props:**

```typescript
interface GroupsSidebarProps {
  groups: GroupListItem[];
  currentGroupId: string;
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}
```

**Features:**

- Groups list with logos and roles
- Current group highlighting
- Collapsible design matching main sidebar
- Mobile-responsive overlay
- Logo/abbreviation fallback system

### GroupProfileTopNav

**Location:** `src/components/dashboard/layout/GroupProfileTopNav.tsx`

**Purpose:** Top navigation bar specifically designed for group profile pages with Back to Dashboard functionality.

**Props:**

```typescript
interface GroupProfileTopNavProps {
  onSidebarToggle: () => void;
  groupName: string;
  breadcrumb?: string[];
}
```

**Features:**

- Back to Dashboard button
- Dynamic breadcrumb navigation
- Search functionality (group-specific)
- Mobile sidebar toggle
- Theme toggle
- Refresh button
- Same styling as main dashboard navbar

### MedalsSection

**Location:** `src/components/dashboard/profile/MedalsSection.tsx`

**Purpose:** Displays user medals and achievements with rarity-based styling and progress tracking.

**Props:**

```typescript
interface MedalsProps {
  medals: Medal[];
  className?: string;
}
```

**Features:**

- Expandable/collapsible card design
- Medal rarity system (common, rare, epic, legendary) with color coding
- Progress bars for medals in progress
- Hover effects and animations
- Empty state handling

### QualificationsSection

**Location:** `src/components/dashboard/profile/QualificationsSection.tsx`

**Purpose:** Shows professional qualifications, certifications, and credentials with status tracking.

**Props:**

```typescript
interface QualificationsProps {
  qualifications: Qualification[];
  className?: string;
}
```

**Features:**

- Status-based styling (active, verified, pending, expired)
- Expiration warnings for credentials
- External credential links
- Tag system for categorization
- Detailed qualification information

### AuditLogsSection

**Location:** `src/components/dashboard/profile/AuditLogsSection.tsx`

**Purpose:** Displays chronological audit trail of user activities and system events.

**Props:**

```typescript
interface AuditLogsProps {
  auditLogs: AuditLogEntry[];
  className?: string;
}
```

**Features:**

- Timeline-style layout with type indicators
- Relative timestamp display (e.g., "2 hours ago")
- Expandable details sections
- User attribution for admin actions
- Scrollable list with max height
- Color-coded by event type (success, warning, error, info)

## Type Definitions

### Profile Sections Types

**Location:** `src/types/profile-sections.ts`

Defines comprehensive interfaces for:

- `Medal` - Achievement and medal data
- `Qualification` - Professional credentials and certifications
- `AuditLogEntry` - System and user activity logs
- Component props interfaces for all sections

## Type Definitions (Original)

**Location:** `src/types/group-profile.ts`

All components use strongly-typed interfaces:

- `UserProfile` - User profile data within a group
- `GroupInfo` - Complete group information
- `UserRole` - Role definition with color and permissions
- `GroupListItem` - Simplified group data for sidebar lists
- `XPLevel` - XP level configuration

## Page Implementation

**Location:** `src/app/groups/[groupId]/profile/page.tsx`

**Features:**

- Dynamic routing with group ID parameter
- Responsive layout with mobile sidebar overlay
- Mock data implementation ready for backend integration
- Theme-aware background gradients
- Quick actions section
- Consistent footer

## Backend Integration

### Mock Data Replacement

Replace the mock data in the page component with actual API calls:

```typescript
// Replace this mock data
const mockGroups: GroupListItem[] = [...]

// With actual API calls
const { data: groups } = await api.getUserGroups();
const { data: userProfile } = await api.getUserProfile(groupId);
const { data: groupInfo } = await api.getGroupInfo(groupId);
```

### API Endpoints Needed

1. **GET** `/api/user/groups` - Get all groups for current user
2. **GET** `/api/groups/{groupId}/profile` - Get user profile in specific group
3. **GET** `/api/groups/{groupId}` - Get group information
4. **PUT** `/api/groups/{groupId}/profile` - Update user profile
5. **POST** `/api/groups/join` - Join a new group

### Data Validation

All components expect data in the exact format defined in the type definitions. Ensure backend responses match these interfaces or add data transformation layers.

## Styling Consistency

All components follow the established design system:

- **Colors:** Consistent with Current Implementation document
- **Spacing:** Uses Tailwind spacing scale
- **Typography:** Matches existing font hierarchy
- **Animations:** 200ms hover effects, 300ms layout transitions
- **Borders:** Consistent `rounded-lg` and `rounded-2xl` usage
- **Shadows:** Subtle elevation with backdrop blur effects

## Mobile Responsiveness

- **Sidebar:** Overlay pattern on mobile (< 768px)
- **Cards:** Single column layout on small screens
- **Text:** Responsive sizing with `text-sm md:text-base` patterns
- **Buttons:** Touch-optimized sizes (minimum 44px)
- **Spacing:** Maintained padding and margins across breakpoints

## Accessibility

- **Keyboard Navigation:** All interactive elements are keyboard accessible
- **Screen Readers:** Semantic HTML with proper ARIA labels
- **Color Contrast:** WCAG AA compliant color combinations
- **Focus States:** Visible focus indicators on all interactive elements
- **Alt Text:** Proper alt text for all images

## Performance

- **Images:** Next.js Image component with optimization
- **Animations:** CSS transforms for smooth performance
- **Code Splitting:** Component-level imports
- **Lazy Loading:** Images load as needed

## Usage Example

```typescript
import { ProfileCard, GroupInfoCard } from "@/components/dashboard/profile";
import type { UserProfile, GroupInfo } from "@/types/group-profile";

function MyPage() {
  const userProfile: UserProfile = {
    // ... user data from API
  };

  const groupInfo: GroupInfo = {
    // ... group data from API
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <ProfileCard userProfile={userProfile} />
      <GroupInfoCard groupInfo={groupInfo} />
    </div>
  );
}
```

## Future Enhancements

1. **Real-time Updates:** WebSocket integration for live member counts
2. **Profile Editing:** Inline editing capabilities
3. **Image Upload:** Profile picture and group logo upload
4. **Notifications:** Real-time group notifications
5. **Activity Feed:** Recent group activity display
6. **Advanced Permissions:** Granular permission management UI
7. **Group Analytics:** Charts and statistics for group owners
