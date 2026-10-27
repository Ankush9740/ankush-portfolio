# Design System

Last source review: **2026-10-27**.

This describes the implemented portfolio, not a proposed redesign. Values and behaviors were checked against source; it does not certify a fresh browser or accessibility audit.

Start with [AGENTS.md](../AGENTS.md) and [README](../README.md). See [architecture](PROJECT-ARCHITECTURE.md), [components and pages](COMPONENTS-AND-PAGES.md), and [project status](PROJECT-STATUS.md) for ownership, change recipes, and limitations.

## Identity and source of truth

The portfolio uses oversized editorial lettering, warm paper surfaces, near-black sections, thin rules, small uppercase labels, and restrained red accents. The illustrated Ankush mascot anchors the opening and closing compositions. Rounded project sheets, certificate cards, and interface demonstrations provide depth through borders and soft shadows.

Theme is assigned by section and project tone. There is no implemented user-controlled light/dark switch.

| Source | Responsibility |
| --- | --- |
| [`src/app/globals.css`](../src/app/globals.css) | All application CSS, tokens, layouts, media queries, keyframes, hover/focus styling |
| [`src/app/layout.tsx`](../src/app/layout.tsx) | Inter and Space Grotesk loading and global CSS import |
| [`src/components/`](../src/components/) | Motion values, scroll/pointer interactions, timing, semantic markup |
| [`src/data/`](../src/data/) | Content and data choices that determine variants |
| [`postcss.config.mjs`](../postcss.config.mjs) | Tailwind PostCSS integration |

`globals.css` imports `tailwindcss`, but named classes and handwritten CSS implement the current design. There is no separate token generator, CSS-module system, or component-theme package. Tailwind default breakpoint names do not control these layouts.

## Tokens and palette

These are the actual `:root` variables in `globals.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#f2f0eb` | Light surfaces; light text on dark surfaces |
| `--paper-deep` | `#e8e4dc` | Selected Work section |
| `--ink` | `#0d0d0d` | Dark sections, rules, lettering |
| `--text` | `#111111` | Default body text |
| `--muted` | `#74716b` | Supporting text and labels |
| `--red` | `#c93434` | Numbers, status accents, focus |
| `--line` | `rgba(13, 13, 13, 0.18)` | Rules on light surfaces |
| `--line-light` | `rgba(242, 240, 235, 0.2)` | Rules on dark surfaces |
| `--radius-sm` | `0.6rem` | Small windows and controls |
| `--radius-md` | `1.25rem` | Cards, media, mobile dialogs |
| `--radius-lg` | `2.25rem` | Project stage and large dialog |
| `--ease-premium` | `cubic-bezier(0.76, 0, 0.24, 1)` | CSS movement and some exits |

Other colors are local values, not global tokens: `#171717` About cards, `#e5e0d6` Build Lab, `#ddd8cf` certificate cards, and `#f7f5ef` screenshot/caption surfaces. Project demonstrations have scoped accents: Quizloom/API Sentinel blue `#3155e7`, Autrix muted blue-gray `#557b94` and related shades, and FilePilot green/orange `#214e3a` / `#c18a5b`.

Selection uses paper text on red. Borders generally use a token or `currentColor` so light/dark variants inherit the right foreground.

## Typography

[`layout.tsx`](../src/app/layout.tsx) loads Latin subsets with `display: "swap"`. Inter exposes `--font-inter` for the body and intro; Arial/sans-serif are body fallbacks. Space Grotesk exposes `--font-space` for editorial headings, project titles, and selected interface labels. Build Lab code uses system monospace fallbacks.

There is no universal heading scale. Each composition has tuned `clamp()`, line-height, and tracking. Read the final matching selector and media override before editing.

| Element / selector | Current desktop rule | Behavior |
| --- | --- | --- |
| `.label` | `0.72rem`, weight `650`, tracking `0.12em`, uppercase | Muted supporting label |
| `.intro-name` | `650 clamp(4.25rem, 17vw, 16rem) / 0.76`, tracking `0` | Inter; separate letter masks have padding/margins |
| `.hero-name` | `620 clamp(6.6rem, 19.7vw, 24rem) / 0.74`, tracking `0` | ANKUSH wordmark with depth layers |
| `.projects-heading h2` | `clamp(4.25rem, 8.2vw, 9rem)`, line-height `0.82`, tracking `-0.05em` | Centered desktop single line |
| `.project-card h3` | `600 clamp(2.8rem, 6vw, 6rem) / 0.9`, tracking `-0.035em` | Main card title |
| `.skills-heading h2` | `clamp(3.6rem, 8.7vw, 8.75rem)`, line-height `0.92`, tracking `-0.035em` | Explicit two-line center heading |
| `.build-lab-intro h2` | `620 clamp(4rem, 11.2vw, 11.5rem) / 0.78`, tracking `0.01em` | Desktop nowrap, mobile wrap |
| `.recognition-heading h2` | `clamp(3.2rem, 7.2vw, 7.5rem)`, line-height `0.92` | Two lines; inherits shared tracking `-0.085em` |
| `.contact-cta h2` | `520 clamp(4rem, 10.5vw, 11rem) / 0.84`, tracking `-0.085em` | Three explicit lines; GREAT is red |
| `.case-hero h1` | `620 clamp(5rem, 18vw, 18rem) / 0.75`, tracking `-0.04em` | Left-origin `scaleX(0.925)`, nowrap above 560px |
| `.case-narrative h2` | `600 clamp(2rem, 4.2vw, 4.8rem) / 1.03`, tracking `-0.035em` | `max-width: 12ch` |
| `.case-study-project-autrix .case-narrative h2` | `clamp(2.4rem, 3.7vw, 4.3rem)`, line-height `1.04` | Balanced `14ch` wrapping; `16ch` below 820px |

Avoid broad tracking changes to solve one word. Several headings share a base rule before overrides. Preserve deliberate `<br />` breaks and inspect glyph separation and long titles at narrow widths.

## Layout, spacing, and surfaces

There is no global maximum-width container or named spacing scale. Most sections use page gutters `clamp(1rem, 3vw, 3rem)` and their own vertical clamps. Hero gutters narrow to `0.9rem` at 560px. Layouts use `svh`, `vw`, `rem`, Grid, and Flexbox.

| Composition | Governing rules |
| --- | --- |
| Hero | `.hero`: three-row grid, minimum `100svh`; centered mascot above the wordmark; bottom ruled support row |
| About | `.about-section` / `.about-field`: tall field with rotated absolute cards and elliptical connector; grid at 1080px |
| Selected Work | `.project-stage`: sticky `top: 1rem`, `height: calc(100svh - 2rem)`; clipped rounded stage with absolute full-size cards |
| Card rhythm | Four grid rows: header, descriptions, flexible middle visual, tech pills; gap `clamp(0.75rem, 1.4vh, 1rem)`; desktop vertical padding `clamp(1.5rem, 2.3vh, 2rem)` |
| Skills | Group title plus bordered item grid; item columns `repeat(auto-fit, minmax(12rem, 1fr))` |
| Build Lab | Scroll area `380svh`; full-viewport sticky presentation, minimum height `42rem`; normal-flow static fallback |
| Certificates | Layered desktop cards; mobile scroll-snap rail; dialog width `min(66rem, 96vw)`, max-height `90svh` |
| Contact | `1.3fr / 0.7fr` columns, minimum right width `22rem`; center alignment; minimum height `85svh` |
| Case studies | Page-tone wrapper and gutters; ruled two-column engineering/narrative grids before collapse |

Project visuals have established individual dimensions. Desktop transforms include `translateY(18px)` and scale factors Quizloom `1.4`, Autrix `1.16`, API Sentinel `1.3`, FilePilot `1.24`. Their mobile overrides differ. Preserve these unless the task specifically concerns scale or position.

### Screenshot galleries

See [`src/app/projects/[slug]/page.tsx`](../src/app/projects/[slug]/page.tsx), [`src/data/projects.ts`](../src/data/projects.ts), and `.case-media*` rules.

- Quizloom uses `case-gallery-desktop`: a full-width first image followed by two columns with screenshot-specific frame ratios.
- API Sentinel and FilePilot have scoped two-column rules; FilePilot frames use `1535 / 827`.
- Autrix uses `.case-media-autrix.case-gallery-mobile` even for its desktop three-column presentation. Desktop has equal columns, maximum width `96rem`, top alignment, and gaps `clamp(1.25rem, 2.4vw, 2.25rem)`.
- Autrix order is Audi R8, Home, Toyota Fortuner. Shared frames use `750 / 1600`; images use 100% width/height, `object-fit: contain`, and centered positioning. Complete images remain visible; tiny neutral space can accommodate differing source ratios.
- Autrix captions remain associated with each image and have desktop `min-height: 8.5rem`. At 820px, Home is centered above the two results. At 600px cards stack, Home first, within `min(100%, 23rem)`.
- Autrix currently has no showcase intro header: optional `mediaHeading` / `mediaDescription` data are absent. CSS support remains but does not render text by itself.

## Navigation, buttons, and hover interactions

| Element | Styling and behavior |
| --- | --- |
| Header navigation | Uppercase links in a three-column header with bottom rule; red underline grows on hover; mobile uses native `<details>` / `<summary>` |
| Explore link | Bordered pill; hover reverses ink/paper foreground/background over 220ms |
| Project links / tech pills | Thin outlined pills, small uppercase type, wrapping flex rows; links remain real anchors or Next links |
| About cards | Focus and eligible mouse hover lift 6px and strengthen border/background/shadow; scroll sets `.is-orbit-active` |
| Skills | Mouse-only magnetic wrapper; item hover/focus lifts `0.25rem` and fills the icon red |
| Certificates | Hover/focus brings a card forward, straightens/enlarges it, and moves siblings aside; click opens the viewer |
| Contact rows | Fixed geometry/separators; subtle text, border, icon emphasis and dash-to-arrow movement; no floating rectangle |
| Case external links | Outlined bottom-page pills inheriting the case tone |
| Intro skip | Text brightens and arrow shifts; minimum button height `2.75rem` |

Reuse existing interactive elements and preserve keyboard focus. Hover is supplementary. Avoid changing list-row width, padding, or scale during hover if it moves separators.

## Depth, backgrounds, and layering

- The Hero wordmark uses a restrained dark gradient, closely stepped pseudo-element text shadows for extrusion, a subtle highlight, and a soft drop shadow. Existing isolation/stacking keeps the mascot in front.
- Intro ambient drift, light pass, and masked grid are faint. About and Build Lab use low-opacity grids. Preserve their restraint rather than adding stronger effects elsewhere.
- Sections alternate paper and ink. About/certificate cards use physical-looking shadows and rotations; neon, glass, and decorative mockup frames are not the established language.
- Important layers include intro `z-index: 1000`, cursor `9999`, certificate backdrop `100`, and Selected Work HUD `40`. Other layers are local to compositions.
- `html` and `body` use `overflow-x: clip`; stages also clip intentionally. This is not proof content fits: verify content is not merely hidden by clipping.

## Animation and transitions

The library is `motion`, imported from `motion/react`; source does not import `framer-motion`. CSS keyframes handle project loops and mascot breathing. Motion values, transforms, springs, viewport state, and `AnimatePresence` handle interactions and local transitions.

| Animation | Source and behavior |
| --- | --- |
| Reusable reveal | [`motion/fade-in.tsx`](../src/components/motion/fade-in.tsx): opacity/24px upward entry, 0.7s, once at viewport amount 0.18; reduced motion skips entry |
| Magnetic wrapper | [`motion/magnetic.tsx`](../src/components/motion/magnetic.tsx): default strength 9, spring stiffness 220/damping 18; mouse only, disabled for reduced motion |
| Intro | [`portfolio-intro.tsx`](../src/components/portfolio-intro.tsx): masked letter rise, rule and travelling dot; completes after 1750ms then exits upward over 0.75s; reduced version completes after 100ms with 0.12s fade |
| Return visit | [`portfolio-shell.tsx`](../src/components/portfolio-shell.tsx) and [`layout.tsx`](../src/app/layout.tsx): session completion bypasses the intro and allows a small Hero refresh entrance |
| Hero | [`hero.tsx`](../src/components/hero.tsx): entry layers, mouse parallax/proximity scale, scroll scale/support fade, CSS breathing |
| About | [`about-section.tsx`](../src/components/about-section.tsx): pointer springs, scroll field translation/orbit, active-card highlighting |
| Selected Work | [`projects-section.tsx`](../src/components/projects-section.tsx) / [`project-card.tsx`](../src/components/project-card.tsx): sticky incoming sheets driven by shared progress; HUD derives active index from it |
| Project demos | [`project-visuals.tsx`](../src/components/project-visuals.tsx), CSS `.quizloom-*`, `.autrix-*`, `.api-sentinel-*`, `.filepilot-*`: independent room, analysis, request, scan/sort loops |
| Marquee | [`editorial-marquee.tsx`](../src/components/editorial-marquee.tsx): `requestAnimationFrame` movement driven by scroll impulse, with duplicated text; not a constant automatic ticker |
| Build Lab | [`build-lab-section.tsx`](../src/components/build-lab-section.tsx): five scroll-scrubbed stages from Idea to Ship; static mobile/reduced-motion alternative |
| Certificates | [`recognition-section.tsx`](../src/components/recognition-section.tsx): viewport fan-out, spring hover/focus poses, viewer entry/exit |
| Footer | [`contact-footer.tsx`](../src/components/contact-footer.tsx): once-in-view entry, wordmark/mascot rise, mouse parallax, CSS breathing |
| Cursor | [`custom-cursor.tsx`](../src/components/custom-cursor.tsx): spring-following dot, larger interactive state, optional `data-cursor` label |

There is no global route-transition component or router-wide exit animation. Case navigation uses ordinary Next links/rendering. Intro and viewer transitions are local.

Preserve transform ownership. Motion inline transforms and CSS transforms can compete. Hero/Footer wrappers separate anchoring, pointer movement, entry, and breathing; change the appropriate layer rather than adding offsets to individual children.

## Responsive rules

These are explicit CSS queries, not device labels. Later repeated blocks can override earlier declarations.

| Query | Important changes |
| --- | --- |
| `min-width: 821px` | Desktop project vertical padding; shared portrait-gallery rules before Autrix overrides |
| `max-width: 1080px` | About two-column grid; connector/nodes hidden; Skills/Build Lab columns narrow |
| `max-width: 820px` | Menu replaces desktop nav; Hero scales; Work becomes normal vertical cards, HUD hides; headings reflow; skill groups one-column; static Build Lab; certificate scroll rail; contact/narrative collapse; Home-over-results Autrix gallery |
| `max-width: 600px` | Autrix stacks, Home first; minimum caption height removed |
| `max-width: 560px` | Intro/Hero compact; About and project headers one-column; project demos compact; Skills two tile columns; dialog/contact/footer rules apply; case titles wrap, case intro/engineering collapse |
| `max-height: 560px` | Intro padding, name size, rule/caption spacing compress |
| `pointer: fine` + `hover: hover` + `prefers-reduced-motion: no-preference` | Native cursor suppression and eligible About hover lift |
| `prefers-reduced-motion: reduce` | CSS motion minimization, ordinary scroll, readable demo end states, static Build Lab |

Useful visual widths include 1440, 1280, 1024, 821/820, 768, 600, 560, 390, and 360px. Also inspect short viewports, coarse input, keyboard focus, and reduced motion. Confirm that local clipping does not hide content and that media stays proportional.

## Accessibility and reduced motion

Implemented foundations include a global 2px red focus outline with 4px offset, labelled navigation, native links/buttons, image alt text, decorative `aria-hidden` layers, keyboard-focusable About/skill cards, accessible active-project status, and a certificate dialog with `role="dialog"`, `aria-modal`, labelled title, Escape close, focus trap/restoration, and body-scroll lock.

Reduced-motion CSS changes animation/transition durations to `0.01ms`, limits loops to one iteration, and disables smooth scrolling. Project-specific overrides reveal demonstration content and hide moving scan lines. Component hooks disable pointer effects, cursor, marquee, and selected scroll transforms. Work and Build Lab use static alternatives.

Coverage is partial: some Motion `animate` props, especially certificate-dialog entry/exit, do not branch on `useReducedMotion`. CSS duration rules do not necessarily suppress JavaScript-driven motion. Verify both the component and global query when changing motion.

`CustomCursor` is mounted by the homepage shell, while native-cursor hiding CSS applies globally on eligible devices. Case-study cursor behavior needs a browser check; see [status limitations](PROJECT-STATUS.md). No formal accessibility compliance claim is made.

## Safe visual changes

1. Locate the exact component and selector using [Components and Pages](COMPONENTS-AND-PAGES.md).
2. Read base rules plus every matching responsive and reduced-motion override; search the entire stylesheet for the selector.
3. Change content in data. Scope project visuals to their prefix, and case changes to `.case-study-project-<slug>` / `.case-media-<slug>`.
4. Preserve editorial hierarchy, palette, card rhythm, image ratios, and transform ownership. Reuse wrappers and controls.
5. Check affected layouts/interactions, run relevant commands from [README](../README.md), and update this document if a design convention changes.
