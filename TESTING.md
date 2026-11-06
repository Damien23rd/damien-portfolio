# Version 1 verification

Verified on 6 November 2026 with Node 26.7.0 and Astro 7.4.7.

- Astro checks: 15 source files, zero errors, zero warnings, zero hints.
- Production build: all seven requested pages plus the 404 page generated successfully.
- Root deployment: content, privacy, and 107 local link/asset checks passed.
- Repository deployment: same checks passed with `GITHUB_REPOSITORY=Damien23rd/geospatial-portfolio`, confirming automatic base-path handling.
- Dependency audit after the Astro update: zero reported vulnerabilities.
- Local HTTP checks: Home and Map Gallery returned 200 OK.
- CMS configuration parsed successfully; configured fields match the JSON content, required values are present, and project statuses match the select options.
- Generated HTML contains no email addresses, phone links, email links, or ten-digit local phone numbers.

## Limits

Automated browser inspection was unavailable because the browser-control session timed out. Responsive layouts and keyboard focus styles are implemented, but visual/mobile and interactive browser QA remain unverified. Review desktop and mobile layouts before a public launch.

No GitHub repository, account authorization, Pages CMS login/save, or live deployment was performed. Authenticated CMS editing and the GitHub Actions deployment need verification after you connect the repository. CMS saving to `main` can trigger publication; use a review branch while preparing real content.

## Re-run

```sh
npm ci
npm run build
npm test
GITHUB_REPOSITORY=Damien23rd/geospatial-portfolio npm run build
GITHUB_REPOSITORY=Damien23rd/geospatial-portfolio npm test
```

If your environment restricts system preference writes, prefix build/dev commands with `ASTRO_TELEMETRY_DISABLED=1`.
