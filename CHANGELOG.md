# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-02-16 - 🎉 Major Release

> **Major Release** - Significant new features and architectural changes enabling enhanced element-first interactivity.

### Added

- **WYSIWYG Editor** - Enhances the drag-and-drop capabilities of the Portal editor
  - Redesigns the editor to center around a canvas area that users design in/with

- **Element Linking System** - Images and text elements can now be linked to internal pages or external URLs
  - LinkModal component with dual-tab interface (Page Link / External Link)
  - URL validation for external links with real-time error feedback
  - Linked elements show tooltips on hover displaying page titles or URLs
  - Clicking linked elements navigates to pages (preview mode) or external URLs
  - Link status visible in element controls with visual indicators

- **Element Controls** - Interactive controls for managing canvas elements
  - Edit, Delete, and Link buttons appear on element hover (build mode only)
  - Hover-based UI for cleaner interface
  - All element-related modals (LinkModal, AddTextModal) centralized in ElementControl component
  - Visual feedback showing which element is selected

- **Text Element Editing** - Full WYSIWYG editing for text on canvas
  - Click text element to open AddTextModal with pre-populated values
  - Edit font size and color
  - Update or add text elements directly from canvas
  - Delete text elements with confirmation

- **Image Upload Constraints** - Uploaded images automatically scaled to 50% of container
  - Images maintain aspect ratio while fitting within 50% constraint
  - Users can manually resize after upload

- **Full-Screen Preview Mode** - Canvas scales to full viewport in preview mode
  - Background scrollable with hidden scrollbar (maintains scroll functionality)
  - Elements responsive to full screen dimensions
  - Build mode remains in constrained editor view (80vh x 80%)

- **Space Settings Modal** - Enhanced settings modal with scrollable interface
  - Added `scrollable` prop to ModalWrapper for flexible modal heights
  - Space Settings modal uses 60vh height with vertical scroll
  - All other modals maintain default styling

- **Page Management** - Delete page functionality in AddPageModal
  - Delete button appears when editing existing pages
  - Confirmation dialog prevents accidental deletion
  - Proper error handling and user feedback

### Changed

- **Element Selection Flow** - Refined to distinguish build vs preview modes
  - Hovering shows element controls in build mode
  - Clicking elements navigates (if linked) in preview mode
  - Build mode interactions don't trigger navigation
  - Build mode interactions properly clear selections when needed

- **Header Navigation** - Improved top-level navigation
  - Added "Create a Space" button for logged-in users (header)
  - Portal logo shows on non-authenticated pages with hover tooltip
  - Logo click navigates to home page
  - Semantic `Link` components replacing imperative navigation

- **Spaces Collection Schema** - 

  - Added `guestSessionId` string field for guest tracking

- **User Profile Modal** - Enhanced with space navigation
  - Displays list of user's spaces with role indicators (Owner/Admin)
  - Click space name to navigate to that space
  - Uses server-side `getUserSpaces()` function for data fetching

- **ModalWrapper Component** - Added flexible styling options
  - New `style` prop: `'fullHeight'` (90vh) or `'inline'` (auto height)
  - New `scrollable` prop for 60vh height with scroll
  - Maintains backward compatibility with existing modals

- **Default Build Mode** - Users now enter preview mode by default
  - Only space owners start in build mode
  - Non-owners must double-click to enter build mode
  - Better experience for space visitors

### Fixed

- LinkModal click propagation - Prevents selection clearing when modal is open
- External URL display in LinkModal footer - Now shows correctly after submission
- Text modal editing - Modal no longer closes when clicking text input field
- Element controls z-index - Properly layered beneath pages (z-index: 1200)
- Hover tooltip display - Now shows for both external URLs and internal page links
- Page title resolution - Internal links display actual page titles instead of generic text

### Technical

- Implemented `deleteEntry()` server function in `createContent.server.js`
- Created `AuthPromptModal` for delayed authentication flow
- Refactored element interactions into centralized `ElementControl` component
- Enhanced error handling and user feedback across modals
- Added CSS variables support for theme-aware component styling

### Breaking Changes

- **Full-screen preview mode** - Canvas dimensions change on build/preview toggle
  - Layouts depending on fixed 80vh dimensions may need adjustment

---

## [0.1.0] - 2026-01-XX

Initial release of Portal with core space creation and management features.
