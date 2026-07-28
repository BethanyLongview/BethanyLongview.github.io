# Bethany Lutheran Website — Maintenance Guide

How to keep [the Bethany Lutheran website](https://bethanylongview.github.io/) up to date.

**The 30-second version:** the whole website is a folder of plain text files stored on
GitHub. You edit a file, save it, and the live site updates itself about a minute later.
There is no login-protected control panel, no database, and nothing that can be
permanently broken — every change can be undone.

---

## 1. How the website works

The site is a **static website** built with a tool called *Jekyll* and hosted free on
**GitHub Pages**. In practice:

- All the content lives in one GitHub repository: `BethanyLongview/BethanyLongview.github.io`.
- Whenever a change is saved to the `main` branch, GitHub rebuilds and republishes the
  live site automatically — usually within a minute.
- There's no separate server to log into and no database. The pages are plain files.

There are two ways to edit, and you can mix them freely:

1. **VS Code with GitHub Copilot** on your own computer — the recommended way. You can
   describe the change in plain English and Copilot will make the edit for you.
2. **GitHub.com in a web browser** — good for a quick one-line fix or uploading a PDF
   when you're not at your own computer.

---

## 2. Editing with VS Code + Copilot (recommended)

### One-time setup

Copilot is **built into VS Code** — there's no extension to hunt down and install.

1. Install [VS Code](https://code.visualstudio.com/) and [Git](https://git-scm.com/downloads).
2. Turn on Copilot: hover the **Copilot icon in the Status Bar** (along the bottom of the
   window) and choose **Use AI Features**, then sign in with your GitHub account.
   If you don't already pay for Copilot, this signs you up for the **free plan**, which
   includes a monthly allowance of suggestions — no credit card, and plenty for the
   occasional website edit.
3. Make sure that GitHub account has access to the church repository — ask whoever
   manages the repo to add you as a collaborator.
4. Open the repository: **Source Control → Clone Repository →**
   `BethanyLongview/BethanyLongview.github.io`.

### The everyday loop

1. **Pull first.** Source Control panel → **⋯ → Pull.** This picks up anything anyone
   else changed. Always do this before you start.
2. **Make your change** — either by editing a file directly, or by opening Copilot Chat
   and describing what you want (see the examples below).
3. **Review what changed.** The Source Control panel lists every modified file; click one
   to see the before/after side by side. Read it before you commit.
4. **Commit and push.** Type a short message describing the change ("Add July
   newsletter"), click **Commit**, then **Sync Changes**.
5. Wait about a minute, then reload the live page to confirm.

### Asking Copilot for a change

Open Copilot Chat (the chat icon in the sidebar) and describe the change the way you'd
describe it to a person. Useful examples:

- *"Update the FISH distribution dates in `_pages/groups.md` to October 12 and December 4."*
- *"Add a new group to the Groups page called Quilting Circle — meets monthly to make
  quilts for those in need, contact the church office to join."*
- *"Change the Sunday service time to 10:00 a.m. everywhere it appears."*
- *"Add a sermon entry for July 20, 2026, 'Bread for the Journey', preached by Pastor
  Susan, with this YouTube link: …"*
- *"The Summer Surge section on the home page is over — remove it."*

Copilot shows you the edit before it's saved. **Read it, then accept or reject it.**
Nothing reaches the live site until you commit and push in step 4.

> **Tip:** if you're unsure whether a change is right, ask Copilot to explain it first:
> *"What does this section of `index.html` do?"*

---

## 3. Quick reference: where things live

| To change… | Edit this file |
| --- | --- |
| Phone, address, service time, giving link, liturgical season | `_data/site.yml` |
| Monthly newsletter | add a file to `_newsletters/` + upload the PDF to `assets/uploads/` |
| Weekly announcements | add a file to `_announcements/` |
| Sermons | add a file to `_sermons/` |
| Volunteer opportunities | add a file to `_volunteer/` |
| Page text (About, Worship, Pastor, Facility, Groups…) | the matching file in `_pages/` |
| FISH distribution dates | `_pages/groups.md` |
| Home-page seasonal events (e.g. Summer Surge Series) | `index.html` |
| Home hero / section photos | `index.html` |
| Navigation menu | `_includes/header.html` |
| Footer | `_includes/footer.html` |
| Photo gallery list | `_data/gallery.yml` |

---

## 4. Common tasks

### Site-wide details (phone, address, giving link, season)

Open `_data/site.yml`. Each line is `name: value` — change the part after the colon,
keeping the quotes if there are any. These values feed the whole site (footer, contact
page, home page), so you only change them in this one place.

`current_liturgical_season` drives the seasonal color banner on the Events page. Valid
values: `advent`, `christmas`, `epiphany`, `lent`, `easter`, `pentecost`, `ordinary`.

### Adding the monthly newsletter

1. Upload the PDF to `assets/uploads/`, named like `newsletter-2026-07.pdf`.
2. Copy an existing file in `_newsletters/` (e.g. `2026-06.md`), rename it to the new
   month (`2026-07.md`), and update the title, date, and PDF filename inside it.

It appears at the top of the
[Newsletter Archive](https://bethanylongview.github.io/newsletter-archive/) and is
readable right in the browser.

> A PDF dropped into `assets/uploads/` with a `newsletter-YYYY-MM.pdf` name will show up
> in the archive even without a matching entry in `_newsletters/`. The full entry is
> still preferred — it gives the listing a clean title and summary.

### Weekly announcements and sermons

Same pattern: copy the most recent file in `_announcements/` or `_sermons/`, rename it
with the new date, and edit the fields at the top.

### Changing the text on a page

Open the matching file in `_pages/` and edit the text below the `---` block at the top.
That block (the "front matter") holds the title and URL — leave it alone unless you mean
to change those.

The text is **Markdown**: `##` starts a heading, `**stars**` make text bold, and a blank
line separates paragraphs.

### Home-page seasonal events

The colorful event cards live in `index.html`, in the section that starts with
`<section class="ftco-section summer-surge">`. Each card is one block like:

```html
<div class="ss-card">
  <div class="ss-card-top" style="background:#c98bb9;">
    <span class="ss-date">July 8</span>
  </div>
  <div class="ss-card-body">
    <h3>Campfire Stories with S'mores</h3>
    <p>Pastor Susan leads us in storytelling…</p>
  </div>
</div>
```

To update for a new season, change the date, title, and description in each card. This is
a good one to hand to Copilot rather than editing by hand.

> **Be careful with HTML edits.** Every opening tag (`<div>`) needs its matching closing
> tag (`</div>`). If something looks broken after you push, see "If something breaks"
> below.

### Working with images

- Photos live in `assets/images/`. Drag new ones into that folder in VS Code.
- Use lowercase, hyphenated names with no spaces: `fall-festival-2026.jpg`.
- Resize large photos before adding them (long edge ~2000px is plenty) so pages stay fast.
- Reference an image in a page as `/assets/images/fall-festival-2026.jpg`.

---

## 5. Editing on GitHub.com instead

For a quick fix without VS Code:

1. Go to <https://github.com/BethanyLongview/BethanyLongview.github.io> and sign in.
2. Click into the file you want (e.g. `_pages/groups.md`).
3. Click the **pencil icon** (Edit this file).
4. Make the change, scroll down, click **Commit changes**.

The site rebuilds in about a minute. Use **Add file → Upload files** to add a PDF or photo.

---

## 6. If something breaks

Nothing is ever lost — every version of every file is kept.

- **Change didn't appear?** Check the **Actions** tab on GitHub for a failed build, and
  give it a couple of minutes.
- **Page looks wrong?** Open the file on GitHub, click **History**, find the commit that
  broke it, and revert it. Or in VS Code, ask Copilot: *"Undo my last commit."*
- **Not sure?** Ask before pushing. It's much easier to prevent a mistake than to undo
  one — though both are possible here.

---

## 7. Running the site on your own computer (optional)

You don't need this for normal editing, but it lets you preview changes before they go
live. Requires Ruby and Bundler:

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000/>. Jekyll watches for file changes and rebuilds
automatically as you edit.
