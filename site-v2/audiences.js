/* Ledgendary v2, audience pages. Plain JS, no dependencies. Every figure here is demo data. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const icon = (name) => `<svg class="ic" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const money = (cents, sym = '$') => sym + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dur = (min) => `${Math.floor(min / 60)} h ${min % 60} m`;
  const flash = (node, cls = 'is-flash') => {
    if (!node || reduced()) return;
    node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls);
  };
  const x = (root, k) => $(`[data-x="${k}"]`, root);

  /* ================================================================ PLAY ENGINE
     A play is a short sequence of actions the visitor performs. Each action is
     triggered by a [data-act] control (or by the idle timer when the play has
     been on screen, untouched, for a while). Reduced motion opens on the end. */
  const plays = {};
  function Play(root, cfg) {
    const n = cfg.acts.length;
    const p = { root, i: 0, timers: [], visible: false, idleT: 0, data: {} };
    const chip = $('.chip', root);
    const role = $('[data-chip-role]', root);
    const text = $('[data-chip-text]', root);
    const live = $('[data-live]', root);
    const restart = $('[data-play-restart]', root);
    const start = $('[data-play-start]', root);
    const trackKey = root.dataset.trackFor;
    const track = trackKey ? $$(`[data-track="${trackKey}"] li`) : [];

    p.after = (fn, ms) => { p.timers.push(window.setTimeout(fn, ms)); };
    p.say = (msg) => { if (!live) return; live.textContent = ''; window.setTimeout(() => { live.textContent = msg; }, 30); };
    const clear = () => { p.timers.forEach(clearTimeout); p.timers = []; clearTimeout(p.idleT); };

    const setChip = () => {
      const c = cfg.chips[p.i];
      if (!c || !role) return;
      role.textContent = c[0];
      text.textContent = c[1];
      if (!reduced()) { chip.classList.remove('is-swap'); void chip.offsetWidth; chip.classList.add('is-swap'); }
    };

    const mark = () => {
      root.dataset.step = String(p.i);
      const cur = cfg.acts[p.i];
      $$('[data-act]', root).forEach((b) => {
        const on = !!cur && b.dataset.act === cur.key && !cur.auto;
        if (b.matches('input')) return;
        b.disabled = !on;
        b.classList.toggle('is-armed', on && b.classList.contains('btn'));
      });
      track.forEach((li, j) => {
        li.classList.toggle('is-done', j < p.i || p.i >= n);
        li.classList.toggle('is-now', j === p.i && p.i < n);
        if (j === p.i && p.i < n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      if (cfg.mark) cfg.mark(p);
    };

    const focusNext = () => {
      const cur = cfg.acts[p.i];
      const target = cur && !cur.auto ? $(`[data-act="${cur.key}"]:not([hidden])`, root) : null;
      (target || restart || root).focus({ preventScroll: true });
    };

    p.advance = (opts = {}) => {
      if (p.i >= n) return;
      const hadFocus = root.contains(document.activeElement) && opts.user;
      const a = cfg.acts[p.i];
      a.run(p, opts);
      p.i += 1;
      setChip();
      mark();
      if (a.say) p.say(typeof a.say === 'function' ? a.say(p) : a.say);
      const nx = cfg.acts[p.i];
      if (nx && nx.auto != null) p.after(() => p.advance(), reduced() ? 0 : nx.auto);
      if (hadFocus && (document.activeElement === document.body || document.activeElement.disabled || document.activeElement.hidden)) focusNext();
      armIdle();
    };

    p.reset = () => {
      clear();
      p.i = 0; p.data = {};
      cfg.reset(p);
      setChip();
      mark();
      armIdle();
    };

    function armIdle() {
      clearTimeout(p.idleT);
      if (reduced() || !p.visible || p.i >= n) return;
      const cur = cfg.acts[p.i];
      if (cur.auto != null || cur.noIdle) return;
      p.idleT = window.setTimeout(() => { if (p.visible) p.advance({ idle: true }); }, cfg.idle || 8000);
    }
    p.armIdle = armIdle;

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b || b.disabled || !root.contains(b)) return;
      const cur = cfg.acts[p.i];
      if (cur && b.dataset.act === cur.key && !b.matches('input')) p.advance({ user: true, el: b });
    });
    ['pointerdown', 'keydown', 'input'].forEach((ev) => root.addEventListener(ev, armIdle, { passive: true }));
    if (restart) restart.addEventListener('click', (e) => { p.reset(); p.say(cfg.restartSay || 'Started over.'); if (e.detail === 0) focusNext(); });
    if (start) start.addEventListener('click', () => { start.hidden = true; restart.hidden = false; p.reset(); p.say(cfg.restartSay || 'Started over.'); focusNext(); });

    new IntersectionObserver(([en]) => {
      p.visible = en.isIntersecting;
      if (p.visible) armIdle(); else clearTimeout(p.idleT);
    }, { threshold: cfg.threshold || 0.45 }).observe(root);

    p.reset();

    if (reduced()) {
      while (p.i < n) p.advance({ idle: true });
      clear();
      if (start && restart) { start.hidden = false; restart.hidden = true; }
      if (live) live.textContent = '';
    }
    plays[root.dataset.play] = p;
    return p;
  }
  const play = (name, cfg) => { const root = $(`[data-play="${name}"]`); if (root) Play(root, cfg); };

  /* small helper: a single-select segmented radiogroup with arrow keys */
  function segmented(group, onPick) {
    const btns = $$('[role="radio"]', group);
    const pick = (b, focus) => {
      btns.forEach((x2) => { const on = x2 === b; x2.setAttribute('aria-checked', String(on)); x2.tabIndex = on ? 0 : -1; });
      if (focus) b.focus();
      onPick(b);
    };
    btns.forEach((b, i) => {
      b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1;
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        pick(btns[(i + d + btns.length) % btns.length], true);
      });
    });
    return { pick, btns };
  }

  /* ================================================================ SOLO */

  /* Hero: remind, post the late fee, wait for it, paid */
  play('solo-hero', {
    chips: [
      ["You're Maya", 'Ferro is 14 days late. Send the reminder.'],
      ['Reminder sent', 'Now post the 5% late fee.'],
      ['Fee posted', 'wait for it…'],
      ['Paid.', "Kids, that's how I stopped chasing invoices."],
    ],
    restartSay: "Started over. You're Maya: send Ferro the reminder.",
    acts: [
      {
        key: 'remind',
        run: (p) => {
          const r = p.root;
          x(r, 'sched3').dataset.s = 'ok';
          $('.ck-i', x(r, 'sched3')).innerHTML = icon('check');
          x(r, 'sched3-t').textContent = 'Today · reminder sent';
          x(r, 'status-line').innerHTML = `${icon('mail-check')}<span>Reminder sent to Ferro: $2,400.00, 14 days late.</span>`;
          $('[data-act="remind"]', r).hidden = true;
          $('[data-act="fee"]', r).hidden = false;
        },
        say: 'Reminder sent to Ferro. Now post the late fee.',
      },
      {
        key: 'fee',
        run: (p) => {
          const r = p.root;
          const row = x(r, 'feerow');
          row.classList.remove('is-pending');
          x(r, 'feename').firstChild.textContent = 'Late fee, 5% of $2,400.00';
          x(r, 'feenote').textContent = 'Posted as its own entry, JE-0215';
          x(r, 'feeqty').textContent = '1';
          x(r, 'feeamt').textContent = '$120.00';
          flash(row, 'is-in');
          x(r, 'total').textContent = '$2,520.00';
          flash(x(r, 'total'));
          x(r, 'sched3-t').textContent = 'Today · reminder sent, fee posted';
          x(r, 'books').innerHTML = `${icon('book-open')}<span>JE-0215 posted · Accounts receivable / Late fee income, $120.00. JE-0188 untouched.</span>`;
          $('[data-act="fee"]', r).hidden = true;
          x(r, 'waitbtn').hidden = false;
          x(r, 'status-line').className = 'inv-status is-wait';
          x(r, 'status-line').innerHTML = `${icon('hourglass')}<span>Ferro sees $2,520.00 due · wait for it</span><span class="wait-dots" aria-hidden="true"><i></i><i></i><i></i></span>`;
        },
        say: 'Late fee of $120.00 posted as its own entry. Total due $2,520.00. Wait for it.',
      },
      {
        key: 'paid',
        auto: 2800,
        run: (p) => {
          const r = p.root;
          r.classList.add('is-paid');
          const st = x(r, 'status');
          st.className = 'pill pill-paid'; st.textContent = 'Paid';
          x(r, 'waitbtn').innerHTML = `${icon('check')}Paid`;
          x(r, 'status-line').className = 'inv-status is-paid';
          x(r, 'status-line').innerHTML = `${icon('landmark')}<span>Paid in the client portal by bank transfer · Nov 18</span>`;
          const b = x(r, 'books');
          b.className = 'books-row is-posted';
          b.innerHTML = `${icon('circle-check')}<span><b class="posted">Posted to the books</b> JE-0216 · Bank / Accounts receivable, $2,520.00 · chained #5e02</span>`;
        },
        say: 'Paid. $2,520.00 by bank transfer, posted as JE-0216.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      r.classList.remove('is-paid');
      const st = x(r, 'status'); st.className = 'pill pill-warn'; st.textContent = '14 days late';
      $('[data-act="remind"]', r).hidden = false;
      $('[data-act="fee"]', r).hidden = true;
      const wb = x(r, 'waitbtn'); wb.hidden = true; wb.innerHTML = `${icon('hourglass')}Waiting`;
      const row = x(r, 'feerow'); row.className = 'is-pending';
      x(r, 'feename').firstChild.textContent = 'Late fee, 5% once 14 days late';
      x(r, 'feenote').textContent = 'Not posted. The line above never changes.';
      x(r, 'feeqty').textContent = '0';
      x(r, 'feeamt').textContent = '$0.00';
      x(r, 'total').textContent = '$2,400.00';
      x(r, 'sched3').dataset.s = 'now';
      $('.ck-i', x(r, 'sched3')).innerHTML = icon('bell-ring');
      x(r, 'sched3-t').textContent = 'Today · ready to go';
      const sl = x(r, 'status-line'); sl.className = 'inv-status';
      sl.innerHTML = `${icon('bell')}<span>Two reminders sent, Nov 4 and Nov 11. No reply yet.</span>`;
      const b = x(r, 'books'); b.className = 'books-row';
      b.innerHTML = `${icon('book-open')}<span>Books · JE-0188 holds the original $2,400.00. Nothing else posted.</span>`;
    },
  });

  /* Proposal: pick an option as Dana, sign, the invoice drafts itself */
  (() => {
    const root = $('[data-play="solo-prop"]');
    if (!root) return;
    const OPTS = {
      A: { lines: [['Essentials, fixed fee', 'From option A', '1', '$6,000.00', '$6,000.00']], total: '$6,000.00', retainer: false },
      B: { lines: [['Full refresh, fixed fee', 'From option B', '1', '$6,500.00', '$6,500.00'], ['Design time, Nov 2–13', 'From logged time · estimate was 20 h', '20 h 0 m', '$150.00', '$3,000.00']], total: '$9,500.00', retainer: false },
      C: { lines: [['Full refresh, fixed fee', 'From option C', '1', '$6,500.00', '$6,500.00'], ['Design time, Nov 2–13', 'From logged time · estimate was 20 h', '20 h 0 m', '$150.00', '$3,000.00']], total: '$9,500.00', retainer: true },
    };
    const radios = $$('input[name="p7"]', root);
    radios[1].dataset.act = 'pick';
    const opts = x(root, 'opts');
    let pRef;
    const choose = (key) => {
      if (!pRef || pRef.i !== 0) return;
      pRef.data.opt = key;
      pRef.advance({ user: true });
    };
    radios.forEach((r) => r.addEventListener('change', () => choose(r.value)));
    pRef = Play(root, {
      idle: 9000,
      chips: [
        ["You're Dana, the client", 'Pick one.'],
        ['Picked', 'Now sign it.'],
        ['Signed.', "Maya's side: the invoice drafted itself."],
      ],
      restartSay: "Started over. You're Dana: pick an option.",
      acts: [
        {
          key: 'pick',
          run: (p) => {
            const k = p.data.opt || 'B';
            p.data.opt = k;
            radios.forEach((r) => { r.checked = r.value === k; r.closest('.popt').classList.toggle('is-chosen', r.value === k); });
          },
          say: (p) => `Option ${p.data.opt} picked. Now sign it.`,
        },
        {
          key: 'sign',
          run: (p) => {
            const o = OPTS[p.data.opt];
            opts.classList.add('is-locked');
            radios.forEach((r) => { r.disabled = true; });
            $('[data-act="sign"]', root).hidden = true;
            x(root, 'signed').hidden = false;
            $$('[data-k="opt"]', root).forEach((el) => { el.textContent = p.data.opt; });
            x(root, 'lines').innerHTML = o.lines.map(([n, s, q, rt, a]) => `<tr><td>${n}<small>${s}</small></td><td class="num">${q}</td><td class="num">${rt}</td><td class="num">${a}</td></tr>`).join('');
            x(root, 'ptotal').textContent = o.total;
            x(root, 'retainer').hidden = !o.retainer;
            x(root, 'crumb').textContent = 'INV-0012';
            x(root, 'inv').dataset.state = 'full';
          },
          say: (p) => `Signed. INV-0012 drafted from option ${p.data.opt}, ${OPTS[p.data.opt].total}.`,
        },
      ],
      mark: (p) => { radios.forEach((r) => { r.disabled = p.i !== 0; }); },
      reset: () => {
        radios.forEach((r) => { r.checked = false; r.closest('.popt').classList.remove('is-chosen'); });
        opts.classList.remove('is-locked');
        $('[data-act="sign"]', root).hidden = false;
        x(root, 'signed').hidden = true;
        x(root, 'crumb').textContent = 'Northwind Co';
        x(root, 'inv').dataset.state = 'empty';
      },
    });
  })();

  /* Time: accept the private draft, the invoice line follows */
  play('solo-time', {
    idle: 9000,
    chips: [
      ["You're Maya", 'A private draft is waiting. Accept it.'],
      ['Accepted', 'True story: an hour from your calendar, and nobody else saw it.'],
    ],
    restartSay: "Started over. You're Maya: accept the calendar draft.",
    acts: [
      {
        key: 'accept',
        run: (p) => {
          const r = p.root;
          x(r, 'wed').textContent = '2 h 30 m'; flash(x(r, 'wed'));
          x(r, 'wk').textContent = '10 h 0 m';
          x(r, 'unb-wk').textContent = '10 h 0 m';
          x(r, 'unb').textContent = '20 h 0 m';
          x(r, 'qty').textContent = '20 h 0 m';
          x(r, 'amt').textContent = '$3,000.00'; flash(x(r, 'amt'));
          x(r, 'itotal').textContent = '$9,500.00'; flash(x(r, 'itotal'));
          const d = x(r, 'draft');
          d.className = 'draft-row is-accepted';
          $('.ic use', d).setAttribute('href', '#i-circle-check');
          x(r, 'draft-t').innerHTML = '<b>Northwind review call</b> is now 1 h 0 m of your Wednesday. The title and duration came in; nothing else did.';
          $('[data-act="accept"]', r).hidden = true;
        },
        say: 'Accepted. 20 hours unbilled; the invoice line is $3,000.00 and INV-0012 totals $9,500.00.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      x(r, 'wed').textContent = '1 h 30 m';
      x(r, 'wk').textContent = '9 h 0 m';
      x(r, 'unb-wk').textContent = '9 h 0 m';
      x(r, 'unb').textContent = '19 h 0 m';
      x(r, 'qty').textContent = '19 h 0 m';
      x(r, 'amt').textContent = '$2,850.00';
      x(r, 'itotal').textContent = '$9,350.00';
      const d = x(r, 'draft');
      d.className = 'draft-row';
      $('.ic use', d).setAttribute('href', '#i-lock');
      x(r, 'draft-t').innerHTML = '<b>Northwind review call · 1 h 0 m</b>, Wed. A private draft from your calendar. Only you can see it.';
      $('[data-act="accept"]', r).hidden = false;
    },
  });

  /* Retainer: run the scheduler again, nothing new is issued */
  play('solo-ret', {
    idle: 9000,
    chips: [
      ["You're the scheduler", 'Run November again.'],
      ['Ran twice', 'Still one November invoice.'],
    ],
    restartSay: 'Started over. Run November again.',
    acts: [
      {
        key: 'rerun',
        run: (p) => {
          const r = p.root;
          x(r, 'runs').textContent = '2'; flash(x(r, 'runs'));
          const li = x(r, 'logph');
          li.className = 'is-new';
          li.innerHTML = `<span class="ck-i" aria-hidden="true">${icon('ban')}</span><span class="when">Nov 18, now</span><span class="what"><b>Nothing issued.</b> November already has INV-0011.</span><span class="amt">$0.00</span>`;
        },
        say: 'Ran November again. Nothing issued: November already has INV-0011. Still one invoice.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      x(r, 'runs').textContent = '1';
      const li = x(r, 'logph');
      li.className = 'is-ph';
      li.innerHTML = '<span class="ck-i" aria-hidden="true"></span><span class="when">Next run</span><span class="what">Dec 1, 6:00 a.m. for December</span><span class="amt">$800.00</span>';
    },
  });

  /* Spend: paying the bill moves cash, not spend */
  play('solo-spend', {
    idle: 9000,
    chips: [
      ["You're Maya", "Pay the type foundry's bill."],
      ['Paid', 'Counted once, on purpose.'],
    ],
    restartSay: "Started over. Pay the type foundry's bill.",
    acts: [
      {
        key: 'pay',
        run: (p) => {
          const r = p.root;
          const pill = x(r, 'billpill'); pill.className = 'pill pill-paid'; pill.textContent = 'Paid';
          x(r, 'billmeta').textContent = 'Booked Nov 6 · paid Nov 18 · Accounts payable / Bank';
          const o = x(r, 'spendout');
          o.classList.add('is-on');
          o.innerHTML = `${icon('circle-check')}<span>Still <b>$1,124.00</b>. The payment moved cash; it didn't add a $480.00 expense. Counting it twice would say $1,604.00.</span>`;
          $('[data-act="pay"]', r).hidden = true;
        },
        say: 'Bill paid. Spend this month is still $1,124.00; the payment did not create an expense.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      const pill = x(r, 'billpill'); pill.className = 'pill'; pill.textContent = 'Unpaid';
      x(r, 'billmeta').textContent = 'Booked Nov 6 · due Nov 20';
      const o = x(r, 'spendout');
      o.classList.remove('is-on');
      o.innerHTML = `${icon('scale')}<span>Spend this month: <b>$1,124.00</b>. Expenses $644.00 plus the bill, $480.00.</span>`;
      $('[data-act="pay"]', r).hidden = false;
    },
  });

  /* As-of report (solo books) */
  (() => {
    const win = $('[data-asof]');
    if (!win) return;
    const DATA = {
      oct: {
        cap: 'Receivables as of Oct 31, 2026',
        rows: [['INV-0009', 'Halcyon · October retainer', 'Oct 31', 'Due today', '$800.00'], ['INV-0010', 'Ferro', 'Nov 4', 'Not yet due', '$2,400.00']],
        total: '$3,200.00',
        note: 'Rebuilt from the entries dated on or before Oct 31. INV-0011 and INV-0012 did not exist yet, so they are not here.',
      },
      now: {
        cap: 'Receivables as of Nov 18, 2026',
        rows: [['INV-0011', 'Halcyon · November retainer', 'Dec 1', 'Not yet due', '$800.00']],
        total: '$800.00',
        note: 'Halcyon paid October on Nov 3. Ferro and Northwind paid on Nov 18.',
      },
    };
    const rows = $('[data-asof-rows]', win);
    const render = (k, anim) => {
      const d = DATA[k];
      rows.innerHTML = d.rows.map(([no, who, due, age, amt]) => `<tr${anim ? ' class="is-in"' : ''}><td><b>${no}</b><small>${who}</small></td><td>${due}</td><td class="hide-sm">${age}</td><td class="num">${amt}</td></tr>`).join('');
      $('[data-asof-total]', win).textContent = d.total;
      $('[data-asof-cap]', win).textContent = d.cap;
      $('[data-asof-note]', win).textContent = d.note;
      if (anim) flash($('[data-asof-total]', win));
    };
    segmented($('.seg', win), (b) => render(b.dataset.asofKey, !reduced()));
    render('now', false);
  })();

  /* Milestones switch */
  (() => {
    const ms = $('[data-ms]');
    if (!ms) return;
    const sw = $('[data-ms-switch]', ms);
    const list = $('[data-ms-list]', ms);
    const up = $('[data-ms-up]', ms);
    const msg = $('[data-ms-msg]', ms);
    const cele = $('[data-ms-cele]', ms);
    const set = (on) => {
      sw.setAttribute('aria-checked', String(on));
      list.classList.toggle('is-on', on);
      cele.classList.toggle('is-on', on);
      up.hidden = !on;
      msg.textContent = on ? 'Two badges earned already. One more on-time payment for the next.' : 'Turn milestones on to see what you\'ve already earned.';
    };
    sw.addEventListener('click', () => set(sw.getAttribute('aria-checked') !== 'true'));
    if (reduced()) set(true);
  })();

  /* expose for the other pages' controllers below */
  window.__aud = { $, $$, x, icon, money, dur, flash, reduced, Play, play, segmented, plays };
})();

/* ================================================================ TEAM */
(() => {
  'use strict';
  const A = window.__aud;
  if (!A) return;
  const { $, $$, x, icon, flash, reduced, play, segmented } = A;

  /* Hero: approve both weeks, bill the time, then try to change an invoiced entry */
  play('team-hero', {
    chips: [
      ["You're Sam, admin", 'Priya submitted her week. Approve it.'],
      ['Approved and locked', "Now Theo's."],
      ['Week approved', 'Bill the approved time.'],
      ["Now you're Theo", 'Try to change Wednesday.'],
      ['Locked.', 'The playbook: approve, bill, lock.'],
    ],
    restartSay: "Started over. You're Sam: approve Priya's week.",
    acts: [
      {
        key: 'ok-pn',
        run: (p) => {
          const r = p.root;
          $('[data-act="ok-pn"]', r).hidden = true; x(r, 'lk-pn').hidden = false; flash(x(r, 'lk-pn'));
          x(r, 'st-pn').textContent = 'Approved by Sam';
        },
        say: "Priya's week approved and locked. Now Theo's.",
      },
      {
        key: 'ok-tb',
        run: (p) => {
          const r = p.root;
          $('[data-act="ok-tb"]', r).hidden = true; x(r, 'lk-tb').hidden = false; flash(x(r, 'lk-tb'));
          x(r, 'st-tb').textContent = 'Approved by Sam';
          x(r, 'wk2-l').textContent = 'Nov 9–15 · approved';
          x(r, 'wk2').textContent = '38 h 15 m'; flash(x(r, 'wk2'));
          x(r, 'ready').textContent = '80 h 0 m'; flash(x(r, 'ready'));
        },
        say: 'Week approved. 80 hours ready to bill.',
      },
      {
        key: 'bill',
        run: (p) => {
          const r = p.root;
          x(r, 'pane-unb').hidden = true;
          const inv = x(r, 'pane-inv'); inv.hidden = false;
          x(r, 'who').textContent = 'TB'; x(r, 'who').className = 'av av-tb';
          if (!reduced()) { inv.classList.remove('is-in'); void inv.offsetWidth; inv.classList.add('is-in'); }
          flash(x(r, 'inv-total'));
        },
        say: 'Billed. INV-0042 drafted: $30,000.00 fixed fee plus 80 hours at $150.00, $42,000.00.',
      },
      {
        key: 'edit',
        run: (p) => {
          const r = p.root;
          x(r, 'lockzone').innerHTML = `<p class="refuse">${icon('lock')}<span>Locked: approved, and on INV-0042. <span>Hours, project, date and billable stay as billed. A note is still open.</span></span></p>`;
        },
        say: 'Refused. The entry is approved and invoiced on INV-0042. Hours stay as billed; a note is still open.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      ['pn', 'tb'].forEach((k) => {
        $(`[data-act="ok-${k}"]`, r).hidden = false; x(r, `lk-${k}`).hidden = true;
        x(r, `st-${k}`).textContent = 'Submitted Nov 13';
      });
      x(r, 'who').textContent = 'SO'; x(r, 'who').className = 'av av-so';
      x(r, 'wk2-l').textContent = 'Nov 9–15 · waiting for approval';
      x(r, 'wk2').textContent = '0 h 0 m';
      x(r, 'ready').textContent = '41 h 45 m';
      x(r, 'pane-unb').hidden = false;
      x(r, 'pane-inv').hidden = true;
      x(r, 'lockzone').innerHTML = `<p class="note-line">${icon('clock')}<span style="flex:1">Theo · Wed Nov 11 · 3 h 45 m · on INV-0042</span><button class="tbtn" type="button" data-act="edit">${icon('pen-line')}Change hours</button></p>`;
    },
  });

  /* Seats: one screen through four seats */
  (() => {
    const win = $('[data-seats]');
    if (!win) return;
    const P = [
      ['Northwind Co', 'Site build', ['TB', 'PN'], 'Invoiced'],
      ['Orchard & Pine', 'Rebrand', ['TB'], 'In progress'],
      ['Kestrel Labs', 'Product launch', ['PN'], 'In progress'],
      ['Bramble Foods', 'Packaging', ['PN'], 'Proposal sent'],
    ];
    const AV = { TB: 'av-tb', PN: 'av-pn' };
    const ok = 'ok', no = 'no', step = 'step';
    const SEATS = {
      owner: { name: 'Maya Ortiz', av: ['MO', 'av-mo'], seat: 'Owner', line: 'Owns Lumen Studio and sets who sits where.', projects: [0, 1, 2, 3], note: 'Every project.', can: [ok, ok, ok, step, ok, ok] },
      admin: { name: 'Sam Okafor', av: ['SO', 'av-so'], seat: 'Administrator', line: 'Handles the money and approves weeks.', projects: [0, 1, 2, 3], note: 'Every project.', can: [ok, ok, ok, step, ok, no] },
      member: { name: 'Theo Brandt', av: ['TB', 'av-tb'], seat: 'Member', line: 'Logs time on the projects he\'s on.', projects: [0, 1], note: 'The two projects Theo is on. The others aren\'t listed for him.', can: [ok, no, no, no, no, no] },
      acct: { name: 'Jules Carter', av: ['JC', 'av-jc'], seat: 'Accountant · read only', line: 'Reads every entry and report.', projects: [0, 1, 2, 3], note: 'Every project, read only.', can: [no, no, no, no, ok, no] },
    };
    const CAN = [
      ['Log time', ''],
      ['Approve submitted weeks', ''],
      ['Send invoices, record payments', ''],
      ['Void, write off, refund', 'Asks who you are again first'],
      ['Read the books and reports', ''],
      ['Invite people and set seats', ''],
    ];
    const rows = $('[data-seat-rows]', win);
    const render = (k, anim) => {
      const s = SEATS[k];
      rows.innerHTML = s.projects.map((i) => {
        const [client, name, ppl, st] = P[i];
        return `<tr${anim ? ' class="is-in"' : ''}><td><b>${name}</b><small>${client}</small></td><td><span class="stack">${ppl.map((a) => `<span class="av ${AV[a]}" aria-hidden="true">${a}</span>`).join('')}</span><span class="sr-only">${ppl.map((a) => (a === 'TB' ? 'Theo' : 'Priya')).join(', ')}</span></td><td class="num">${st}</td></tr>`;
      }).join('');
      $('[data-seat-note]', win).textContent = s.note;
      $('[data-seat-cap]', win).textContent = `Projects ${s.name} sees`;
      $('[data-seat-who]', win).innerHTML = `<span class="av ${s.av[1]}" aria-hidden="true">${s.av[0]}</span><span><b>${s.name}</b><span>${s.seat} · ${s.line}</span></span>`;
      $('[data-seat-can]', win).innerHTML = CAN.map(([t, sub], i) => {
        const v = s.can[i];
        const ic = v === no ? 'x' : v === step ? 'key-round' : 'check';
        const sr = v === no ? 'Not in this seat: ' : v === step ? 'Yes, with a second check: ' : 'Yes: ';
        return `<li data-s="${v}"><span class="ck-i" aria-hidden="true">${icon(ic)}</span><span><span class="sr-only">${sr}</span>${t}${v === step && sub ? `<small>${sub}</small>` : ''}</span></li>`;
      }).join('');
      if (anim) { const w = $('[data-seat-who]', win); w.classList.remove('is-swap'); void w.offsetWidth; w.classList.add('is-swap'); }
    };
    segmented($('.seg', win), (b) => render(b.dataset.seat, !reduced()));
    render('owner', false);
  })();

  /* Time: Theo accepts his draft and submits; Maya's view never shows the draft */
  (() => {
    const root = $('[data-play="team-time"]');
    if (!root) return;
    const DAYS = ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20'];
    const BASE = [
      { name: 'Rebrand', mins: [360, 315, 180, 0, 0] },
      { name: 'Site build', mins: [0, 120, 90, 0, 0] },
    ];
    const st = { viewer: 'theo', accepted: false, submitted: false };
    const tbody = x(root, 'rows');
    const draft = x(root, 'draft');
    let pRef = null;
    const render = (flashWed) => {
      tbody.innerHTML = BASE.map((row, r) => {
        const mins = row.mins.slice();
        if (r === 0 && st.accepted) mins[2] += 90;
        const cells = mins.map((m, c) => {
          const showDraft = r === 0 && c === 2 && !st.accepted && st.viewer === 'theo';
          const t = `<span class="t${m ? '' : ' is-empty'}${flashWed && r === 0 && c === 2 ? ' is-flash' : ''}">${m ? A.dur(m) : '–'}</span>`;
          return `<td data-day="${DAYS[c]}">${t}${showDraft ? `<span class="cell-draft" title="Private draft from your calendar">${icon('lock')}+1 h 30 m</span>` : ''}</td>`;
        }).join('');
        return `<tr><th scope="row">${row.name}</th>${cells}<td class="num" data-day="Total">${A.dur(mins.reduce((a, b) => a + b, 0))}</td></tr>`;
      }).join('');
      const wk = 1065 + (st.accepted ? 90 : 0);
      x(root, 'wk').textContent = A.dur(wk);
      const pill = x(root, 'wkst');
      pill.className = st.submitted ? 'pill pill-sent' : 'pill';
      pill.textContent = st.submitted ? 'Submitted · waiting for Sam or Maya' : 'In progress';
      const submit = $('[data-act="submit"]', root);
      submit.hidden = st.viewer !== 'theo' || st.submitted;
      draft.className = 'draft-row';
      if (st.viewer === 'maya') {
        draft.classList.add('is-plain');
        draft.innerHTML = `${icon('eye')}<span>Viewing as <b>Maya Ortiz</b>, owner. Theo's week: ${A.dur(wk)}${st.submitted ? ', submitted. Ready to approve.' : ', in progress.'}</span>`;
      } else if (st.accepted) {
        draft.classList.add('is-accepted');
        draft.innerHTML = `${icon('circle-check')}<span><b>Orchard &amp; Pine kickoff</b> is now 1 h 30 m on Rebrand, Wed. The title and duration came in; nothing else did.</span>`;
      } else {
        draft.innerHTML = `${icon('calendar')}<span><b>Orchard &amp; Pine kickoff · 1 h 30 m</b>, Wed. A private draft from your calendar. Only you can see it.</span><button type="button" class="tbtn" data-act="accept">${icon('check')}Accept</button>`;
      }
      if (pRef) pRef.armIdle();
    };
    const viewer = segmented($('[data-viewer]', root), (b) => { st.viewer = b.dataset.v; render(); markActs(); });
    const markActs = () => {
      if (!pRef) return;
      const cur = ['accept', 'submit'][pRef.i];
      $$('[data-act]', root).forEach((b) => { b.disabled = b.dataset.act !== cur; });
    };
    const toTheo = () => { if (st.viewer !== 'theo') viewer.pick(viewer.btns[0]); };
    pRef = A.Play(root, {
      idle: 9000,
      chips: [
        ["You're Theo", 'Accept the calendar draft.'],
        ['Accepted', 'Now submit the week.'],
        ['Submitted', 'Sam or Maya approves it from here.'],
      ],
      restartSay: "Started over. You're Theo: accept the calendar draft.",
      acts: [
        { key: 'accept', run: () => { toTheo(); st.accepted = true; render(true); }, say: 'Accepted. The week is now 19 hours 15 minutes.' },
        { key: 'submit', run: () => { toTheo(); st.submitted = true; render(); }, say: 'Week submitted. An owner or administrator approves it.' },
      ],
      mark: () => markActs(),
      reset: () => { st.accepted = false; st.submitted = false; render(); },
    });
    markActs();
  })();

  /* Step-up: void asks who you are again */
  play('team-su', {
    idle: 9000,
    chips: [
      ["You're Sam, admin", 'INV-0040 went out by mistake. Void it.'],
      ['Hold on', 'Confirm it\'s you.'],
      ['Voided', 'True story: it was you.'],
    ],
    restartSay: "Started over. You're Sam: void INV-0040.",
    acts: [
      {
        key: 'void',
        run: (p) => {
          const su = x(p.root, 'su');
          su.hidden = false;
          if (!reduced()) { su.classList.remove('is-in'); void su.offsetWidth; su.classList.add('is-in'); }
        },
        say: 'Voiding takes $4,625.00 off the books. Confirm it is you: passkey, password or an emailed code.',
      },
      {
        key: 'confirm',
        run: (p) => {
          const r = p.root;
          x(r, 'su').hidden = true;
          const pill = x(r, 'st'); pill.className = 'pill pill-bad'; pill.textContent = 'Void';
          $('[data-act="void"]', r).hidden = true;
          const f = x(r, 'foot');
          f.className = 'wfoot is-posted';
          f.innerHTML = `${icon('circle-check')}<span><b class="posted">Reversed today</b> Confirmed by Sam, Nov 18. JE-1038 stays on the record; October stays closed.</span>`;
        },
        say: 'Confirmed. INV-0040 voided with a reversing entry dated today. October stays closed.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      x(r, 'su').hidden = true;
      const pill = x(r, 'st'); pill.className = 'pill pill-sent'; pill.textContent = 'Sent';
      $('[data-act="void"]', r).hidden = false;
      const f = x(r, 'foot'); f.className = 'wfoot';
      f.innerHTML = `${icon('book-open')}<span>Books · JE-1038 posted this on Oct 28. October is closed.</span>`;
    },
  });

  /* Portal: sign, then pay; the record keeps fingerprints, never raw */
  play('team-portal', {
    idle: 9000,
    chips: [
      ["You're Dana, the client", 'Sign option B.'],
      ['Signed', 'Lumen sent the invoice. Pay it.'],
      ['Paid.', "Kids, that's how Northwind said yes."],
    ],
    restartSay: "Started over. You're Dana: sign option B.",
    acts: [
      {
        key: 'sign',
        run: (p) => {
          const r = p.root;
          const s = x(r, 'p-st'); s.className = 'pill pill-ok'; s.textContent = 'Signed Oct 30';
          x(r, 'inv-t').className = ''; x(r, 'inv-t').style.fontWeight = '';
          x(r, 'inv-t').textContent = 'INV-0042 · Site build';
          x(r, 'inv-s').textContent = 'Sent Nov 16 · due Dec 1 · $42,000.00';
          x(r, 'inv-r').innerHTML = '<span class="pill pill-sent">Due</span>';
          $('[data-act="sign"]', r).hidden = true;
          $('[data-act="pay"]', r).hidden = false;
          x(r, 'rec').innerHTML = `<dl class="kvl is-in">
            <div><dt>Signed by</dt><dd>Dana Whitfield</dd></div>
            <div><dt>When</dt><dd>Oct 30, 2026, 10:42 AM</dd></div>
            <div><dt>Accepted</dt><dd>Option B · Full build</dd></div>
            <div><dt>Network address</dt><dd><span class="fp">7c1e…a2f0</span></dd></div>
            <div><dt>Browser</dt><dd><span class="fp">3d88…19bc</span></dd></div>
            <div><dt>Raw address, raw browser</dt><dd class="never">${icon('ban')}Never stored</dd></div>
          </dl>
          <p class="cap-note" style="margin-top:8px">Fingerprints are keyed hashes: they can confirm a match, not reveal the original.</p>`;
        },
        say: 'Signed by Dana Whitfield. The record keeps her name and the moment; address and browser only as keyed fingerprints.',
      },
      {
        key: 'pay',
        run: (p) => {
          const r = p.root;
          x(r, 'inv-s').textContent = 'Paid Nov 18 · Visa ending 1881 · $42,000.00';
          x(r, 'inv-r').innerHTML = '<span class="pill pill-paid">Paid</span>';
          $('[data-act="pay"]', r).hidden = true;
        },
        say: 'Paid. $42,000.00 by card on INV-0042.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      const s = x(r, 'p-st'); s.className = 'pill'; s.textContent = 'Awaiting you';
      x(r, 'inv-t').className = 'cap-note'; x(r, 'inv-t').style.fontWeight = '500';
      x(r, 'inv-t').textContent = 'Invoices show up here when Lumen sends them.';
      x(r, 'inv-s').innerHTML = '&nbsp;';
      x(r, 'inv-r').innerHTML = '';
      $('[data-act="sign"]', r).hidden = false;
      $('[data-act="pay"]', r).hidden = true;
      x(r, 'rec').innerHTML = `<p class="ph">${icon('signature')}No signature yet.</p>`;
    },
  });

  /* Bills: W-9 received, then pay the bill */
  play('team-bills', {
    idle: 9000,
    chips: [
      ["You're Sam, admin", "Kai's W-9 arrived. Record it."],
      ['On file', 'Now pay the bill.'],
      ['Paid', 'Cash moved. Spend stayed put.'],
    ],
    restartSay: "Started over. Record Kai's W-9.",
    acts: [
      {
        key: 'w9',
        run: (p) => {
          const r = p.root;
          const li = x(r, 'w9r'); li.dataset.s = 'ok'; $('.ck-i', li).innerHTML = icon('check');
          x(r, 'w9r-t').textContent = 'Nov 18';
          x(r, 'tin').textContent = 'SSN · ending 4821'; flash(x(r, 'tin'));
          $('[data-act="w9"]', r).hidden = true;
        },
        say: 'W-9 recorded: SSN ending 4821. The full number is never stored.',
      },
      {
        key: 'pay',
        run: (p) => {
          const r = p.root;
          const pl = x(r, 'bill-p'); pl.className = 'pill pill-paid'; pl.textContent = 'Paid';
          x(r, 'bill-m').textContent = 'Kai Moreno · booked Nov 9 · paid Nov 18';
          flash(x(r, 'exp'));
          const o = x(r, 'out'); o.classList.add('is-on');
          o.innerHTML = `${icon('circle-check')}<span>Posted Accounts payable / Bank, $3,200.00. Expenses still <b>$1,940.00</b>; spend still <b>$5,140.00</b>.</span>`;
          $('[data-act="pay"]', r).hidden = true;
        },
        say: 'Bill paid. Expenses unchanged at $1,940.00; the payment did not create an expense.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      const li = x(r, 'w9r'); delete li.dataset.s; $('.ck-i', li).innerHTML = '';
      x(r, 'w9r-t').textContent = 'Not yet';
      x(r, 'tin').textContent = 'Waiting for the W-9';
      $('[data-act="w9"]', r).hidden = false;
      const pl = x(r, 'bill-p'); pl.className = 'pill'; pl.textContent = 'Unpaid';
      x(r, 'bill-m').textContent = 'Kai Moreno · booked Nov 9 · due Nov 23';
      const o = x(r, 'out'); o.classList.remove('is-on');
      o.innerHTML = `${icon('scale')}<span>Paying it posts Accounts payable / Bank. No new expense.</span>`;
      $('[data-act="pay"]', r).hidden = false;
    },
  });

  /* Reactions */
  (() => {
    const box = $('[data-react]');
    if (!box) return;
    const who = $('[data-react-who]', box);
    const NAMES = { hand: 'high-fived', party: 'threw confetti', heart: 'sent a heart' };
    $$('.react button', box).forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      const n = Number(b.dataset.n) + (on ? 1 : 0);
      $('[data-c]', b).textContent = String(n);
      if (on && !reduced()) { b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); }
      who.textContent = on ? `You ${NAMES[b.dataset.r]}. Up there with Maya, Priya and Jules.` : 'Reaction removed.';
    }));
  })();
})();

/* ================================================================ ENTERPRISE */
(() => {
  'use strict';
  const A = window.__aud;
  if (!A) return;
  const { $, $$, x, icon, flash, reduced, play, segmented } = A;

  /* Hero: edit in the app, change the row, rewrite the chain, then reverse it properly */
  (() => {
    const root = $('[data-play="ent-hero"]');
    if (!root) return;
    const ck = (k) => $(`[data-k="${k}"]`, root);
    const setCk = (k, s, pill, label) => {
      const li = ck(k);
      if (s) li.dataset.s = s; else delete li.dataset.s;
      const p = $('[data-p]', li);
      p.className = `pill ${pill}`.trim();
      p.textContent = label;
      if (s && !reduced()) { li.classList.remove('is-new'); void li.offsetWidth; li.classList.add('is-new'); }
    };
    const verdict = (cls, ic, html) => {
      const v = x(root, 'verdict');
      v.className = `verdict ${cls}`.trim();
      v.innerHTML = `${icon(ic)}<span>${html}</span>`;
      if (!reduced()) { v.classList.remove('is-in'); void v.offsetWidth; v.classList.add('is-in'); }
    };
    const show = (k) => ['edit', 'db', 'rehash', 'reverse'].forEach((a) => { $(`[data-act="${a}"]`, root).hidden = a !== k; });
    const hashes = (h17, h18, p18, h19, p19, bad) => {
      x(root, 'h17').textContent = h17; x(root, 'c17').textContent = h17;
      x(root, 'h17').classList.toggle('is-bad', bad); x(root, 'c17').classList.toggle('is-bad', bad);
      x(root, 'c18').textContent = h18; x(root, 'p18').textContent = `prev ${p18}`;
      x(root, 'c19').textContent = h19; x(root, 'p19').textContent = `prev ${p19}`;
    };
    const ANCHOR = '<b>Batch 0418</b> · 12,906 entries · root <b>3f9a…c21e</b> · signed by the timestamp authority Nov 17, 02:00 UTC · evidence locked until Nov 2036';
    const REV_PH = `${icon('undo-2')}<span>A correction is a new entry that reverses this one. Never an edit.</span>`;

    A.Play(root, {
      chips: [
        ["You're an admin", 'Change JE-20417 to $1,840.'],
        ['Refused, three times', 'Fine. Go around the app.'],
        ['Caught', 'So rewrite the whole chain.'],
        ['Caught again', 'Now do it properly. Reverse it.'],
        ['Reversed', 'Reverse, never edit. Both entries stand.'],
      ],
      restartSay: 'Started over. Try to change JE-20417.',
      acts: [
        {
          key: 'edit',
          run: (p) => {
            const step = reduced() ? 0 : 260;
            setCk('app', 'no', 'pill-lock', 'Refused');
            p.after(() => setCk('guard', 'no', 'pill-lock', 'Refused'), step);
            p.after(() => setCk('trig', 'no', 'pill-lock', 'Refused'), step * 2);
            verdict('', 'shield-check', 'Refused three times. No path in the app, a guard on the entry, a trigger on the table. Posted entries are never edited.');
            show('db');
          },
          say: 'Refused three times: no edit path, the model guard and the database trigger.',
        },
        {
          key: 'db',
          run: () => {
            setCk('trig', 'bad', 'pill-bad', 'Switched off');
            x(root, 'tp').dataset.s = 'db';
            x(root, 'amt').textContent = '1,840.00'; x(root, 'amt').classList.add('is-bad');
            hashes('#f31a', '#0c5f', '#b7e2', '#e6a3', '#0c5f', true);
            x(root, 'p18').classList.add('is-bad');
            x(root, 'n17').classList.add('is-break');
            setCk('chain', 'bad', 'pill-bad', 'Broken at JE-20418');
            verdict('is-bad', 'link-2-off', 'Caught. JE-20417 now hashes to #f31a, but JE-20418 still points to #b7e2. The chain breaks right there.');
            show('rehash');
          },
          say: 'You changed the row directly. JE-20417 now hashes to f31a, JE-20418 still points to b7e2: the chain breaks.',
        },
        {
          key: 'rehash',
          run: () => {
            x(root, 'tp').dataset.s = 'chain';
            hashes('#f31a', '#9d21', '#f31a', '#57c4', '#9d21', true);
            x(root, 'p18').classList.remove('is-bad');
            x(root, 'n17').classList.remove('is-break');
            ['c18', 'c19'].forEach((k) => { x(root, k).classList.add('is-new'); flash(x(root, k)); });
            setCk('chain', 'ok', 'pill-warn', 'Whole, rewritten');
            setCk('root', 'bad', 'pill-bad', "Doesn't match");
            x(root, 'anchor').lastElementChild.innerHTML = 'Your rewritten chain reduces to root <b>8d04…7b19</b>. Batch 0418\'s signed root is <b>3f9a…c21e</b>.';
            verdict('is-bad', 'stamp', "Caught again. The timestamp authority signed 3f9a…c21e on Nov 17. Nobody can make it have signed 8d04…7b19 instead, not even with the whole database.");
            show('reverse');
          },
          say: 'You rehashed the chain, so it is whole again, but its root 8d04…7b19 does not match the signed root 3f9a…c21e. Caught again.',
        },
        {
          key: 'reverse',
          run: () => {
            delete x(root, 'tp').dataset.s;
            x(root, 'amt').textContent = '18,400.00'; x(root, 'amt').classList.remove('is-bad');
            hashes('#b7e2', '#0c5f', '#b7e2', '#e6a3', '#0c5f', false);
            ['c18', 'c19'].forEach((k) => x(root, k).classList.remove('is-new'));
            x(root, 'anchor').lastElementChild.innerHTML = ANCHOR;
            ['app', 'guard', 'trig'].forEach((k) => setCk(k, 'ok', 'pill-ok', 'Held'));
            setCk('chain', 'ok', 'pill-ok', 'Whole');
            setCk('root', 'ok', 'pill-ok', 'Matches');
            const rev = x(root, 'rev');
            rev.className = 'je-box is-in';
            rev.innerHTML = `<header><b>JE-20431</b><span>Nov 18, 2026 · Reversal of JE-20417</span><span class="pill pill-ok" style="margin-left:auto">Posted</span></header><dl class="je-lines"><div><dt>Dr Revenue</dt><dd>18,400.00</dd></div><div><dt class="cr">Cr Accounts receivable</dt><dd>18,400.00</dd></div></dl><footer><span class="hash">#c2f8</span><span>prev #7a10 · goes into the next batch</span></footer>`;
            verdict('is-good', 'circle-check', 'Reversed, not edited. JE-20417 stands as posted, JE-20431 corrects it, and the auditor sees both.');
            show(null);
          },
          say: 'Put back, then reversed properly: JE-20431 reverses JE-20417, both on the record, chain whole, root matches.',
        },
      ],
      reset: () => {
        delete x(root, 'tp').dataset.s;
        x(root, 'amt').textContent = '18,400.00'; x(root, 'amt').classList.remove('is-bad');
        hashes('#b7e2', '#0c5f', '#b7e2', '#e6a3', '#0c5f', false);
        x(root, 'p18').classList.remove('is-bad');
        x(root, 'n17').classList.remove('is-break');
        ['c18', 'c19'].forEach((k) => x(root, k).classList.remove('is-new'));
        x(root, 'anchor').lastElementChild.innerHTML = ANCHOR;
        ['app', 'guard', 'trig'].forEach((k) => setCk(k, null, '', 'Not tried'));
        setCk('chain', null, 'pill-ok', 'Whole');
        setCk('root', null, 'pill-ok', 'Matches');
        const rev = x(root, 'rev'); rev.className = 'ph'; rev.innerHTML = REV_PH;
        const v = x(root, 'verdict'); v.className = 'verdict';
        v.innerHTML = `${icon('scan-search')}<span>JE-20417 is posted. Try to change it and watch what answers.</span>`;
        show('edit');
      },
    });
  })();

  /* Balance three times */
  (() => {
    const root = $('[data-play="ent-bal"]');
    if (!root) return;
    const cpt = (k, s, t) => { const c = x(root, k); if (s) c.dataset.s = s; else delete c.dataset.s; $('[data-t]', c).textContent = t; const i = $('.ck-i', c); if (s === 'ok') i.innerHTML = icon('check'); else if (s === 'bad') i.innerHTML = icon('x'); };
    const ICONS = { c1: 'file-pen-line', c2: 'send', c3: 'moon' };
    const show = (k) => ['build', 'fix', 'post'].forEach((a) => { $(`[data-act="${a}"]`, root).hidden = a !== k; });
    A.Play(root, {
      idle: 9000,
      chips: [
        ["You're an admin in Lisbon", 'Build this entry.'],
        ['Refused', "It doesn't balance. Fix the credit."],
        ['Balanced', 'Post it.'],
        ['Posted', 'Balanced when built, when posted, and every night.'],
      ],
      restartSay: 'Started over. Build the entry.',
      acts: [
        { key: 'build', run: () => { cpt('c1', 'bad', "Can't be built. Debits €12,000.00, credits €11,990.00."); show('fix'); }, say: 'Refused at construction: debits 12,000 euros, credits 11,990 euros.' },
        {
          key: 'fix',
          run: () => {
            x(root, 'cr').textContent = '€12,000.00'; x(root, 'crt').textContent = '€12,000.00'; flash(x(root, 'cr'));
            const d = x(root, 'diff'); d.textContent = 'Balanced'; d.classList.remove('is-off');
            cpt('c1', 'ok', 'Balanced: €12,000.00 each side.');
            show('post');
          },
          say: 'Balanced at 12,000 euros each side. Now post it.',
        },
        {
          key: 'post',
          run: () => {
            cpt('c2', 'ok', 'Checked again as it posts, and chained in the same transaction.');
            cpt('c3', 'ok', 'Tonight at 01:00 UTC, with every other entry. Last night: all in balance.');
            show(null);
          },
          say: 'Posted and chained. Checked again tonight with every other entry.',
        },
      ],
      reset: () => {
        x(root, 'cr').textContent = '€11,990.00'; x(root, 'crt').textContent = '€11,990.00';
        const d = x(root, 'diff'); d.textContent = 'Off by €10.00'; d.classList.add('is-off');
        ['c1', 'c2', 'c3'].forEach((k) => { $('.ck-i', x(root, k)).innerHTML = icon(ICONS[k]); });
        cpt('c1', null, 'Not built yet.');
        cpt('c2', null, 'Not posted yet.');
        cpt('c3', null, 'Last night, Nov 18, 01:00 UTC: every entry in balance.');
        show('build');
      },
    });
  })();

  /* Period close behind a second check, then a refused edit */
  play('ent-close', {
    idle: 9000,
    chips: [
      ["You're an admin", 'Close October.'],
      ['Hold on', "Confirm it's you."],
      ['October closed', 'Now try to edit an October invoice.'],
      ['Refused', 'Corrections land in an open period.'],
    ],
    restartSay: 'Started over. Close October.',
    acts: [
      {
        key: 'close',
        run: (p) => { const su = x(p.root, 'su'); su.hidden = false; if (!reduced()) { su.classList.remove('is-in'); void su.offsetWidth; su.classList.add('is-in'); } },
        say: 'Closing a period asks who you are again: passkey, password or an emailed code.',
      },
      {
        key: 'confirm',
        run: (p) => {
          const r = p.root;
          x(r, 'su').hidden = true;
          const li = x(r, 'oct'); li.dataset.s = 'closed'; $('.ck-i', li).innerHTML = icon('lock');
          x(r, 'oct-t').textContent = 'Closed Nov 18 · confirmed with a passkey';
          const pl = x(r, 'oct-p'); pl.className = 'pill pill-lock'; pl.textContent = 'Closed'; flash(pl);
          $('[data-act="close"]', r).hidden = true;
          $('[data-act="edit"]', r).hidden = false;
        },
        say: 'Confirmed. October is closed.',
      },
      {
        key: 'edit',
        run: (p) => {
          const r = p.root;
          const f = x(r, 'foot'); f.className = 'wfoot is-bad';
          f.innerHTML = `${icon('lock')}<span>Refused. INV-08790 is dated Oct 22, and October is closed. A correction goes in November as its own document.</span>`;
          $('[data-act="edit"]', r).hidden = true;
        },
        say: 'Refused. INV-08790 is dated in October, which is closed.',
      },
    ],
    reset: (p) => {
      const r = p.root;
      x(r, 'su').hidden = true;
      const li = x(r, 'oct'); li.dataset.s = 'open'; $('.ck-i', li).innerHTML = icon('lock-open');
      x(r, 'oct-t').textContent = 'Every entry in balance · ready to close';
      const pl = x(r, 'oct-p'); pl.className = 'pill'; pl.textContent = 'Open';
      $('[data-act="close"]', r).hidden = false;
      $('[data-act="edit"]', r).hidden = true;
      const f = x(r, 'foot'); f.className = 'wfoot';
      f.innerHTML = `${icon('calendar')}<span>October holds 1,184 posted entries across three offices.</span>`;
    },
  });

  /* Anchor: verify the batch, try to delete the evidence */
  (() => {
    const box = $('[data-anchor]');
    if (!box) return;
    const msg = $('[data-ev-msg]', box);
    const verifyBtn = $('[data-ev-verify]', box);
    let timers = [];
    const say = (ic, html) => { msg.innerHTML = `<span class="refusal">${icon(ic)}<b>${html}</b></span>`; };
    verifyBtn.addEventListener('click', () => {
      timers.forEach(clearTimeout); timers = [];
      $$('.mk-svg .is-lit', box).forEach((n) => n.classList.remove('is-lit'));
      const step = reduced() ? 0 : 230;
      [0, 1, 2, 3].forEach((lvl) => {
        timers.push(setTimeout(() => {
          $$(`.mk-svg .node[data-lvl="${lvl}"]`, box).forEach((n) => n.classList.add('is-lit'));
          $$(`.mk-svg .edge[data-lvl="${lvl}"]`, box).forEach((n) => n.classList.add('is-lit'));
        }, step * lvl));
      });
      msg.innerHTML = '<span>Recomputing the root from 12,906 entries…</span>';
      timers.push(setTimeout(() => say('badge-check', 'Verified. <span>The entries reduce to 3f9a…c21e, the timestamp authority\'s signature over it checks out for Nov 17, 02:00 UTC, and the evidence is locked until Nov 17, 2036.</span>'), step * 4 + 80));
    });
    $('[data-ev-delete]', box).addEventListener('click', () => {
      say('lock', 'Refused. <span>The storage holds Batch 0418\'s evidence until Nov 17, 2036, and nobody can shorten that, us included.</span>');
    });
  })();

  /* Reports: as of any date, per currency */
  (() => {
    const win = $('[data-rep]');
    if (!win) return;
    const S = { USD: '$', EUR: '€', GBP: '£' };
    const DATA = {
      mar: {
        cap: 'Receivables aging as of Mar 31, 2026, by currency',
        rows: [['USD', [24860000, 9640000, 4120000, 2640000]], ['EUR', [12050000, 4275000, 1800000, 700000]], ['GBP', [6190000, 2230000, 820000, 400000]]],
        trace: '<b>INV-07311</b> · Calder Group · £14,200.00, issued Mar 12, due Apr 11. On Mar 31 it was owed and current, inside GBP\'s £61,900.00. Rebuilt from what was posted by that date; later documents aren\'t here.',
      },
      now: {
        cap: 'Receivables aging as of Nov 18, 2026, by currency',
        rows: [['USD', [33125000, 12840000, 5285000, 2640000]], ['EUR', [9630000, 3150000, 1500000, 0]], ['GBP', [8415000, 2570000, 1150000, 0]]],
        trace: '<b>INV-07311</b> was paid on Apr 20, so it isn\'t in today\'s aging. Ask about Mar 31 and it\'s back, exactly as it was owed.',
      },
    };
    let cur = 'mar';
    const tot = (cells) => cells.reduce((a, b) => a + b, 0);
    const render = (k, anim) => {
      cur = k;
      const d = DATA[k];
      $('[data-rep-rows]', win).innerHTML = d.rows.map(([c, cells]) => `<tr${anim ? ' class="is-in"' : ''}><th scope="row"><span class="cur-tag">${c}</span></th>${cells.map((v) => `<td class="num hide-sm">${A.money(v, S[c])}</td>`).join('')}<td class="num"><b>${A.money(tot(cells), S[c])}</b></td></tr>`).join('');
      $('[data-rep-cap]', win).textContent = d.cap;
      $('[data-rep-trace]', win).innerHTML = `${icon('history')}<span>${d.trace}</span>`;
      $('[data-blend-msg]', win).textContent = 'Each currency keeps its own total.';
    };
    segmented($('.seg', win), (b) => render(b.dataset.rk, !reduced()));
    $('[data-blend]', win).addEventListener('click', () => {
      const parts = DATA[cur].rows.map(([c, cells]) => A.money(tot(cells), S[c])).join(' + ');
      const m = $('[data-blend-msg]', win);
      m.textContent = `No blended total. ${parts} is three numbers, not one. Adding them would be a figure that's true of nothing.`;
      flash(m);
    });
    render('mar', false);
  })();

  /* Three checks: numbering, duplicate delivery and refund order, tenancy */
  (() => {
    const lc = $$('[data-lc]');
    if (!lc.length) return;
    const ln = (html, cls = '') => `<div class="ln is-new ${cls}">${html}</div>`;
    const step = () => (reduced() ? 0 : 320);
    lc.forEach((li) => {
      const res = $('[data-lc-res]', li);
      const go = $('[data-lc-go]', li);
      const kind = li.dataset.lc;
      if (kind === 'num') {
        go.addEventListener('click', () => {
          go.disabled = true;
          res.innerHTML = ln('<span>Last issued</span><b>INV-08812</b>', 'is-quiet');
          const add = [
            '<span>Lisbon · created</span><b>INV-08813</b>',
            '<span>London · created</span><b>INV-08814</b>',
            '<span>New York · failed halfway, rolled back</span><b>No number used</b>',
            '<span>Next number</span><b>INV-08815</b>',
          ];
          add.forEach((h, i) => setTimeout(() => res.insertAdjacentHTML('beforeend', ln(h)), step() * (i + 1)));
        });
      }
      if (kind === 'pay') {
        go.addEventListener('click', () => {
          go.disabled = true;
          res.insertAdjacentHTML('beforeend', ln('<span>Same event, delivered again</span><b>Already processed · applied 0 times</b>'));
        });
        const rf = $('[data-lc-refund]', li);
        rf.addEventListener('click', () => {
          rf.disabled = true;
          res.insertAdjacentHTML('beforeend', ln('<span>1 · Refund charged at the provider</span><b>$400.00</b>'));
          setTimeout(() => res.insertAdjacentHTML('beforeend', ln('<span>2 · Then recorded in the books</span><b>Posted and chained</b>')), step() * 2);
        });
      }
      if (kind === 'ten') {
        go.addEventListener('click', () => {
          go.disabled = true;
          $('[data-lc-url]', li).textContent = 'ledgendary.app/invoices/INV-0042';
          res.innerHTML = '<p class="nf is-new">Not found.</p>';
          flash($('.urlbar', li));
        });
      }
    });
  })();

  /* Privacy inspector tabs, and the erasure request */
  (() => {
    const box = $('[data-insp]');
    if (!box) return;
    const tabs = $$('[role="tab"]', box);
    const select = (t, focus) => {
      tabs.forEach((b) => {
        const on = b === t;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(b.getAttribute('aria-controls'));
        panel.hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
    const go = $('[data-dsr-go]', box);
    go.addEventListener('click', () => {
      go.disabled = true;
      const n = $('[data-dsr-name]', box);
      n.textContent = 'Anonymised person · 0193'; n.classList.add('is-in');
      const m = $('[data-dsr-mail]', box);
      m.textContent = 'Removed'; flash(m);
      go.insertAdjacentHTML('afterend', '<p class="cap-note is-in" style="margin-top:10px" aria-live="polite">Done. The person is gone from every record; INV-07311 and the other three still show what was billed, when, and what posted.</p>');
    });
  })();
})();
