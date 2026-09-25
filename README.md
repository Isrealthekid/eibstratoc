# EIB STRATOC website

Corporate website for EIB STRATOC, presenting its intelligence, surveillance, satellite, cybersecurity and operational support services. Built with Next.js App Router, React and TypeScript.

## Getting started

Requirements: Node.js 20.9 or newer and npm. The minimum Node version follows the installed Next.js package.

From the project directory:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Changes to pages and components reload during development.

No environment variables, database or external API credentials are currently required. Fonts are loaded through `next/font/google`; development and production builds may need network access to fetch them.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build; run the build first. |
| `npm run lint` | Run ESLint across the repository. |
| `npx tsc --noEmit` | Check TypeScript without emitting files. |

There is no configured `npm test` script. Browser-check utilities in `tmp/` are local development helpers, not a portable automated test suite; they may rely on Playwright, Microsoft Edge and machine-specific output paths.

## Technology

- Next.js 16.3.5 with the App Router.
- React 19 and TypeScript.
- Tailwind CSS 4, global CSS and route-specific CSS Modules.
- Framer Motion and GSAP for animation.
- Lucide React icons.
- Geist Sans and Geist Mono through Next.js font loading.

`package-lock.json` records the installed dependency versions. Use `npm ci` for a reproducible installation.

## Pages and routes

| Route | Content |
| --- | --- |
| `/` | Hero, operational metrics marquee, intelligence introduction, partnerships, service cards, and projects and operational impact. |
| `/about` | Company background, vision, mission and operational foundation. |
| `/contact` | Contact details and an enquiry form that opens the visitor's email app with a prepared message. |
| `/services` | Services overview, approach, sticky service panels and the four-stage operational process. |
| `/services/[slug]` | Full service descriptions, supporting sections and enquiry calls to action. |
| `/capabilities` | Capabilities overview and operational timeline. |
| `/capabilities/[slug]` | Short capability summaries using the shared service catalogue. |

Both dynamic route families support these slugs:

- `intelligence-fusion`
- `surveillance-command`
- `geospatial-intelligence`
- `satellite-infrastructure`
- `cybersecurity-data-security`
- `operational-support`

Unknown service or capability slugs render the not-found page. The two route families currently coexist; the capabilities detail pages are separate summaries, not redirects to the full services pages.

## Project structure

```text
app/
  layout.tsx                 Root metadata, fonts and page wrapper
  page.tsx                   Homepage
  globals.css                Shared styling and design tokens
  navigation.tsx             Desktop navigation and mobile dialog menu
  page-experience.tsx        Navigation, transitions, preloader and footer integration
  preloader.tsx              Initial loading experience
  about/                     About page and styles
  contact/                   Contact page, form and styles
  services/                  Overview, full detail routes and styles
  capabilities/              Capabilities overview and summary routes
components/
  home-services.tsx          Homepage service section
  metrics-marquee.tsx        Operational metrics
  organization-marquee.tsx   Partner logos and heading
  site-footer.tsx            Shared footer
  ui/                        Cards, marquees, timeline and other UI components
lib/
  services.ts                Shared service titles, summaries, images and slugs
  service-details.json       Full service copy
  utils.ts                   Shared utilities
public/assets/
  logos/                     Locally stored organisation logos
  services/                  Service photographs, grain texture and source notes
  blueprints/                Supporting illustration assets
EIB-STRATOC-Website-Copy-2026.txt
                             Editorial source document
```

## Editing content

Update `lib/services.ts` for shared service titles, descriptions, image paths and link labels. Update `lib/service-details.json` for the full detail-page headings, introductions, sections, lists and CTA labels. Keep the slugs in both files consistent.

The editorial source is `EIB-STRATOC-Website-Copy-2026.txt`. Sections C2–C8 inform the services overview and detail pages. `tmp/extract-service-details.cjs` is a one-off extraction helper for C3–C8: it overwrites the JSON file and assumes the current text-document format. Review its output before using it to replace manually edited content.

Homepage metrics and partner entries live in their respective components. About-page content and services-overview introductory copy are defined in the page files. Navigation links are maintained in `app/navigation.tsx`; footer links and contact information are maintained in `components/site-footer.tsx`.

## Styling conventions

Shared tokens are defined in `app/globals.css`:

| Token | Purpose |
| --- | --- |
| `--brand-blue` | Primary site blue: `#264b8f`. Use this instead of introducing alternative blue backgrounds. |
| `--section-grey` | Light-grey closing-section background: `#f1f1f1`. |
| `--page-gutter` | Shared horizontal spacing, adjusted for desktop, tablet and mobile. |
| `--font-geist-sans` | Main typography. |

Use CSS Modules for route-specific layout and global CSS for shared components. Match the site's regular-weight typography and rectangular arrow buttons. Keep section edges aligned using `--page-gutter`.

Mark light sections with `data-navigation-surface="light"` so the fixed navigation can switch to a suitable logo and navigation treatment.

Service panels stack on larger, taller screens. Smaller screens and reduced-motion settings use a normal reading flow. The footer uses a sticky reveal where space permits and normal flow on mobile, short screens and reduced-motion settings. Preserve these fallbacks when changing animations or layout.

## Images and assets

Serve local assets from `public/assets/`, referenced as `/assets/...` in components. Logos are stored in `public/assets/logos/`; service photography is stored in `public/assets/services/`.

Review the `SOURCES.md` files in those directories when replacing assets or preparing a release. Service photographs are illustrative and should not be presented as verified photographs of EIB STRATOC facilities. Preserve descriptive alternative text for meaningful images and empty alternative text for decorative images.

## Validation and release

Before releasing a change:

1. Run `npm run lint` and `npx tsc --noEmit`.
2. Run `npm run build` and resolve build errors.
3. Preview the production build with `npm start`.
4. Check desktop and mobile navigation, service links, sticky panels, footer visibility, keyboard focus and reduced-motion behavior.
5. Confirm content, asset permissions and contact destinations.

The application uses the standard Next.js server build. No static-export or hosting-provider configuration is currently defined. Deploy to an environment that supports the installed Next.js version, installing dependencies and building before starting the server.

## Remaining work

- `/partners`, `/news` and `/projects` are linked from the interface but do not currently have page implementations.
- The contact form prepares a `mailto:` message for the visitor to send in their email app. An enquiry backend is needed if submissions should happen directly on the site.
- No CMS, authentication or database integration is implemented.
- Root metadata in `app/layout.tsx` still needs final editorial review.
- Confirm service claims, certifications, organisation relationships and image usage before publication.

## Contributor notes

Read `AGENTS.md` before making changes. This repository uses a Next.js version whose APIs and conventions may differ from older releases. Consult the installed documentation under `node_modules/next/dist/docs/` for the relevant feature before implementing changes.
