# Learning-Process-Mining (PathForge)

A Trailhead-style learning platform built around Celonis Technical Expert
certification preparation. The single Next.js project lives in `pathforge/`.

## Repository layout

├── pathforge/           # Active Next.js 14 + Prisma + SQLite project (everything)
├── design-system/       # Brand & voice docs (historical reference)
│   ├── README.md
│   └── SKILL.md
└── README.md            # You are here

## Quick start

```bash
cd pathforge
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

Open http://localhost:3000.

## Routes (high level)

Learner side:
- `/` — dashboard
- `/catalog` — browse all quests
- `/my-learning` — your active quests
- `/practice` — retake completed trials
- `/quest/[slug]/[chapter]` — chapter reader
- `/quest/[slug]/[chapter]/trial` — chapter quiz
- `/profile` — your stats and crests

Author / admin side (single-user Phase 2):
- `/admin` — overview
- `/admin/trails` — read-only list
- `/admin/quests` — Quest CRUD
- `/admin/chapters` — Chapter CRUD with MDX live preview
- `/admin/questions` — Question CRUD (MCQ / multi-select / true-false)

Coming Soon placeholders (Phase 3): `/library`, `/bookmarks`, `/notes`, `/history`

## Tech stack

- Next.js 14.2 (App Router, Server Actions, TypeScript strict)
- Prisma 5.22 + SQLite (dev), Turso/libSQL (planned for prod)
- next-mdx-remote for chapter content
- Tailwind CSS + hand-written shadcn-style primitives
- Lucide React for icons

## Milestones

- `p2-complete` — Phase 2 fully shipped: A1 + A2 + A3 + P2-Hybrid 404 fixes
  + brand asset migration + legacy cleanup.

## Next phase

Phase 3: Vercel deployment + Turso DB migration + multi-user (NextAuth).
