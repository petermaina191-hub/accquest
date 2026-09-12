# Accquest Training Institute — Website

A static, dependency-free website (plain HTML/CSS/JS — no build step) for
Accquest Training Institute, Thika. Open any `.html` file in a browser, or
open the folder in VS Code with the "Live Server" extension.

## Structure

```
accquest-site/
├── index.html              Home
├── about.html               Mission, vision, accreditation, facilities
├── courses.html              Course catalogue with department tabs
├── admissions.html           Process, fee table, online application form
├── contact.html              Address, map, contact form
├── portal.html                Student/staff login (demo — no real auth yet)
├── student-dashboard.html     Illustrative learner dashboard (demo data)
├── 404.html                   Custom not-found page
├── css/style.css              Full design system (colors, type, components)
├── js/main.js                 Nav, tabs, form validation, demo portal logic
└── images/logo.svg            Custom badge/crest artwork
```

## What's real vs. placeholder

Everything about **courses, admission status, address, phone and email**
comes directly from the current flyer/prospectus:

- Christian Chaplaincy — Level 5 Certificate & Level 6 Diploma
- Information Communication Technology — Level 5 Certificate
- Baking Technology — Level 3 Artisan (CDACC)
- ACC&S Cathedral grounds, General Kago Street, Thika (opposite Medisel Kenya)
- +254 739 457492 · accsastaps@gmail.com
- Admissions open for 2026, hostels available, job placement assistance

An independent web search turned up **no separate public source** for this
specific institute (only similarly named institutions in Thika), so anything
beyond the flyer content is either general, verifiable Kenyan TVET/CDACC
context, or an explicit placeholder. Search and replace before launch:

- `[confirm term length]`, `[add fee]`, `Ksh [ ]` — course durations and fees
- The fee table in `admissions.html` — entirely placeholder figures
- TVETA/CDACC registration numbers in `about.html`
- Office hours in `contact.html`
- Testimonials, staff bios, and real photography (see below)
- Social media links in the footer (currently `#`)

## Images

No real photos are embedded. The uploaded flyer includes photos of
identifiable students and staff, which aren't appropriate to publish without
their consent, so the site instead uses an original SVG crest
(`images/logo.svg`) and icon system. Replace the hero graphic and add real,
consented photography of the campus, kitchen, computer lab and chapel once
available — a `/images` folder is already set up for this.

## Portals (frontend only — backend needed)

`portal.html` and `student-dashboard.html` are a working **visual** front end
for a student/staff portal:

- The login form validates that fields are filled in, then redirects to the
  dashboard — it does **not** check a real password.
- The dashboard shows realistic but entirely sample data (fees, timetable,
  progress).

To make this real, you'll need a backend (e.g. a small Node/PHP/Django app or
a service like Firebase/Supabase) to:
1. Authenticate students/staff against a real database.
2. Serve each learner's actual course, fee and timetable records.
3. Store and process online applications submitted via `admissions.html`
   (currently shown with `// TODO (backend)` comments in `js/main.js`).

## Forms

Both the admissions application form and the contact form work in "demo
mode": they validate required fields and show an on-screen confirmation, but
don't send data anywhere yet. The two easiest ways to make them live without
writing a backend:
- A form service such as Formspree, Getform, or Google Forms embedded via API.
- A simple serverless function (e.g. on Netlify/Vercel) that emails
  `accsastaps@gmail.com` on submission.

Look for `// TODO (backend)` in `js/main.js` for exactly where to plug this in.

## Deploying

This is a static site — it can be hosted for free on GitHub Pages, Netlify,
Vercel, or any standard cPanel hosting account. Just upload the whole folder.
