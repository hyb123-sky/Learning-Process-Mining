# PathForge

A Next.js 14 + Prisma + MDX learning platform for the Celonis "Use and
Interpret Views" qualification exam (and follow-up Celonis credentials).
Implements PATHFORGE_SPEC_v2 Phase 1: Server Actions for all mutations,
DB-stored MDX rendered via `next-mdx-remote`, paladin design tokens,
multi-user-ready schema (Phase 1 single-user via `CURRENT_USER_ID`).

## First-time setup

```bash
cd pathforge
npm install                                        # restore node_modules
npx prisma migrate deploy                          # apply migrations from prisma/migrations
npx prisma generate                                # generate Prisma client
npx prisma db seed                                 # load Trail / Quest / Ch1 / Ch2 + 20 questions
npm run dev                                        # http://localhost:3000
```

> **Windows / PowerShell**: the same commands work. If `prisma migrate deploy`
> reports `P1012: Environment variable not found: DATABASE_URL`, make sure
> `.env` exists at `pathforge/.env` (committed to the repo — if you downloaded
> a ZIP from a previous commit it may be missing; pull the latest, or create
> it manually with `DATABASE_URL="file:./dev.db"`).

## Folder map

| Path | Purpose |
| --- | --- |
| `prisma/schema.prisma` | DB schema (locked per spec). |
| `prisma/migrations/` | SQL migrations (committed). |
| `prisma/seed.ts` + `prisma/seed-content/` | Seed orchestrator + per-chapter MDX & questions. |
| `src/app/` | Next.js App Router routes (Dashboard, Quest, Chapter reader, Trial, Profile, Admin). |
| `src/actions/` | Server Actions (`submitTrial`, `upsertChapter`, etc.). |
| `src/components/mdx/` | `<Term>`, `<Callout>`, `<CompareTable>`, `<PqlExample>` + registry. |
| `src/components/ui/` | Hand-rolled shadcn-style primitives. |
| `src/lib/` | Prisma singleton, gamification, validation zod schemas, constants. |
| `.env` | Committed: `DATABASE_URL="file:./dev.db"` (no secrets — local SQLite). |
| `.env.local` | Gitignored: personal/secret overrides. |

## Common commands

```bash
npm run dev                              # dev server
npm run build && npm start               # prod build + serve
npx prisma studio                        # browse the DB visually
npx prisma migrate dev --name <name>     # add a new migration
npx prisma db seed                       # re-seed (drops + re-creates content)
npx tsc --noEmit -p tsconfig.json        # type-check only
```

## Phase 1 verification flow

1. Open `/` — see dashboard with 1 active quest.
2. Click into the quest — Ch1 available, Ch2 locked.
3. Open Ch1 — read MDX content.
4. Click "Trial を始める" — answer 10 questions.
5. Pass with ≥70% — Crest unlock, Ch2 unlocks.
6. Return to `/` — insight increased, Ch1 shows completed.
7. Open `/admin/chapters/[id]/edit` — edit MDX, save, reload chapter, change visible.
