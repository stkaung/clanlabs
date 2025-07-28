AMENDMENTS TO THE CURRENT IMPLEMENTATION DESIGN DOC:

# ✅ Clan Labs Dashboard — Reimagined Layout Design Document (v2)

## 1. Overview

This document defines a complete visual and structural re-design of the existing "Clan Labs" dashboard. While preserving brand tone and functionality, this layout shifts to a more modern, top-bar + collapsible drawer layout, introduces modular content zones, and rethinks information density and workflow ergonomics. It emphasizes clean separation of responsibilities, action discoverability, and adaptive responsiveness, designed for implementation using Tailwind CSS + DaisyUI.

## 2. Visual Theme & Aesthetic

### General Theme:

- Clean, contemporary layout with heavy use of visual contrast, iconography, and subtle shadows
- Rounded, modular UI components styled with DaisyUI’s `glass`, `accent`, and `neutral` themes

### Color Palette:

| Element          | Color       | Hex     |
| ---------------- | ----------- | ------- |
| Background       | Neutral-900 | #0D1117 |
| Cards / Surfaces | Neutral-800 | #161B22 |
| Accent Primary   | Blue-500    | #3B82F6 |
| Positive         | Green-500   | #22C55E |
| Warning          | Red-500     | #EF4444 |
| Text Primary     | White       | #FFFFFF |
| Text Secondary   | Gray-400    | #9CA3AF |

### Typography:

- Font: Inter (fallback to system UI)
- Headings: Semi-bold, tracking-tight
- Body: Regular, tight line-height
- Buttons: Uppercase, bold, letter-spaced

## 3. Global Layout Structure

### High-Level Shift:

Switch to a top navbar + collapsible drawer layout, freeing horizontal space and simplifying navigation.

┌─────────────────────────────────────────────────────────────┐
│ GLOBAL TOP NAVBAR │
├───────┬──────────────────────────────────────────────────────┤
│DRAWER │ PAGE CONTENT AREA │
│ PANEL │ (Tabbed Pages, Widgets, Tables, etc.) │
└───────┴──────────────────────────────────────────────────────┘

## 4. Top Navbar

### Contents:

- Left: Clan Labs Logo
- Center: Breadcrumb (e.g. “Dashboard > Groups”)
- Right:
  - Search Icon
  - Notifications
  - Theme toggle
  - User Avatar w/ dropdown

### Styling:

- `bg-neutral-900`, `shadow-md`, `border-b`, `h-16`
- DaisyUI `navbar` + `dropdown`

## 5. Drawer Sidebar

### States:

- Expanded (desktop)
- Collapsed (mobile or toggle)

### Links:

- Dashboard
- Groups
- Subscriptions
- Settings
- Verification
- Logout

### Styling:

- `bg-neutral-800`, `rounded-r-2xl`, `shadow-lg`, `pt-6`
- DaisyUI `menu` with Lucide icons

## 6. Main Content Area

### A. Page Header

- Page title
- Quick action buttons (e.g., Setup, Refresh)
- Search bar (if applicable)

#### Example:

[🔄 Refresh] [➕ Setup New Group] [🔍 Search Groups]

### B. Group Table

| Group Name        | Role   | Status    | Expires    | Actions       |
| ----------------- | ------ | --------- | ---------- | ------------- |
| Software Ventures | Member | ✅ ACTIVE | 08/11/2025 | [⚙️] [👁 View] |

- DaisyUI `card glass`
- Status: `badge badge-success` / `badge-error`
- Buttons: `btn btn-sm btn-ghost`
- Scrollable with sticky header

## 7. Widgets (Optional)

Top-of-page stat cards:

[🧑‍🤝‍🧑 Total Groups: 12]  
[💼 Active Subs: 8]  
[⏰ Expiring Soon: 2]

- DaisyUI `card`, `bg-neutral-800`, `shadow-lg`

## 8. Footer

Simple footer for larger viewports:

`2025 © Software Ventures Pty Ltd. All rights reserved.`

- `text-sm text-gray-500 text-center py-6`

## 9. Responsiveness & Accessibility

- Fully mobile-adaptive drawer + navbar
- ARIA labels and tab navigability
- Color contrast meets WCAG AA
- Respects reduced motion settings

## 10. Tech Stack Alignment

| Tech       | Plan                               |
| ---------- | ---------------------------------- |
| DaisyUI    | All components                     |
| Tailwind   | Utility-first styling              |
| React/Next | Component + page structure         |
| Lucide     | Consistent icon set                |
| NextAuth   | Future integration (Discord login) |

PREVIOUS:

Design Document: Current Dashboard Implementation (Clan Labs)

## 1. Overview

This document provides a comprehensive and precise description of the current "Clan Labs" dashboard user interface implementation. It details the visual theme, structural layout, all components, text content, interactive elements, responsive behavior, and functional specifications across all breakpoints.

## 2. Visual Theme & Aesthetic

### Color Palette

**Dark Theme:**

- Primary Background: `#0F0F0F` (deepest black-grey for main page background)
- Sidebar Background: `#1A1A1A` (dark charcoal for sidebar container)
- Content Card Background: `#1E1E1E` (slightly lighter dark grey for cards and inputs)
- Secondary Background: `#2A2A2A` (medium dark grey for buttons and borders)
- Primary Text: `#FFFFFF` (pure white for headings and important content)
- Secondary Text: `#A0A0A0` (light grey for descriptions and metadata)
- Tertiary Text: `#6B7280` (medium grey for placeholders and subtle content)

**Light Theme:**

- Primary Background: `#F8FAFC` (very light blue-grey for main page background)
- Sidebar Background: `#FFFFFF` (pure white for sidebar container)
- Content Card Background: `#FFFFFF` (pure white for cards and inputs)
- Secondary Background: `#F3F4F6` and `#F9FAFB` (light greys for buttons and inputs)
- Border Colors: `#E5E7EB` and `#D1D5DB` (light grey borders)
- Primary Text: `#1F2937` (very dark grey for headings)
- Secondary Text: `#6B7280` (medium grey for descriptions)

**Accent Colors:**

- Primary Blue: `#3B82F6` (for primary actions, active states, and "View Profile" buttons)
- Success Green: `#22C55E` (for "Create Group" buttons and positive actions)
- Danger Red: `#EF4444` (for "Logout" button and expired status)
- Warning Orange: `#F59E0B` (for pending status indicators)

### Typography

**Font Family:** Clean, modern sans-serif typeface optimized for screen reading (system default or web-safe sans-serif family)

**Font Hierarchy:**

- Main Headings: `text-xl` to `text-2xl`, `font-bold` or `font-semibold`
- Section Titles: `text-lg`, `font-semibold`
- Body Text: `text-sm` to `text-base`, `font-medium`
- Button Text: `text-sm`, `font-medium`
- Metadata/Captions: `text-xs` to `text-sm`, regular weight

**Text Colors:**

- High contrast white/dark grey for primary content
- Medium opacity grey for secondary information
- Consistent color application across themes

### Visual Language

**Rounded Corners:** Consistent `rounded-lg` (8px) radius applied to:

- All buttons and interactive elements
- Cards and content containers
- Input fields and form elements

**Spacing System:**

- Consistent padding and margin using Tailwind's spacing scale
- `space-y-2` to `space-y-4` for vertical element spacing
- `space-x-2` to `space-x-4` for horizontal element spacing
- `px-4` to `px-6` for container padding
- `py-2` to `py-8` for vertical padding

**Transitions & Animations:**

- `transition-all duration-300` for layout changes (sidebar collapse/expand)
- `transition-all duration-200` for hover states and button interactions
- `hover:scale-105` for interactive elements
- `active:scale-95` for button press feedback
- Smooth opacity transitions for text appearance/disappearance

**Shadow & Elevation:**

- Subtle `hover:shadow-lg` on interactive cards
- Minimal drop shadows maintaining flat design aesthetic
- Emphasis on border definition rather than shadow depth

## 3. Layout Structure

### Responsive Framework

**Desktop Layout (≥768px):**

- Two-column layout with fixed sidebar and flexible main content
- Sidebar: Fixed width (64px collapsed, 256px expanded)
- Main content: Fluid width with max-width container (`max-w-7xl`)

**Mobile Layout (<768px):**

- Single-column layout with overlay sidebar
- Sidebar: Full-height overlay (256px width) with backdrop
- Main content: Full-width with mobile-optimized spacing
- Hamburger menu trigger in top navigation

### Layout Containers

**Root Container:**

- Full viewport height (`min-h-screen`)
- Flexbox layout (`flex`)
- Background color adapts to theme
- Smooth theme transitions

**Main Content Container:**

- Flexbox column layout (`flex flex-col`)
- Full height (`min-h-screen`)
- Overflow handling (`overflow-hidden`)
- Maximum width constraint (`max-w-7xl mx-auto`)

## 4. Component Breakdown

### 4.1 Dashboard Layout (DashboardLayout.tsx)

**Structure:** Root wrapper component managing responsive behavior and theme application.

**Key Features:**

- Responsive sidebar state management
- Mobile overlay backdrop implementation
- Theme-aware background colors
- Automatic mobile detection and sidebar collapse

**Mobile Overlay:**

- Semi-transparent black backdrop (`bg-black bg-opacity-50`)
- Full viewport coverage (`fixed inset-0`)
- Click/touch dismissal functionality
- Z-index layering (`z-40` backdrop, `z-50` sidebar)
- Smooth transition animations

**Footer Implementation:**

- Centered copyright text
- Theme-aware text color
- Consistent vertical spacing (`py-6`)
- Text Content: "2025 © Software Ventures Pty Ltd. All rights reserved."

### 4.2 Dashboard Sidebar (DashboardSidebar.tsx)

**Dimensions:**

- Collapsed: 80px width (`w-20`)
- Expanded: 256px width (`w-64`)
- Mobile: 256px width with overlay positioning

**Logo Section:**

- **Logo Implementation:** Next.js Image component
- **Source:** `/img/logo/mainlogo.png`
- **Dimensions:** 40x40px (collapsed), 32x32px (expanded)
- **Optimization:** `object-contain`, `priority` loading
- **Container:** Centered within bordered section
- **Brand Text:** "Clan Labs"
  - Font: `text-xl font-bold`
  - Color: White (dark theme) / Dark grey (light theme)
  - Visibility: Hidden when collapsed (desktop), always visible (mobile)
  - Animation: Smooth opacity/transform transition

**Navigation Section:**

- **Items Array:**

  1. Dashboard - `fas fa-chart-pie` (active state)
  2. Groups - `fas fa-users`
  3. Analytics - `fas fa-chart-bar`
  4. Settings - `fas fa-cog`

- **Item Styling:**
  - Active: Blue background (`#3B82F6`), white text
  - Inactive: Transparent background, grey text
  - Hover: Subtle background change
  - Icon size: Large (`text-lg`) when collapsed, small (`text-sm`) when expanded
  - Text visibility: Animated appearance/disappearance
  - Spacing: Consistent vertical spacing (`space-y-2`)

**User Profile Section:**

- **User Avatar:**

  - Circular container (`w-10 h-10` expanded, `w-12 h-12` collapsed)
  - Background: Theme-aware grey
  - Icon: `fas fa-user`
  - Positioning: Above user information

- **User Information:**
  - Primary Name: "shin" (`font-semibold text-sm`)
  - Secondary Info: "Wondering_Dev" (`text-xs`)
  - Colors: White/dark grey (primary), light grey (secondary)
  - Text Animation: Smooth opacity transitions with transform effects

**Action Buttons:**

- **Verification Button:**

  - Background: Success green (`#22C55E`)
  - Icon: `fas fa-shield-check`
  - Text: "Verification"
  - Full width when expanded, icon-only when collapsed

- **Logout Button:**

  - Background: Danger red (`#EF4444`)
  - Icon: `fas fa-sign-out-alt`
  - Text: "Logout"
  - Consistent styling with verification button

- **Collapse Toggle:**
  - Background: Theme-aware secondary background
  - Icon: `fas fa-chevron-left` (expanded), `fas fa-chevron-right` (collapsed)
  - Positioning: Bottom of action button group
  - Consistent spacing with other buttons

**Animation System:**

- **Text Transitions:**

  - Opacity: `0` to `100%`
  - Transform: `translate-x-2 scale-95` to `translate-x-0 scale-100`
  - Duration: `300ms` synchronized with sidebar width change
  - Immediate hiding on collapse, delayed showing on expand

- **Width Transition:**
  - Duration: `300ms`
  - Easing: Default CSS easing
  - Overflow: Hidden to prevent text wrapping during transition

### 4.3 Dashboard Top Navigation (DashboardTopNav.tsx)

**Structure:** Fixed-height header bar with responsive content layout.

**Dimensions:**

- Height: 64px (`h-16`)
- Padding: Horizontal 24px (`px-6`)
- Border: Bottom border with theme-aware color

**Left Section:**

- **Mobile Menu Button:**

  - Visibility: Hidden on desktop (`md:hidden`)
  - Dimensions: 40x40px (`w-10 h-10`)
  - Icon: `fas fa-bars`
  - Styling: Theme-aware background and text color
  - Animation: Scale effects on hover/active

- **Page Title:**
  - Primary: "Groups" (`text-base md:text-xl font-semibold`)
  - Secondary: "Manage your organizational groups" (`text-xs`)
  - Secondary text: Hidden on mobile (`hidden md:block`)
  - Colors: Theme-aware primary and secondary text colors

**Right Section:**

- **Search Input:**

  - Visibility: Hidden on extra small screens (`hidden sm:block`)
  - Width: 192px (`w-48`) on small, 256px (`w-64`) on medium+
  - Placeholder: "Search groups..."
  - Icon: `fas fa-search` positioned absolutely in left padding
  - Styling: Theme-aware background, border, and text colors
  - Focus state: Ring effect for accessibility

- **Refresh Button:**
  - Dimensions: 40x40px (`w-10 h-10`)
  - Icon: `fas fa-sync-alt`
  - Styling: Theme-aware button styling matching search input
  - Animation: Hover scale effect

### 4.4 Groups Grid (GroupsGrid.tsx)

**Structure:** Main content display area with header and responsive grid layout.

**Section Header:**

- **Title:** "Your Groups" (`text-2xl font-bold`)
- **Counter:** Dynamic group count with singular/plural handling
  - Format: "{count} group(s) found"
  - Styling: `text-sm` with secondary text color
- **Create Button:**
  - Text: "Create Group"
  - Icon: `fas fa-plus`
  - Background: Success green (`#22C55E`)
  - Typography: `font-medium` white text
  - Animation: Scale and shadow effects on hover

**Grid Layout:**

- **Responsive Breakpoints:**
  - Mobile: Single column (`grid-cols-1`)
  - Tablet: Two columns (`md:grid-cols-2`)
  - Desktop: Three columns (`xl:grid-cols-3`)
- **Spacing:** 24px gap between cards (`gap-6`)

**Empty State:**

- **Container:** Centered content with dashed border
- **Icon:** `fas fa-search` (64px, grey color)
- **Title:** "No groups found" (`text-lg font-medium`)
- **Description:** Dynamic based on search state
  - With search: "No groups match '{query}'"
  - Without search: "You don't have any groups yet"
- **Action Button:** "Create Your First Group" (shown only when no search active)

**Mock Data Structure:**

```typescript
interface GroupData {
  id: string;
  name: string;
  abbreviation: string;
  permissionLevel: string;
  expiryDate: string;
  subscriptionStatus: "ACTIVE" | "EXPIRED" | "PENDING";
}
```

**Sample Data:**

1. Software Ventures (SV) - Member - 8/11/2025 - ACTIVE
2. Development Team (DT) - Admin - 12/25/2025 - ACTIVE
3. Beta Testers (BT) - Member - 3/15/2024 - EXPIRED

### 4.5 Group Card (GroupCard.tsx)

**Structure:** Individual group information card with actions.

**Container:**

- **Styling:** Rounded corners, theme-aware background and border
- **Padding:** 24px all sides (`p-6`)
- **Animation:** Scale effect on hover (`hover:scale-105`)
- **Shadow:** Subtle shadow on hover (`hover:shadow-lg`)

**Header Section:**

- **Group Identification:**
  - Abbreviation: Large, bold text (`text-lg font-bold`)
  - Full Name: Large, semi-bold, secondary color (`text-lg font-semibold`)
  - Layout: Horizontal with space between (`space-x-2`)
- **Permission Level:**
  - Format: "Permission: {level}"
  - Styling: Small text (`text-sm`) with secondary color
- **Status Badge:**
  - Position: Top-right corner
  - Shape: Rounded pill (`rounded-full`)
  - Padding: `px-3 py-1`
  - Typography: `text-xs font-semibold` white text
  - Color Logic:
    - ACTIVE: Success green (`#22C55E`)
    - EXPIRED: Danger red (`#EF4444`)
    - PENDING: Warning orange (`#F59E0B`)

**Details Section:**

- **Expiry Information:**
  - Icon: `fas fa-calendar-alt`
  - Format: "Expires: {date}"
  - Styling: Small text with icon spacing
  - Color: Secondary text color

**Actions Section:**

- **View Profile Button:**

  - Text: "View Profile"
  - Icon: `fas fa-user`
  - Background: Primary blue (`#3B82F6`)
  - Layout: Flex-grow to fill available space
  - Typography: `font-medium text-sm` white text

- **Settings Button:**

  - Icon: `fas fa-cog`
  - Dimensions: 40x40px square (`w-10 h-10`)
  - Background: Theme-aware secondary background
  - Icon Color: Theme-aware secondary text color

- **Button Layout:** Horizontal with spacing (`space-x-3`)
- **Animation:** Scale effects on hover for both buttons

## 5. Responsive Behavior

### Breakpoint System

**Mobile First Approach:**

- Base styles: Mobile (< 640px)
- `sm:` Small screens (≥ 640px)
- `md:` Medium screens (≥ 768px)
- `xl:` Extra large screens (≥ 1280px)

### Mobile Adaptations (<768px)

**Sidebar:**

- Transforms to full-height overlay
- Slide-in animation from left
- Semi-transparent backdrop
- Touch/click dismissal
- Fixed positioning with z-index layering

**Top Navigation:**

- Hamburger menu button becomes visible
- Search input hidden on smallest screens
- Page title reduces in size
- Subtitle hidden on mobile

**Content Grid:**

- Single column layout
- Full-width cards
- Maintained spacing and padding
- Touch-optimized button sizes

**Typography:**

- Responsive text sizing
- Maintained readability across devices
- Appropriate touch targets (minimum 44px)

### Desktop Enhancements (≥768px)

**Sidebar:**

- Smooth width transitions
- Persistent visibility
- Hover states for navigation items
- Animated text appearance/disappearance

**Content Grid:**

- Multi-column responsive layout
- Optimal card sizing
- Enhanced hover effects
- Larger touch targets

**Navigation:**

- Full search functionality
- Enhanced button styling
- Improved spacing and padding

## 6. Interaction Patterns

### Button States

**Default State:**

- Base styling with theme-appropriate colors
- Subtle borders where applicable
- Clear typography hierarchy

**Hover State:**

- Scale transformation (`hover:scale-105`)
- Color transitions for background/text
- Shadow enhancement where applicable
- Smooth transition timing (200ms)

**Active/Pressed State:**

- Scale reduction (`active:scale-95`)
- Visual feedback for user interaction
- Maintains accessibility standards

**Focus State:**

- Keyboard navigation support
- Visible focus indicators
- Ring effects for form inputs
- High contrast outlines

### Animation Timing

**Layout Transitions:** 300ms duration

- Sidebar collapse/expand
- Theme switching
- Layout reflows

**Interactive Feedback:** 200ms duration

- Button hover effects
- Card hover animations
- Scale transformations

**Text Animations:** Synchronized with layout

- Opacity transitions
- Transform effects (translate, scale)
- Staggered appearance for smooth UX

## 7. Theme System

### Theme Detection

- Uses custom `useTheme` hook
- Consistent theme application across all components
- Real-time theme switching capability

### Color Application

- Systematic color variable usage
- Consistent contrast ratios
- Accessibility compliance
- Smooth theme transition animations

### Component Theme Adaptation

- All components respond to theme changes
- Background colors adapt automatically
- Text colors maintain readability
- Border colors adjust for visibility

## 8. Accessibility Features

### Keyboard Navigation

- Tab order optimization
- Focus indicators on all interactive elements
- Logical navigation flow

### Screen Reader Support

- Semantic HTML structure
- Appropriate ARIA labels where needed
- Descriptive alt text for images
- Meaningful button text

### Color Contrast

- WCAG compliant color combinations
- High contrast between text and backgrounds
- Status indicators use both color and text
- Theme-aware contrast maintenance

### Touch Accessibility

- Minimum 44px touch targets
- Appropriate spacing between interactive elements
- Touch-friendly hover states
- Gesture support for mobile interactions

## 9. Performance Optimizations

### Image Optimization

- Next.js Image component usage
- Priority loading for above-fold content
- Proper sizing and aspect ratio maintenance
- WebP format support where available

### Animation Performance

- CSS transforms for smooth animations
- Hardware acceleration utilization
- Efficient transition properties
- Reduced layout thrashing

### Bundle Optimization

- Component-level code splitting
- Efficient import statements
- Minimal external dependencies
- Tree-shaking compatibility

## 10. Development Patterns

### TypeScript Integration

- Strict typing for all props and data structures
- Interface definitions for component APIs
- Type-safe event handling
- Generic type usage where appropriate

### Component Architecture

- Functional component pattern
- Custom hook integration
- Props drilling avoidance
- Reusable component design

### State Management

- Local state for component-specific data
- Prop passing for parent-child communication
- Custom hooks for shared logic
- Minimal state complexity

This implementation represents a modern, accessible, and performant dashboard interface that adapts seamlessly across devices while maintaining consistent design patterns and user experience quality.
