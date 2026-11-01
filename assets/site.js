// Lets the CSS hide scroll-reveal content only when this script can show it again.
document.documentElement.classList.add("js");

function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

// Concept diagram of the Sandevistan spine, seen from behind and lying on
// its side: the neck T-piece and rod, six vertebrae that shrink 5% each,
// and the base housing. Each hood's window lights the next segment's
// nose. It fills the Sandevistan frames until there is a photo.
function spineSVG() {
  function poly(pts, L, H, fill, extra) {
    return '<path d="M' + pts.map(function (p) {
      return (p[0] * L).toFixed(1) + " " + (p[1] * H).toFixed(1);
    }).join("L") + 'Z" fill="' + fill + '"' + (extra || "") + "/>";
  }
  function mirror(pts) { return pts.map(function (p) { return [p[0], -p[1]]; }); }
  var WING = [[0.18, -0.25], [0.34, -0.5], [0.6, -0.5], [0.68, -0.43], [0.62, -0.25]];
  var BODY = [[0, -0.2], [0.12, -0.26], [0.8, -0.26], [0.9, -0.22], [1, -0.22], [1, 0.22], [0.9, 0.22], [0.8, 0.26], [0.12, 0.26], [0, 0.2]];
  var NOSE = [[-0.2, -0.12], [0, -0.17], [0, 0.17], [-0.2, 0.12]];

  var segs = [], L = 188, H = 296, x = 214, y = 492, a = -6;
  for (var i = 0; i < 6; i++) {
    segs.push({ x: x, y: y, a: a, L: L, H: H });
    var r = a * Math.PI / 180;
    x += Math.cos(r) * L * 1.07;
    y += Math.sin(r) * L * 1.07;
    L *= 0.95; H *= 0.95; a += 2.4;
  }

  function glow(L, H, k) {
    return '<g class="glow" style="--k:' + k + '"><ellipse cx="' + (1.05 * L) + '" cy="0" rx="' + (0.2 * L) + '" ry="' + (0.34 * H) + '" opacity=".14"/>' +
      '<ellipse cx="' + (1.03 * L) + '" cy="0" rx="' + (0.11 * L) + '" ry="' + (0.22 * H) + '" opacity=".3"/></g>';
  }
  function segment(s, k) {
    var L = s.L, H = s.H;
    return '<g transform="translate(' + s.x.toFixed(1) + " " + s.y.toFixed(1) + ") rotate(" + s.a.toFixed(1) + ')">' +
      poly(NOSE, L, H, "#2b2e32") +
      poly(WING, L, H, "#1a1c1f") + poly(mirror(WING), L, H, "#141618") +
      '<path d="M' + (0.34 * L) + " " + (-0.5 * H) + "H" + (0.6 * L) + "L" + (0.68 * L) + " " + (-0.43 * H) + '" fill="none" stroke="#9aa1a8" stroke-width="2.5"/>' +
      poly(BODY, L, H, "#212428") +
      poly([[0.13, -0.26], [0.8, -0.26], [0.76, -0.08], [0.17, -0.08]], L, H, "#30343a") +
      '<path d="M' + (0.12 * L) + " " + (-0.26 * H) + "H" + (0.8 * L) + "L" + (0.9 * L) + " " + (-0.22 * H) + "H" + L + '" fill="none" stroke="#a7aeb5" stroke-width="2.5"/>' +
      '<path d="M' + (0.1 * L) + " 0H" + (0.82 * L) + '" stroke="#0c0d0f" stroke-width="3"/>' +
      '<path d="M' + (0.46 * L) + " " + (-0.26 * H) + "V" + (0.26 * H) + '" stroke="#0c0d0f" stroke-width="2"/>' +
      '<circle cx="' + (0.48 * L) + '" cy="' + (-0.4 * H) + '" r="' + (0.05 * H) + '" fill="none" stroke="#5b6168" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<circle cx="' + (0.48 * L) + '" cy="' + (0.4 * H) + '" r="' + (0.05 * H) + '" fill="none" stroke="#5b6168" stroke-width="2" stroke-dasharray="5 4"/>' +
      poly([[0.9, -0.22], [1, -0.22], [1, 0.22], [0.9, 0.22]], L, H, "#101113") +
      '<rect class="win" style="--k:' + k + '" x="' + (0.925 * L) + '" y="' + (-0.15 * H) + '" width="' + (0.05 * L) + '" height="' + (0.3 * H) + '"/>' +
      (k === 0 ? '<circle cx="' + (0.3 * L) + '" cy="' + (0.13 * H) + '" r="' + (0.035 * H) + '" fill="#101113" stroke="#ff2a2a" stroke-width="2"/>' : "") +
      glow(L, H, k) + "</g>";
  }

  // Base housing: speaker slots, a status light and the charge port.
  var b = { x: x, y: y, a: a, L: L * 1.6, H: H * 1.1 };
  var house = '<g transform="translate(' + b.x.toFixed(1) + " " + b.y.toFixed(1) + ") rotate(" + b.a.toFixed(1) + ')">' +
    poly([[-0.12, -0.11], [0, -0.15], [0, 0.15], [-0.12, 0.11]], b.L, b.H, "#2b2e32") +
    poly([[0, -0.36], [0.08, -0.46], [0.86, -0.46], [1, -0.32], [1, 0.32], [0.86, 0.46], [0.08, 0.46], [0, 0.36]], b.L, b.H, "#1d2023") +
    poly([[0.08, -0.46], [0.86, -0.46], [0.8, -0.2], [0.13, -0.2]], b.L, b.H, "#2c3035") +
    '<path d="M' + (0.08 * b.L) + " " + (-0.46 * b.H) + "H" + (0.86 * b.L) + "L" + b.L + " " + (-0.32 * b.H) + '" fill="none" stroke="#a7aeb5" stroke-width="2.5"/>' +
    [0, 1, 2, 3, 4].map(function (j) {
      return '<rect x="' + ((0.5 + j * 0.07) * b.L).toFixed(1) + '" y="' + (-0.12 * b.H) + '" width="' + (0.03 * b.L) + '" height="' + (0.3 * b.H) + '" fill="#0a0b0c"/>';
    }).join("") +
    '<path d="M' + (0.4 * b.L) + " " + (-0.46 * b.H) + "V" + (0.46 * b.H) + '" stroke="#0c0d0f" stroke-width="2"/>' +
    '<rect x="' + (0.16 * b.L) + '" y="' + (-0.1 * b.H) + '" width="' + (0.16 * b.L) + '" height="' + (0.24 * b.H) + '" fill="#141619" stroke="#3a3f45" stroke-width="2"/>' +
    '<rect class="stat" x="' + (0.2 * b.L) + '" y="' + (0.24 * b.H) + '" width="10" height="10" fill="#3dff5a"/>' +
    '<rect x="' + (0.975 * b.L) + '" y="' + (-0.07 * b.H) + '" width="7" height="' + (0.14 * b.H) + '" fill="#0a0b0c"/>' +
    "</g>";

  // Neck end: T-piece and the rod that enters the top vertebra.
  var s0 = segs[0], r0 = s0.a * Math.PI / 180;
  var tx = s0.x - Math.cos(r0) * 150, ty = s0.y - Math.sin(r0) * 150;
  var neck = '<g transform="translate(' + tx.toFixed(1) + " " + ty.toFixed(1) + ") rotate(" + s0.a + ')">' +
    '<path d="M0 0H' + 120 + '" stroke="#8a9097" stroke-width="12"/>' +
    '<rect x="96" y="-14" width="18" height="28" fill="#2b2e32" stroke="#a7aeb5" stroke-width="2"/>' +
    '<path d="M-22 -128H6L22 -112V112L6 128H-22Z" fill="#212428"/>' +
    '<path d="M-22 -128H6L22 -112" fill="none" stroke="#a7aeb5" stroke-width="2.5"/>' +
    '<path d="M-22 -128H6V128H-22Z" fill="#2c3035"/></g>';

  var axis = segs.map(function (s) { return s.x.toFixed(0) + " " + s.y.toFixed(0); }).join("L");
  var out = '<path d="M' + axis + "L" + b.x.toFixed(0) + " " + b.y.toFixed(0) + '" fill="none" stroke="rgba(242,240,235,.14)" stroke-width="1.5" stroke-dasharray="12 8"/>' + house;
  for (var j = segs.length - 1; j >= 0; j--) out += segment(segs[j], j);
  return '<svg class="spine" viewBox="0 0 1600 900" aria-hidden="true" focusable="false">' + neck + out + "</svg>";
}

// Builds the braindance viewer from a project's .decision blocks and puts
// it where the first one was. Scrubbing glitches the frame, the play
// button steps through every stop, and Thermal recolors the frames.
function buildBraindance(decisions) {
  var STEP = 100;
  var stops = Array.prototype.map.call(decisions, function (d) {
    var title = d.querySelector("h3");
    return { title: title ? title.textContent : "", body: d, fig: d.querySelector("figure") };
  });
  var n = stops.length, max = (n - 1) * STEP;
  var project = (document.querySelector(".project-hero h1") || {}).textContent || "";

  var bd = el("div", "bd");
  var view = el("div", "bd-view");
  var frames = stops.map(function (s, i) {
    var f = s.fig;
    if (f) {
      f.parentNode.removeChild(f);
    } else {
      f = el("figure", "media media--placeholder");
      var frame = el("div", "media__frame");
      frame.appendChild(el("span", "media__tag", "Photo needed"));
      frame.appendChild(el("span", "media__desc", "This stage: " + s.title));
      f.appendChild(frame);
    }
    f.classList.add("bd-frame");
    view.appendChild(f);
    return f;
  });
  var ui = el("div", "bd-ui");
  ui.setAttribute("aria-hidden", "true");
  ui.appendChild(el("span", "bd-tag", "Braindance // " + project));
  var rec = ui.appendChild(el("span", "bd-rec", ""));
  var layer = ui.appendChild(el("span", "bd-layer", "Layer: Visual"));
  view.appendChild(ui);

  var controls = el("div", "bd-controls");
  var play = controls.appendChild(el("button", "bd-btn bd-play", "Play"));
  play.type = "button";
  var track = controls.appendChild(el("div", "bd-track"));
  stops.forEach(function (s, i) {
    var mark = track.appendChild(el("button", "bd-mark", String(i + 1).padStart(2, "0")));
    mark.type = "button";
    mark.style.left = (i / (n - 1) * 100) + "%";
    mark.setAttribute("aria-label", "Stop " + (i + 1) + ": " + s.title);
    mark.addEventListener("click", function () { stopPlay(); glideTo(i * STEP); });
  });
  var range = track.appendChild(el("input", "bd-range"));
  range.type = "range";
  range.min = 0; range.max = max; range.step = 1; range.value = 0;
  range.setAttribute("aria-label", "Scrub the build log");
  var thermal = controls.appendChild(el("button", "bd-btn bd-thermal", "Thermal"));
  thermal.type = "button";
  thermal.setAttribute("aria-pressed", "false");

  var caption = el("div", "bd-caption");
  caption.setAttribute("aria-live", "polite");
  var num = caption.appendChild(el("span", "bd-num", ""));
  var body = caption.appendChild(el("div", "bd-body"));

  bd.appendChild(view);
  bd.appendChild(controls);
  bd.appendChild(caption);
  decisions[0].parentNode.insertBefore(bd, decisions[0]);
  stops.forEach(function (s) { s.body.parentNode.removeChild(s.body); });

  var current = -1, scrubTimer = null, playTimer = null, glide = null;
  function timecode(v) {
    var total = v / STEP * 4.2, s = Math.floor(total), f = Math.floor((total - s) * 24);
    var pad = function (x) { return String(x).padStart(2, "0"); };
    return "Rec " + pad(Math.floor(s / 60)) + ":" + pad(s % 60) + ":" + pad(f);
  }
  function render(v, scrubbing) {
    range.value = v;
    track.style.setProperty("--p", (v / max * 100) + "%");
    rec.textContent = timecode(v);
    var i = Math.round(v / STEP);
    if (i !== current) {
      current = i;
      frames.forEach(function (f, k) { f.classList.toggle("is-on", k === i); });
      track.querySelectorAll(".bd-mark").forEach(function (m, k) { m.classList.toggle("is-on", k === i); });
      num.textContent = String(i + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
      body.textContent = "";
      Array.prototype.forEach.call(stops[i].body.children, function (c) { body.appendChild(c.cloneNode(true)); });
    }
    if (scrubbing) {
      view.classList.add("is-scrubbing");
      clearTimeout(scrubTimer);
      scrubTimer = setTimeout(function () { view.classList.remove("is-scrubbing"); }, 140);
    }
  }
  function glideTo(to, done) {
    cancelAnimationFrame(glide);
    var from = +range.value, t0 = performance.now(), dur = 520;
    (function frame(now) {
      var k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      render(from + (to - from) * e, true);
      if (k < 1) glide = requestAnimationFrame(frame);
      else if (done) done();
    })(t0);
  }
  function stopPlay() {
    clearTimeout(playTimer);
    playTimer = null;
    play.textContent = "Play";
    bd.classList.remove("is-playing");
  }
  function next() {
    var i = Math.round(+range.value / STEP);
    if (i >= n - 1) { stopPlay(); return; }
    glideTo((i + 1) * STEP, function () { if (playTimer) playTimer = setTimeout(next, 2600); });
  }
  play.addEventListener("click", function () {
    if (playTimer) { stopPlay(); return; }
    play.textContent = "Pause";
    bd.classList.add("is-playing");
    if (Math.round(+range.value / STEP) >= n - 1) render(0, true);
    playTimer = setTimeout(next, 900);
  });
  range.addEventListener("input", function () { stopPlay(); render(+range.value, true); });
  range.addEventListener("change", function () { glideTo(Math.round(+range.value / STEP) * STEP); });
  thermal.addEventListener("click", function () {
    var on = view.classList.toggle("is-thermal");
    thermal.setAttribute("aria-pressed", String(on));
    layer.textContent = on ? "Layer: Thermal" : "Layer: Visual";
  });

  // The thermal palette: luminance mapped from black through purple and red
  // to yellow and white.
  if (!document.getElementById("bd-thermal")) {
    var svgNS = "http://www.w3.org/2000/svg";
    var defs = document.createElementNS(svgNS, "svg");
    defs.setAttribute("width", "0"); defs.setAttribute("height", "0");
    defs.setAttribute("aria-hidden", "true");
    defs.style.position = "absolute";
    defs.innerHTML = '<filter id="bd-thermal" color-interpolation-filters="sRGB">' +
      '<feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/>' +
      '<feComponentTransfer><feFuncR type="table" tableValues="0 .35 .9 1 1"/>' +
      '<feFuncG type="table" tableValues="0 0 .12 .7 1"/>' +
      '<feFuncB type="table" tableValues=".08 .45 .12 0 .85"/></feComponentTransfer></filter>';
    document.body.appendChild(defs);
  }
  render(0, false);
}

// Page behaviors once the DOM is ready.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Whole table rows link to their project page.
    document.querySelectorAll("tr[data-href]").forEach(function (row) {
      row.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        window.location.href = row.getAttribute("data-href");
      });
    });

    // HUD readouts on a project's main image: its name, and its first tags.
    var target = document.querySelector(".media--target");
    var title = document.querySelector(".project-hero h1");
    if (target && title) {
      var tags = Array.prototype.slice.call(document.querySelectorAll(".project-hero .tags li"), 0, 3)
        .map(function (li) { return li.textContent; }).join(" / ");
      var hud = document.createElement("figcaption");
      hud.className = "hud";
      hud.setAttribute("aria-hidden", "true");
      [["tl", "Target // " + title.textContent], ["tr", "Lock"], ["br", tags]].forEach(function (p) {
        var s = document.createElement("span");
        s.className = p[0];
        s.textContent = p[1];
        hud.appendChild(s);
      });
      target.appendChild(hud);
    }

    // Scanner: hovering, focusing or tapping a project's main image sweeps
    // it and pops up labels on the parts listed in its .scan list.
    if (target && target.querySelector(".scan")) {
      target.tabIndex = 0;
      target.classList.add("has-scan");
      target.addEventListener("click", function () { target.classList.toggle("is-scanning"); });
      var tr = target.querySelector(".hud .tr");
      if (tr) tr.textContent = "Scan ready";
    }

    // Until the Sandevistan frames have a photo, they show the concept
    // diagram instead of an empty placeholder.
    document.querySelectorAll(".spine-slot.media--placeholder").forEach(function (m) {
      m.insertAdjacentHTML("afterbegin", spineSVG());
      m.classList.add("has-diagram");
      var tag = m.querySelector(".media__tag"), desc = m.querySelector(".media__desc");
      if (tag) tag.textContent = "Concept diagram";
      if (desc) desc.textContent = "Build photo coming";
    });

    // Braindance build log: the "Design decisions" become stops on a
    // scrubbable timeline. Each stop shows the <figure> inside its
    // .decision, or a placeholder. Without this script the list stays as is.
    var decisions = document.querySelectorAll("#design-decisions .decision");
    if (decisions.length >= 2) buildBraindance(decisions);

    // The hero crosshair drifts a little as the page scrolls.
    var reticle = document.querySelector(".hero-reticle");
    if (reticle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          reticle.style.transform = "translateY(" + (window.scrollY * 0.06) + "px)";
          ticking = false;
        });
      }, { passive: true });
    }

    // The table of contents marks the section you are reading.
    var tocLinks = document.querySelectorAll(".toc a[href^='#']");
    if (tocLinks.length && "IntersectionObserver" in window) {
      var byId = {};
      tocLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
          var link = byId[entry.target.id];
          if (link) link.setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      Object.keys(byId).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) spy.observe(sec);
      });
    }

    // Fade sections in, and cut images open, as they scroll into view.
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.classList.contains("cut") ? "is-cut" : "is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
    document.querySelectorAll(".media").forEach(function (el) {
      if (el.closest(".hero-art") || el.closest(".bd")) return;
      el.classList.add("cut");
      io.observe(el);
    });
  });
})();
