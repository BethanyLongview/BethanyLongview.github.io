# Bethany Lutheran Church (Longview, WA)

Website for [Bethany Lutheran Church](https://bethanylongview.org/) — an ELCA
congregation in Longview, Washington. Built with [Jekyll](https://jekyllrb.com/) and
hosted on GitHub Pages.

**Editing the site?** See **[MAINTENANCE.md](MAINTENANCE.md)** — the staff/volunteer guide
to making changes with VS Code + Copilot or directly on GitHub.com.

## Live site

<https://bethanylongview.github.io/>

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | Home page (kept as full HTML for the hero / multi-section template look) |
| `_pages/*.md` | Content pages (About, Worship, Pastor, Facility, Groups, etc.) |
| `contact.md`, `prayer.md` | Pages with custom layouts/forms (Google Maps embed; Formspree prayer form) |
| `_layouts/` | Jekyll layouts. `page.html` includes the liturgical-season banner for the Events page. |
| `_includes/` | Shared header, footer, head, scripts, map embed, PDF viewer |
| `_data/site.yml` | Site-wide settings — address, phone, mission, current liturgical season, etc. |
| `_data/gallery.yml` | Photo gallery list |
| `_newsletters/` | Monthly newsletters (front matter + PDF in `assets/uploads/`) |
| `_announcements/`, `_sermons/`, `_volunteer/` | Collections for weekly announcements, sermons, volunteer opportunities |
| `newsletters/view.html` | Inline PDF.js newsletter reader |
| `assets/` | CSS, JS, fonts, images, and uploaded PDFs |

## Local development

Requires Ruby and Bundler. From the repo root:

```bash
bundle install
bundle exec jekyll serve
```

The site is served at <http://127.0.0.1:4000/>. Jekyll watches for file changes and
rebuilds automatically.

## Deploying

Commit to the `main` branch and push — GitHub Pages rebuilds and deploys within a minute
or two. There is no build step to run and no CMS to configure.

## Outstanding setup

- [ ] Verify the Formspree prayer form by submitting one test request (Formspree requires
      confirmation before forwarding mail)
- [ ] Set `giving_url` in `_data/site.yml` once the VanCo link is ready
- [ ] Point `bethanylongview.org` DNS at GitHub Pages when the team is ready to go live
