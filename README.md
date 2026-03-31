# logg demo

UI-first Expo demo for a social gaming app called `logg`.

## What is included

- Premium mobile-first onboarding screen
- Friend activity feed
- Game and user discovery
- In-app game logging with star ratings
- Profile screen with sample stats and favorites
- Fully local mocked data so the demo works in-browser without a backend

## Suggested production stack

- Expo + React Native
- Supabase for auth, profiles, follows, logs, and feed data
- IGDB API for game catalog search and metadata

## Local development

```bash
npm install
npm run web
```

## Vercel deployment

This repo is configured for static deployment on Vercel.

```bash
npm install
npm run build
```

Vercel should use:

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## Notes

This repo is intentionally focused on the front-end MVP demo. The current interactions use local state so the product can be reviewed quickly before wiring up real backend services.
