Latest responsive fix: the 404 camera now fits the full scene with a 10% margin. Geometry checks passed at 18 portrait/landscape viewport sizes from 320 to 3840 pixels wide (responsive-verification.json). These are mathematical projection checks, not real-browser/device screenshots. The canvas pauses offscreen/when hidden, touch rendering is capped at 30 fps, pixel ratio is capped, and reduced motion stays static. Browser/physical-device visual validation is still outstanding.

Latest update: email changed to info@novahomeconstruction.ca, contact menu says Call Us, estimate CALL panel removed, bilingual privacy/terms and security controls added. Read SECURITY-AND-PRIVACY.md before enabling the form; the new CSP requires your exact Worker origin. Current verification is in verification.json. Older test counts below describe earlier versions.

# Verified update from your two uploaded ZIPs

ZIP 2 is the design baseline. ZIP 3 provides the requested additional features. Original homepage content, core styles, cinematic scripts, logo and 52 images have been compared with ZIP 2 and preserved. New edits add an accessible close button to the floating contact menu, a consistent secondary-phone icon and your requested bilingual confirmation wording.

## Upload without losing pages

Use GitHub Desktop to copy the complete extracted folder CONTENTS into your cloned repository, preserving all subfolders, then commit and push. This avoids browser upload-count limits. Your root index.html is the homepage; about/index.html and other nested index files must stay inside their own folders. Never drag all nested index.html files into the root.

If using browser uploads, upload the root files first and commit, then upload the whole page folders in a separate batch. Do not upload the ZIP itself. Keep CNAME. The unchanged main headline must read “A home, beautifully reimagined.”

## Tests run for this package

- 19 pages, 38 English/French runs, 114 language-state checks: passed.
- Mobile navigation and contact close controls in DOM tests: passed.
- All required footer contact targets: passed.
- Homepage counter values and scrolling-review card generation: passed.
- Local HTTP requests for pages and assets: passed; see verification.json for count.
- Backend acceptance/failure, validation, anti-spam and duplicate handling: four suites passed with mocked providers.
- Visual browser inspection: NOT completed. The remote browser could not connect to the local HTTP server (ERR_CONNECTION_REFUSED). No claim is made that the 3D animation or mobile appearance has been visually approved.
- Actual email delivery: NOT configured or tested. Follow the account setup below; until then the online submit button is intentionally disabled and the official email/phone are shown.

# NOVA website upgrade

Prepared 8 October 2026 from the latest available GitHub main branch. Hosting remains GitHub Pages with `CNAME` set to `novahomeconstruction.ca`. Existing branding, styles and all 52 photographs/logo images are preserved.

## Publish the website

1. Download and extract the ZIP. Keep its folders intact.
2. In `novaconstructionhome-netizen/nova-home-construction`, upload the **contents**, including the service subfolders, replacing matching files. Do not upload just the ZIP and do not flatten folders.
3. Keep `CNAME`. GitHub Settings → Pages should publish the repository's main branch, root directory. No build command is required.
4. Wait for the Pages deployment to finish, then refresh the site. The homepage is `https://novahomeconstruction.ca/`.
5. Test `/services/kitchen-renovations/`, `/free-estimate/`, French preference after refresh, and a deliberately missing URL.

Root `.html` files are compatibility redirects that preserve query strings and fragments. Public navigation uses directory URLs. GitHub Pages does not provide configurable 301 redirects; these compatibility files use client-side redirects. The real `404.html` stays a 404 response on supported hosting and never redirects broken URLs to the homepage.

## Activate estimate emails — required external setup

The form is intentionally disabled until configured. No email delivery has been claimed or tested with real accounts. The public page offers the official phone and email in the meantime.

Use Cloudflare Workers, D1 and Turnstile with Resend. Accounts, DNS verification and service quotas are managed by those providers. Check current quotas/pricing before relying on a free plan.

1. Create/sign in to a Cloudflare account and install Node.js locally. In a terminal inside `backend`, run `npx wrangler login`.
2. Run `npx wrangler d1 create nova-estimate-guard`. Copy the returned database ID into `wrangler.toml`, replacing `REPLACE_WITH_CREATED_DATABASE_ID`.
3. Run `npx wrangler d1 execute nova-estimate-guard --remote --file=schema.sql`.
4. Create a Turnstile widget in Cloudflare. Add `novahomeconstruction.ca`, `www.novahomeconstruction.ca`, and `novaconstructionhome-netizen.github.io` as allowed hostnames. Save the public site key and private secret.
5. Create a Resend account. Add and verify a sending domain such as `requests.novahomeconstruction.ca` using the exact DNS records Resend supplies. You must have DNS access. Create an API key with sending permission. The example sender in `wrangler.toml` must use your verified domain. It is a sender configuration, not an invented customer-facing contact address.
6. Run each command below and enter the requested secret at the prompt. Never place secrets in GitHub, site-config.js or the ZIP:

   ```sh
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put RATE_SECRET
   ```

   Use a cryptographically random value of at least 32 bytes for RATE_SECRET.
7. Run `npx wrangler deploy`. Copy the returned HTTPS Worker URL.
8. Edit the public `site-config.js`:

   ```js
   window.NOVA_FORM = {
     endpoint: "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev",
     sitekey: "YOUR_PUBLIC_TURNSTILE_SITE_KEY"
   };
   ```

   Preserve the existing `NOVA_CONTACT` assignment. Upload the edited file to GitHub.
9. Submit a test enquiry in each language, including photos. Confirm it arrives at `info@novahomeconstruction.ca`; check spam, attachments, all field values, and reply-to. Test invalid inputs, failed security verification and a disconnected network. These are activation gates, not tests already completed here.

### Submission behavior and privacy

Required name, email, phone, service and description; optional location/date/budget/photos. Up to five JPEG/PNG/WebP files, 3 MiB each and 6 MiB combined. Browser and server validate separately. The server checks signatures and declared image type, assigns safe filenames, bounds incoming request size, verifies Turnstile hostname/action, restricts origins, applies an atomic six-attempt/hour IP limit and uses a honeypot.

Images are attached to private transactional email, never published to the website or a public image store. Do not submit highly sensitive photographs. Signature checks are not malware scanning or image re-encoding; metadata in submitted originals remains. Provider and mailbox retention policies apply.

D1 stores only HMAC-hashed IP rate counters, request IDs, payload hashes, timestamps and sent flags, not form fields or photos. Records are pruned during subsequent requests after 48 hours (rate counters) and 24 hours (request deduplication). No request-body logging is implemented. Provider idempotency reduces duplicates on retries; field changes generate a new request ID. Success means the email API accepted the request, not proven inbox delivery. Errors retain entered fields. Resend receives customer reply-to and the subject `NEW ESTIMATE REQUEST | NOVA Home Construction | [Customer Name]`.

## Languages and routes

One `nova-language` localStorage preference controls English/Canadian French across every page. Central `translations.js` contains 534 matching keys per language. `i18n.js` applies text, accessible labels, page titles and descriptions; it prevents a French-page text flash while loading. New contacts, form status messages, dropdown options and the 404 are included. Existing sample reviews remain labelled as samples.

19 content pages include home, about, services, projects, reviews, process, why choose us, service areas, contact, estimate, eight service pages, and the true 404. Footer contact links include both phone numbers, email, location, Facebook and Instagram. Unconfigured LinkedIn was removed. Mobile uses an expandable native contact menu.

## 404 animation

Local Three.js modules power a procedural 3D worker with helmet, articulated limbs, boots, tool belt, hinged toolbox, rotating screwdriver, hammer and moving 404 panel. The actual unchanged NOVA logo texture is on the uniform. The 24-second loop has arrival, inspection, preparation, repair, surprise and departure phases. Rendering pauses offscreen/in a hidden tab; reduced-motion visitors see a still pose. If WebGL is unavailable, a static branded 404 fallback and navigation remain usable. No external animation service is needed. Three.js license is in `vendor/THREE-LICENSE.txt`.

The Pinterest reference could not be accessed in this environment; this is an original implementation, not a claim to have reproduced that video. Visual animation timing and contact alignment need browser review before production approval.

## Verification — honest status

Passed automated checks:
- 19 pages × 2 languages, plus 76 reversible language switches in a DOM test environment.
- Matching English/French translation keys, rendered keyed text, metadata, persistent preference and inactive-form fallback.
- Internal file targets and clean navigation URLs; required contacts in every footer.
- All 52 existing image/logo files preserved byte-for-byte.
- Four backend test suites covering origin/configuration rejection, input validation, header injection, file signatures, provider acceptance/failure, retry deduplication, changed-payload conflicts, CAPTCHA failure and rate limiting. Provider calls were mocked; no test emails were sent.

Not verified here:
- Live Gmail delivery, provider accounts, production CAPTCHA and DNS (requires setup above).
- Desktop/mobile visual layout, 3D render appearance and tool alignment, real browser file picker and interactive submission.
- Production route refresh and actual HTTP 404 status after upload.

The remote browser could not access the local preview; file previews were blocked by browser policy. DOM tests are not a substitute for visual browser testing. No passing visual test or live deployment is claimed. `verification.json` records scope. Run backend tests with `cd backend && npm test` (Node 22+).

The GitHub connector rejected write access earlier, so this package has not been pushed or deployed automatically. Upload through your authorized GitHub account as described above.

Provider documentation:
- https://developers.cloudflare.com/workers/wrangler/commands/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://resend.com/docs/api-reference/emails/send-email


## Legal pages update — October 10, 2026
Read LEGAL-REVIEW-BEFORE-PUBLICATION.md before publishing. This update supersedes prior legal-page descriptions: /terms-and-conditions/ is now the terms page; /terms/ redirects there. The three legal pages are bilingual drafts awaiting owner and Alberta lawyer review. See verification.json for current results and limitations.
