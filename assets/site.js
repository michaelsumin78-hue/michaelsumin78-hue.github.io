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
  if (!label || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("is-slotting");

  // Shard and fist share local coordinates: pins at (0, 0), shard pointing up.
  var SHARD =
    '<rect x="-13" y="0" width="26" height="14" fill="#a9afb4" stroke="#111" stroke-width="1.5"/>' +
    '<path d="M-7 1v8M-1 1v8M5 1v8" stroke="#111" stroke-width="2"/>' +
    '<rect x="-16" y="14" width="32" height="8" fill="#3a0a0e"/>' +
    '<path d="M-17 22H17V176L12 182H-12L-17 176Z" fill="url(#fx-shard)" stroke="#111" stroke-width="2"/>' +
    '<path d="M-6 34V70L4 80V112L-4 120V136M6 30V58L-2 66" fill="none" stroke="#e0a845" stroke-width="1.6"/>' +
    '<path d="M-12 26V134" stroke="#ff8a8f" stroke-width="2" opacity=".55"/>' +
    '<rect x="-18" y="138" width="36" height="20" fill="#2a070a" stroke="#111" stroke-width="2"/>';
  var FIST =
    '<path d="M-40 236-34 320H66L72 250Z" fill="#a9ada3" stroke="#111" stroke-width="2.5"/>' +
    '<path d="M-10 140C20 128 60 136 72 170 82 198 80 236 70 262H-30Z" fill="#b9bcb2" stroke="#111" stroke-width="2.5"/>' +
    '<path d="M44 150C62 168 70 200 66 240" stroke="#8d9187" stroke-width="5" fill="none"/>' +
    '<rect x="-44" y="220" width="54" height="26" rx="12" fill="#cdd0c6" stroke="#111" stroke-width="2.5"/>' +
    '<rect x="-50" y="194" width="64" height="30" rx="14" fill="#d6d9cf" stroke="#111" stroke-width="2.5"/>' +
    '<rect x="-52" y="166" width="68" height="32" rx="15" fill="#d6d9cf" stroke="#111" stroke-width="2.5"/>' +
    '<rect x="-48" y="138" width="66" height="32" rx="15" fill="#dcdfd5" stroke="#111" stroke-width="2.5"/>' +
    '<path d="M-40 154c3-5 8-7 12-6M-44 182c3-5 8-7 12-6M-42 209c3-5 8-7 12-6M-36 233c3-4 7-6 10-5" stroke="#111" stroke-width="1.5" fill="none"/>' +
    '<path d="M74 180C64 152 38 140 12 142-2 143-4 158 6 162 26 168 42 182 48 202Z" fill="#e2e4dc" stroke="#111" stroke-width="2.5"/>' +
    '<path d="M8 147C14 146 19 149 20 155" stroke="#111" stroke-width="1.5" fill="none"/>';
  var WALL =
    '<rect width="640" height="360" fill="#1d2124"/>' +
    '<rect width="640" height="360" filter="url(#fx-grime)"/>' +
    '<rect width="640" height="360" fill="url(#fx-vig)"/>';

  var SCENE =
    '<svg class="slot-fx__scene" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<filter id="fx-grime" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -0.5"/></filter>' +
        '<filter id="fx-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/></filter>' +
        '<radialGradient id="fx-vig" cx="50%" cy="45%" r="70%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".85"/></radialGradient>' +
        '<linearGradient id="fx-shard" x1="0" x2="1"><stop offset="0" stop-color="#5e0f15"/><stop offset=".25" stop-color="#c73039"/><stop offset=".6" stop-color="#9a1d25"/><stop offset="1" stop-color="#4a0a10"/></linearGradient>' +
        '<clipPath id="fx-slit"><rect x="-100" y="176" width="840" height="400"/></clipPath>' +
      '</defs>' +
      // Shot A: insert shot of the fist holding the shard up, slow push-in.
      '<g class="shot shot-a">' + WALL +
        '<g class="a-cam"><g transform="translate(318 40) rotate(-5)">' + SHARD +
          '<rect class="glint" x="-17" y="24" width="34" height="10" fill="#fff" opacity="0"/>' + FIST +
        '</g></g>' +
      '</g>' +
      // Shot B: close-up of the side of the neck; the shard rises into the port.
      '<g class="shot shot-b"><g class="b-cam">' + WALL +
        '<path d="M150-10H660V370H120C150 300 170 230 170 170 170 110 150 50 150-10Z" fill="#c4c7bd" stroke="#111" stroke-width="2.5"/>' +
        '<path d="M150-10C190 60 260 110 360 120 420 124 470 110 500 90V-10Z" fill="#d3d6cc" stroke="#111" stroke-width="2.5"/>' +
        '<path d="M175 70C220 120 290 158 370 162 420 164 470 152 500 132V120C470 138 430 148 380 146 300 140 220 100 170 40Z" fill="#9ca095"/>' +
        '<path d="M520 140C470 200 420 270 380 370" stroke="#8f9389" stroke-width="3" fill="none"/>' +
        '<path d="M500 20C540 0 590 20 590 70 590 110 560 130 535 128 520 126 515 110 520 98 530 80 512 64 500 70Z" fill="#d3d6cc" stroke="#111" stroke-width="2.5"/>' +
        '<path d="M535 40C560 40 572 62 566 86M545 60C552 66 552 80 546 88" stroke="#111" stroke-width="2" fill="none"/>' +
        '<path d="M470-10H660V210L622 120 606 196 590 100 572 150 560 40 542 92 522 18 502 62Z" fill="#15191c"/>' +
        '<rect x="326" y="164" width="68" height="26" rx="6" fill="#6f757a" stroke="#111" stroke-width="2.5"/>' +
        '<rect x="336" y="172" width="48" height="8" rx="2" fill="#050505"/>' +
        '<circle cx="332" cy="177" r="2.5" fill="#2a2d30"/><circle cx="388" cy="177" r="2.5" fill="#2a2d30"/>' +
        '<circle class="b-led" cx="360" cy="200" r="3.5" fill="#333"/>' +
        '<g clip-path="url(#fx-slit)"><g class="b-hand">' + SHARD + '</g></g>' +
        '<g class="b-hand">' + FIST + '</g>' +
        '<rect class="b-red" x="-120" y="70" width="880" height="150" fill="#ff2a2a" transform="rotate(-8 320 180)"/>' +
      '</g></g>' +
      '<rect class="grain" x="-20" y="-20" width="680" height="400" filter="url(#fx-grain)"/>' +
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
