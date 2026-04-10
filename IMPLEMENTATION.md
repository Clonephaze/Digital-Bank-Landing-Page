# Digitalbank Landing Page — Implementation Roadmap

Generated with GitHub Copilot before starting the build as a planning exercise.

---

## 1. Design Analysis

- Read `README.md` and `style-guide.md` to extract all design tokens (colors, font weights, breakpoints).
- View all images in `/design`: `desktop-design.jpg`, `mobile-design.jpg`, `mobile-navigation.jpg`, `active-states.jpg`.
- Inventory `/images` to confirm all assets are available before writing markup.

Key observations from the design:
- The hero mockup image intentionally bleeds off the top of the viewport and off the right edge on desktop, and off the top on mobile. Overflow must be clipped at the `html`/`body` level only, not inside the hero section.
- The background SVG shapes (`bg-intro-desktop.svg`, `bg-intro-mobile.svg`) sit behind the mockup and are different assets per breakpoint.
- The mobile navigation is an absolutely positioned card that slides in from above, with a dark gradient overlay behind it.
- The footer uses a three-column layout on desktop (brand + social, nav links, CTA + copyright) that collapses to a single centered column on mobile.

---

## 2. Framework Decision

Vanilla HTML + CSS + JS. The only meaningful interactivity is the mobile hamburger toggle — no state management across components is needed. No build step required.

---

## 3. Token Setup

Define all design tokens as CSS custom properties on `:root` before writing any component styles:

- Color primitives: `--clr-blue-950`, `--clr-green-500`, `--clr-cyan-400`, neutrals
- Button gradient: `--gradient-btn: linear-gradient(135deg, green, cyan)`
- Typography: `--ff-base`, `--fw-light / regular / bold`
- Layout: `--container-max: 1110px`, `--container-pad`
- Animation: shared easing curve and base transition duration

---

## 4. HTML Structure

Build semantic markup top to bottom before writing any CSS:

1. `<header>` — logo, desktop `<nav>`, CTA button, hamburger `<button>`
2. Mobile `<nav>` — separate element, outside header, toggled via JS
3. Backdrop overlay `<div>` — for mobile nav dimming
4. `<main>`
   - `<section class="hero">` — background wrapper with SVG, mockup `<img>`, content column
   - `<section class="features">` — intro text, 4-column icon grid
   - `<section class="articles">` — 4-column article card grid
5. `<footer>` — brand + social, nav columns, CTA + copyright
6. `.attribution` paragraph

---

## 5. CSS Build Order

1. Reset (`box-sizing`, `margin: 0`, `img` block, `overflow-x: hidden` on `html` + `body`)
2. Utility: `.container`
3. Buttons: `.btn`, `.btn--primary`
4. Header + desktop nav (sticky, underline reveal on hover)
5. Hamburger button states
6. Mobile nav (position fixed, slide + fade transition)
7. Overlay
8. Hero — mobile first:
   - Background SVG via `background-image` on wrapper
   - Mockup `margin-top` negative pull for mobile top-bleed
   - Desktop: wrapper `position: absolute`, mockup `right`-anchored with `top: -10rem` for top-bleed and `right: -8%` for right-bleed, size capped with `min(120%, 780px)`
9. Features grid (1 col → 2 col → 4 col)
10. Article cards — hover lift + image scale
11. Footer grid
12. Attribution
13. Scroll animation classes (`.fade-in`, `.is-visible`, stagger delays)
14. `@media (prefers-reduced-motion: reduce)` overrides

---

## 6. JavaScript

Two concerns, one file:

**Mobile nav toggle**
- Toggle `is-active` class on hamburger, nav, and overlay
- Swap `aria-expanded` and `aria-label` on the button
- Lock `body` scroll while nav is open
- Close on overlay click, nav link click, and window resize past the desktop breakpoint

**Scroll animations**
- Use `IntersectionObserver` (threshold `0.15`) to add `is-visible` to `.fade-in` elements as they enter the viewport
- `unobserve` after triggering so the animation only fires once
- Graceful fallback: if `IntersectionObserver` is not supported, add `is-visible` to all elements immediately

---

## 7. Responsive Checkpoints

| Width | Check |
|---|---|
| 375px | Mobile layout, single column, mockup top-bleed, hamburger nav |
| 640px | Features 2-col, articles 2-col |
| 1024px | Desktop nav visible, hamburger hidden, hero side-by-side |
| 1440px | Target desktop design size |
| 1920px+ | Mockup size capped, still right-anchored with bleed |

---

## 8. Accessibility Pass

- All interactive elements reachable by keyboard
- `aria-expanded` / `aria-hidden` / `aria-label` on nav toggle and mobile nav
- Decorative images use empty `alt=""`; logo images use descriptive alt text
- Social links have `aria-label` since they contain only icon images
- Sufficient color contrast for body text on all backgrounds
- `prefers-reduced-motion` disables animations and transitions

---

## 9. Final Checks

- [ ] Matches desktop design at 1440px
- [ ] Matches mobile design at 375px
- [ ] No layout breaks between 375px and 1920px+
- [ ] All hover/focus/active states working
- [ ] Fonts loaded, correct weights applied
- [ ] No hardcoded color or font values outside `:root`
- [ ] Page title is descriptive
- [ ] Attribution present and styled to match the design
- [ ] `README.md` filled out, original saved as `challenge.md`
