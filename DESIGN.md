# Design

## Theme

Drenched emerald night — a prayer-room in late evening. Deep emerald surfaces, warm cream ink, gold accents for status. Light mode is paper-and-ink (the mushaf on a desk).

Both modes share the same Type and Spatial systems; color and surface are the only branches.

## Color Strategy

**Committed + drenched in dark mode**: the surface IS the brand — the page background runs deep emerald. Cream text and gold accent carry the rest.

- **Default mode**: dark / drenched emerald.
- **Light mode**: warm paper-and-ink (deliberate off-tone, not the cream-sand default).
- **Accent**: gold. Used for: progress fills, completed states, the active reading edge, status only. Never for chrome.

### Tokens (OKLCH)

```css
/* Dark — drenched emerald night */
--bg:        oklch(0.165 0.038 165);          /* deep emerald night     */
--bg-deep:   oklch(0.130 0.034 165);          /* page edges / navbar    */
--surface:   oklch(0.215 0.044 165);          /* card resting           */
--surface-2: oklch(0.265 0.050 165);          /* card hover / active    */
--border:    oklch(0.305 0.040 165 / 0.55);   /* hairline borders       */
--ink:       oklch(0.945 0.030 90);           /* warm cream             */
--ink-soft:  oklch(0.880 0.035 90);           /* slightly dimmer cream  */
--muted:     oklch(0.620 0.025 100);          /* warm sage, body meta   */
--muted-2:   oklch(0.490 0.022 100);          /* deeper meta            */
--primary:   oklch(0.745 0.150 165);          /* bright emerald         */
--primary-2: oklch(0.640 0.155 165);          /* pressed emerald        */
--accent:    oklch(0.815 0.135 80);           /* warm gold              */
--accent-2:  oklch(0.710 0.150 65);           /* deeper gold            */
--ring:      oklch(0.815 0.135 80 / 0.55);    /* focus ring (gold)      */

/* Light — paper-and-ink */
--bg-l:      oklch(0.978 0.010 85);           /* warm paper             */
--surface-l: oklch(0.940 0.014 85);           /* card paper             */
--surface-2l:oklch(0.900 0.018 85);           /* hover                  */
--ink-l:     oklch(0.205 0.025 165);          /* deep emerald-ink       */
--primary-l: oklch(0.450 0.115 165);          /* emerald                */
--accent-l:  oklch(0.555 0.140 70);           /* gold                   */
```

**Contrast (computed)**
- Cream on dark emerald: **11.9 : 1** ✓
- Muted sage on dark emerald: **4.7 : 1** ✓ (body meta)
- Deep emerald ink on paper: **12.4 : 1** ✓
- Gold accent on dark emerald: **8.3 : 1** ✓

## Typography

Two voices, used deliberately.

- **Arabic display + body**: **Amiri** (400 / 700). Loaded once. Used for every line of adhkar text. Lines: 1.8× line-height. Letter-spacing in headings slightly negative (`-0.005em`) for that printed feel.
- **Latin UI**: **Inter** (400 / 500 / 600 / 700). Used for the app chrome: nav, search, counters, buttons, headings in navigation. Tight `letter-spacing: -0.012em` on h1–h3.

Display ceiling: `clamp(2rem, 4vw + 1rem, 3.5rem)`. Never larger — the type is the page, not the brand.

## Spatial

8-pt base, 4-pt sub.
- `--s-1: 0.25rem` (4) · `--s-2: 0.5rem` (8) · `--s-3: 0.75rem` (12) · `--s-4: 1rem` (16) · `--s-6: 1.5rem` (24) · `--s-8: 2rem` (32) · `--s-10: 2.5rem` (40) · `--s-12: 3rem` (48)

Cards and list items: 16-px corner radius for cards, 12-px for nav items, 9999 for the counter pill (intentional — it's the only shape that earns the pill).

## Motion

- **Counter tap**: scale 0.94 → 1.0, 120 ms ease-out-quart. With `prefers-reduced-motion: reduce`, snaps instantly.
- **Read state**: card surface swaps to emerald-cream wash over 220 ms. No slide.
- **Sidebar enter (mobile)**: slide-in 220 ms with `transform`, never opacity-only.
- **Active section change**: crossfade 140 ms on the main panel only. Sidebar updates immediately.
- No bounce. No elastic. No confetti.

## Layout

Two-column at ≥ 768 px (sidebar | reader). One column below. Sidebar slides over on mobile (< 640 px). Navbar is sticky at the top of both modes.

Cards are different on purpose:
- **Sidebar nav item**: rounded 12, 1-px hairline border on hover, surface lifts a step. The active item has a 2-px left-edge gold rule (RTL: right edge) — the only place we use a side stripe, and only because the active state carries an "open" reading.
- **Reader card**: rounded 16, no border by default. Read cards swap to a gold-cream wash. The mushaf line beneath the page count is a 1-px ink-alpha rule.

## Components

| Component | Notes |
|---|---|
| `Navbar` | Sticky. `--bg-deep` surface. Logo + Arabic name in cream. Single icon-button on the right: theme toggle. RTL chevrons. |
| `Sidebar` | `--surface`. Header (logo + close on mobile). Search bar. Sections: "المفضلة" then "الأذكار". Nav items: title + heart. |
| `NavHeader` | Eyebrow text, 0.0625em tracking, `--muted` color. Used at most twice per sidebar. |
| `NavItem` | 44-px touch target. Heart on the trailing edge (RTL = leading visually). Active state uses side rule + lifted bg. |
| `SearchBar` | 1-px hairline border, no shadow. Focus ring gold. RTL-aligned. |
| `MainContent` | Reader. Sticky top bar with category title + progress bar. Cards stacked, 16-px gap, generous 24-px padding on ≥ md. |
| `EmptyState` | Replaces the placeholder text. Centered, gold-sand rule, brief warm copy. |
| `CountButton` | Counter pill, monospace digits, 48-px tall. Toggles to "complete" with a check. |
