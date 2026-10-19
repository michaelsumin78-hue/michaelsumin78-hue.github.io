// Shard slot transition. A click on any link to hardware.html or
// software.html leaves a note in sessionStorage; the page it opens reads the
// note before first paint and plays the animation (styles.css, "Shard slot").
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

  // Drawn as lit silhouettes in the show's style: hard cel shadows, red light
  // from the shard, teal rim light, no outlines. The shard and fist share
  // local coordinates with the shard's pins at (0, 0), pointing up.
  var SHARD_PATH = "M-17 22H17V176L12 182H-12L-17 176Z";
  var SHARD =
    '<path d="' + SHARD_PATH + '" fill="#ff2a3a" filter="url(#fx-glow)" opacity=".85"/>' +
    '<rect x="-13" y="0" width="26" height="14" fill="#8d969d"/><rect x="-13" y="0" width="26" height="3" fill="#dfe6ea"/>' +
    '<path d="M-7 3v9M-1 3v9M5 3v9" stroke="#2a3036" stroke-width="2"/>' +
    '<rect x="-16" y="14" width="32" height="8" fill="#1a0508"/>' +
    '<path d="' + SHARD_PATH + '" fill="url(#fx-shard)"/>' +
    '<path d="M-6 34V70L4 80V112L-4 120V136M6 30V58L-2 66" fill="none" stroke="#ffc35a" stroke-width="1.4"/>' +
    '<path d="M-13 26V134" stroke="#ffd0c8" stroke-width="1.5"/>' +
    '<rect x="-18" y="138" width="36" height="20" fill="#16060a"/><path d="M-18 138H18" stroke="#ff6b6b"/>';
  var FIST =
    '<use href="#fx-fist" fill="#0c1115"/>' +
    '<use href="#fx-fist" fill="url(#fx-redfall)"/>' +
    '<path d="M-50 168H14M-48 196H12M-42 222H8" stroke="#22303a" stroke-width="1.2"/>' +
    '<path d="M-34 139H4M-40 167H2M-38 195H0M-32 221H-2M14 142C38 140 62 152 72 176M-10 140C20 129 50 132 64 150" stroke="#ff4d4d" stroke-width="2" fill="none" stroke-linecap="round"/>';

  // Radiating impact lines around the neck port, Trigger-style.
  function rays(cx, cy) {
    var d = "";
    for (var i = 0; i < 40; i++) {
      var a = i / 40 * Math.PI * 2 + Math.sin(i * 12.9898) * 0.06;
      var r1 = 70 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 90;
      var w = 0.012 + (Math.sin(i * 39.37) * 0.5 + 0.5) * 0.02;
      d += "M" + (cx + Math.cos(a) * r1).toFixed(1) + " " + (cy + Math.sin(a) * r1).toFixed(1) +
        "L" + (cx + Math.cos(a - w) * 800).toFixed(1) + " " + (cy + Math.sin(a - w) * 800).toFixed(1) +
        "L" + (cx + Math.cos(a + w) * 800).toFixed(1) + " " + (cy + Math.sin(a + w) * 800).toFixed(1) + "Z";
    }
    return d;
  }
  var RAYS = '<path class="rays" d="' + rays(360, 176) + '" fill="#fff"/>';
  var SEATED = 'transform="translate(360 133) scale(1.2)"';
  function impact(bg, neck, fist) {
    return '<rect width="640" height="360" fill="' + bg + '"/>' +
      '<use href="#fx-neck" fill="' + neck + '"/><use href="#fx-hair" fill="' + neck + '"/>' +
      '<g clip-path="url(#fx-slit)"><path ' + SEATED + ' d="' + SHARD_PATH + '" fill="#ff2a3a"/></g>' +
      '<g ' + SEATED + '><use href="#fx-fist" fill="' + fist + '"/></g>' + RAYS;
  }

  var SCENE =
    '<svg class="slot-fx__scene" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<filter id="fx-grime" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.5"/></filter>' +
        '<filter id="fx-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/></filter>' +
        '<filter id="fx-glow" x="-200%" y="-50%" width="500%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>' +
        '<radialGradient id="fx-teal" cx="15%" cy="10%" r="80%"><stop offset="0" stop-color="#3f8a87" stop-opacity=".45"/><stop offset="1" stop-color="#3f8a87" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="fx-vig" cx="50%" cy="45%" r="70%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".9"/></radialGradient>' +
        '<radialGradient id="fx-flare" cx="56%" cy="49%" r="60%"><stop offset="0" stop-color="#ff2a3a" stop-opacity=".9"/><stop offset=".5" stop-color="#ff2a3a" stop-opacity=".25"/><stop offset="1" stop-color="#ff2a3a" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="fx-shard" x1="0" x2="1"><stop offset="0" stop-color="#6e0a14"/><stop offset=".35" stop-color="#ff3b47"/><stop offset=".6" stop-color="#d81f2c"/><stop offset="1" stop-color="#5a0610"/></linearGradient>' +
        '<linearGradient id="fx-redfall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff2a3a" stop-opacity=".55"/><stop offset=".35" stop-color="#ff2a3a" stop-opacity="0"/></linearGradient>' +
        '<clipPath id="fx-slit"><rect x="-100" y="176" width="840" height="400"/></clipPath>' +
        '<g id="fx-fist"><path d="M-40 236-34 320H66L72 250Z"/><path d="M-10 140C20 128 60 136 72 170 82 198 80 236 70 262H-30Z"/>' +
          '<rect x="-44" y="220" width="54" height="26" rx="12"/><rect x="-50" y="194" width="64" height="30" rx="14"/>' +
          '<rect x="-52" y="166" width="68" height="32" rx="15"/><rect x="-48" y="138" width="66" height="32" rx="15"/>' +
          '<path d="M74 180C64 152 38 140 12 142-2 143-4 158 6 162 26 168 42 182 48 202Z"/></g>' +
        '<path id="fx-neck" d="M150-10H660V370H120C150 300 170 230 170 170 170 110 150 50 150-10Z"/>' +
        '<path id="fx-hair" d="M470-10H660V210L622 120 606 196 590 100 572 150 560 40 542 92 522 18 502 62Z"/>' +
      '</defs>' +
      // Shot A: insert shot of the fist holding up the glowing shard.
      '<g class="shot shot-a">' +
        '<rect width="640" height="360" fill="#0f1a1b"/><rect width="640" height="360" filter="url(#fx-grime)"/>' +
        '<rect width="640" height="360" fill="url(#fx-teal)"/>' +
        '<g class="a-cam"><g transform="translate(318 52) rotate(-8) scale(.95)">' + SHARD +
          '<rect class="glint" x="-17" y="24" width="34" height="8" fill="#fff" opacity="0"/>' + FIST +
        '</g></g>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g>' +
      // Shot B: the side of the neck lit red from below; the shard rises into the port.
      '<g class="shot shot-b"><g class="b-cam">' +
        '<rect width="640" height="360" fill="#0b1415"/><rect width="640" height="360" filter="url(#fx-grime)"/>' +
        '<rect width="640" height="360" fill="url(#fx-teal)"/>' +
        '<use href="#fx-neck" fill="#2b1a22"/>' +
        '<path d="M150-10C190 60 260 110 360 120 420 124 470 110 500 90V-10Z" fill="#170e14"/>' +
        '<path d="M128 370 170 212 236 196 300 206 352 222 404 252 440 300 456 370Z" fill="#a8384a"/>' +
        '<path d="M206 370 236 262 300 236 364 246 412 292 424 370Z" fill="#d4505c"/>' +
        '<path d="M262 266 334 246 392 272 330 262Z" fill="#ffb0a2"/>' +
        '<path d="M300 370 318 300 352 290 336 370Z" fill="#e8707a"/>' +
        '<path d="M520 140C470 200 420 270 380 370" stroke="#7a2632" stroke-width="2" fill="none"/>' +
        '<path d="M150-10C190 60 260 110 360 120 420 124 470 110 500 90" stroke="#ff6b6b" stroke-width="2" fill="none"/>' +
        '<path d="M150-10C150 50 170 110 170 170 170 230 150 300 120 370" stroke="#4fa3a0" stroke-width="2.5" fill="none"/>' +
        '<path d="M500 20C540 0 590 20 590 70 590 110 560 130 535 128 520 126 515 110 520 98 530 80 512 64 500 70Z" fill="#170e14"/>' +
        '<path d="M590 70C590 110 560 130 535 128" stroke="#ff6b6b" stroke-width="1.5" fill="none"/>' +
        '<use href="#fx-hair" fill="#07090c"/><path d="M600 10 612 150M560 0 566 60" stroke="#2f5f63" stroke-width="1.5"/>' +
        '<rect x="326" y="164" width="68" height="26" rx="6" fill="#23282e"/><path d="M332 165H388" stroke="#8b949b"/>' +
        '<rect x="336" y="172" width="48" height="8" rx="2" fill="#000" stroke="#ff2a3a" stroke-opacity=".6"/>' +
        '<circle class="b-led" cx="360" cy="200" r="3" fill="#3a3f45"/>' +
        '<g clip-path="url(#fx-slit)"><g class="b-hand">' + SHARD + '</g></g>' +
        '<g class="b-hand">' + FIST + '</g>' +
        '<rect class="b-red" width="640" height="360" fill="url(#fx-flare)"/>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g></g>' +
      // Impact frames: one poster-white frame, one inverted.
      '<g class="shot impact-1">' + impact("#f2f0eb", "#0a0a0a", "#f2f0eb") + '</g>' +
      '<g class="shot impact-2">' + impact("#0a0a0a", "#f2f0eb", "#0a0a0a") + '</g>' +
      '<rect class="grain" x="-20" y="-20" width="680" height="400" filter="url(#fx-grain)"/>' +
      '<rect width="640" height="40" fill="#000"/><rect y="320" width="640" height="40" fill="#000"/>' +
    '</svg>' +
    '<div class="slot-fx__bars"><i></i><i></i><i></i><i></i><i></i></div>' +
    '<p class="slot-fx__text"><span>' + label + '</span> // shard loaded</p>';

  document.addEventListener("DOMContentLoaded", function () {
    var fx = document.createElement("div");
    fx.className = "slot-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = SCENE;
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
    setTimeout(done, 2500);
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

    // Fade sections in as they scroll into view.
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  });
})();
