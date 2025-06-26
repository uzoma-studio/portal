# Portal Demo

**Portal** is a modern, extensible webspace builder for creative people. It allows artists, designers, and creators to build interactive digital spaces that capture their creative essence. This project is built with [Next.js](https://nextjs.org/) and [Payload CMS](https://payloadcms.com/), and features a modular, multi-tenant architecture with customizable themes, content types, and a rich admin experience.

## Features

- **Customizable Spaces:** Users can create and manage their own virtual environments ("spaces") with unique themes, backgrounds, and layouts.
- **Rich Content Types:** Support for blogs, shops, chatbots, static pages, and more.
- **Drag-and-Drop Editor:** Visual editor for arranging and customizing content within spaces.
- **Multi-Tenancy:** Each space is isolated, with its own members, content, and settings.
- **Authentication:** User signup, login, and profile management.
- **Payments:** Integration for product sales and subscriptions.
- **Media Management:** Upload and manage images, icons, and other media assets.
- **Responsive UI:** Built with Tailwind CSS and styled-components for a beautiful, modern look.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- PostgreSQL database (for Payload CMS)
- (Optional) AWS S3 or compatible storage for media

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/portal-demo.git
   cd portal-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your database, Payload, and storage credentials.

4. **Run database migrations (if needed):**
   ```bash
   npm run payload migrate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000) to see the frontend.
   - Visit [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload admin dashboard.

## Project Structure

- `src/app/` — Next.js app directory (frontend, API routes, layouts)
- `src/collections/` — Payload CMS collection configs (Spaces, Users, Posts, etc.)
- `src/components/` — Shared React components (Header, Footer, etc.)
- `src/widgets/` — Feature widgets (Space Editor, Authentication, etc.)
- `src/context/` — React context providers (Auth, Space, etc.)
- `src/utils/` — Utility functions and helpers
- `public/` — Static assets (logo, icons, images)
- `templates/` — Starter templates and display modes for spaces

## Customization

- **Themes:** Spaces can be themed via `themeSettings.json` and per-space settings.
- **Icons:** Add SVG or PNG icons to `public/icons/` for use in spaces and content types.
- **Content Types:** Extend or add new types in `src/collections/` and `src/contentTypes/`.

## Scripts

- `npm run dev` — Start the Next.js development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run payload` — Start Payload CMS admin panel
- `npm run ci` — Run migrations and build (for CI/CD)

## Deployment

Deploy on [Vercel](https://vercel.com/). For Payload CMS, ensure your database and storage are accessible in production.

For deployment there is a separate `portal-staging` repo. The current deployment pipeline is to push to the staging branch of this repo, navigate to the `portal-staging` project and pull the changes and deploy that to Vercel to test in a remote staging environment before deploying this repo (`portal-demo`) to production. This  workaround is temporarily being done to circumvent the charges on running branch deployments on Vercel.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

**Portal** is built and maintained by [uzoma.studio](https://uzoma.studio).
For questions, issues, or contributions, please open an issue or pull request!
