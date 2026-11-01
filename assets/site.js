// Lets the CSS hide scroll-reveal content only when this script can show it again.
document.documentElement.classList.add("js");

function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
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

    // Looping videos hold still for people who ask for reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("video[autoplay]").forEach(function (vid) {
        vid.removeAttribute("autoplay"); vid.pause(); vid.controls = true;
      });
    }

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
