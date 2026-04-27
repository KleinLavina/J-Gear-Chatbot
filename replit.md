# J-Gear Assistant (Chat UI)

## Overview
A React + TypeScript chat UI built with Vite. The app renders a single-page assistant interface (sidebar + chat panel) styled with custom CSS and `framer-motion` for animations.

## Stack
- React 19 + TypeScript
- Vite 7 (dev server / build)
- framer-motion, lucide-react, react-icons

## Project Structure
- `index.html` – Vite entry
- `src/main.tsx` – React bootstrap, sets a circular favicon
- `src/App.tsx` – renders `MainLayout`
- `src/layout/` – layout, sidebar, chat components, css, modules, mock backend
- `src/assets/` – images used by the UI
- `vite.config.ts` – Vite config (host `0.0.0.0`, port `5000`, all hosts allowed for the Replit proxy)

## Replit Setup
- Workflow: `Start application` runs `npm run dev` on port 5000 (webview).
- Vite dev server binds `0.0.0.0:5000` and accepts all hosts so the Replit iframe proxy works.
- Deployment: configured as a `static` site — build with `npm run build`, served from `dist/`.

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build production bundle to `dist/`
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
