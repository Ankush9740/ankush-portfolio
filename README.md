# Ankush — Personal Portfolio

An editorial personal portfolio for Ankush, a BCA student and creative developer. It combines a cinematic introduction, an interactive homepage, project case studies, a skills toolkit, certificates, and direct contact links.

This README covers setup and orientation. New coding agents should begin with [AGENTS.md](AGENTS.md), then use the [documentation index](#documentation).

## Implemented experience

- A session-based ANKUSH introduction with automatic completion, Skip and Escape support.
- Large depth-styled Hero typography, mascot, responsive navigation and resume link.
- An About card composition with pointer/scroll effects.
- Four data-driven Selected Work cards with independent animated visuals and an active-project indicator.
- Shared case-study pages for Quizloom, Autrix, API Sentinel and FilePilot.
- A grouped skills toolkit, scroll-driven Build Lab illustration and certificate gallery/modal viewer.
- Email, GitHub, LinkedIn, resume and footer navigation links.
- Responsive and reduced-motion alternatives for the larger scroll compositions.

The intro is a presentation screen, not a password gate. The portfolio has no authentication service, contact-submission API, database or AI inference integration of its own. Technologies described in case studies belong to the featured projects.

## Stack

Versions below are resolved in [package-lock.json](package-lock.json) at the documentation review on **2026-10-27**; declared ranges are in [package.json](package.json).

| Area | Implementation |
| --- | --- |
| Framework and routing | Next.js 16.3.6, App Router |
| UI | React / React DOM 19.3.0, TypeScript 6.0.3 in strict mode |
| Styling | Tailwind CSS 4.3.3 via PostCSS; authored named selectors in `src/app/globals.css` |
| Motion | Motion 13.4.4 imported from `motion/react`, plus CSS keyframes |
| Icons | Lucide React 1.48.0 and React Icons 5.7.0 |
| Fonts/images | `next/font/google` (Inter and Space Grotesk), `next/image` |
| Lint | ESLint 9.39.5 with Next.js Core Web Vitals and TypeScript configuration |

## Install and run

Use Node.js **20.9.0 or newer** (the installed Next.js package requirement) and npm. The repository does not pin a Node version. Clone/copy the repository, open its root, and run:

```sh
npm ci
npm run dev
```

Open [the local homepage](http://localhost:3000/). Next.js prints the actual port if 3000 is occupied. No environment file is required by the current source. Font setup can require network access when Next.js downloads the configured Google fonts during a fresh build.

## Commands

| Command | Actual script / purpose |
| --- | --- |
| `npm ci` | Install the lockfile dependency set |
| `npm run dev` | `next dev` — local development |
| `npm run lint` | `eslint .` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | `next build` — production build |
| `npm run start` | `next start` — serve an existing production build |
| `git diff --check` | Check whitespace/error markers in the diff; not an npm script |

There is no automated test script or test runner configured. A fresh clone may need Next.js route types generated before typecheck; run development, a build, or `npx next typegen` if generated route-type imports are missing. See [verification and limitations](docs/PROJECT-STATUS.md).

For production locally:

```sh
npm run build
npm run start
```

## Routes and content

| Route | Content |
| --- | --- |
| `/` | Hero, About, Selected Work, marquee, Skills, Build Lab, Certificates, Contact/Footer |
| `/projects/quizloom` | Real-time multiplayer quiz case study |
| `/projects/autrix` | Android visual vehicle intelligence case study |
| `/projects/api-sentinel` | REST API workspace case study |
| `/projects/filepilot` | Local-first Windows file intelligence case study |

The homepage navigation uses anchors rather than separate section routes. All project pages share [one route template](src/app/projects/[slug]/page.tsx) and [project data](src/data/projects.ts). The project card and custom visual registry support additions without duplicating a full card. See the [change guide](docs/COMPONENTS-AND-PAGES.md#where-to-make-changes).

## Structure

```text
src/
  app/
    layout.tsx                  Root document, fonts, metadata, intro bootstrap
    page.tsx                    Homepage entry
    globals.css                 Visual system and responsive styles
    projects/[slug]/page.tsx     Shared case-study route
  components/
    motion/                     FadeIn and Magnetic helpers
    portfolio-shell.tsx         Homepage composition and intro coordination
    project-card.tsx            Common project card
    project-visuals.tsx         Custom visual components and registry
    ...                         Homepage section components
  data/                         Local TypeScript content
  lib/portfolio-intro.ts         Shared intro session-storage key
public/
  assets/                       Served mascot
  certificates/                 Certificate photographs
  projects/                     Project screenshots
  Ankush-Resume.pdf
  favicon.svg
docs/                           Architecture, design, components and status
```

`port.html` and the root `mascot.png` are separate existing artifacts, not App Router inputs. `Reference/` is a local ignored reference-image folder. Do not edit these to change the live Next.js interface.

## Deployment configuration

[next.config.ts](next.config.ts) enables React Strict Mode and disables development indicators. The repository has no static-export setting, custom image loader, provider configuration, Dockerfile or CI/deployment workflow. The verifiable deployment path is the standard Next.js production build and Node.js start command above; no hosting provider or live deployment settings are established by repository configuration.

Preserve the default Next.js image/font pipeline unless a requested hosting target requires a deliberate change. Case-sensitive asset paths matter on non-Windows hosts. External demo/repository URLs in content are outbound links, not deployment configuration for this portfolio. Repository visibility, external service availability and live deployment state were not checked for this documentation task.

## Documentation

| Document | Responsibility |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Agent instructions, constraints, source map and safe workflow |
| [PROJECT-ARCHITECTURE.md](docs/PROJECT-ARCHITECTURE.md) | Routes, rendering, data contracts, assets and integrations |
| [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Actual palette, type, layouts, animations and responsive rules |
| [COMPONENTS-AND-PAGES.md](docs/COMPONENTS-AND-PAGES.md) | Component inventory and where to make specific changes |
| [PROJECT-STATUS.md](docs/PROJECT-STATUS.md) | Implemented behavior, limitations, validation and future work |

Keep the documents synchronized when changing routes, project fields, visual registration, section composition, responsive breakpoints, dependencies or commands. Follow the [maintenance checklist](docs/PROJECT-STATUS.md#keeping-this-handoff-current). No commit, push or deployment is implied by running a local validation command.
