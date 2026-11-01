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

    // Hero slideshow: crossfade to the next photo every few seconds. Holds
    // still under reduced motion, and pauses while the pointer is over it.
    document.querySelectorAll(".media--cycle").forEach(function (fig) {
      var imgs = fig.querySelectorAll("img");
      if (imgs.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      var i = 0, paused = false;
      fig.addEventListener("mouseenter", function () { paused = true; });
      fig.addEventListener("mouseleave", function () { paused = false; });
      setInterval(function () {
        if (paused || document.hidden) return;
        var next = imgs[(i + 1) % imgs.length];
        if (next.loading === "lazy") next.loading = "eager";
        imgs[i].classList.remove("is-on");
        i = (i + 1) % imgs.length;
        next.classList.add("is-on");
      }, 4500);
    });

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
      if (el.closest(".hero-art")) return;
      el.classList.add("cut");
      io.observe(el);
    });
  });
})();
