// Heartwood DotField, ported verbatim from the design's ui_kits/website/hw-dotfield.js.
// Defines <hw-dotfield preset="landing|approach|icons">. The landing preset reads scroll
// progress from the closest [data-scroll-track] and publishes it as --p on that track.
import './hw-icons.js'

(function () {
if (customElements.get('hw-dotfield')) return;
var TAU = Math.PI * 2, SEEK = 900, STAGGER = 300, FADE = 500;
function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function mulberry(s) { var t = s >>> 0; return function () { t = (t + 0x6d2b79f5) >>> 0; var r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; }; }
function gauss(r, m, sd) { var u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return m + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
function hex(h) { h = h.replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function density(w, h) { var s = Math.sqrt(Math.max(1, w * h) / (1440 * 900)); if (matchMedia('(prefers-reduced-motion: reduce)').matches) s *= .6; if (matchMedia('(pointer: coarse)').matches) s *= .75; return Math.round(clamp(s, .35, 1) * 10) / 10; }

var ICONS = {
  house: [[11,14],[11,13],[11,12],[13,12],[13,13],[13,14],[15,14],[15,13],[15,12],[15,11],[9,14],[9,13],[9,12],[9,11],[9,10],[15,10],[8,10],[9,9],[10,8],[11,7],[15,9],[14,8],[13,7],[12,6],[16,10],[11,11],[12,11],[13,11],[15,15],[14,15],[9,15],[13,15],[11,15],[10,15],[12,15]],
  locationPin: [[12,11],[11,8],[12,8],[13,8],[10,9],[9,10],[9,11],[9,12],[10,13],[10,14],[14,9],[15,10],[15,11],[15,12],[14,13],[14,14],[11,15],[11,16],[13,15],[13,16],[12,17],[12,18]]
};

var L = {
  scatter: function (n, w, h, o) { var r = o.rand, mx = w * (o.margin || .04), my = h * (o.margin || .04), p = []; for (var i = 0; i < n; i++) p.push({ x: mx + r() * (w - mx * 2), y: my + r() * (h - my * 2) }); return { pos: p }; },
  rings: function (n, w, h, o) {
    var r = o.rand, ax = Math.min(w, h), rs = o.radiusScale || 1, mn = ax * o.minRadius * rs, mx = ax * o.maxRadius * rs, cnt = o.ringDotCounts, k = cnt.length, p = [];
    for (var ring = 0; ring < k; ring++) {
      var R = k <= 1 ? mx : mn + (mx - mn) * (ring / (k - 1)), tot = Math.max(1, Math.round(cnt[ring] * o.ds)), jit = o.jitter != null ? o.jitter : R * .1, waves = [], nw = 2 + Math.floor(r() * 4);
      for (var q = 0; q < nw; q++) waves.push({ f: 1 + Math.floor(r() * 5), ph: r() * TAU, amp: .15 + r() * .35 });
      for (var i = 0; i < tot; i++) {
        var a = r() * TAU;
        for (var t = 0; t < 32; t++) { a = r() * TAU; var d = .3; for (var wv = 0; wv < waves.length; wv++) d += o.clump * waves[wv].amp * (.5 + .5 * Math.sin(a * waves[wv].f + waves[wv].ph)); if (r() < d) break; }
        var rr = R - jit + r() * jit * 2; p.push({ x: w / 2 + Math.cos(a) * rr, y: h / 2 + Math.sin(a) * rr });
      }
    }
    return { pos: p };
  },
  icon: function (n, w, h, o) { var size = Math.min(w, h) * o.size, cell = size / 25, ox = w / 2 - size / 2, oy = h / 2 - size / 2; return { pos: ICONS[o.icon].map(function (c) { return { x: ox + (c[0] + .5) * cell, y: oy + (c[1] + .5) * cell, diam: cell * .7 }; }) }; },
  tool: function (n, w, h, o) { var rows = (window.HW_ICONS || {})[o.icon]; if (!rows) return { pos: [] }; var nn = Math.max(rows.length, rows[0].length), size = Math.min(w, h) * o.size, cell = size / nn, ox = w / 2 - rows[0].length * cell / 2, oy = h / 2 - rows.length * cell / 2, p = []; rows.forEach(function (r, y) { for (var x = 0; x < r.length; x++) if (r[x] === '#') p.push({ x: ox + (x + .5) * cell, y: oy + (y + .5) * cell, diam: cell * .62 }); }); return { pos: p }; },
  scatterPlot: function (n, w, h, o) {
    var r = o.rand, pd = o.padding, cw = clamp(w - pd.l - pd.r, 240, o.maxChartW), ch = clamp(h - pd.t - pd.b, 200, o.maxChartH), cx = w / 2 + (pd.l - pd.r) / 2, cy = h / 2 + (pd.t - pd.b) / 2, ox = cx - cw / 2, oy = cy - ch / 2, xr = o.xMax - o.xMin, yr = o.yMax - o.yMin, p = [];
    for (var i = 0; i < o.count; i++) { var x = o.xMin + xr * (.0185 + r() * .8889), t = (x - o.xMin) / xr, y = clamp(o.yMin + (.14 + t * .72) * yr + gauss(r, 0, .11 * yr), o.yMin + .03 * yr, o.yMax - .01 * yr); p.push({ x: ox + t * cw, y: oy + (1 - (y - o.yMin) / yr) * ch, diam: o.diam }); }
    return { pos: p, meta: { ox: ox, oy: oy, cw: cw, ch: ch, o: o } };
  }
};

function plotOpts(mobile) {
  var o = { count: 68, xMin: 1, xMax: 10, yMin: 1, yMax: 3, xTicks: [1,2,3,4,5,6,7,8,9,10], yTicks: [1,1.5,2,2.5,3], xLabel: 'Years held', yLabel: 'Return multiple', subtitle: 'Illustrative only. Not a forecast or guarantee of performance.', diam: 10, fontSize: 14, maxChartW: 620, maxChartH: 320, yLabelPad: 78, padding: { l: 108, r: 40, t: 40, b: 104 } };
  if (mobile) Object.assign(o, { diam: 8, fontSize: 12, yLabelPad: 52, maxChartH: 260, padding: { l: 68, r: 22, t: 24, b: 66 } });
  return o;
}
var PRESETS = {
  landing: { color: '#C5DCEA', dot: 10, count: 28, drift: 2, wander: true, responsive: true, scrub: .3,
    states: function () { return [{ name: 'scatter', opts: { margin: .06, count: 28 } }, { name: 'rings', opts: { ringDotCounts: [90, 110, 130, 150], minRadius: .28, maxRadius: .48, radiusScale: .92, clump: .2, jitter: 12 } }]; } },
  approach: { color: '#B5542F', dot: 10, count: 60, drift: 0, wander: false, responsive: false, scrub: .5, seed: 20240813, interval: 3400,
    loop: function (m) { return [{ name: 'scatter', opts: { margin: .06, count: 60 } }, { name: 'icon', opts: { icon: 'house', size: .72 } }, { name: 'scatterPlot', opts: plotOpts(m) }, { name: 'icon', opts: { icon: 'locationPin', size: .64 } }]; } }
};

class HWDotField extends HTMLElement {
  connectedCallback() {
    Object.assign(this.style, { display: 'block', position: 'absolute', inset: '0', pointerEvents: 'none' });
    if (!this.cv) { this.cv = document.createElement('canvas'); Object.assign(this.cv.style, { width: '100%', height: '100%', display: 'block' }); this.appendChild(this.cv); }
    var pr = this.getAttribute('preset') || 'landing', P;
    if (pr === 'icons') {
      var names = (this.getAttribute('icons') || 'HOUSE').split('|'), sz = +(this.getAttribute('icon-size') || .7);
      P = { color: '#BC532D', dot: 9, count: 60, drift: 1.5, wander: false, responsive: false, scrub: .4, interval: +(this.getAttribute('interval') || 3400), start: 0,
        loop: function () { var sc = { name: 'scatter', opts: { margin: .08, count: 60 } }, st = names.map(function (n) { return n === 'SCATTER' ? sc : { name: 'tool', opts: { icon: n, size: sz } }; }); return names.indexOf('SCATTER') < 0 ? [sc].concat(st) : st; } };
    } else P = PRESETS[pr];
    this.P = P;
    this.rgb = hex(this.getAttribute('color') || P.color);
    this.seed = (P.seed || Math.floor(Math.random() * 0xffffffff)) >>> 0 || 1;
    this.dots = []; this.cache = []; this.scrubbing = false; this.prog = 0; this.frame = 0; this.mouse = { x: -1e4, y: -1e4 };
    this.track = this.closest('[data-scroll-track]');
    this.ds = 1; this.w = 0; this.h = 0; this.visible = true;
    this._mm = e => { var r = this.getBoundingClientRect(); this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener('pointermove', this._mm, { passive: true });
    this.ro = new ResizeObserver(() => { cancelAnimationFrame(this._rzf); this._rzf = requestAnimationFrame(() => this.resize()); }); this.ro.observe(this);
    this.io = new IntersectionObserver(es => { this.visible = es[0].isIntersecting; }, { rootMargin: '200px' }); this.io.observe(this);
    if (P.loop) { this.li = P.start != null ? P.start : 2; this._iv = setInterval(() => { if (!this.visible) return; var lp = P.loop(this.w < 768); this.li = (this.li + 1) % lp.length; var s = lp[this.li]; this.setLayout(s.name, s.opts); }, P.interval); }
    this.last = performance.now();
    var tick = t => { this.raf = requestAnimationFrame(tick); var dt = Math.min(64, t - this.last); this.last = t; this.step(t, dt); };
    this.raf = requestAnimationFrame(tick);
  }
  disconnectedCallback() { cancelAnimationFrame(this.raf); clearInterval(this._iv); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); window.removeEventListener('pointermove', this._mm); }
  get dotD() { return this.P.dot * (.85 + .15 * this.ds); }
  mk(x, y, a, d) { return { x: x, y: y, a: a, d: d, ang: Math.random() * TAU, nk: Math.random() * 2000, sp: .01 + Math.random() * .14, nx: 0, ny: 0, dp: Math.random() * TAU, dx: 0, dy: 0, mode: 'wander', tw: null }; }
  ensure(n) { while (this.dots.length < n) this.dots.push(this.mk(Math.random() * this.w, Math.random() * this.h, 0, 0)); }
  build(name, opts, rand) { var n = Math.max(0, Math.round((opts.count || this.P.count) * this.ds)); return L[name](n, this.w, this.h, Object.assign({}, opts, { rand: rand, ds: this.ds })); }
  resize() {
    var w = this.clientWidth, h = this.clientHeight; if (!w || !h || this._rz || (w === this.w && h === this.h)) return; this._rz = true;
    var dpr = Math.min(2, devicePixelRatio || 1); this.cv.width = w * dpr; this.cv.height = h * dpr; this.dpr = dpr;
    var first = !this.w; this.w = w; this.h = h; this.ds = this.P.responsive ? density(w, h) : 1; this.cache = [];
    if (first) { for (var i = 0; i < this.P.count; i++) this.dots.push(this.mk(Math.random() * w, Math.random() * h, 255, this.dotD)); }
    if (this.P.states) { if (this.scrubbing) this.seek(this.prog); }
    else { var s = this.P.loop(w < 768)[this.li]; this.setLayout(s.name, s.opts, true); }
    this._rz = false;
  }
  state(i) { if (!this.cache[i]) { var s = this.P.states()[i]; this.cache[i] = this.build(s.name, s.opts, mulberry((this.seed ^ (i * 0x9e3779b9)) >>> 0 || 1)); } return this.cache[i]; }
  seek(t) {
    var A = this.state(0).pos, B = this.state(1).pos, mn = Math.min(A.length, B.length), mx = Math.max(A.length, B.length), ve = t * (STAGGER + SEEK), D = this.dotD;
    this.ensure(mx);
    for (var i = 0; i < this.dots.length; i++) {
      var d = this.dots[i]; d.tw = null;
      if (i >= mx) { d.mode = 'dead'; d.a = 0; d.d = 0; continue; }
      d.mode = 'parked';
      var el = ve - (mx <= 1 ? 0 : i / (mx - 1) * STAGGER), e = el <= 0 ? 0 : el >= SEEK ? 1 : ease(el / SEEK);
      if (i < mn) { d.x = A[i].x + (B[i].x - A[i].x) * e; d.y = A[i].y + (B[i].y - A[i].y) * e; d.a = 255; d.d = D; }
      else if (A.length > B.length) { d.x = A[i].x; d.y = A[i].y; d.a = 255 * (1 - e); d.d = D * (1 - e); }
      else { d.x = B[i].x; d.y = B[i].y; d.a = 255 * e; d.d = D * e; }
    }
  }
  setLayout(name, opts, instant) {
    if (!this.w) return;
    var r = this.build(name, opts, mulberry(this.seed)), pos = r.pos, now = performance.now(), dur = instant ? 1 : SEEK, stg = instant ? 0 : STAGGER, D = this.dotD;
    if (instant) { this.ovPrev = null; this.ov = r.meta ? { m: r.meta, t0: now - FADE } : null; }
    else { this.ovPrev = this.ov ? { m: this.ov.m, t0: now } : null; this.ov = r.meta ? { m: r.meta, t0: now + stg + dur } : null; }
    this.ensure(pos.length); var den = pos.length > 1 ? pos.length - 1 : 1;
    for (var i = 0; i < this.dots.length; i++) {
      var d = this.dots[i];
      if (i >= pos.length) { d.tw = { sx: d.x, sy: d.y, ex: d.x, ey: d.y, sa: d.a, ea: 0, sd: d.d, ed: 0, t0: now, dur: instant ? 1 : FADE, after: 'dead' }; d.mode = 'seek'; continue; }
      var p = pos[i]; d.mode = 'seek';
      d.tw = { sx: d.x, sy: d.y, ex: p.x, ey: p.y, sa: d.a, ea: 255, sd: d.d, ed: p.diam || D, t0: now + i / den * stg, dur: dur, after: 'parked' };
    }
  }
  step(now, dt) {
    if (!this.w) { if ((this._rt = (this._rt || 0) + 1) % 15 === 1) this.resize(); if (!this.w) return; }
    if (!this.visible) return;
    var P = this.P;
    if (this.track) {
      var rc = this.track.getBoundingClientRect(), span = rc.height - innerHeight, target = span > 0 ? clamp(-rc.top / span, 0, 1) : 0;
      this.prog += (target - this.prog) * (1 - Math.exp(-dt / (P.scrub * 1000)));
      if (Math.abs(target - this.prog) < 1e-4) this.prog = target;
      this.track.style.setProperty('--p', this.prog.toFixed(4));
      if (P.states && (this.prog > 0.0005 || this.scrubbing)) { this.scrubbing = true; this.seek(this.prog); }
    }
    this.frame++;
    var nt = this.frame * .0032;
    if (!this.scrubbing) for (var i = 0; i < this.dots.length; i++) {
      var d = this.dots[i];
      if (d.mode === 'wander' && P.wander) {
        var n = Math.sin(d.nk + nt * 1.7) * .6 + Math.sin(d.nk * 1.3 + nt * 3.1) * .4;
        d.ang += n * .011; var vx = Math.cos(d.ang) * d.sp, vy = Math.sin(d.ang) * d.sp; d.x += vx; d.y += vy;
        var R = this.dotD / 2;
        if (d.x < R || d.x > this.w - R) { d.x = clamp(d.x, R, this.w - R); vx = -vx; }
        if (d.y < R || d.y > this.h - R) { d.y = clamp(d.y, R, this.h - R); vy = -vy; }
        d.ang = Math.atan2(vy, vx);
      } else if (d.mode === 'seek' && d.tw) {
        var tw = d.tw, el = now - tw.t0;
        if (el >= tw.dur) { d.x = tw.ex; d.y = tw.ey; d.a = tw.ea; d.d = tw.ed; d.mode = tw.after; d.tw = null; }
        else if (el > 0) { var u = ease(el / tw.dur); d.x = tw.sx + (tw.ex - tw.sx) * u; d.y = tw.sy + (tw.ey - tw.sy) * u; d.a = tw.sa + (tw.ea - tw.sa) * u; d.d = tw.sd + (tw.ed - tw.sd) * u; }
      }
      if (P.drift > 0 && d.mode === 'parked') { d.dp += .01; d.dx = Math.cos(d.dp) * P.drift; d.dy = Math.sin(d.dp * 1.3) * P.drift; }
    }
    var m = this.mouse, rad = 110;
    for (var j = 0; j < this.dots.length; j++) {
      var q = this.dots[j], tx = 0, ty = 0, vx2 = q.x - m.x, vy2 = q.y - m.y, ds = vx2 * vx2 + vy2 * vy2;
      if (ds < rad * rad && ds > 1e-6) { var dist = Math.sqrt(ds), f = 16 * (1 - dist / rad) * (1 - dist / rad); tx = vx2 / dist * f; ty = vy2 / dist * f; }
      q.nx += (tx - q.nx) * .18; q.ny += (ty - q.ny) * .18;
    }
    var c = this.cv.getContext('2d'), rgb = this.rgb;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); c.clearRect(0, 0, this.w, this.h);
    for (var k = 0; k < this.dots.length; k++) {
      var p = this.dots[k]; if (p.a <= 0 || p.d <= 0) continue;
      c.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (p.a / 255).toFixed(3) + ')';
      c.beginPath(); c.arc(p.x + p.nx + p.dx, p.y + p.ny + p.dy, p.d / 2, 0, TAU); c.fill();
    }
    if (this.ovPrev) { var e1 = now - this.ovPrev.t0; if (e1 >= FADE) this.ovPrev = null; else this.plot(c, this.ovPrev.m, 1 - ease(Math.max(0, e1) / FADE)); }
    if (this.ov) { var e2 = now - this.ov.t0; if (e2 > 0) this.plot(c, this.ov.m, e2 >= FADE ? 1 : ease(e2 / FADE)); }
  }
  plot(c, L, f) {
    var o = L.o, rgb = this.rgb, col = function (a) { return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (a / 255 * f) + ')'; };
    c.save(); c.font = '500 ' + o.fontSize + 'px "PP Right Serif Mono", monospace';
    c.strokeStyle = col(173); c.lineWidth = 1; c.beginPath();
    c.moveTo(L.ox, L.oy + L.ch + .5); c.lineTo(L.ox + L.cw, L.oy + L.ch + .5); c.moveTo(L.ox + .5, L.oy); c.lineTo(L.ox + .5, L.oy + L.ch); c.stroke();
    c.fillStyle = col(255); c.textAlign = 'center'; c.textBaseline = 'top';
    o.xTicks.forEach(function (v) { c.fillText(String(v), L.ox + (v - o.xMin) / (o.xMax - o.xMin) * L.cw, L.oy + L.ch + 14); });
    c.fillText(o.xLabel, L.ox + L.cw / 2, L.oy + L.ch + 44);
    c.textAlign = 'right'; c.textBaseline = 'middle';
    o.yTicks.forEach(function (v) { c.fillText(v.toFixed(1) + 'x', L.ox - 14, L.oy + (1 - (v - o.yMin) / (o.yMax - o.yMin)) * L.ch); });
    c.save(); c.translate(L.ox - o.yLabelPad, L.oy + L.ch / 2); c.rotate(-Math.PI / 2); c.textAlign = 'center'; c.fillText(o.yLabel, 0, 0); c.restore();
    c.font = '500 ' + Math.max(10, o.fontSize * .74) + 'px "PP Right Serif Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'top'; c.fillStyle = 'rgba(140,140,140,' + f + ')';
    c.fillText(o.subtitle, L.ox + L.cw / 2, L.oy + L.ch + 44 + o.fontSize + 8);
    c.restore();
  }
}
customElements.define('hw-dotfield', HWDotField);
})();
