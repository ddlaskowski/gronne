# Grønne Mur og Flis AS

Phase 13: service content alignment for gronne-murogflis.no.
The homepage contains the hero, introduction, services, featured craft, selected projects,
about preview and contact CTA. A shared footer closes every route.
Services, Projects and About have complete editorial layouts; Contact remains a minimal Norwegian Bokmål placeholder.

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
- `src/components/layout`: header, navigation, mobile menu, responsive container and global footer.
- `src/components/ui`: original brand logo.
- `src/components/sections`: hero, image loader, introduction, services, featured craft, selected projects, about preview and contact CTA.
- `src/lib`: shared navigation destinations and typed project-gallery data.
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

Approved project photography and subpage content can be integrated in future phases.

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

## Contact CTA and global footer

`src/components/sections/contact-cta.tsx` is a Server Component immediately
after About Preview on the homepage. It uses only the supplied section label,
two-line H2, paragraph, `TA KONTAKT ↗` link to `/kontakt` and phone number.
`src/styles/contact-cta.css` reuses the charcoal/paper colors, grid, fonts,
spacing and regular-weight typography tokens. Desktop starts the headline at
column 2, with supporting copy in columns 2–5 and actions in columns 9–12.
Tablet uses a full-width headline with two smaller areas beneath. Mobile follows
the order label, headline, paragraph, CTA and phone. Heading size is 32px on the
tested mobiles, 53.76px at 768px and 108px at 1440px, with a maximum of 112px.

`src/components/layout/footer.tsx` is a Server Component rendered exactly once
after route content in `src/app/layout.tsx`. It appears on the homepage and all
four placeholder subpages. `src/styles/footer.css` uses the same charcoal
background, thin dividers and horizontal editorial rows: company/location,
contact links, then navigation/copyright. Mobile stacks identity and contact
details and allows navigation to wrap. Navigation reuses `navigationItems`.
The footer includes only the supplied company name, Oslo og omegn, phone and
email; the copyright year is evaluated when the server renders/builds the page.

Both telephone links use `tel:+4747153017`; email uses
`mailto:slawek.kalemba@gmail.com`. The labelled Contact section uses an H2,
and the footer uses semantic `footer`, `address` and a distinct `Bunnmeny` nav.
Links have a minimum 44px target height. Scoped paper focus rings retain visible
keyboard focus on charcoal without changing earlier sections. No forms, icons,
new dependencies, animations or transitions were introduced.

Phase 09 validation: ESLint (zero warnings), TypeScript and production build
passed. The fresh production preview reported port 3004 and returned HTTP 200
at `http://localhost:3004`. Browser checks and visual review covered 1440 × 900,
768 × 1024, 393 × 852 and 320 × 700. All sizes confirmed the Contact section
after About Preview, one footer immediately after main content, two headline
lines, no horizontal overflow or clipped text, and the exact telephone/email
URLs. Contact CTA keyboard navigation opened `/kontakt`. All four footer links
were followed at every size; each destination displayed its existing H1 and
exactly one global footer, with no homepage Contact section. Every new link was
keyboard-focusable with a visible paper outline. Supporting text contrast measured
approximately 11.1:1 and footer metadata 9.2:1. Normal and reduced-motion styles
have no animations/transitions. No console or application errors were observed.
Hashes of all 19 previously completed section/style/subpage files are unchanged.
Screenshots were saved outside the repository, with the fixed header hidden only
during section captures. No outstanding issues were found for this phase.

## Services page

`src/app/tjenester/page.tsx` replaces the route placeholder with a Server Component
and a route-specific title. It has one H1, the supplied service names/keywords/
descriptions, three labelled semantic service sections with H2 headings, and a
simple closing CTA to `/kontakt`. Content is limited to the supplied wording;
no credentials, methods, guarantees, counts, testimonials or fictional project
information were added.

`src/styles/services-page.css` is imported by the route and scopes all selectors
to Services page classes. It reuses `Container`, the 12/6/4-column grid, palette,
font and spacing tokens without changing shared styles or utilities. The light
hero has a two-line regular-weight headline, a left label and offset description.
DM Sans carries the large headings and copy; IBM Plex Mono carries the indices,
keywords, placeholder labels and CTA.

On desktop, Bad & Flis places a 5:4 media area in columns 1–7 and copy in columns
9–12. Mur & Puss reverses the composition: copy in columns 1–4 and 4:3 media in
columns 6–12. Betong & Forskaling uses copy in columns 2–6 and a smaller 4:5
portrait surface in columns 9–12. Thin rules and alternating paper/ivory surfaces
maintain consistency. Tablet uses equal three-column media/copy areas with
alternating placement; the third media area is a shorter landscape. Mobile keeps
number, heading, keywords, description and media in that reading order, with 24px
internal gaps and 48px section padding. The long final heading wraps to two lines.

All media areas are neutral mixes of the existing stone and ivory tokens labelled
`PROSJEKTFOTO KOMMER`. There are no real or generated photographs, image requests,
icons or fictional metadata. These surfaces await approved client photography.
The closing charcoal CTA reuses the existing `contact-cta-link` treatment and
paper focus ring; the existing root-layout footer is rendered only once. No
animations, transitions or dependencies were added.

Phase 10 validation: ESLint (zero warnings), TypeScript and production build
passed. The fresh production server reported port 3005 and returned HTTP 200 at
`http://localhost:3005/tjenester`. Browser checks and visual review covered
1440 × 900, 768 × 1024, 393 × 852 and 320 × 700. All sizes confirmed one H1,
three service placeholders, correct alternating desktop/tablet layouts, natural
mobile wrapping, no horizontal overflow or clipped copy, and exactly one global
footer immediately after main content. Body-text contrast is approximately
7.8–8.2:1 and placeholder-label contrast exceeds 13:1. Keyboard focus is visible
on the 44px contact link; Enter opened `/kontakt`. Footer navigation returned to
Services, and the brand link returned to the unchanged seven-section homepage.
No console or application errors were observed. Reduced-motion styles have no
animations/transitions. Hashes of all 27 previously completed homepage, layout,
component and style files are unchanged. Existing user favicon changes were
preserved. Screenshots were saved outside the repository, with the fixed header
hidden only during section captures. No functional issues were found.

## Projects page

`src/app/prosjekter/page.tsx` replaces the placeholder with a Server Component
and route-specific title. It uses the supplied light hero, one H1 (`Arbeidet vårt.`),
supporting text, four static project surfaces and a restrained contact CTA.
`src/styles/projects-page.css` is imported by the route and scopes all selectors
to Projects classes, reusing the existing grid, container, palette, fonts and
spacing. The CTA uses the existing contact-link styling and points to `/kontakt`.
The global footer remains exclusively in the root layout.

Desktop gallery row 1 places a dominant 16:10 landscape surface in columns 1–10.
Row 2 pairs a 4:5 portrait in columns 1–4 with a 3:2 landscape in columns 6–12,
offset down by 96px. Row 3 places a broad 16:9 surface in columns 2–12.
Tablet uses full-width opening/closing surfaces and an equal-width middle pair
with a reduced 48px offset. Mobile presents four full-width surfaces in source
order at 4:3, 4:5, 3:2 and 4:3 ratios, separated by 32px. No gallery item is
clickable and none has a hover transition, animation, lightbox or detail route.

`src/lib/projects.ts` defines `ProjectEntry` and four technical gallery positions.
Each entry supports `id`, a composition role, responsive aspect ratios, an optional
image with `src`, descriptive `alt` and responsive `objectPosition`, plus optional
`title`, `category` and `location`. Aspect ratios and positions have mobile,
tablet and desktop values with smaller-breakpoint fallbacks. Default entries
contain only layout information; there are no invented names or other metadata.

When client-approved assets become available, populate `image` and any approved
metadata in that file. The route renders `next/image` with `fill`, responsive
`sizes` and cover fitting inside the same reserved aspect-ratio frame, avoiding
image-loading layout shifts. Captions render only when an image and actual
metadata are supplied. Review real-photo crops and alt text when integrating.
Currently no gallery image file is requested, and all four stone/ivory surfaces
display only `PROSJEKTFOTO KOMMER`.

Phase 11 validation: ESLint (zero warnings), TypeScript and production build
passed. The fresh production server reported port 3006 and returned HTTP 200 at
`http://localhost:3006/prosjekter`. Browser checks and visual review covered
1440 × 900, 768 × 1024, 393 × 852 and 320 × 700. All sizes confirmed the
intended gallery placement/proportions, one H1, four placeholders, zero gallery
images/captions/interactive elements, no overflow or clipped text, and one global
footer immediately after main content. Placeholder-label contrast exceeds 13:1;
supporting-copy contrast is approximately 7.8:1. The contact link has a visible
paper keyboard focus outline and a 44px target height; Enter opened `/kontakt`.
Footer navigation returned to Projects and reached the completed Services page,
then the brand link reached the unchanged seven-section homepage. No console
or application errors were observed. Normal and reduced-motion rendering have
no new animations/transitions. Hashes of all 29 previously completed homepage,
Services, layout, component and style files are unchanged. Screenshots were saved
outside the repository, hiding the fixed header only during section captures.
Approved project photographs and metadata remain pending; no functional issues
were found. No dependencies were added.

## About page — Phase 12

`src/app/om-oss/page.tsx` is a Server Component with an editorial introduction,
three confirmed service groupings, a craftsmanship section and a contact CTA.
Route-scoped `src/styles/about-page.css` reuses the shared container, grid,
tokens and fonts. Desktop combines offset typography, staggered service rows
and a portrait media surface; mobile stacks content in reading order.

`src/components/sections/about-craft.tsx` displays `PROSJEKTFOTO KOMMER` until
an approved image is supplied. Its optional image prop supports `next/image`,
required alt text and responsive crop positions. No company history or credentials
were invented; the unconfirmed term “murprofil” is omitted.

ESLint, TypeScript and the production build passed. Browser checks and visual
review covered 375, 768, 1024 and 1440px: no overflow, clipping or console errors;
accessible heading hierarchy, sufficient contrast, visible keyboard focus,
working contact navigation and one global footer. Reduced-motion rendering has
no new animations or transitions. Homepage, Services, Projects, Header and Footer
sources are unchanged. Preview: `http://localhost:3007/om-oss` (port 3007).
Approved photography remains pending. No dependencies were added.

## Content alignment — Phase 13

The homepage, Services and About pages now use the same ordered groups:
`BAD & FLIS` (Baderom · Flislegging · Membranarbeid), `MUR & PUSS`
(Murarbeid · Sementpuss · Mineralpuss), and `AVRETTING & FORSKALING`
(Betongavretting · Avrettingsmasser · Forskaling). Hero and About Preview copy
name the confirmed services; broad claims about general concrete work are removed.
Services descriptions cover baderomsarbeid/flislegging/membranarbeid, confirmed
cement/mineral plaster work, and betongavretting/avrettingsmasser/forskaling.
Projects introductory copy acknowledges that photographs are pending; its gallery
and placeholders are unchanged. Page descriptions and the default SEO title use
accurate service terminology and Oslo og omegn without speculative masonry claims.

**Client review required:** `Murarbeid` remains only in the requested `MUR & PUSS`
keyword lists on the homepage, Services and About pages. Its scope has not been
confirmed by the supplied service list. The Services description makes only the
confirmed sementpuss/mineralpuss claims. Confirm whether `Murarbeid` is appropriate
and clarify the client's term `murprofil` before expanding or changing this wording.
`Murprofil` is not published or interpreted.

No CSS, grid, font, palette, spacing, header/footer component, placeholder or
interaction changes were needed. ESLint, TypeScript and the production build passed.
Browser checks covered the homepage, Services, About, Projects and Contact at
375, 768, 1024 and 1440px. All 20 page/viewport combinations passed without
horizontal overflow, clipped text, console errors or duplicate footers. Updated
headings wrap naturally; contact/About CTAs and shared navigation work by keyboard.
Production preview: `http://localhost:3008` (port 3008).

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
