/* Ledgendary, look v4: Episodes. One script for every page.
   Content is visible by default; motion is layered on only when welcome. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motionOk = !reduce.matches;
  if (motionOk) root.classList.add('motion');
  var icon = function (name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  };

  /* ---------------------------------------------------------------
     Nav border once the page scrolls
     --------------------------------------------------------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------
     Waitlist forms (no network during the alpha mock)
     --------------------------------------------------------------- */
  document.querySelectorAll('form.wl').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var note = form.querySelector('.wl-note');
    var initial = note ? note.innerHTML : '';
    var say = function (state, html) {
      form.dataset.state = state;
      note.innerHTML = html;
    };
    input.addEventListener('input', function () {
      if (form.dataset.state === 'error') { form.dataset.state = ''; note.innerHTML = initial; input.removeAttribute('aria-invalid'); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      var problem = '';
      if (!v) problem = 'Add your email so we know where to send the invite.';
      else if (v.indexOf('@') < 1) problem = 'That email is missing the @ and the part after it.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) problem = 'That email is missing a domain ending, like .com.';
      if (problem) {
        input.setAttribute('aria-invalid', 'true');
        say('error', icon('circle-alert') + problem);
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      say('done', icon('check') + 'Challenge accepted. You’re on the list.');
      form.querySelector('button').disabled = true;
      input.readOnly = true;
    });
  });

  /* ---------------------------------------------------------------
     Visibility helper: run while on screen, pause when off
     --------------------------------------------------------------- */
  var watch = function (el, onIn, onOut, threshold) {
    if (!('IntersectionObserver' in window)) { onIn(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) onIn(); else if (onOut) onOut(); });
    }, { threshold: threshold || 0.35 }).observe(el);
  };

  /* ---------------------------------------------------------------
     "Previously on…" recap strip: five frames, autoplay, pausable
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-recap]').forEach(function (strip) {
    var frames = Array.prototype.slice.call(strip.querySelectorAll('.frame'));
    var segs = Array.prototype.slice.call(strip.querySelectorAll('.recap-seg'));
    var btn = strip.querySelector('.recap-toggle');
    var live = strip.querySelector('.recap-live');
    var per = 2600;
    var idx = 0, t = 0, playing = motionOk, visible = false, last = 0, raf = 0;

    var paint = function () {
      frames.forEach(function (f, i) { f.classList.toggle('is-on', i === idx); });
      segs.forEach(function (s, i) {
        s.style.setProperty('--p', i < idx ? 1 : i === idx ? Math.min(t / per, 1) : 0);
        s.setAttribute('aria-current', i === idx ? 'step' : 'false');
      });
    };
    var announce = function () {
      if (live) live.textContent = 'Frame ' + (idx + 1) + ' of ' + frames.length + ': ' + frames[idx].getAttribute('aria-label');
    };
    var setBtn = function () {
      btn.innerHTML = icon(playing ? 'pause' : 'play') + '<span class="vh">' + (playing ? 'Pause the recap' : 'Play the recap') + '</span>';
      btn.setAttribute('aria-pressed', playing ? 'false' : 'true');
    };
    var loop = function (now) {
      if (!playing || !visible) { raf = 0; return; }
      if (!last) last = now;
      t += now - last; last = now;
      if (t >= per) {
        t = 0;
        idx = (idx + 1) % frames.length;
        frames[idx].classList.remove('is-on');
        void frames[idx].offsetWidth;
      }
      paint();
      raf = requestAnimationFrame(loop);
    };
    var start = function () { if (!raf && playing && visible) { last = 0; raf = requestAnimationFrame(loop); } };

    segs.forEach(function (s, i) {
      s.addEventListener('click', function () { idx = i; t = 0; paint(); announce(); });
    });
    btn.addEventListener('click', function () {
      playing = !playing; setBtn();
      if (playing) start(); else announce();
    });
    if (!motionOk) { idx = frames.length - 1; t = per; }
    paint(); setBtn();
    watch(strip, function () { visible = true; start(); }, function () { visible = false; }, 0.2);
  });

  /* ---------------------------------------------------------------
     Title cards: split words, reveal as they enter
     --------------------------------------------------------------- */
  document.querySelectorAll('.tc h2 .tt').forEach(function (t) {
    var words = t.textContent.trim().split(/\s+/);
    var code = t.parentNode.querySelector('.sxe');
    t.parentNode.setAttribute('aria-label', (code ? code.textContent + ': ' : '') + t.textContent.trim());
    t.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true" style="--i:' + i + '">' + w + '</span>';
    }).join(' ');
    if (code) code.setAttribute('aria-hidden', 'true');
  });
  if (motionOk && 'IntersectionObserver' in window) {
    var tcs = document.querySelectorAll('.tc');
    var vh = window.innerHeight;
    tcs.forEach(function (tc) {
      if (tc.getBoundingClientRect().top > vh * 0.9) tc.classList.add('pre');
    });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('pre'); tio.unobserve(en.target); }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    tcs.forEach(function (tc) { tio.observe(tc); });
  }

  /* ---------------------------------------------------------------
     Demo engine. Every state is authored in the DOM from frame one:
     data-from="n" shows from beat n, data-until="n" shows up to beat n,
     data-at="1 3" shows only at those beats. Beats are buttons.
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-demo]').forEach(function (demo) {
    var beats = Array.prototype.slice.call(demo.querySelectorAll('[data-go]'));
    var n = beats.length;
    var auto = demo.dataset.demo !== 'choice';
    var cap = demo.querySelector('.beat-cap span');
    var play = demo.querySelector('.beat-play');
    var els = Array.prototype.slice.call(demo.querySelectorAll('[data-from],[data-until],[data-at]'));
    var step = 0, timer = 0, playing = false, visible = false, played = false;

    var set = function (s, announce) {
      step = s;
      demo.dataset.step = s;
      els.forEach(function (el) {
        var on = true;
        if (el.dataset.from) on = on && s >= +el.dataset.from;
        if (el.dataset.until) on = on && s <= +el.dataset.until;
        if (el.dataset.at) on = el.dataset.at.split(' ').indexOf(String(s)) > -1;
        var was = !el.classList.contains('off');
        el.classList.toggle('off', !on);
        if (on && !was && el.classList.contains('flash')) {
          el.classList.remove('hl-on'); void el.offsetWidth; el.classList.add('hl-on');
        }
      });
      demo.querySelectorAll('[data-press="' + s + '"]').forEach(function (b) {
        b.classList.remove('press'); void b.offsetWidth; b.classList.add('press');
      });
      beats.forEach(function (b, i) {
        b.setAttribute('aria-pressed', i + 1 === s ? 'true' : 'false');
        b.classList.toggle('is-done', auto && i + 1 < s);
      });
      if (cap) {
        cap.textContent = beats[s - 1] ? beats[s - 1].dataset.cap : '';
        if (announce === false) cap.parentNode.setAttribute('aria-live', 'off');
        else cap.parentNode.setAttribute('aria-live', 'polite');
      }
    };
    var setPlay = function () {
      if (!play) return;
      var atEnd = step >= n && !playing;
      var name = playing ? 'pause' : atEnd ? 'rotate-ccw' : 'play';
      var label = playing ? 'Pause this episode' : atEnd ? 'Replay this episode' : 'Play this episode';
      play.innerHTML = icon(name) + '<span class="vh">' + label + '</span>';
    };
    var stop = function () { clearTimeout(timer); playing = false; setPlay(); };
    var tick = function () {
      clearTimeout(timer);
      if (!playing || !visible) return;
      if (step >= n) { stop(); return; }
      var cur = beats[step - 1];
      var dur = cur && cur.dataset.dur ? +cur.dataset.dur : 2300;
      timer = setTimeout(function () {
        if (!playing || !visible) return;
        set(step + 1, false);
        if (step >= n) stop(); else tick();
      }, dur);
    };
    var go = function () { playing = true; setPlay(); tick(); };

    beats.forEach(function (b, i) {
      b.addEventListener('click', function () { played = true; stop(); set(i + 1); setPlay(); });
    });
    if (play) {
      play.addEventListener('click', function () {
        if (playing) { stop(); return; }
        played = true;
        if (step >= n) set(1);
        go();
      });
    }

    var start = +(demo.dataset.start || n);
    if (auto && motionOk) {
      set(1, false);
      setPlay();
      watch(demo, function () {
        visible = true;
        if (!played) { played = true; go(); } else if (playing) tick();
      }, function () { visible = false; clearTimeout(timer); }, 0.45);
    } else {
      set(start, false);
      setPlay();
    }
  });

  /* ---------------------------------------------------------------
     Tabs (arrow keys, Home, End)
     --------------------------------------------------------------- */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ---------------------------------------------------------------
     Season index: tracks the episode on screen, jumps between them
     --------------------------------------------------------------- */
  var index = document.querySelector('.index');
  if (index && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(index.querySelectorAll('a[href^="#"]'));
    var fill = index.querySelector('.index-fill');
    var eps = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var mark = function () {
      var line = window.innerHeight * 0.4;
      var cur = -1;
      eps.forEach(function (ep, i) { if (ep && ep.getBoundingClientRect().top < line) cur = i; });
      links.forEach(function (a, i) {
        a.setAttribute('aria-current', i === cur ? 'true' : 'false');
        a.classList.toggle('is-seen', i <= cur);
      });
      if (fill) fill.style.setProperty('--progress', cur < 0 ? 0 : cur / Math.max(links.length - 1, 1));
    };
    window.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    mark();
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'start' });
        history.replaceState(null, '', a.getAttribute('href'));
        var h = target.querySelector('h2');
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      });
    });
  }
})();
