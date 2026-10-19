// Shard slot transition. A click on any link to hardware.html or
// software.html leaves a note in sessionStorage; the page it opens reads the
// note before first paint and plays the transition (styles.css, "Shard slot").
(function () {
  var root = document.documentElement;
  var SLOT_LINK = /(^|\/)(hardware|software)\.html$/;

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var m = a.getAttribute("href").match(SLOT_LINK);
    if (!m) return;
    try { sessionStorage.setItem("slot", m[2]); } catch (err) {}
  });

  var label = null;
  try {
    label = sessionStorage.getItem("slot");
    sessionStorage.removeItem("slot");
  } catch (e) {}
  if (!label || location.pathname.indexOf(label + ".html") === -1) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("is-slotting");

  // Macro close-ups in the show's cel style, no hands or faces: the shard's
  // connector in shallow focus, then a hard cut to it seating into a neck
  // port. Thin crisp linework and hard two-tone shading throughout.
  var LINE = 'stroke="#0e0c10" stroke-width="1.1" stroke-linejoin="miter"';

  // Shard in local coordinates: connector at the top (y = 0), 262 long.
  var SHARD =
    '<path d="M-25 32H25V250L18 262H-18L-25 250Z" fill="#8c2230" ' + LINE + '/>' +
    '<path d="M-24.5 33H-17V255L-18 261.5-24.5 250Z" fill="#5c1520"/>' +
    '<path d="M17 33H24.5V249L17.5 261H17Z" fill="#a8323e"/>' +
    '<rect x="-12" y="44" width="24" height="190" fill="#9a2a36" stroke="#4e0f18" stroke-width=".8"/>' +
    '<path d="M-4 52V90L4 98V140L-4 148V200L2 206V226M6 60V84M-8 110V170L-2 176" fill="none" stroke="#d9a04e" stroke-width=".9"/>' +
    '<circle cx="-4" cy="52" r="1.6" fill="#d9a04e"/><circle cx="2" cy="226" r="1.6" fill="#d9a04e"/><circle cx="6" cy="60" r="1.6" fill="#d9a04e"/>' +
    '<path d="M-15.5 46V230" stroke="#d0646d" stroke-width="1"/>' +
    '<path d="M18 40H27V246H18Z" fill="#6f777d" ' + LINE + '/><path d="M19.5 41V245" stroke="#c9d0d4" stroke-width=".8"/>' +
    '<path d="M27 64H32V84H27ZM27 150H31V164H27ZM-25 196H-30V214H-25Z" fill="#9aa1a6" ' + LINE + '/>' +
    '<rect x="-22" y="22" width="40" height="10" fill="#2e2226" ' + LINE + '/>' +
    '<path d="M-18 22V0H10V22Z" fill="#8e969c" ' + LINE + '/>' +
    '<path d="M-17 1.2H9" stroke="#eef3f6" stroke-width="1"/>' +
    '<path d="M-11 0V13M-3 0V13M4 0V13" stroke="#1d2024" stroke-width="2.6"/>' +
    '<path d="M-17 13H9" stroke="#5d656b" stroke-width="1"/>';

  // Shot B geometry: the neck's surface fills the left of frame with a port
  // bezel on its edge. The shard slides in from the right until its collar
  // meets the bezel face at x = 360.
  var WALL_PATH = "M-10-10H340L352 370H-10Z";
  var CONTOUR = "M340-10 352 370";
  var BEZEL_PATH = "M332 150H354L360 156V204L354 210H332Z";
  var SEAT = 'transform="translate(325 180) rotate(-90) scale(1.6)"';

  // Radiating impact lines around the port, Trigger-style.
  function rays(cx, cy) {
    var d = "";
    for (var i = 0; i < 44; i++) {
      var a = i / 44 * Math.PI * 2 + Math.sin(i * 12.9898) * 0.06;
      var r1 = 50 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 70;
      var w = 0.01 + (Math.sin(i * 39.37) * 0.5 + 0.5) * 0.018;
      d += "M" + (cx + Math.cos(a) * r1).toFixed(1) + " " + (cy + Math.sin(a) * r1).toFixed(1) +
        "L" + (cx + Math.cos(a - w) * 800).toFixed(1) + " " + (cy + Math.sin(a - w) * 800).toFixed(1) +
        "L" + (cx + Math.cos(a + w) * 800).toFixed(1) + " " + (cy + Math.sin(a + w) * 800).toFixed(1) + "Z";
    }
    return d;
  }
  function impact(bg, fg) {
    return '<rect width="640" height="360" fill="' + bg + '"/>' +
      '<path d="' + WALL_PATH + '" fill="' + fg + '"/>' +
      '<path class="rays" d="' + rays(360, 180) + '" fill="#fff"/>' +
      '<path ' + SEAT + ' d="M-25 32H25V250L18 262H-18L-25 250Z" fill="#ff2a3a"/>' +
      '<path d="' + BEZEL_PATH + '" fill="' + bg + '"/>';
  }
  var WALL = function (base) {
    return '<rect width="640" height="360" fill="' + base + '"/>' +
      '<rect width="640" height="360" filter="url(#fx-grime)"/>';
  };

  var SCENE =
    '<svg class="slot-fx__scene" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" shape-rendering="geometricPrecision">' +
      '<defs>' +
        '<filter id="fx-grime" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 0 0 0 -0.45"/></filter>' +
        '<filter id="fx-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/></filter>' +
        '<filter id="fx-dof" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>' +
        '<radialGradient id="fx-vig" cx="50%" cy="50%" r="72%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".8"/></radialGradient>' +
        '<filter id="fx-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>' +
        '<filter id="fx-hairblur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter>' +
        '<filter id="fx-pores" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.2 0 0 0 -1.25"/><feComposite in2="SourceGraphic" operator="in"/></filter>' +
        '<linearGradient id="fx-round" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="640" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset=".3" stop-color="#000" stop-opacity=".28"/><stop offset=".46" stop-color="#000" stop-opacity="0"/></linearGradient>' +
        '<radialGradient id="fx-flare" cx="56%" cy="50%" r="50%"><stop offset="0" stop-color="#ff2a3a" stop-opacity=".85"/><stop offset=".45" stop-color="#ff2a3a" stop-opacity=".22"/><stop offset="1" stop-color="#ff2a3a" stop-opacity="0"/></radialGradient>' +
        '<clipPath id="fx-sock"><rect x="334" y="-10" width="400" height="380"/></clipPath>' +
      '</defs>' +
      // Shot A: macro of the connector drifting toward the port, which sits
      // out of focus behind it.
      '<g class="shot shot-a">' + WALL("#1b2423") +
        // The same neck as shot B, shifted left and out of focus.
        '<g filter="url(#fx-dof)"><g transform="translate(-200 0)">' +
          '<path d="' + WALL_PATH + '" fill="#8c7773"/>' +
          '<path d="M238-10H340L352 370H254Z" fill="#b39d95"/>' +
          '<path d="M320-10H340L352 370H334Z" fill="#c8b2a8"/>' +
          '<path d="M-10-10H341L342 30 300 44 180 52-10 46Z" fill="#3e3132"/>' +
          '<path d="' + BEZEL_PATH + '" fill="#2b3036"/>' +
        '</g>' +
          '<circle cx="520" cy="70" r="16" fill="#3f8a87" opacity=".35"/><circle cx="580" cy="300" r="22" fill="#3f8a87" opacity=".25"/><circle cx="450" cy="320" r="10" fill="#c4404e" opacity=".3"/>' +
        '</g>' +
        '<g class="a-shard"><g transform="translate(250 184) rotate(-90) scale(2.6)">' + SHARD +
          '<rect class="glint" x="-24" y="34" width="5" height="210" fill="#fff" opacity="0"/></g></g>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g>' +
      // Shot B: the port on the neck; the shard slides in and seats.
      '<g class="shot shot-b"><g class="b-cam">' + WALL("#162021") +
        '<g filter="url(#fx-dof)"><circle cx="530" cy="80" r="28" fill="#3f8a87" opacity=".22"/><circle cx="610" cy="262" r="40" fill="#3f8a87" opacity=".16"/><circle cx="480" cy="306" r="14" fill="#c4404e" opacity=".2"/></g>' +
        // The neck in flat cel tones with straight, hard-edged bands, faint
        // pores, and a hard jaw shadow across the top.
        '<path d="' + WALL_PATH + '" fill="#8c7773"/>' +
        '<path d="M-10-10H118L132 370H-10Z" fill="#6a5653"/>' +
        '<path d="M238-10H340L352 370H254Z" fill="#b39d95"/>' +
        '<path d="M320-10H340L352 370H334Z" fill="#c8b2a8"/>' +
        '<path d="' + WALL_PATH + '" fill="#000" filter="url(#fx-pores)" opacity=".16"/>' +
        '<path d="M-10-10H341L342 30 300 44 180 52-10 46Z" fill="#3e3132"/>' +
        '<path d="M-10 46 180 52 300 44 342 30" fill="none" stroke="#c8b2a8" stroke-width=".8"/>' +
        '<path d="' + CONTOUR + '" fill="none" stroke="#5fb0ac" stroke-width="1.8"/>' +
        '<path class="b-rim" d="' + CONTOUR + '" fill="none" stroke="#ff4a55" stroke-width="2.4"/>' +
        // Implant panel: a beveled seam around the port.
        '<path d="M341 213H357L351 226H336Z" fill="#000" opacity=".4" filter="url(#fx-hairblur)"/>' +
        '<path d="M344 126H310Q298 126 298 138V222Q298 234 310 234H348" fill="none" stroke="#3a2c32" stroke-width="1.1"/>' +
        '<path d="M344 128.6H310.4Q300.6 128.6 300.6 138.4V221.6Q300.6 231.4 310.4 231.4H347.6" fill="none" stroke="#dcc8bf" stroke-width=".7" opacity=".7"/>' +
        '<circle cx="310" cy="140" r="2.6" fill="#262b30" ' + LINE + '/><circle cx="310" cy="220" r="2.6" fill="#262b30" ' + LINE + '/>' +
        '<path d="M308 140H312M308 220H312" stroke="#8b949b" stroke-width=".7"/>' +
        '<g clip-path="url(#fx-sock)"><g class="b-shard"><g ' + SEAT + '>' + SHARD + '</g></g></g>' +
        '<path d="' + BEZEL_PATH + '" fill="#2b3036" ' + LINE + '/>' +
        '<path d="M334 151.5H353.5L358.5 156.5" fill="none" stroke="#a7b0b6" stroke-width="1"/>' +
        '<path d="M338 158H354V202H338Z" fill="#1c2024" stroke="#0e0c10" stroke-width=".8"/>' +
        '<rect class="b-lip" x="359.4" y="159" width="2.4" height="42" fill="#3a3f45"/>' +
        // Loose hair falling into frame from above.
        '<g fill="#0c1115"><path d="M150-10C176 40 186 96 176 160 172 110 160 50 128-10Z"/><path d="M196-10C214 30 222 74 218 120 210 80 198 40 178-10Z"/><path d="M90-10C110 50 116 110 104 180 100 120 90 60 66-10Z"/></g>' +
        '<rect class="b-red" width="640" height="360" fill="url(#fx-flare)"/>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g></g>' +
      // Impact frames: one poster-white frame, one inverted.
      '<g class="shot impact-1">' + impact("#f2f0eb", "#0a0a0a") + '</g>' +
      '<g class="shot impact-2">' + impact("#0a0a0a", "#f2f0eb") + '</g>' +
      '<rect class="grain" x="-20" y="-20" width="680" height="400" filter="url(#fx-grain)"/>' +
    '</svg>' +
    '<div class="slot-fx__bars"><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="slot-fx__title"><p class="slot-fx__text"><span>' + label + '</span> // shard loaded</p></div>';

  // The full sequence plays once per visit; later arrivals get a quick
  // red slash wipe so repeat readers aren't kept waiting.
  var seen = false;
  try {
    seen = sessionStorage.getItem("slotSeen") === "1";
    sessionStorage.setItem("slotSeen", "1");
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var fx = document.createElement("div");
    fx.className = seen ? "slot-fx slot-fx--quick" : "slot-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = seen ? '<div class="slot-wipe"></div>' : SCENE;
    document.body.appendChild(fx);
    root.classList.remove("is-slotting");

    function done() {
      if (fx.parentNode) fx.parentNode.removeChild(fx);
      document.removeEventListener("keydown", done);
    }
    fx.addEventListener("animationend", function (e) {
      if (e.target === fx) done();
    });
    fx.addEventListener("click", done);
    document.addEventListener("keydown", done);
    setTimeout(done, 2600);
  });
})();

// Theme toggle: remembers the visitor's choice when storage is available.
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }

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

    // The home page's red shards and crosshair drift at different speeds
    // as the page scrolls.
    var burst = document.querySelector(".hero-burst");
    var reticle = document.querySelector(".hero-reticle");
    if (burst && reticle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY;
          burst.style.transform = "translateY(" + (y * -0.12) + "px)";
          reticle.style.transform = "translateY(" + (y * 0.06) + "px)";
          ticking = false;
        });
      }, { passive: true });
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
