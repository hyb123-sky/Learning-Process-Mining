# Learning Process Mining — PathForge

PathForge is a mobile-first gamified learning platform for **process mining
and Celonis certification**. Learners are framed as paladins on a quest for
mastery; the aesthetic is **Celonis monochrome + white-paladin medieval** —
stark white surfaces, hairline greys, black type, with gold reserved as a
whisper accent (crest glow only).

This repo is the first cut of the **PathForge Design System** and the
accompanying **Mobile UI Kit**. No production app code lives here yet — the
purpose of this commit is to land the brand, tokens, assets, and six
hi-fidelity screens so the product team has a single source of truth.

## Layout

| Path | Contents |
| --- | --- |
| `design-system/README.md` | Brand fundamentals, voice, visual foundations. |
| `design-system/SKILL.md` | Claude skill manifest for generating on-brand interfaces. |
| `design-system/colors_and_type.css` | All design tokens (colors, type, spacing, radii, shadows, motion). |
| `design-system/fonts/` | Font stack + licensing + substitution notes. |
| `design-system/assets/` | Logo, mark, parchment + cathedral-light textures. |
| `design-system/assets/crests/` | Shield, Flame, Chalice crest SVGs. |
| `design-system/preview/` | One HTML card per token group — palette, type, spacing, radii, shadows, components, brand marks. |
| `design-system/ui_kits/mobile/` | React/Babel click-through prototype: onboarding, home, lesson + trial, crest unlock, certification, daily vigil. EN / ZH / JP. *Needs a local server — see below.* |
| `content/quests/use-and-interpret-views/` | Japanese exam-prep content for the Celonis **Use and Interpret Views** qualification. Chapters + 10-question trials each. |
| `study.html` | **Self-contained study app — open this directly.** Reads chapters from `content/`, renders lessons, runs trials with instant feedback and per-question explanations. |
| `index.html` | Landing page linking the Study app, the mobile UI kit, and every design preview. |

## Quick start — study the exam material

**Double-click `study.html`** (or `index.html` → 「学習を始める」).
No build step, no local server needed. It loads Chapter 1 & 2 of the
"Use and Interpret Views" quest, lets you read the lessons in Japanese,
then run the 10-question trial per chapter with instant grading and
explanations.

## Quick start — browse the design system

Open `index.html` to reach every token card (palette, type, spacing,
radii, shadows, components, brand marks).

## Opening the mobile UI kit

The React/Babel prototype at `design-system/ui_kits/mobile/index.html`
uses `<script type="text/babel" src="...jsx">` to load screen files.
Browsers block those XHR requests under the `file://` protocol (CORS),
so **double-clicking it will render a blank page**. To view it:

```bash
cd Learning-Process-Mining
python3 -m http.server 8000
# then open http://localhost:8000/design-system/ui_kits/mobile/
```

The `study.html` app does **not** have this limitation — it only uses
plain-JS `<script src>` tags, which work under `file://`.

## Re-implementing in a production codebase

The mobile UI kit is a **visual reference**, not production code. When you
port it:

1. Lift the tokens from `design-system/colors_and_type.css` into your theme.
2. Replicate each screen using your framework's idioms — match the visual
   output pixel-for-pixel, but don't copy the prototype's internal structure.
3. Lift crest SVGs and the iOS frame assets verbatim.
4. Replace the per-screen `strings[lang]` dictionaries with your real i18n
   pipeline (ICU messages, i18next, FormatJS — whatever your stack uses).

See `design-system/README.md` for the tone-of-voice, lexicon, and
accessibility rules that must travel with any port.
