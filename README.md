# Robotics Portfolio

Interactive technical portfolio foundation for robotics, AI, computer vision, autonomous systems and software/hardware projects.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Build the static export:

```bash
npm run build
```

The static site is emitted to `out/`.

## Architecture

- `src/app/` contains App Router pages.
- `src/components/` contains reusable UI, navigation, timeline, project and visualization components.
- `src/data/projects.ts` contains shared project metadata.
- `src/data/skills.ts` and `src/data/timeline.ts` contain editable structured content.
- `src/i18n/translations.ts` contains English and Norwegian UI text.
- `public/images/`, `public/videos/`, `public/sounds/` and `public/documents/` are the media folders.

The visual system is defined in `tailwind.config.ts` and `src/app/globals.css`: dark technical base, warm amber accent, restrained cyan telemetry accents, fine borders, low-glow surfaces and fast ease-out motion.

## Add a project

1. Add metadata to `src/data/projects.ts`.
2. Add a visual asset to `public/images/projects/`.
3. If the project needs custom rich content, extend `src/components/projects/project-detail-content.tsx` or route the slug to a dedicated React component.

The current detail page demonstrates reusable blocks for metrics, diagrams, charts and code snippets. Later, MDX can be added without changing the metadata model.

## Languages

English is the default language. Norwegian is available through the global `EN / NO` switch.

Add new translated UI text in `src/i18n/translations.ts`, then read it through `useLanguage()`.

The selected language is persisted in `localStorage`.

## CV PDF

Replace:

```text
public/documents/cv-placeholder.pdf
```

The CV page links to this file for open and download actions.

## Audio

Subtle UI sound is managed in `src/hooks/use-sound.tsx`.

Sound never autoplays. It starts only after the user toggles sound on, persists the preference in `localStorage`, and respects reduced-motion preferences.

Real audio assets can later be placed in `public/sounds/` if you prefer samples over generated tones.

## Analytics

Analytics is isolated in `src/lib/analytics.ts`.

Set an ID with:

```bash
NEXT_PUBLIC_ANALYTICS_ID=your-id
```

No fake production ID is hard-coded. Replace `trackEvent()` with Plausible, Umami, Fathom or another static-site-friendly provider when ready.

## GitHub Pages

This project uses `output: "export"` in `next.config.ts`, so it is compatible with GitHub Pages.

The workflow in `.github/workflows/deploy.yml` builds the site and deploys `out/`.

For repository hosting at:

```text
https://username.github.io/repository-name/
```

the workflow sets:

```bash
GITHUB_PAGES=true
GITHUB_PAGES_REPO=repository-name
```

That configures the correct `basePath` and `assetPrefix`.

Before deployment, enable GitHub Pages in the repository settings and set the source to GitHub Actions.

## Edit personal content

Replace placeholders for:

- name, degree and tagline in `src/i18n/translations.ts`
- contact links in `src/components/layout/contact-section.tsx`
- projects in `src/data/projects.ts`
- timeline in `src/data/timeline.ts`
- skills in `src/data/skills.ts`
- PDF in `public/documents/`
- `metadataBase` in `src/app/layout.tsx` if you move away from `davgei.github.io`

The current content is intentionally concise foundation content, not a finished biography or CV.
