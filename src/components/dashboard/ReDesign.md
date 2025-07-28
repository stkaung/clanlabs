📘 Re-Design Document: Clan Labs Dashboard (2025 Modernized UI/UX)

1. Overview
   This design document proposes a complete reimagining of the Clan Labs dashboard UI. The new layout maintains functional parity with the existing version but improves visual hierarchy, usability, responsiveness, and scalability. It is built with modern SaaS best practices in mind — favoring clarity, simplicity, and smooth user flow.

2. Visual Theme & Aesthetic

Design Philosophy:
A refined, professional dark theme with generous spacing, clear contrast, and elevated visual feedback to guide user interaction without clutter.

Color Palette:

- Background (global): #0F0F0F
- Sidebar: #1A1A1A
- Cards / Containers: #1E1E1E
- Primary text: #FFFFFF
- Secondary text: #A0A0A0
- Accent Blue: #3B82F6
- Success Green: #22C55E
- Danger Red: #EF4444
- Border/Divider: #2A2A2A

Visual Style:

- Neumorphic shadows used sparingly for depth
- Card-based layout
- Subtle gradients on hover/active states
- Minimalist outline icons
- Smooth animations & micro-interactions

3. Layout Structure

Full-page structure: Sidebar (left) + Main Content (right), responsive, flex-based or grid-based layout. Sidebar collapsible on smaller screens. Top navigation bar added for context clarity.

4. Sidebar Navigation

Fixed vertical sidebar containing:

- Logo + "Clan Labs" branding
- Nav links: Dashboard, Groups, Analytics, Settings (with icons)
- User Panel: Avatar, name ("shin"), role ("Wondering_Dev")
- "Verification" button (blue/green pill with icon)
- "Logout" button (red pill with icon)

Hover/click animations with glowing borders. Sidebar collapses to icons only on mobile.

5. Top Navigation Bar (New)

Located above the main content:

- Left: Page title (e.g., “Groups Overview”)
- Right: Search input, Refresh icon, Theme toggle (🌗)

6. Main Content Area

All content wrapped in a centered max-width container.

Section Header:

- Title: “Groups Overview”
- Subtext: “Manage your organizational groups”
- Action: "+ Create Group" (green CTA button)

Search + Filters:

- Full-width search input with icon
- Filter dropdown: “All Statuses”, etc.
- Refresh button (circular)

Groups Display:
Card-based layout (1 per group), replacing traditional table. Each card includes:

- Group name + abbreviation
- Permission level
- Expiry date
- Status tag (e.g., ACTIVE - blue pill)
- Action buttons: View Profile, Settings (icon)

Cards are styled with padding, border-radius, hover elevation, and responsive wrapping.

Optional: Toggle between Card view and Table view.

7. Footer

Centered footer at page bottom:
"2025 © Software Ventures Pty Ltd. All rights reserved."
Light gray text, small font.

8. Responsiveness & Accessibility

- Mobile-first: Collapsing sidebar + stacked layout
- Full keyboard + screen reader support (ARIA, role, tabIndex)
- Touch-friendly hitboxes
- Uses rem/em units for scalable text

9. Implied Functionality

- Live group search
- Create Group wizard
- Group detail navigation (View Profile)
- Verification status clickable badge
- Logout confirmation modal
- Theme toggle with localStorage persistence
- Refresh button hooks into SWR cache mutation

10. Future Enhancements

- Drag-and-drop group reordering
- Recent activity feed
- Calendar view of expirations
- Bulk action selection
- Internationalization support

Summary
This redesign brings Clan Labs in line with 2025 UI/UX standards—modern, accessible, beautiful, and extensible. Designed to scale with your users and features while keeping a premium feel.
