// wf-review.jsx — Equipment Review (the heart). 3 directions. 1280×880.
// Demonstrates: click field → highlight source · expandable cards · low-confidence review.

const { useState } = React;

// placeholder PDF page with highlightable regions -------------------
function DocPage({ active, h = 'auto', flex }) {
  const zone = (id, top, label) => {
    const on = active === id;
    return (
      <div style={{ position: 'absolute', left: 24, right: 24, top, height: 26, borderRadius: 4,
        outline: on ? `2.4px solid ${WF_BLUE}` : `1.6px dashed #c8c1b1`,
        background: on ? WF_BLUEW : 'transparent', transition: 'all .15s', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
        <span className="wf-mono" style={{ fontSize: 10, color: on ? WF_BLUE : '#b3ab9a' }}>{label}</span>
      </div>
    );
  };
  return (
    <Box r={0} p={0} style={{ flex, height: h, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: WF_CARD }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: `1.6px solid ${WF_LINE}`, background: '#f4f1e8' }}>
        <span className="wf-mono" style={{ fontSize: 12, color: WF_INK2 }}>Chevron_RFQ_2026.pdf</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="wf-mono"><span style={{ fontSize: 12, color: WF_INK2 }}>◂ 3 / 38 ▸</span><Chip>⌕ zoom</Chip></div>
      </div>
      <div style={{ position: 'relative', flex: 1, padding: '18px 24px', minHeight: 360 }}>
        <Bar w="55%" h={12} mb={16} c="#d4cdbd" />
        <Bars lines={3} last="80%" h={7} />
        <div style={{ height: 90 }} />
        {zone('dim', 116, 'TANK: 12 ft Ø × 20 ft H · qty 3')}
        {zone('mat', 152, 'SHELL MATERIAL: carbon steel')}
        <div style={{ height: 60 }} />
        <Bars lines={2} last="70%" h={7} style={{ marginTop: 40 }} />
        {zone('press', 250, 'DESIGN PRESSURE: ⚠ illegible')}
        <Bars lines={3} last="50%" h={7} style={{ marginTop: 70 }} />
      </div>
    </Box>
  );
}

// expandable equipment card -----------------------------------------
function EquipCard({ idx = 1, lowConf, onField, active, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? idx === 1);
  const conf = lowConf ? 47 : 94;
  const fields = [
    ['Type', 'API 650 Storage Tank', null, null],
    ['Quantity', '3', null, null],
    ['Diameter', '12 ft', 'dim', null],
    ['Height', '20 ft', 'dim', null],
    ['Capacity', '16,900 gal', null, null],
    ['Material', 'Carbon Steel', 'mat', null],
    ['Pressure', lowConf ? 'Unknown' : 'Atmospheric', 'press', lowConf ? 'warn' : null],
    ['Coating', lowConf ? 'Unknown' : 'Internal Epoxy', null, lowConf ? 'warn' : null],
    ['Code', 'API 650', null, null],
  ];
  return (
    <Box r={idx} p={0} style={{ marginBottom: 12, borderColor: lowConf ? WF_AMBER : WF_INK, borderWidth: lowConf ? 2 : 1.8 }}>
      <div className="wf-link" onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px' }}>
        <span style={{ color: WF_INK2, fontSize: 13 }}>{open ? '▾' : '▸'}</span>
        <H sz={17} style={{ flex: 1 }}>Equipment #{idx} · {lowConf ? 'Vertical Separator' : 'API 650 Storage Tank'}</H>
        {lowConf ? <Status kind="warn">Needs review · {conf}%</Status> : <Status kind="ok">Confidence {conf}%</Status>}
      </div>
      {open && (
        <div style={{ padding: '4px 16px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px 18px' }}>
            {fields.map(([l, v, link, kind]) => (
              <div key={l} className={link ? 'wf-link' : ''} onClick={link ? () => onField && onField(link) : undefined}
                style={{ borderRadius: 5, padding: link ? '2px 4px' : 0, outline: link && active === link ? `2px solid ${WF_BLUE}` : 'none' }}>
                <Field label={l + (link ? '  ↪' : '')} value={v} kind={kind} hi={kind === 'warn'} />
              </div>
            ))}
          </div>
          {lowConf && <div style={{ marginTop: 12 }}><Btn sm pri>Ask AI to clarify</Btn></div>}
        </div>
      )}
    </Box>
  );
}

function MissingPanel({ compact }) {
  const items = ['Roof Type', 'Corrosion Allowance', 'Internal Coating', 'Nozzle Schedule', 'Wind Design Criteria', 'Seismic Requirements'];
  return (
    <Box r={1} p={0} style={{ borderColor: WF_AMBER, borderWidth: 2, background: WF_AMBERW }}>
      <div style={{ padding: '13px 16px', borderBottom: `1.6px solid ${WF_AMBER}` }}>
        <H sz={17} style={{ color: '#8a5a18' }}>⚠ Information Needed</H>
        <Sub sz={12} style={{ color: '#8a5a18' }}>Tap an item to draft a clarification</Sub>
      </div>
      <div style={{ padding: '8px 12px' }}>
        {items.map((it, i) => (
          <div key={it} className="wf-link" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 8px', borderTop: i ? `1.2px solid rgba(138,90,24,.18)` : 'none' }}>
            <Ico s={13} c={WF_AMBER} /><span style={{ fontSize: 14, flex: 1 }}>{it}</span><span className="wf-tag" style={{ color: WF_AMBER, fontSize: 12 }}>request →</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

function ReviewHead() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: `1.6px solid ${WF_LINE}` }}>
      <div><H sz={20}>Review Scope · Chevron — Permian Tank Farm</H><Sub sz={13}>RFQ #4731 · 6 equipment items · 2 need review</Sub></div>
      <div style={{ display: 'flex', gap: 10 }}><Btn sm>Edit</Btn><Btn sm pri>Accept &amp; Price →</Btn></div>
    </div>
  );
}

// A — Document leads (wide doc, narrow scope) -----------------------
function ReviewDocLead() {
  const [active, setActive] = useState('dim');
  return (
    <WF>
      <AppTop active={2} crumb="Review Scope" />
      <ReviewHead />
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0, height: 700 }}>
        <div style={{ padding: '18px 24px', borderRight: `1.8px solid ${WF_INK}` }}>
          <DocPage active={active} h="100%" />
          <DCInlineNote top={26} left={40}>doc viewer dominant — engineers trust the source</DCInlineNote>
        </div>
        <div style={{ padding: '18px 20px', overflow: 'hidden' }}>
          <H sz={16} style={{ marginBottom: 12 }}>Extracted equipment</H>
          <EquipCard idx={1} onField={setActive} active={active} />
          <EquipCard idx={2} lowConf onField={setActive} active={active} />
          <div style={{ marginTop: 4 }}><Tag>click a field to highlight its source ←</Tag></div>
        </div>
      </div>
    </WF>
  );
}

// B — Scope leads (big cards, doc as reference rail) ----------------
function ReviewScopeLead() {
  const [active, setActive] = useState(null);
  return (
    <WF>
      <AppTop active={2} crumb="Review Scope" />
      <ReviewHead />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 0, height: 700 }}>
        <div style={{ padding: '18px 28px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <H sz={16}>Equipment summary · 6 items</H><Chip>2 need review ⚠</Chip>
          </div>
          <EquipCard idx={1} onField={setActive} active={active} defaultOpen />
          <EquipCard idx={2} lowConf onField={setActive} active={active} />
          <Box r={2} p={13} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: .8 }}>
            <span style={{ color: WF_INK2 }}>▸</span><H sz={16} style={{ flex: 1 }}>Equipment #3 · Catwalk &amp; Stairs</H><Status kind="ok">Confidence 91%</Status>
          </Box>
        </div>
        <div style={{ padding: '18px 18px', borderLeft: `1.8px solid ${WF_INK}`, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <Sub sz={12} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Source document</Sub>
            <DocPage active={active} h={300} />
          </div>
          <MissingPanel />
          <DCInlineNote top={20} right={20}>doc collapses to a reference rail</DCInlineNote>
        </div>
      </div>
    </WF>
  );
}

// C — True 50/50 with explicit traceability link --------------------
function ReviewSplit() {
  const [active, setActive] = useState('press');
  return (
    <WF>
      <AppTop active={2} crumb="Review Scope" />
      <ReviewHead />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 270px', gap: 0, height: 700 }}>
        <div style={{ padding: '16px 18px', borderRight: `1.8px solid ${WF_INK}`, position: 'relative' }}>
          <DocPage active={active} h="100%" />
          {/* traceability connector hint */}
          <div style={{ position: 'absolute', top: 300, right: -10, color: WF_BLUE, fontSize: 20 }}>⟷</div>
        </div>
        <div style={{ padding: '16px 18px', overflow: 'hidden', borderRight: `1.8px solid ${WF_INK}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <H sz={16}>Equipment</H><Tag>linked to source ⟷</Tag>
          </div>
          <EquipCard idx={1} onField={setActive} active={active} />
          <EquipCard idx={2} lowConf onField={setActive} active={active} />
        </div>
        <div style={{ padding: '16px 14px' }}>
          <MissingPanel compact />
          <DCInlineNote top={20} right={14}>50/50 · bidirectional source linking</DCInlineNote>
        </div>
      </div>
    </WF>
  );
}

Object.assign(window, { ReviewDocLead, ReviewScopeLead, ReviewSplit, EquipCard, DocPage, MissingPanel });
