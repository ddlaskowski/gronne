# Grønne Mur og Flis AS

Phase 08: about preview section for gronne-murogflis.no.
The homepage contains the hero, introduction, services, featured craft, selected projects and about preview;
the four navigation destinations remain minimal
Norwegian Bokmål placeholders. Other homepage sections belong to later phases.

## Development

Use Node.js 22.13+ LTS or Node.js 24+ (Next.js itself requires at least Node.js 20.9).

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`typecheck` generates Next.js route types before checking TypeScript, including
on a clean checkout. Google Fonts must be reachable during the first build;
`next/font` then serves the downloaded fonts locally.

## Structure

- `src/app`: root layout, metadata, global styles and homepage.
- `src/styles/tokens.css`: palette, semantic colors, spacing, type and layout tokens.
- `src/components/layout`: header, navigation, mobile menu and responsive container.
- `src/components/ui`: original brand logo.
- `src/components/sections`: hero, image loader, introduction, services, featured craft, selected projects and about preview.
- `src/lib`: shared navigation destinations.
- `public/brand`, `public/images/{hero,projects,services}`: reserved asset directories.

The layout, logo, desktop navigation and route placeholders are Server
Components. The hero is also a Server Component. Only header scroll state,
the mobile menu and optional image-load failure handling use Client Components.
There are no extra libraries for animation, UI or state management.

## Navigation and brand

`BrandLogo` renders the original `public/brand/gronne-logo.svg` through
`next/image`, using the 663.43 × 464.89 viewBox ratio. The asset is unchanged;
its original gradient and geometry stay inside the SVG. A CSS viewport exposes
source x=160–660, removing only the transparent side margins without editing the
asset or cutting painted geometry. The tight ivory backing retains contrast over
the approved photograph. Its desktop footprint is 92 × 86px; the mobile footprint
is 72 × 67.5px. The logo and menu controls remain vertically centered.

The fixed header starts with a transparent bar and neutral backing behind the
logo and controls. After 32px of scrolling it becomes compact with an ivory
background. Its reserved layout height stays constant to prevent content jumps.
The shared `--header-height` variable lets the hero extend behind the reserved
header area without duplicating or redesigning navigation. Other routes still
keep the reserved header space.

At 1024px and above, the four links appear horizontally. Below that breakpoint,
the menu toggle opens a native modal dialog. The menu supports focus cycling,
Escape, a close button, scroll locking, link-selection closing, and automatic
closing when switching to desktop. Native dialog focus restoration returns
focus to the toggle. CSS transitions respect `prefers-reduced-motion`.
An accessible skip link targets `#main-content` on every route.

Phase 02 validation: ESLint (zero warnings), route type generation, TypeScript
and the production build passed. Browser checks covered desktop at 1280px and
mobile at 375px: no horizontal overflow, focus cycling in both directions,
Escape and focus restoration, scroll-lock restoration, link navigation, menu
closing at the desktop breakpoint, and the compact header after scrolling.
No browser console errors or warnings were observed. Reduced-motion support
is implemented in CSS; it was not tested with an OS preference override.

`src/lib/navigation.ts` is the shared source for the four destinations.
`src/styles/navigation.css` contains the header and menu styles without changing
the existing design tokens. Route placeholders contain only their page headings.

## Design system

The five base colors are charcoal, ivory, paper, graphite and stone. Semantic
tokens cover background, foreground, muted text, borders, surfaces and focus.
Stone is decorative; muted text uses a darker mix for accessible contrast.
`--brand-gradient: none` is a deliberate placeholder: populate it only from the
original logo, then integrate it in a later phase.

DM Sans and IBM Plex Mono are configured through `next/font/google` variables.
The `type-display`, `type-section`, `type-subheading`, `type-body`, `type-small`,
`type-label` and `type-micro` utilities provide the typography roles. Semantic
Tailwind colors include `bg-background`, `text-foreground`, `text-muted`,
`border-border` and `bg-surface`; font utilities are `font-sans` and `font-mono`.

Spacing tokens use the requested 4–160px scale (expressed in rem). The container
has a 1440px maximum content width, with 24px mobile, 40px tablet and 48–80px
desktop gutters. `.layout-grid` has 4 columns below 768px, 6 columns from 768px,
and 12 columns from 1200px. Typography and section spacing scale fluidly.

## Next phase

Further homepage sections and motion design remain separate phases.

## Hero

`src/components/sections/hero.tsx` contains the requested Norwegian microcopy,
two-line H1, company description, project CTA and location label. The desktop
layout uses a 49/51 split from 1024px, with dark media on the left and ivory
content on the right. Below that breakpoint the reading order is text, CTA,
location and media. Typography reuses the design system's font, weight,
tracking and line-height tokens with a size adapted to the panel width.

The hero uses `min-height: 100svh` and content-driven sizing: short windows and
larger text can expand its height instead of clipping content. The CTA has a
thin rule, a simple arrow, a visible focus state and a small hover transition
that is disabled under reduced motion. No entrance animation is applied.

The approved `public/images/hero/hero-craft.png` is preserved. Its WebP delivery
copy was converted with the existing Sharp dependency at quality 88 and effort
6, without cropping or resizing. Both are 1086 × 1448px. File size decreased
from 2,425,036 to 210,700 bytes (91.3% smaller).

The WebP is statically imported, giving Next.js intrinsic image metadata and a
content-hashed asset URL. `next/image` uses `fill`, responsive `sizes` (49vw on
desktop, 100vw otherwise), cover fitting and preload for the desktop image above
the fold. It generates appropriately sized delivery images. Meaningful Norwegian
alt text describes the hand, notched trowel and adhesive ridges.

Desktop positioning is `50% 62%`. Tablet uses a 4/3 panel at `58% 62%`;
mobile uses a square panel at `58% 80%`. These crops keep the hand, trowel and
curved adhesive ridges visible. The panel reserves its geometry before loading.
An image-load failure removes only the image, retaining the same geometry and
CSS fallback. No filters or overlays are applied to photography.

The original logo is unchanged. The optional decorative G is omitted because
the provided asset includes the full wordmark.

Phase 03.1 validation: ESLint (zero warnings), TypeScript and production build
passed. Production layout and crop checks covered 1440 × 900, 1280 × 800,
768 × 1024, 390 × 844 and 320 × 700. There is no horizontal or heading overflow,
and the heading retains its two intended lines. The image loads successfully
through the Next.js optimizer. One H1, meaningful alt, visible CTA keyboard focus,
mobile-menu Escape and focus restoration were verified. Header compaction keeps
the hero's document position and height unchanged. No console errors or warnings
were observed. Desktop and mobile screenshots were captured outside the repo.
Reduced-motion CSS is preserved; an OS preference override and a forced network
failure were not simulated.

Phase 03.2: mobile header height decreased from 128px to 96px (72px when compact).
Below 768px, copy starts 32px below the header; heading margins are 16/24px, CTA
margin is 24px, location spacing is 24px plus 12px above its label, and bottom
padding is 32px. Headline size, fonts, copy, CTA and desktop split are unchanged.
The location label stays in the content flow, and no fixed content height is used.

Production checks at 1440 × 900, 393 × 852 and 320 × 700 passed without horizontal
overflow or heading clipping. Photography starts at 499px on the 393px screen
and 522px on the 320px screen. The glove, trowel and curved adhesive ridges are
visible in the first mobile viewport. Desktop navigation needed no changes.
Keyboard focus, mobile focus cycling, Escape, scroll locking/restoration and
header compaction were verified. Hero document position and height stay constant
through header compaction. Compiled reduced-motion rules cover header, logo frame,
menu and CTA transitions. No console errors or warnings were observed. ESLint,
TypeScript and production build passed; no dependencies were added.

## Introduction

`src/components/sections/introduction.tsx` is a Server Component placed directly
after the hero. It uses the supplied Norwegian brand copy as proposed wording,
without adding company history, credentials or statistics.

The section reuses `Container`, `.layout-grid`, paper/charcoal colors, spacing
tokens and both existing fonts. On the 12-column desktop grid, the index sits
in columns 1–3, the H2 begins at column 4, and the supporting paragraph begins
at column 8. Tablet uses the six-column grid with smaller type and offsets;
mobile presents label, H2 and paragraph in one reading column.

The heading has three controlled lines on larger screens and natural wrapping
on mobile. Its regular weight, tracking and line height reuse typography tokens.
A thin rule and generous negative space provide structure. There are no images,
icons, client interactions, transitions or animations in this section. The hero
remains the page's sole H1; the introduction is a labelled semantic section with
an H2. `src/styles/introduction.css` contains only this section's styles.

Phase 04 validation: ESLint (zero warnings), TypeScript and production build
passed. Production checks at 1440 × 900, 768 × 1024 and 393 × 852 confirmed
typography, the 12/6/4-column grids, 48/48/32px row gaps and no horizontal or
heading overflow. The introduction begins directly after the hero with zero
layout gap. No browser console errors or warnings were observed. The section
has no animations or transitions, so no motion override is needed. Desktop and
mobile previews were captured outside the repo. Hero and header were not edited
in this phase; no dependencies or additional homepage sections were added.

## Services

`src/components/sections/services.tsx` is a Server Component immediately after
the introduction. Its typed data contains only the three supplied services and
their Norwegian specializations. `src/styles/services.css` reuses the existing
container, responsive grid, spacing and font tokens, with charcoal (#15191A)
and warm paper text.

Three full-width rows use thin dividers, small numbers and large regular-weight
DM Sans names. IBM Plex Mono carries the section label, numbers and descriptions.
Names scale from 32px to 72px with tight tracking. Desktop places numbers in
column 1, names in columns 2–12 and descriptions in columns 8–12. Tablet uses
columns 2–6 for names and descriptions. Mobile stacks number, name and description;
BETONG & FORSKALING wraps to two lines without breaking individual words.

The semantic section has an H2 and three H3 service headings inside an ordered
list. Supplementary copy retains high contrast on charcoal. Rows are informational:
no service detail destinations exist, so there are no links, arrows or focus stops.
Fine-pointer hover shifts names 3px and gently emphasizes the divider over 240ms.
These effects apply only with `prefers-reduced-motion: no-preference`.

Phase 05 validation: ESLint (zero warnings), TypeScript and production build
passed. Production browser and screenshot checks covered 1440 × 900, 768 × 1024,
393 × 852 and 320 × 700. The 12/6/4-column grids, 1px dividers, typography,
zero gap after introduction and absence of horizontal overflow or clipped names
were verified. Reduced motion produced no transform and a zero transition duration.
No application errors were observed; the existing missing `/favicon.ico` produces
a browser resource 404. Section screenshots hide the fixed header only during
capture; transition screenshots retain it. Hero, header and introduction are
unchanged. No dependencies, detail pages or additional sections were added.

## Featured craft

`src/components/sections/featured-craft.tsx` is a Server Component immediately
after Services. Its Norwegian headline and paragraph are proposed marketing copy,
not independently verified claims. No project metadata or technical guarantees
have been added.

The section uses paper, charcoal and a neutral mix of existing stone and ivory
tokens. A mono section label and thin divider precede the editorial composition.
Desktop places the media in columns 1–7 and vertically centered copy in columns
8–12, with an additional 16px text inset. The placeholder has a 5:4 ratio. Tablet
uses equal three-column areas on the six-column grid and a 4:5 portrait placeholder.
Mobile follows the DOM order: label, two-line H2, paragraph, then 4:3 placeholder.
DM Sans scales from 40px on mobile to 72px at 1440px and a maximum of 88px.

The intentional placeholder is a plain stone-toned surface with the readable
IBM Plex Mono label `PROSJEKTFOTO KOMMER`. It uses no photograph, texture asset,
gradient, icon, loading animation or missing image URL. There are no interactive
elements, animations or transitions. Normal and reduced-motion rendering match.

To integrate an approved photograph later, add the real asset (suggested location:
`public/images/craft/featured-craft.webp`) and pass the optional `image` prop to
`FeaturedCraft` in `src/app/page.tsx`. The configuration accepts `src` (a local
URL or static import), meaningful Norwegian `alt` text describing the actual
photo, and optional `position.mobile`, `position.tablet` and `position.desktop`
CSS object-position strings. Positions default to centered. The configured image
replaces the placeholder label through `next/image` with `fill`, responsive
`sizes`, cover fitting and the same reserved aspect ratios. No image is configured
or requested until an approved asset exists; its crop and alt text require review
when supplied.

Phase 06 validation: ESLint (zero warnings), TypeScript and production build
passed. Production browser checks and visual review covered 1440 × 900,
768 × 1024, 393 × 852 and 320 × 700. All sizes preserve two headline lines,
correct column alignment, zero gap after Services, the intended aspect ratios,
no horizontal overflow and no clipped copy. Measured contrast is approximately
13:1 for the placeholder label and 8.2:1 for supporting text. No console or
application errors were observed during this run. Normal and reduced-motion
styles have no animations or transitions. Section screenshots hide the fixed
header only during capture; transition screenshots retain it. Completed sections
are unchanged, and no dependencies, extra routes or other sections were added.

## Selected projects

`src/components/sections/selected-projects.tsx` is a Server Component directly
after Featured Craft. It uses the supplied section index and two-line H2 without
adding project names, locations, dates, descriptions, testimonials or client names.
`src/styles/selected-projects.css` reuses `Container`, `.layout-grid`, spacing,
typography and palette tokens. The section uses warm ivory with a thin header rule.

Desktop reserves columns 1–7 for the dominant 5:4 landscape area and columns 9–12
for a smaller 4:5 portrait area, offset down by 128px. Column 8 remains empty for
generous separation. Tablet uses four columns and two columns, with a 64px offset.
Mobile stacks two full-width surfaces with a 48px gap: the first is 4:3 and the
second 3:2, retaining the first area's visual prominence. Heading size scales
from 40px on mobile to 72px at 1440px, with a maximum of 88px.

Both neutral surfaces mix existing stone and ivory tokens at slightly different
strengths and display `PROSJEKTFOTO KOMMER`. They have no links, icons, dashed
borders, image requests or captions. Their label contrast exceeds 13:1. No new
animations or transitions are introduced. The sole interactive element is the
editorial `SE ALLE PROSJEKTER →` link to the existing `/prosjekter` placeholder;
it has a 44px minimum target height and the shared visible keyboard focus outline.
The `/prosjekter` page is unchanged.

The optional `projects` prop accepts exactly two entries. Each supports an
optional `image` containing a real `src`, descriptive `alt`, and optional
`position.mobile`, `position.tablet`, and `position.desktop` object-position values.
Sources may be local URLs or static imports. Optional `title` and `category`
produce a semantic caption only when supplied. The default data is two empty
objects. When approved photography arrives, replace those empty entries with
real configurations; `next/image` supplies responsive sizes, cover fitting and
the reserved geometry. Review alt text, crops and any metadata with the client.
No nonexistent image file is referenced now.

Phase 07 validation: ESLint (zero warnings), TypeScript and production build
passed. The fresh production instance reported port 3002; actual browser requests
to `http://localhost:3002` returned HTTP 200 and rendered all five homepage sections.
Checks and visual review at 1440 × 900, 768 × 1024, 393 × 852 and 320 × 700
confirmed both placeholders, asymmetric alignment, two headline lines, no clipped
copy or horizontal overflow, and zero gap after Featured Craft. Featured Craft's
source files and layout geometry are unchanged. Keyboard focus showed the shared
2px outline with a 4px offset, and Enter opened `/prosjekter` with its existing H1.
No console or application errors were observed. Screenshots were captured outside
the repository; section captures hide the fixed header only during capture.
Approved photos and real project metadata remain pending. No dependencies,
additional sections or subpage changes were introduced.

## About preview

`src/components/sections/about-preview.tsx` is a Server Component immediately
after Selected Projects. It contains only the supplied Norwegian heading,
paragraph and `BLI KJENT MED OSS ↗` link to `/om-oss`. No history, credentials,
statistics, testimonials or other company claims have been added. The destination
page remains unchanged.

`src/styles/about-preview.css` reuses the existing container, responsive grid,
spacing, fonts and color tokens. Paper provides a subtle transition from the
ivory Projects section. A thin rule anchors the typography-led composition.
Desktop places the label in columns 1–3, the three-line headline in columns 4–12,
and the narrower paragraph and CTA in columns 8–12. Tablet shifts the headline
to columns 2–6 and supporting copy to columns 3–6. Mobile uses one reading column
in the order label, heading, paragraph and CTA.

Regular-weight DM Sans scales from 36px on mobile to 72px at 1440px, with a
maximum of 88px. The paragraph is limited to 38ch and uses accessible muted text.
IBM Plex Mono carries the section label and CTA. The semantic section is labelled
by its H2; the arrow is hidden from assistive technology. The link has a 44px
minimum target height and uses the shared focus outline. No imagery, cards,
animations or transitions are introduced, so reduced-motion preferences require
no separate animation override.

Phase 08 validation: ESLint (zero warnings), TypeScript and production build
passed. A fresh production server reported port 3003; actual browser checks at
`http://localhost:3003` returned HTTP 200 and confirmed the six-section homepage
order. Visual review and layout checks at 1440 × 900, 768 × 1024, 393 × 852 and
320 × 700 confirmed the three headline lines, grid alignment, zero gap after
Selected Projects and no horizontal overflow or clipped text. Paragraph contrast
measured approximately 8.2:1. Keyboard focus displayed the shared 2px outline
with 4px offset; Enter navigated to `/om-oss` and its existing H1. Normal and
reduced-motion checks returned no animations or transitions. No console or
application errors were observed. Source hashes confirm the completed sections,
their styles, navigation styles, design tokens and About subpage are unchanged.
Screenshots are outside the repository; section captures hide the fixed header
only during capture. No outstanding section issues were found. No dependencies,
Contact, Footer or subpage changes were added.

## Known tooling limitations

The initial npm audit reports five high-severity entries in the development-only
ESLint dependency chain, rooted in `braces` (GHSA-vfj7-8cjw-p6xm). Its latest
available version is 3.0.3 and no updated fix was available during setup.
`npm audit --omit=dev` reports zero vulnerabilities. Do not apply the suggested
forced downgrade of `eslint-config-next` to Next.js 14; revisit the tooling when
an upstream fix is released.

ESLint 9 is used for compatibility with the Next.js lint plugins and the local
Node.js runtime. npm marks this ESLint release as no longer supported. Revisit
ESLint 10 when the complete plugin chain supports it. The local Node.js 23.6
runtime also triggers an engine warning for a transitive lint dependency; use
the LTS runtime recommended above for ongoing development.
