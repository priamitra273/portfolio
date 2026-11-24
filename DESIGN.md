# Design System: Personal Portfolio (Frontend / Full-Stack Developer)

> **Design Read:** Reading this as: Personal portfolio for a Frontend / Full-Stack Developer targeting hiring teams and technical clients, in a Tactile Editorial Press ("Daylight Folio & Nocturne Press") visual language, dial `ENERGY 3 / RHYTHM 3 / MOTION 3`.

**Dial:** `ENERGY 3 / RHYTHM 3 / MOTION 3`
**Skills Combined:** `antislop` (Core, UI, Human, Layoutmobile, Copywriting, Code) + Editorial Press Craft
**Conflict Resolution (R-37):** `antislop` takes precedence whenever a visual pattern collides with a Hard Gate, Purpose-Gate, or Quality Lock rule. Every adopted visual technique carries a written purpose (R-31).

---

## 1. Identity & Brand Direction (R-20, R-21, R-30, R-37)

- **Persona & Tone:** Quietly confident, craft-focused Frontend / Full-Stack Developer. Combines a dramatic Studio Portrait Hero stage with structured editorial monograph case sections below the fold.
- **Vibe Archetype:** **Nocturne Studio & Daylight Folio** (deep obsidian studio stage `#0E110F`, studio emerald mint display typography `#5EEB9B`, frameless cutout monochrome portrait anchored to the bottom seam over a figure-ground studio backlight halo, plus a full WCAG-verified Daylight light mode toggle).
- **Dual-Edition Theme Strategy (R-21, R-34):**
  1. **Nocturne Studio (Dark default, owner direction):** Obsidian canvas (`#0E110F`), dark slate shells (`#161B18` / `#1D2420`), crisp white-mist ink (`#F2F5F3`), and Studio Emerald Mint (`#5EEB9B`, `12.51:1` contrast).
  2. **Daylight Folio (Light toggle):** Soft archival alabaster (`#F7F8F5`), sage-stone shells (`#EAEEE8`), deep carbon ink (`#141815`), and Deep Studio Emerald (`#14633A`, `6.85:1` contrast).
  Both themes are user-toggleable in the persistent top header and verified to pass WCAG AA across every text and control pairing.
- **Hero Studio Backlight Purpose (R-01, R-31):** The focused emerald radial studio halo behind `/portrait-cutout.webp` exists specifically to create figure-ground separation between the developer's black hair/shirt and the `#0E110F` dark studio background.
- **Identity Motifs (Liveliness Toolkit):**
  1. **Concentric Double-Bezel ("Framed Press Plate"):** Flagship visual plates and detail frames sit inside a linen/slate outer shell (`padding: 8px`, `border-radius: 24px`) framing a crisp inner plate (`border-radius: 16px`) with corner registration crop marks.
  2. **Editorial Folio Numerals & Live Chapter Index:** Sections carry numbered folio markers (`01` to `05`) mirrored in the live-updating header chapter indicator.
- **Anti-Cloning Guardrail (R-30):** No Linear/Vercel dark-glow grids, no blue-purple gradients, no Apple launch chrome, no fake terminal windows.

---

## 2. Written Decisions & Purpose Log (R-31)

| Element / Technique | Rule | Written One-Line Purpose |
|---|---|---|
| **Cotton Paper + Botanical Pine + Vermilion Stamp** | R-01, R-29 | Separates structural editorial hierarchy (Pine) from the single focal action accent (Vermilion) within a 2-core + 1-accent system. |
| **Working Daylight / Nocturne Theme Toggle** | R-21, R-34 | Gives readers comfortable choice between bright archival paper and low-glare evening reading without breaking contrast. |
| **Newsreader + Plus Jakarta Sans + IBM Plex Mono** | R-06 | Pairs optical-size editorial display serif with high-legibility geometric body copy and compact technical metadata. |
| **Double-Bezel Frames with Registration Marks** | R-11, R-12 | Frames flagship visual plates and detail dialogs through surface contrast rather than page-wide drop shadows. |
| **Flagship Showcase + Hairline Archive Rows** | R-05, R-14 | Differentiates the primary featured build from secondary projects so cards do not repeat a uniform template. |
| **Floating Folio Index + Expanding Menu** | R-10, R-24 | Keeps chapter orientation and theme control accessible while restricting `backdrop-filter` strictly to 2 fixed nav surfaces. |
| **Multi-Plane Spring & Pen-Draw Choreography** | R-19, R-39 | Guides eye flow from preloader frame to display name and interactive plates, and disables cleanly under `prefers-reduced-motion`. |
| **Phosphor Light Functional Glyphs** | R-04, R-08 | Marks literal actions (theme switch, copy, expand, external/modal cue, close) with zero decorative emoji or AI sparkle icons. |

---

## 3. Color System & Verified WCAG AA Contrast (R-01, R-25, R-29, R-34)

**Palette Discipline (R-29):** Neutral archival press base + **Core 2: Botanical Pine** + **1 Deliberate Accent: Vermilion Press Stamp** + 1 semantic error tone. Zero decorative gradients, zero background glows.

### Token Table

| Token | Daylight Folio (Light) | Nocturne Press (Dark) | Role |
|---|---|---|---|
| `--color-canvas` | `#FAF6EE` | `#121513` | Primary page background |
| `--color-surface` | `#EFE8DA` | `#1A1F1C` | Outer bezel shell & secondary section shift |
| `--color-plate` | `#FFFDF9` | `#212824` | Inner elevated plate & input fill |
| `--color-ink-primary` | `#181411` | `#F3EDE2` | Primary headings & body copy |
| `--color-ink-secondary` | `#544940` | `#B5ACA0` | Metadata, captions, secondary descriptions |
| `--color-pine` | `#1B4636` | `#8CD1B5` | Structural display ink & technical framing |
| `--color-pine-tint` | `#E3EEE8` | `#1D332A` | Subtle botanical tint surface |
| `--color-stage-bg` | `#16382B` | `#192922` | Flagship editorial press showcase stage |
| `--color-stage-ink` | `#FAF6EE` | `#F3EDE2` | Foreground ink on flagship press stage |
| `--color-accent` | `#9A341E` | `#F48B71` | Single focal accent (CTAs, active stamp, focus ring) |
| `--color-accent-hover` | `#7D2917` | `#F7A18B` | Hover/pressed accent fill |
| `--color-accent-fg` | `#FFFDF9` | `#181411` | High-contrast label on solid accent fill |
| `--color-accent-tint` | `#F8E7E2` | `#36201B` | Soft tint for active status tags |
| `--color-border-subtle` | `#DFD6C5` | `#2B332E` | Decorative hairlines & section rules |
| `--color-border-strong` | `#766B60` | `#87918B` | Interactive control & input boundaries (>= 3:1) |
| `--color-error` | `#9E2323` | `#F48080` | Form validation alert ink + icon |

### Computed Contrast Ratios (`contrast-check.py`, WCAG 2.x)

- **Daylight Folio:**
  - `#181411` on `#FAF6EE`: `16.99:1` (PASS) | on `#EFE8DA`: `15.02:1` (PASS) | on `#FFFDF9`: `18.02:1` (PASS)
  - `#544940` on `#FAF6EE`: `8.10:1` (PASS) | on `#EFE8DA`: `7.17:1` (PASS) | on `#FFFDF9`: `8.60:1` (PASS)
  - `#1B4636` (Pine) on `#FAF6EE`: `9.86:1` (PASS) | on `#EFE8DA`: `8.72:1` (PASS) | on `#E3EEE8`: `8.94:1` (PASS)
  - `#9A341E` (Accent) on `#FAF6EE`: `6.76:1` (PASS) | on `#EFE8DA`: `5.97:1` (PASS) | on `#F8E7E2`: `6.07:1` (PASS)
  - `#FFFDF9` on `#9A341E` (Primary CTA): `7.17:1` (PASS) | `#FAF6EE` on `#16382B` (Flagship Stage): `11.92:1` (PASS)
  - `#766B60` (Interactive Border) on `#FAF6EE`: `4.82:1` | on `#EFE8DA`: `4.26:1` | on `#FFFDF9`: `5.11:1` (All PASS >= 3:1 UI)
- **Nocturne Press:**
  - `#F3EDE2` on `#121513`: `15.78:1` (PASS) | on `#1A1F1C`: `14.34:1` (PASS) | on `#212824`: `12.93:1` (PASS)
  - `#B5ACA0` on `#121513`: `8.21:1` (PASS) | on `#1A1F1C`: `7.46:1` (PASS) | on `#212824`: `6.73:1` (PASS)
  - `#8CD1B5` (Pine) on `#121513`: `10.42:1` (PASS) | on `#1A1F1C`: `9.47:1` (PASS) | on `#1D332A`: `7.63:1` (PASS)
  - `#F48B71` (Accent) on `#121513`: `7.68:1` (PASS) | on `#212824`: `6.30:1` (PASS) | on `#36201B`: `6.36:1` (PASS)
  - `#181411` on `#F48B71` (Primary CTA): `7.65:1` (PASS)
  - `#87918B` (Interactive Border) on `#121513`: `5.65:1` | on `#1A1F1C`: `5.14:1` | on `#212824`: `4.63:1` (All PASS >= 3:1 UI)

---

## 4. Typography, Spacing & Motion Architecture

- **Fluid Scale (`clamp`):** Display H1 `clamp(2.85rem, 9.4vw, 8.1rem)`, Section H2 `clamp(2rem, 4vw, 3.4rem)`, Case H3 `clamp(1.375rem, 2.2vw, 2rem)`, Body `1rem` (`Plus Jakarta Sans`), Technical Meta `0.8125rem` (`IBM Plex Mono`).
- **Three Responsive States (`antislop-layoutmobile`):**
  1. Mobile (`< 640px`): Single-column reflow, `px-4`, compact section rhythm (`py-14` to `py-16`), 44x44px minimum touch targets with `>= 8px` gaps.
  2. Tablet (`640px` to `1023px`): 2-column splits (`sm:grid-cols-2`, `md:grid-cols-12`), `px-8`, `py-20` to `py-24`.
  3. Desktop (`>= 1024px`): Max-width `1280px` (`px-10`), varied editorial macro-whitespace (`py-24` to `py-32`), Z-axis fan deck, and 3D multi-plane plate tilt.
- **Motion Choreography (`MOTION 3`, GPU-safe):**
  - Weighted spring curve `cubic-bezier(0.32, 0.72, 0, 1)` + tactile spring physics (`stiffness: 340, damping: 30`).
  - Book-seam preloader handoff (`1.55s`, skippable via button or `Escape`), character wave lift on H1, multi-plane pointer parallax on Hero plate, expandable capability rows, flagship interactive lens cue, and sliding `layoutId` pills.
  - Zero infinite unpaused loops; all non-essential motion disabled under `prefers-reduced-motion: reduce`.
