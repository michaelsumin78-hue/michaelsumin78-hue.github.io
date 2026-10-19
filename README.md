# Portfolio

Static site for college applications. Plain HTML and CSS with no build step,
so GitHub Pages serves it as is.

```
index.html            home page: intro, project index, project cards, about
projects/*.html       one page per project
hardware.html         Hardware & Wearables page
software.html         Software Tools page
404.html              themed not-found page (self-contained)
assets/styles.css     all styling
assets/site.js        shard transition, HUD readouts, parallax, scroll reveals
assets/og.png         share card shown when the link is pasted into a message
assets/favicon.svg
media/                put your photos and videos here (create it)
```

## Preview it

```
py -m http.server 8000
```

Then open http://localhost:8000.

## Fill in the placeholders

1. **Your name.** Find and replace `Your Name` and the initials `YN` across
   every `.html` file (VS Code: Ctrl+Shift+H).
2. **Contact.** Replace `you@example.com` and the `https://github.com/` link
   in the footer of every page.
3. **About.** Search for `<!-- EDIT:` comments. They mark the spots that need
   facts only you know: school and grade in `index.html`, and details for
   Mantis Blades and the drone.

## Add photos and videos

Every grid box that says "Photo needed" is a placeholder. Its text describes
the shot to take. To replace one, swap the whole `<figure ...>...</figure>`
for:

```html
<figure class="media"><img src="../media/spine-lit.jpg" alt="Sandevistan spine worn on my back, lit green in a dark room"></figure>
```

On `index.html` the path is `media/...` instead of `../media/...`.

For a video clip, use:

```html
<figure class="media"><video src="../media/biped-step.mp4" autoplay muted loop playsinline></video></figure>
```

Keep photos under about 500 KB each (export JPGs at 1600 px wide) and clips
under 10 MB so pages load fast.

## Publish on GitHub Pages

1. Create a repo on GitHub named `<your-username>.github.io`.
2. Push this folder to it:
   ```
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo: Settings > Pages > Source: "Deploy from a branch", branch
   `main`, folder `/ (root)`.

The site goes live at `https://<your-username>.github.io` within a minute or
two. For a custom domain, buy one and add it under Settings > Pages > Custom
domain.

## Photo treatment

Add `media--ink` to a figure's class to render its photo in high-contrast
black and white, the poster look. Use it on build shots, not on the About
photo of you. Each project's main image gets HUD readouts automatically
from the page title and its first three tags.
