<div align="center">
  <img src="./public/manyflix-logo.svg" alt="ManyFlix" width="320" />
  <h1>ManyFlix</h1>
  <p>A polished, responsive movie and TV discovery experience.</p>
</div>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="https://manyflix.vercel.app/">Live deployment</a>
</p>

## About

ManyFlix helps people explore films and series through trending collections, curated categories, detailed title pages, trailers, search, profiles, and personal lists. Its interface is designed for desktop, mobile, and TV-sized screens.

## Previews

| Home | Top 10 |
| --- | --- |
| <img src="./public/Preview/Screenshot%202026-10-30%20215827.png" alt="ManyFlix home page with a featured movie" width="480" /> | <img src="./public/Preview/Screenshot%202026-10-30%20215927.png" alt="ManyFlix Top 10 movie and series carousels" width="480" /> |

| Title details | Episodes |
| --- | --- |
| <img src="./public/Preview/Screenshot%202026-10-30%20220103.png" alt="Money Heist title details" width="480" /> | <img src="./public/Preview/Screenshot%202026-10-30%20220137.png" alt="TV series episode list" width="480" /> |

| AI search on mobile | AI search on desktop |
| --- | --- |
| <img src="./public/Preview/Screenshot%202026-10-30%20220220.png" alt="ManyFlix AI search on a mobile screen" width="480" /> | <img src="./public/Preview/Screenshot%202026-10-30%20220235.png" alt="ManyFlix AI search panel on the home page" width="480" /> |

| More info | Player |
| --- | --- |
| <img src="./public/Preview/Screenshot%202026-10-30%20220308.png" alt="Movie details modal over the home page" width="480" /> | <img src="./public/Preview/Screenshot%202026-10-30%20220446.png" alt="ManyFlix video player controls" width="480" /> |

## Highlights

- Discover movies, TV, anime, and genre collections.
- Search titles and explore recommendations.
- View title details, trailers, seasons, and episodes.
- Keep profiles, watch history, and personal lists in the browser.
- Navigate a responsive interface with keyboard and TV-device support.
- Use TMDB metadata and artwork through an API key you provide.

## Technology

React 18 · TypeScript · Vite · Tailwind CSS · Radix UI · React Router · TanStack Query

## Get started

**Requirements:** Node.js 20+ and npm.

```bash
git clone <your-repository-url>
cd manyflix
npm install
cp .env.example .env
npm run dev
```

In Windows PowerShell, copy the example with `Copy-Item .env.example .env`.

Add your TMDB API key to `.env` before using the live catalog:

```dotenv
VITE_TMDB_API_KEY=your_tmdb_api_key
```

The app runs locally at the URL printed by Vite (by default, `http://localhost:8080`).

## Environment

See [`.env.example`](./.env.example) for the available configuration. Set `VITE_SITE_URL` to the canonical public URL and `VITE_PLAYER_BASE_URL` to your playback service before deploying.

> Vite exposes variables prefixed with `VITE_` in browser code. Do not put private credentials or server-only secrets in those variables.

## Common commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Generate sitemaps when configured and build the production app |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run generate:sitemap` | Generate catalog sitemaps using TMDB |
| `npm run start:api` | Start the recommendations API and static server |

## Project layout

```text
public/              Static assets, robots.txt, and sitemaps
scripts/             Build and sitemap utilities
src/
  components/        Shared UI and media components
  context/           React context providers
  hooks/             Data, device, and UI hooks
  lib/               API clients, SEO, and shared utilities
  pages/             Route-level screens
```

The production Vite app starts at `src/main.tsx`.

## Data and attribution

Catalog metadata and images are provided by [TMDB](https://www.themoviedb.org/). This product is not endorsed or certified by TMDB. Availability of third-party media integrations depends on the services configured by the operator. Users and operators are responsible for following applicable laws and third-party terms.

## Deployment

Build with `npm run build`, then deploy the generated `dist/` directory to a static host. Configure the environment variables in `.env.example` in your hosting provider, especially `VITE_SITE_URL` and `VITE_TMDB_API_KEY`.
