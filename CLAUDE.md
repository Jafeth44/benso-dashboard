# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Angular 20 (standalone components, no NgModules, `loadComponent` lazy routes), TypeScript 5.8 strict mode, Tailwind CSS + DaisyUI + Angular Material, Chart.js/ng2-charts. Backend is Firebase (`@angular/fire`) used purely client-side — Auth, Firestore, Storage, Analytics, App Check — no Cloud Functions. Firebase project: `equipos-benso`. App locale is hardcoded to `es-CR`; UI copy, routes, and domain terms (equipos, mantenimiento, clientes) are in Spanish.

`@angular/fire` is community-maintained and lags Angular's release cadence — it currently caps this app at Angular 20 (its latest stable release); check `npm view @angular/fire dist-tags` before attempting a further major bump.

## Commands

Use **bun**, not npm — `bun.lockb` is the canonical lockfile.

- `bun run start` — dev server at http://localhost:4200
- `bun run build` — production build
- `bun run watch` — dev build in watch mode
- `bun run test` — Karma/Jasmine (configured but no spec files exist yet; write tests for new features going forward)
- `ng deploy` — deploys to Firebase Hosting via `@angular/fire:deploy`; done manually from a dev machine, no CI/CD

- `bun run lint` — ESLint (angular-eslint); as of setup there are ~65 pre-existing lint errors in the codebase, so don't treat lint failures on unrelated files as something you broke.

No format command is configured (no Prettier) — follow `.editorconfig` (2-space indent, single quotes in `.ts`) by eye.

## Environment setup gotcha

`src/environments/` is gitignored and ships empty — a fresh clone will not build or run until `environment.ts` and `environment.development.ts` are created manually. There is no template file in the repo; get the config values from the project owner. Each file exports:

```ts
export const environment = {
  production: false, // true in environment.ts
  useEmulators: true, // false in environment.ts
  config: { /* Firebase web app config object */ },
};
```

## Local dev environment (Firebase emulators)

`environment.development.ts` sets `useEmulators: true`, which makes `app.config.ts` connect Auth/Firestore/Storage to the local Firebase Emulator Suite instead of the live `equipos-benso` project — so `bun run start` never touches production data.

- `bun x firebase-tools emulators:start --only auth,firestore,storage` — starts the emulators (ports: auth 9099, firestore 8080, storage 9199); emulator UI at http://localhost:4000
- Run it alongside `bun run start`. Firestore/Storage rules are loaded from the local `firestore.rules`/`storage.rules` files, so rule changes can be tested here before touching production.
- To point the app at production instead, set `useEmulators: false` in `environment.development.ts`.

## Firestore security

`firestore.rules` currently grants any authenticated user full read/write access to all documents. Be cautious when touching auth or Firestore rules — don't assume per-user scoping exists unless you check.

## Workflow

Use feature branches, not direct commits to `master`.
