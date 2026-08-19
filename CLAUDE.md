# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Angular 18 (standalone components, no NgModules, `loadComponent` lazy routes), TypeScript 5.4 strict mode, Tailwind CSS + DaisyUI + Angular Material, Chart.js/ng2-charts. Backend is Firebase (`@angular/fire`) used purely client-side — Auth, Firestore, Storage, Analytics, App Check — no Cloud Functions. Firebase project: `equipos-benso`. App locale is hardcoded to `es-CR`; UI copy, routes, and domain terms (equipos, mantenimiento, clientes) are in Spanish.

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

`src/environments/` is gitignored and ships empty — a fresh clone will not build or run until `environment.ts` and `environment.development.ts` are created manually with the Firebase config object (`environment.config`, consumed in `src/app/app.config.ts`). There is no template file in the repo; get the config values from the project owner.

## Firestore security

`firestore.rules` currently grants any authenticated user full read/write access to all documents. Be cautious when touching auth or Firestore rules — don't assume per-user scoping exists unless you check.

## Workflow

Use feature branches, not direct commits to `master`.
