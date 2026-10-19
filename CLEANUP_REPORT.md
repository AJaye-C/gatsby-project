# Cleanup report

**Scan branch:** `chore/cleanup-unused`  
**Phase:** Phase 1 was read-only; Phase 2 actions are recorded at the end of this baseline report.  
**Scope:** Gatsby source, route creation, package/config references, custom styles, and static asset references. Searches excluded generated `public/`, `.cache/`, and `node_modules/` content.

## Safe to delete (High)

These are unreachable from the Gatsby entry points and no dynamic import/context loader was found. Deletion still requires approval.

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `src/components/home/{Hero,ClientLogos,VideoCTABanner,VideoScroller,QualitySection,PhotographySection,ServicesChecklist,TeamSection,ReviewsCarousel,PricingCTA,BehindTheScenes}.js` | Legacy home components | Traced imports from `src/templates/page.js` and `src/templates/blog-post.js`; the only imported home-barrel names are `Header` and `Footer`. Searched each component name across `src`; no direct consumer was found. The current page template renders `SectionRenderer`. | High | 43,417 B |
| `src/components/photography/{PhotographyContact,PhotographyHero,PhotographyProcess,PhotographyServices}.js`; `src/components/videography/{VideographyHero,VideographyIntro,VideographyPortfolio,VideographyProcess}.js`; `src/components/testimonials/{TestimonialsCarousel,TestimonialsContact,TestimonialsDetails,TestimonialsIntro}.js` | Legacy per-page components | None are imported from a Gatsby entry point or registered by `SectionRenderer`. New page-builder replacements exist in `src/components/sections/` with matching fragments in `src/templates/page.js`. The legacy `VideographyProcess` → `PhotographyProcess` dependency is internal to this unreachable group. No `src/pages/` static routes exist. | High | 58,674 B |
| `src/data/{blogBodies.js,blogRecords.cjs,blogs.js,testimonialPages.js,testimonials.js}` | Legacy data | No imports from reachable files. Searched `blogBodies`, `blogRecords`, `testimonialPages`, `testimonials`, and import paths across `src`; current blog templates/components use WordPress queries and `src/utils/blog.js`. | High | 22,915 B |
| `src/components/shared/adaptProps.js` | Helper | No imports/requires anywhere in `src`; no dynamic loader was found. | High | 1,592 B |
| `lucide-react` | Dependency | `rg` found references only in `package.json` and `package-lock.json`; no source/config/script import or require. | High | Not counted (installed package is ignored `node_modules/`) |

**Safe source-file subtotal:** 126,598 B (about 123.6 KiB). This excludes the dependency's installed size.

## Probably unused (Medium)

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `static/figma/icons/{icon-arrow.svg,portfolio-skip.svg,portfolio-volume.svg,what-they-say-2.svg,what-they-say-yellow.svg,what-they-say.svg}` | Static assets (6 files) | Searched each full `/figma/icons/...` path, relative path, and filename in JS/JSX/CJS/CSS/JSON/MD. No match. (The similarly named `1.svg` is excluded: `src/utils/stageNumeral.js` builds its path dynamically.) | Medium | 33,183 B |
| `static/figma/images/{contact-partners-2x.png,contact-vacancies-2x.png,hero-video.png,howwork-1.png,howwork-2.png,img-serv-edit.jpg,img-serv-plan.jpg,img-serv-talent.jpg,img-works-1.png,img-works-2.png,img-works-3.png,img-works-4.png,img-works-5.png,img-works-6.png,img-works-7.png,img-works-8.png,nursem.png,pho-post.png,pho-pre.png,pho-prod.png,pricing-photography-2x.png,pricing-video-production-2x.png,rec-1.png,rec-3.png,soap.gif,vid-post.png,vid-pre.png,vid-prod.png,vidprod-about-1.png,vidprod-about-2.png,vidprod-about.png,wordmark.png}` | Static assets (32 files) | Searched each full path, relative path, and filename in JS/JSX/CJS/CSS/JSON/MD. No match. Since WordPress content is external to this checkout, an existing CMS page could still refer to a static URL. | Medium | 42,478,547 B |
| `static/figma/images/blog/slide-10-pending.jpg` | Static asset | Searched full path, relative path, and filename in JS/JSX/CJS/CSS/JSON/MD; no match. CMS/external references cannot be inspected from this repository. | Medium | 827,945 B |
| `static/figma/videos/{client-1.1.mp4,client-1.2.mp4,client-2.mp4,client-3.1.mp4,client-3.2.mp4,client-3.3.mp4,client-4.mp4,client-5.mp4,client-6.1.mp4,client-6.2.mp4,client-7.mp4,client-8.mp4,pocketperson.mp4,pricing.mp4,rec-2.mp4,rec-4.mp4}` | Static assets (16 files) | Searched each full path, relative path, and filename in JS/JSX/CJS/CSS/JSON/MD; no match. Checked for partial/dynamic video-name construction; source uses explicit paths for the referenced videos, not these filenames. External WordPress content remains unverified. | Medium | 217,610,621 B |

These 55 asset candidates total **260,950,296 B (about 248.8 MiB)**, but are not included in the safe reclaim total until WordPress content or other external references have been checked.

## Uncertain (Low)

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `src/components/home/index.js` exports `Hero`, `ClientLogos`, `VideoCTABanner`, `VideoScroller`, `QualitySection`, `PhotographySection`, `ServicesChecklist`, `TeamSection`, `ReviewsCarousel`, `PricingCTA`, `BehindTheScenes` | Dead barrel exports | The page template imports only `{ Header, Footer }` from this barrel; no direct imports of these other names were found. Keep the barrel and its live exports if removing only the old components. | Low | Included in legacy home group |
| `src/components/sections/index.js` export `ReviewsCarousel` | Dead barrel export | No consumer of this named export; `VideoReviews.js` imports the component directly, so the component file itself is live and must be retained. | Low | 0 B |
| `src/components/sections/Timeline.js` named export `StoryArrow` | Unused named export | The symbol is used within `Timeline.js`, but no external named import was found. The separate `src/components/sections/StoryArrow.js` implementation is used by `ProcessSlider`; do not conflate the two. | Low | Not separately attributable |
| `src/styles/animations.css` selectors `.photography-cta-pill`, `.section-three-cta-pill`, `.services-video-process-image-left`, `.services-video-process-image-right`, `.services-video-process-row-image-left`, `.services-video-process-row-image-right`, `.works-category-option`, `.works-fade-in`, `.works-reel-pause-bars`, `.works-reel-play`, `.works-reel-play-bars`, `.works-reel-play-triangle`, `.works-reel-toggle` | Potential dead CSS | Exact selector-token search found no JS/JSX/CJS references. Dynamic class construction or CMS-provided markup cannot be ruled out, so retain pending review. | Low | Part of `src/styles/animations.css` |
| `gatsby-source-wordpress` | Configuration/dependency mismatch (resolved in Phase 2) | At scan time, `gatsby-config.js`, `package-lock.json`, and local `node_modules/` included `^7.17.0`, but `package.json` did not. It is required by configuration, not an unused dependency; Phase 2 added the existing locked version to the manifest before uninstalling `lucide-react`. | Low | Not counted |
| Duplicate static files: `static/figma/videos/bts.mp4` = `client-1.2.mp4` = `client-7.mp4`; `beauty.mp4` = `client-3.2.mp4`; `client-1.1.mp4` = `client-6.2.mp4`; `client-2.mp4` = `client-8.mp4` = `fooddrink.mp4`; `client-4.mp4` = `product.mp4`; `static/figma/images/photo/pack.png` = `static/figma/images/video/pack.png` | Byte-identical assets | SHA-256 content comparison found identical pairs/groups. Distinct URLs may still be used by code, WordPress content, or other consumers; deduplication would require reference updates and verification. | Low | Potentially ~34 MB, overlapping the asset candidates above |
| WordPress page slugs/content | Route verification | `gatsby-node.js` creates `/` or `/{slug}/` only for WordPress pages with at least one builder section. No static `src/pages/` files exist, and the external WordPress page inventory was not available for this read-only scan. | Low | N/A |

## Unused dependencies

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `lucide-react` | Dependency candidate | No source, Gatsby config, script, or config import/reference beyond its manifest and lockfile entries. Other direct dependencies are referenced by application code or Gatsby/PostCSS/Tailwind configuration; keep Gatsby, React, and React DOM runtime dependencies. | High | Not counted (installed package is ignored `node_modules/`) |

No `devDependencies` are declared.

## Dead exports/code

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `src/components/home/index.js` (11 names listed in Uncertain) | Dead barrel exports | Only `Header` and `Footer` are imported by the page template; the remaining barrel exports have no direct consumers and their underlying components are listed as unreachable above. | High | Included in legacy home group |
| `src/components/sections/index.js` → `ReviewsCarousel` | Dead barrel export | The barrel export is unused; `VideoReviews.js` imports the component directly. Other shared exports (`LogoMarquee`, `StoryArrow`, `BlogCategoryDropdown`) are used directly and are not dead components. | High | 0 B |
| `src/styles/global.css` selectors `.wrap`, `.heading-accent-yellow`, `.heading-accent-cyan`, `.section-kicker`, `.hide-scroll` | Potential dead custom CSS | Exact selector-name searches across source found definitions but no JSX/JS references. `text-section-kicker` is a different Tailwind class. | Medium | 868 B file; removable-rule byte count not calculated |
| Source comments | Commented-out code | Searched for commented import/export/declaration/return statements and executable block-comment patterns; no dead executable blocks found. | High | 0 B |
| Source files | Duplicate files | SHA-256 scan found no identical source files. No `-copy`, `_1`, `.bak`, or `.old` source/project filenames found. | High | 0 B |

## Orphan fragments/components

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| `src/templates/page.js` fragments ↔ `src/components/shared/SectionRenderer.js` `sectionMap` | Fragment/registry audit | Parsed all fragment type names and registry keys: **50 fragments, 50 keys; no fragment without a key and no key without a fragment.** | High | N/A |
| Legacy home and per-page component groups above | Orphan components | Import tracing from page/blog templates and Gatsby route creation shows no entry-point path to these files. No `src/pages/` static routes were found. | High | 102,091 B |
| `src/images/` | Directory check | Directory does not exist, so there are no `src/images` assets to classify. | High | 0 B |

## Total size reclaimed

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| High-confidence source candidates listed above | Source files | Sum of the listed orphan files: 11 old home components, 12 legacy per-page components, 5 orphan data files, and `adaptProps.js`. | High | **126,598 B (~123.6 KiB)** |
| `lucide-react` | Dependency | Candidate for `npm uninstall` after approval; package installation size not included. | High | Not counted |
| Unmatched static assets listed above | Static files | No local code reference found, but external WordPress references are unverified. | Medium | **260,950,296 B (~248.8 MiB), not included in safe total** |

**Phase 1 estimate:** 126,598 B of high-confidence source files, plus the installed `lucide-react` package size. The realized Phase 2 total is recorded below.

## Protected / non-candidate checks

- `public/` is ignored by `.gitignore` (`public/` rule); no files under it are proposed for removal.
- `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `package.json`, `package-lock.json`, Tailwind/PostCSS config, `.env*`, `.gitignore`, and generated/ignored files were not proposed for deletion.
- No `src/pages/` or README file was present in the scanned project layout. No empty source directories were found.
- The external WordPress inventory was successfully queried by Phase 2 builds; no static `src/pages` routes were removed.

## Phase 2 status (approved groups)

| Path | Type | Why it's unused (evidence: searched terms + results) | Confidence | Size |
|---|---|---|---|---:|
| Legacy home/per-page components and `src/components/shared/adaptProps.js`; associated dead home-barrel exports | Removed source files/exports | Removed after import tracing. An initial build exposed a missed direct consumer of `src/components/sections/ReviewsCarousel.js`; that file was restored and retained. Subsequent build succeeded. | High | 103,683 B |
| `src/data/{blogBodies.js,blogRecords.cjs,blogs.js,testimonialPages.js,testimonials.js}` | Removed data files | No reachable imports; build succeeded after removal. | High | 22,915 B (included in source total above) |
| Listed 55 unmatched `static/figma/` candidates | Removed static assets | Approved after the report; removed by explicit path list. Build succeeded with the WordPress routes still generated. Duplicate files outside that list were retained. | Medium | 260,950,296 B |
| `lucide-react`; `package.json` | Removed/declared dependencies | Removed unused package with `npm uninstall`. Added existing lockfile version `gatsby-source-wordpress@^7.17.0` to `package.json` first because it is configured and required; `npm ls --depth=0` and build succeeded. | High | Package bytes not counted |
| `src/components/sections/index.js`, `src/components/sections/Timeline.js`, `src/styles/global.css` | Dead exports/custom CSS | Removed unused shared barrel re-exports, made `Timeline`'s internally used `StoryArrow` private, and removed five global custom selectors with no JSX references. Build succeeded. Lower-confidence `animations.css` selectors remain. | Medium | CSS bytes not counted |

**Realized reclaimed size:** 261,076,894 B (about 249.0 MiB) from deleted source and static files; excludes the installed dependency and removed CSS rules. The low-confidence duplicate assets and potential dead selectors in `animations.css` remain untouched.
