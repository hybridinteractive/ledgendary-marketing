/* =========================================================================
   Ledgendary marketing home: behaviour
   Content is visible without this file; everything here enhances.
   ========================================================================= */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 860px)');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const fmtUSD = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPlain = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtHM = (mins) => `${Math.floor(mins / 60)} h ${Math.round(mins % 60)} m`;
  const easeOut = (x) => 1 - Math.pow(1 - x, 4);

  /** Roll a number in an element from `from` to `to` with an exponential ease-out. */
  function roll(el, from, to, format, duration = 700) {
    if (reduced.matches) { el.textContent = format(to); return; }
    const start = performance.now();
    cancelAnimationFrame(el._roll);
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = format(from + (to - from) * easeOut(p));
      if (p < 1) el._roll = requestAnimationFrame(step);
    };
    el._roll = requestAnimationFrame(step);
  }

  /* --------------------------------------------------------------- nav */

  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const dark = $('#books');
  if (dark) {
    new IntersectionObserver((list) => list.forEach((e) => nav.classList.toggle('is-dark', e.isIntersecting)),
      { rootMargin: '-30px 0px -95% 0px' }).observe(dark);
  }

  /* --------------------------------------------------------------- highlighter */

  const marks = $$('.hl');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    marks.forEach((m) => m.classList.add('hl-in'));
  } else {
    const hio = new IntersectionObserver((list) => list.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('hl-in'); hio.unobserve(e.target); }
    }), { threshold: 1, rootMargin: '0px 0px -12% 0px' });
    marks.forEach((m) => hio.observe(m));
  }

  /* --------------------------------------------------------------- waitlist */

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('[data-waitlist]').forEach((form) => {
    const input = $('input', form);
    const msg = $('.form-msg', form);
    const say = (text, kind) => {
      msg.textContent = text;
      msg.classList.toggle('is-error', kind === 'error');
      msg.classList.toggle('is-ok', kind === 'ok');
    };
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && EMAIL.test(input.value.trim())) {
        input.removeAttribute('aria-invalid');
        say('', null);
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value.trim();
      if (!value) {
        input.setAttribute('aria-invalid', 'true');
        say('Enter your email so we can send your invite.', 'error');
        input.focus();
        return;
      }
      if (!EMAIL.test(value)) {
        input.setAttribute('aria-invalid', 'true');
        say('That address looks incomplete. Check it has an @ and a domain, then try again.', 'error');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      form.classList.add('is-done');
      say(`Challenge accepted. You're on the list.`, 'ok');
      const you = form.hasAttribute('data-final') ? $('[data-you]') : null;
      if (you) you.hidden = false;
      msg.setAttribute('tabindex', '-1');
      msg.focus({ preventScroll: true });
    });
  });

  /* --------------------------------------------------------------- hero demo */

  const demo = $('#demo');
  if (demo) {
    const win = $('.win-hero', demo);
    const TOTAL = Number(demo.dataset.total);
    const SCENES = [0, 2800, 5800, 7900, 12800];
    const SCENE_NAMES = ['Propose: Dana compares three options', 'Accept: Dana signs option B', 'Invoice: INV-0042 is composed from option B and unbilled time', 'Paid: wait for it, then paid by card', 'Posted: two entries post to the books'];
    const timed = $$('[data-at], [data-until]', win);
    const rolls = $$('[data-roll]', win).map((el) => ({ el, to: Number(el.dataset.roll), at: Number(el.dataset.rollAt) }));
    const chips = $$('.chip', demo);
    const toggle = $('[data-toggle]', demo);
    const live = $('[data-demo-live]', demo);
    const cursor = $('.cursor', win);
    const cursorLabel = $('.cursor-l', cursor);

    // Cursor script: moves, presses and visibility, in timeline order.
    const CURSOR = [
      { at: 0, kind: 'park', x: 0.62, y: 0.86, who: 'dana' },
      { at: 600, kind: 'move', target: '.opt-b', fy: 0.9 },
      { at: 1700, kind: 'press', target: '#tgt-b' },
      { at: 3000, kind: 'move', target: '.sign-field' },
      { at: 3550, kind: 'move', target: '.sign-check .box' },
      { at: 3900, kind: 'press', target: '.sign-check .box' },
      { at: 4000, kind: 'move', target: '#tgt-sign' },
      { at: 4350, kind: 'press', target: '#tgt-sign' },
      { at: 5200, kind: 'hide' },
      { at: 6900, kind: 'park', x: 0.5, y: 0.5, who: 'maya' },
      { at: 7000, kind: 'move', target: '#tgt-send' },
      { at: 7650, kind: 'press', target: '#tgt-send' },
      { at: 8300, kind: 'hide' },
    ];

    let t = 0;
    let last = performance.now();
    let userPaused = false;
    let inView = true;

    const placeCursor = (ev, animate) => {
      cursor.classList.toggle('no-anim', !animate);
      if (ev.kind === 'hide') { cursor.classList.add('is-hidden'); return; }
      cursor.classList.remove('is-hidden');
      if (ev.who) {
        cursor.classList.toggle('is-maya', ev.who === 'maya');
        cursorLabel.textContent = ev.who === 'maya' ? 'Maya · Lumen Studio' : 'Dana · Northwind';
      }
      const box = win.getBoundingClientRect();
      let x; let y;
      if (ev.kind === 'park') {
        x = box.width * ev.x; y = box.height * ev.y;
      } else {
        const target = $(ev.target, win);
        if (!target) return;
        const r = target.getBoundingClientRect();
        if (!r.width) return;
        x = r.left - box.left + r.width * 0.55;
        y = r.top - box.top + r.height * (ev.fy ?? 0.5);
      }
      cursor.style.setProperty('--x', `${Math.round(x)}px`);
      cursor.style.setProperty('--y', `${Math.round(y)}px`);
      if (!animate) { void cursor.offsetWidth; cursor.classList.remove('no-anim'); }
    };

    const press = (sel) => {
      const el = $(sel, win);
      if (!el) return;
      el.classList.add('press');
      setTimeout(() => el.classList.remove('press'), 200);
    };

    /** Set every timed element to the state it has at time `now`. */
    const apply = (now, prev, jumped) => {
      timed.forEach((el) => {
        if (el.dataset.at !== undefined) el.classList.toggle('on', now >= Number(el.dataset.at));
        if (el.dataset.until !== undefined) el.classList.toggle('off', now >= Number(el.dataset.until));
      });

      rolls.forEach(({ el, to, at }) => {
        if (now < at) { el.textContent = fmtUSD(0); return; }
        if (!jumped && prev < at) roll(el, 0, to, fmtUSD, 800);
        else if (jumped) el.textContent = fmtUSD(to);
      });

      // Cursor: on a jump, settle to the latest positional event; when playing, run events crossed.
      if (jumped) {
        let pos = null;
        let who = null;
        CURSOR.forEach((ev) => {
          if (ev.at > now) return;
          if (ev.who) who = ev.who;
          if (ev.kind !== 'press') pos = ev;
        });
        if (pos) {
          // A jump after the last move of a scene leaves the cursor where it would be.
          requestAnimationFrame(() => placeCursor({ ...pos, who }, false));
        }
      } else {
        CURSOR.forEach((ev) => {
          if (ev.at > prev && ev.at <= now) {
            if (ev.kind === 'press') press(ev.target);
            else placeCursor(ev, ev.kind !== 'park');
          }
        });
      }

      let idx = 0;
      SCENES.forEach((s, i) => { if (now >= s) idx = i; });
      chips.forEach((chip, i) => {
        chip.setAttribute('aria-pressed', String(i === idx));
        const end = SCENES[i + 1] ?? TOTAL;
        const p = i < idx ? 1 : i > idx ? 0 : Math.min(1, (now - SCENES[i]) / (end - SCENES[i]));
        chip.style.setProperty('--p', p.toFixed(3));
      });
    };

    const playing = () => !userPaused && inView && !document.hidden;

    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (playing()) {
        const prev = t;
        t += dt;
        if (t >= TOTAL) { t = 0; apply(0, 0, true); }
        else apply(t, prev, false);
      }
      requestAnimationFrame(tick);
    };

    const setPaused = (paused) => {
      userPaused = paused;
      demo.classList.toggle('is-paused', paused);
      toggle.setAttribute('aria-label', paused ? 'Play demonstration' : 'Pause demonstration');
    };

    toggle.addEventListener('click', () => {
      if (userPaused && t >= TOTAL - 1) t = 0;
      setPaused(!userPaused);
    });

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        t = Number(chip.dataset.scene);
        // Land on the readable moment of a scene rather than its first frame.
        const settle = { 0: 2200, 2800: 4700, 5800: 7300, 7900: 9200, 12800: 13600 }[t];
        if (userPaused || reduced.matches) t = settle;
        apply(t, t, true);
        live.textContent = SCENE_NAMES[SCENES.indexOf(Number(chip.dataset.scene))];
      });
    });

    new IntersectionObserver((entries) => {
      entries.forEach((e) => { inView = e.isIntersecting; });
    }, { threshold: 0.15 }).observe(demo);

    window.addEventListener('resize', () => {
      let pos = null; let who = null;
      CURSOR.forEach((ev) => { if (ev.at <= t) { if (ev.who) who = ev.who; if (ev.kind !== 'press') pos = ev; } });
      if (pos) placeCursor({ ...pos, who }, false);
    });

    if (reduced.matches) {
      // A meaningful final frame: paid, posted, with the toast showing.
      t = TOTAL - 1;
      setPaused(true);
      apply(t, t, true);
    } else {
      apply(0, 0, true);
    }
    requestAnimationFrame((now) => { last = now; tick(now); });
  }

  /* --------------------------------------------------------------- story */

  const stage = $('.win-story');
  if (stage) {
    const screens = $$('.scr', stage);
    const crumb = $('[data-crumb]', stage);
    const railIcons = $$('[data-rail]', stage);
    const steps = $$('.step');
    let current = 0;

    // Phone: every step carries its own screen.
    screens.forEach((scr, i) => {
      const copy = stage.cloneNode(true);
      copy.removeAttribute('style');
      $$('.scr', copy).forEach((s, j) => { if (j !== i) s.remove(); else s.classList.add('scr-on'); });
      $('[data-crumb]', copy).textContent = scr.dataset.crumbtext;
      $$('[data-rail]', copy).forEach((ic) => ic.classList.toggle('is-cur', ic.dataset.rail.split(' ').includes(String(i))));
      copy.setAttribute('aria-hidden', 'true');
      steps[i].appendChild(copy);
    });

    const screensBox = $('.screens', stage);
    const fit = (scr) => {
      const pad = parseFloat(getComputedStyle(screensBox).paddingTop) * 2;
      const h = Math.ceil(scr.scrollHeight + pad);
      screensBox.style.setProperty('--h', `${h}px`);
      // Keep the window centred in the viewport below the nav, whatever the scene's height.
      const full = h + 46;
      stage.style.top = `${Math.max(80, Math.round((window.innerHeight - full) / 2 + 30))}px`;
    };
    fit(screens[0]);
    window.addEventListener('resize', () => fit(screens[current]));
    if (document.fonts) document.fonts.ready.then(() => fit(screens[current]));

    const setRail = (i) => railIcons.forEach((ic) => ic.classList.toggle('is-cur', ic.dataset.rail.split(' ').includes(String(i))));

    const countUp = (scr) => {
      $$('[data-count]', scr).forEach((el) => {
        const v = el.dataset.count;
        if (/h/.test(v)) {
          const [h, m] = v.match(/\d+/g).map(Number);
          roll(el, 0, h * 60 + m, fmtHM, 900);
        } else {
          roll(el, 0, Number(v), fmtUSD, 900);
        }
      });
    };

    const show = (i) => {
      if (i === current) return;
      const from = screens[current];
      const to = screens[i];
      const shared = ['.vt-title', '.vt-amount'].map((sel) => {
        const a = $(sel, from);
        return a ? { sel, rect: a.getBoundingClientRect() } : null;
      }).filter(Boolean);

      from.classList.remove('scr-on');
      to.classList.add('scr-on');
      crumb.textContent = to.dataset.crumbtext;
      fit(to);
      setRail(i);
      current = i;
      steps.forEach((s, j) => s.classList.toggle('is-on', j === i));

      if (reduced.matches) return;

      // Shared elements glide from where they were (FLIP).
      shared.forEach(({ sel, rect }) => {
        const b = $(sel, to);
        if (!b) return;
        const r = b.getBoundingClientRect();
        if (!r.width) return;
        const dx = rect.left - r.left;
        const dy = rect.top - r.top;
        const s = rect.height / r.height;
        b.animate([
          { transform: `translate(${dx}px, ${dy}px) scale(${s})`, transformOrigin: 'top left' },
          { transform: 'none', transformOrigin: 'top left' },
        ], { duration: 620, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      });
      to.animate([{ opacity: 0.4, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      countUp(to);
    };

    steps[0].classList.add('is-on');
    setRail(0);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !mobile.matches) show(Number(e.target.dataset.step));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => io.observe(s));
  }

  /* --------------------------------------------------------------- roles */

  const rolePanel = $('#role-panel');
  if (rolePanel) {
    const tabs = $$('.role');
    const ROLE = {
      owner: { name: 'Maya Ortiz, Owner', note: 'Owners see everything and can change anything, including who sees what.' },
      finance: { name: 'Sam Okafor, Finance', note: 'Finance sends invoices and records payments. Hours show as totals; approving weeks is not their call.' },
      member: { name: 'Theo Brandt, Member', note: 'Theo sees his own week and submits it. Invoices and other people’s hours are not part of his seat.', locked: ['Invoices aren’t shared with members.', 'Members log and submit their own time. That’s the whole seat.'] },
      approver: { name: 'Lena Park, Approver', note: 'Lena approves weeks on the projects she is assigned to. Money stays out of her view.', locked: ['Money isn’t part of this seat.', 'Approvers see hours for the projects they approve, never invoices or payments.'] },
      accountant: { name: 'Jules Carter, Accountant', note: 'Jules reads everything, from invoices to the journal, and can’t change any of it.' },
    };
    const nameEl = $('[data-role-name]', rolePanel);
    const noteEl = $('[data-role-note]', rolePanel);
    const lockT = $('[data-locked-t]', rolePanel);
    const lockS = $('[data-locked-s]', rolePanel);

    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      const role = tab.dataset.role;
      const r = ROLE[role];
      rolePanel.dataset.role = role;
      rolePanel.setAttribute('aria-labelledby', tab.id);
      nameEl.textContent = r.name;
      noteEl.textContent = r.note;
      if (r.locked) { lockT.textContent = r.locked[0]; lockS.textContent = r.locked[1]; }
      if (!reduced.matches) noteEl.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        select(tabs[(map[e.key] + tabs.length) % tabs.length], true);
      });
    });
  }

  /* --------------------------------------------------------------- books */

  const journal = $('#journal');
  if (journal) {
    const entries = $$('.je:not([hidden])', journal);
    if (!reduced.matches) {
      journal.classList.add('armed');
      const io = new IntersectionObserver((list) => {
        if (!list.some((e) => e.isIntersecting)) return;
        io.disconnect();
        entries.forEach((je, i) => setTimeout(() => je.classList.add('is-in', 'is-posting'), 200 + i * 380));
      }, { threshold: 0.3 });
      io.observe(journal);
    }

    const first = $('[data-je="1040"]', journal);
    const rev = $('[data-je="1043"]', journal);
    const editBtn = $('[data-try-edit]', journal);
    const refuse = $('[data-refuse]', journal);
    const reverseBtn = $('[data-reverse]', journal);
    const resetBtn = $('[data-reset]');
    const exp = $('[data-pl-exp]');
    const net = $('[data-pl-net]');
    refuse.setAttribute('role', 'status');

    const flashChange = (el) => { el.classList.remove('changed'); void el.offsetWidth; el.classList.add('changed'); };

    editBtn.addEventListener('click', () => {
      first.classList.add('is-editing');
      setTimeout(() => {
        first.classList.remove('is-editing');
        first.classList.add('is-shaking');
        setTimeout(() => first.classList.remove('is-shaking'), 450);
        refuse.hidden = false;
        reverseBtn.focus({ preventScroll: true });
      }, reduced.matches ? 0 : 450);
    });

    reverseBtn.addEventListener('click', () => {
      refuse.hidden = true;
      rev.hidden = false;
      rev.classList.add('is-in', 'is-posting');
      first.classList.add('is-reversed');
      editBtn.disabled = true;
      editBtn.lastChild.textContent = 'Reversed by JE-1043';
      roll(exp, 1250, 0, fmtPlain, 900);
      roll(net, 40750, 42000, fmtPlain, 900);
      flashChange(exp); flashChange(net);
      resetBtn.hidden = false;
      resetBtn.focus({ preventScroll: true });
    });

    resetBtn.addEventListener('click', () => {
      rev.hidden = true;
      rev.classList.remove('is-posting');
      first.classList.remove('is-reversed');
      editBtn.disabled = false;
      editBtn.lastChild.textContent = 'Try to edit this entry';
      exp.textContent = fmtPlain(1250);
      net.textContent = fmtPlain(40750);
      resetBtn.hidden = true;
      editBtn.focus();
    });
  }

  /* --------------------------------------------------------------- privacy */

  const calflow = $('#calflow');
  if (calflow) {
    if (reduced.matches) {
      calflow.classList.add('is-done');
    } else {
      calflow.classList.add('armed');
      const io = new IntersectionObserver((list) => {
        if (!list.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setTimeout(() => calflow.classList.add('is-done'), 300);
      }, { threshold: 0.45 });
      io.observe(calflow);
    }
  }

  /* --------------------------------------------------------------- playbook */

  const prev = $('#pbprev');
  if (prev) {
    const ic = (name) => `<svg class="ic ic-xs" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    const row = (a, sub, b, pill) => `<div class="pv-row"><span><b>${a}</b>${sub ? `<small>${sub}</small>` : ''}</span><span class="num">${b}</span>${pill || '<span></span>'}</div>`;
    const P = {
      green: (t) => `<span class="pill pill-green">${t}</span>`,
      blue: (t) => `<span class="pill pill-blue">${t}</span>`,
      grey: (t) => `<span class="pill pill-grey">${t}</span>`,
    };
    const PREVIEWS = {
      estimates: ['Estimate EST-0019', `<div class="pv-big"><span>Halcyon · Rebrand</span><b class="num">$22,500.00</b></div>${row('Brand strategy', '2 workshops', '$8,000.00')}${row('Identity system', 'Logo, type, colour', '$14,500.00')}<p class="pv-note">${ic('check')}Accepted Nov 4. Converts to an invoice at the agreed price.</p>`],
      recurring: ['Ferro · Retainer', `<div class="pv-big"><span>Every month on the 1st</span><b class="num">$4,500.00</b></div>${row('Dec 1', 'INV-0046', '$4,500.00', P.blue('Scheduled'))}${row('Nov 1', 'INV-0038', '$4,500.00', P.green('Paid'))}${row('Oct 1', 'INV-0031', '$4,500.00', P.green('Paid'))}<p class="pv-note">${ic('repeat')}One invoice per period. Never two.</p>`],
      reminders: ['INV-0042 · Reminders', `${row('3 days before due', 'Nov 28', 'Email', P.grey('Not needed'))}${row('On the due date', 'Dec 1', 'Email', P.grey('Not needed'))}${row('7 days late', 'Dec 8', 'Email', P.grey('Not needed'))}${row('Late fee 1.5%', 'Dec 16', 'Entry', P.grey('Not needed'))}<p class="pv-note">${ic('book-open')}A late fee posts as its own entry. The invoice is never rewritten.</p>`],
      credit: ['Credit note CN-0004', `<div class="pv-big"><span>Halcyon · Rebrand</span><b class="num">$1,200.00</b></div>${row('Issued', 'Nov 6 · Scope reduced', '$1,200.00', P.blue('Issued'))}${row('Applied to INV-0045', 'Nov 9', '−$1,200.00', P.green('Applied'))}${row('Credit left', '', '$0.00')}`],
      portal: ['Client portal · Northwind Co', `${row('Proposal P-0018', 'Site build · option B', '$30,000 + time', P.green('Accepted'))}${row('INV-0042', 'Paid Nov 18', '$42,000.00', P.green('Paid'))}${row('INV-0043', 'Due Dec 15', '$3,600.00', P.blue('Pay now'))}<p class="pv-note">${ic('globe')}Dana accepts, signs and pays here, on one page per client.</p>`],
      payments: ['Payments', `${row('Northwind Co', 'Nov 18 · Card · INV-0042', '$42,000.00', P.green('Matched'))}${row('Halcyon', 'Nov 12 · Bank transfer · INV-0039', '$11,250.00', P.green('Matched'))}${row('Ferro', 'Nov 1 · Card · INV-0038', '$4,500.00', P.green('Matched'))}`],
      expenses: ['Expenses', `${row('Font licences', 'Oct 31 · Northwind · Site build', '$1,250.00', P.grey('Receipt'))}${row('Stock photography', 'Nov 3 · Halcyon · Rebrand', '$380.00', P.grey('Receipt'))}${row('Train to client', 'Nov 10 · Northwind · Site build', '$96.00', P.grey('Receipt'))}<p class="pv-note">${ic('receipt')}Every expense is tagged to a job and posts on save.</p>`],
      bills: ['Bills', `${row('Pixel Foundry', 'BILL-0012 · Due Nov 30', '$6,400.00', P.blue('Open'))}${row('Hosting', 'BILL-0011 · Paid Nov 2', '$240.00', P.green('Paid'))}<p class="pv-note">${ic('building-2')}A bill books what you owe when you owe it, and the cash when it leaves.</p>`],
      bank: ['Bank feed · Operating', `${row('Card payout', 'Nov 18 · INV-0042', '+42,000.00', P.green('Matched'))}${row('Pixel Foundry', 'Nov 17', '−6,400.00', P.blue('Match bill'))}${row('Font licences', 'Oct 31 · JE-1040', '−1,250.00', P.green('Matched'))}`],
      fx: ['INV-0044 · Ferro GmbH', `<div class="pv-big"><span>Billed in euros</span><b class="num">€12,000.00</b></div>${row('Rate on the invoice', 'Kept with the document', '1.0842')}${row('In your books', 'USD', '$13,010.40')}<p class="pv-note">${ic('scale')}The rate is stored once. Reports never recompute it.</p>`],
      reports: ['Reports', `${row('Profit and loss', 'Accrual or cash basis', 'Open', '<span></span>')}${row('Balance sheet', 'As of any date', 'Open', '<span></span>')}${row('Receivables aging', 'Rebuilt as of the date you ask', 'Open', '<span></span>')}${row('Cash basis', 'What actually arrived, by client', 'Open', '<span></span>')}`],
      close: ['Periods', `${row('September 2026', 'Closed Oct 2 · Sam Okafor', '', P.grey('Closed'))}${row('October 2026', 'Closed Nov 3 · Sam Okafor', '', P.grey('Closed'))}${row('November 2026', 'Open', '', P.green('Open'))}<p class="pv-note">${ic('lock')}Nothing dated in a closed month can change.</p>`],
      roles: ['Seats · Lumen Studio', `${row('Maya Ortiz', 'Everything', '', P.grey('Owner'))}${row('Sam Okafor', 'Invoices, payments, close', '', P.grey('Finance'))}${row('Lena Park', 'Approves Site build, Rebrand', '', P.grey('Approver'))}${row('Theo Brandt', 'Own time', '', P.grey('Member'))}${row('Jules Carter', 'Reads everything', '', P.grey('Accountant'))}`],
    };
    const title = $('.pv-title', prev);
    const body = $('.pv-body', prev);
    const btns = $$('.pb');
    const home = $('.pb-prev-wrap');

    const place = (btn) => {
      if (mobile.matches) btn.parentElement.appendChild(prev);
      else if (prev.parentElement !== home) home.appendChild(prev);
    };

    const select = (btn) => {
      const [t, html] = PREVIEWS[btn.dataset.pb];
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      title.textContent = t;
      body.innerHTML = html;
      body.classList.remove('is-in');
      void body.offsetWidth;
      if (!reduced.matches) body.classList.add('is-in');
      place(btn);
    };

    btns.forEach((btn) => {
      btn.addEventListener('click', () => select(btn));
      btn.addEventListener('mouseenter', () => { if (!mobile.matches && btn.getAttribute('aria-pressed') !== 'true') select(btn); });
      btn.addEventListener('focus', () => { if (!mobile.matches && btn.getAttribute('aria-pressed') !== 'true') select(btn); });
    });
    mobile.addEventListener('change', () => place($('.pb[aria-pressed="true"]')));
    select(btns[0]);
  }
})();
