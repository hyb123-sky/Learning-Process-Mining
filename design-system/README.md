# PathForge Design System

> *"The path forward is clear — but seldom easy."*

PathForge is a **mobile-first gamified learning platform** for process mining
and Celonis certification. Learners are framed as **paladins on a quest for
mastery** — the product's visual and verbal identity leans on sacred-mission
imagery (cathedral light, parchment, heraldic crests) while staying calm,
authoritative, and premium.

**Target learners:** multilingual (EN / ZH / JP), typically analysts, BI
engineers, and ops professionals preparing for Celonis P2P / O2C / general
certifications.

**Positioning references (per brief):** Duolingo's gamification loop · Trailhead's module structure · Masterclass's premium feel · Journey (iOS) for calm cathedral-aesthetic inspiration.

---

## Sources

No codebase, Figma, or prior assets were provided. This system was built
**greenfield** from the verbal brief + user answers (palette: warm ivory +
antique gold + navy; type: Cormorant Garamond + Manrope; crests: custom
heraldic). Substitute real licensed brand assets when they exist.

---

## Index — what's in this folder

| File / folder | Purpose |
| --- | --- |
| `README.md` | You are here. |
| `SKILL.md` | Claude Code / Agent-Skill manifest. |
| `colors_and_type.css` | All design tokens — colors, type scale, spacing, radii, shadows, motion. |
| `fonts/README.md` | Font stack + licensing notes + substitution flags. |
| `assets/` | Logo, mark, crests, parchment + cathedral-light textures. |
| `assets/crests/` | Achievement crests (Shield, Flame, Chalice). |
| `preview/` | Design System cards — typography, palette, tokens, components. |
| `ui_kits/mobile/` | PathForge mobile app UI kit — 6 screens, JSX components, click-thru prototype. See `ui_kits/mobile/README.md`. |

---

## Content Fundamentals

PathForge's voice is **warm paladin** — authoritative but never cold;
ceremonial but never corny. Think of it as a wise mentor, not a drill
sergeant.

### Tone rules

- **Second person ("you")** for guidance and encouragement. First person never.
- **Imperative for CTAs**, softened with purpose: *"Begin your quest"*,
  *"Claim your crest"*, *"Forge on"*. Never *"Click here"* or *"Start now"*.
- **Sentence case** for UI. **Title Case** for proper nouns
  (crests, certifications, chapter names).
- **Never ALL-CAPS** except for tracking-wide eyebrow labels
  (`.t-eyebrow`, letter-spaced 0.22em — a typographic device, not shouting).
- **Aphoristic empty states.** When there's nothing to show, say something true:
  *"The path forward is clear — but seldom easy."*
- **Plain when it matters.** Errors, billing, and data-loss warnings drop
  the ceremony entirely. *"Your quiz was not saved. Check your connection
  and try again."*

### Lexicon

| Product concept | What we call it |
| --- | --- |
| Course | **Quest** or **Path** |
| Lesson | **Chapter** |
| Quiz | **Trial** |
| XP / points | **Insight** |
| Achievement / badge | **Crest** |
| Streak | **Daily vigil** |
| Certificate | **Oath** (once completed) |
| Leaderboard | **Order** (e.g. "The Order of P2P") |

### Emoji, punctuation, CJK

- **No emoji.** Use crest SVGs or Lucide icons.
- **Em-dash for breath** in headings and quotes. **Hyphen** only for compound words.
- **"Smart" quotes** in marketing copy; straight quotes in UI where typography is small.
- **CJK:** Translations preserve the ceremonial register. For ZH, use 「 」 for quotes.
  For JP, use 「」. Never translate "PathForge" — it stays Latin.

### Examples

- CTA: **Begin your quest** · **Claim your crest** · **Resume chapter 3**
- Empty state (no quests started): **"The path forward is clear — but seldom easy."**
- Achievement unlock: **"You have earned the Shield of Conformance."**
- Error: **"Your answer was not recorded. Check your connection and try again."**
- Streak nudge: **"Your vigil holds. 7 days tended."**
- Lesson intro: **"In this chapter you will learn to read an event log — the first artifact of any process."**

---

## Visual Foundations

### Palette

A warm-parchment system anchored by **ivory** (surfaces), **antique gold**
(primary accent, ornament), and **deep navy** (ink, authority). Semantic
colors are hand-tuned to sit comfortably inside the parchment world —
verdigris green, amber warn, sealed-wax crimson.

See `colors_and_type.css` for all tokens. Never use raw colors in
product code — always go through a var.

### Typography

- **Display / headings:** Cormorant Garamond, weight 500–600. Warm transitional serif. Slight italic for pull-quotes and scripture-like lines.
- **UI / body:** Manrope, weight 400–700. Humanist sans, excellent at small sizes.
- **Mono:** JetBrains Mono, weight 400–500. For event-log snippets and SQL-ish code in learning material.
- **Eyebrow / section labels:** Manrope 600 at 12px, `letter-spacing: 0.22em`, uppercase, gold-700. Used sparingly — one per screen section max.

### Spacing

4-px base, mobile-first. `--sp-1` through `--sp-20`. Default page gutter on
mobile is `--sp-4` (16px); content areas use `--sp-6` (24px) between blocks.

### Backgrounds

- **Page:** flat `--ivory-50` (#FDFBF5). Clean body is the rule; ceremony is the exception.
- **Hero / unlock screens:** `assets/cathedral-light.svg` — navy gradient with gold rays from top-right. Use sparingly: onboarding, crest unlocks, chapter intros.
- **Cards (medium ceremony):** `assets/parchment.svg` as `background-image`, layered at ~40% opacity over `--ivory-100`. Use for lesson cards, crest cards. Never full-page.
- **Flat cards (low ceremony):** `--bg-surface` (#FFFFFF) on `--bg-page`. Use for lists, settings, data-dense screens.

### Animation

- **Default ease:** `var(--ease-out)` — `cubic-bezier(0.22, 1, 0.36, 1)`. Feels like a curtain settling.
- **Candle ease** for warm, slower transitions (crest reveal, chapter turn): `var(--ease-candle)`.
- **Durations:** `--dur-fast` (140ms) for hover / press, `--dur-med` (260ms) for panel open, `--dur-slow` (520ms) for sheet / route, `--dur-reveal` (900ms) for crest unlocks.
- **No bounces.** No spring overshoots. No rubber-band. This is a cathedral, not a bouncy castle.
- **Crest unlocks** are the one flourish: scale 0.8 → 1.0 with a soft gold halo, then a slow rotation of the ribbon banner settling. Never exceed 900ms.

### Hover & press states

- **Hover (desktop / web dashboard):** background shifts one step deeper
  (ivory-100 → ivory-200) OR text color shifts gold-500 → gold-700. Never
  add or remove a shadow on hover — ceremony stays still.
- **Press:** `transform: scale(0.98)` + `box-shadow: var(--shadow-inset)`.
  Never change color on press.
- **Focus:** 2px gold ring at 2px offset: `outline: 2px solid var(--gold-500); outline-offset: 2px;`. No blue default rings.

### Borders

- Hairline: `1px solid var(--border-1)` on cards, inputs, dividers.
- Gilded: `1px solid var(--gold-500)` on featured cards and primary buttons in solid form.
- Strong: `1.5px solid var(--navy-700)` on locked / restricted elements.
- Never dashed. Never dotted. This isn't a whiteboard.

### Shadows

Warm, navy-tinted, layered. `--shadow-xs` through `--shadow-lg` for elevation;
`--shadow-glow-gold` for the single "chosen" element on a screen (active
quest card, earned crest); `--shadow-inset` for pressed states and sunken wells.

### Corner radii

Soft but not bubbly.

- `--radius-sm` 4px — chips, inputs
- `--radius-md` 8px — buttons, small cards
- `--radius-lg` 14px — standard card
- `--radius-xl` 20px — hero card, bottom sheet
- `--radius-arch` — **lancet / gothic-arch top** (`50% 50% 0 0 / 28% 28% 0 0`). Used on ONE element per screen max: hero panel, chapter intro, crest modal. The signature shape.

### Transparency & blur

- Blur is for **modal scrims** only: `backdrop-filter: blur(8px)`, background `rgba(15, 26, 51, 0.4)`.
- No frosted glass on navigation, cards, or headers. It fights the parchment.
- Opacity for disabled states: 0.4. For muted meta: color change, not opacity.

### Cards

- Surface: `--bg-surface` or `--bg-raised`.
- Border: `1px solid var(--border-1)`.
- Radius: `--radius-lg` (14px). Never `--radius-xl` unless it's a hero.
- Shadow: `--shadow-sm` resting, never rises on hover.
- Inside padding: `--sp-5` (20px) mobile, `--sp-6` (24px) desktop.
- Card titles: `.t-h4`. Body: `.t-body-sm`. Meta: `.t-meta`.

### Layout rules

- **Bottom tab bar** on mobile, fixed. Four tabs max: Path · Trials · Order · Profile.
- **Top app bar** for mobile is 56px, borderless; scroll-on-content produces a hairline border.
- **Max content width** on web / tablet: 1120px. Hero sections can breathe to 1280px.
- **Safe area** respected on iOS; bottom tab bar extends with `padding-bottom: env(safe-area-inset-bottom)`.

### Imagery vibe

Warm, slightly desaturated. High contrast but never neon. If photography is ever used (instructor portraits in Masterclass-style lessons), treat with a soft amber overlay at 15%. Never cool / blue-shifted photography.

---

## Iconography

**UI icons:** Lucide (via CDN — `https://unpkg.com/lucide-static@latest/`). Override stroke-width to **1.6** (Lucide default is 2) to feel slightly more etched and less tech-bro. Color: `currentColor`, inherits from text.

**Crests (achievements, ranks):** custom SVGs in `assets/crests/`. These are the **brand flourishes** — hand-composed heraldry, not Lucide. Always rendered as SVG, never as emoji or PNG. Three archetypes to start:

| Crest | Meaning | Ribbon color |
| --- | --- | --- |
| `crest-shield.svg` | Mastery / certification milestone | Crimson (danger-scale, sealed-wax) |
| `crest-flame.svg` | Streak / daily vigil / XP tier | Navy |
| `crest-chalice.svg` | Data / content mastery | Verdigris green (success) |

Add more crests by copying one of the existing files and swapping the central glyph — keep the outer shield/medallion/hex silhouette consistent per archetype family.

**Emoji:** never, except in user-generated content (chat, profile bio). Product-authored strings use crests or Lucide.

**Unicode icons:** avoid. The one exception is the em-dash (—) as a decorative divider between sections, e.g. *"Chapter 3 — The Event Log."*

**Brand substitution flag:** since no assets were provided, all crests and the wordmark are **placeholders built to spec**. Replace with licensed originals if/when they exist.

---

## Accessibility notes

- Contrast: all text passes WCAG AA against `--bg-page` and `--bg-surface`.
  Gold text must sit on navy or ivory — never on gold backgrounds. Use
  `--gold-700` (not `--gold-500`) for text on ivory.
- Focus rings required on every interactive element (see Visual Foundations → Hover & press).
- Crests always have an `aria-label` with their proper name (*"Shield of Conformance"*).
- Never communicate state with color alone. Locked = icon + color. Complete = checkmark + color.
