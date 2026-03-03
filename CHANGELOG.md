# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/uzoma-studio/portal/compare/v0.3.0...v0.4.0) (2026-03-03)


### Features

* add BackgroundColorButton for changing background color in toolbar ([d54a84b](https://github.com/uzoma-studio/portal/commit/d54a84bcf1db4e7db8feefe78397887336fe8fa0))
* add changelog for version 0.3.0 with major updates and enhancements ([92e5720](https://github.com/uzoma-studio/portal/commit/92e572011782777376fb4dfb9c92f6002dee9868))
* add draft saving on image and text deletion in ElementControl ([69ce2e3](https://github.com/uzoma-studio/portal/commit/69ce2e3db7419400aed84e7c3f91f3346798af95))
* add FeaturedSpaces collection and integrate into fetching logic ([b6753d2](https://github.com/uzoma-studio/portal/commit/b6753d299c4cf5ee6629b277f2ae633b823e5832))
* add file size validation and improve error handling in image upload ([8cca9e7](https://github.com/uzoma-studio/portal/commit/8cca9e74211bd09f50d1c4b0dc438e0390948c38))
* add image size selection and update ImageNode to support size property ([7e90f34](https://github.com/uzoma-studio/portal/commit/7e90f349149b00dea370be204f668c65bd933acf))
* add image upload functionality and create ImageNode for rich text editor ([1ac5261](https://github.com/uzoma-studio/portal/commit/1ac52611883f7d9648cd98577ea20febca43e2ce))
* add UI response on page create ([5f880dc](https://github.com/uzoma-studio/portal/commit/5f880dcd0bb4e4ceaca3cf04ade5d22dc1be8efb))
* add zIndex prop to ModalWrapper and StyledModalOverlay for better modal stacking ([6bc41cc](https://github.com/uzoma-studio/portal/commit/6bc41cc1fff42f94d3307be1affd145c29e78248))
* adds how-to-use space directions as default text values for Spaces collection ([6cc6242](https://github.com/uzoma-studio/portal/commit/6cc62427c48303a0164d9cf8fb1c19668df6f301))
* changes social card image ([a31f788](https://github.com/uzoma-studio/portal/commit/a31f7883e2a31b6f9ed026198546f172c2321e88))
* conditionally render edit button for text elements in ElementControl ([426524f](https://github.com/uzoma-studio/portal/commit/426524f34cdd744e1320ef11503a97e68b696a8b))
* create a page directly from the LinkModal ([ab09069](https://github.com/uzoma-studio/portal/commit/ab090698214ec4a1a2b52d070da17690910b6bc7))
* created migrations for schema changes ([5b7d02e](https://github.com/uzoma-studio/portal/commit/5b7d02e91540e8eafa7c7dafa421b3c7ea70a613))
* enhance draft saving functionality to include settings in useSaveDraft hook and related components ([8fe2285](https://github.com/uzoma-studio/portal/commit/8fe22851a95130402bb16c25c39e51d356fd744d))
* enhance image deletion process and update Spaces collection schema ([e9ac52e](https://github.com/uzoma-studio/portal/commit/e9ac52e5b8c83670455c98b86e36c36c90862462))
* enhance saveDraft functionality to accept updated values for images and texts ([5a3bc21](https://github.com/uzoma-studio/portal/commit/5a3bc21a86da2662f9f43daa2cbfc876d987e0c4))
* implement custom image converter in RichText component ([ad169ad](https://github.com/uzoma-studio/portal/commit/ad169ad5e34c3ed8dd14721c39182fbce99d2d84))
* implement draft saving and loading functionality for space edits ([4d47c73](https://github.com/uzoma-studio/portal/commit/4d47c7335124c35ef2f05fa60f10cfb12e8ca829))
* implement draft saving functionality using useSaveDraft hook and update related components ([666c8f0](https://github.com/uzoma-studio/portal/commit/666c8f0d90c0e9f3bc32aaeebda6c8cd7e86bcdd))
* implement PagesSidebar component and integrate with ActionControls for page navigation ([881c3e1](https://github.com/uzoma-studio/portal/commit/881c3e188ca45d2220b7d7a7c91ad458b98fe609))
* integrate saveDraft functionality in AddTextModal for text updates and additions ([977b02a](https://github.com/uzoma-studio/portal/commit/977b02ac1be1c0070cae70d2c6ee17b73515f931))
* simplify EditSpaceModal by removing unused settings ([438a67e](https://github.com/uzoma-studio/portal/commit/438a67ea32d6a9e790fdb7f390d048929982b4b8))
* update BackgroundColorButton to use settings for theme style and improve state management ([2675dc0](https://github.com/uzoma-studio/portal/commit/2675dc08fd9e02d76244ec02219e944324613c5d))
* update cursor behavior in StyledSpaceImage and StyledSpaceText for improved user interaction ([dd3f3fe](https://github.com/uzoma-studio/portal/commit/dd3f3fea7002684a9d373bfd8303746d97967c83))
* Update to landing page copy and design ([93a16ee](https://github.com/uzoma-studio/portal/commit/93a16ee7b23ae298dd8565eb85c20c3297343293))
* users can now edit space name and description from settings modal ([69a8e12](https://github.com/uzoma-studio/portal/commit/69a8e12ae1391bfedc69161bbf055813d4710cc7))


### Bug Fixes

* correct rendering of portalLogo ([2b52867](https://github.com/uzoma-studio/portal/commit/2b52867f9043ebfcd5d78afd4d5a8f97d7c45a9e))
* prevent modal closure on click and double-click events in AddTextModal ([5f83d98](https://github.com/uzoma-studio/portal/commit/5f83d98b25b7c935f2227113c1144f6dfd355008))
* prevent modal closure on container click in AddTextModal ([9ae222f](https://github.com/uzoma-studio/portal/commit/9ae222fd1872737b49aa876b2fb60f41a3b5c02f))
* update linkToPage handling in RenderSpaceImages for correct page ID usage ([fba1f47](https://github.com/uzoma-studio/portal/commit/fba1f47ef0c889806f996739f8d689151a817d8e))

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
