# NOVA Home Construction

A portable static website for NOVA Home Construction, Calgary.

## Website files

All public files are at the repository root. No build or package installation is required.
Preview locally with `python3 -m http.server 8000` and open http://localhost:8000.
Deploy the repository root to a static host. Relative URLs support domain-root and repository-subpath hosting.

## Features

- 17 HTML pages and eight detailed service pages.
- Native scroll-driven interior/exterior image reveal, subtle image zoom and reading progress.
- Progressive cross-document View Transitions on supporting browsers.
- Responsive navigation, visible keyboard focus, reduced-motion handling, native FAQ disclosure controls.
- Estimate form prepares copyable project details; it does not submit to a server. Contact is by telephone.

## Editing

- `styles.css`: original shared layout and refined architectural theme.
- `cinematic.css`: scene composition, page transitions, FAQ and scope layouts.
- `script.js`: navigation, reveal behavior and enquiry preparation.
- `cinematic.js`: scroll progress and pinned image sequence.
- ``: optimized architectural concept imagery.

Business telephone: +1 825-288-4475.
No analytics, newsletter backend, email delivery, or payment processing is connected.

## Imagery

The two assets named `calgary-*-concept.webp` were generated as architectural inspiration and are disclosed as such on the website. Supplied architectural images are not represented as verified completed NOVA projects. Replace with owner-verified project photography when available.

## Validation

JavaScript syntax and local asset/page references were checked. Browser visual and interaction QA remains outstanding in this environment. Review mobile navigation, form preparation and the full scroll sequence on actual devices before public launch.

## Design references

Seven user-supplied TikTok references were opened and sampled visually. They showed immersive 3D scenes, rotating products, layered photography, image masks, oversized typography and smooth section transitions. This build adapts image layering and scroll progression; it does not implement a full 3D model or frame-by-frame video scrubbing.

Implementation references:
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

## GitHub handoff

Preserve the destination repository's existing configuration and deployment workflow when importing. The downloadable package includes website files at its root for easy import. The Sites identity and source credentials are excluded from that package.

## Publish with GitHub Pages

Unzip this archive and upload its contents to your repository, with index.html at the root. In GitHub, open Settings > Pages, select Deploy from a branch, then choose main and /(root). Save.

Image files are deliberately at the root. Upload every file from this extracted ZIP alongside index.html. No image folders are required.
