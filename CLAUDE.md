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

## Firestore/Storage security model

Role-based, not per-user (equipos are shared company data, no ownership field exists). `isAdmin` is looked up via the `administradores` collection, whose **document ID must be the admin's exact sign-in email** (e.g. `nombre@equiposbenso.com`) — rules can only `get()`/`exists()` a known path, not query by field, so this is managed manually in the Firebase console, not by app code.

- `equipos`: any authenticated user can read; only admins can `create`/`delete`; `update` is admin-only *except* the `mantenimientos`, `proximoMantenimiento`, `foto`, and `fotoRef` fields, which any authenticated user may update (matches the UI: maintenance logging and photo updates aren't admin-gated, but equipo create/edit is).
- `storage`: any authenticated user can read/write — mirrors the `foto`/`fotoRef` allowance above, since photo uploads aren't admin-gated either.
- `src/app/guards/admin.guard.ts` mirrors this client-side (reuses `DataService.isAdmin$`) as defense-in-depth on the `equipos/nuevo` and `equipos/:id/editar` routes — the rules are the actual enforcement.
- Test rule changes against the local emulator (see above) before touching production; the emulator loads `firestore.rules`/`storage.rules` directly.

## Workflow

Use feature branches, not direct commits to `master`.
