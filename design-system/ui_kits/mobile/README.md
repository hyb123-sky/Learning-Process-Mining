# PathForge Mobile UI Kit

Hi-fi visual recreation of the PathForge mobile app. Six key screens, wired
as a click-through prototype, in an iOS 26 device frame. Components are
modular — drop them into any React/Babel prototype.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry — "All screens" overview + "Prototype" click-thru. Language toggle EN/ZH/JP. |
| `ios-frame.jsx` | Shared device frame (copied from the iOS starter component). |
| `PFPrimitives.jsx` | PathForge primitives — icons, buttons, cards, app bar, tab bar, progress ring. |
| `ScreenOnboarding.jsx` | Language pick · cathedral-light hero · "Begin your quest" CTA. |
| `ScreenHome.jsx` | Active quest hero · daily vigil stat · vertical chapter map. |
| `ScreenLesson.jsx` | Reading + serif pull-quote + mock event-log code block + inline trial (MCQ). |
| `ScreenCrestUnlock.jsx` | Reveal screen with gold halo + soft scale/rotate animation. |
| `ScreenCertification.jsx` | P2P cert progress ring · chapter list · earned crests. |
| `ScreenVigil.jsx` | Streak (7-day strip) · today's chapter CTA. |

## Flow (Prototype mode)

`Onboarding → Home → Lesson (submit correct) → Crest unlock → Certification → Home`

Plus tab bar → Trials takes you to Certification; the vigil card on Home
opens the Vigil screen.

## Multilingual

Copy strings per language are inside each screen file as a `strings[lang]`
dictionary. Not production-ready i18n — this is a UI kit. For production,
lift to a single `/locales` file and use ICU message format.

## Iconography

UI icons are inline Lucide-style paths at stroke-width 1.6 (per the design
system's iconography rule — slightly more etched than default Lucide 2.0).
Crest SVGs load from `../../assets/crests/`.

## Known limitations

- No real auth / profile screen (per brief: 6 screens chosen, Profile deprioritized).
- Leaderboard screen omitted (not in the selected set).
- Lesson trial has one question hard-coded — not a generic quiz engine.
