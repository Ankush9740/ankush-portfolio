<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio agent handoff

Last source review: **2026-10-27**. This file is the entry point for Codex, Claude Code, Gemini CLI, Cursor, and other coding agents. The repository is the source of truth; documentation describes the inspected implementation, not a roadmap or a guarantee of live deployment behavior.

## Project and stack

Ankush's personal portfolio presents a cinematic introduction, an editorial homepage, four flagship projects and their case studies, skills, certificates, and contact links. It is a Next.js App Router application with local TypeScript content and public assets. The introductory screen is presentation, **not authentication**.

The lockfile resolves Next.js 16.3.6, React/React DOM 19.3.0, TypeScript 6.0.3, Motion 13.4.4 (`motion/react`), Tailwind CSS 4.3.3, ESLint 9.39.5, Lucide React 1.48.0, and React Icons 5.7.0. Use [package.json](package.json) and [package-lock.json](package-lock.json) for current versions. Next.js declares Node.js `>=20.9.0`; this repository has no Node version pin or `engines` field of its own.

## Read before changing

1. Inspect `git status --short` and preserve work already present.
2. Read the applicable documents below and the components/data they describe.
3. For framework changes, read the relevant installed guide under `node_modules/next/dist/docs/` as required by the preserved Next.js block above. Do not replace installed-version guidance with assumptions from another Next.js release.
4. Make the smallest change that satisfies the request. Update documentation when the behavior or file mapping changes.

| Document | Read it for |
| --- | --- |
| [README.md](README.md) | Setup, commands, structure, deployment boundaries, documentation index |
| [Architecture](docs/PROJECT-ARCHITECTURE.md) | Server/client composition, routes, data contracts, visual registry, assets |
| [Design system](docs/DESIGN-SYSTEM.md) | Actual tokens, typography, selector ownership, motion, breakpoints |
| [Components and pages](docs/COMPONENTS-AND-PAGES.md) | Component inventory, props, dependencies, where to make changes |
| [Project status](docs/PROJECT-STATUS.md) | Implemented behavior, source-confirmed limitations, verification scope, maintenance |

## Files and component architecture

| Location | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Root document, metadata, Inter/Space Grotesk font variables, global CSS, shared cursor, returning-session intro bootstrap |
| `src/app/page.tsx` | Homepage server entry; passes a UTC year to `PortfolioShell` |
| `src/app/projects/[slug]/page.tsx` | Shared server-rendered case study, static project params, metadata, unknown-slug `notFound()` |
| `src/app/globals.css` | All authored component styles, project-specific visual keyframes, responsive overrides |
| `src/components/portfolio-shell.tsx` | Client homepage composition, intro session state, section visibility, initial hash restoration |
| `src/components/portfolio-intro.tsx` + `src/lib/portfolio-intro.ts` | Cinematic intro lifecycle and shared session-storage key |
| `src/components/projects-section.tsx` | Sticky project stack, shared scroll progress and active-project HUD |
| `src/components/project-card.tsx` | Shared project header, descriptions, custom visual slot, technology pills and links |
| `src/components/project-visuals.tsx` | Independent custom visuals and the typed `projectVisuals` registry |
| `src/components/motion/` | Reusable `FadeIn` and `Magnetic` helpers |
| `src/data/` | Portfolio copy, navigation, visibility switches, projects, skills, certificates, socials |
| `public/` | Served images, resume PDF and favicon |

Homepage composition is `Hero → AboutSection → ProjectsSection → EditorialMarquee → SkillsSection → BuildLabSection → RecognitionSection → ContactFooter`. `RootLayout` mounts one shared `CustomCursor` directly under `body`, outside route content, for the homepage and all case studies. `Hero` contains the homepage navbar; case studies have their own header. `JourneySection` exists but is not mounted. Do not enable it as part of unrelated work.

## Routing and data conventions

- `/` is the homepage; `#about`, `#work`, `#skills`, `#lab`, `#certificates`, and `#contact` are anchors, not separate pages. `#top` is the Hero anchor.
- Current project routes are `/projects/quizloom`, `/projects/autrix`, `/projects/api-sentinel`, and `/projects/filepilot`. There is no `/projects` index route.
- The dynamic page awaits `params: Promise<{ slug: string }>` and calls `getProject()`. Preserve this installed-version pattern.
- Keep common project content in `src/data/projects.ts`. Use `getProjectLinks()` for card and case-study buttons; optional demo/download buttons are omitted when absent.
- For a new project, add its data object, dedicated visual component/registry key, prefixed CSS/keyframes, and screenshots/case-study content. Reuse `ProjectCard` and the shared route. Follow the detailed workflow in the [component guide](docs/COMPONENTS-AND-PAGES.md).
- `ProjectVisualId` derives from the registry keys. Preserve the safe `null` fallback for an unknown runtime visual ID.
- Order, total count, and small card positions derive from the projects array. The large `number` and case-header number are explicit data strings: keep them consistent when adding or reordering projects.
- Section visibility flags do not automatically filter navigation. Check anchors if hiding a section.
- Asset URLs omit `public`, e.g. `/projects/Autrix/autrix-home.jpeg`. Preserve exact case, spaces, extensions, and natural image ratios for case-sensitive hosting.

## Styling and design constraints

- Preserve the paper/ink/red editorial identity, oversized headings, thin rules, pill controls, established mascot placement and whitespace. See the [actual token table](docs/DESIGN-SYSTEM.md).
- Tailwind v4 is imported through PostCSS, but the authored interface uses named global selectors. There are no CSS Modules or `tailwind.config.*` files. Inspect selector specificity and later media overrides before changing styles.
- Use project prefixes for custom visuals (`quizloom-*`, `autrix-*`, `api-sentinel-*`, `filepilot-*`). Scope one-project case-study changes with `.case-study-project-<slug>` or `.case-media-<slug>`.
- Keep screenshots readable and preserve content. Autrix uses equal-width portrait viewports with `object-fit: contain`; do not introduce cropping or distortion without a direct request.
- Avoid new visual systems, neon colors, excessive glow, decorative gradients, or unnecessary effects. Preserve existing restrained effects unless changing them is the request.
- Reuse existing components and dependencies. Do not perform unrelated cleanup or refactors.

## Animation and responsive requirements

- Use the existing Motion APIs, MotionValues, CSS keyframes and helpers. Keep animations smooth and restrained, and avoid React state updates on every animation frame.
- Preserve the Selected Work scroll height/sticky/card transition relationship. Its active HUD derives from stack progress, not an IntersectionObserver; consult the architecture guide before altering thresholds.
- Respect `prefers-reduced-motion` in both JavaScript and CSS. Existing coverage is substantial but incomplete; do not claim every Motion entrance is disabled. Preserve static project/lab fallbacks.
- Maintain desktop, tablet, mobile, touch, keyboard and reduced-motion behavior. Breakpoints include 1080, 820, 600 and 560 CSS pixels, with a short-height 560px query.
- For layout work, inspect relevant widths (1440, 1280, 1024, 768, 600, 390 and 360px), forward/backward scrolling, image/caption fit, keyboard focus and horizontal overflow. These are a recommended regression matrix, not automated tests.
- The intro spans the root bootstrap, shell, intro component, shared storage key and CSS. Read all of them before changing its lifecycle. Keep Skip/Escape and returning-session behavior.
- There is no global route-transition framework. Do not mistake the intro or local `FadeIn` effects for one.

## Commands and verification

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
git diff --check
```

`dev` runs `next dev`; `lint` runs `eslint .`; `typecheck` runs `tsc --noEmit`; `build` runs `next build`; `start` runs `next start` after a build. There is no `test` script, unit/E2E runner, or CI workflow in the inspected repository. Do not invent passing tests.

Run checks relevant to the change. Application changes normally need lint, typecheck and production build, plus targeted manual verification for changed interactions/layouts. Documentation-only changes need path/link/source consistency and sensitive-data checks; no application build is required solely for Markdown edits. Record what actually ran and disclose unverified browser checks.

Next.js generates `next-env.d.ts` and `.next` route types; do not hand-maintain them. A fresh typecheck can depend on route types generated by `next dev`, `next build`, or `next typegen`. A build can update ignored artifacts and generated imports; review status afterward.

## Boundaries for future agents

- Do not modify unrelated sections, existing project visuals, approved layouts or content while making targeted changes.
- Do not expose environment secrets, copy credentials into docs, or add `NEXT_PUBLIC_` secrets. No runtime environment variables are currently referenced by `src`; retain `.env*` ignore protection.
- The showcase describes independent apps; their databases, Workers, vision models and APIs are not dependencies of this portfolio runtime. Do not claim backend integrations exist here.
- Do not automatically commit, push, deploy, merge, delete branches or switch branches. Take those actions only when the user explicitly requests them.
- Preserve user changes; avoid destructive Git operations and unsolicited dependency upgrades.
- Explain changed files, resulting behavior, checks and limitations clearly.

`CLAUDE.md` currently points to `@AGENTS.md` locally and remains ignored. Keep this file and the linked docs useful without relying on a tool-specific memory file. Keep the generated Next.js block at the top intact.
