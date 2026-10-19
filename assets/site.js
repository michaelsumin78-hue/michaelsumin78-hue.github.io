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

  // Two shots framed like the Edgerunners 2 teaser, drawn in its cel style:
  // thin linework, two-tone shading, muted skin under cool light, red light.
  // The character is an original design. Shapes reused by the impact frames
  // live in <defs> with no fill so each <use> can recolor them.
  var LINE = 'stroke="#161318" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"';

  // Shard in local coordinates: connector at the top (y = 0), 262 long.
  var SHARD =
    '<path d="M-25 32H25V250L18 262H-18L-25 250Z" fill="#8c2230" ' + LINE + '/>' +
    '<path d="M-24 33H-17V255L-18 261-24 250Z" fill="#5c1520"/>' +
    '<rect x="-12" y="44" width="24" height="190" fill="#a0303c" stroke="#5c1520"/>' +
    '<path d="M-4 52V90L4 98V140L-4 148V200L2 206V226M6 60V84M-8 110V170L-2 176" fill="none" stroke="#d29245" stroke-width="1.1"/>' +
    '<path d="M-15 46V230" stroke="#c45a63" stroke-width="1.2"/>' +
    '<path d="M18 40H27V246H18Z" fill="#7b8287" ' + LINE + '/>' +
    '<path d="M27 64H32V84H27ZM27 150H31V164H27ZM-25 196H-30V214H-25Z" fill="#9aa1a6" ' + LINE + '/>' +
    '<rect x="-22" y="22" width="40" height="10" fill="#3b2a2e" ' + LINE + '/>' +
    '<path d="M-18 22V0H10V22Z" fill="#9aa1a6" ' + LINE + '/>' +
    '<path d="M-11 0V14M-3 0V14M4 0V14" stroke="#2a2d30" stroke-width="3"/>';

  // Shot A hand: thumb pad pressing the front, index knuckle over the back.
  var SKIN = "#c2c6bc", SKIN_SH = "#8e948b", SKIN_LT = "#dadcd3";
  var HAND_BACK =
    '<path d="M318 236C330 220 352 214 372 220 392 226 404 244 412 262 430 290 452 320 470 362H300Z" fill="' + SKIN + '" ' + LINE + '/>' +
    '<path d="M392 250C410 280 432 318 448 362H470C452 320 430 290 412 262 406 252 400 246 392 250Z" fill="' + SKIN_SH + '"/>' +
    '<path d="M352 232C360 240 364 250 362 262M372 222C378 228 380 236 378 244" fill="none" ' + LINE + '/>';
  var HAND_FRONT =
    '<path d="M262 362C258 330 266 300 286 290 298 285 306 292 304 304L300 362Z" fill="' + SKIN + '" ' + LINE + '/>' +
    '<path d="M266 318C276 314 288 316 296 322M262 342C274 338 286 340 296 346" fill="none" ' + LINE + '/>' +
    '<path d="M290 362C288 320 290 280 298 256 302 244 314 238 326 240 338 243 342 256 338 270 332 300 330 330 334 362Z" fill="' + SKIN + '" ' + LINE + '/>' +
    '<path d="M330 268C326 300 326 330 330 362H334C330 330 332 300 338 270 340 262 338 254 334 250 334 258 333 262 330 268Z" fill="' + SKIN_SH + '"/>' +
    '<path d="M304 250C310 244 322 244 328 250 324 256 312 258 304 250Z" fill="' + SKIN_LT + '" ' + LINE + '/>';

  // Shot B character, front-on, head bowed. The fringe is a row of
  // overlapping tapered clumps of uneven length, built in a loop.
  function fringe() {
    var c = [[236, 46, 34, 226, 206], [262, 40, 40, 250, 252], [292, 44, 38, 302, 234], [318, 30, 30, 312, 172],
             [342, 40, 40, 354, 248], [370, 44, 36, 382, 214], [398, 46, 40, 416, 240], [422, 44, 30, 440, 196],
             [280, 50, 14, 270, 268], [360, 50, 12, 368, 262]];
    return c.map(function (v) {
      var x = v[0], y = v[1], w = v[2] / 2, tx = v[3], ty = v[4], my = (y + ty) / 2;
      return "M" + (x - w) + " " + y + "C" + (x - w) + " " + my + " " + (tx - 4) + " " + (ty - 30) + " " + tx + " " + ty +
        "C" + (tx + 6) + " " + (ty - 44) + " " + (x + w) + " " + (my + 10) + " " + (x + w) + " " + y + "Z";
    }).join("");
  }
  var PORT = { x: 293, y: 300 };
  var B_SHARD = 'transform="translate(' + PORT.x + ' ' + PORT.y + ') rotate(37) scale(.42)"';
  var DEFS_B =
    '<path id="fx-hair" d="M188 320 168 270 186 262 160 210 184 204 166 150 196 150 188 96 222 104 226 52 262 70 290 20 312 54 346 14 362 56 404 28 404 74 446 62 432 108 470 112 446 152 476 176 448 196 470 240 444 244 458 300 420 262 400 300 392 230H250L242 300 222 262 206 320Z"/>' +
    '<path id="fx-jacket" d="M30 362C60 326 150 306 236 312L250 362ZM614 362C584 326 494 306 408 312L394 362Z"/>' +
    '<path id="fx-collar" d="M236 312 276 316 300 362H250L214 324ZM408 312 368 316 344 362H394L430 324Z"/>' +
    '<path id="fx-neckb" d="M282 248 278 324C300 336 344 336 366 324L362 248Z"/>' +
    '<path id="fx-face" d="M246 118C246 170 254 214 272 240 286 260 304 272 322 274 340 272 358 260 372 240 390 214 398 170 398 118Z"/>' +
    '<path id="fx-fringe" d="' + fringe() + '"/>' +
    '<path id="fx-fistb" d="M140 372C150 338 176 316 206 310 222 306 236 310 240 318 252 306 272 306 282 318 288 328 280 336 270 336 282 346 278 360 262 364L250 372Z"/>' +
    '<clipPath id="fx-faceclip"><use href="#fx-face"/></clipPath>';

  // Radiating impact lines around the neck port, Trigger-style.
  function rays(cx, cy) {
    var d = "";
    for (var i = 0; i < 40; i++) {
      var a = i / 40 * Math.PI * 2 + Math.sin(i * 12.9898) * 0.06;
      var r1 = 60 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 80;
      var w = 0.012 + (Math.sin(i * 39.37) * 0.5 + 0.5) * 0.02;
      d += "M" + (cx + Math.cos(a) * r1).toFixed(1) + " " + (cy + Math.sin(a) * r1).toFixed(1) +
        "L" + (cx + Math.cos(a - w) * 800).toFixed(1) + " " + (cy + Math.sin(a - w) * 800).toFixed(1) +
        "L" + (cx + Math.cos(a + w) * 800).toFixed(1) + " " + (cy + Math.sin(a + w) * 800).toFixed(1) + "Z";
    }
    return d;
  }
  function impact(bg, fg) {
    var u = function (id, fill) { return '<use href="#' + id + '" fill="' + fill + '"/>'; };
    return '<rect width="640" height="360" fill="' + bg + '"/>' +
      u("fx-hair", fg) + u("fx-jacket", fg) + u("fx-neckb", fg) + u("fx-face", fg) + u("fx-fringe", fg) +
      '<path ' + B_SHARD + ' d="M-25 32H25V250L18 262H-18L-25 250Z" fill="#ff2a3a"/>' + u("fx-fistb", bg) +
      '<path class="rays" d="' + rays(PORT.x, PORT.y) + '" fill="#fff"/>';
  }
  var WALL = function (base) {
    return '<rect width="640" height="360" fill="' + base + '"/>' +
      '<rect width="640" height="360" filter="url(#fx-grime)"/>';
  };
  var FACE = "#a59a97", FACE_SH = "#6e5c61", HAIR = "#10161c";

  var SCENE =
    '<svg class="slot-fx__scene" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">' +
      '<defs>' +
        '<filter id="fx-grime" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 0 0 0 -0.45"/></filter>' +
        '<filter id="fx-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix type="saturate" values="0"/></filter>' +
        '<radialGradient id="fx-vig" cx="50%" cy="45%" r="72%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".75"/></radialGradient>' +
        '<radialGradient id="fx-flare" cx="46%" cy="83%" r="55%"><stop offset="0" stop-color="#ff2a3a" stop-opacity=".9"/><stop offset=".5" stop-color="#ff2a3a" stop-opacity=".25"/><stop offset="1" stop-color="#ff2a3a" stop-opacity="0"/></radialGradient>' +
        DEFS_B +
      '</defs>' +
      // Shot A: insert shot, straight on, the shard held up in front of a wall.
      '<g class="shot shot-a">' + WALL("#26292a") +
        '<g class="a-cam">' + HAND_BACK +
          '<g transform="translate(326 286) rotate(-7) translate(0 -262)">' + SHARD +
            '<rect class="glint" x="-24" y="34" width="48" height="6" fill="#fff" opacity="0"/></g>' +
          HAND_FRONT +
        '</g>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g>' +
      // Shot B: medium close-up; the hand brings the shard up to the neck.
      '<g class="shot shot-b"><g class="b-cam">' + WALL("#1d2726") +
        '<g class="b-head">' +
          '<use href="#fx-hair" fill="' + HAIR + '"/>' +
          '<use href="#fx-neckb" fill="#8f8380" ' + LINE + '/>' +
          '<path d="M280 250C300 284 344 284 364 250L364 292C344 302 300 302 280 292Z" fill="#4a3a40"/>' +
          '<path d="M300 300C304 312 304 322 300 330M346 300C342 312 342 322 346 330" fill="none" stroke="#4a3a40" stroke-width="1.4"/>' +
          '<use href="#fx-face" fill="' + FACE + '" ' + LINE + '/>' +
          '<g clip-path="url(#fx-faceclip)">' +
            '<path d="M240 150C280 144 330 140 404 146V170C374 176 354 184 342 196 334 204 328 214 322 224 316 208 306 196 290 190 274 186 258 186 240 188Z" fill="#b3414c"/>' +
            '<path d="M246 118C246 170 254 214 272 240 286 260 304 272 322 274L316 250C300 236 292 210 292 180 292 150 296 130 300 118Z" fill="#3d2a33" opacity=".6"/>' +
          '</g>' +
          '<path d="M270 170 300 177M346 177 376 169" stroke="#1f1318" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
          '<path d="M268 188C280 182 294 182 304 188M340 188C352 182 366 182 378 188M270 189 266 194M376 189 380 194" stroke="#1f1318" stroke-width="2" fill="none" stroke-linecap="round"/>' +
          '<path d="M322 160 326 158 324 210Z" fill="#f3ece8"/><path d="M317 214H328L322 220Z" fill="#5a3a40"/>' +
          '<path d="M298 248C310 244 334 244 346 248 336 253 310 253 298 248Z" fill="#2a1a20"/><path d="M305 248H339" stroke="#d9d0cc"/>' +
          '<ellipse cx="364" cy="214" rx="2.4" ry="3.6" fill="#eef1f1" ' + LINE + '/><ellipse cx="372" cy="230" rx="1.8" ry="2.8" fill="#eef1f1" ' + LINE + '/>' +
          '<use href="#fx-fringe" fill="' + HAIR + '"/>' +
          '<path d="M262 62C258 120 254 170 252 220M298 56C300 110 302 160 302 210M346 54C350 110 352 170 354 222M392 64C398 120 404 170 412 214M228 120C214 170 204 220 200 270M430 130C444 170 452 220 454 270" stroke="#2c3a45" stroke-width="1.2" fill="none"/>' +
        '</g>' +
        '<use href="#fx-jacket" fill="#23262e" ' + LINE + '/>' +
        '<use href="#fx-collar" fill="#cfd2cc" ' + LINE + '/>' +
        '<path d="M236 312 276 316M408 312 368 316" stroke="#c4404e" stroke-width="2"/>' +
        '<g class="b-hand"><g ' + B_SHARD + '>' + SHARD + '</g></g>' +
        '<rect x="283" y="290" width="20" height="20" rx="3" fill="#2a2f35" ' + LINE + '/>' +
        '<rect x="288" y="297" width="10" height="5" fill="#000"/>' +
        '<circle class="b-led" cx="307" cy="313" r="2.2" fill="#3a3f45"/>' +
        '<g class="b-hand">' +
          '<path d="M140 372C150 338 176 316 206 310L246 324 250 372Z" fill="#8f8380" ' + LINE + '/>' +
          '<ellipse cx="256" cy="356" rx="16" ry="10" transform="rotate(-35 256 356)" fill="' + FACE_SH + '" ' + LINE + '/>' +
          '<ellipse cx="243" cy="344" rx="17" ry="10.5" transform="rotate(-35 243 344)" fill="' + FACE + '" ' + LINE + '/>' +
          '<ellipse cx="229" cy="331" rx="17" ry="10.5" transform="rotate(-35 229 331)" fill="' + FACE + '" ' + LINE + '/>' +
          '<ellipse cx="214" cy="319" rx="16" ry="10" transform="rotate(-35 214 319)" fill="' + FACE + '" ' + LINE + '/>' +
          '<path d="M205 314C212 312 220 314 224 320M220 326C227 324 235 326 239 332M235 339C242 337 250 339 254 345" stroke="#c9bfbb" stroke-width="1.5" fill="none"/>' +
          '<path d="M232 318C246 306 268 306 280 318 286 326 280 334 270 334L240 332Z" fill="#b9aeab" ' + LINE + '/>' +
          '<path d="M262 336C272 336 280 344 276 352L258 356Z" fill="' + FACE + '" ' + LINE + '/>' +
        '</g>' +
        '<rect class="b-red" width="640" height="360" fill="url(#fx-flare)"/>' +
        '<rect width="640" height="360" fill="url(#fx-vig)"/>' +
      '</g></g>' +
      // Impact frames: one poster-white frame, one inverted.
      '<g class="shot impact-1">' + impact("#f2f0eb", "#0a0a0a") + '</g>' +
      '<g class="shot impact-2">' + impact("#0a0a0a", "#f2f0eb") + '</g>' +
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
