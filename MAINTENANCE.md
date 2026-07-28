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

## 2. One-time setup

You only do this once per computer. Budget about twenty minutes.

### a. Install VS Code and Git

- **VS Code** — <https://code.visualstudio.com/>
- **Git** — <https://git-scm.com/downloads>
  Accept all the installer defaults. Git is what actually saves and uploads your changes;
  VS Code just gives it buttons.

Close and reopen VS Code after installing Git so it notices.

### b. Turn on Copilot

Copilot is **built into VS Code** — there's no extension to hunt down and install.

Hover the **Copilot icon in the Status Bar** (along the bottom edge of the window) and
choose **Use AI Features**, then sign in with your GitHub account.

If you don't already pay for Copilot, this signs you up for the **free plan** — a monthly
allowance of suggestions, no credit card, and plenty for occasional website edits.

> **Important: use Agent mode.** At the top of the Copilot Chat panel there's a mode
> selector. Set it to **Agent**. That's the mode that can actually create files and run
> things for you. In **Ask** mode Copilot only *describes* what to do and waits for you to
> do it yourself — which isn't what the rest of this guide assumes.

### c. Get access to the repository

Your GitHub account needs write access to `BethanyLongview/BethanyLongview.github.io`.
Ask whoever manages the repo to add you as a collaborator, and accept the emailed
invitation before going further. Cloning will fail confusingly if you skip this.

### d. Install Ghostscript (for shrinking newsletter PDFs)

Newsletters exported from Canva are often 10 MB or more, which is slow to open on a phone.
Ghostscript shrinks them dramatically with no visible loss. See
[Section 7b](#b-adding-the-monthly-newsletter) for how it's used.

1. Go to **<https://ghostscript.com/releases/gsdnld.html>**
2. Download the **Windows (64 bit)** installer under *GPL Ghostscript*.
3. Run it and accept the defaults.

That's the whole job — you never have to open or run Ghostscript yourself. It installs to
`C:\Program Files\gs\`, and when the time comes you'll simply ask Copilot to use it
(Section 7b). Copilot will find it and run it for you.

### e. Install ImageMagick (for basic image manipulation)

ImageMagick lets Copilot perform simple image tasks like resizing, cropping, and format
conversion without you needing to open a graphics editor.

1. Go to **<https://imagemagick.org/script/download.php>**.
2. Download the **Windows 64-bit** installer (recommended: the Q16 or Q16HDRI version).
3. Run it and accept the defaults.
4. Make sure the installer option to **Add application directory to your PATH** is checked.

Once installed, Copilot can use the `magick` command directly from your workspace to resize
or convert images for the site.

### f. Tell Git who you are

Git stamps your name on every change you make, so it needs to know who you are. Open
Copilot Chat and paste this, substituting your own name and the email address on your
GitHub account:

> Set my global Git identity to name **`Ginger Garner`** and email
> **`secretary@bethanylongview.org`**, then show me the result so I can confirm it.

Copilot will ask permission before running it — click **Continue** / **Allow**. This only
sets who gets credit for changes; it doesn't affect access or passwords. You can ask
*"What Git identity am I using?"* any time to check.

### f. Clone the repository

"Cloning" downloads your own copy of the website to your computer.

1. In VS Code press `Ctrl` + `Shift` + `P` to open the Command Palette.
2. Type **`Git: Clone`** and press Enter.
3. Paste this URL and press Enter:
   ```
   https://github.com/BethanyLongview/BethanyLongview.github.io.git
   ```
4. Choose where to put it. **`C:\Users\<your-name>\Documents`** is a good choice — pick a
   folder you can find again easily. Avoid OneDrive-synced folders, which can fight with
   Git over files.
5. When it asks **"Would you like to open the cloned repository?"**, click **Open**.

You now have a complete copy of the website on your computer. You only clone once — after
this, you just open that folder again (**File → Open Recent**).

The first time you push a change, a browser window may pop up asking you to authorize Git
to access GitHub. Say yes; it only asks once.

---

## 3. Your workspace folder

The folder you just cloned is your **workspace**. Everything the website is made of lives
inside it:

```
BethanyLongview.github.io\         <-- the workspace (this is what you open in VS Code)
├── _pages\                        page text (About, Worship, Groups, ...)
├── _newsletters\                  one small file per monthly newsletter
├── _announcements\                weekly announcements
├── _sermons\                      sermon entries
├── _data\                         site.yml (phone, address, season), gallery.yml
├── _includes\                     header, footer
├── assets\
│   ├── images\                    photos used on pages
│   └── uploads\                   newsletter + announcement PDFs
└── index.html                     the home page
```

**This matters more than it looks.** VS Code and Copilot can only see files *inside the
open workspace folder*. A PDF sitting in your `Downloads` folder is invisible to them — if
you ask Copilot to "add the newsletter I just downloaded," it can't find it.

So the rule is: **get the file into the workspace first, then ask Copilot about it.**
Section 7b walks through exactly that for newsletters.

---

## 4. The everyday loop

Every change follows the same five steps:

1. **Pull first.** Source Control panel (the branch icon in the left sidebar) → **⋯** menu
   → **Pull**. This picks up anything anyone else changed. Other people edit this site
   too — always pull before you start, or you'll get a confusing error when you try to
   upload.
2. **Make your change** — edit a file directly, or open Copilot Chat and describe what you
   want (Section 5).
3. **Review what changed.** The Source Control panel lists every modified file. Click one
   to see the before/after side by side. Read it before continuing.
4. **Commit and push.** Type a short message describing the change ("Add July
   newsletter") in the message box, click **Commit**, then click **Sync Changes**.
5. **Verify.** Wait about a minute, then reload the live page.

> **Commit** saves the change to your local copy. **Sync Changes** uploads it to GitHub,
> which is what actually updates the live website. A change that's committed but not
> synced is still sitting on your computer only.

---

## 5. Asking Copilot for a change

Open Copilot Chat (the chat icon in the sidebar) and describe the change the way you'd
describe it to a person. Copilot shows you the edit before it's saved — **read it, then
accept or reject it.** Nothing reaches the live site until you commit and sync.

**Editing content**

- *"Update the FISH distribution dates in `_pages/groups.md` to October 12 and December 4."*
- *"Add a new group to the Groups page called Quilting Circle — meets monthly to make
  quilts for those in need, contact the church office to join."*
- *"Change the Sunday service time to 10:00 a.m. everywhere it appears."*
- *"Add a sermon entry for July 20, 2026, 'Bread for the Journey', preached by Pastor
  Susan, with this YouTube link: …"*
- *"The Summer Surge section on the home page is over — remove it."*

**Newsletters**

- *"Find `gswin64c.exe` under `C:\Program Files\gs\`, use it to shrink
  `August Newsletter.pdf` in my Downloads folder with `-sDEVICE=pdfwrite
  -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH`, and save it into this workspace as
  `assets/uploads/newsletter-2026-08.pdf`."* (the full version is in Section 7b)
- *"Create the newsletter entry for August 2026. The PDF is already at
  `assets/uploads/newsletter-2026-08.pdf`."*
- *"Check that every file in `_newsletters/` points at a PDF that actually exists in
  `assets/uploads/`."*

**Committing and pushing**

- *"Commit these changes with the message 'Add August 2026 newsletter' and push."*
- *"What have I changed but not committed yet?"*
- *"Pull the latest changes from GitHub."*

**When you're unsure**

- *"What does this section of `index.html` do?"*
- *"Explain what I'm about to commit, in plain English."*
- *"I think I broke something — what changed since my last commit?"*

> You can always do the commit and push with the buttons in the Source Control panel
> instead of asking Copilot. The buttons are the more predictable route; use whichever
> you're comfortable with.

---

## 6. Quick reference: where things live

| To change… | Edit this file |
| --- | --- |
| Phone, address, service time, giving link, liturgical season | `_data/site.yml` |
| Monthly newsletter | add a file to `_newsletters/` + the PDF in `assets/uploads/` |
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

## 7. Common tasks

### a. Site-wide details (phone, address, giving link, season)

Open `_data/site.yml`. Each line is `name: value` — change the part after the colon,
keeping the quotes if there are any. These values feed the whole site (footer, contact
page, home page), so you only change them in this one place.

`current_liturgical_season` drives the seasonal color banner on the Events page. Valid
values: `advent`, `christmas`, `epiphany`, `lent`, `easter`, `pentecost`, `ordinary`.

### b. Adding the monthly newsletter

This is the most common job, so here it is start to finish. The example is **August 2026** —
substitute your month throughout.

#### Step 1 — Pull first

Source Control → **⋯** → **Pull**.

#### Step 2 — Shrink the PDF into the workspace

Canva exports newsletters at print quality — often 10 MB or more. That's slow to open on a
phone and it stays in the repository forever, so shrink it before adding it.

**You don't have to run anything yourself.** Open Copilot Chat and paste the prompt below,
changing only the two **bold** parts — the name of the file you downloaded, and the month.

> Find `gswin64c.exe` under `C:\Program Files\gs\` (the version folder name varies).
> Use it to shrink **`August Newsletter.pdf`** in my Downloads folder, with these exact
> settings:
>
> `-sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH`
>
> Save the result into this workspace as `assets/uploads/newsletter-`**`2026-08`**`.pdf`.
> Then tell me the before and after file sizes.

Copilot will show you the command and ask permission before running it — click **Continue**
/ **Allow**. It reads the big PDF out of your Downloads folder and writes the shrunk copy
**straight into the workspace with the right name**, which solves both the size problem and
the "Copilot can't see outside the workspace" problem in one step.

You should see roughly **2 MB instead of 11 MB**. Open the new file from the VS Code
Explorer and flip through it — text stays crisp and photos should look fine.

> If Copilot offers `/screen` instead of `/ebook` to make it smaller still, say no. It
> saves only a few hundred KB and visibly degrades faces in congregation photos.

**If you'd rather not use the command line:** export from Canva as **PDF Standard**
instead of **PDF Print**. That produces a much smaller file to begin with, and then you
can skip Ghostscript entirely — just drag the PDF into `assets/uploads/` in the VS Code
Explorer and rename it `newsletter-2026-08.pdf`.

#### Step 3 — Create the newsletter entry

Copy an existing file in `_newsletters/` (e.g. `2026-07.md`), rename the copy to
`2026-08.md`, and edit the three lines inside:

```yaml
---
title: August 2026 Newsletter
date: 2026-08-01
pdf: /assets/uploads/newsletter-2026-08.pdf
---
```

Or just ask Copilot: *"Create the newsletter entry for August 2026. The PDF is already at
`assets/uploads/newsletter-2026-08.pdf`."*

Note the `pdf:` line starts with a `/` and the `assets/uploads/` filename must match
exactly, including the month.

#### Step 4 — Commit and push

In the Source Control panel you should see exactly two new files: the PDF and the `.md`
entry. Type a message like `Add August 2026 newsletter`, click **Commit**, then **Sync
Changes**.

#### Step 5 — Verify

After about a minute, check <https://bethanylongview.github.io/newsletter-archive/>. The
new issue should be at the top and readable right in the browser.

### c. Weekly announcements and sermons

Same pattern as newsletters: copy the most recent file in `_announcements/` or
`_sermons/`, rename it with the new date, and edit the fields at the top. Announcement
PDFs go in `assets/uploads/` too.

### d. Changing the text on a page

Open the matching file in `_pages/` and edit the text below the `---` block at the top.
That block (the "front matter") holds the title and URL — leave it alone unless you mean
to change those.

The text is **Markdown**: `##` starts a heading, `**stars**` make text bold, and a blank
line separates paragraphs.

### e. Home-page seasonal events

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
> tag (`</div>`). If something looks broken after you push, see Section 9.

### f. Working with images

- Photos live in `assets/images/`. Drag new ones into that folder in the VS Code Explorer.
- Use lowercase, hyphenated names with no spaces: `fall-festival-2026.jpg`.
- Resize large photos before adding them (long edge ~2000px is plenty) so pages stay fast.
- Reference an image in a page as `/assets/images/fall-festival-2026.jpg`.

---

## 8. Editing on GitHub.com instead

For a quick fix without VS Code:

1. Go to <https://github.com/BethanyLongview/BethanyLongview.github.io> and sign in.
2. Click into the file you want (e.g. `_pages/groups.md`).
3. Click the **pencil icon** (Edit this file).
4. Make the change, scroll down, click **Commit changes**.

The site rebuilds in about a minute. Use **Add file → Upload files** to add a PDF or photo
— though note you can't shrink a PDF this way, so large newsletters are better done in
VS Code.

---

## 9. If something breaks

Nothing is ever lost — every version of every file is kept.

**"Updates were rejected" / "failed to push"**
Someone else pushed a change while you were working. Click **Sync Changes** again — VS Code
will pull their work and combine it with yours. This is normal and usually resolves
itself. If it reports a *conflict* (the same lines changed twice), stop and ask for help
rather than guessing.

**Change didn't appear**
Check the **Actions** tab on GitHub for a failed build, and give it a couple of minutes.
Also confirm you clicked **Sync Changes**, not just **Commit**.

**Page looks wrong**
Open the file on GitHub, click **History**, find the commit that broke it, and revert it.
Or in VS Code, ask Copilot: *"Undo my last commit."*

**Not sure?**
Ask before pushing. It's much easier to prevent a mistake than to undo one — though both
are possible here.

---

## 10. Running the site on your own computer (optional)

You don't need this for normal editing, but it lets you preview changes before they go
live. Requires Ruby and Bundler:

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000/>. Jekyll watches for file changes and rebuilds
automatically as you edit.
