/* =========================================================================
   Ledgendary audience pages (solo, team, enterprise): behaviour
   Shares app.js for the nav, highlighter and waitlist. This file adds:
   - timelines: autoplaying product windows (loop or play-once)
   - scopes: small state machines driven by buttons, tabs and auto-runs
   - reveals: one-shot entrances when a block scrolls into view
   Content is readable without this file; everything here enhances.
   ========================================================================= */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const easeOut = (x) => 1 - Math.pow(1 - x, 4);

  const FMT = {
    usd: (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    eur: (n) => '€' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    gbp: (n) => '£' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    plain: (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    hm: (mins) => `${Math.floor(mins / 60)} h ${Math.round(mins % 60)} m`,
  };

  /** Roll a figure from `from` to `to`; reduced motion lands it at once. */
  function roll(el, from, to, format, duration = 760) {
    cancelAnimationFrame(el._roll);
    if (reduced.matches) { el.textContent = format(to); return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = format(from + (to - from) * easeOut(p));
      if (p < 1) el._roll = requestAnimationFrame(step);
    };
    el._roll = requestAnimationFrame(step);
  }

  /** Call `fn` once, the first time `el` is a fair way into the viewport. */
  function onView(el, fn, threshold = 0.35) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver((list) => {
      if (!list.some((e) => e.isIntersecting)) return;
      io.disconnect();
      fn();
    }, { threshold });
    io.observe(el);
  }

  /* --------------------------------------------------------------- timelines */

  $$('[data-timeline]').forEach((demo) => {
    const stage = $('[data-stage]', demo) || $('.win', demo);
    const TOTAL = Number(demo.dataset.total);
    const once = demo.hasAttribute('data-once');
    const timed = $$('[data-at], [data-until]', demo).filter((el) => !el.closest('.demo-bar'));
    const rolls = $$('[data-roll]', demo).map((el) => ({
      el, to: Number(el.dataset.roll), from: Number(el.dataset.rollFrom || 0),
      at: Number(el.dataset.rollAt), fmt: FMT[el.dataset.fmt || 'usd'],
    }));
    const chips = $$('.chip', demo);
    const scenes = chips.map((c) => Number(c.dataset.scene));
    const toggle = $('[data-toggle]', demo);
    const live = $('[data-live]', demo);
    const cursor = $('.cursor', demo);
    const cursorLabel = cursor ? $('.cursor-l', cursor) : null;
    const script = $('script[data-cursor]', demo);
    const CURSOR = script ? JSON.parse(script.textContent) : [];

    let t = 0;
    let last = performance.now();
    let userPaused = false;
    let inView = false;
    let started = !once;
    let ended = false;

    const placeCursor = (ev, animate) => {
      if (!cursor) return;
      cursor.classList.toggle('no-anim', !animate);
      if (ev.kind === 'hide') { cursor.classList.add('is-hidden'); return; }
      cursor.classList.remove('is-hidden');
      if (ev.label) cursorLabel.textContent = ev.label;
      if (ev.ink !== undefined) cursor.classList.toggle('is-maya', !!ev.ink);
      const box = stage.getBoundingClientRect();
      let x; let y;
      if (ev.kind === 'park') {
        x = box.width * ev.x; y = box.height * ev.y;
      } else {
        const target = $(ev.target, stage);
        if (!target) return;
        const r = target.getBoundingClientRect();
        if (!r.width) return;
        x = r.left - box.left + r.width * (ev.fx ?? 0.55);
        y = r.top - box.top + r.height * (ev.fy ?? 0.5);
      }
      cursor.style.setProperty('--x', `${Math.round(x)}px`);
      cursor.style.setProperty('--y', `${Math.round(y)}px`);
      if (!animate) { void cursor.offsetWidth; cursor.classList.remove('no-anim'); }
    };

    const settleCursor = (now) => {
      let pos = null; let label; let ink;
      CURSOR.forEach((ev) => {
        if (ev.at > now) return;
        if (ev.label) label = ev.label;
        if (ev.ink !== undefined) ink = ev.ink;
        if (ev.kind !== 'press') pos = ev;
      });
      if (pos) requestAnimationFrame(() => placeCursor({ ...pos, label, ink }, false));
    };

    const press = (sel) => {
      const el = $(sel, stage);
      if (!el) return;
      el.classList.add('press');
      setTimeout(() => el.classList.remove('press'), 200);
    };

    const apply = (now, prev, jumped) => {
      timed.forEach((el) => {
        if (el.dataset.at !== undefined) el.classList.toggle('on', now >= Number(el.dataset.at));
        if (el.dataset.until !== undefined) el.classList.toggle('off', now >= Number(el.dataset.until));
      });
      rolls.forEach(({ el, to, from, at, fmt }) => {
        if (now < at) { el.textContent = fmt(from); return; }
        if (!jumped && prev < at) roll(el, from, to, fmt, 800);
        else if (jumped) el.textContent = fmt(to);
      });
      if (jumped) settleCursor(now);
      else {
        CURSOR.forEach((ev) => {
          if (ev.at > prev && ev.at <= now) {
            if (ev.kind === 'press') press(ev.target);
            else placeCursor(ev, ev.kind !== 'park');
          }
        });
      }
      let idx = 0;
      scenes.forEach((s, i) => { if (now >= s) idx = i; });
      chips.forEach((chip, i) => {
        chip.setAttribute('aria-pressed', String(i === idx));
        const end = scenes[i + 1] ?? TOTAL;
        const p = i < idx ? 1 : i > idx ? 0 : Math.min(1, (now - scenes[i]) / (end - scenes[i]));
        chip.style.setProperty('--p', p.toFixed(3));
      });
    };

    const playing = () => started && !ended && !userPaused && inView && !document.hidden;

    const setPaused = (paused) => {
      userPaused = paused;
      demo.classList.toggle('is-paused', paused || ended);
      if (toggle) toggle.setAttribute('aria-label', paused || ended ? (ended ? 'Replay demonstration' : 'Play demonstration') : 'Pause demonstration');
    };

    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (playing()) {
        const prev = t;
        t += dt;
        if (t >= TOTAL) {
          if (once) {
            t = TOTAL - 1; ended = true; apply(t, prev, false); setPaused(userPaused);
          } else { t = 0; apply(0, 0, true); }
        } else apply(t, prev, false);
      }
      requestAnimationFrame(tick);
    };

    if (toggle) {
      toggle.addEventListener('click', () => {
        if (ended) { ended = false; t = 0; apply(0, 0, true); setPaused(false); return; }
        setPaused(!userPaused);
      });
    }

    chips.forEach((chip, i) => {
      chip.addEventListener('click', () => {
        ended = false;
        started = true;
        t = scenes[i];
        if (userPaused || reduced.matches) t = Number(chip.dataset.settle || scenes[i]);
        apply(t, t, true);
        if (live) live.textContent = chip.dataset.say || chip.textContent.trim();
      });
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          inView = e.isIntersecting;
          if (inView && !started) { started = true; t = 0; apply(0, 0, true); }
        });
      }, { threshold: once ? 0.45 : 0.15 }).observe(demo);
    } else { inView = true; started = true; }

    window.addEventListener('resize', () => settleCursor(t));

    if (reduced.matches) {
      // A meaningful final frame, paused; chips still jump to any moment.
      t = TOTAL - 1;
      started = true;
      apply(t, t, true);
      setPaused(true);
    } else {
      apply(0, 0, true);
    }
    requestAnimationFrame((now) => { last = now; tick(now); });
  });

  /* --------------------------------------------------------------- scopes */

  const HOOKS = {};

  /** Set a scope's state: show what belongs to it, sync controls, announce. */
  function setState(scope, value, opts = {}) {
    const prev = scope.dataset.s;
    scope.dataset.s = value;
    $$('[data-show]', scope).forEach((el) => {
      if (el.closest('[data-scope]') !== scope) return;
      el.classList.toggle('is-shown', el.dataset.show.split(' ').includes(value));
    });
    $$('[data-set]', scope).forEach((btn) => {
      if (btn.closest('[data-scope]') !== scope) return;
      if (btn.closest('.seg, [role="radiogroup"]')) {
        const on = btn.dataset.set === value;
        btn.setAttribute(btn.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-pressed', String(on));
        if (btn.getAttribute('role') === 'radio') btn.tabIndex = on ? 0 : -1;
      }
    });
    const name = scope.dataset.scope;
    if (HOOKS[name]) HOOKS[name](scope, value, prev, opts);
    if (opts.say) {
      const live = $('[data-live]', scope);
      if (live) live.textContent = opts.say;
    }
    if (opts.focus) {
      // The pressed control may have left with its state: hand focus to the next action.
      const next = $$('[data-set].is-shown, [data-show].is-shown [data-set], [data-next].is-shown', scope)
        .find((b) => b.offsetParent !== null && !b.closest('.seg'));
      if (next) next.focus({ preventScroll: true });
      else { const live = $('[data-live]', scope); if (live) { live.tabIndex = -1; } }
    }
  }

  $$('[data-scope]').forEach((scope) => {
    setState(scope, scope.dataset.s || '', { init: true });

    scope.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-set]');
      if (!btn || btn.closest('[data-scope]') !== scope || btn.disabled) return;
      if (btn.getAttribute('role') === 'tab') return;
      stopAuto(scope);
      setState(scope, btn.dataset.set, { say: btn.dataset.say, focus: !btn.closest('.seg, [role="radiogroup"]') });
    });

    // Radio-group keyboard model for segmented controls.
    $$('[role="radiogroup"]', scope).forEach((group) => {
      const radios = $$('[role="radio"]', group);
      radios.forEach((r, i) => r.addEventListener('keydown', (e) => {
        const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        const next = radios[(map[e.key] + radios.length) % radios.length];
        stopAuto(scope);
        setState(scope, next.dataset.set, { say: next.dataset.say });
        next.focus();
      }));
    });

    const auto = scope.dataset.auto;
    if (auto && !reduced.matches) {
      const steps = auto.split(' ');
      const ms = Number(scope.dataset.autoMs || 1700);
      onView(scope, () => {
        let i = 0;
        const run = () => {
          if (scope._autoStopped || i >= steps.length) return;
          setState(scope, steps[i], { say: scope.dataset[`say${i}`] });
          i += 1;
          scope._auto = setTimeout(run, ms);
        };
        scope._auto = setTimeout(run, 500);
      }, 0.5);
    }
  });

  function stopAuto(scope) {
    scope._autoStopped = true;
    clearTimeout(scope._auto);
  }

  /* --------------------------------------------------------------- tabs */

  $$('[role="tablist"][data-tabs]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const panel = document.getElementById(tabs[0].getAttribute('aria-controls'));
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      setState(panel, tab.dataset.set, { say: tab.dataset.say });
      if (!reduced.matches) {
        $$('[data-anim-on-switch]', panel).forEach((el) => el.animate(
          [{ opacity: 0.35, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0)' }],
          { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        ));
      }
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
  });

  /* --------------------------------------------------------------- reveals */

  $$('[data-reveal]').forEach((el) => {
    if (reduced.matches) { el.classList.add('is-in'); return; }
    el.classList.add('armed');
    onView(el, () => el.classList.add('is-in'), Number(el.dataset.reveal || 0.35));
  });

  /* --------------------------------------------------------------- per-demo hooks */

  /** Figures that roll when a scope enters a state: [data-to-STATE] on [data-figure]. */
  const rollFigures = (scope, value, opts) => {
    $$('[data-figure]', scope).forEach((el) => {
      const key = `to${value.charAt(0).toUpperCase()}${value.slice(1).replace(/-(\w)/g, (_, c) => c.toUpperCase())}`;
      const to = el.dataset[key] ?? el.dataset.toDefault;
      if (to === undefined) return;
      const fmt = FMT[el.dataset.fmt || 'usd'];
      const target = Number(to);
      const from = el._val ?? target;
      el._val = target;
      if (opts.init || from === target) { el.textContent = fmt(target); return; }
      roll(el, from, target, fmt, 700);
      el.classList.remove('changed'); void el.offsetWidth; el.classList.add('changed');
    });
  };

  ['draft', 'asof', 'bill', 'close', 'tamper', 'reports', 'react', 'closed', 'numbers', 'ms']
    .forEach((n) => { HOOKS[n] = rollFigures; });

  // Seats: projects a member is not on leave the list entirely.
  HOOKS.seat = (scope, value) => {
    $$('[data-seat-hide]', scope).forEach((el) => el.classList.toggle('is-hidden', value === 'member'));
  };

  // A week's status track and its cells: lit steps, and locks once approved.
  HOOKS.week = (scope, value) => {
    $$('[data-track]', scope).forEach((li) => li.classList.toggle('a-track-on', li.dataset.track.split(' ').includes(value)));
    scope.classList.toggle('is-locked', ['approved', 'invoiced', 'refused', 'noted'].includes(value));
    scope.classList.toggle('is-noted', value === 'noted');
    scope.classList.toggle('is-refused', value === 'refused');
  };

  // Refund: each step is done once the state it belongs to is reached.
  HOOKS.refund = (scope, value) => {
    $$('[data-step]', scope).forEach((li) => li.classList.toggle('is-done', li.dataset.step.split(' ').includes(value)));
  };

  // Tamper: the edited row shakes when it's rewritten.
  HOOKS.tamper = (scope, value, prev, opts) => {
    scope.classList.toggle('is-broken', value === 'rewritten' || value === 'checked');
    if (!opts.init && value === 'rewritten' && !reduced.matches) {
      const row = $('.a-t-target', scope);
      row.classList.remove('is-shaking'); void row.offsetWidth; row.classList.add('is-shaking');
    }
  };
})();
