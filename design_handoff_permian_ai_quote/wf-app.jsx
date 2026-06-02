// wf-app.jsx — App shell + Dashboard home, 3 nav patterns. 1280×860.

const MENU = ['Dashboard', 'My RFQs', 'Projects', 'Pricing Analysis', 'Historical Projects', 'Reports', 'Admin', 'Settings', 'Help'];

function Metrics({ compact }) {
  const cards = [
    ['Active RFQs', '42', '▲ 6 this week', 'info'],
    ['Pending Review', '8', '3 urgent', 'warn'],
    ['Historical Projects', '1,248', '▲ 24 added', 'ok'],
    ['Average Accuracy', '94.6%', '▲ 1.2 pts', 'ok'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: compact ? 12 : 18 }}>
      {cards.map(([t, v, trend, k], i) => (
        <Box key={t} r={i} p={compact ? 14 : 18} style={{ position: 'relative', boxShadow: '0 2px 10px rgba(37,99,235,.06)' }}>
          <div className="wf-mono" style={{ fontSize: 11, color: WF_INK2, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>{t}</div>
          <div className="wf-mono" style={{ fontSize: compact ? 30 : 40, fontWeight: 700, lineHeight: 1 }}>{v}</div>
          <div style={{ marginTop: 10 }}><Status kind={k}>{trend}</Status></div>
          <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 11, color: '#c8c1b1' }} className="wf-mono">↗ glow</div>
        </Box>
      ))}
    </div>
  );
}

function RFQTable() {
  const rows = [
    ['#4731', 'Chevron — Permian Tank Farm', '6 items', 'Needs review', 'warn'],
    ['#4729', 'EOG — Pressure Vessel Pkg', '11 items', 'Priced', 'ok'],
    ['#4726', 'Occidental — API 650 ×3', '3 items', 'Extracting', 'info'],
    ['#4720', 'Diamondback — Separator Skid', '8 items', 'Priced', 'ok'],
  ];
  return (
    <Box r={2} p={0}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: `1.6px solid ${WF_LINE}` }}>
        <H sz={17}>Recent RFQs</H><span className="wf-tag">View all →</span>
      </div>
      <div className="wf-mono" style={{ display: 'grid', gridTemplateColumns: '90px 1fr 90px 130px', padding: '8px 18px', fontSize: 10.5, color: WF_INK2, textTransform: 'uppercase', letterSpacing: '.04em' }}>
        <span>RFQ</span><span>Project</span><span>Items</span><span>Status</span>
      </div>
      {rows.map(([id, proj, items, st, k], i) => (
        <div key={id} className="wf-link" style={{ display: 'grid', gridTemplateColumns: '90px 1fr 90px 130px', alignItems: 'center', padding: '12px 18px', borderTop: `1.4px solid ${WF_LINE}` }}>
          <span className="wf-mono" style={{ fontSize: 13, color: WF_BLUE }}>{id}</span>
          <span style={{ fontSize: 15 }}>{proj}</span>
          <span className="wf-mono" style={{ fontSize: 13, color: WF_INK2 }}>{items}</span>
          <Status kind={k}>{st}</Status>
        </div>
      ))}
    </Box>
  );
}

function Greeting({ sz = 34 }) {
  return (
    <div>
      <H sz={sz}>Good Morning, Jose</H>
      <Sub sz={16} style={{ marginTop: 4 }}>3 RFQs awaiting review</Sub>
    </div>
  );
}

function ProfileCard({ collapsed }) {
  if (collapsed) return <Ph label="JM" h={36} w={36} r={18} style={{ borderColor: '#b1aa9a' }} />;
  return (
    <Box r={1} p={12} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Ph label="img" h={40} w={40} r={20} style={{ borderColor: '#b1aa9a', flex: '0 0 auto' }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Jose Martinez</div>
        <Sub sz={12}>Permian Tank · Sr. Estimator</Sub>
      </div>
    </Box>
  );
}

// A — Left sidebar (spec default) -------------------------------------
function DashSidebar() {
  return (
    <WF>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: 232, borderRight: `1.8px solid ${WF_INK}`, padding: '20px 16px', display: 'flex', flexDirection: 'column', background: '#f4f1e8' }}>
          <div style={{ marginBottom: 22 }}><Logo /></div>
          <Btn pri style={{ width: '100%', marginBottom: 18 }}>+ New RFQ</Btn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            {MENU.map((m, i) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 10px', borderRadius: 8, fontSize: 15, background: i === 0 ? WF_BLUEW : 'transparent', color: i === 0 ? WF_BLUE : WF_INK, fontWeight: i === 0 ? 700 : 400 }}>
                <Ico s={16} shape={i % 3 === 0 ? 'sq' : i % 3 === 1 ? 'circle' : 'diamond'} c={i === 0 ? WF_BLUE : WF_INK2} />{m}
              </div>
            ))}
          </div>
          <ProfileCard />
        </div>
        <div style={{ flex: 1, padding: '26px 32px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <Greeting />
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Box soft p={0} style={{ padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center', width: 220 }}><span style={{ color: WF_INK2 }}>⌕</span><Sub sz={13}>Search RFQs, projects…</Sub></Box><Ico s={20} shape="circle" /></div>
          </div>
          <Metrics />
          <div style={{ marginTop: 24 }}><RFQTable /></div>
        </div>
      </div>
    </WF>
  );
}

// B — Top nav, full-width -------------------------------------------
function DashTopNav() {
  return (
    <WF>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: `1.8px solid ${WF_INK}`, background: '#f4f1e8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 20 }}>
            {['Dashboard', 'My RFQs', 'Projects', 'Pricing', 'Historical', 'Reports'].map((m, i) =>
              <span key={m} style={{ fontSize: 15, color: i === 0 ? WF_BLUE : WF_INK2, fontWeight: i === 0 ? 700 : 400, borderBottom: i === 0 ? `2px solid ${WF_BLUE}` : 'none', paddingBottom: 4 }}>{m}</span>)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Box soft p={0} style={{ padding: '7px 12px', display: 'flex', gap: 8, alignItems: 'center', width: 200 }}><span style={{ color: WF_INK2 }}>⌕</span><Sub sz={13}>Search…</Sub></Box>
          <Btn sm pri>+ New RFQ</Btn>
          <Ph label="JM" h={34} w={34} r={17} style={{ borderColor: '#b1aa9a' }} />
        </div>
      </div>
      <div style={{ padding: '26px 56px', overflow: 'hidden' }}>
        <div style={{ marginBottom: 24 }}><Greeting /></div>
        <Metrics />
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
          <RFQTable />
          <Box r={1} p={18}>
            <H sz={17} style={{ marginBottom: 12 }}>Activity</H>
            {[['AI priced #4729', WF_GREEN], ['Scope edited #4731', WF_BLUE], ['Coating flagged #4726', WF_AMBER], ['Historical import ✓', WF_GREEN]].map(([t, c], i) =>
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderTop: i ? `1.4px solid ${WF_LINE}` : 'none' }}>
                <Ico s={9} shape="circle" c={c} /><Sub sz={14} style={{ color: WF_INK }}>{t}</Sub></div>)}
          </Box>
        </div>
      </div>
      <DCInlineNote top={70} right={30}>no sidebar — max width for dense tables</DCInlineNote>
    </WF>
  );
}

// C — Icon rail + command bar (terminal vibe) -----------------------
function DashCommand() {
  return (
    <WF>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: 60, borderRight: `1.8px solid ${WF_INK}`, padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, background: '#efece2' }}>
          <Ico s={22} shape="diamond" c={WF_BLUE} />
          <div style={{ height: 1, width: 28, background: WF_LINE, margin: '4px 0' }} />
          {MENU.slice(0, 7).map((m, i) =>
            <div key={m} title={m} style={{ width: 34, height: 34, borderRadius: 8, background: i === 0 ? WF_BLUEW : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ico s={16} shape={i % 3 === 0 ? 'sq' : i % 3 === 1 ? 'circle' : 'diamond'} c={i === 0 ? WF_BLUE : WF_INK2} /></div>)}
          <div style={{ flex: 1 }} />
          <Ph label="JM" h={32} w={32} r={16} style={{ borderColor: '#b1aa9a' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* command bar */}
          <div style={{ padding: '14px 28px', borderBottom: `1.8px solid ${WF_INK}` }}>
            <Box soft p={0} style={{ padding: '10px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: WF_BLUE, fontWeight: 700 }}>⌘K</span>
              <Sub sz={14}>Search RFQs, equipment, historical projects, or run a command…</Sub>
              <div style={{ flex: 1 }} /><Chip>⏎ to run</Chip>
            </Box>
          </div>
          <div style={{ padding: '22px 28px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <Greeting sz={28} /><Btn sm pri>+ New RFQ</Btn>
            </div>
            <Metrics compact />
            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <RFQTable />
              <Box r={0} p={0}>
                <div style={{ padding: '14px 18px', borderBottom: `1.6px solid ${WF_LINE}` }}><H sz={16}>AI activity feed</H></div>
                <div className="wf-mono" style={{ padding: '12px 18px', fontSize: 12.5, lineHeight: 2, color: WF_INK2 }}>
                  <div><span style={{ color: WF_GREEN }}>14:22</span> priced #4729 → $890K–1.12M</div>
                  <div><span style={{ color: WF_BLUE }}>14:19</span> extracting #4726…</div>
                  <div><span style={{ color: WF_AMBER }}>14:11</span> #4731 coating needs review</div>
                  <div><span style={{ color: WF_GREEN }}>13:58</span> historical import ✓ 24 rows</div>
                  <div><span style={{ color: WF_GREEN }}>13:40</span> scope accepted #4720</div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <DCInlineNote top={20} left={80}>⌘K command palette drives everything</DCInlineNote>
    </WF>
  );
}

Object.assign(window, { DashSidebar, DashTopNav, DashCommand });
