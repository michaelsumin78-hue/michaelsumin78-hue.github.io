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
  // meets the bezel face at x = 330.
  var WALL_PATH = "M-10-10H300C312 60 316 120 316 180 316 240 312 300 300 370H-10Z";
  var BEZEL_PATH = "M298 148H326L332 154V206L326 212H298Z";
  var SEAT = 'transform="translate(295 180) rotate(-90) scale(1.6)"';

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
      '<path class="rays" d="' + rays(330, 180) + '" fill="#fff"/>' +
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
        '<radialGradient id="fx-flare" cx="51%" cy="50%" r="50%"><stop offset="0" stop-color="#ff2a3a" stop-opacity=".85"/><stop offset=".45" stop-color="#ff2a3a" stop-opacity=".22"/><stop offset="1" stop-color="#ff2a3a" stop-opacity="0"/></radialGradient>' +
        '<clipPath id="fx-sock"><rect x="300" y="-10" width="400" height="380"/></clipPath>' +
      '</defs>' +
      // Shot A: macro of the connector drifting toward the port, which sits
      // out of focus behind it.
      '<g class="shot shot-a">' + WALL("#1b2423") +
        '<g filter="url(#fx-dof)">' +
          '<path d="M-10-10H150C164 80 168 140 166 200 164 270 156 320 146 370H-10Z" fill="#6a5b5f"/>' +
          '<path d="M-10-10H90C102 90 104 180 98 370H-10Z" fill="#3e3238"/>' +
          '<rect x="140" y="150" width="30" height="62" rx="4" fill="#20252a"/>' +
          '<circle cx="520" cy="70" r="16" fill="#3f8a87" opacity=".35"/><circle cx="580" cy="300" r="22" fill="#3f8a87" opacity=".25"/><circle cx="450" cy="320" r="10" fill="#c4404e" opacity=".3"/>' +
        '</g>' +
        '<g class="a-shard"><g transform="translate(250 184) rotate(-90) scale(2.6)">' + SHARD +
          '<rect class="glint" x="-24" y="34" width="5" height="210" fill="#fff" opacity="0"/></g></g>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g>' +
      // Shot B: the port on the neck; the shard slides in and seats.
      '<g class="shot shot-b"><g class="b-cam">' + WALL("#162021") +
        '<path d="' + WALL_PATH + '" fill="#a39490"/>' +
        '<path d="M-10-10H222C238 80 242 140 238 200 234 262 228 320 216 370H-10Z" fill="#5b4b50"/>' +
        '<path d="M-10-10H96C104 90 106 180 100 370H-10Z" fill="#3d3036"/>' +
        // Neck cues: the tendon's hard shadow, the jaw's cast shadow, hair.
        '<path d="M118 370C150 262 192 160 252 66L266 72C210 166 172 262 146 370Z" fill="#43353b" opacity=".85"/>' +
        '<path d="M-10-10H306C304 20 299 42 288 58 228 74 118 66-10 46Z" fill="#241b20"/>' +
        '<path d="M-10 46C118 66 228 74 288 58" fill="none" stroke="#b2a6a4" stroke-width=".9"/>' +
        '<path d="M30-10H66L50 96ZM74-10H124L96 126ZM132-10H168L150 78ZM190-10H238L212 110ZM244-10H280L268 64Z" fill="#0f151a"/>' +
        '<path d="M98-10 94 100M206-10 210 90" stroke="#2c3a45" stroke-width="1"/>' +
        '<path d="M300-10C312 60 316 120 316 180 316 240 312 300 300 370" fill="none" stroke="#4fa3a0" stroke-width="2.2"/>' +
        '<path class="b-rim" d="M300-10C312 60 316 120 316 180 316 240 312 300 300 370" fill="none" stroke="#ff4a55" stroke-width="2.6"/>' +
        '<path d="M258 120H308M258 240H308M258 120V240" fill="none" stroke="#3a2c32" stroke-width="1.1"/>' +
        '<path d="M262 124H306M262 124V236" fill="none" stroke="#b2a6a4" stroke-width=".8"/>' +
        '<circle cx="270" cy="134" r="3" fill="#262b30" ' + LINE + '/><circle cx="270" cy="226" r="3" fill="#262b30" ' + LINE + '/>' +
        '<path d="M268 134H272M268 226H272" stroke="#8b949b" stroke-width=".8"/>' +
        '<g clip-path="url(#fx-sock)"><g class="b-shard"><g ' + SEAT + '>' + SHARD + '</g></g></g>' +
        '<path d="' + BEZEL_PATH + '" fill="#2b3036" ' + LINE + '/>' +
        '<path d="M300 149.5H325.5L330.5 154.5" fill="none" stroke="#a7b0b6" stroke-width="1"/>' +
        '<path d="M304 156H324V204H304Z" fill="#1c2024" stroke="#0e0c10" stroke-width=".8"/>' +
        '<rect class="b-lip" x="329.5" y="157" width="2.5" height="46" fill="#3a3f45"/>' +
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
    setTimeout(done, 3500);
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
