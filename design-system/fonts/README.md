# Fonts

PathForge uses Google Fonts via CDN in `colors_and_type.css`:

- **Cormorant Garamond** — serif display & headings (warm transitional serif, slight inscriptional feel without going full Cinzel/Trajan)
- **Manrope** — humanist sans (body, UI, labels)
- **JetBrains Mono** — mono (code snippets in cert materials)

## CJK fallbacks (system)

- Chinese: Source Han Serif / Songti SC → Source Han Sans / PingFang SC
- Japanese: Yu Mincho / Hiragino Mincho → Hiragino Sans

## Substitutions flagged

No licensed brand fonts were provided. These Google Fonts were chosen per your
brief ("Cormorant / EB Garamond" + "humanist sans like Manrope"). If PathForge
has licensed brand fonts — e.g. a custom inscriptional serif — drop `.woff2`
files here and replace the `@import` in `colors_and_type.css` with `@font-face`
declarations.

Suggested pro alternatives if you ever upgrade:
- Serif: Migra, Söhne Breit, GT Super, Canela
- Sans: Söhne, GT America, Graphik, Aktiv Grotesk
