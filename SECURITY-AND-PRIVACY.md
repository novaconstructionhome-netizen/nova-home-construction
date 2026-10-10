# Security and privacy update — owner setup notes

The website's public email and backend recipient are now info@novahomeconstruction.ca. This does not create that mailbox or confirm it receives mail. Test receiving and replying separately.

## Implemented

- English/French privacy policy and website terms, linked in every footer.
- Purpose-of-collection notice and required enquiry consent, checked by frontend and backend.
- Content Security Policy in HTML: local scripts plus explicit hashes for existing inline scripts; Cloudflare challenge scripts only; no objects; no native form posting; restricted connections and frames; HTTPS upgrades. Inline CSS remains permitted to preserve the existing design and animations.
- Referrer policy and backend JSON security headers.
- Backend secret bindings, existing Turnstile validation, rate limits, bounded file uploads and safe email attachments remain in place.
- .gitignore prevents routine future commits of .env, private key files, Wrangler local secrets and dependency folders. It does not remove files already committed or protect Git history.
- Basic credential-pattern scan of current text files found no recognized keys. This is not a penetration test or a complete repository-history scan.

## Before enabling the estimate backend

1. Follow the README to configure the Worker, Resend and Turnstile. Never place RESEND_API_KEY, TURNSTILE_SECRET or RATE_SECRET in frontend code. The Turnstile site key is intentionally public.
2. Add your exact deployed Worker origin, such as https://nova-estimates.YOUR-SUBDOMAIN.workers.dev, to the connect-src directive of every HTML page's CSP. Keep the existing sources. Without this, the browser deliberately blocks the form's cross-origin submission.
3. Set the public endpoint/sitekey in site-config.js. Leave all private credentials only in Worker secrets.
4. Confirm the new mailbox receives a test request and attachments; confirm Reply targets the customer's email. A success response means provider acceptance, not guaranteed inbox delivery.
5. Confirm the privacy policy against your actual mailbox provider, processing countries, retention and access practices. The Manager is the designated public privacy contact in the notice; assign that responsibility internally. Obtain Alberta legal/privacy review before treating these notices as a full compliance program. Website terms do not prevent claims or remove mandatory consumer rights.

## Account and hosting controls to check

- Enable GitHub account two-factor authentication/passkeys and keep access limited.
- Confirm GitHub Pages Enforce HTTPS is enabled and protect your domain/registrar account.
- Use secret scanning/push protection where available. If a credential was ever exposed, revoke/rotate it; deleting it from the current file is not enough.
- Keep dependencies maintained and remove unused integrations. Review provider logs without logging customer form bodies or private photos.
- GitHub Pages does not apply arbitrary custom response headers from a _headers file. This package does not pretend that a meta CSP can set frame-ancestors, HSTS, or X-Frame-Options. Header-level clickjacking protection needs hosting/edge capabilities outside this ZIP.
- Keep customer records out of the public repository. Provider/email access, retention, deletion and breach response are operational responsibilities.

No website can be made absolutely hack-proof or lawsuit-proof. No passwords or payment-card data should be submitted through this site.

## Checks performed

See verification.json. DOM translation/link/backend tests passed. Real-browser layout and CSP enforcement still need review; actual email delivery is not configured or verified. No live deployment was performed.

## Primary guidance consulted

https://www.alberta.ca/collecting-personal-information
https://www.alberta.ca/organization-responsibilities-for-protecting-personal-information
https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
