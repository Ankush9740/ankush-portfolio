# Components and Pages

Source review: **2026-10-27**. This inventory describes the checked-in implementation; it is not a claim that every interaction has been exercised in a browser.

Start with [AGENTS.md](../AGENTS.md) for working rules. See [Project Architecture](PROJECT-ARCHITECTURE.md) for rendering and data flow, [Design System](DESIGN-SYSTEM.md) for visual rules and breakpoints, and [Project Status](PROJECT-STATUS.md) for limitations. Setup commands are in [README.md](../README.md).

## Routes and application entry points

| Route or file | Implementation | Responsibilities |
| --- | --- | --- |
| All routes | [`src/app/layout.tsx`](../src/app/layout.tsx), `RootLayout({ children })` | Loads Inter and Space Grotesk with `next/font/google`, imports the global stylesheet, sets base metadata/favicon, installs the homepage session-intro bootstrap script, and mounts one persistent `CustomCursor` directly under `body` outside route content. It does not render a shared navbar or footer around case studies. |
| `/` | [`src/app/page.tsx`](../src/app/page.tsx), `Home()` | Server entry point; derives the UTC year and passes it to `PortfolioShell`. |
| `/projects/quizloom` | [`src/app/projects/[slug]/page.tsx`](../src/app/projects/%5Bslug%5D/page.tsx) | Shared case-study template populated from the Quizloom object. |
| `/projects/autrix` | Same dynamic route | Autrix data and scoped gallery/case-study styles. |
| `/projects/api-sentinel` | Same dynamic route | API Sentinel data and scoped gallery styles. |
| `/projects/filepilot` | Same dynamic route | FilePilot data and scoped gallery styles. |
| Unknown project slug | Same dynamic route | `getProject(slug)` returns no project and the page calls `notFound()`. There is no custom project-specific not-found component. |

The dynamic route awaits the promise-based `params`, derives static parameters from `projects`, and generates project metadata. Its sections are the back link/header, title and descriptions, Engineering Focus/Technology, optional narrative sections, optional media intro, screenshot gallery, and external project links. The case-study title/content is not a separate component per project.

Homepage navigation uses fragment anchors: `#top`, `#about`, `#work`, `#skills`, `#lab`, `#certificates`, and `#contact`. Case-study return navigation uses `next/link` to `/#work`. Project cards use `next/link` for internal paths and native anchors for external URLs. There is no custom route-transition provider, `template.tsx`, `loading.tsx`, or page-exit animation system.

## Homepage composition and session intro

[`PortfolioShell`](../src/components/portfolio-shell.tsx) is the client composition root. Its order is:

1. `Hero`
2. `AboutSection`
3. `ProjectsSection`
4. `EditorialMarquee`
5. `SkillsSection`
6. `BuildLabSection`
7. `RecognitionSection`
8. `ContactFooter`

All optional sections currently have `true` visibility flags in [`src/data/site.ts`](../src/data/site.ts). The projects flag also controls the marquee. Hero and the root-layout cursor are not controlled by those flags. Navigation is a separate static array; hiding a section does not automatically remove its link.

| Component | File and important inputs | Responsibilities and motion | Related styles and placement |
| --- | --- | --- | --- |
| `PortfolioShell` | [`portfolio-shell.tsx`](../src/components/portfolio-shell.tsx); `year: number`, `siteConfig`, intro storage key | Reads intro completion for the browser session, controls `site-waiting`/`site-ready`, coordinates Hero's `active` prop, and restores an initial fragment after the intro. A returning session uses a short refresh entrance. | `.site-waiting`, `.site-ready`, `.site-refreshing` in [`globals.css`](../src/app/globals.css); used by `/`. |
| `PortfolioIntro` | [`portfolio-intro.tsx`](../src/components/portfolio-intro.tsx); `onComplete: () => void` | ANKUSH letter-mask reveal, progress rule, caption, ambient CSS background, and slide-away exit. Completes after 1,750ms normally or 100ms with reduced motion; Skip and Escape complete it early. Stores completion in `sessionStorage`. | `.portfolio-intro`, `.intro-*`; conditionally mounted by `PortfolioShell`. The displayed `PORTFOLIO / 2026` is literal text. |
| Intro bootstrap | [`layout.tsx`](../src/app/layout.tsx) and [`portfolio-intro.ts`](../src/lib/portfolio-intro.ts) | A `beforeInteractive` script recognizes a completed homepage session and reveals the portfolio before React finishes mounting. The shared key is `ankush-portfolio-intro`. Storage failures are caught. | `html.intro-session-complete` and shell visibility selectors; only acts on pathname `/`. |

The intro is a presentation sequence, not an authentication gate. There is no current password, keypad, login service, or protected content. Keep the bootstrap script, storage key, shell state, intro completion callback, and visibility selectors coordinated when changing it.

## Homepage section components

The following components use `"use client"` because they contain Motion hooks, browser effects, or interactive state. Their visual rules live in [`src/app/globals.css`](../src/app/globals.css), rather than component CSS modules.

| Component | File and data/props | Purpose, important behavior, and animation | Principal selector families |
| --- | --- | --- | --- |
| `Hero` | [`hero.tsx`](../src/components/hero.tsx); `active: boolean`; `profile`, `socials`, `navigation` | Renders the homepage header/navigation, large ANKUSH text, `/assets/mascot.png`, role/location, and work anchor. Mouse-only spring parallax moves the mascot and text. Scroll progress scales the stage and fades support copy. `active` starts entrances after intro coordination. Mascot uses `next/image` with eager/high-priority loading. | `.hero`, `.site-header`, `.brand`, `.mobile-nav`, `.hero-name*`, `.hero-mascot*`, `.hero-support`, `.explore-link`. |
| `AboutSection` | [`about-section.tsx`](../src/components/about-section.tsx); `aboutCards`, `profile.introduction` | Displays the MY WORLD backdrop, introduction, and seven cards. Scroll progress moves the field/orbit indicator and selects an orbit-active card; pointer springs apply depth-dependent parallax. Internal `AboutCard` receives `card`, two MotionValues, and `cardRef`. Articles can receive keyboard focus. | `.about-section`, `.about-backdrop`, `.about-intro`, `.about-field`, `.about-connector`, `.about-orbit-*`, `.about-card*`, `.is-orbit-active`. |
| `ProjectsSection` | [`projects-section.tsx`](../src/components/projects-section.tsx); `projects` | Selected Work heading, sticky stacked cards, and current-project HUD. Count and scroll height derive from array length. The HUD derives its active title/index from existing progress and updates state only when the index changes. | `.projects-section`, `.projects-heading`, `.project-showcase`, `.project-stage`, `.project-stage-hud`, `.project-stage-track`. |
| `EditorialMarquee` | [`editorial-marquee.tsx`](../src/components/editorial-marquee.tsx); local `marqueeItems` | Repeats BUILD/BREAK/LEARN/SHIP/REPEAT, with a duplicate sequence hidden from assistive technology. Passive scroll deltas drive an inertial RAF translation; ResizeObserver measures the repeat width. It does not continually advance without scroll input. | `.editorial-marquee*`. |
| `SkillsSection` | [`skills-section.tsx`](../src/components/skills-section.tsx); `skillGroups`, local `skillIcons` registry | Six groups of 30 skills. Internal `SkillContent({ skill, index })` resolves an icon ID and displays name/sequence. Groups use `FadeIn`; tiles use `Magnetic` and focusable content. Unknown icon IDs render no icon. | `.skills-section`, `.skills-heading`, `.skill-groups`, `.skill-group*`, `.skill-cloud`, `.skill-item`, `.skill-icon`, `.skill-copy`, `.skill-sequence`. |
| `BuildLabSection` | [`build-lab-section.tsx`](../src/components/build-lab-section.tsx); local `stages` and `stageWindows` | Five stages—Idea, Structure, Code, Break, Ship—are driven by one scroll MotionValue. Desktop uses a 380svh scroll container and sticky scene. Small screens/reduced motion use static stage articles. The navigator describes progress; its list items are not controls. This is an illustrative process, not a real build or deployment integration. | `.build-lab-*`, `.lab-*`, `.static-*`, `.frame-*`, `.measure-*`, `.structure-*`, `.annotation-*`, `.code-*`. |
| `RecognitionSection` | [`recognition-section.tsx`](../src/components/recognition-section.tsx); `recognitionItems` | Displays the certificate heading, three-card fan and viewer selection state. A once-only in-view trigger opens the fan. Hover/focus raises/straightens a card and shifts siblings. On smaller screens the cards become a horizontal scroll-snap row. | `.recognition-section`, `.recognition-heading`, `.recognition-stage`, `.recognition-card*`, `.recognition-image`. |
| `ContactFooter` | [`contact-footer.tsx`](../src/components/contact-footer.tsx); `year: number`, `socials`, `navigation` | Contact heading, availability copy, Email/GitHub/LinkedIn/Resume rows, footer navigation/back-to-top, large name and shared mascot. Footer has once-only entrances and mouse parallax. No message form or submission backend exists. | `.site-footer`, `.contact-*`, `.final-footer`, `.footer-*`, `.back-to-top`. |
| `CustomCursor` | [`custom-cursor.tsx`](../src/components/custom-cursor.tsx); media-query state and pointer position | One live `matchMedia` query enables it only for a fine pointer with hover and without reduced motion, and updates when those conditions change. A spring cursor follows pointer movement; nearest `a`, `button`, or `[data-cursor]` determines active state and an optional label. It is decorative (`aria-hidden`) and does not intercept pointer events or text selection. | `.custom-cursor`, `.is-active`, `.has-label`; one persistent instance mounted by `RootLayout` directly under `body`, outside route content, for the homepage and all case studies. |

### Important internal section helpers

These helpers are defined alongside their parent, not exported from separate files:

| Helper | File / inputs | Role |
| --- | --- | --- |
| `RecognitionCard` | [`recognition-section.tsx`](../src/components/recognition-section.tsx); item, index, activeIndex, isInView, onOpen, onHover | Button containing certificate metadata/preview. Uses one of three fan poses, springs, and a custom-cursor OPEN label. |
| `RecognitionDialog` | Same file; item, onClose | Image and achievement details; conditional credential URL. Uses `role="dialog"`, `aria-modal`, labelled heading, initial close-button focus, Tab trapping, Escape/backdrop close, body scroll lock, and focus restoration. Motion animates mount/unmount through `AnimatePresence`. |
| `ContactItem` | [`contact-footer.tsx`](../src/components/contact-footer.tsx); index, label, value, href (nullable), icon | Reusable fixed-row contact link. `mailto:` stays in the same browsing context; other links open a new tab with `noopener noreferrer`. Null links produce an unavailable state. Hover/focus emphasizes text/icon and changes the arrow without expanding the row. |
| `LabStageCopy`, `LabStageMeta`, `LabNavigatorItem` | [`build-lab-section.tsx`](../src/components/build-lab-section.tsx); progress and stage index | Coordinate stage copy, metadata, and progress color/completion using the shared timing ranges. |
| `LabGrid`, `LabWorkspace` | Same file; workspace receives progress | Background grid and animated interface assembly/debug/release illustration. |
| `StaticInterface`, `StaticBuildLab` | Same file; static interface receives index | Readable fallback representation of all five stages. Keep it in sync with the animated scene. |
| `MarqueeSequence` | [`editorial-marquee.tsx`](../src/components/editorial-marquee.tsx); optional hidden flag | Builds a repeatable text sequence; marks the duplicate copy hidden to assistive technology. |

### Motion helpers

| Component | File / API | Behavior and usage |
| --- | --- | --- |
| `FadeIn` | [`motion/fade-in.tsx`](../src/components/motion/fade-in.tsx); children, optional className/delay, remaining div Motion props | Reveals opacity and y from 24px once 18% is visible; default duration 0.7s. Reduced motion bypasses the initial/viewport motion. Used for section headings, skills groups, and contact panels. Passed Motion props are spread last and can override defaults. |
| `Magnetic` | [`motion/magnetic.tsx`](../src/components/motion/magnetic.tsx); children, className, strength (default 9) | Translates a wrapper through springs based on relative mouse position; resets on leave. Touch and reduced-motion input bypass pointer movement. Currently used by skill tiles. |

### Dormant component

[`JourneySection`](../src/components/journey-section.tsx) and [`src/data/journey.ts`](../src/data/journey.ts) contain a timeline implementation with internal `JourneyEntry`, scroll-progress rail, and viewport reveals. They are **not imported or rendered** by `PortfolioShell`, are absent from navigation and visibility flags, and have no corresponding journey/timeline selectors in the current global stylesheet. Treat them as dormant source, not a working homepage section or documented route.

## Project cards and independent visuals

| Component | File / inputs | Common structure and behavior | Styles |
| --- | --- | --- | --- |
| `ProjectCard` | [`project-card.tsx`](../src/components/project-card.tsx); project, index, totalProjects, progress MotionValue | Renders number/category/title/buttons, descriptions/divider, middle visual, and technology pills. First sheet remains the base; subsequent sheets translate from 104% to 0% over consecutive scroll intervals. Reduced motion omits transforms. The prominent `project.number` is stored data; the small `index + 1 / total` text is derived. | `.project-card`, `.project-slide`, `.project-paper`, `.project-charcoal`, `.project-card-head`, `.project-index-block`, `.project-number`, `.project-category`, `.project-links`, `.project-summary`, `.project-visual-area`, `.tech-list`. |
| `ProjectVisual` | [`project-visuals.tsx`](../src/components/project-visuals.tsx); visual: ProjectVisualId | Looks up the component in the local `projectVisuals` registry. The type is derived from registry keys. Unrecognized runtime values return `null`; there is no generic replacement visual. | Registry entries own their style prefixes. |
| `QuizloomVisual` | Same file; no props | Room code, two players, Q mark, lines and answer nodes. Semantic image role/label; CSS sequences animate the composition. | `.quizloom-*` plus `.project-media-grid-quizloom`. |
| `AutrixVisual` | Same file; no props | Vehicle photograph preview, scanning line, Qwen Vision analyzing state, and Audi R8 result fields. This is a code-native illustration, not a live model call. | `.autrix-*`, Autrix-specific keyframes and responsive/reduced-motion rules. |
| `ApiSentinelVisual` | Same file; no props | Simulated GET request, progress, 200 response/JSON and passing assertion. It does not execute a network request. | `.api-sentinel-*`. |
| `FilePilotVisual` | Same file; no props | Local-folder scan, document nodes, SHA-256 duplicate indicator, safe plan and Undo status. It does not access the viewer's filesystem. | `.filepilot-*`. |

The registry keys are `quizloom`, `autrix`, `apiSentinel`, and `filepilot`. Keep animations independent by using unique component and CSS/keyframe prefixes. Do not copy the entire shared card when adding a visual.

The active HUD uses `round(progress * (projectCount - 1))`, clamped to array bounds, and begins at index zero. CSS hides it on the non-sticky mobile layout; reduced motion omits it. See [Project Status](PROJECT-STATUS.md) for verification limits and [Project Architecture](PROJECT-ARCHITECTURE.md) for the stack's complete data flow.

## Case-study template and galleries

[`ProjectPage`](../src/app/projects/%5Bslug%5D/page.tsx) consumes `getProject`, `getProjectLinks`, and `projects` from [`src/data/projects.ts`](../src/data/projects.ts). It uses `next/image` with `fill` inside positioned media frames. A media `src: null` produces an explicit placeholder; current project media entries have actual image paths.

| Part | Data/implementation | Styles and editing boundary |
| --- | --- | --- |
| Header and hero | Project number, category, title, description, secondaryDescription | `.case-header`, `.case-hero`, `.case-intro`; `.case-study-project-autrix` scopes Autrix refinements. |
| Engineering and Technology | `engineering`; `caseTechnologies ?? technologies` | `.case-content`. |
| Narrative | Optional `caseSections[]`: label, title, paragraphs, optional items | `.case-narrative`, `.case-narrative-copy`; preserve each project's facts. |
| Optional screenshot introduction | `mediaHeading` and optional `mediaDescription` | `.case-media-intro`; currently no project defines these fields, so no intro appears. Autrix-specific intro selectors remain in the stylesheet. |
| Screenshot gallery | `media[]` and optional `galleryType` | `.case-media`, `.case-media-item`, `.case-media-image-frame`, `.case-media-image`, `.case-media-caption`, `.case-gallery-desktop`, `.case-gallery-mobile`, and project-specific selectors. |
| External actions | `getProjectLinks(project)` filtered to HTTP URLs | `.case-links`; internal case-study links are intentionally omitted from their own page footer. |

Current gallery arrangements:

- Quizloom: desktop gallery with a full-width Homepage/Join screenshot followed by Player Quiz and Host/Result. Existing media-ratio and fitting rules are intentionally project-dependent; inspect them before changing image behavior.
- Autrix: three equal-width portrait cards on desktop—Audi R8, Home, Toyota Fortuner—with a shared media aspect ratio and `contain` fitting. At tablet widths Home occupies its own centered first row; at 600px and below cards stack Home first, then Audi and Toyota. Keep original images uncropped and undistorted.
- API Sentinel: four screenshots in a two-column gallery, adapting with the shared responsive rules.
- FilePilot: four screenshots with its own gallery selectors. Keep changes scoped to `.case-media-filepilot` when only this project's layout should change.

## Data and asset ownership

| Source | What belongs there | Editing notes |
| --- | --- | --- |
| [`src/data/site.ts`](../src/data/site.ts) | Site identity, section visibility, header/footer navigation | Root metadata is separately declared in `layout.tsx`; update both when changing identity/description. Visibility does not synchronize navigation. |
| [`src/data/profile.ts`](../src/data/profile.ts) | Hero eyebrow/line/role/location and About introduction | `education` exists but is not consumed by the current About component; About education content comes from `about.ts`. |
| [`src/data/about.ts`](../src/data/about.ts) | Seven card labels, titles, details, depth and layout class names | Card classes control authored desktop placement. The orbit count label in the component is currently literal `07`. |
| [`src/data/projects.ts`](../src/data/projects.ts) | Shared project/card/case-study content, URLs, media, types and link helpers | Array order controls display/stack order. Keep `number`, `slug`, `caseStudy` and registered visual ID consistent. |
| [`src/data/skills.ts`](../src/data/skills.ts) | Skill groups, descriptions, names and icon IDs | Add icon implementations to `skillIcons` in `skills-section.tsx`. |
| [`src/data/recognition.ts`](../src/data/recognition.ts) | Achievement metadata, images and nullable credential URLs | Three authored fan positions currently match three records. Aaroham's existing asset filename remains `aaroha-2026.jpg`. |
| [`src/data/socials.ts`](../src/data/socials.ts) | Email, GitHub/LinkedIn labels and URLs, nullable resume path | Used in both hero resume action and contact/footer. |
| [`src/data/journey.ts`](../src/data/journey.ts) | Dormant timeline records | Editing it alone does not change the rendered homepage. |
| [`public/assets/mascot.png`](../public/assets/mascot.png) | Shared hero/footer mascot | Replacing it affects both compositions; preserve transparency and authored proportions. |
| [`public/Ankush-Resume.pdf`](../public/Ankush-Resume.pdf) | Public resume | Linked by `socials.resumeUrl`. |
| [`public/certificates/`](../public/certificates/) | Certificate images | URLs are defined in recognition data. |
| [`public/projects/`](../public/projects/) | Project screenshots | Current folders are `Quizloom`, `Autrix`, `API Sentinel`, and `FilePilot`; preserve exact filename/case in URLs. |

## Where to make changes

| Requested change | Start here | Also inspect / verify |
| --- | --- | --- |
| Change homepage hero copy | [`profile.ts`](../src/data/profile.ts) | [`Hero`](../src/components/hero.tsx) contains literal ANKUSH text, mascot path and action copy; `.hero-*` controls layout. |
| Change hero mascot/depth treatment | [`Hero`](../src/components/hero.tsx) and [global styles](../src/app/globals.css) | `.hero-name` pseudo-elements, `.hero-name-mask`, `.hero-mascot*`; preserve mascot layering and pointer/scroll behavior. |
| Modify navigation | [`site.ts`](../src/data/site.ts) | Header and footer share `navigation`; mobile `<details>` is in Hero. Verify every fragment still has a rendered target. |
| Hide/show a section | [`site.ts`](../src/data/site.ts) and [`PortfolioShell`](../src/components/portfolio-shell.tsx) | Remove/update any navigation anchor to a hidden target. Projects visibility also controls the marquee. |
| Update the cinematic intro | [`PortfolioIntro`](../src/components/portfolio-intro.tsx) | Coordinate [`PortfolioShell`](../src/components/portfolio-shell.tsx), [storage key](../src/lib/portfolio-intro.ts), [`RootLayout`](../src/app/layout.tsx), `.intro-*`/visibility styles; test fresh and completed sessions, Skip, Escape, hash links and reduced motion. |
| Edit About content | [`about.ts`](../src/data/about.ts), [`profile.ts`](../src/data/profile.ts) | `.about-card-*` layouts and hardcoded orbit count; check desktop field and responsive grid. |
| Add or reorder projects | [`projects.ts`](../src/data/projects.ts) | Follow the project workflow below; check number, count, HUD, sticky transitions and every route. |
| Edit project buttons/URLs | [`projects.ts`](../src/data/projects.ts), `getProjectLinks` | `githubLabel`, optional liveDemo/download, caseStudy; `ProjectCard` and case-study footer reuse the helper. |
| Edit a case-study narrative | Project's `caseSections` in [`projects.ts`](../src/data/projects.ts) | Shared [route template](../src/app/projects/%5Bslug%5D/page.tsx); scope layout overrides with `.case-study-project-<slug>`. |
| Modify project screenshots/captions | Project's `media` in [`projects.ts`](../src/data/projects.ts) | Exact files in `public/projects`; `.case-media-<slug>` fitting/ratios; route `sizes` values. |
| Update skills | [`skills.ts`](../src/data/skills.ts) | Register new icon IDs in [`SkillsSection`](../src/components/skills-section.tsx); verify group/tile wrapping and keyboard focus. |
| Add an achievement | [`recognition.ts`](../src/data/recognition.ts) | Place its image in `public/certificates`; inspect three-pose fan logic and mobile scroll row in [`RecognitionSection`](../src/components/recognition-section.tsx); test modal focus and closure. |
| Update social links/resume | [`socials.ts`](../src/data/socials.ts) | Hero and contact read the same source; local resume must exist under `public`. |
| Modify Build Lab | [`build-lab-section.tsx`](../src/components/build-lab-section.tsx) | Keep animated and static representations aligned; review stage windows, `stageIndexAt`, selector ranges, small-screen and reduced-motion fallbacks. |
| Change typography | [`layout.tsx`](../src/app/layout.tsx) and [global styles](../src/app/globals.css) | Font variables plus the specific section's font/tracking/line-height rules. Prefer a scoped selector over broad title changes. |
| Adjust mobile responsiveness | Matching section's media-query rules in [global styles](../src/app/globals.css) | Read all later overrides for that selector; see [Design System](DESIGN-SYSTEM.md). Verify overflow and intended wrapping at tablet/mobile boundaries. |
| Modify entrance/scroll motion | Owning component and [Motion helpers](#motion-helpers) | CSS keyframes for visual illustrations, `prefers-reduced-motion` block, mobile static fallbacks. There is no central page-transition manager. |
| Update metadata/favicon | [`layout.tsx`](../src/app/layout.tsx), [case-study metadata](../src/app/projects/%5Bslug%5D/page.tsx), [`favicon.svg`](../public/favicon.svg) | Site title/description duplicated in `site.ts`; project title/description drive case metadata. |

### Adding a project safely

1. Add a complete `Project` object in [`src/data/projects.ts`](../src/data/projects.ts). Use a unique slug, correct ordered number, matching `/projects/<slug>` case-study path, verified URLs/content, technology list, engineering details, narrative and media as needed.
2. Create its own visual component in [`src/components/project-visuals.tsx`](../src/components/project-visuals.tsx). Register a unique key in `projectVisuals`, then use that key in the project's `visual` field. `ProjectVisualId` updates from the registry automatically.
3. Add uniquely prefixed selectors, keyframes, responsive rules and reduced-motion states in [`src/app/globals.css`](../src/app/globals.css). Reuse `ProjectCard` for common layout. Do not alter other visuals to accommodate the new illustration.
4. Place actual screenshots under `public/projects/<ProjectFolder>` and use exact `/projects/...` URLs with descriptive alt text. Select an existing gallery pattern or add narrowly scoped `.case-media-<slug>` rules where its image proportions require them.
5. Verify the derived project count/position HUD and scroll intervals in both directions, all card actions, case-study metadata/routing, image fitting, desktop/mobile/reduced-motion layouts and overflow. The prominent number and case-study header still read `project.number`, so maintain it when reordering.

### Updating a screenshot without collateral layout changes

Change the file reference, alt text and caption in project data first. Inspect the source dimensions and existing scoped gallery rules before adjusting a viewport ratio. `fill` requires a positioned frame with a defined size; changing only the image cannot establish its layout. Preserve `contain` where full screenshot visibility is required, and do not globally replace fitting rules that other projects intentionally use. Keep media captions associated with their image and update `sizes` in the route if the gallery's responsive width changes materially.

### Validation and handoff

Run the relevant commands listed in [README.md](../README.md) and use [Project Status](PROJECT-STATUS.md) to distinguish source-confirmed behavior from browser verification. For visual changes, inspect representative desktop/tablet/mobile sizes and reduced motion, rather than treating a successful compile as a visual test. Update this inventory when adding/removing a route, component, data source, registry entry or major interaction.
