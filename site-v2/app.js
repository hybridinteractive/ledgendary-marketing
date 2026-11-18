/* Ledgendary home, version 2. Plain JS, no dependencies. Every figure here is demo data. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const money = (cents) => '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dur = (min) => `${Math.floor(min / 60)} h ${min % 60} m`;
  const icon = (name) => `<svg class="ic" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const later = (fn, ms) => window.setTimeout(fn, ms);

  /* ================================================================ HERO: play it yourself */
  const play = $('#play');
  if (play) {
    const OPTS = {
      A: { feeName: 'Essentials', fee: 2200000, hours: 40, note: 'Terms · Net 15 · reminders on' },
      B: { feeName: 'Full build', fee: 3000000, hours: 80, note: 'Terms · Net 15 · reminders on' },
      C: { feeName: 'Full build', fee: 3000000, hours: 80, note: 'Care plan · $4,500/mo, billed monthly from Dec 1 as its own recurring invoice' },
    };
    const ORDER = ['pick', 'sign', 'send', 'wait', 'paid'];
    const CHIP = {
      pick: ["You're the client", 'Pick one.'],
      sign: ["You're the client", 'Sign it.'],
      accepted: ['Signed', 'Challenge accepted.'],
      send: ["Now you're the studio", 'Send the invoice.'],
      wait: ['Sent', 'wait for it…'],
      paid: ['Paid.', 'Posted to the books.'],
    };

    const card = $('[data-card]', play);
    const portal = $('[data-view="portal"]', play);
    const invoice = $('[data-view="invoice"]', play);
    const opts = $('.opts', play);
    const radios = $$('input[name="opt"]', play);
    const signForm = $('[data-sign]', play);
    const signInput = $('[data-sign-input]', play);
    const signBtn = $('[data-sign-btn]', play);
    const signLabel = $('[data-sign-label]', play);
    const signDone = $('[data-sign-done]', play);
    const signWho = $('[data-sign-who]', play);
    const sendBtn = $('[data-send]', play);
    const status = $('[data-inv-status]', play);
    const invLine = $('[data-inv-line]', play);
    const books = $('[data-books]', play);
    const chip = $('.chip', play);
    const chipRole = $('[data-chip-role]', play);
    const chipText = $('[data-chip-text]', play);
    const live = $('[data-play-live]', play);
    const restartBtn = $('[data-play-restart]', play);
    const startBtn = $('[data-play-start]', play);
    const trackItems = $$('.track li');

    const st = { step: 'pick', opt: null, signer: 'Dana Whitfield', visible: true, idle: 0, timers: [], typing: false };

    const clearTimers = () => { st.timers.forEach(clearTimeout); st.timers = []; };
    const after = (fn, ms) => { st.timers.push(later(fn, ms)); };

    const say = (msg) => { live.textContent = ''; later(() => { live.textContent = msg; }, 30); };

    const setChip = (key) => {
      const [role, text] = CHIP[key];
      chipRole.textContent = role;
      chipText.textContent = text;
      if (!reduced()) { chip.classList.remove('is-swap'); void chip.offsetWidth; chip.classList.add('is-swap'); }
    };

    const setStep = (step) => {
      st.step = step;
      play.dataset.step = step;
      const at = ORDER.indexOf(step);
      trackItems.forEach((li) => {
        const i = ORDER.indexOf(li.dataset.at);
        li.classList.toggle('is-done', i < at || step === 'paid');
        li.classList.toggle('is-now', i === at && step !== 'paid');
        if (i === at) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      armIdle();
    };

    const fillInvoice = () => {
      const o = OPTS[st.opt];
      const time = o.hours * 60 * 250; // $150/h is 250 cents a minute
      const vals = { opt: st.opt, feeName: o.feeName, fee: money(o.fee), hours: String(o.hours), time: money(time), total: money(o.fee + time), note: o.note };
      $$('[data-k]', play).forEach((el) => { el.textContent = vals[el.dataset.k]; });
      $('[data-signer]', play).textContent = st.signer;
    };

    const choose = (key, fromUser) => {
      if (st.step !== 'pick' && st.step !== 'sign') return;
      st.opt = key;
      radios.forEach((r) => { r.checked = r.value === key; r.closest('.opt').classList.toggle('is-chosen', r.value === key); });
      opts.classList.add('has-choice');
      signInput.disabled = false;
      signBtn.disabled = false;
      signForm.classList.add('is-ready');
      signLabel.textContent = 'Signature · type a name, or just press sign';
      if (st.step === 'pick') { setStep('sign'); setChip('sign'); }
      say(`Option ${key} chosen. Now sign it.`);
      if (!fromUser && document.activeElement && play.contains(document.activeElement)) signInput.focus({ preventScroll: true });
    };

    const typeName = (name, done) => {
      if (reduced()) { signInput.value = name; done(); return; }
      st.typing = true;
      signInput.value = '';
      let i = 0;
      const tick = () => {
        signInput.value = name.slice(0, ++i);
        if (i < name.length) after(tick, 45); else { st.typing = false; after(done, 260); }
      };
      tick();
    };

    const sign = () => {
      if (st.step !== 'sign' || st.typing || signForm.classList.contains('is-signed')) return;
      const typed = signInput.value.trim().replace(/\s+/g, ' ').slice(0, 40);
      if (!typed) { typeName('Dana Whitfield', sign); return; }
      st.signer = typed;
      signWho.textContent = typed;
      signForm.classList.remove('is-ready');
      signForm.classList.add('is-signed');
      signDone.hidden = false;
      opts.classList.add('is-locked');
      radios.forEach((r) => { r.disabled = true; });
      setChip('accepted');
      say(`Signed by ${typed}. Challenge accepted.`);
      const hadFocus = play.contains(document.activeElement);
      after(() => toStudio(hadFocus), reduced() ? 0 : 1300);
    };

    const toStudio = (moveFocus) => {
      fillInvoice();
      play.classList.add('is-studio');
      portal.inert = true; portal.setAttribute('aria-hidden', 'true');
      invoice.inert = false; invoice.removeAttribute('aria-hidden');
      sendBtn.tabIndex = 0;
      sendBtn.classList.add('is-armed');
      setStep('send');
      setChip('send');
      say(`Now you're the studio. Invoice INV-0042 for ${$('[data-k="total"]', play).textContent} is ready. Send it.`);
      if (moveFocus) sendBtn.focus({ preventScroll: true });
    };

    const send = () => {
      if (st.step !== 'send') return;
      sendBtn.disabled = true;
      sendBtn.classList.remove('is-armed');
      sendBtn.innerHTML = `${icon('check')}Sent`;
      status.textContent = 'Sent';
      status.className = 'pill pill-sent';
      invLine.className = 'inv-status is-wait';
      invLine.innerHTML = `${icon('hourglass')}<span>Sent to Dana Whitfield · wait for it</span><span class="wait-dots" aria-hidden="true"><i></i><i></i><i></i></span>`;
      books.innerHTML = `${icon('book-open')}<span>JE-1041 posted · Accounts receivable / Revenue, ${$('[data-k="total"]', play).textContent}</span>`;
      setStep('wait');
      setChip('wait');
      say('Invoice sent. Wait for it.');
      after(paid, reduced() ? 900 : 2800);
    };

    const paid = () => {
      const total = $('[data-k="total"]', play).textContent;
      status.textContent = 'Paid';
      status.className = 'pill pill-paid';
      play.classList.add('is-paid');
      invLine.className = 'inv-status is-paid';
      invLine.innerHTML = `${icon('credit-card')}<span>Paid by card · Visa ending 1881 · Nov 18</span>`;
      books.className = 'books-row is-posted';
      books.innerHTML = `${icon('circle-check')}<span><b class="posted">Posted to the books</b> JE-1041, JE-1042 · chained #9c07, #e21a</span>`;
      setStep('paid');
      setChip('paid');
      say(`Paid. ${total} by card, posted to the books as JE-1041 and JE-1042.`);
    };

    const reset = () => {
      clearTimers();
      st.opt = null; st.signer = 'Dana Whitfield'; st.typing = false;
      play.classList.remove('is-studio', 'is-paid');
      radios.forEach((r) => { r.checked = false; r.disabled = false; r.closest('.opt').classList.remove('is-chosen'); });
      opts.classList.remove('has-choice', 'is-locked');
      signForm.classList.remove('is-ready', 'is-signed');
      signInput.value = ''; signInput.disabled = true; signBtn.disabled = true;
      signLabel.textContent = 'Signature · pick an option first';
      signDone.hidden = true;
      portal.inert = false; portal.removeAttribute('aria-hidden');
      invoice.inert = true; invoice.setAttribute('aria-hidden', 'true');
      sendBtn.disabled = false; sendBtn.tabIndex = -1; sendBtn.classList.remove('is-armed');
      sendBtn.innerHTML = `${icon('send')}Send`;
      status.textContent = 'Draft'; status.className = 'pill';
      invLine.className = 'inv-status';
      invLine.innerHTML = `${icon('mail')}<span>Ready to send to Dana Whitfield, Northwind Co</span>`;
      books.className = 'books-row';
      books.innerHTML = `${icon('book-open')}<span>Books · nothing posted yet. It posts itself when money moves.</span>`;
      setStep('pick');
      setChip('pick');
    };

    /* idle: after 8s without input on a step, the deal continues on its own */
    function armIdle() {
      clearTimeout(st.idle);
      if (reduced() || !st.visible) return;
      if (!['pick', 'sign', 'send'].includes(st.step)) return;
      st.idle = later(() => {
        if (!st.visible) return;
        if (st.step === 'pick') choose('B', false);
        else if (st.step === 'sign') sign();
        else if (st.step === 'send') send();
      }, 8000);
    }

    radios.forEach((r) => r.addEventListener('change', () => choose(r.value, true)));
    signForm.addEventListener('submit', (e) => { e.preventDefault(); sign(); });
    sendBtn.addEventListener('click', send);
    restartBtn.addEventListener('click', (e) => { reset(); say("Started over. You're the client: pick an option."); if (e.detail === 0) radios[1].focus({ preventScroll: true }); });
    startBtn.addEventListener('click', () => {
      startBtn.hidden = true; restartBtn.hidden = false;
      reset(); say("You're the client: pick an option."); radios[1].focus({ preventScroll: true });
    });
    ['pointerdown', 'keydown', 'input'].forEach((ev) => play.addEventListener(ev, armIdle, { passive: true }));

    new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
      if (st.visible) armIdle(); else clearTimeout(st.idle);
    }, { threshold: 0.35 }).observe(card);

    invoice.inert = true;
    reset();

    /* reduced motion: open on the finished deal, with a control to step through it */
    if (reduced()) {
      choose('B', false);
      signInput.value = 'Dana Whitfield';
      sign();
      clearTimers();
      toStudio(false);
      send();
      clearTimers();
      paid();
      startBtn.hidden = false;
      restartBtn.hidden = true;
      live.textContent = '';
    }
  }

  /* ================================================================ STORY: one figure, five screens */
  const story = $('#story');
  if (story) {
    const stage = $('[data-story-stage]', story);
    const screens = $$('[data-scr]', story);
    const pills = $$('.story-steps li', story);
    const cap = $('[data-fig-cap]', story);
    const CAPS = ['Option B, estimated total', 'What Dana signed for', 'INV-0042, total due', 'Paid by card, Nov 18', 'Posted: JE-1041, JE-1042'];
    const desk = window.matchMedia('(min-width: 901px)');
    let cur = -1;

    const show = (s) => {
      if (s === cur) return;
      cur = s;
      stage.dataset.s = String(s);
      stage.dataset.side = screens[s].classList.contains('scr-l') ? 'l' : 'r';
      screens.forEach((el, i) => {
        el.classList.toggle('is-on', i === s);
        el.classList.toggle('is-gone', i < s);
        el.setAttribute('aria-hidden', i === s || !desk.matches ? 'false' : 'true');
      });
      pills.forEach((li, i) => { li.classList.toggle('is-on', i === s); li.classList.toggle('is-past', i < s); });
      cap.textContent = CAPS[s];
      if (!reduced()) { cap.classList.remove('is-swap'); void cap.offsetWidth; cap.classList.add('is-swap'); }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!desk.matches) return;
        const r = story.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / span));
        show(Math.min(4, Math.floor(p * 5)));
      });
    };

    /* phone: the screens stack and the sticky chip follows whichever one is in view */
    const phoneIO = new IntersectionObserver((entries) => {
      if (desk.matches) return;
      entries.forEach((en) => { if (en.isIntersecting) show(Number(en.target.dataset.scr)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    screens.forEach((el) => phoneIO.observe(el));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    desk.addEventListener('change', () => { cur = -1; show(0); onScroll(); });
    show(0);
    onScroll();
  }

  /* ================================================================ TIME: a week that bills itself */
  const time = $('[data-time]');
  if (time) {
    const DAYS = ['Mon Nov 9', 'Tue Nov 10', 'Wed Nov 11', 'Thu Nov 12', 'Fri Nov 13'];
    const SHORT = ['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13'];
    const START = [
      { name: 'Theo Brandt', av: 'TB', cls: 'av-tb', mins: [270, 360, 225, 120, 90] },
      { name: 'Priya Nair', av: 'PN', cls: 'av-pn', mins: [180, 255, 300, 270, 225] },
      { name: 'Maya Ortiz', av: 'MO', cls: 'av-mo', mins: [0, 0, 0, 0, 0] },
    ];
    const PRIOR = 41 * 60 + 45; // Nov 2–8, already logged
    const EST = 80 * 60;
    const FEE = 3000000;
    const tbody = $('[data-week]', time);
    const el = (k) => $(`[data-${k}]`, time);
    const quickWho = el('quick-who');
    const quickVal = el('quick-val');
    const draftRow = el('draft-row');
    const addBtns = $$('[data-add]', time);
    const viewerBtns = $$('[data-viewer]', time);

    let rows, sel, viewer, draft; // draft: 'pending' | 'accepted'
    const restore = () => { rows = START.map((r) => ({ ...r, mins: r.mins.slice() })); sel = [0, 2]; draft = 'pending'; };
    restore();
    viewer = 'maya';

    const render = () => {
      tbody.innerHTML = '';
      rows.forEach((row, r) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.innerHTML = `<span class="person"><span class="av ${row.cls}" aria-hidden="true">${row.av}</span></span>`;
        th.firstChild.append(row.name);
        tr.append(th);
        row.mins.forEach((m, c) => {
          const td = document.createElement('td');
          td.dataset.day = SHORT[c];
          if (r === 2 && c === 2 && draft === 'pending') {
            if (viewer === 'maya') td.innerHTML = `<span class="cell-draft" title="Private draft from your calendar">${icon('lock')}1 h 0 m</span>`;
            else td.innerHTML = '<span class="cell-hidden" aria-label="No time">–</span>';
          } else {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'cell' + (m ? '' : ' is-empty');
            b.textContent = m ? dur(m) : '–';
            b.setAttribute('aria-label', `${row.name}, ${DAYS[c]}, ${m ? dur(m) : 'no time'}`);
            b.setAttribute('aria-pressed', String(viewer === 'maya' && sel[0] === r && sel[1] === c));
            b.disabled = viewer !== 'maya';
            b.dataset.r = r; b.dataset.c = c;
            td.append(b);
          }
          tr.append(td);
        });
        const tot = document.createElement('td');
        tot.className = 'num';
        tot.dataset.day = 'Total';
        tot.textContent = dur(row.mins.reduce((a, b) => a + b, 0));
        tr.append(tot);
        tbody.append(tr);
      });
      totals();
      quick();
      draftLine();
    };

    const bump = (node) => { if (reduced() || !node) return; node.classList.remove('is-bump'); void node.offsetWidth; node.classList.add('is-bump'); };

    const totals = (flash) => {
      const week = rows.reduce((a, row) => a + row.mins.reduce((x, y) => x + y, 0), 0);
      const unbilled = PRIOR + week;
      const line = unbilled * 250;
      el('week-total').textContent = dur(week);
      el('unb-week').textContent = dur(week);
      el('unb-total').textContent = dur(unbilled);
      el('line-qty').textContent = dur(unbilled);
      el('line-amt').textContent = money(line);
      el('inv-draft').textContent = money(FEE + line);
      const est = el('est');
      if (unbilled > EST) { est.textContent = `${dur(unbilled - EST)} over the 80 h estimate. Dana sees the hours on the invoice.`; est.classList.add('is-over'); }
      else { est.textContent = 'On the 80 h estimate'; est.classList.remove('is-over'); }
      if (flash) { bump(el('line-amt')); bump(el('inv-draft')); }
    };

    const quick = () => {
      const row = rows[sel[0]];
      const editable = viewer === 'maya';
      addBtns.forEach((b) => { b.disabled = !editable; });
      if (!editable) { quickWho.textContent = 'Sam approves the week once it\'s submitted.'; quickVal.textContent = ''; return; }
      quickWho.textContent = `${row.name} · ${DAYS[sel[1]]}`;
      quickVal.textContent = dur(row.mins[sel[1]]);
    };

    const draftLine = () => {
      draftRow.className = 'draft-row';
      if (draft === 'accepted') {
        draftRow.classList.add('is-accepted');
        draftRow.innerHTML = `${icon('circle-check')}<span><b>Northwind check-in</b> is now 1 h 0 m of Maya's time on Site build. The title and duration came in; nothing else did.</span>`;
      } else if (viewer === 'sam') {
        draftRow.classList.add('is-plain');
        draftRow.innerHTML = `${icon('eye')}<span>Viewing as <b>Sam Okafor</b>, administrator. Sam approves submitted weeks.</span>`;
      } else {
        draftRow.innerHTML = `${icon('calendar')}<span><b>Northwind check-in · 1 h 0 m</b>, Wed. A private draft from your calendar. Only you can see it.</span><button type="button" class="tbtn" data-accept>${icon('check')}Accept</button>`;
      }
    };

    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('.cell');
      if (!b) return;
      sel = [Number(b.dataset.r), Number(b.dataset.c)];
      $$('.cell', tbody).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      quick();
    });
    addBtns.forEach((btn) => btn.addEventListener('click', () => {
      const [r, c] = sel;
      if (r === 2 && c === 2 && draft === 'pending') return;
      rows[r].mins[c] = Math.min(rows[r].mins[c] + Number(btn.dataset.add), 24 * 60);
      render();
      totals(true);
      const cell = $(`.cell[data-r="${r}"][data-c="${c}"]`, tbody);
      bump(cell);
    }));
    el('time-reset').addEventListener('click', () => { restore(); render(); });
    draftRow.addEventListener('click', (e) => {
      if (!e.target.closest('[data-accept]')) return;
      draft = 'accepted';
      rows[2].mins[2] += 60;
      render();
      totals(true);
      draftRow.tabIndex = -1;
      draftRow.focus({ preventScroll: true });
    });
    viewerBtns.forEach((b) => b.addEventListener('click', () => {
      viewer = b.dataset.viewer;
      viewerBtns.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
      render();
    }));
    viewerBtns.forEach((b, i) => b.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const next = viewerBtns[(i + 1) % viewerBtns.length];
      next.click(); next.focus();
    }));
    viewerBtns.forEach((b) => { b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1; });
    viewerBtns.forEach((b) => b.addEventListener('click', () => viewerBtns.forEach((x) => { x.tabIndex = x === b ? 0 : -1; })));
    render();
  }

  /* ================================================================ BOOKS: tamper with a posted entry */
  const chain = $('[data-chain]');
  if (chain) {
    const tamperBtn = $('[data-tamper]');
    const reverseBtn = $('[data-reverse]');
    const resetBtn = $('[data-books-reset]');
    const msg = $('[data-tamper-msg]');
    const amt = $('[data-tamper-amt]');
    const hash = $('[data-hash="1040"]');
    const INTRO = msg.innerHTML;

    const setTamper = (on) => {
      tamperBtn.setAttribute('aria-checked', String(on));
      chain.classList.toggle('is-tampered', on);
      amt.textContent = on ? '125.00' : '1,250.00';
      hash.textContent = on ? '#d07a' : '#4be1';
      msg.classList.toggle('is-refused', on);
      msg.innerHTML = on
        ? `<span class="refusal">${icon('triangle-alert')}<b>Refused. JE-1040 now fingerprints as #d07a, but JE-1041 still points to #4be1. The chain breaks right here. <span>Posted entries are never edited, and October is closed.</span></b></span>`
        : 'Back as posted. The chain is whole again.';
    };

    tamperBtn.addEventListener('click', () => setTamper(tamperBtn.getAttribute('aria-checked') !== 'true'));
    reverseBtn.addEventListener('click', () => {
      setTamper(false);
      chain.classList.add('is-reversed');
      tamperBtn.disabled = true;
      reverseBtn.disabled = true;
      resetBtn.hidden = false;
      msg.textContent = 'JE-1043 reverses JE-1040 today, Nov 18. October stays closed, the chain stays whole, and the correction is on the record for your accountant.';
      resetBtn.focus({ preventScroll: true });
    });
    resetBtn.addEventListener('click', () => {
      chain.classList.remove('is-reversed', 'is-tampered');
      tamperBtn.disabled = false;
      reverseBtn.disabled = false;
      setTamper(false);
      msg.innerHTML = INTRO;
      resetBtn.hidden = true;
      tamperBtn.focus({ preventScroll: true });
    });
  }

  /* ================================================================ SCALE: one person or three hundred */
  const org = $('[data-org]');
  const size = $('[data-size]');
  if (org && size) {
    const out = $('[data-size-out]');
    const stageText = $('[data-stage]');
    const stack = $('[data-stack]', org);
    const members = $('[data-members]', org);
    const PEOPLE = [['MO', 'av-mo'], ['SO', 'av-so'], ['TB', 'av-tb'], ['PN', 'av-pn'], ['JC', 'av-jc'], ['RA', 'av-lp'], ['KD', 'av-tb'], ['EV', 'av-pn']];
    const av = (i, c) => `<span class="av ${c}" aria-hidden="true">${i}</span>`;
    const muted = (t) => `<span class="muted">${t}</span>`;

    const rowsFor = (n) => {
      return {
        approve: n === 1 ? ['solo', muted("No approvals. You're the only one logging time.")]
          : n < 5 ? ['owner', `${av('MO', 'av-mo')}<span><b>Maya</b> approves every submitted week</span>`]
          : ['admins', `${av('MO', 'av-mo')}${av('SO', 'av-so')}<span>An owner or administrator approves submitted weeks</span>`],
        finance: n < 5 ? ['owner', muted('Maya handles the money. Add an administrator when you want one.')]
          : n < 80 ? ['one', `${av('SO', 'av-so')}<span><b>Sam Okafor</b> · invoices, payments, approvals</span>`]
          : ['many', `${av('SO', 'av-so')}<span><b>Sam Okafor</b> + ${Math.max(2, Math.floor(n / 60))} more administrators</span>`],
        teams: n < 5 ? ['all', muted('Everyone is on every project.')]
          : ['scoped', `<span class="proj">${av('TB', 'av-tb')}Site build, Rebrand</span><span class="muted">members see only the projects they're on</span>`],
        acct: n < 5 ? ['none', muted('Invite your accountant whenever you want one.')]
          : ['seat', `${av('JC', 'av-jc')}<span><b>Jules Carter</b> · read-only, every entry and report</span>`],
      };
    };

    const stageFor = (n) => n === 1 ? 'Just you. You own it, log it, bill it, with nothing in your way.'
      : n < 5 ? 'A few of you. The owner approves the weeks and handles the money.'
      : n < 40 ? 'A studio. An administrator takes the money and the approvals off the owner.'
      : n < 150 ? 'An agency. Administrators, members on their own projects, and an accountant who only reads.'
      : 'A large agency. The same deal and the same books, and every seat sees only its part.';

    const seen = {};
    const update = () => {
      const n = Number(size.value);
      const word = n === 1 ? 'person' : 'people';
      out.innerHTML = `<b>${n}</b> ${word}`;
      size.setAttribute('aria-valuetext', `${n} ${word}`);
      size.style.setProperty('--p', `${((n - 1) / 299) * 100}%`);
      stageText.textContent = stageFor(n);
      const shown = Math.min(n, 7);
      stack.innerHTML = PEOPLE.slice(0, shown).map(([i, c]) => av(i, c)).join('') + (n > 7 ? `<span class="av more">+${n - 7}</span>` : '');
      members.textContent = `${n} ${word}`;
      const r = rowsFor(n);
      Object.entries(r).forEach(([k, [key, html]]) => {
        const v = $(`[data-row="${k}"] [data-v]`, org);
        if (seen[k] === key) return;
        const first = seen[k] === undefined;
        seen[k] = key;
        v.innerHTML = html;
        if (!first && !reduced()) { v.classList.remove('is-new'); void v.offsetWidth; v.classList.add('is-new'); }
      });
    };
    size.addEventListener('input', update);
    update();
  }

  /* ================================================================ PLAYBOOK: glyphs move only while on screen */
  const pb = $('[data-pb]');
  if (pb && !reduced()) {
    new IntersectionObserver(([en]) => pb.classList.toggle('is-live', en.isIntersecting), { threshold: 0.15 }).observe(pb);
  }

  /* ================================================================ WAITLIST */
  $$('[data-waitlist]').forEach((form) => {
    const input = $('input[type="email"]', form);
    const msg = $('.wl-msg', form);
    const base = msg.textContent;
    const fail = (text) => {
      form.classList.add('is-error');
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = text;
      input.focus();
    };
    input.addEventListener('input', () => {
      if (!form.classList.contains('is-error')) return;
      form.classList.remove('is-error');
      input.removeAttribute('aria-invalid');
      msg.textContent = base;
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return fail('Enter your work email so we know where to send the invite.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return fail('That email looks incomplete. Check it reads like you@studio.com.');
      form.classList.remove('is-error');
      form.classList.add('is-done');
      input.removeAttribute('aria-invalid');
      const ok = document.createElement('div');
      ok.className = 'wl-ok';
      ok.innerHTML = `${icon('circle-check')}<span>Challenge accepted. You're on the list.<small></small></span>`;
      $('small', ok).textContent = `One email to ${v} when your seat is ready.`;
      form.insertBefore(ok, msg);
      msg.textContent = "Challenge accepted. You're on the list.";
      msg.classList.add('sr-only');
    });
  });
})();
