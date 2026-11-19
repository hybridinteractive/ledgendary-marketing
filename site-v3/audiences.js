/* Ledgendary v3 audience pages. One engine: a value (scroll date, as-of day, demo step, seat)
   drives every element inside its root through declarative attributes.
     data-show="a"  "a:b"  "=a"   shown when the value matches any token (space separated)
     data-on="..."                 class is-on when it matches
     data-dis="..."                disabled when it matches
     data-txt='[[v,"text"],...]'   text of the last step at or below the value
     data-pill='[[v,"tone","icon","text"],...]'
     data-tones='[[v,"tone"],...]' sets data-tone
     data-fn="name"                page hook, called with (el, value)
     data-land                     replays the landing animation when it appears */
(function () {
  'use strict';

  var doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var rmQuery = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(rmQuery && rmQuery.matches);

  /* Typesetting: a middot never starts a line, a date never splits from its day, a duration never breaks. */
  function nb(s) {
    return String(s).replace(/ · /g, ' · ')
      .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d)/g, '$1 $2')
      .replace(/(\d+) h (\d+) m\b/g, '$1 h $2 m').replace(/(\d+) h\b/g, '$1 h')
      .replace(/\b(JE|INV|P|B)-(?=\d)/g, '$1-⁠')
      .replace(/(\w)…(\w)/g, '$1⁠…⁠$2');
  }
  (function walk(node) {
    var w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null), t;
    while ((t = w.nextNode())) {
      if (t.parentNode && /^(SCRIPT|STYLE)$/.test(t.parentNode.nodeName)) { continue; }
      if (/ · |(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d|\d h\b|\b(JE|INV|P|B)-\d|\w…\w/.test(t.nodeValue)) { t.nodeValue = nb(t.nodeValue); }
    }
  })(document.body);
  function setText(el, s) { s = nb(s); if (el && el.textContent !== s) { el.textContent = s; } }
  function setAttr(el, k, v) { if (el && el.getAttribute(k) !== String(v)) { el.setAttribute(k, v); } }
  function toggle(el, c, on) { if (el && el.classList.contains(c) !== !!on) { el.classList.toggle(c, !!on); } }
  function land(el) { el.classList.remove('is-land'); void el.offsetWidth; el.classList.add('is-land'); }
  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function fmtH(m) { return Math.floor(m / 60) + ' h ' + (m % 60) + ' m'; }
  function usd(c) { return '$' + (c / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  /* ---------- Declarative timeline ---------- */
  function tokens(spec) {
    return spec.trim().split(/\s+/).map(function (k) {
      if (k.charAt(0) === '=') { var e = +k.slice(1); return function (x) { return x === e; }; }
      var p = k.split(':'), a = +p[0];
      if (p.length > 1) { var b = +p[1]; return function (x) { return x >= a && x < b; }; }
      return function (x) { return x >= a; };
    });
  }
  function hit(fns, v) { for (var i = 0; i < fns.length; i++) { if (fns[i](v)) { return true; } } return false; }
  function pick(list, v) { var r = null; for (var i = 0; i < list.length; i++) { if (v >= list[i][0]) { r = list[i]; } } return r; }

  var HOOKS = {};
  function Tl(root) {
    this.root = root;
    this.items = $$('[data-show],[data-on],[data-dis],[data-txt],[data-pill],[data-tones],[data-fn]', root).map(function (el) {
      var o = { el: el, landing: el.hasAttribute('data-land') };
      if (el.dataset.show) { o.show = tokens(el.dataset.show); }
      if (el.dataset.on) { o.on = tokens(el.dataset.on); }
      if (el.dataset.dis) { o.dis = tokens(el.dataset.dis); }
      if (el.dataset.txt) { o.txt = JSON.parse(el.dataset.txt); }
      if (el.dataset.pill) { o.pill = JSON.parse(el.dataset.pill); }
      if (el.dataset.tones) { o.tones = JSON.parse(el.dataset.tones); }
      if (el.dataset.fn) { o.fn = HOOKS[el.dataset.fn]; }
      return o;
    });
    this.first = true;
  }
  Tl.prototype.apply = function (v) {
    var first = this.first;
    this.items.forEach(function (o) {
      var el = o.el;
      if (o.show) {
        var s = hit(o.show, v);
        if (el.hidden === s) { el.hidden = !s; if (s && o.landing && !first) { land(el); } }
      }
      if (o.on) {
        var on = hit(o.on, v);
        if (el.classList.contains('is-on') !== on) { toggle(el, 'is-on', on); if (on && o.landing && !first) { land(el); } }
      }
      if (o.dis) { var d = hit(o.dis, v); if (el.disabled !== d) { el.disabled = d; } }
      if (o.txt) { var t = pick(o.txt, v); setText(el, t ? t[1] : ''); }
      if (o.tones) { var tn = pick(o.tones, v); if (tn) { setAttr(el, 'data-tone', tn[1]); } }
      if (o.pill) {
        var p = pick(o.pill, v);
        if (p) {
          var key = p.join('|');
          if (el.dataset.k !== key) {
            el.dataset.k = key;
            el.setAttribute('data-tone', p[1]);
            el.innerHTML = icon(p[2]) + nb(p[3]);
            if (!first && o.landing) { land(el); }
          }
        }
      }
      if (o.fn) { o.fn(el, v); }
    });
    this.first = false;
  };

  /* ---------- Page hooks ---------- */
  /* Logged minutes for a cell that fills during its working day. */
  function partial(full, day, t) {
    if (t >= day + 1) { return full; }
    if (t < day + 0.12) { return 0; }
    return Math.floor(full * clamp((t - day - 0.12) / 0.62, 0, 1) / 15) * 15;
  }

  /* Solo: three weeks on Brand refresh and Halcyon. Day index 0 is Thu Oct 1. */
  var SOLO = {
    weeks: [4, 11, 18],
    brand: [[60, 60, 120, 60, 60], [120, 90, 60, 90, 60], [90, 60, 90, 90, 90]],
    halcyon: [[60, 0, 0, 60, 0], [60, 0, 0, 60, 0], [60, 0, 0, 60, 0]],
    draftAt: 5.35
  };
  function soloCell(row, w, c, t) {
    var day = SOLO.weeks[w] + c;
    if (row === 'brand' && w === 0 && c === 0) { return t >= SOLO.draftAt ? 60 : 0; }
    return partial(SOLO[row][w][c], day, t);
  }
  function soloWeek(t) { return t < 11 ? 0 : t < 18 ? 1 : 2; }
  function soloBrandTotal(t) {
    var s = 0;
    for (var w = 0; w < 3; w++) { for (var c = 0; c < 5; c++) { s += soloCell('brand', w, c, t); } }
    return s;
  }
  /* Phone: the grid shows three weekdays around today. */
  function windowCols(tbl, today) {
    var hi = Math.min(4, Math.max(2, today)), lo = hi - 2;
    $$('[data-c]', tbl).forEach(function (n) { var c = +n.dataset.c; toggle(n, 'is-off-m', c < lo || c > hi); });
  }
  var MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  HOOKS.soloGrid = function (tbl, t) {
    var w = soloWeek(t), first = 5 + 7 * w, today = Math.floor(t) - SOLO.weeks[w];
    windowCols(tbl, today);
    $$('thead th[data-c]', tbl).forEach(function (th, c) {
      var html = MON[c] + ' <b>' + (first + c) + '</b>';
      if (th.dataset.k !== html) { th.dataset.k = html; th.innerHTML = html; }
      toggle(th, 'is-today', c === today);
    });
    var dayTot = [0, 0, 0, 0, 0];
    ['brand', 'halcyon'].forEach(function (row) {
      var tr = $('tr[data-r="' + row + '"]', tbl), rt = 0;
      for (var c = 0; c < 5; c++) {
        var m = soloCell(row, w, c, t);
        rt += m; dayTot[c] += m;
        var td = $('td[data-c="' + c + '"]', tr);
        setText(td, m ? fmtH(m) : '–');
        toggle(td, 'is-empty', !m);
        toggle(td, 'is-today', c === today);
      }
      setText($('.tot', tr), fmtH(rt));
    });
    var sum = $('tfoot tr', tbl), wk = 0;
    for (var c = 0; c < 5; c++) {
      var td = $('td[data-c="' + c + '"]', sum);
      setText(td, dayTot[c] ? fmtH(dayTot[c]) : '–');
      toggle(td, 'is-empty', !dayTot[c]);
      toggle(td, 'is-today', c === today);
      wk += dayTot[c];
    }
    setText($('.tot', sum), fmtH(wk));
  };
  HOOKS.soloWeekLabel = function (el, t) { setText(el, 'Week of Oct ' + (5 + 7 * soloWeek(t))); };
  HOOKS.soloLogged = function (el, t) { setText(el, fmtH(soloBrandTotal(t))); };
  HOOKS.soloLoggedOf = function (el, t) { setText(el, fmtH(soloBrandTotal(t)) + ' of 20 h'); };
  HOOKS.soloBar = function (el, t) { el.style.transform = 'scaleX(' + (soloBrandTotal(t) / 1200).toFixed(4) + ')'; };
  HOOKS.soloUnbilled = function (el, t) { setText(el, t >= 25.4 ? '$0.00' : usd(soloBrandTotal(t) * 250)); };

  /* Team: Theo's week of Nov 9. Day index 0 is Mon Nov 9; the working day runs 8 AM to 8 PM. */
  var TEAM = {
    site: [330, 270, 315, 360, 255],
    internal: [30, 0, 60, 0, 90],
    draft: 90, draftAt: 1.5,
    maya: [135, 135, 135, 150, 120]
  };
  function teamCell(row, c, t) {
    if (row === 'site' && c === 1) { return partial(TEAM.site[1], 1, t) + (t >= TEAM.draftAt ? TEAM.draft : 0); }
    return partial(TEAM[row][c], c, t);
  }
  function teamTheo(t) { var s = 0; for (var c = 0; c < 5; c++) { s += teamCell('site', c, t) + teamCell('internal', c, t); } return s; }
  function teamSite(t) { var s = 0; for (var c = 0; c < 5; c++) { s += teamCell('site', c, t) + partial(TEAM.maya[c], c, t); } return s; }
  HOOKS.teamGrid = function (tbl, t) {
    var today = Math.floor(t), dayTot = [0, 0, 0, 0, 0];
    windowCols(tbl, today);
    $$('thead th[data-c]', tbl).forEach(function (th, c) { toggle(th, 'is-today', c === today); });
    ['site', 'internal'].forEach(function (row) {
      var tr = $('tr[data-r="' + row + '"]', tbl), rt = 0;
      for (var c = 0; c < 5; c++) {
        var m = teamCell(row, c, t);
        rt += m; dayTot[c] += m;
        var td = $('td[data-c="' + c + '"]', tr);
        setText(td, m ? fmtH(m) : '–');
        toggle(td, 'is-empty', !m);
        toggle(td, 'is-today', c === today);
      }
      setText($('.tot', tr), fmtH(rt));
    });
    var sum = $('tfoot tr', tbl), wk = 0;
    for (var c = 0; c < 5; c++) {
      var td = $('td[data-c="' + c + '"]', sum);
      setText(td, dayTot[c] ? fmtH(dayTot[c]) : '–');
      toggle(td, 'is-empty', !dayTot[c]);
      toggle(td, 'is-today', c === today);
      wk += dayTot[c];
    }
    setText($('.tot', sum), fmtH(wk));
  };
  HOOKS.teamTheo = function (el, t) { setText(el, fmtH(teamTheo(t))); };
  HOOKS.teamTheoSite = function (el, t) { var m = 0; for (var c = 0; c < 5; c++) { m += teamCell('site', c, t); } setText(el, fmtH(m)); };
  HOOKS.teamSite = function (el, t) { setText(el, fmtH(teamSite(t)) + ' of 38 h 15 m'); };

  /* ---------- Scrubbed stage ---------- */
  var story = $('#story'), cfgEl = $('#scrub-cfg'), nav = $('.nav');
  var curT = 0, stageApi = null;
  if (story && cfgEl) { stageApi = initStage(JSON.parse(cfgEl.textContent)); }

  function initStage(cfg) {
    var DAYS = cfg.labels.length;
    var hero = $('.hero'), app = $('#app'), rail = $('#rail'), track = $('#rail-track'), marker = $('#rail-marker'), fill = $('#rail-fill');
    var chips = $$('.rail-chips .chip');
    var el = { day: $('#rd-day'), date: $('#rd-date'), cap: $('#cap'), capT: $('#cap-title'), capX: $('#cap-text'), hint: $('#hint'), live: $('#live'), crumb: $('#crumb'), signed: $('#signed'), act: $('#act') };
    var panes = $$('[data-pane]', app), side = $$('.side-nav li[data-nav]', app);
    var tl = new Tl($('#stage'));
    var W = cfg.weights, WSUM = W.reduce(function (a, b) { return a + b; }, 0), CUM = [0];
    W.forEach(function (w, i) { CUM[i + 1] = CUM[i] + w / WSUM; });
    var END = DAYS - 0.001;
    function pToT(p) {
      p = clamp(p, 0, 1);
      for (var i = 0; i < DAYS; i++) { if (p <= CUM[i + 1]) { return Math.min(END, i + (p - CUM[i]) / (CUM[i + 1] - CUM[i])); } }
      return END;
    }
    function tToP(t) { var i = Math.min(DAYS - 1, Math.floor(t)); return CUM[i] + (t - i) * (CUM[i + 1] - CUM[i]); }
    function clock(t) {
      if (!cfg.clock) { return ''; }
      var d = Math.floor(t), lab = cfg.labels[d];
      if (lab[2] === 0) { return ''; }
      var m = Math.round((cfg.clock[0] + (t - d) * (cfg.clock[1] - cfg.clock[0])) * 60 / 10) * 10;
      var h = Math.floor(m / 60), mm = m % 60;
      return ' · ' + ((h + 11) % 12 + 1) + ':' + (mm < 10 ? '0' : '') + mm + (h < 12 ? ' AM' : ' PM');
    }
    function sceneOf(t) { var s = pick(cfg.scenes, t); return s ? s[1] : cfg.scenes[0][1]; }
    var last = { scene: '', cap: '', act: '' }, lastCount = -1, liveTimer;

    function announce(s) { clearTimeout(liveTimer); liveTimer = setTimeout(function () { setText(el.live, s); }, 700); }

    function render(t) {
      curT = t;
      var d = Math.min(DAYS - 1, Math.floor(t)), lab = cfg.labels[d];
      var w = track.clientWidth;
      marker.style.transform = 'translateX(' + (t / DAYS * w).toFixed(1) + 'px)';
      fill.style.setProperty('--p', (t / DAYS).toFixed(4));
      chips.forEach(function (c) { toggle(c, 'is-past', t >= parseFloat(c.dataset.at)); });
      setText(el.date, lab[0]);
      setText(el.day, lab[1] + clock(t));
      toggle(el.hint, 'is-gone', t > 0.25);
      toggle(rail, 'is-waiting', !reduced && cfg.wait && t >= cfg.wait[0] && t < cfg.wait[1]);

      var cap = pick(cfg.caps, t) || cfg.caps[0], capKey = cap[1] + cap[2];
      if (capKey !== last.cap) {
        last.cap = capKey;
        setText(el.capT, cap[1]);
        setText(el.capX, cap[2]);
        land(el.cap);
        announce(lab[1] + ', ' + lab[0] + '. ' + cap[1] + ' ' + cap[2]);
      }
      setAttr(rail, 'aria-valuenow', d);
      setAttr(rail, 'aria-valuetext', lab[1] + ', ' + lab[0] + ': ' + cap[1]);

      var scene = sceneOf(t);
      if (scene !== last.scene) {
        last.scene = scene;
        app.setAttribute('data-scene', scene);
        panes.forEach(function (p) { toggle(p, 'is-active', p.dataset.pane === scene); });
        var navKey = (cfg.nav && cfg.nav[scene]) || scene;
        side.forEach(function (li) { toggle(li, 'is-on', li.dataset.nav === navKey); });
        var segs = cfg.crumbs[scene] || [];
        el.crumb.innerHTML = segs.map(function (s, i) { return i === segs.length - 1 ? '<b>' + nb(s) + '</b>' : '<span>' + nb(s) + '</span>' + icon('chevron-right'); }).join('');
        var who = cfg.who[scene];
        if (who && el.signed) {
          el.signed.innerHTML = (who[0].charAt(0) === '#' ? '<span class="av av-sys">' + icon(who[0].slice(1)) + '</span>' : '<span class="av">' + who[0] + '</span>') +
            '<span class="signed-n"><b>' + nb(who[1]) + '</b><span>' + nb(who[2]) + '</span></span>';
          setAttr(el.signed, 'aria-label', 'Signed in: ' + who[1] + ', ' + who[2]);
        }
      }

      var group = cfg.group ? cfg.group[scene] : '';
      var list = cfg.events.filter(function (e) { return t >= e[0] && (!e[5] || e[5] === group); });
      var actKey = group + list.length;
      if (actKey !== last.act) {
        var regroup = last.act && last.act.replace(/\d+$/, '') !== group;
        if (regroup) { lastCount = -1; }
        last.act = actKey;
        var grew = list.length > lastCount && lastCount !== -1;
        lastCount = list.length;
        var html = list.slice().reverse().slice(0, 7).map(function (e, i) {
          return '<li class="' + (e[4] ? 'is-paid ' : '') + (i === 0 && grew ? 'is-new' : '') + '">' + icon(e[1]) + '<p>' + nb(e[2]) + '<span>' + nb(e[3]) + '</span></p></li>';
        }).join('');
        if (!list.length) { html = '<li>' + icon(cfg.empty[0]) + '<p>' + nb(cfg.empty[1]) + '<span>' + nb(cfg.empty[2]) + '</span></p></li>'; }
        el.act.innerHTML = html;
      }
      tl.apply(t);
    }

    var L = { pinStart: 0, len: 1 };
    function layout() {
      if (reduced) { story.style.height = ''; return; }
      var vh = window.innerHeight, navH = nav ? nav.offsetHeight : 64;
      var heroH = hero.offsetHeight;
      L.len = Math.round(vh * (window.innerWidth < 720 ? cfg.len * 0.9 : cfg.len));
      story.style.height = (heroH + (vh - navH) + L.len) + 'px';
      L.pinStart = story.getBoundingClientRect().top + window.scrollY + heroH - navH;
    }
    function onScroll() {
      var y = window.scrollY;
      if (reduced) { return; }
      var q = window.innerWidth > 720 ? clamp(1 - y / Math.max(1, L.pinStart), 0, 1) : 0;
      el.date.style.transform = q ? 'scale(' + (1 + q * (window.innerWidth >= 1400 ? 0.3 : 0.25)).toFixed(3) + ')' : '';
      if (y > L.pinStart + L.len + window.innerHeight) { if (curT < END - 0.01) { render(END); } return; }
      render(pToT((y - L.pinStart) / L.len));
    }
    function goTo(t) {
      t = clamp(t, 0, END);
      if (reduced) { render(t); syncSteps(); return; }
      window.scrollTo({ top: Math.round(L.pinStart + tToP(t) * L.len), behavior: 'instant' });
    }
    function tFromX(x) { var r = track.getBoundingClientRect(); return clamp((x - r.left) / r.width * DAYS, 0, END); }
    var dragging = false;
    rail.addEventListener('pointerdown', function (e) { dragging = true; rail.setPointerCapture(e.pointerId); goTo(tFromX(e.clientX)); e.preventDefault(); });
    rail.addEventListener('pointermove', function (e) { if (dragging) { goTo(tFromX(e.clientX)); } });
    rail.addEventListener('pointerup', function () { dragging = false; });
    rail.addEventListener('pointercancel', function () { dragging = false; });
    rail.addEventListener('keydown', function (e) {
      var i = stepIndex(), n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { n = i + 1; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { n = i - 1; }
      else if (e.key === 'Home') { n = 0; }
      else if (e.key === 'End') { n = cfg.steps.length - 1; }
      if (n === null) { return; }
      e.preventDefault();
      goTo(cfg.steps[clamp(n, 0, cfg.steps.length - 1)]);
    });

    var steps = $('#steps'), prev = $('#step-prev'), next = $('#step-next');
    function stepIndex() { for (var i = cfg.steps.length - 1; i >= 0; i--) { if (curT >= cfg.steps[i] - 0.05) { return i; } } return 0; }
    function syncSteps() { if (!reduced) { return; } var i = stepIndex(); prev.disabled = i === 0; next.disabled = i === cfg.steps.length - 1; }
    prev.addEventListener('click', function () { render(cfg.steps[Math.max(0, stepIndex() - 1)]); syncSteps(); });
    next.addEventListener('click', function () { render(cfg.steps[Math.min(cfg.steps.length - 1, stepIndex() + 1)]); syncSteps(); });

    function applyMode() {
      doc.classList.toggle('rm', reduced);
      steps.hidden = !reduced;
      layout();
      if (reduced) { render(cfg.steps[0]); syncSteps(); } else { onScroll(); }
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      requestAnimationFrame(function () { ticking = false; onScroll(); });
    }, { passive: true });
    var rsz;
    window.addEventListener('resize', function () { clearTimeout(rsz); rsz = setTimeout(function () { layout(); render(curT); onScroll(); }, 80); });
    render(0);
    return { applyMode: applyMode, layout: layout, onScroll: onScroll, render: render };
  }

  /* Nav border once scrolled */
  window.addEventListener('scroll', function () { toggle(nav, 'is-scrolled', window.scrollY > 8); }, { passive: true });

  /* ---------- Demo roots: buttons, tabs, as-of controls ---------- */
  $$('[data-tl]').forEach(function (root) {
    var tl = new Tl(root), kind = root.dataset.tl, val = +(root.dataset.start || 0);
    var live = $('[data-live]', root);
    function set(v, quiet) {
      val = v;
      tl.apply(v);
      root.dataset.v = v;
      if (kind === 'tabs') {
        $$('[role="tab"]', root).forEach(function (tab) {
          var on = +tab.dataset.set === v;
          setAttr(tab, 'aria-selected', String(on));
          tab.tabIndex = on ? 0 : -1;
          if (on) { setAttr($('[role="tabpanel"]', root), 'aria-labelledby', tab.id); }
        });
      }
      if (kind === 'asof') { syncAsof(v); }
      if (live && !quiet) { var t = pick(JSON.parse(live.dataset.say), v); setText(live, t ? t[1] : ''); }
    }

    /* Buttons and tabs */
    $$('[data-set]', root).forEach(function (b) {
      b.addEventListener('click', function () { set(+b.dataset.set); if (b.dataset.focus) { var f = $(b.dataset.focus, root); if (f) { f.focus(); } } });
    });
    if (kind === 'tabs') {
      var tabs = $$('[role="tab"]', root);
      tabs.forEach(function (tab, i) {
        tab.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { n = (i + 1) % tabs.length; }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { n = (i - 1 + tabs.length) % tabs.length; }
          else if (e.key === 'Home') { n = 0; } else if (e.key === 'End') { n = tabs.length - 1; }
          if (n === null) { return; }
          e.preventDefault(); tabs[n].focus(); set(+tabs[n].dataset.set);
        });
      });
    }

    /* As-of control: N day cells, a thumb, quick jumps */
    var ctl = $('[data-asof]', root), atrack, athumb, N = 0, labels = [];
    function syncAsof(v) {
      if (!ctl) { return; }
      athumb.style.transform = 'translateX(' + (v / N * atrack.clientWidth).toFixed(1) + 'px)';
      setAttr(ctl, 'aria-valuenow', v);
      setAttr(ctl, 'aria-valuetext', labels[v]);
      $$('[data-set]', root).forEach(function (q) { setAttr(q, 'aria-pressed', String(+q.dataset.set === v)); });
    }
    if (kind === 'asof' && ctl) {
      atrack = $('.asof-track', ctl); athumb = $('.asof-thumb', ctl);
      labels = JSON.parse(ctl.dataset.asof); N = labels.length;
      ctl.style.setProperty('--n', N);
      var drag = false;
      var fromX = function (x) { var r = atrack.getBoundingClientRect(); return clamp(Math.floor((x - r.left) / r.width * N), 0, N - 1); };
      ctl.addEventListener('pointerdown', function (e) { drag = true; ctl.setPointerCapture(e.pointerId); set(fromX(e.clientX), true); e.preventDefault(); ctl.focus({ preventScroll: true }); });
      ctl.addEventListener('pointermove', function (e) { if (drag) { var n = fromX(e.clientX); if (n !== val) { set(n, true); } } });
      ctl.addEventListener('pointerup', function () { drag = false; });
      ctl.addEventListener('pointercancel', function () { drag = false; });
      ctl.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { n = val + 1; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { n = val - 1; }
        else if (e.key === 'PageUp') { n = val + 7; } else if (e.key === 'PageDown') { n = val - 7; }
        else if (e.key === 'Home') { n = 0; } else if (e.key === 'End') { n = N - 1; }
        if (n === null) { return; }
        e.preventDefault(); set(clamp(n, 0, N - 1), true);
      });
      window.addEventListener('resize', function () { syncAsof(val); });
    }

    set(val, true);

    /* Auto-run once in view: data-auto="v@ms v@ms" */
    if (root.dataset.auto) {
      var seq = root.dataset.auto.split(/\s+/).map(function (s) { var p = s.split('@'); return [+p[0], +p[1]]; });
      var start = function () {
        if (reduced) { set(seq[seq.length - 1][0], true); return; }
        seq.forEach(function (s) { setTimeout(function () { if (!root.dataset.touched) { set(s[0], true); } }, s[1]); });
      };
      root.addEventListener('pointerdown', function () { root.dataset.touched = '1'; });
      root.addEventListener('keydown', function () { root.dataset.touched = '1'; });
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); start(); } }, { threshold: 0.45 });
        io.observe(root);
      } else { start(); }
    }
  });

  /* Comparison tables: each cell carries its column name for the stacked phone layout. */
  $$('table.cmp').forEach(function (t) {
    var heads = $$('thead th', t).map(function (th) { return th.textContent; });
    $$('tbody tr', t).forEach(function (tr) { $$('td', tr).forEach(function (td) { td.setAttribute('data-k', heads[td.cellIndex] || ''); }); });
  });

  /* ---------- Waitlist ---------- */
  $$('form[data-join]').forEach(function (form) {
    var input = $('input', form), btn = $('button', form), msg = $('.join-msg', form);
    var original = msg.innerHTML;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.dataset.done) { return; }
      var v = input.value.trim();
      var at = v.indexOf('@'), dom = at > -1 ? v.slice(at + 1) : '';
      var err = !v ? 'Enter your work email so we can send the invite.'
        : /\s/.test(v) ? 'Remove the spaces from the address.'
        : at === -1 ? 'The @ is missing. Try you@studio.com.'
        : at === 0 ? 'Add your name before the @.'
        : v.indexOf('@', at + 1) > -1 ? 'An address has one @. Remove the extra one.'
        : !dom ? 'The domain is missing after the @, like studio.com.'
        : !/^[^.]+(\.[^.]+)*\.[a-z]{2,}$/i.test(dom) ? 'The domain needs an ending, like studio.com.' : '';
      if (err) {
        input.setAttribute('aria-invalid', 'true');
        msg.className = 'join-msg is-err';
        msg.innerHTML = icon('circle-alert') + err;
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      form.dataset.done = '1';
      input.readOnly = true;
      btn.disabled = true;
      btn.textContent = 'On the list';
      msg.className = 'join-msg is-ok';
      msg.innerHTML = icon('check') + 'Challenge accepted. You’re on the list.';
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid')) { input.removeAttribute('aria-invalid'); msg.className = 'join-msg'; msg.innerHTML = original; }
    });
  });

  /* ---------- Start ---------- */
  if (stageApi) {
    if (rmQuery && rmQuery.addEventListener) { rmQuery.addEventListener('change', function (e) { reduced = e.matches; stageApi.applyMode(); }); }
    stageApi.applyMode();
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { stageApi.layout(); stageApi.onScroll(); stageApi.render(curT); }); }
  }
})();
