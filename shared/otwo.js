/* ═══════════════════════════════════════════════════════════════════
   OTwo Games — أدوات مشتركة (رسائل، نوافذ، مؤثرات صوتية، احتفال)
   لا تعتمد على أي مكتبة خارجية.
   ═══════════════════════════════════════════════════════════════════ */
const OT = (() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, attrs = {}, html = '') => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    if (html) n.innerHTML = html;
    return n;
  };

  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fmtTime = (s) => {
    const m = Math.floor(s / 60), r = s % 60;
    return m === 0 ? `${r} ث` : `${m}:${String(r).padStart(2, '0')}`;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── رسالة عائمة ──
  let toastEl, toastTimer;
  function toast(msg, type = '', ms = 2600) {
    if (!toastEl) { toastEl = el('div', { class: 'toast' }); document.body.appendChild(toastEl); }
    toastEl.className = 'toast ' + type;
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  // ── نافذة ──
  let back;
  function modal({ icon = '', title = '', lines = [], buttons = [], html = '' }) {
    if (!back) { back = el('div', { class: 'modal-back' }); document.body.appendChild(back); }
    back.innerHTML = '';
    const m = el('div', { class: 'modal' });
    if (icon) m.appendChild(el('div', { class: 'big' }, icon));
    if (title) m.appendChild(el('h2', {}, esc(title)));
    for (const l of lines) m.appendChild(el('p', {}, l));
    if (html) m.appendChild(el('div', {}, html));
    const row = el('div', { class: 'row' });
    for (const b of buttons) {
      row.appendChild(el('button', {
        class: 'btn ' + (b.cls || ''),
        onclick: () => { if (b.keep !== true) closeModal(); if (b.onClick) b.onClick(); },
      }, esc(b.label)));
    }
    if (buttons.length) m.appendChild(row);
    back.appendChild(m);
    requestAnimationFrame(() => back.classList.add('show'));
  }
  function closeModal() { if (back) back.classList.remove('show'); }

  // ── مؤثرات صوتية بسيطة (WebAudio) ──
  let ctx, muted = false;
  try { muted = localStorage.getItem('ot_muted') === '1'; } catch (_) {}
  function beep(freq, dur = 0.12, type = 'sine', vol = 0.12, when = 0) {
    if (muted) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      const t = ctx.currentTime + when;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + dur);
    } catch (_) {}
  }
  const sfx = {
    tap: () => beep(520, 0.05, 'triangle', 0.06),
    ok: () => { beep(660, 0.1); beep(880, 0.14, 'sine', 0.12, 0.09); },
    bad: () => beep(170, 0.22, 'sawtooth', 0.08),
    win: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.18, 'sine', 0.12, i * 0.11)),
    toggle() { muted = !muted; try { localStorage.setItem('ot_muted', muted ? '1' : '0'); } catch (_) {} return muted; },
    get muted() { return muted; },
  };

  // ── احتفال ──
  function confetti(n = 70) {
    const box = el('div', { class: 'confetti' });
    const colors = ['#00b4d8', '#ffb703', '#06d6a0', '#ef476f', '#7c3aed', '#ffffff'];
    for (let i = 0; i < n; i++) {
      const p = el('i');
      p.style.left = rand(100) + '%';
      p.style.background = pick(colors);
      p.style.animationDuration = (1.6 + Math.random() * 1.8) + 's';
      p.style.animationDelay = (Math.random() * 0.5) + 's';
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4200);
  }

  // ── شريط علوي موحّد: عنوان + زر صوت + زر مساعدة (بلا زر إغلاق:
  //    الخروج من زر "خروج" في التطبيق نفسه حتى لا يتكرّر زرّان). ──
  function topbar(title, helpText) {
    const bar = el('div', { class: 'topbar' });
    bar.appendChild(el('h1', {}, esc(title)));
    const snd = el('button', { class: 'icon-btn', title: 'الصوت' }, sfx.muted ? '🔇' : '🔊');
    snd.onclick = () => { snd.textContent = sfx.toggle() ? '🔇' : '🔊'; };
    bar.appendChild(snd);
    if (helpText) {
      const h = el('button', { class: 'icon-btn', title: 'كيف ألعب؟' }, '؟');
      h.onclick = () => modal({ icon: '💡', title: 'كيف ألعب؟', lines: [].concat(helpText),
        buttons: [{ label: 'فهمت' }] });
      bar.appendChild(h);
    }
    return bar;
  }

  return { $, $$, el, rand, pick, shuffle, clamp, fmtTime, esc, toast, modal, closeModal, sfx, confetti, topbar };
})();
