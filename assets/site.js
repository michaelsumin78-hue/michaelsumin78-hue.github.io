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

  var SCENE =
    '<div class="slot-fx__bars"><i></i><i></i><i></i><i></i><i></i></div>' +
    '<svg class="slot-fx__scene" viewBox="0 -64 400 364">' +
      '<defs><clipPath id="slot-clip"><rect x="-400" y="-600" width="1200" height="746"/></clipPath></defs>' +
      '<path class="neck" d="M40 300C70 255 130 240 160 215L162 120C128 104 112 76 112 40C112-10 150-50 200-50S288-10 288 40C288 76 272 104 238 120L240 215C270 240 330 255 360 300Z"/>' +
      '<path class="hatch" d="M168 196l14-14M168 210l18-18M168 224l10-10M232 186l-8 8M232 200l-12 12M100 280l40-26M300 280l-40-26"/>' +
      '<path class="hair" d="M106 52C100-14 146-58 200-58S300-14 294 52L284 100 270 70 256 112 238 78 222 116 206 84 190 114 174 76 158 108 144 68 128 96 112 62Z"/>' +
      '<path class="strands" d="M150-40C140 0 140 40 146 66M176-48C166 0 168 50 174 76M200-52C196 0 198 50 206 84M226-48C234 0 232 50 238 78M250-40C262 0 262 40 256 70"/>' +
      '<path class="spine" d="M200 188v6M200 202v6M200 216v6"/>' +
      '<rect class="port-rim" x="188" y="140" width="24" height="36" rx="2"/>' +
      '<circle class="port-led" cx="218" cy="144" r="2.5"/>' +
      '<g class="reticle"><circle cx="200" cy="158" r="34" stroke-dasharray="140 20 40 14"/><path d="M200 104v28M200 184v28M146 158h28M226 158h28"/></g>' +
      '<g clip-path="url(#slot-clip)"><g class="shard">' +
        '<path class="shard-body" d="M193 172V128L197 116 201 121 204 108 207 124V172Z"/>' +
        '<path class="shard-core" d="M196 160V131L200 124 204 133V160Z"/>' +
        '<path class="shard-pins" d="M195 164h10M195 168h10"/>' +
      '</g></g>' +
    '</svg>' +
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
