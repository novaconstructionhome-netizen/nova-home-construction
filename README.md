# NOVA Home Construction — bilingual website

Static HTML, CSS and JavaScript. Upload the contents of this folder to the existing GitHub Pages repository. Keep all filenames and image paths unchanged. No build, paid API or backend is required. CNAME is preserved from the existing repository.

## English / Canadian French

- `translations.js` contains complete centralized `en` and `fr` dictionaries (487 keys).
- `i18n.js` applies keyed text, accessible image/link descriptions, page titles and meta descriptions. Language is saved as `nova-language` in localStorage. English is the default.
- Every HTML page has the same EN / FR controls. Switching retains the current page, form inputs and section; dropdowns and dynamically prepared enquiries also switch.
- `data-i18n` identifies text. Attribute keys use `data-i18n-alt`, `data-i18n-aria-label`, `data-i18n-content` and related attributes. Do not remove these when editing.
- Extend both dictionaries whenever adding text. Keep company names and contact details unchanged.

## Requested enhancements

`enhancements.css` and `enhancements.js` add counters, a masked logo shimmer, contact icons and the review carousel. Existing image files are unchanged. The four editable counters are in index.html (`data-count` and `data-suffix`). Reduced-motion preferences are supported.

The homepage `#customer-reviews` section contains 15 clearly labelled fictional SAMPLE reviews, never represented as genuine client feedback. Both review navigation links point there. The previous reviews.html URL remains functional as a landing page. Replace sample copy with approved real testimonials before presenting any review as genuine.

## Contact configuration

In `site-config.js`, enter the real business email address and full HTTPS URLs for Instagram, Facebook and LinkedIn. Unconfigured links/cards stay hidden, avoiding invented or non-working destinations. The telephone link already works.

The existing estimate/contact form prepares copyable project details. It does NOT send an enquiry or email to the company. Both validation and prepared text are bilingual. A backend or form-delivery service would be needed to receive submissions automatically.

## Verification

All 17 pages passed DOM execution checks in English and French (34 combinations): keyed text and attributes, metadata, language preference, reversible switching, menu labels, required-field validation, prepared enquiries, preservation of entered values, review count and pause control. All local asset/page references resolve; all 52 image files match the original repository bytes. See verification.json.

Full visual browser QA was not completed: the cloud browser could not reach the local server, and file URLs are prohibited. Responsive rules cover the requested widths, but visual review at 320, 375, 390, 768, 1024 and 1440 pixels remains required. No claim is made that these viewport checks passed.

## Upload

Unzip the delivered archive, open its folder, select all contents and upload them to the existing repository root. Replace matching files. Include the four new runtime files and site-config.js. Do not upload the ZIP itself. Preserve CNAME. Wait for the GitHub Pages deployment to finish before refreshing the site.
