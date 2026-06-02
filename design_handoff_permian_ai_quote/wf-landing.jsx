// wf-landing.jsx — Landing page, 3 directions. Width 1280.

// shared bits ---------------------------------------------------
function Logo({ light }) {
  const c = light ? '#fff' : WF_INK;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <Ico s={22} shape="diamond" c={c} />
      <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '.01em', color: c }}>PERMIAN <span style={{ color: WF_BLUE }}>AI</span> QUOTE</span>
    </div>
  );
}
function Nav({ light }) {
  const c = light ? 'rgba(255,255,255,.8)' : WF_INK2;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
      {['Platform', 'How it works', 'Security', 'Pricing'].map(t =>
        <span key={t} style={{ fontSize: 15, color: c }}>{t}</span>)}
    </div>
  );
}
function LogoWall({ cols = 6 }) {
  const names = ['CHEVRON', 'CONOCOPHILLIPS', 'EXXONMOBIL', 'OCCIDENTAL', 'EOG RESOURCES', 'DIAMONDBACK'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 16 }}>
      {names.map(n => (
        <div key={n} className="wf-ph" style={{ height: 46, borderRadius: 7, borderColor: '#c4bdac' }}>
          <span className="wf-mono" style={{ fontSize: 11, color: '#9a9384', letterSpacing: '.06em' }}>{n}</span>
        </div>
      ))}
    </div>
  );
}
function Steps({ vertical }) {
  const steps = [
    ['01', 'Upload Documents', 'RFQs, specs, drawings, PDFs, Word & Excel files.'],
    ['02', 'AI Extraction', 'Identifies equipment, quantities, dimensions, materials, pressures, codes, coatings.'],
    ['03', 'Review Scope', 'Verify and edit the extracted information before pricing.'],
    ['04', 'Estimate Pricing', 'Historical project intelligence generates realistic budgetary ranges.'],
  ];
  if (vertical) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {steps.map(([n, t, d], i) => (
          <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div className="wf-mono" style={{ fontSize: 13, color: '#fff', background: WF_BLUE, width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{n}</div>
            <div><H sz={18}>{t}</H><Sub style={{ marginTop: 3 }}>{d}</Sub></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      {steps.map(([n, t, d], i) => (
        <React.Fragment key={n}>
          <Box r={i} p={20} style={{ flex: 1, background: WF_CARD }}>
            <div className="wf-mono" style={{ fontSize: 13, color: WF_BLUE, fontWeight: 700, marginBottom: 10 }}>STEP {n}</div>
            <Ph label="[ icon ]" h={42} w={42} style={{ marginBottom: 14 }} />
            <H sz={18} style={{ marginBottom: 6 }}>{t}</H>
            <Sub>{d}</Sub>
          </Box>
          {i < steps.length - 1 && <div style={{ alignSelf: 'center', color: WF_BLUE, fontSize: 22, padding: '0 10px', flex: '0 0 auto' }}>→</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

// A — Blueprint hero (centered, full-bleed engineering background) ----
function LandingA() {
  return (
    <WF>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px' }}>
        <Logo /><Nav /><div style={{ display: 'flex', gap: 10 }}><Btn sm>Sign in</Btn><Btn sm pri>Start New RFQ</Btn></div>
      </div>
      {/* hero */}
      <div style={{ position: 'relative', height: 560, margin: '0 24px', borderRadius: 14, overflow: 'hidden' }}>
        <Ph label="[ FULL-BLEED HERO BG — animated engineering grid · blueprint overlays · tank silhouettes · pressure-vessel wireframes · particle drift · dark gradient ]"
          h="100%" r={14} style={{ position: 'absolute', inset: 0, borderColor: '#b8b1a0', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 16 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
          <H sz={52} style={{ lineHeight: 1.08, maxWidth: 820 }}>Upload Your RFQ.<br />Let AI Build the Scope.</H>
          <Sub sz={18} style={{ maxWidth: 640, marginTop: 18 }}>Transform specifications, datasheets, drawings, and bid packages into structured equipment summaries and budgetary pricing estimates in minutes.</Sub>
          <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
            <Btn pri style={{ fontSize: 18, padding: '12px 26px' }}>Start New RFQ</Btn>
            <Btn style={{ fontSize: 18, padding: '12px 26px' }}>▷ Watch Demo</Btn>
          </div>
        </div>
        <DCInlineNote top={18} right={18}>full-screen hero · subtle particle motion</DCInlineNote>
      </div>
      {/* trust */}
      <div style={{ textAlign: 'center', padding: '54px 48px 10px' }}>
        <Sub style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 13, marginBottom: 22 }}>Trusted by Industrial Engineering Teams</Sub>
        <LogoWall />
      </div>
      {/* how it works */}
      <div style={{ padding: '46px 48px 40px' }}>
        <H sz={28} style={{ textAlign: 'center', marginBottom: 28 }}>How it works</H>
        <Steps />
      </div>
    </WF>
  );
}

// B — Split hero, product-forward -------------------------------------
function LandingB() {
  return (
    <WF>
      {/* compact trust strip above the fold */}
      <div style={{ background: '#f0ece2', padding: '8px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, borderBottom: `1.5px solid ${WF_LINE}` }}>
        <span className="wf-mono" style={{ fontSize: 11, color: WF_INK2, letterSpacing: '.06em' }}>TRUSTED BY</span>
        {['CHEVRON', 'CONOCOPHILLIPS', 'EXXONMOBIL', 'OCCIDENTAL', 'EOG', 'DIAMONDBACK'].map(n =>
          <span key={n} className="wf-mono" style={{ fontSize: 12, color: '#a59d8c' }}>{n}</span>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px' }}>
        <Logo /><Nav /><div style={{ display: 'flex', gap: 10 }}><Btn sm>Sign in</Btn><Btn sm pri>Start New RFQ</Btn></div>
      </div>
      {/* split hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, padding: '46px 48px 30px', alignItems: 'center' }}>
        <div>
          <Chip style={{ marginBottom: 18 }}><Ico s={12} shape="circle" c={WF_BLUE} /> AI scope + budgetary pricing</Chip>
          <H sz={46} style={{ lineHeight: 1.1 }}>Upload Your RFQ.<br />Let AI Build the Scope.</H>
          <Sub sz={17} style={{ marginTop: 18, maxWidth: 480 }}>Transform specifications, datasheets, drawings, and bid packages into structured equipment summaries and budgetary pricing estimates in minutes.</Sub>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <Btn pri style={{ fontSize: 17, padding: '12px 24px' }}>Start New RFQ</Btn>
            <Btn style={{ fontSize: 17, padding: '12px 24px' }}>▷ Watch Demo</Btn>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 30 }}>
            {[['1,248', 'projects'], ['94.6%', 'avg accuracy'], ['< 5 min', 'to scope']].map(([a, b]) =>
              <div key={b}><div className="wf-mono" style={{ fontSize: 24, fontWeight: 700 }}>{a}</div><Sub sz={12}>{b}</Sub></div>)}
          </div>
        </div>
        <Box r={1} p={0} style={{ overflow: 'hidden' }}>
          <Ph label="[ PRODUCT PREVIEW — Equipment Review screen: PDF viewer (left) + extracted equipment cards (right), confidence badges ]" h={420} r={0} style={{ border: 'none' }} />
        </Box>
        <DCInlineNote top={150} right={26}>show the real product, not an abstract hero</DCInlineNote>
      </div>
      {/* how it works — alternating vertical */}
      <div style={{ padding: '36px 48px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div><H sz={28} style={{ marginBottom: 8 }}>From documents to scope<br />in four steps</H><Sub sz={15} style={{ maxWidth: 360 }}>Every extracted field is traceable back to its source page.</Sub></div>
        <Steps vertical />
      </div>
    </WF>
  );
}

// C — Data-forward hero with live demo panel + ticker -----------------
function LandingC() {
  return (
    <WF>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px' }}>
        <Logo /><Nav /><div style={{ display: 'flex', gap: 10 }}><Btn sm>Sign in</Btn><Btn sm pri>Start New RFQ</Btn></div>
      </div>
      {/* asymmetric hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 36, padding: '40px 48px 24px', alignItems: 'center' }}>
        <div>
          <H sz={48} style={{ lineHeight: 1.08 }}>Upload Your RFQ.<br />Let AI Build the Scope.</H>
          <Sub sz={17} style={{ marginTop: 18, maxWidth: 500 }}>Transform specifications, datasheets, drawings, and bid packages into structured equipment summaries and budgetary pricing estimates in minutes.</Sub>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            <Btn pri style={{ fontSize: 17, padding: '12px 24px' }}>Start New RFQ</Btn>
            <Btn style={{ fontSize: 17, padding: '12px 24px' }}>▷ Watch Demo</Btn>
          </div>
        </div>
        {/* mini live-demo card */}
        <Box r={2} p={0} style={{ overflow: 'hidden', background: WF_CARD }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: `1.6px solid ${WF_LINE}` }}>
            <Ico s={10} shape="circle" c={WF_GREEN} /><span className="wf-mono" style={{ fontSize: 12, color: WF_INK2 }}>live_extraction.log</span>
          </div>
          <div style={{ padding: 16, display: 'flex', gap: 16 }}>
            <Ph label="[ RFQ.pdf ]" h={150} w={120} />
            <div className="wf-mono" style={{ flex: 1, fontSize: 12, lineHeight: 1.9, color: WF_INK2 }}>
              <div style={{ color: WF_GREEN }}>✓ reading RFQ…</div>
              <div style={{ color: WF_GREEN }}>✓ API 650 tank ×3</div>
              <div style={{ color: WF_GREEN }}>✓ 12 ft Ø · 20 ft H</div>
              <div style={{ color: WF_BLUE }}>▸ extracting pressure…</div>
              <div style={{ color: WF_AMBER }}>! coating — needs review</div>
            </div>
          </div>
        </Box>
        <DCInlineNote top={26} right={26}>animated typing feed</DCInlineNote>
      </div>
      {/* metrics ticker */}
      <div style={{ display: 'flex', borderTop: `1.6px solid ${WF_LINE}`, borderBottom: `1.6px solid ${WF_LINE}`, margin: '14px 48px' }}>
        {[['1,248', 'Historical projects'], ['94.6%', 'Avg accuracy'], ['$2.1B', 'Quoted volume'], ['< 5 min', 'RFQ → scope']].map(([a, b], i) =>
          <div key={b} style={{ flex: 1, padding: '18px 20px', borderLeft: i ? `1.6px solid ${WF_LINE}` : 'none' }}>
            <div className="wf-mono" style={{ fontSize: 26, fontWeight: 700 }}>{a}</div><Sub sz={13}>{b}</Sub>
          </div>)}
      </div>
      {/* trust */}
      <div style={{ textAlign: 'center', padding: '34px 48px 6px' }}>
        <Sub style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 13, marginBottom: 20 }}>Trusted by Industrial Engineering Teams</Sub>
        <LogoWall />
      </div>
      {/* how it works pipeline */}
      <div style={{ padding: '40px 48px 40px' }}>
        <H sz={28} style={{ textAlign: 'center', marginBottom: 26 }}>The pipeline</H>
        <Steps />
      </div>
    </WF>
  );
}

// small inline annotation used inside landing frames
function DCInlineNote({ children, top, right, left, bottom }) {
  return (
    <div style={{ position: 'absolute', top, right, left, bottom, background: '#fef4a8', color: '#5a4a2a', fontSize: 12, padding: '5px 9px', borderRadius: 5, transform: 'rotate(-2deg)', boxShadow: '0 2px 6px rgba(0,0,0,.12)', maxWidth: 200, lineHeight: 1.3, zIndex: 5 }}>{children}</div>
  );
}

Object.assign(window, { LandingA, LandingB, LandingC, Logo, DCInlineNote });
