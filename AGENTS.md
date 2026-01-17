# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the app code. Key areas:
  - `src/pages/` route-level screens (`Home.tsx`, `About.tsx`, etc.).
  - `src/components/` shared UI and layout components; `src/components/ui/` is shadcn UI.
  - `src/assets/` static assets imported by code (SVGs, images).
  - `src/data/` JSON/TS data used by pages.
  - `src/hooks/`, `src/utils/`, `src/lib/` for reusable logic.
- `public/` contains static files served as-is.
- `dist/` is the Vite build output (generated).

## Build, Test, and Development Commands
- `npm run dev`: Start the Vite dev server with hot reload.
- `npm run build`: Production build into `dist/`.
- `npm run build:dev`: Development-mode build (useful for debugging prod issues).
- `npm run preview`: Serve the production build locally.
- `npm run lint`: Run ESLint across the codebase.
- `npm run sync:scholar`: Fetches Google Scholar data and regenerates `src/data/publications.json`.

## Coding Style & Naming Conventions
- TypeScript + React function components; keep JSX readable and use Tailwind utility classes.
- Indentation is 2 spaces and semicolons are used in TS/TSX.
- Use `@/` imports for `src/` (e.g., `@/components/Navigation`).
- Component files use `PascalCase.tsx` in `src/components/` and `src/pages/`.
- Hooks live in `src/hooks/` and follow `use-*.ts(x)` naming.
- Linting is enforced by `eslint.config.js` (run `npm run lint`).

## Testing Guidelines
- No test framework is configured yet; there are no test files in the repo.
- Until tests exist, validate changes with `npm run lint`, `npm run build`, and manual UI checks in `npm run dev`.
- If adding tests, prefer `*.test.tsx` colocated with the component or under a new `src/__tests__/` directory, and document the runner in this file.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative summaries (e.g., "Move logo left", "Refactor: Adjust vertical alignment").
- Keep commits focused and avoid bundling unrelated changes.
- PRs should include a clear description, linked issues if applicable, and screenshots or short recordings for UI changes.

## Configuration Notes
- Vite + React + Tailwind + shadcn UI; build config lives in `vite.config.ts` and styling in `tailwind.config.ts` and `src/index.css`.

## Publication Sync
- `scripts/sync-scholar.mjs` pulls the latest Google Scholar entries and writes to `src/data/publications.json`.
- A weekly GitHub Actions workflow auto-updates the publications data and commits changes to the repo.
- Optional env overrides: `SCHOLAR_USER_ID`, `SCHOLAR_PAGE_SIZE`, `SCHOLAR_DELAY_MS`.
