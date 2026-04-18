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
| `design-system/ui_kits/mobile/` | React/Babel click-through prototype: onboarding, home, lesson + trial, crest unlock, certification, daily vigil. EN / ZH / JP. |
| `index.html` | Top-level index that links every preview card and the mobile UI kit. |

## Quick start

Open `index.html` at the repo root in any modern browser — no build step, no
install. Everything is vanilla HTML / CSS / React-via-CDN so the design is
inspectable and portable into any production stack (React Native, Flutter,
native iOS/Android, or web).

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
