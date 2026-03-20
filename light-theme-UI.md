# Light Theme UI Audit — avo.re /now/agentic-hero/bw

Source: `https://www.avo.re/now/agentic-hero/bw`
Stack: Next.js, Tailwind CSS, Geist variable fonts
Design character: Dark monochromatic ("bw" = black & white). No brand color — strictly neutral grays. Calm, ambient, developer-inflected GRC dashboard. Low urgency, low visual noise.

---

## 1. Colors

All values are from the Tailwind `neutral` scale. Zero chromatic color — every tone is pure gray.

### Background Scale
| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| bg-base | `neutral-950` | `#0a0a0a` | Page background |
| bg-overlay | `neutral-950/60` | `rgba(10,10,10,0.6)` | Header (glass blur) |
| bg-surface | `neutral-900` | `#171717` | Implied card/surface elevation |

### Text Scale
| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| text-primary | `neutral-100` | `#f5f5f5` | Headings, active nav, primary content |
| text-secondary | `neutral-400` | `#a3a3a3` | Nav links, supporting text |
| text-tertiary | `neutral-500` | `#737373` | Footer, timestamps, meta |

### Border / Divider
| Token | Tailwind | Value | Usage |
|---|---|---|---|
| border-default | `neutral-800/60` | `rgba(38,38,38,0.6)` | All dividers — header bottom, footer top, cards |

### Interactive States
- Hover text: `neutral-100` (brightens secondary text)
- Hover opacity: `opacity-70` on logo / icon elements
- Selection: accent at 25% opacity (system default)
- All transitions: `transition` class → 150ms ease (Tailwind default)

---

## 2. Typography

### Font Family
- **Primary**: `Geist` — variable font, sans-serif
- **Monospace**: `Geist Mono` — variable font
- **Fallback**: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Rendering: `antialiased` globally

### Size Scale (Tailwind defaults)
| Class | Size | Weight | Usage |
|---|---|---|---|
| `text-xs` | 12px | 400 | Timestamps, footer, meta labels, "Optional" tags |
| `text-sm` | 14px | 400 | Body text, nav, agent names, button labels |
| `text-sm` | 14px | 500 | Logo, section headings (`font-medium`) |

### Recurring Typography Patterns
```
Logo / wordmark:    text-sm font-medium tracking-tight
Nav link:           text-sm text-neutral-400 hover:text-neutral-100
Section heading:    text-sm font-medium
Agent name:         text-sm text-neutral-100
Meta / timing:      text-xs text-neutral-500
Footer text:        text-xs text-neutral-500
Footer link:        text-xs text-neutral-500 hover:text-neutral-200
```

### Letter Spacing
- `tracking-tight` on logo and key headings only — all other text at default tracking

---

## 3. Spacing

### Base Unit
Tailwind default: 1 unit = 4px

### Container
- Max-width: `max-w-6xl` (1152px)
- Horizontal padding: `px-6` (24px)
- Centered: `mx-auto`

### Section / Vertical Rhythm
- Header inner: `py-4` (16px top/bottom)
- Main sections: `py-10` (40px)
- Footer: `py-10`

### Component Gaps
- Navigation link gap: `gap-6` (24px)
- Footer flex gap: `gap-4` (16px) mobile, resolved at `sm:`

### Inline / Element Spacing
- Buttons: `px-4 py-2` implied (16px / 8px)
- List items: `text-sm` line-height default (~1.5 × 14px = 21px)
- Border dividers carry the visual rhythm in place of explicit margins

---

## 4. Layout Grid

### Page Shell
```
sticky header (full-width, backdrop-blur)
  └── inner: mx-auto max-w-6xl px-6
        └── grid grid-cols-[auto_1fr] items-center
              ├── logo (auto width)
              └── nav (flex justify-end gap-6)

main
  └── mx-auto max-w-6xl px-6
        ├── Status heading
        ├── GRC Workforce Agents (list)
        ├── Prompt section
        ├── "Pick up where you left off" (cards)
        ├── Optional tasks (cards)
        ├── What's new (3-up)
        └── System log

footer (full-width)
  └── inner: mx-auto max-w-6xl px-6 py-10
        └── flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between
```

### Grid Usage
- Header: `grid grid-cols-[auto_1fr]` — logo takes natural width, nav fills remainder
- 3-up "What's new": implied `grid grid-cols-3` or `flex` with `gap-4`
- All other content: stacked flex column

### Border Radius
The page uses minimal or no rounding (not captured in class output — defaults to `rounded-none` or unset). Clean, square-edged components consistent with the developer / terminal aesthetic.

---

## 5. Common Components

### Header Bar
```
sticky top-0 z-50
border-b border-neutral-800/60
bg-neutral-950/60 backdrop-blur
inner: grid grid-cols-[auto_1fr] items-center max-w-6xl mx-auto px-6 py-4
```
- Glass morphism: semi-transparent + blur — content shows through on scroll
- No shadow — border does all the work

### Navigation Links
```
text-sm text-neutral-400
hover:text-neutral-100 hover:underline underline-offset-4
transition
```
- No pills or active indicators beyond underline
- Right-aligned via `flex justify-end`

### Section Heading
```
text-sm font-medium text-neutral-100
```
- Flat — no decorative treatment, no uppercase
- Serves as anchor for each page region

### Agent Status List Item
```
text-sm text-neutral-100   — agent name
text-xs text-neutral-500   — "Last X ago, next in Y"
```
- No card container — open list, separated by line rhythm
- Pattern: `[Name] · [timing meta]`

### Task Card (Pick up / Optional)
```
border border-neutral-800/60   — or implied surface
text-sm                        — title
text-xs text-neutral-500       — date badge (Jan 14, Jan 16)
button "Open" / "Start"        — inline text or pill action
```
- "Optional" label: `text-xs text-neutral-500` with "Low pressure" descriptor
- Minimal footprint — no heavy card chrome

### Action Buttons
Two variants observed:

| Variant | Style | Usage |
|---|---|---|
| Ghost / text | `text-sm` no border | "ClearRun task", inline actions |
| Outlined / pill | `px-4 py-2 text-sm border border-neutral-800` | "Open", "Start" |

- No filled / colored buttons — the entire UI is borderless or outline-only
- Hover: `hover:text-neutral-100 transition`

### Badge / Tag
```
text-xs text-neutral-500   — "Optional"
text-xs text-neutral-500   — "Low pressure"
text-xs text-neutral-500   — Date: "Jan 16"
```
- No background fill, no border on badges — pure text labels
- Distinction only through text color + spacing

### What's New — Feature Card (3-up)
```
text-sm font-medium   — feature title
text-xs text-neutral-500   — description
border-neutral-800/60   — card edge
```
- Likely `flex flex-col gap-1` or `gap-2` internally
- Equal-width columns, no hero image

### System Log Row
```
text-xs text-neutral-500   — timestamp
text-sm text-neutral-400   — event description
```
- Tabular/list structure, not a table element
- 24-hour coverage view — status monitoring

### Footer
```
border-t border-neutral-800/60
mx-auto max-w-6xl px-6 py-10
flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between
text-xs text-neutral-500
links: hover:text-neutral-200 transition
```

---

## 6. Patterns & Design Principles

### Divider-First Visual Rhythm
Spacing between sections is communicated through `border-neutral-800/60` dividers, not whitespace. This creates a compact, terminal-like reading experience.

### Zero Color Policy
No status colors (green/amber/red), no brand colors, no accent fills. All state is communicated through text content and placement alone. This is a deliberate calm-state aesthetic — urgency is linguistic, not chromatic.

### Glass Header
`bg-neutral-950/60 backdrop-blur` — the only use of blur or transparency. Establishes depth hierarchy while keeping the palette strictly monochrome.

### Typography as Hierarchy
Size and weight are the only hierarchy tools: `text-sm font-medium` (headings) vs `text-sm` (body) vs `text-xs text-neutral-500` (meta). No display sizes, no large numbers.

### Low-Pressure Framing
Content is annotated as "Optional · Low pressure" — the UI vocabulary mirrors the content tone. No urgency indicators, no red dots, no "important" styling.

### Inline Time Awareness
Agent items show `Last X ago, next in Y` inline with the name. Time is ambient data, not a call to action.

### Responsive Strategy
Mobile-first. The `sm:` breakpoint is the only responsive step used. Layout shifts from stacked (`flex-col`) to side-by-side (`sm:flex-row`) at the small breakpoint (640px).

---

## Key Files / Stack Notes
| Detail | Value |
|---|---|
| Framework | Next.js |
| CSS | Tailwind CSS |
| Fonts | Geist + Geist Mono via `next/font` |
| Max container | `max-w-6xl` (1152px) |
| Breakpoints used | `sm:` (640px) only |
| Shadows | None |
| Border radius | None (or unset — square edges) |
| Animation | `transition` on all interactive elements (150ms ease) |
