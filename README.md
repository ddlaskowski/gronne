# Grønne Mur og Flis AS

Phase 03: editorial split hero for gronne-murogflis.no.
The homepage contains the hero; the four navigation destinations remain minimal
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
- `src/components/sections`: hero and its optional image loader.
- `src/lib`: shared navigation destinations.
- `public/brand`, `public/images/{hero,projects,services}`: reserved asset directories.

The layout, logo, desktop navigation and route placeholders are Server
Components. The hero is also a Server Component. Only header scroll state,
the mobile menu and optional image-load failure handling use Client Components.
There are no extra libraries for animation, UI or state management.

## Navigation and brand

`BrandLogo` renders the original `public/brand/gronne-logo.svg` through
`next/image`, using the 663.43 × 464.89 viewBox ratio. The asset is unchanged;
its original gradient and geometry stay inside the SVG. The logo has a neutral
ivory backing so it remains usable over future dark imagery.

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

Supply approved hero photography and confirm its crop. Further homepage
sections and motion design remain separate phases.

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

Photography belongs at `public/images/hero/hero-craft.webp`. This file is
currently absent, so the hero shows a dark architectural CSS placeholder and
makes no request for a missing image. Add the file and rebuild to activate it.
The image uses `next/image`, `fill`, responsive `sizes`, cover fitting and
`object-position: 45% 50%`. It is preloaded because it is above the fold on
desktop. Its empty alt marks it as decorative beside the complete text content.
Review the crop and alt decision when the approved photograph is available.
An image-load failure removes only the image, retaining the same panel geometry
and CSS placeholder. No filters or overlays are applied to photography.

The original logo is unchanged. The optional decorative G is omitted because
the provided asset includes the full wordmark.

Phase 03 validation: ESLint (zero warnings), TypeScript and production build
passed. Layout checks covered 320px, 375px, 768px, 1024px (600px-tall window),
1280px and 1440px widths. The corrected layouts have no horizontal overflow or
heading overflow. Production checks confirmed the project CTA, visible keyboard
focus, the mobile menu and Escape, and no console errors or warnings. The missing
photograph produces no broken-image request. Actual photo loading, final crop
and load-failure recovery still need verification with the approved asset.

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
