---
version: alpha
name: Jeff-Jen-Care-Plus-design
description: A warm, calm, light care website. Cream paper, deep teal-green ink, one calm teal for every primary action (always "Call 07554 572378"), and a soft terracotta used only for small accents and on dark panels. Fraunces (soft serif) carries headings with an occasional italic for warmth; Geist carries body copy at a generous 15–17px. Everything is rounded and soft: pill buttons, 28px double-bezel cards, no hard corners. Photography is homely and people-free (front door, hallway, a cup of tea by the window). Motion is gentle: a scroll-scrubbed hero that is ONE continuous push-in on a single scene (never a cut or morph between different images), fade-up reveals, a slow pulse on the floating call button.

colors:
  paper: "#f7f2e8"         # page background
  paper-deep: "#efe7d7"    # alternate section / card tray
  chalk: "#fffcf6"         # card plate
  ink: "#1b332f"           # text
  ink-soft: "#e4ece5"      # soft sage panel (care homes strip)
  signal: "#1d6a5e"        # primary actions, links, ticks
  glow: "#f0c3a0"          # warm accent on dark (italic headline words)
  clay: "#a8512d"          # tiny accents: eyebrow dots, small labels
  night: "#10211e"         # dark panels, footer, video scrim
  snow: "#fbf8f1"          # text on dark / on video
  hairline: "ink @ 12%"
  hairline-strong: "ink @ 22%"

typography:
  display:
    fontFamily: "Fraunces (SOFT 100, WONK 0), Georgia, serif"
    sizes: "hero 40–70px · h1 48–72px · h2 36–48px · card h3 20–30px"
    lineHeight: 1.0–1.1
    letterSpacing: -0.015em
    italic: "one or two words per headline, in glow (on dark) or signal"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    sizes: "lede 17–18px · body 15–16px · small 13–14px (never below 13px)"
    lineHeight: 1.6
  label:
    fontFamily: "Geist 600, uppercase, 0.12em tracking, 11px"

rounded:
  pill: 999px      # buttons, chips, navbar
  card: 28px       # .bezel tray; plate is card - 6px
  inner: 20px      # list rows, small panels
  field: 12px      # inputs

contrast:
  rule: "Small text on paper/chalk uses ink at ≥ 70% opacity (≥ 4.5:1). Snow on night ≥ 55%. Glow on signal only for large text."
---

## Overview

The site has to reassure two worried audiences quickly (families arranging
care, and care home managers needing a shift filled) and give a third
(job seekers) a clear path. So the design is quiet and warm, and the phone
number is everywhere. Nothing should feel clinical, corporate or "tech".

## Colors

- **Signal (teal) is the only action colour.** Every primary button is
  teal with snow text; every primary action is "Call 07554 572378".
- **Clay** is decoration only (eyebrow dots, small labels), never body text.
- **Night** panels (recruiting box, closing CTA, footer) give rhythm on a
  long cream page. Text on them is snow; emphasis is glow.
- `night` and `snow` never change with theme: use them over photos/video.

## Typography

- Headlines in Fraunces, sentence case, one idea per line. Italic is the
  warmth device ("care, *at home*"), used once per headline at most.
- Body in plain, short British English. No jargon ("domiciliary" appears
  only beside "home care").

## Layout

- Max width 72rem (`max-w-6xl`), 16–32px gutters.
- Section rhythm: 96–128px vertical padding; alternate paper and
  `warm-wash` paper-deep bands.
- Homepage order: hero → who we look after → intro → services → how it
  works → why families choose us → care homes → recruiting → FAQ →
  accreditations → call CTA.

## Elevation

Depth matters: the page must never look flat. Layered cards (gradient
tray + lit plate, deep soft shadow), `.lift` hover on interactive cards,
`.photo` frames with a long shadow, `.float-card` panels overlapping
photo corners, blurred colour fields behind headings, and a full-width
night band (How it works) to break up the cream. Real photos sit inside
sections (hallway, sitting room, front door behind the closing CTA).

## Components

### Buttons
Pill. Primary: signal bg, snow text, round "well" holding an arrow or
phone icon. Secondary: chalk bg, hairline-strong border, ink text.
On dark: snow bg, night text.

### Floating call button (phones only)
From Uiverse.io (andrew-demchenk0, "accept call" button), restyled: a
56px signal circle with a phone icon, bottom-right, gentle pulse ring
(off for reduced motion). Hidden ≥ 1024px where the navbar shows the number.

### FAQ accordion
From VengeanceUI (`faq-accordion`), restyled: left border bar in hairline
that turns signal when open, +/− marker, smooth grid-rows height
animation, `aria-expanded` + `aria-controls`.

### Form loader
From Uiverse.io (FWDJc, heart loader), shrunk to 18px and recoloured to
snow/glow, shown in the submit button while sending.

### Cards, chips, eyebrows
Chips: pill, hairline-strong border, chalk bg, 13px. No eyebrow/label
pills above headings (removed at the owner's request: they read as
template-made). Headings stand alone; one italic accent phrase at most.

## Responsive Behavior

- Touch targets ≥ 44px. Navbar collapses to a menu button below 1024px;
  the phone number moves to the floating call button.
- Hero: desktop scrubs video; phones scrub a WebP sequence (centre crop).
- No horizontal scroll at 390px (checked).

## Known Gaps

- No real photos of the team yet (Team & news appears once added).
- No reviews yet; never invent them.
- CQC rating widget appears once the location ID is added.
