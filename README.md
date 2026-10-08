# Grønne Mur og Flis AS

Phase 01: project foundation and design system for gronne-murogflis.no.
The homepage is a minimal Norwegian Bokmål placeholder. Navigation, hero,
services, projects, footer and animation belong to later phases.

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
- `src/components/layout`: reusable responsive container.
- `src/components/ui`, `src/components/sections`, `src/lib`: reserved for future phases.
- `public/brand`, `public/images/{hero,projects,services}`: reserved asset directories.

All current components are Server Components. There are no additional client
components or libraries for animation, UI or state management.

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

Obtain the original logo and approved imagery, confirm the foundation, then
develop navigation and the final hero in a separate phase.

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
