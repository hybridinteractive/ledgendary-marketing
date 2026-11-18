/* Ledgendary home v3. The scrubbed chapter renders the app as a pure function of the date. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var rmQuery = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(rmQuery && rmQuery.matches);

  function setText(el, s) { if (el && el.textContent !== s) { el.textContent = s; } }
  function setAttr(el, k, v) { if (el && el.getAttribute(k) !== String(v)) { el.setAttribute(k, v); } }
  function toggle(el, c, on) { if (el && el.classList.contains(c) !== !!on) { el.classList.toggle(c, !!on); } }
  function land(el, c) { c = c || 'is-land'; el.classList.remove(c); void el.offsetWidth; el.classList.add(c); }

  /* ---------- Dates: day 0 is Tue Oct 27, day 22 is Wed Nov 18 ---------- */
  var DAYS = 23;
  var WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function label(d) { return d <= 4 ? 'Oct ' + (27 + d) : 'Nov ' + (d - 4); }
  function weekday(d) { return WD[(2 + d) % 7]; }
  function fmtH(m) { return Math.floor(m / 60) + '\u00a0h ' + (m % 60) + '\u00a0m'; }
  function usd(cents) { return '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  /* Minutes per weekday: [week][person][Mon..Fri]; Theo, Maya. 41 h 45 m and 38 h 15 m. */
  var H = [
    [[360, 390, 345, 375, 270], [150, 165, 135, 135, 180]],
    [[330, 360, 315, 360, 255], [135, 135, 135, 150, 120]]
  ];
  function logged(w, r, c, t) {
    if (c > 4) { return 0; }
    var di = 6 + 7 * w + c;
    var full = H[w][r][c];
    if (t >= di + 1) { return full; }
    if (t < di) { return 0; }
    var v = full * clamp((t - di - 0.08) / 0.8, 0, 1);
    return Math.floor(v / 15) * 15;
  }

  /* ---------- Events ---------- */
  var VIEWS = [1.2, 1.5, 1.8];
  var EVENTS = [
    { at: 0.35, ic: 'send', t: 'P-0018 sent to Dana', s: 'Oct 27 · Maya Ortiz' },
    { at: 1.2, ic: 'eye', t: 'Dana viewed P-0018', s: 'views' },
    { at: 3.25, ic: 'mouse-pointer-click', t: 'Dana chose option B', s: 'Oct 30 · $30,000 + time' },
    { at: 3.6, ic: 'signature', t: 'Signed by Dana Whitfield', s: 'Oct 30 · 10:42 AM' },
    { at: 4.3, ic: 'briefcase', t: 'Job Site build created', s: 'Oct 31 · 80 h estimated' },
    { at: 10.9, ic: 'check', t: 'Week of Nov 2 submitted', s: 'Nov 6 · 41 h 45 m' },
    { at: 13.15, ic: 'user-check', t: 'Lena approved week of Nov 2', s: 'Nov 9 · 41 h 45 m' },
    { at: 17.9, ic: 'check', t: 'Week of Nov 9 submitted', s: 'Nov 13 · 38 h 15 m' },
    { at: 20.1, ic: 'user-check', t: 'Lena approved week of Nov 9', s: 'Nov 16 · 38 h 15 m' },
    { at: 20.7, ic: 'send', t: 'INV-0042 sent', s: 'Nov 16 · due Dec 1' },
    { at: 20.72, ic: 'book-open', t: 'JE-1041 posted', s: 'Nov 16 · #9c07' },
    { at: 21.5, ic: 'eye', t: 'Dana viewed INV-0042', s: 'Nov 17' },
    { at: 22.3, ic: 'credit-card', t: 'Paid by card, $42,000.00', s: 'Nov 18 · Visa ending 1881', paid: true },
    { at: 22.55, ic: 'book-open', t: 'JE-1042 posted', s: 'Nov 18 · #e21a' }
  ];

  var HOURS = ['Hours, day by day', 'Theo and Maya log time on the job. The unbilled total climbs with every entry.'];
  function caption(t) {
    var d = Math.min(22, Math.floor(t));
    if (d === 0) { return t < 0.35 ? ['The proposal', 'Maya writes P-0018 for Dana at Northwind Co: three options, time at $150/h.'] : ['Proposal sent', 'P-0018 goes to Dana Whitfield with three options. Option B is recommended.']; }
    if (d === 1) { return ['Viewed, three times', 'Dana opens the proposal on Oct 28. Then again. Then a third time.']; }
    if (d === 2) { return ['A quiet day', 'Northwind is deciding. Nothing to chase: the proposal shows every view.']; }
    if (d === 3) { return ['Chosen and signed', 'In the client portal Dana picks option B, $30,000 plus time, and signs at 10:42 AM.']; }
    if (d <= 5) { return ['The proposal becomes the job', 'Option B is now Site build: $30,000 fixed, 80 h estimated. Nothing retyped.']; }
    if (d === 10 && t >= 10.9) { return ['Week submitted', 'Theo and Maya submit the week of Nov 2: 41 h 45 m.']; }
    if (d <= 10) { return HOURS; }
    if (d <= 12) { return ['Weekend', 'The week of Nov 2 waits for Lena: 41 h 45 m submitted.']; }
    if (d === 13) { return ['Approved', 'Lena approves the week of Nov 2. Approved hours are ready to bill.']; }
    if (d === 17 && t >= 17.9) { return ['80 h 0 m, on the estimate', 'The week of Nov 9 is in: 38 h 15 m. Two weeks, exactly the 80 h option B said.']; }
    if (d <= 17) { return HOURS; }
    if (d <= 19) { return ['Weekend', 'Two weeks, 80 h 0 m, waiting on approval.']; }
    if (d === 20) { return t < 20.7 ? ['The invoice writes itself', 'The fixed fee comes from option B and the time from approved weeks: $42,000.00.'] : ['Invoiced and posted', 'INV-0042 goes to Dana, due Dec 1. Sending it posts JE-1041 to the books.']; }
    if (d === 21) { return ['Wait for it…', 'Sent Nov 16, due Dec 1. Dana opens it on Nov 17.']; }
    return t < 22.3 ? ['Wait for it…', 'Nov 18. Still nothing. Then:'] : ['Paid.', 'Dana pays by card, Visa ending 1881. The payment posts as JE-1042, chained to the entry before it.'];
  }

  /* ---------- Scroll weights: the wait stretch scrolls slowest ---------- */
  var W = [1.3, 1.4, 0.7, 1.6, 0.6, 0.4, 0.9, 0.9, 0.9, 0.9, 1.0, 0.4, 0.4, 1.1, 0.9, 0.9, 0.9, 1.0, 0.4, 0.4, 1.8, 2.6, 2.2];
  var WSUM = W.reduce(function (a, b) { return a + b; }, 0);
  var CUM = [0];
  W.forEach(function (w, i) { CUM[i + 1] = CUM[i] + w / WSUM; });
  function pToT(p) {
    p = clamp(p, 0, 1);
    for (var i = 0; i < DAYS; i++) {
      if (p <= CUM[i + 1]) { return Math.min(22.999, i + (p - CUM[i]) / (CUM[i + 1] - CUM[i])); }
    }
    return 22.999;
  }
  function tToP(t) { var i = Math.min(22, Math.floor(t)); return CUM[i] + (t - i) * (CUM[i + 1] - CUM[i]); }

  /* ---------- Elements ---------- */
  var story = $('#story'), hero = $('.hero'), stage = $('#stage'), nav = $('.nav');
  var app = $('#app'), rail = $('#rail'), track = $('#rail-track'), marker = $('#rail-marker'), fill = $('#rail-fill');
  var chips = $$('.rail-chips .chip');
  var el = {
    day: $('#rd-day'), date: $('#rd-date'), cap: $('#cap'), capT: $('#cap-title'), capX: $('#cap-text'), hint: $('#hint'), live: $('#live'),
    crumb: $('#crumb'),
    pStatus: $('#p-status'), pMeta: $('#p-meta'), pDecision: $('#p-decision'), vs: $$('.vs'),
    po: $$('.po-opt'), sigField: $('#sig-field'), sigBtn: $('#sig-btn'), sigBtnT: $('#sig-btn-t'), sigMeta: $('#sig-meta'),
    tWeek: $('#t-week'), tStatus: $('#t-status'), tGrid: $('#t-grid'), tLogged: $('#t-logged'), tBar: $('#t-bar'), tUnbilled: $('#t-unbilled'),
    ap: $$('.approvals li'),
    invTitle: $('#inv-title'), invMeta: $('#inv-meta'), invStatus: $('#inv-status'), lines: $$('.ln'), invTotal: $('#inv-total'),
    dueRow: $('#inv-due-row'), dueK: $('#inv-due-k'), due: $('#inv-due'), pay: $('#inv-pay'), payT: $('#inv-pay-t'), je1: $('#je1'), je2: $('#je2'),
    act: $('#act'), side: $$('.side-nav li[data-nav]'), panes: $$('.pane')
  };
  if (!story || !app) { return; }

  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function pill(node, tone, ic, text) {
    var key = tone + ic + text;
    if (node.dataset.k === key) { return; }
    node.dataset.k = key;
    node.setAttribute('data-tone', tone);
    node.innerHTML = icon(ic) + text;
  }

  /* ---------- Render ---------- */
  var last = { scene: '', cap: '', act: '', je1: null, je2: null, pDraft: null };
  var curT = 0;

  function sceneOf(t) { return t < 3 ? 'proposal' : t < 4 ? 'portal' : t < 20 ? 'time' : 'invoice'; }

  function render(t) {
    curT = t;
    var d = Math.min(22, Math.floor(t));

    /* Rail */
    var w = track.clientWidth;
    marker.style.transform = 'translateX(' + (t / DAYS * w).toFixed(1) + 'px)';
    fill.style.setProperty('--p', (t / DAYS).toFixed(4));
    chips.forEach(function (c) { toggle(c, 'is-past', t >= parseFloat(c.dataset.at)); });
    setText(el.day, weekday(d));
    setText(el.date, label(d));
    toggle(el.hint, 'is-gone', t > 0.25);
    toggle(rail, 'is-waiting', !reduced && (d === 21 || (d === 22 && t < 22.3)));

    var cap = caption(t);
    var capKey = cap[0] + cap[1];
    if (capKey !== last.cap) {
      last.cap = capKey;
      setText(el.capT, cap[0]);
      setText(el.capX, cap[1]);
      land(el.cap);
      announce(weekday(d) + ', ' + label(d) + '. ' + cap[0] + ' ' + cap[1]);
    }
    setAttr(rail, 'aria-valuenow', d);
    setAttr(rail, 'aria-valuetext', weekday(d) + ', ' + label(d) + ': ' + cap[0]);

    /* Scene */
    var scene = sceneOf(t);
    if (scene !== last.scene) {
      last.scene = scene;
      app.setAttribute('data-scene', scene);
      el.panes.forEach(function (p) { toggle(p, 'is-active', p.dataset.pane === scene); });
      var navKey = scene === 'portal' ? 'proposal' : scene;
      el.side.forEach(function (li) { toggle(li, 'is-on', li.dataset.nav === navKey); });
    }

    var crumb;
    if (scene === 'proposal') { crumb = '<span>Proposals</span>' + icon('chevron-right') + '<b>P-0018</b>'; }
    else if (scene === 'portal') { crumb = '<span>Client portal</span>' + icon('chevron-right') + '<b>What Dana sees</b>'; }
    else if (scene === 'time') { crumb = '<span>Northwind Co</span>' + icon('chevron-right') + '<span>Site build</span>' + icon('chevron-right') + '<b>Time</b>'; }
    else { crumb = '<span>Invoices</span>' + icon('chevron-right') + '<b>' + (t < 20.25 ? 'New draft' : 'INV-0042') + '</b>'; }
    if (el.crumb.dataset.k !== crumb) { el.crumb.dataset.k = crumb; el.crumb.innerHTML = crumb; }

    if (scene === 'proposal') { renderProposal(t); }
    else if (scene === 'portal') { renderPortal(t); }
    else if (scene === 'time') { renderTime(t, d); }
    else { renderInvoice(t); }

    renderActivity(t);
    renderTally(t);
  }

  var ty = { prop: $('#ty-prop'), time: $('#ty-time'), inv: $('#ty-inv'), paid: $('#ty-paid'), je: $('#ty-je') };
  function renderTally(t) {
    var views = VIEWS.filter(function (v) { return t >= v; }).length;
    setText(ty.prop, t < 0.35 ? 'Draft' : t < 3.6 ? (views ? 'Viewed ' + (views === 1 ? 'once' : views === 2 ? 'twice' : '3 times') : 'Sent') : 'Signed, option B');
    var total = 0;
    for (var w = 0; w < 2; w++) { for (var r = 0; r < 2; r++) { for (var k = 0; k < 5; k++) { total += logged(w, r, k, t); } } }
    setText(ty.time, fmtH(total) + ' of 80 h');
    toggle(ty.time, 'is-zero', !total);
    var inv = t >= 20.7, paid = t >= 22.3;
    setText(ty.inv, inv ? '$42,000.00' : '$0.00');
    toggle(ty.inv, 'is-zero', !inv);
    setText(ty.paid, paid ? '$42,000.00' : '$0.00');
    toggle(ty.paid, 'is-zero', !paid);
    toggle(ty.paid, 'is-paid', paid);
    setText(ty.je, t < 20.72 ? 'No entries' : t < 22.55 ? 'JE-1041' : 'JE-1041, JE-1042');
    toggle(ty.je, 'is-zero', t < 20.72);
  }

  function renderProposal(t) {
    var views = VIEWS.filter(function (v) { return t >= v; }).length;
    if (t < 0.35) {
      pill(el.pStatus, 'draft', 'file-pen-line', 'Draft');
      setText(el.pMeta, 'P-0018 · To Dana Whitfield · Draft');
    } else if (!views) {
      pill(el.pStatus, 'sent', 'send', 'Sent');
      setText(el.pMeta, 'P-0018 · To Dana Whitfield · Sent Oct 27 by Maya Ortiz');
    } else {
      pill(el.pStatus, 'sent', 'eye', views === 1 ? 'Viewed' : 'Viewed ' + views + ' times');
      setText(el.pMeta, 'P-0018 · To Dana Whitfield · Sent Oct 27 by Maya Ortiz');
    }
    var names = ['Opened', 'Opened again', 'Third time'];
    el.vs.forEach(function (li, i) {
      var on = views > i;
      toggle(li, 'is-on', on);
      setText($('.vs-t', li), on ? names[i] : 'Not opened yet');
      setText($('.vs-d', li), on ? 'Oct 28' : 'Waiting');
    });
    setText(el.pDecision, t < 0.35 ? 'Once it is sent, she can choose an option and sign in the client portal.' : 'She can choose an option and sign in the client portal.');
  }

  function renderPortal(t) {
    el.po.forEach(function (o) { toggle(o, 'is-chosen', o.dataset.opt === 'B' && t >= 3.25); });
    var signed = t >= 3.5;
    toggle(el.sigField, 'is-signed', signed);
    if (t < 3.25) {
      el.sigBtn.className = 'btn-ui is-off';
      setText(el.sigBtnT, 'Accept and sign');
      setText(el.sigMeta, 'Pick an option first.');
    } else if (t < 3.6) {
      el.sigBtn.className = 'btn-ui';
      setText(el.sigBtnT, 'Accept and sign');
      setText(el.sigMeta, 'Option B, $30,000 + time. Type your full name to sign.');
    } else {
      el.sigBtn.className = 'btn-ui is-done';
      setText(el.sigBtnT, 'Signed');
      setText(el.sigMeta, 'Option B accepted · Signed Oct 30, 10:42 AM');
    }
  }

  var gridHead = el.tGrid ? $$('thead th[data-c]', el.tGrid) : [];
  function renderTime(t, d) {
    var wk = t < 13 ? 0 : 1;
    var first = 2 + 7 * wk;
    var short = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var todayC = d - 6 - 7 * wk;
    gridHead.forEach(function (th, c) {
      var html = short[c] + ' <b>' + (first + c) + '</b>';
      if (th.dataset.k !== html) { th.dataset.k = html; th.innerHTML = html; }
      toggle(th, 'is-today', c === todayC);
    });
    setText(el.tWeek, 'Week of Nov ' + first);

    var dayTot = [0, 0, 0, 0, 0, 0, 0], wkTot = 0;
    [0, 1].forEach(function (r) {
      var row = $('tbody tr[data-r="' + r + '"]', el.tGrid), rt = 0;
      for (var c = 0; c < 7; c++) {
        var m = logged(wk, r, c, t);
        rt += m; dayTot[c] += m;
        var td = $('td[data-c="' + c + '"]', row);
        setText(td, m ? fmtH(m) : '–');
        toggle(td, 'is-empty', !m);
        toggle(td, 'is-today', c === todayC);
      }
      setText($('.tot', row), fmtH(rt));
      wkTot += rt;
    });
    var sum = $('tfoot tr', el.tGrid);
    for (var c = 0; c < 7; c++) {
      var td = $('td[data-c="' + c + '"]', sum);
      setText(td, dayTot[c] ? fmtH(dayTot[c]) : '–');
      toggle(td, 'is-empty', !dayTot[c]);
      toggle(td, 'is-today', c === todayC);
    }
    setText($('.tot', sum), fmtH(wkTot));

    var total = 0, w0 = 0, w1 = 0;
    for (var w = 0; w < 2; w++) { for (var r = 0; r < 2; r++) { for (var k = 0; k < 5; k++) { var v = logged(w, r, k, t); total += v; if (w) { w1 += v; } else { w0 += v; } } } }
    setText(el.tLogged, fmtH(total));
    el.tBar.style.transform = 'scaleX(' + (total / 4800).toFixed(4) + ')';
    setText(el.tUnbilled, usd(total * 250));

    if (wk === 0) {
      if (t < 6) { pill(el.tStatus, 'draft', 'calendar', 'Starts Monday'); }
      else if (t < 10.9) { pill(el.tStatus, 'draft', 'clock', 'Open'); }
      else { pill(el.tStatus, 'sent', 'check', 'Submitted'); }
    } else {
      if (t < 17.9) { pill(el.tStatus, 'draft', 'clock', 'Open'); }
      else { pill(el.tStatus, 'sent', 'check', 'Submitted'); }
    }

    var s0 = t < 6 ? ['draft', 'Not started'] : t < 10.9 ? ['draft', 'Open · logging'] : t < 13.15 ? ['sent', 'Submitted · Nov 6'] : ['ok', 'Approved by Lena Park · Nov 9'];
    var s1 = t < 13 ? ['draft', 'Not started'] : t < 17.9 ? ['draft', 'Open · logging'] : t < 20.1 ? ['sent', 'Submitted · Nov 13'] : ['ok', 'Approved by Lena Park · Nov 16'];
    [[w0, s0], [w1, s1]].forEach(function (x, i) {
      var li = el.ap[i];
      setText($('.ap-h', li), fmtH(x[0]));
      var s = $('.ap-s', li);
      setAttr(s, 'data-tone', x[1][0]);
      setText(s, x[1][1]);
    });
  }

  function renderInvoice(t) {
    setText(el.invTitle, t < 20.25 ? 'Draft invoice' : 'INV-0042');
    setText(el.invMeta, t < 20.7 ? 'Northwind Co · Site build · Not sent' : 'Northwind Co · Issued Nov 16 · Due Dec 1');
    if (t < 20.7) { pill(el.invStatus, 'draft', 'file-pen-line', 'Draft'); }
    else if (t < 21.5) { pill(el.invStatus, 'sent', 'send', 'Sent'); }
    else if (t < 22.3) { pill(el.invStatus, 'sent', 'eye', 'Viewed'); }
    else { pill(el.invStatus, 'paid', 'check', 'Paid'); }

    var on0 = t >= 20.3, on1 = t >= 20.45;
    toggle(el.lines[0], 'is-on', on0);
    toggle(el.lines[1], 'is-on', on1);
    var total = (on0 ? 3000000 : 0) + (on1 ? 1200000 : 0);
    setText(el.invTotal, usd(total));
    var paid = t >= 22.3;
    toggle(el.dueRow, 'is-paid', paid);
    setText(el.dueK, paid ? 'Paid' : 'Amount due');
    setText(el.due, usd(total));

    var pay;
    if (t < 20.7) { pay = ['draft', 'file-text', 'Not sent yet · Fixed fee and approved time pulled from Site build']; }
    else if (t < 21.5) { pay = ['draft', 'send', 'Sent to Dana Whitfield, Nov 16 · Card or bank in the portal']; }
    else if (t < 22.3) { pay = ['seen', 'hourglass', 'Viewed by Dana, Nov 17 · Wait for it…']; }
    else { pay = ['paid', 'credit-card', 'Paid by card · Visa ending 1881 · Nov 18']; }
    var pk = pay.join('|');
    if (el.pay.dataset.k !== pk) {
      el.pay.dataset.k = pk;
      el.pay.setAttribute('data-tone', pay[0]);
      el.pay.innerHTML = icon(pay[1]) + '<span>' + pay[2] + '</span>';
    }

    var j1 = t >= 20.72, j2 = t >= 22.55;
    if (j1 !== last.je1) { toggle(el.je1, 'is-on', j1); if (j1 && last.je1 === false) { land(el.je1); } last.je1 = j1; }
    if (j2 !== last.je2) { toggle(el.je2, 'is-on', j2); if (j2 && last.je2 === false) { land(el.je2); } last.je2 = j2; }
  }

  var lastActCount = -1;
  function renderActivity(t) {
    var views = VIEWS.filter(function (v) { return t >= v; }).length;
    var list = EVENTS.filter(function (e) { return t >= e.at; });
    var key = list.length + ':' + views;
    if (key === last.act) { return; }
    last.act = key;
    var grew = list.length > lastActCount && lastActCount !== -1;
    lastActCount = list.length;
    var html = list.slice().reverse().slice(0, 7).map(function (e, i) {
      var sub = e.s === 'views' ? 'Oct 28 · ' + (views === 1 ? 'once' : views === 2 ? 'twice' : '3 times') : e.s;
      var cls = (e.paid ? 'is-paid ' : '') + (i === 0 && grew ? 'is-new' : '');
      return '<li class="' + cls + '">' + icon(e.ic) + '<p>' + e.t + '<span>' + sub + '</span></p></li>';
    }).join('');
    if (!list.length) { html = '<li>' + icon('file-pen-line') + '<p>Proposal P-0018 drafted<span>Oct 27 · Maya Ortiz</span></p></li>'; }
    el.act.innerHTML = html;
  }

  /* ---------- Live region (debounced while scrubbing) ---------- */
  var liveTimer;
  function announce(s) {
    clearTimeout(liveTimer);
    liveTimer = setTimeout(function () { setText(el.live, s); }, 700);
  }

  /* ---------- Scroll mapping ---------- */
  var L = { pinStart: 0, len: 1, navH: 64 };
  function layout() {
    L.navH = nav ? nav.offsetHeight : 64;
    if (reduced) {
      story.style.height = '';
      return;
    }
    var vh = window.innerHeight;
    var heroH = hero.offsetHeight;
    var stageH = vh - L.navH;
    L.len = Math.round(vh * (window.innerWidth < 720 ? 5 : 5.5));
    story.style.height = (heroH + stageH + L.len) + 'px';
    var storyTop = story.getBoundingClientRect().top + window.scrollY;
    L.pinStart = storyTop + heroH - L.navH;
  }

  var ticking = false;
  function onScroll() {
    if (ticking) { return; }
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY;
      toggle(nav, 'is-scrolled', y > 8);
      if (reduced) { return; }
      if (y > L.pinStart + L.len + window.innerHeight) { return; }
      render(pToT((y - L.pinStart) / L.len));
    });
  }

  function goTo(t, instant) {
    t = clamp(t, 0, 22.999);
    if (reduced) { render(t); syncSteps(); return; }
    var y = L.pinStart + tToP(t) * L.len;
    window.scrollTo({ top: Math.round(y), behavior: instant ? 'instant' : 'auto' });
  }

  /* Rail: pointer and keyboard */
  function tFromX(x) { var r = track.getBoundingClientRect(); return clamp((x - r.left) / r.width * DAYS, 0, 22.999); }
  var dragging = false;
  rail.addEventListener('pointerdown', function (e) {
    dragging = true;
    rail.setPointerCapture(e.pointerId);
    goTo(tFromX(e.clientX), true);
    e.preventDefault();
  });
  rail.addEventListener('pointermove', function (e) { if (dragging) { goTo(tFromX(e.clientX), true); } });
  rail.addEventListener('pointerup', function () { dragging = false; });
  rail.addEventListener('pointercancel', function () { dragging = false; });
  rail.addEventListener('keydown', function (e) {
    var d = Math.min(22, Math.floor(curT)), n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { n = d + 1; }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { n = d - 1; }
    else if (e.key === 'PageUp') { n = d + 7; }
    else if (e.key === 'PageDown') { n = d - 7; }
    else if (e.key === 'Home') { n = 0; }
    else if (e.key === 'End') { n = 22; }
    if (n === null) { return; }
    e.preventDefault();
    goTo(clamp(n, 0, 22) + 0.99, true);
  });

  /* Reduced motion: a stepped sequence of dated screens */
  var STEPS = [0.99, 1.99, 2.99, 3.99, 4.99, 8.99, 10.99, 13.99, 17.99, 20.99, 21.99, 22.99];
  var steps = $('#steps'), prev = $('#step-prev'), next = $('#step-next');
  function stepIndex() { for (var i = STEPS.length - 1; i >= 0; i--) { if (curT >= STEPS[i] - 0.5) { return i; } } return 0; }
  function syncSteps() {
    if (!reduced) { return; }
    var i = stepIndex();
    prev.disabled = i === 0;
    next.disabled = i === STEPS.length - 1;
  }
  prev.addEventListener('click', function () { var i = stepIndex(); render(STEPS[Math.max(0, i - 1)]); syncSteps(); });
  next.addEventListener('click', function () { var i = stepIndex(); render(STEPS[Math.min(STEPS.length - 1, i + 1)]); syncSteps(); });

  function applyMode() {
    doc.classList.toggle('rm', reduced);
    steps.hidden = !reduced;
    layout();
    if (reduced) { render(Math.max(0.99, curT)); syncSteps(); }
    else { onScroll(); }
  }
  if (rmQuery && rmQuery.addEventListener) {
    rmQuery.addEventListener('change', function (e) { reduced = e.matches; applyMode(); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  var rsz;
  window.addEventListener('resize', function () {
    clearTimeout(rsz);
    rsz = setTimeout(function () { layout(); render(curT); onScroll(); }, 80);
  });

  render(0);
  applyMode();
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { layout(); onScroll(); render(curT); }); }

  /* ---------- Books as of ---------- */
  var asof = $('#asof'), aTrack = $('#asof-track'), aThumb = $('#asof-thumb');
  var b = {
    label: $('#asof-label'), ag: $('#ag-body'), agTotal: $('#ag-total'), agNote: $('#ag-note'),
    range: $('#pl-range'), acc: $('#pl-acc'), cash: $('#pl-cash'), accN: $('#pl-acc-n'), cashN: $('#pl-cash-n'), plNote: $('#pl-note'),
    entries: $$('#jl .jl-e'), empty: $('#jl-empty'), quick: $$('[data-asof]')
  };
  var asofDay = 21, lastAsof = null;
  function renderBooks(a) {
    asofDay = a;
    var lab = label(a);
    setText(b.label, weekday(a) + ', ' + lab + ', 2026');
    aThumb.style.transform = 'translateX(' + (a / DAYS * aTrack.clientWidth).toFixed(1) + 'px)';
    aTrack.style.setProperty('--ap', ((a + 1) / DAYS * 100).toFixed(2) + '%');
    b.quick.forEach(function (q) { setAttr(q, 'aria-pressed', String(+q.dataset.asof === a)); });

    var ag, total, note;
    if (a < 20) {
      ag = '<tr class="is-zero"><th scope="row" colspan="3">Nothing receivable on ' + lab + '</th><td class="num">$0.00</td><td class="num">$0.00</td></tr>';
      total = 0;
      note = a < 3 ? 'P-0018 is out with Dana. A proposal is not a receivable.' : 'Hours are logged, not billed. Work in progress is not a receivable either.';
    } else if (a < 22) {
      ag = '<tr><th scope="row">Northwind Co</th><td>INV-0042</td><td>Dec 1</td><td class="num">$42,000.00</td><td class="num">$0.00</td></tr>';
      total = 4200000;
      note = 'INV-0042 was issued Nov 16 and is not due until Dec 1.';
    } else {
      ag = '<tr class="is-zero"><th scope="row">Northwind Co</th><td>INV-0042</td><td>Paid</td><td class="num">$0.00</td><td class="num">$0.00</td></tr>';
      total = 0;
      note = 'Settled Nov 18 by card. JE-1042 closed the receivable; nothing was deleted.';
    }
    if (b.ag.dataset.k !== ag) { b.ag.dataset.k = ag; b.ag.innerHTML = ag; }
    setText(b.agTotal, usd(total));
    setText(b.agNote, note);

    setText(b.range, 'Oct 27 to ' + lab);
    var acc = a >= 20 ? 4200000 : 0, cash = a >= 22 ? 4200000 : 0;
    setText(b.acc, usd(acc)); setText(b.accN, usd(acc));
    setText(b.cash, usd(cash)); setText(b.cashN, usd(cash));
    setText(b.plNote, a < 20 ? 'Nothing earned on paper or in the bank yet.' : a < 22 ? 'Accrual counts the sale when invoiced. Cash waits for the money.' : 'Both bases agree once the money lands.');

    var f = function (c) { return (c / 100).toLocaleString('en-US', { minimumFractionDigits: 2 }); };
    var bank = a >= 22 ? 4200000 : 0, ar = a >= 20 && a < 22 ? 4200000 : 0, rev = a >= 20 ? 4200000 : 0;
    setText($('#tb-bank'), f(bank)); setText($('#tb-ar'), f(ar)); setText($('#tb-rev'), f(rev));
    setText($('#tb-dr'), f(bank + ar)); setText($('#tb-cr'), f(rev));
    var any = false;
    b.entries.forEach(function (e) {
      var on = a >= +e.dataset.from;
      var was = !e.hidden;
      e.hidden = !on;
      if (on) { any = true; if (!was && lastAsof !== null) { land(e); } }
    });
    b.empty.hidden = any;
    lastAsof = a;

    setAttr(asof, 'aria-valuenow', a);
    setAttr(asof, 'aria-valuetext', weekday(a) + ', ' + lab + ': ' + usd(total) + ' receivable');
  }
  if (asof) {
    var aDrag = false;
    var aFromX = function (x) { var r = aTrack.getBoundingClientRect(); return clamp(Math.floor((x - r.left) / r.width * DAYS), 0, 22); };
    asof.addEventListener('pointerdown', function (e) { aDrag = true; asof.setPointerCapture(e.pointerId); renderBooks(aFromX(e.clientX)); e.preventDefault(); asof.focus({ preventScroll: true }); });
    asof.addEventListener('pointermove', function (e) { if (aDrag) { var n = aFromX(e.clientX); if (n !== asofDay) { renderBooks(n); } } });
    asof.addEventListener('pointerup', function () { aDrag = false; });
    asof.addEventListener('pointercancel', function () { aDrag = false; });
    asof.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { n = asofDay + 1; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { n = asofDay - 1; }
      else if (e.key === 'PageUp') { n = asofDay + 7; }
      else if (e.key === 'PageDown') { n = asofDay - 7; }
      else if (e.key === 'Home') { n = 0; }
      else if (e.key === 'End') { n = 22; }
      if (n === null) { return; }
      e.preventDefault();
      renderBooks(clamp(n, 0, 22));
    });
    b.quick.forEach(function (q) { q.addEventListener('click', function () { renderBooks(+q.dataset.asof); }); });
    renderBooks(21);
    window.addEventListener('resize', function () { renderBooks(asofDay); });
  }

  /* ---------- Sections that run once in view ---------- */
  $$('.seat .seat-dot').forEach(function (d, i) { d.style.setProperty('--i', i); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-run'); io.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    [$('#priv-demo'), $('.seats')].forEach(function (n) { if (n) { io.observe(n); } });
  } else {
    $$('#priv-demo, .seats').forEach(function (n) { n.classList.add('is-run'); });
  }

  /* ---------- Playbook ---------- */
  var q = $('#pb-q'), opts = $$('#pb-list [role="option"]'), none = $('#pb-none');
  var pv = { box: $('#pb-prev'), ic: $('#pb-prev .pb-ic use'), n: $('#pb-prev .pb-pn'), d: $('#pb-prev .pb-pd'), where: $('#pb-where'), posts: $('#pb-posts'), story: $('#pb-story') };
  var sel = 1;
  function visible() { return opts.filter(function (o) { return !o.hidden; }); }
  function select(i, quiet) {
    sel = i;
    var o = opts[i];
    opts.forEach(function (x) { setAttr(x, 'aria-selected', String(x === o)); });
    if (!o) { return; }
    q.setAttribute('aria-activedescendant', o.id);
    pv.ic.setAttribute('href', $('use', o).getAttribute('href'));
    setText(pv.n, $('.pb-n', o).textContent);
    setText(pv.d, $('.pb-d', o).textContent);
    setText(pv.where, o.dataset.where);
    setText(pv.posts, o.dataset.posts === 'yes' ? 'Yes, through the same ledger' : 'No, it reads or prepares them');
    setText(pv.story, o.dataset.story || '');
    if (!quiet) { land(pv.box); }
  }
  if (q) {
    opts.forEach(function (o, i) {
      o.addEventListener('click', function () { select(i); });
    });
    q.addEventListener('input', function () {
      var s = q.value.trim().toLowerCase();
      opts.forEach(function (o) { o.hidden = !!s && o.textContent.toLowerCase().indexOf(s) === -1; });
      var v = visible();
      none.hidden = v.length > 0;
      if (v.length && v.indexOf(opts[sel]) === -1) { select(opts.indexOf(v[0])); }
    });
    q.addEventListener('keydown', function (e) {
      var v = visible(), at = v.indexOf(opts[sel]);
      if (!v.length) { return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); select(opts.indexOf(v[Math.min(v.length - 1, at + 1)])); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); select(opts.indexOf(v[Math.max(0, at - 1)])); }
      else if (e.key === 'Escape') { q.value = ''; q.dispatchEvent(new Event('input')); }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        q.focus({ preventScroll: true });
        q.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }
    });
    select(1, true);
  }

  /* ---------- Waitlist ---------- */
  $$('form[data-join]').forEach(function (form) {
    var input = $('input', form), btn = $('button', form), msg = $('.join-msg', form);
    var original = msg.innerHTML;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.dataset.done) { return; }
      var v = input.value.trim();
      var err = !v ? 'Enter your work email so we can send the invite.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Missing the @ or the domain. Try you@studio.com.' : '';
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
})();
