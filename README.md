# David Geier Portfolio

An interactive, statically exported Next.js portfolio for robotics and intelligent systems. The site includes a three-joint inverse-kinematics arm with a telescopic final segment, project case studies, a technical system map, an experience path, an HTML CV, and English/Norwegian copy.

## Run locally

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Run `npm run build` to create the static site in `out/`.

## Content

- `src/data/projects.ts` is the editable project metadata and narrative source.
- `src/data/skills.ts` maps technical areas to supporting projects.
- `src/data/timeline.ts` contains confirmed and carefully qualified timeline entries.
- `src/i18n/translations.ts` contains English and Norwegian interface copy.
- `src/components/projects/project-visual.tsx` contains conceptual technical illustrations. These are labeled as concepts, not original project output.
- `CONTENT_CHECKLIST.md` lists facts, media and links that need David's confirmation before publication.

Do not add unverified metrics, roles, dates, contact details or simulated training charts as if they were real results. Add public source links only when the repository is confirmed to be presentable. The CV is HTML-first; its print button uses the browser's save-to-PDF workflow. There is intentionally no placeholder PDF download.

## Deployment

`.github/workflows/deploy.yml` builds and uploads the static export on pushes to `main`. The workflow sets `GITHUB_PAGES=true` and `GITHUB_PAGES_REPO=Portfolio`, which configure the correct `/Portfolio` base path. GitHub Pages must be enabled in the repository settings with **GitHub Actions** as the source.

Sound is off by default and persists its preference. Language selection persists in local storage. Both work without a server-side session.
