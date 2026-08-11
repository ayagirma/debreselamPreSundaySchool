# ደብረሰላም — Pre Sunday School

Website for the **Debre Selam Ethiopian Orthodox Tewahedo Church** children's
(Pre–Sunday School) program in Denver, Colorado. It's a static, bilingual
(Amharic / English) brochure site with an optional online registration form.

## Project structure

```
.
├── index.html          # Single-page site (nav, carousel, sections, footer)
├── css/
│   └── style.css       # Styles, organized around CSS design tokens (:root vars)
├── js/
│   ├── myscript.js     # Carousel, scrollspy, smooth-scroll, UI behavior
│   ├── app.js          # Registration form → Firebase (fails gracefully)
│   └── prefixfree.min.js
├── images/             # Carousel, testimonial, and brand images (web-optimized)
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

- **Colors & fonts** live as variables at the top of `css/style.css`
  (`:root { --brand-brown … }`). Change them in one place to re-theme the site.
- **Content** (mission, services, staff, testimonials) is plain HTML in
  `index.html` — edit the text directly.
- **Carousel images** are the `images/carousel-*.jpg` files listed inside the
  `#vision` block of `index.html`.

## Registration form (email)

`js/app.js` handles the registration form by opening the visitor's email app
with all the details pre-filled — no backend, database, or API key required.

To choose which address receives registrations, edit **one line** at the top of
`js/app.js`:

```js
var RECIPIENT_EMAIL = "registrations@example.com"; // <- change this
```

When a visitor fills the form and presses **Submit**, their email client opens a
new message addressed to that email; they just press **Send**.

## Notes

- Third-party libraries (Bootstrap 3.3.7, jQuery 1.12.4) are **vendored locally**
  under `js/vendor/`, `css/vendor/`, and `css/fonts/`, so the site has no
  external runtime dependency and won't break if a CDN is unreachable.
- Firebase (used only by the optional registration form) still loads from its
  CDN and degrades gracefully if unavailable.
- Images are compressed and capped at 1600px wide for fast loading.
