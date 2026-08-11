# ደብረሰላም — Pre Sunday School

Website for the **Debre Selam Ethiopian Orthodox Tewahedo Church** children's
(Pre–Sunday School) program in Denver, Colorado. It's a static, bilingual
(Amharic / English) single-page site with an online registration form.

The site is **dependency-free at runtime** — no jQuery, no Bootstrap, no CDNs.
Everything (fonts included) is self-hosted, so it loads fast and never breaks
because an external service is down.

## Project structure

```
.
├── index.html          # Single-page site (nav, hero carousel, sections, footer)
├── css/
│   ├── style.css       # Design system — palette/type tokens in :root, then components
│   ├── fonts.css       # @font-face for the self-hosted Ethiopic fonts
│   └── fonts/          # Noto Serif/Sans Ethiopic woff2 (Ethiopic + Latin subsets)
├── js/
│   └── main.js         # Vanilla JS: carousel, nav, scroll effects, registration form
├── images/             # Hero, testimonial, and brand images (web-optimized)
└── README.md
```

All asset paths are relative, so the site runs from any static host
(GitHub Pages, Netlify, a plain web server) with no build step.

## Running locally

Because everything is static, just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

- **Colors & fonts** — the whole theme is driven by CSS variables at the top of
  `css/style.css` (`:root { --burgundy … --gold … }`). Change them in one place
  to re-theme the entire site.
- **Content** (mission, services, staff, testimonials) is plain HTML in
  `index.html` — edit the text directly.
- **Hero carousel images** are the `images/carousel-*.jpg` files listed inside
  the `.hero-slides` block of `index.html`.

## Registration form (email)

The form opens the visitor's email app with all details pre-filled — no backend,
database, or API key required. To choose which address receives registrations,
edit **one line** near the bottom of `js/main.js`:

```js
var RECIPIENT_EMAIL = "registrations@example.com"; // <- change this
```

When a visitor fills the form and presses **Submit**, their email client opens a
new message addressed to that email; they just press **Send**.

## Notes

- **Fonts:** Noto Serif Ethiopic (headings) and Noto Sans Ethiopic (body) are
  self-hosted from the `@fontsource` packages, split by `unicode-range` so the
  browser only downloads the subset a page actually needs.
- **Accessibility:** semantic landmarks, labelled form fields, a skip link,
  visible focus rings, `aria-live` form status, and reduced-motion support.
- **Performance:** images are compressed and capped at 1600px; scroll reveals
  are a progressive enhancement that only activate when JS is present.
