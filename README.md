# michael_sumin.dev

My portfolio: wearable props, walking robots, a voice assistant, and a CNC
machine repair. Live at https://michaelsumin78-hue.github.io.

It's plain HTML, CSS and a little JavaScript, with no build step, so GitHub
Pages serves the files as they are.

```
index.html          home page
hardware.html       hardware and wearables
software.html       software
shop.html           shop work
projects/           one page per project
404.html            not-found page (self-contained)
assets/styles.css   styling
assets/site.js      clickable table rows, photo slideshow, scroll fade-ins
assets/photos/      photos and videos, one folder per project
```

## Run it locally

```
py -m http.server 8000
```

Then open http://localhost:8000.

## Publish a change

Commit and push to `main`. The live site updates about a minute later.
