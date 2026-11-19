/* Ledgendary look v5 "Prove it": claims with receipts, the loupe, demos, macro-to-full, waitlist. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var doc = document;
  var opened = new Set();

  /* ---------- Nav border on scroll ---------- */
  var nav = doc.querySelector(".nav");
  function onNav() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onNav, { passive: true });
  onNav();

  /* ---------- Stacked tables: label each cell from its column head ---------- */
  doc.querySelectorAll("table.stack, table.hours.stack").forEach(function (t) {
    var heads = Array.prototype.map.call(t.querySelectorAll("thead th"), function (th) { return th.getAttribute("data-short") || th.textContent.trim(); });
    t.querySelectorAll(t.classList.contains("hours") ? "tbody tr, tfoot tr" : "tbody tr").forEach(function (tr) {
      Array.prototype.forEach.call(tr.children, function (td, i) {
        if (!td.hasAttribute("data-label") && heads[i] && !td.classList.contains("nolabel")) td.setAttribute("data-label", heads[i]);
      });
    });
  });

  /* ---------- Waitlist ---------- */
  doc.querySelectorAll("form.waitlist").forEach(function (form) {
    var input = form.querySelector("input[type=email]");
    var msg = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (input.value || "").trim();
      var err = "";
      if (!v) err = "Enter your email address so we can send your invite.";
      else if (v.indexOf("@") < 1) err = "That email address is missing the part before or the @ itself.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)) err = "That email address needs a domain after the @, like name@studio.com.";
      if (err) {
        input.setAttribute("aria-invalid", "true");
        msg.className = "form-msg is-error";
        msg.textContent = err;
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      msg.className = "form-msg is-ok";
      msg.textContent = "Challenge accepted. You're on the list.";
      form.classList.add("is-done");
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid")) { input.removeAttribute("aria-invalid"); msg.className = "form-msg"; msg.textContent = msg.getAttribute("data-idle") || ""; }
    });
  });

  /* ---------- Demo state machines ---------- */
  function setState(demo, state, opts) {
    demo.setAttribute("data-state", state);
    demo.querySelectorAll("[data-show]").forEach(function (el) {
      if (el.closest("[data-demo]") !== demo) return;
      var on = el.getAttribute("data-show").split(/\s+/).indexOf(state) > -1;
      el.classList.toggle("off", !on);
      if (on) el.removeAttribute("aria-hidden"); else el.setAttribute("aria-hidden", "true");
      if ("inert" in el) el.inert = !on;
    });
    demo.querySelectorAll("[data-go]").forEach(function (b) {
      if (b.closest("[data-demo]") !== demo) return;
      if (b.hasAttribute("aria-pressed")) b.setAttribute("aria-pressed", String(b.getAttribute("data-go") === state));
      if (b.getAttribute("role") === "tab") b.setAttribute("aria-selected", String(b.getAttribute("data-go") === state));
    });
    demo.classList.toggle("is-waiting", /wait/.test(state));
    if (opts && opts.say) {
      var live = demo.querySelector(".demo-live");
      if (live) live.textContent = opts.say;
    }
    var w = demo.closest(".stage") || demo;
    refreshLoupesIn(w);
  }

  doc.querySelectorAll("[data-demo]").forEach(function (demo) {
    setState(demo, demo.getAttribute("data-state") || "a");
    demo.addEventListener("click", function (e) {
      var b = e.target.closest("[data-go]");
      if (!b || b.closest("[data-demo]") !== demo) return;
      var st = b.getAttribute("data-go");
      setState(demo, st, { say: b.getAttribute("data-say") });
      var then = b.getAttribute("data-then");
      if (then) {
        var ms = reduce.matches ? 300 : parseInt(b.getAttribute("data-after") || "1400", 10);
        clearTimeout(demo._t);
        demo._t = setTimeout(function () {
          if (demo.getAttribute("data-state") === st) setState(demo, then, { say: b.getAttribute("data-then-say") });
          var f = demo.querySelector("[data-focus-after]");
          if (f && !f.classList.contains("off") && demo.contains(doc.activeElement) === false) return;
        }, ms);
      }
    });
  });

  /* ---------- Prove it + the loupe ---------- */
  var SCALE = 2.3;

  function stageOf(btn) { return btn.closest(".proof, .hero-proof").querySelector(".stage"); }

  function cloneWin(win) {
    var c = win.cloneNode(true);
    c.querySelectorAll("[id]").forEach(function (n) { n.removeAttribute("id"); });
    c.removeAttribute("id");
    c.querySelectorAll(".demo-live").forEach(function (n) { n.remove(); });
    c.setAttribute("aria-hidden", "true");
    c.inert = true;
    c.style.width = win.offsetWidth + "px";
    c.style.margin = "0";
    return c;
  }

  function aim(stage) {
    var loupe = stage.querySelector(".loupe");
    var lens = loupe && loupe.querySelector(".loupe-lens");
    var targetSel = stage.getAttribute("data-aim");
    if (!lens || !targetSel) return;
    var win = stage.querySelector(".win");
    var target = win.querySelector(targetSel);
    if (!target) return;
    win.querySelectorAll(".is-target").forEach(function (n) { n.classList.remove("is-target"); });
    target.classList.add("is-target");
    lens.innerHTML = "";
    lens.appendChild(cloneWin(win));
    var wr = win.getBoundingClientRect();
    var tr = target.getBoundingClientRect();
    try {
      var rg = doc.createRange();
      rg.selectNodeContents(target);
      var rr = rg.getBoundingClientRect();
      if (rr.width > 0 && rr.height > 0) tr = rr;
    } catch (err) { /* keep the element box */ }
    var sx = win.offsetWidth ? wr.width / win.offsetWidth : 1;
    var cx = (tr.left - wr.left + tr.width / 2) / sx;
    var cy = (tr.top - wr.top + tr.height / 2) / sx;
    var d = loupe.offsetWidth;
    var s = parseFloat(stage.getAttribute("data-scale") || SCALE);
    // The whole target always fits: the scale comes down until the target's own box sits inside
    // the circle, and everything outside that box fades out, so no fragment of a neighbour shows.
    var tw = tr.width / sx + 8, th = tr.height / sx + 6;
    var fit = Math.min((d * 0.86) / tw, (d * 0.6) / th);
    if (fit < s) s = Math.max(1, fit);
    // Hard-ish edges just outside the target's own text box, fading inward by a couple of pixels,
    // so neighbouring glyphs never leak in as fragments.
    var hx = tr.width / sx / 2 + 2, hy = tr.height / sx / 2 + 1;
    var x0 = cx - hx, x1 = cx + hx, y0 = cy - hy, y1 = cy + hy;
    var mask = "linear-gradient(to right, transparent " + x0 + "px, #000 " + (x0 + 3) + "px, #000 " + (x1 - 3) + "px, transparent " + x1 + "px), " +
      "linear-gradient(to bottom, transparent " + y0 + "px, #000 " + (y0 + 2) + "px, #000 " + (y1 - 2) + "px, transparent " + y1 + "px)";
    lens.style.width = win.offsetWidth + "px";
    lens.style.height = win.offsetHeight + "px";
    lens.style.webkitMaskImage = mask;
    lens.style.maskImage = mask;
    lens.style.transform = "translate(" + (d / 2 - cx * s) + "px," + (d / 2 - cy * s) + "px) scale(" + s + ")";
    stage.setAttribute("data-fit", s < 1.15 ? "tight" : "ok");
    loupe.classList.add("is-on");
    var cap = stage.querySelector(".lens-cap");
    if (cap && stage._cap) cap.innerHTML = stage._cap;
  }

  function hiddenIn(stage, sel) {
    var t = stage.querySelector(".win " + sel);
    return !t || !!t.closest(".off");
  }

  function capFor(btn) {
    return '<strong>' + (btn.getAttribute("data-cap") || "Magnified") + '</strong>' + (btn.getAttribute("data-cap-sub") || "Demo data, magnified");
  }

  /* When a demo changes state, the loupe follows: if its detail is no longer on screen,
     it moves to a receipt whose detail is, and an open receipt that no longer applies closes. */
  function refreshLoupesIn(scope) {
    var stage = scope.classList && scope.classList.contains("stage") ? scope : scope.querySelector && scope.querySelector(".stage");
    if (!stage || !stage.getAttribute("data-aim")) return;
    var group = stage.closest(".proof, .hero-proof");
    if (hiddenIn(stage, stage.getAttribute("data-aim")) && group) {
      var demo = stage.querySelector("[data-demo]");
      var state = demo ? demo.getAttribute("data-state") : "";
      var btns = Array.prototype.slice.call(group.querySelectorAll(".prove"));
      var pick = btns.filter(function (b) { return b.getAttribute("data-go-demo") === state && !hiddenIn(stage, b.getAttribute("data-target")); })[0] ||
        btns.filter(function (b) { return !hiddenIn(stage, b.getAttribute("data-target")); })[0];
      btns.forEach(function (b) {
        if (b.getAttribute("aria-expanded") === "true" && hiddenIn(stage, b.getAttribute("data-target"))) closeClaim(b);
      });
      if (pick) { stage.setAttribute("data-aim", pick.getAttribute("data-target")); stage._cap = capFor(pick); }
    }
    requestAnimationFrame(function () { aim(stage); });
  }

  function prove(btn, quiet) {
    var group = btn.closest(".proof, .hero-proof");
    var stage = stageOf(btn);
    group.querySelectorAll(".prove").forEach(function (b) {
      if (b === btn) return;
      b.setAttribute("aria-expanded", "false");
      b.closest(".claim").classList.remove("is-open");
    });
    btn.setAttribute("aria-expanded", "true");
    var claim = btn.closest(".claim");
    claim.classList.add("is-open");
    var go = btn.getAttribute("data-go-demo");
    if (go) {
      var demo = stage.querySelector("[data-demo]");
      if (demo) setState(demo, go);
    }
    stage.setAttribute("data-aim", btn.getAttribute("data-target"));
    stage._cap = '<strong>' + (btn.getAttribute("data-cap") || "Magnified") + '</strong>' + (btn.getAttribute("data-cap-sub") || "Demo data, magnified 2.3×");
    aim(stage);
    var id = btn.getAttribute("data-receipt") || btn.getAttribute("data-target");
    opened.add(group.id + id);
    updateTally();
    if (!quiet) {
      var live = doc.getElementById("proof-live");
      var proof = claim.querySelector(".r-proof");
      if (live && proof) live.textContent = proof.textContent.replace(/\s+/g, " ").trim();
    }
  }

  function closeClaim(btn) {
    btn.setAttribute("aria-expanded", "false");
    btn.closest(".claim").classList.remove("is-open");
  }

  doc.addEventListener("click", function (e) {
    var btn = e.target.closest(".prove");
    if (!btn) return;
    prove(btn);
  });

  /* Every proof group opens its first receipt by default so the stage is never empty. */
  doc.querySelectorAll(".proof, .hero-proof").forEach(function (g) {
    var first = g.querySelector(".prove[data-default]") || g.querySelector(".prove");
    if (!first) return;
    var stage = stageOf(first);
    stage.setAttribute("data-aim", first.getAttribute("data-target"));
    stage._cap = '<strong>' + (first.getAttribute("data-cap") || "Magnified") + '</strong>' + (first.getAttribute("data-cap-sub") || "Demo data, magnified 2.3×");
    if (g.classList.contains("hero-proof")) { prove(first, true); return; }
    // Open the first receipt quietly, so the column is never a list of closed rows; it isn't counted.
    first.setAttribute("aria-expanded", "true");
    first.closest(".claim").classList.add("is-open");
    var go = first.getAttribute("data-go-demo");
    var demo = stage.querySelector("[data-demo]");
    if (go && demo && demo.getAttribute("data-state") !== go) setState(demo, go);
    requestAnimationFrame(function () { aim(stage); });
  });

  function aimAll() {
    doc.querySelectorAll(".stage[data-aim]").forEach(function (s) { aim(s); });
  }

  var total = doc.querySelectorAll(".prove").length;
  function updateTally() {
    doc.querySelectorAll("[data-tally]").forEach(function (t) {
      var n = opened.size;
      t.querySelector(".tally-n").textContent = n + " of " + total;
      var bar = t.querySelector(".tally-bar");
      if (bar && !bar.children.length) for (var i = 0; i < total; i++) bar.appendChild(doc.createElement("i"));
      if (bar) Array.prototype.forEach.call(bar.children, function (c, i) { c.classList.toggle("on", i < n); });
      var done = t.querySelector(".tally-done");
      if (done) done.classList.toggle("off", n < total);
    });
  }
  updateTally();

  var rT;
  window.addEventListener("resize", function () { clearTimeout(rT); rT = setTimeout(function () { aimAll(); macroAll(); }, 120); });
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(aimAll);
  window.addEventListener("load", aimAll);

  /* ---------- Macro to full: a close-up zooms out to the screen it came from ---------- */
  var macros = Array.prototype.slice.call(doc.querySelectorAll(".macro"));
  var visible = new Set();

  function macroOne(m) {
    var screen = m.querySelector(".macro-screen");
    var track = m.querySelector(".macro-track");
    if (reduce.matches) { screen.style.transform = ""; setCap(m, 1); return; }
    var focus = screen.querySelector("[data-macro-focus]");
    var r = track.getBoundingClientRect();
    var vh = window.innerHeight;
    var span = r.height - vh;
    var p = span > 0 ? Math.min(1, Math.max(0, (-r.top + vh * 0.15) / (span * 0.8))) : 1;
    var e = 1 - Math.pow(1 - p, 3);
    var start = parseFloat(m.getAttribute("data-zoom") || "3");
    var view = m.querySelector(".macro-view");
    var phone = window.innerWidth <= 760;
    // On a phone the whole screen at its own size is too small to read, so the zoom ends on the
    // phone's own layout at 1×, from the top of the screen. On wider screens it ends on the whole screen.
    var fitS = phone ? 1 : Math.min(1.15, view.clientHeight / screen.offsetHeight, view.clientWidth / screen.offsetWidth);
    if (phone) start = Math.min(start, 2.2);
    var s = start + (fitS - start) * e;
    var ox = screen.offsetWidth / 2, oy = 0;
    if (focus) {
      var fx = 0, fy = 0, n = focus;
      while (n && n !== screen) { fx += n.offsetLeft; fy += n.offsetTop; n = n.offsetParent; }
      ox = fx + focus.offsetWidth / 2;
      oy = fy + focus.offsetHeight / 2;
    }
    // Translate so the focus sits at the view's centre when close, and the screen sits top-centred when full.
    var vw = view.clientWidth;
    var cx = vw / 2, cy = view.clientHeight / 2;
    var baseX = screen.offsetLeft;
    var tx0 = cx - (baseX + ox * start), ty0 = cy - oy * start;
    // Keep the close-up filling the frame: no ground showing past the screen's edges.
    var W = screen.offsetWidth * start, H = screen.offsetHeight * start, vh2 = view.clientHeight;
    tx0 = Math.min(-baseX, Math.max(vw - baseX - W, tx0));
    ty0 = Math.min(0, Math.max(vh2 - H, ty0));
    var tx1 = (vw - screen.offsetWidth * fitS) / 2 - baseX, ty1 = 0;
    var tx = tx0 + (tx1 - tx0) * e, ty = ty0 + (ty1 - ty0) * e;
    screen.style.transformOrigin = "0 0";
    screen.style.transform = "translate(" + (baseX + tx - baseX) + "px," + ty + "px) scale(" + s + ")";
    setCap(m, p);
  }

  function setCap(m, p) {
    var close = m.querySelector(".cap-close"), full = m.querySelector(".cap-full");
    if (!close || !full) return;
    var isFull = p > 0.6;
    close.classList.toggle("off", isFull);
    full.classList.toggle("off", !isFull);
    var sc = m.querySelector(".macro-scale");
    if (sc) sc.textContent = isFull ? "Whole screen" : "Close-up";
  }

  function macroAll() { macros.forEach(macroOne); }
  if ("IntersectionObserver" in window && macros.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { visible.add(en.target); en.target.classList.add("is-live"); macroOne(en.target); }
        else { visible.delete(en.target); en.target.classList.remove("is-live"); }
      });
    });
    macros.forEach(function (m) { io.observe(m); });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking || !visible.size) return;
    ticking = true;
    requestAnimationFrame(function () { visible.forEach(macroOne); ticking = false; });
  }, { passive: true });
  macroAll();
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(macroAll);
  reduce.addEventListener && reduce.addEventListener("change", macroAll);

  /* ---------- Hero "wait for it" beat on the enterprise line ---------- */
  doc.querySelectorAll("[data-wait-beat]").forEach(function (el) {
    if (reduce.matches) return;
    el.classList.add("beat-ready");
    requestAnimationFrame(function () { setTimeout(function () { el.classList.add("beat-go"); }, 500); });
  });
})();
