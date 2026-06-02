// wf-kit.jsx — shared low-fi "hand-drawn" wireframe primitives.
// Paper-white, single blue accent, amber/red only for status callouts.
// Everything exported to window for the per-screen files to use.

const WF_INK    = '#2b2b2b';                 // primary ink
const WF_INK2   = '#746f64';                 // soft ink / secondary
const WF_LINE   = '#d4cdbd';                 // filler text bars
const WF_PAPER  = '#faf8f3';                 // paper background
const WF_CARD   = '#ffffff';                 // raised surface
const WF_BLUE   = '#2563eb';                 // the one accent
const WF_BLUEW  = 'rgba(37,99,235,0.13)';    // accent wash
const WF_AMBER  = '#c07e22';                 // needs-review
const WF_AMBERW = 'rgba(192,126,34,0.16)';
const WF_RED    = '#c6463a';                 // error / missing
const WF_GREEN  = '#2f8f63';                 // success / confidence ok

// hand-drawn corner presets — rotate through for organic variety
const WF_R = [
  '14px 9px 16px 10px/10px 15px 9px 16px',
  '9px 16px 10px 14px/15px 9px 16px 10px',
  '16px 10px 9px 15px/9px 16px 11px 14px',
];

if (typeof document !== 'undefined' && !document.getElementById('wf-styles')) {
  const s = document.createElement('style');
  s.id = 'wf-styles';
  s.textContent = `
  .wf-root{font-family:'IBM Plex Sans',sans-serif;color:${WF_INK};background:${WF_PAPER};width:100%;height:100%;position:relative;box-sizing:border-box;overflow:hidden}
  .wf-root *{box-sizing:border-box}
  .wf-mono{font-family:'JetBrains Mono','Courier New',monospace}
  .wf-box{border:1.8px solid ${WF_INK};border-radius:${WF_R[0]};background:${WF_CARD}}
  .wf-soft{border-color:#b1aa9a}
  .wf-dash{border-style:dashed}
  .wf-ph{border:1.7px dashed #b3ab9a;border-radius:8px;display:flex;align-items:center;justify-content:center;text-align:center;
         background:repeating-linear-gradient(45deg,transparent,transparent 9px,rgba(0,0,0,.045) 9px,rgba(0,0,0,.045) 10px)}
  .wf-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1.8px solid ${WF_INK};
          border-radius:${WF_R[1]};padding:9px 18px;font-family:'IBM Plex Sans',sans-serif;font-size:15px;font-weight:500;background:${WF_CARD};color:${WF_INK};white-space:nowrap}
  .wf-btn.pri{background:${WF_BLUE};border-color:#1c4fd0;color:#fff}
  .wf-btn.sm{padding:5px 12px;font-size:14px}
  .wf-chip{display:inline-flex;align-items:center;gap:6px;border:1.5px solid #b1aa9a;border-radius:20px;padding:3px 11px;font-size:13px;color:${WF_INK2};background:${WF_CARD}}
  .wf-tag{display:inline-flex;align-items:center;gap:5px;font-size:13px;color:${WF_BLUE};font-weight:700}
  .wf-link{cursor:pointer;transition:filter .12s,background .12s}
  .wf-link:hover{filter:brightness(.92)}
  .wf-hi{outline:2px solid ${WF_BLUE};outline-offset:1px;background:${WF_BLUEW};border-radius:4px}
  `;
  document.head.appendChild(s);
}

// ── root frame ──────────────────────────────────────────────
function WF({ children, pad = 0, style }) {
  return <div className="wf-root" style={{ padding: pad, ...style }}>{children}</div>;
}

// ── generic hand-drawn surface ──────────────────────────────
function Box({ children, r = 0, soft, dash, p, style, className = '', onClick }) {
  return (
    <div onClick={onClick}
      className={`wf-box ${soft ? 'wf-soft' : ''} ${dash ? 'wf-dash' : ''} ${onClick ? 'wf-link' : ''} ${className}`}
      style={{ borderRadius: WF_R[r % 3], padding: p, ...style }}>{children}</div>
  );
}

// ── filler text bar (use sparingly; prefer real labels) ─────
function Bar({ w = '100%', h = 8, c = WF_LINE, mb = 9, style }) {
  return <div style={{ width: w, height: h, background: c, borderRadius: 6, marginBottom: mb, ...style }} />;
}
function Bars({ lines = 3, last = '60%', gap = 9, h = 8, c = WF_LINE, style }) {
  return (
    <div style={style}>
      {Array.from({ length: lines }).map((_, i) =>
        <Bar key={i} w={i === lines - 1 ? last : '100%'} h={h} c={c} mb={i === lines - 1 ? 0 : gap} />)}
    </div>
  );
}

// ── image / diagram placeholder ─────────────────────────────
function Ph({ label, h = 120, w = '100%', r = 8, style }) {
  return (
    <div className="wf-ph" style={{ height: h, width: w, borderRadius: r, padding: 8, ...style }}>
      <span className="wf-mono" style={{ fontSize: 11, color: WF_INK2, lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

// ── icon slot — simple shape, reads as "icon here" ──────────
function Ico({ s = 18, shape = 'sq', c = WF_INK, style }) {
  const base = { width: s, height: s, border: `1.7px solid ${c}`, flex: '0 0 auto', display: 'inline-block', ...style };
  if (shape === 'circle') base.borderRadius = '50%';
  else if (shape === 'diamond') { base.transform = 'rotate(45deg)'; base.borderRadius = '2px'; }
  else base.borderRadius = '4px';
  return <span style={base} />;
}

// ── button / chip / interaction tag ─────────────────────────
function Btn({ children, pri, sm, style, onClick }) {
  return <button className={`wf-btn ${pri ? 'pri' : ''} ${sm ? 'sm' : ''} ${onClick ? 'wf-link' : ''}`}
    onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</button>;
}
function Chip({ children, style }) { return <span className="wf-chip" style={style}>{children}</span>; }

// interaction annotation — blue "→ does X" note
function Tag({ children, style }) {
  return <span className="wf-tag" style={style}><span style={{ fontSize: 15 }}>→</span>{children}</span>;
}

// ── status pill (confidence / needs review) ─────────────────
function Status({ kind = 'ok', children, style }) {
  const map = { ok: [WF_GREEN, 'rgba(47,143,99,.14)'], warn: [WF_AMBER, WF_AMBERW], err: [WF_RED, 'rgba(198,70,58,.14)'], info: [WF_BLUE, WF_BLUEW] };
  const [c, bg] = map[kind];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: c, background: bg, border: `1.4px solid ${c}`, borderRadius: 6, padding: '2px 9px', ...style }}>{children}</span>;
}

// ── data field — mono label over value (engineering data) ───
function Field({ label, value, hi, kind, style }) {
  return (
    <div style={style}>
      <div className="wf-mono" style={{ fontSize: 10.5, letterSpacing: '.04em', color: WF_INK2, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div className="wf-mono" style={{ fontSize: 15, color: kind === 'warn' ? WF_AMBER : kind === 'err' ? WF_RED : WF_INK, fontWeight: 700, padding: hi ? '1px 4px' : 0, ...(hi ? { background: WF_AMBERW, borderRadius: 4, display: 'inline-block' } : {}) }}>{value}</div>
    </div>
  );
}

// ── section heading inside a frame ──────────────────────────
function H({ children, sz = 22, c = WF_INK, style }) {
  return <div style={{ fontSize: sz, fontWeight: 700, color: c, lineHeight: 1.12, ...style }}>{children}</div>;
}
function Sub({ children, sz = 14, style }) {
  return <div style={{ fontSize: sz, color: WF_INK2, lineHeight: 1.35, ...style }}>{children}</div>;
}

// horizontal rule
function Rule({ dash, c = WF_LINE, style }) {
  return <div style={{ borderTop: `1.6px ${dash ? 'dashed' : 'solid'} ${c}`, ...style }} />;
}

Object.assign(window, {
  WF, Box, Bar, Bars, Ph, Ico, Btn, Chip, Tag, Status, Field, H, Sub, Rule,
  WF_INK, WF_INK2, WF_LINE, WF_PAPER, WF_CARD, WF_BLUE, WF_BLUEW, WF_AMBER, WF_AMBERW, WF_RED, WF_GREEN, WF_R,
});
