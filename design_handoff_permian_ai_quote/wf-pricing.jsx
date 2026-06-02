// wf-pricing.jsx — Historical Pricing Analysis, 2 directions. 1280×900.

const COST = [
  ['Material', 360, '#3a3a3a'],
  ['Labor', 240, '#565656'],
  ['Coating', 95, '#727272'],
  ['Freight', 60, '#8e8e8e'],
  ['Engineering', 70, '#a7a7a7'],
  ['Contingency', 55, '#c2c2c2'],
  ['Margin', 130, WF_BLUE],
];
const TOTAL = COST.reduce((a, c) => a + c[1], 0); // 1010 ($k)

function PriceHero({ big }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Sub sz={14} style={{ textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Estimated Price Range</Sub>
      <div className="wf-mono" style={{ fontSize: big ? 52 : 40, fontWeight: 700, color: WF_BLUE, lineHeight: 1 }}>$890,000 – $1,120,000</div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
        <Status kind="ok">Confidence 87%</Status>
        <Chip>Midpoint ~$1.01M</Chip>
        <Chip>Based on 14 similar projects</Chip>
      </div>
    </div>
  );
}

function StackedBar() {
  return (
    <div>
      <div style={{ display: 'flex', height: 30, borderRadius: 6, overflow: 'hidden', border: `1.6px solid ${WF_INK}` }}>
        {COST.map(([n, v, c]) => <div key={n} title={n} style={{ width: (v / TOTAL * 100) + '%', background: c }} />)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 14 }}>
        {COST.map(([n, v, c]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 13, height: 13, borderRadius: 3, background: c, border: '1.3px solid rgba(0,0,0,.25)' }} />
            <span style={{ fontSize: 13.5 }}>{n}</span>
            <span className="wf-mono" style={{ fontSize: 12.5, color: WF_INK2 }}>${v}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimilarCard({ id, cust, year, equip, price, sim, r }) {
  return (
    <Box r={r} p={14} style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span className="wf-mono" style={{ fontSize: 13, color: WF_BLUE }}>Project {id}</span>
        <Status kind="ok">{sim}% match</Status>
      </div>
      <Ph label="[ project thumb ]" h={64} style={{ marginBottom: 10 }} />
      <Field label="Customer" value={cust} style={{ marginBottom: 7 }} />
      <div style={{ display: 'flex', gap: 16 }}>
        <Field label="Year" value={year} /><Field label="Equipment" value={equip} />
      </div>
      <Rule style={{ margin: '10px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Sub sz={12}>Sold price</Sub><span className="wf-mono" style={{ fontSize: 20, fontWeight: 700 }}>{price}</span>
      </div>
    </Box>
  );
}
const SIMS = [
  { id: '#4582', cust: 'Chevron', year: '2024', equip: "12'×20' API 650", price: '$302,000', sim: 94 },
  { id: '#4410', cust: 'Occidental', year: '2023', equip: "12'×24' API 650", price: '$338,000', sim: 89 },
  { id: '#4298', cust: 'EOG Resources', year: '2023', equip: "10'×20' API 650", price: '$271,000', sim: 86 },
];

// A — Estimate hero -------------------------------------------------
function PricingHero() {
  return (
    <WF>
      <AppTop active={3} crumb="Pricing Analysis" />
      <div style={{ padding: '30px 56px', overflow: 'hidden' }}>
        <Box r={1} p={28} style={{ marginBottom: 24, position: 'relative', boxShadow: '0 3px 16px rgba(37,99,235,.08)' }}>
          <PriceHero big />
          <DCInlineNote top={16} right={18}>animated counter on load</DCInlineNote>
        </Box>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, marginBottom: 26 }}>
          <Box r={0} p={20}>
            <H sz={17} style={{ marginBottom: 16 }}>Cost breakdown</H>
            <StackedBar />
          </Box>
          <Box r={2} p={20}>
            <H sz={17} style={{ marginBottom: 14 }}>Range drivers</H>
            {[['Steel price volatility', 'warn'], ['Coating spec unconfirmed', 'warn'], ['Freight distance est.', 'info'], ['Strong historical match', 'ok']].map(([t, k], i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i ? `1.3px solid ${WF_LINE}` : 'none' }}>
                <Status kind={k}>{k === 'ok' ? '↓ tightens' : k === 'info' ? '~' : '↑ widens'}</Status><Sub sz={14} style={{ color: WF_INK }}>{t}</Sub></div>)}
          </Box>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <H sz={18}>Similar historical projects</H><Tag>sorted by similarity score</Tag>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {SIMS.map((s, i) => <SimilarCard key={s.id} {...s} r={i} />)}
        </div>
      </div>
    </WF>
  );
}

// B — Analyst dashboard --------------------------------------------
function PricingDashboard() {
  return (
    <WF>
      <AppTop active={3} crumb="Pricing Analysis" />
      <div style={{ padding: '26px 40px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 26, overflow: 'hidden' }}>
        <div>
          <Box r={1} p={22} style={{ marginBottom: 20 }}>
            <PriceHero />
          </Box>
          <Box r={0} p={20} style={{ marginBottom: 20 }}>
            <H sz={16} style={{ marginBottom: 14 }}>Cost breakdown</H>
            <StackedBar />
          </Box>
          <Box r={2} p={20}>
            <H sz={16} style={{ marginBottom: 14 }}>This estimate vs. historical median</H>
            {[['Material', 78, 70], ['Labor', 60, 64], ['Coating', 40, 33], ['Margin', 55, 48]].map(([n, a, b], i) => (
              <div key={n} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span>{n}</span><span className="wf-mono" style={{ color: WF_INK2 }}>this · median</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ height: 9, background: WF_LINE, borderRadius: 5, overflow: 'hidden' }}><div style={{ width: a + '%', height: '100%', background: WF_BLUE }} /></div>
                  <div style={{ height: 9, background: WF_LINE, borderRadius: 5, overflow: 'hidden' }}><div style={{ width: b + '%', height: '100%', background: '#9a9384' }} /></div>
                </div>
              </div>
            ))}
            <DCInlineNote top={16} right={16}>comparison bar chart</DCInlineNote>
          </Box>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <H sz={17}>Similar projects · 14</H><Chip>min similarity 80%</Chip>
          </div>
          <Box r={1} p={0} style={{ marginBottom: 18 }}>
            <div className="wf-mono" style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 70px', padding: '9px 14px', fontSize: 10.5, color: WF_INK2, textTransform: 'uppercase', borderBottom: `1.6px solid ${WF_LINE}` }}>
              <span>Project</span><span>Equipment</span><span>Sold</span><span>Match</span>
            </div>
            {[...SIMS, { id: '#4101', cust: 'Diamondback', year: '2022', equip: "12'×18'", price: '$289K', sim: 83 }].map((s, i) => (
              <div key={s.id} className="wf-link" style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 70px', alignItems: 'center', padding: '11px 14px', borderTop: i ? `1.3px solid ${WF_LINE}` : 'none' }}>
                <div><div className="wf-mono" style={{ fontSize: 13, color: WF_BLUE }}>{s.id}</div><Sub sz={12}>{s.cust} · {s.year}</Sub></div>
                <span className="wf-mono" style={{ fontSize: 12 }}>{s.equip || "12'×18'"}</span>
                <span className="wf-mono" style={{ fontSize: 13, fontWeight: 700 }}>{s.price}</span>
                <Status kind="ok">{s.sim}%</Status>
              </div>
            ))}
          </Box>
          <SimilarCard {...SIMS[0]} r={0} />
          <DCInlineNote top={4} right={10}>click a row → compare detail</DCInlineNote>
        </div>
      </div>
    </WF>
  );
}

Object.assign(window, { PricingHero, PricingDashboard });
