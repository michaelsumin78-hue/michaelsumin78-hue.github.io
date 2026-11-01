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
assets/site.js        HUD readouts, parallax, scroll reveals
assets/og.png         share card shown when the link is pasted into a message
assets/favicon-32.png
media/                put your photos and videos here (create it)
```

## Preview it

```
py -m http.server 8000
```

Then open http://localhost:8000.

## Fill in the placeholders

1. **Contact.** Replace the `https://github.com/` link in the footer of every page.
2. **About.** Search for `<!-- EDIT:` comments. They mark the spots that need
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

## Braindance build log

On each project page, the "Design decisions" become stops on a scrubbable
timeline. To give a stop a photo, put a figure inside that `.decision`:

```html
<div class="decision">
  <figure class="media"><img src="../media/spine-hinge-v1.jpg" alt="First chain with pin hinges"></figure>
  <h3>Dropping pin hinges</h3>
  <p>...</p>
</div>
```

Stops without a figure show a placeholder. One photo per stop is plenty.

## Scanner and afterimages

Each project's main image carries a `<ul class="scan">` of parts. Hovering,
focusing or tapping the image shows them. Once a real photo is in, move each
point onto its part by editing `--x` and `--y` (percent from the top left).
The Sandevistan images have the `sandy` class, which trails colored
afterimages on hover.

Until they have a photo, both Sandevistan frames show a concept diagram of
the spine that site.js draws (`spineSVG`). Removing `media--placeholder`
from a frame (by putting a photo in it) removes the diagram too. The project
page's Engage button runs the four activation states the firmware will use:
idle, charging (LEDs light from the base up), active (time slows, the page
drains of color and afterimages trail the spine) and cooldown. Timings live
in `TIME` in `buildEngage`; the Sound button mutes the synthesized tones.
