# Serenity Sculpting by Crystal

Website for a body contouring and sculpting small business.
Built with HTML, CSS, and vanilla JavaScript — no framework, no build step.

**Live URL:** *(add once deployed)*
**Status:** Ready to deploy — pending Crystal's payment links and city

---

## Pages & Sections

| Section | Description |
|---|---|
| Hero | Animated floating shapes, logo, headline, CTA buttons |
| Meet Crystal | About the specialist — intro before services |
| Services | 6 treatments with pricing |
| How It Works | 3-step process |
| Results | Before/after photo grid |
| Booking | GlossGenius booking button + deposit info |
| Testimonials | 3 client reviews |
| FAQ | Expandable Q&A |
| Contact | Phone, hours, Instagram, location |
| Footer | Nav links, tagline |
| Chatbot | Scripted assistant — handles services, pricing, booking, FAQ |

---

## Still Needs Crystal's Info

- [ ] **PayPal link** — replace `https://paypal.me/CRYSTAL_SERENITY/25` in `chatbot.js` (lines 131, 139)
- [ ] **Cash App link** — replace `https://cash.app/$CRYSTALSERENITY` in `chatbot.js` (line 135)
- [ ] **City** — replace the TODO comment in the Contact section of `index.html`

---

## What's Already Real

- Phone: (559) 481-9143
- Instagram: @serenitysculpting_
- Booking: https://serenitysculpting.glossgenius.com/
- All images: in `images/` folder

---

## Project Structure

```
serenity-sculpting/
├── index.html       — full website
├── style.css        — all styles
├── chatbot.js       — scripted chat widget
├── images/
│   ├── logo.png             — business logo (hero + favicon)
│   ├── crystal-portrait.jpeg — Crystal's photo (Meet Your Specialist)
│   ├── results-1.jpeg       — before/after (belly)
│   ├── results-2.jpeg       — before/after (waist)
│   ├── results-3.jpeg       — before/after (vacuum/BBL)
│   ├── results-4.jpeg       — before/after (back)
│   └── results-5.jpeg       — before/after (sculpting)
└── .gitignore
```

---

## How to Deploy (GitHub Pages)

1. Push this folder to GitHub as its own repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Site goes live at `https://itzivant.github.io/serenity-sculpting/`

Or deploy free on **Netlify**: drag and drop this folder at netlify.com/drop

---

## No API Keys / No .env Needed

This is a fully static site. No backend, no secrets, no environment variables.
The chatbot is scripted — it runs entirely in the browser.
