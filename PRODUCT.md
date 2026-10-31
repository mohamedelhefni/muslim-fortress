# Product

## Register

product

## Users

Muslim practitioners who want to recite daily adhkar (remembrances) and selected du'a on phone or laptop, primarily in Arabic (RTL). Contexts vary: morning/evening routine, before sleep, after salah, while traveling. Quiet, focused moments — phone in hand, often one-handed, often with the screen already on.

The interface must feel reverent and unhurried. The reader is reciting sacred text, not scrolling a feed. Distraction is the enemy.

## Product Purpose

Provide the full *Hisn Almuslim* corpus with a counter that helps the reciter focus on the dhikr itself rather than tracking their own progress. Success looks like: the user opens the app, taps a section, reads each item aloud while tapping the counter, and closes the app feeling more centered than when they opened it.

Offline-first PWA. The data must always be there, even on a flight or in a low-signal mosque courtyard.

## Brand Personality

Three words: **reverent, calm, grounded**.

Voice in copy: minimal, warm, no exclamation marks, no gamification language. No "completed!" confetti. A counter that reaches its target is enough — the work is the recitation, not the badge.

References (named for the *specific* quality):
- The Quran page in a *mushaf* — wide right margin, justified text, a single dark line beneath the page number.
- Late-evening prayer room lighting: low walls, a single warm light source.
- A field journal — soft, hand-bound, slightly imperfect.

## Anti-references

- **Not** a "habit-tracker SaaS." No streak counters, no flame icons, no "you completed 7 days in a row!"
- **Not** a Material Design 3 surface with rounded-everything pills and bright accent gradients.
- **Not** glassmorphism, gradient text, blur-everything cards. The mushaf page is paper-and-ink, not glass.
- **Not** a coaching app tone — no "Let's go!" or "You've got this!" copy.
- **No** tiny uppercase eyebrow labels ("MORNING", "EVENING", "TRAVEL") above every section.

## Design Principles

1. **The reader is reciting, not browsing.** Any visual element that draws attention away from the Arabic text is a defect. Type is the star.
2. **One tap to read, one tap to count.** Counters must be reachable without aiming. Targets ≥ 44px on touch.
3. **Progress is a bar, not a number trophy.** We show % complete because reciting without losing your place matters; we do *not* show "you've read 142 items this week" because that's gamification.
4. **The page should feel like turning to a page in a book.** Scrollbars hidden, whitespace generous, header sticks lightly on scroll. Sub-page transitions use a soft crossfade, never a slide.
5. **Light or dark — both must read reverent.** Light = warm off-white paper. Dark = deep emerald night. Neither is a default; both must work.
6. **RTL is the layout, not an exception.** Every flex/grid direction, every padding, every icon-mirror assumes `dir="rtl"`. We don't undo RTL for "simpler" CSS.

## Accessibility & Inclusion

- WCAG 2.1 AA contrast minimum. Body text ≥ 4.5:1; large text and decorative borders ≥ 3:1. The cream-on-emerald pairing must be tested in both modes.
- All interactive targets ≥ 44 × 44 px on touch, with visible focus rings.
- `prefers-reduced-motion: reduce` honored: no entrance animations, no counter pulse, just instant state changes.
- Counter buttons are operable by keyboard with `Enter` and `Space`.
- All counters and read-state are announced to screen readers via `aria-pressed` and `aria-label`.
- The mushaf page count is announced ("آية ٣ من ٧") to screen readers — concrete, not stylized.
- No flashing or strobing. Count completion is a single calm pulse, not confetti.
