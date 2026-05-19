# Bethany Lutheran Church (Longview, WA)

Website for [Bethany Lutheran Church](https://bethanylongview.org/) — an ELCA congregation in Longview, Washington. Built with [Jekyll](https://jekyllrb.com/), content-managed via [Decap CMS](https://decapcms.org/), and hosted on GitHub Pages.

## For reviewers

The site is intended for the Bethany communications team (John, Ginger, Pastor Susan, Beth). It's in active build-out; some content is sourced from the existing bethanylongview.org, and some sections are flagged in-page where they need confirmation. Search the rendered site for `[needs ...]` notes to find them quickly.

## Live preview

Once GitHub Pages finishes building, the site is at <https://bethanylongview.github.io/>.

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | Home page (kept as full HTML for the hero / multi-section template look) |
| `_pages/*.md` | Migrated content pages (About, Worship, Pastor, Facility, etc.) |
| `contact.md`, `prayer.md` | Pages with custom layouts/forms (Google Maps embed; Formspree prayer form) |
| `_layouts/` | Jekyll layouts. `page.html` includes the liturgical-season banner for `/events/`. |
| `_includes/` | Shared header, footer, head, scripts, map embed |
| `_data/site.yml` | Site-wide settings — address, phone, mission, current liturgical season, etc. |
| `_data/gallery.yml` | Photo gallery list (currently empty; placeholder images in `assets/images/`) |
| `_newsletters/`, `_announcements/`, `_sermons/`, `_volunteer/` | Decap-managed collections (empty so far) |
| `admin/` | Decap CMS loader + collection config. Needs Cloudflare OAuth Worker before login works. |

## Local development

Requires Ruby and Bundler. From the repo root:

```bash
bundle install
bundle exec jekyll serve
```

The site is served at <http://127.0.0.1:4000/>. Jekyll watches for file changes and rebuilds automatically.

To run Decap CMS locally without the OAuth Worker, uncomment `local_backend: true` in `admin/config.yml` and run `npx decap-server` in a second terminal.

## Editing content

Day to day this is done through the Decap admin at `/admin/` once OAuth is wired up. In the meantime:

- **Pages**: edit `.md` files in `_pages/` (the migrated pages) or at the repo root (`contact.md`, `prayer.md`)
- **Site-wide info** (address, phone, current liturgical season, etc.): edit `_data/site.yml`
- **Newsletters / announcements / sermons / volunteer opportunities**: add markdown files to the matching `_<collection>/` folder
- **Assets**: drop images into `assets/images/` (or `assets/uploads/` once Decap is uploading)

Commit changes to the `main` branch and push — GitHub Pages auto-deploys within a minute or two.

## Outstanding setup

- [ ] Deploy the Cloudflare Worker OAuth proxy for Decap and replace the placeholder `base_url` in `admin/config.yml`
- [ ] Verify the Formspree prayer form by submitting one test request after first deploy (Formspree requires confirmation before forwarding mail)
- [ ] Set `giving_url` in `_data/site.yml` once the VanCo link is ready
- [ ] Point `bethanylongview.org` DNS at GitHub Pages when the team is ready to go live
