# Damien · Geospatial portfolio / Version 1

A modern, minimalist Astro website for **Damien**, configured for GitHub user **Damien23rd**. Seven pages, responsive layouts, accessible navigation, expandable case-study notes, fictional SVG maps, a placeholder portrait, and Pages CMS editing. No personal email or phone number is included. No account has been connected and nothing has been published.

## Run locally

Install Node.js **22.23.4 or later** (Node 22 LTS recommended), then open a terminal in this project folder:

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. To check the production output:

```sh
npm run build
npm test
npm run preview
```

The build includes Astro's TypeScript/template checks. Tests inspect every generated page, internal link, local asset, CMS field mapping, and public contact privacy. They do not test an authenticated CMS session or a live GitHub deployment.

## Pages and files

| Page | Route | Content |
| --- | --- | --- |
| Home | `/` | `src/data/site.json` and `src/pages/index.astro` |
| About | `/about/` | `src/data/site.json` |
| Completed Projects | `/projects/` | entries with `status: completed` in `src/data/projects.json` |
| Ongoing Work | `/ongoing/` | entries with `status: ongoing` in the same file |
| Map Gallery | `/gallery/` | `src/data/maps.json` |
| Skills | `/skills/` | `skills` in `src/data/site.json` |
| Contact | `/contact/` | contact note in `src/data/site.json`; GitHub link only |

Design: `src/styles/global.css`. Shared layout/navigation: `src/layouts/Layout.astro`. Uploaded images: `public/media/`. The 404 page is also included.

## GitHub setup — only when you choose to publish

These are instructions for you; no GitHub actions were performed during creation.

1. Create a repository under **Damien23rd**, for example `geospatial-portfolio`. Public repositories are the simplest choice for free GitHub Pages. If using a private repository, check your plan's Pages support.
2. Upload **the contents of this folder**, including `.pages.yml` and `.github/`, to the root of that repository. Do not upload the enclosing folder, `node_modules`, or `dist`. Keep `package-lock.json`.
3. Use `main` as the default branch, or update the two branch filters in `.github/workflows/deploy.yml`.
4. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
5. The workflow runs on pushes to `main` and can be started from the Actions tab. Pull requests build and test without deploying.
6. Once deployment succeeds, a project repository is available at `https://Damien23rd.github.io/geospatial-portfolio/`. For a repository named `Damien23rd.github.io`, it is available at the domain root.

The Astro configuration reads `GITHUB_REPOSITORY` automatically in Actions, so repository paths do not need hardcoding. Local development uses `/`. To simulate a project path locally:

```sh
BASE_PATH=/geospatial-portfolio npm run build
BASE_PATH=/geospatial-portfolio npm test
BASE_PATH=/geospatial-portfolio npm run preview
```

Internal URLs and uploaded images receive this prefix through `src/lib/paths.ts`. Custom domains need an updated `site` in `astro.config.mjs`, `BASE_PATH=/` during builds, and separate GitHub domain configuration. No custom domain is configured.

## Pages CMS dashboard setup

The dashboard is the hosted **Pages CMS** application, not an unauthenticated `/admin` page inside this static site.

1. After uploading the repository, visit [app.pagescms.org](https://app.pagescms.org/).
2. Sign in with GitHub and authorize only the intended repository when asked. This is an account action for you to perform when ready.
3. Choose the repository and `main` branch. Pages CMS reads `.pages.yml` at the repository root.
4. Use **Profile, home & skills**, **Project entries**, or **Map gallery** to edit content. Add/remove list items and upload images through image fields.
5. Saving content commits to the selected branch. Saving on `main` starts the Pages workflow and may publish the changes. For review before publication, edit on another branch and merge only after approval.

Media is saved in `public/media` with `/media/...` stored in JSON. The site adds the repository prefix automatically. Use local uploaded image paths, not external image URLs. Portrait alt text and map descriptions should describe the actual replacement image.

## Replace the placeholders

- Update the profile biography and photo. All suggested skills require confirmation.
- Replace each sample project with verified work, including the question, method, outcomes, and limitations. `completed` and `ongoing` control the page on which it appears.
- Replace fictional SVG maps with real exports. Include a brief and technical notes covering data sources/licensing, study area, CRS, scale, dates, processing, accuracy, and uncertainty as applicable.
- Version 1 deliberately labels all entries as placeholders. Once real content is ready, revise the placeholder labels in `Project.astro`, page notices, map captions in `MapArt.astro`, and footer text. Do not simply relabel samples as real work.
- Contact currently shows awaiting-approval labels and a GitHub profile link. To add email/phone later, obtain approval first, then update `contact.astro` and revise the privacy test intentionally. The current CMS has no personal email/phone fields.
- Page introduction wording and global navigation are edited in Astro files; the dashboard edits the content fields listed above.

There is no form backend, analytics, external font request, map service, or API key. The maps are static illustrations. GitHub profile links are ordinary outbound links.

## References

Configuration follows the [Pages CMS configuration documentation](https://pagescms.org/docs/configuration/) and [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). The lockfile pins the installed dependency tree; use `npm ci` for reproducible installs.
