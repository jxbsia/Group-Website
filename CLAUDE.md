# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Photon-Folio is a portfolio website for SIA Laboratories, an academic research group at Nanyang Technological University (NTU), Singapore. The site showcases research in integrated photonics, lasers, and optical systems.

## Development Commands

```bash
npm run dev          # Start dev server (port 8080, IPv6 enabled)
npm run build        # Production build to dist/
npm run build:dev    # Development build with source maps
npm lint             # Run ESLint
npm run preview      # Preview production build
```

## Tech Stack

- **React 18** with TypeScript and Vite (SWC compiler)
- **Tailwind CSS** with shadcn/ui components (Radix UI primitives)
- **React Router DOM** for client-side routing
- **React Query** for data fetching, **React Hook Form** + **Zod** for forms

## Architecture

### Data Flow
JSON files in `src/data/` → TypeScript interfaces in `src/types/content.ts` → React components → Rendered UI. This is a static front-end site with no backend; all content lives in JSON files.

### Key Directories
- `src/pages/` - Route-based page components (Home, About, Team, Research, Publications, Contact)
- `src/components/` - Reusable components including animation wrappers
- `src/components/ui/` - 51 shadcn/ui primitives
- `src/data/` - JSON content files (home.json, about.json, team.json, research.json, publications.json, contact.json, news.json)
- `src/types/content.ts` - TypeScript interfaces for all data structures

### Routing
Routes defined in `App.tsx` using React Router. Add new pages by creating a component in `src/pages/` and adding a route in `App.tsx`.

### Styling System
- Dark theme with Gilber-inspired design (background #0a0a0a, accent red #cf000f)
- Custom fonts: Moonspace (logo), Gilroy (body)
- Custom CSS classes: `.gilber-btn`, `.gilber-btn-primary`, `.gilber-btn-outline`, `.gilber-card`, `.news-card`
- Animation patterns: AnimatedBlock wrapper for staggered entry, KenBurnsBackground for parallax zoom

### Path Alias
`@` maps to `./src` for clean imports (e.g., `@/components/ui/button`)

## Common Editing Patterns

- **Update page content**: Edit corresponding JSON file in `src/data/`
- **Add navigation items**: Modify navItems array in `Navigation.tsx`
- **Add new data fields**: Update interface in `src/types/content.ts`, then update JSON and components
- **Add UI components**: Use existing shadcn/ui components from `src/components/ui/` or add new ones via shadcn CLI
