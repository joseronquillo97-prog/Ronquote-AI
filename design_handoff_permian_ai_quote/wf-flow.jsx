// wf-flow.jsx — New RFQ upload (2) + AI processing (2). 1180×820.

// shared in-app top bar + stepper -----------------------------------
function Brand() {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ico s={18} shape="diamond" c={WF_INK} /><span style={{ fontWeight: 700, fontSize: 15 }}>PERMIAN <span style={{ color: WF_BLUE }}>AI</span> QUOTE</span></div>;
}
function Stepper({ active = 0 }) {
  const steps = ['Upload', 'AI Processing', 'Review Scope', 'Pricing'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: i <= active ? 1 : .45 }}>
            <div className="wf-mono" style={{ width: 22, height: 22, borderRadius: '50%', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < active ? WF_GREEN : i === active ? WF_BLUE : 'transparent', color: i <= active ? '#fff' : WF_INK2, border: i > active ? `1.5px solid ${WF_INK2}` : 'none' }}>{i < active ? '✓' : i + 1}</div>
            <span style={{ fontSize: 13, fontWeight: i === active ? 700 : 400, color: i === active ? WF_INK : WF_INK2 }}>{s}</span>
          </div>
          {i < steps.length - 1 && <span style={{ color: WF_LINE }}>————</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
function AppTop({ active, crumb }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 28px', borderBottom: `1.8px solid ${WF_INK}`, background: '#f4f1e8' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Brand /><span style={{ color: WF_LINE }}>/</span><Sub sz={13}>{crumb}</Sub></div>
      <Stepper active={active} />
      <Ph label="JM" h={32} w={32} r={16} style={{ borderColor: '#b1aa9a' }} />
    </div>
  );
}

const FILETYPES = ['PDF', 'DWG', 'XLSX', 'DOCX', 'ZIP'];

// UPLOAD A — big centered dropzone ----------------------------------
function UploadCentered() {
  return (
    <WF>
      <AppTop active={0} crumb="New RFQ" />
      <div style={{ padding: '34px 56px', overflow: 'hidden' }}>
        <H sz={26} style={{ marginBottom: 4 }}>Start a New RFQ</H>
        <Sub sz={15} style={{ marginBottom: 24 }}>Drop your bid package and let AI build the scope.</Sub>
        <Box dash r={1} style={{ borderWidth: 2.4, borderColor: WF_BLUE, background: WF_BLUEW, padding: '56px 24px', textAlign: 'center', marginBottom: 26 }}>
          <Ph label="[ ↑ ]" h={70} w={70} r={35} style={{ margin: '0 auto 18px', borderColor: WF_BLUE, background: 'transparent' }} />
          <H sz={24} style={{ marginBottom: 8 }}>Drag &amp; drop files here</H>
          <Sub sz={15} style={{ marginBottom: 16 }}>or <span className="wf-tag" style={{ display: 'inline' }}>browse your computer</span></Sub>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>{FILETYPES.map(t => <Chip key={t}>{t}</Chip>)}</div>
          <DCInlineNote top={14} right={14}>drag-drop · click to browse</DCInlineNote>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <H sz={17}>Uploaded files (3)</H><Btn sm pri>Build Scope →</Btn>
        </div>
        {[['Chevron_RFQ_2026.pdf', '4.2 MB', 100, 'Uploaded · 14:21', 'ok'],
          ['Tank_Datasheet_API650.xlsx', '880 KB', 100, 'Uploaded · 14:21', 'ok'],
          ['GA_Drawing_Rev_C.dwg', '12 MB', 64, 'Uploading…', 'info']].map(([n, sz, pct, st, k], i) => (
          <Box key={i} r={i} p={14} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <Ph label={n.split('.').pop().toUpperCase()} h={38} w={38} style={{ flex: '0 0 auto' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 15 }}>{n}</span><span className="wf-mono" style={{ fontSize: 12, color: WF_INK2 }}>{sz}</span></div>
              <div style={{ height: 7, background: WF_LINE, borderRadius: 5, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: k === 'ok' ? WF_GREEN : WF_BLUE }} /></div>
            </div>
            <Status kind={k} style={{ flex: '0 0 auto' }}>{st}</Status>
          </Box>
        ))}
      </div>
    </WF>
  );
}

// UPLOAD B — guided multi-source + queue table ----------------------
function UploadGuided() {
  return (
    <WF>
      <AppTop active={0} crumb="New RFQ" />
      <div style={{ padding: '28px 40px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 26, overflow: 'hidden' }}>
        <div>
          <H sz={20} style={{ marginBottom: 14 }}>Add documents</H>
          <Box dash r={0} style={{ borderColor: WF_BLUE, background: WF_BLUEW, padding: '30px 16px', textAlign: 'center', marginBottom: 14 }}>
            <Ph label="[ ↑ ]" h={48} w={48} r={24} style={{ margin: '0 auto 12px', borderColor: WF_BLUE, background: 'transparent' }} />
            <div style={{ fontSize: 15, fontWeight: 700 }}>Drop files</div><Sub sz={12}>or browse</Sub>
          </Box>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[['⌗', 'Import from SharePoint'], ['✉', 'Forward by email'], ['⎙', 'Paste a link']].map(([ic, t]) =>
              <Box key={t} soft p={11} style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: WF_BLUE }}>{ic}</span><Sub sz={14} style={{ color: WF_INK }}>{t}</Sub></Box>)}
          </div>
          <Rule style={{ margin: '16px 0' }} />
          <Sub sz={12}>Supported</Sub>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{FILETYPES.map(t => <Chip key={t}>{t}</Chip>)}</div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <H sz={18}>Upload queue · 4 files</H><Btn sm pri>Build Scope →</Btn>
          </div>
          <Box r={1} p={0}>
            <div className="wf-mono" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 110px', padding: '9px 16px', fontSize: 10.5, color: WF_INK2, textTransform: 'uppercase', borderBottom: `1.6px solid ${WF_LINE}` }}>
              <span>File</span><span>Size</span><span>Progress</span><span>Status</span>
            </div>
            {[['Chevron_RFQ_2026.pdf', '4.2 MB', 100, 'Done', 'ok'],
              ['Datasheet_API650.xlsx', '880 KB', 100, 'Done', 'ok'],
              ['GA_Drawing_RevC.dwg', '12 MB', 64, 'Uploading', 'info'],
              ['Bid_Package.zip', '38 MB', 22, 'Queued', 'warn']].map(([n, sz, pct, st, k], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 110px', alignItems: 'center', padding: '12px 16px', borderTop: i ? `1.4px solid ${WF_LINE}` : 'none' }}>
                <span style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center' }}><Ico s={14} c={WF_INK2} />{n}</span>
                <span className="wf-mono" style={{ fontSize: 12, color: WF_INK2 }}>{sz}</span>
                <div style={{ height: 7, background: WF_LINE, borderRadius: 5, overflow: 'hidden', marginRight: 14 }}><div style={{ width: pct + '%', height: '100%', background: k === 'ok' ? WF_GREEN : WF_BLUE }} /></div>
                <Status kind={k}>{st}</Status>
              </div>
            ))}
          </Box>
          <DCInlineNote top={110} right={20}>files appear as rows as they upload</DCInlineNote>
        </div>
      </div>
    </WF>
  );
}

// AI engine ring (concentric circles + nodes — circles only) ---------
function Engine({ size = 220 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', margin: '0 auto' }}>
      {[1, .74, .48].map((f, i) => (
        <div key={i} style={{ position: 'absolute', inset: `${(1 - f) / 2 * 100}%`, border: `${i === 2 ? 2.4 : 1.8}px ${i === 1 ? 'dashed' : 'solid'} ${i === 2 ? WF_BLUE : WF_INK2}`, borderRadius: '50%' }} />
      ))}
      <div style={{ position: 'absolute', inset: '38%', borderRadius: '50%', background: WF_BLUEW, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="wf-mono"><span style={{ fontSize: 12, color: WF_BLUE, fontWeight: 700 }}>AI</span></div>
      {[0, 60, 120, 180, 240, 300].map(deg => (
        <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: '50%', background: WF_CARD, border: `1.7px solid ${WF_BLUE}`, transform: `rotate(${deg}deg) translateX(${size / 2}px)` }} />
      ))}
    </div>
  );
}
const FEED = ['Reading RFQ…', 'Extracting dimensions…', 'Identifying pressure requirements…', 'Analyzing specifications…', 'Comparing historical projects…', 'Determining confidence levels…'];

// PROCESSING A — centered engine -------------------------------------
function ProcessingCentered() {
  return (
    <WF>
      <AppTop active={1} crumb="New RFQ / Processing" />
      <div style={{ padding: '30px 56px', textAlign: 'center', overflow: 'hidden' }}>
        <Engine size={230} />
        <H sz={26} style={{ marginTop: 22 }}>Building your scope…</H>
        <Sub sz={15} style={{ marginTop: 6 }}>Analyzing 4 documents · 38 pages</Sub>
        <div className="wf-mono" style={{ fontSize: 13, color: WF_BLUE, marginTop: 10 }}>Estimated time remaining: ~1 min 40 sec</div>
        <Box r={1} p={0} style={{ maxWidth: 540, margin: '26px auto 0', textAlign: 'left' }}>
          <div style={{ padding: '10px 16px', borderBottom: `1.6px solid ${WF_LINE}`, display: 'flex', alignItems: 'center', gap: 8 }}><Ico s={9} shape="circle" c={WF_GREEN} /><span className="wf-mono" style={{ fontSize: 12, color: WF_INK2 }}>live activity</span></div>
          <div style={{ padding: '12px 16px' }} className="wf-mono">
            {FEED.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, padding: '5px 0', color: i < 3 ? WF_INK : WF_INK2 }}>
                <span style={{ color: i < 3 ? WF_GREEN : i === 3 ? WF_BLUE : '#c8c1b1' }}>{i < 3 ? '✓' : i === 3 ? '▸' : '○'}</span>{f}
              </div>
            ))}
          </div>
        </Box>
        <DCInlineNote top={40} right={40}>rotating rings · pulsing nodes</DCInlineNote>
      </div>
    </WF>
  );
}

// PROCESSING B — split engine + per-doc progress --------------------
function ProcessingSplit() {
  return (
    <WF>
      <AppTop active={1} crumb="New RFQ / Processing" />
      <div style={{ padding: '30px 44px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 36, alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center' }}>
          <Engine size={210} />
          <H sz={22} style={{ marginTop: 20 }}>67% complete</H>
          <div className="wf-mono" style={{ fontSize: 13, color: WF_BLUE, marginTop: 8 }}>~1:40 remaining</div>
          <div style={{ height: 9, background: WF_LINE, borderRadius: 6, overflow: 'hidden', maxWidth: 280, margin: '14px auto 0' }}><div style={{ width: '67%', height: '100%', background: WF_BLUE }} /></div>
        </div>
        <div>
          <H sz={18} style={{ marginBottom: 12 }}>Documents</H>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
            {[['Chevron_RFQ_2026.pdf', 100, 'ok'], ['Datasheet_API650.xlsx', 100, 'ok'], ['GA_Drawing_RevC.dwg', 54, 'info'], ['Bid_Package.zip', 12, 'warn']].map(([n, pct, k], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Ico s={14} c={WF_INK2} /><span style={{ fontSize: 14, width: 200, flex: '0 0 auto' }}>{n}</span>
                <div style={{ flex: 1, height: 7, background: WF_LINE, borderRadius: 5, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: k === 'ok' ? WF_GREEN : WF_BLUE }} /></div>
                <span className="wf-mono" style={{ fontSize: 12, color: WF_INK2, width: 36, textAlign: 'right' }}>{pct}%</span>
              </div>
            ))}
          </div>
          <Box r={2} p={0}>
            <div style={{ padding: '9px 14px', borderBottom: `1.6px solid ${WF_LINE}` }}><span className="wf-mono" style={{ fontSize: 11, color: WF_INK2, textTransform: 'uppercase' }}>activity feed</span></div>
            <div className="wf-mono" style={{ padding: '10px 14px', fontSize: 12.5, lineHeight: 1.95 }}>
              {FEED.map((f, i) => <div key={i} style={{ color: i < 4 ? WF_INK : WF_INK2 }}><span style={{ color: i < 4 ? WF_GREEN : '#c8c1b1' }}>{i < 4 ? '✓' : '○'}</span> {f}</div>)}
            </div>
          </Box>
        </div>
      </div>
    </WF>
  );
}

Object.assign(window, { AppTop, Stepper, Brand, UploadCentered, UploadGuided, ProcessingCentered, ProcessingSplit });
