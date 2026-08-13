'use client'

import { useState } from 'react'
import {
  Activity, ArrowRight, Bot, BrainCircuit, ChevronDown, ChevronRight,
  CircleDollarSign, Command, Crosshair, Database, Gauge, GitBranch,
  Layers3, Maximize2, MessageSquareText, PanelRightClose, Search,
  ShieldCheck, Sparkles, Target, TrendingDown, TrendingUp, Users, X,
} from 'lucide-react'

const executives = [
  { id: 'CEO', title: 'Chief Executive', focus: 'Strategic alignment', score: '94', icon: Target },
  { id: 'CFO', title: 'Finance', focus: 'Cash & margin', score: '91', icon: CircleDollarSign },
  { id: 'COO', title: 'Operations', focus: 'Delivery capacity', score: '88', icon: Gauge },
  { id: 'CIO', title: 'Intelligence', focus: 'Systems & data', score: '96', icon: BrainCircuit },
  { id: 'CHRO', title: 'People', focus: 'Critical capability', score: '84', icon: Users },
  { id: 'CRO Risk', title: 'Enterprise Risk', focus: 'Exposure control', score: '87', icon: ShieldCheck },
  { id: 'CRO Revenue', title: 'Revenue', focus: 'Pipeline quality', score: '90', icon: TrendingUp },
]

const signals = [
  { title: 'Q3 margin pressure exceeds tolerance', source: 'CFO · COO', age: '12m', severity: 'Decision required', detail: 'Freight and service mix create 180bps downside versus operating plan.' },
  { title: 'Enterprise pipeline conversion recovering', source: 'CRO Revenue', age: '28m', severity: 'Monitoring', detail: 'Late-stage conversion improved 6.4%, led by EMEA strategic accounts.' },
  { title: 'Critical delivery capacity constrained', source: 'COO · CHRO', age: '1h', severity: 'Material', detail: 'Three specialist teams are above 92% planned utilization for six weeks.' },
]

function MicroLine({ orange = false }: { orange?: boolean }) {
  return <svg viewBox="0 0 100 26" className="h-7 w-24" aria-hidden="true"><path d="M1 20 C12 18 14 9 26 13 S42 23 52 12 66 6 74 10 86 17 99 3" fill="none" stroke={orange ? 'var(--governance)' : 'var(--intelligence)'} strokeWidth="2"/><path d="M1 24H99" stroke="var(--border)"/></svg>
}

function Header({ view, setView }: { view: string; setView: (v: string) => void }) {
  return <>
    <header className="flex h-14 items-center border-b bg-background/95 px-4 lg:px-6">
      <button onClick={() => setView('home')} className="flex items-center gap-3" aria-label="BPAI home">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><Command className="size-4"/></span>
        <span className="font-mono text-sm font-semibold tracking-[.18em]">BPAI</span>
        <span className="hidden border-l pl-3 text-xs text-muted-foreground sm:block">Decision Intelligence</span>
      </button>
      <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Workspaces">
        {[['home','Executive Home'],['dashboard','Executive Dashboard'],['cfo','CFO Intelligence']].map(([id,label]) => <button key={id} onClick={() => setView(id)} className={`nav-item ${view === id ? 'nav-active' : ''}`}>{label}</button>)}
      </nav>
      <div className="ml-auto flex items-center gap-3 border-l pl-4 md:ml-4">
        <span className="live-dot"/><span className="hidden font-mono text-[10px] text-muted-foreground sm:block">SYSTEM LIVE</span>
        <span className="rounded border border-governance/30 bg-governance/10 px-2 py-1 font-mono text-[10px] text-governance">DECISION AUTHORITY</span>
        <button className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold">RM</button>
      </div>
    </header>
    <div className="flex items-center justify-between border-b bg-card/40 px-4 py-2 font-mono text-[10px] text-muted-foreground lg:px-6">
      <span>FLASH / GLOBAL HOLDINGS / FY2026</span><span>SYNTHETIC DEMO DATA · UPDATED 09:42 UTC</span>
    </div>
  </>
}

function AskBar({ label='Ask BPAI about the business' }: { label?: string }) {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState(false)
  return <div className="relative mx-auto w-full max-w-3xl">
    <div className="ask-bar">
      <Sparkles className="size-4 text-primary"/><input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) setAnswer(true)}} placeholder={label} aria-label={label}/>
      <span className="font-mono text-[10px] text-muted-foreground">⌘ K</span><button onClick={() => setAnswer(true)} className="ask-submit" aria-label="Submit question"><ArrowRight className="size-4"/></button>
    </div>
    {answer && <div className="absolute left-0 right-0 top-14 z-20 rounded-lg border bg-popover p-4 shadow-2xl">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold"><Bot className="size-4 text-primary"/>BPAI SYNTHESIS <span className="ml-auto font-mono text-[9px] text-muted-foreground">7 AGENTS · 34 SOURCES</span></div>
      <p className="text-sm leading-relaxed text-muted-foreground">Margin pressure is concentrated in freight and services utilization. Protecting the Q3 EBITDA floor requires a governed trade-off: release $1.8M of delivery capacity now, or accept a projected 110bps margin variance.</p>
      <button onClick={() => setAnswer(false)} className="mt-3 text-xs text-primary">Dismiss response</button>
    </div>}
  </div>
}

function StatusStrip() {
  return <section className="grid border-b md:grid-cols-4">
    {[['DECISIONS','3 require authority','governance'],['MATERIAL RISKS','2 above tolerance','governance'],['REVENUE','+6.4% vs plan','blue'],['EXECUTIVES','7 actively reasoning','blue']].map(([k,v,c]) => <div key={k} className="flex items-center justify-between border-b px-4 py-3 md:border-b-0 md:border-r lg:px-6"><div><p className="eyebrow">{k}</p><p className={c === 'governance' ? 'mt-1 text-sm text-governance' : 'mt-1 text-sm'}>{v}</p></div><MicroLine orange={c === 'governance'}/></div>)}
  </section>
}

function ExecutiveSystem({ onSelect }: { onSelect: (id:string) => void }) {
  const positions = [[50,10],[79,22],[88,55],[70,82],[30,82],[12,55],[21,22]]
  return <section className="panel relative min-h-[470px] overflow-hidden p-4 lg:min-h-[520px]" aria-label="Living executive system">
    <div className="flex items-center justify-between"><div><p className="eyebrow">LIVING EXECUTIVE SYSTEM</p><h2 className="mt-1 text-lg font-medium">Enterprise intelligence in motion</h2></div><span className="flex items-center gap-2 font-mono text-[10px] text-primary"><Activity className="size-3"/> 28 ACTIVE ANALYSES</span></div>
    <div className="absolute inset-x-4 bottom-4 top-16">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {positions.map(([x,y],i) => <line key={i} x1="50" y1="48" x2={x} y2={y+4} className="system-line"/>) }
        <circle cx="50" cy="48" r="17" fill="none" className="core-ring"/><circle cx="50" cy="48" r="23" fill="none" className="core-ring muted-ring"/>
      </svg>
      <button onClick={() => onSelect('BPAI')} className="core-node"><BrainCircuit className="size-7"/><b>BPAI CORE</b><span>Cross-functional synthesis</span></button>
      {executives.map((e,i) => { const Icon=e.icon; return <button key={e.id} onClick={() => onSelect(e.id)} className="executive-node" style={{left:`${positions[i][0]}%`,top:`${positions[i][1]}%`}}><span className="node-icon"><Icon className="size-4"/></span><span><b>{e.id}</b><small>{e.focus}</small></span><i>{e.score}</i></button>})}
      <button onClick={() => onSelect('Authority')} className="authority-node"><ShieldCheck className="size-4"/><span><b>HUMAN AUTHORITY</b><small>3 decisions pending</small></span></button>
    </div>
  </section>
}

function Attention({ onDecision }: { onDecision: () => void }) {
  const [open,setOpen] = useState(0)
  return <section className="panel p-0"><div className="flex items-center justify-between border-b p-4"><div><p className="eyebrow text-governance">NEEDS YOUR ATTENTION</p><h2 className="mt-1 text-lg font-medium">Decision queue</h2></div><span className="count-badge">03</span></div>
    {signals.map((s,i) => <div key={s.title} className="border-b last:border-0"><button onClick={() => setOpen(open===i?-1:i)} className="flex w-full items-start gap-3 p-4 text-left"><span className={`mt-1 size-2 rounded-full ${i===0?'bg-governance':'bg-primary'}`}/><span className="min-w-0 flex-1"><b className="block text-sm font-medium">{s.title}</b><small className="mt-1 block font-mono text-[10px] text-muted-foreground">{s.source} · {s.age}</small></span><span className="hidden text-xs text-muted-foreground sm:block">{s.severity}</span><ChevronDown className={`size-4 transition-transform ${open===i?'rotate-180':''}`}/></button>{open===i&&<div className="bg-secondary/30 px-9 py-4 text-sm text-muted-foreground"><p className="leading-relaxed">{s.detail}</p><button onClick={onDecision} className="mt-3 flex items-center gap-2 text-xs text-governance">Review evidence & recommendation <ArrowRight className="size-3"/></button></div>}</div>)}
  </section>
}

function HomeView({ setView, onInspector, onDecision }: any) {
  return <><StatusStrip/><main className="p-4 lg:p-6"><div className="mb-6"><p className="eyebrow text-primary">THURSDAY · 13 AUGUST</p><h1 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">Good morning. The business needs <span className="text-governance">three decisions.</span></h1><p className="mt-2 text-sm text-muted-foreground">Your executive system has reviewed 34 material changes since yesterday.</p></div><AskBar/><div className="mt-6 grid gap-4 xl:grid-cols-[1.5fr_.8fr]"><ExecutiveSystem onSelect={(id) => id==='CFO'?onInspector('CFO'):onInspector(id)}/><Attention onDecision={onDecision}/></div><div className="mt-4 flex justify-end"><button onClick={()=>setView('dashboard')} className="text-xs text-primary">Open full executive dashboard →</button></div></main></>
}

function PerformanceChart() {
  const [hover,setHover] = useState(7)
  const actual=[72,76,75,81,84,82,88,91,89,94,97,99], plan=[70,73,76,79,82,85,88,91,94,97,100,103], forecast=[72,76,75,81,84,82,88,91,94,98,101,106]
  const points=(a:number[])=>a.map((v,i)=>`${20+i*46},${180-(v-65)*3.2}`).join(' ')
  return <section className="panel p-4 lg:p-5"><div className="flex items-start justify-between"><div><p className="eyebrow">BUSINESS PERFORMANCE</p><h2 className="mt-1 text-lg font-medium">Revenue trajectory & forecast confidence</h2></div><span className="font-mono text-[10px] text-muted-foreground">$M · TRAILING 12 MONTHS</span></div><div className="mt-4 flex gap-5 text-[10px]"><span className="text-primary">— Actual</span><span className="text-muted-foreground">-- Plan</span><span className="text-governance">— Forecast</span></div><svg viewBox="0 0 560 220" className="mt-2 w-full" onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setHover(Math.max(0,Math.min(11,Math.round(((e.clientX-r.left)/r.width*560-20)/46))))}}>
    {[40,80,120,160].map(y=><line key={y} x1="20" x2="530" y1={y} y2={y} className="chart-grid"/>)}
    <polygon points={`${points(forecast.map(v=>v+4))} ${points(forecast.map(v=>v-4)).split(' ').reverse().join(' ')}`} fill="var(--intelligence-soft)"/>
    <polyline points={points(plan)} className="plan-line"/><polyline points={points(forecast)} className="forecast-line"/><polyline points={points(actual)} className="actual-line"/>
    <line x1={20+hover*46} x2={20+hover*46} y1="20" y2="185" className="hover-line"/><circle cx={20+hover*46} cy={180-(actual[hover]-65)*3.2} r="4" fill="var(--intelligence)"/>
    {['SEP','NOV','JAN','MAR','MAY','JUL'].map((m,i)=><text key={m} x={20+i*92} y="208" className="chart-label">{m}</text>)}
  </svg><div className="flex items-center justify-between rounded-md bg-secondary/40 px-3 py-2 text-xs"><span>Selected period <b className="ml-2">FY26 M{hover+1}</b></span><span>Actual <b className="ml-2 text-primary">${actual[hover]}M</b></span><span>Variance <b className="ml-2 text-governance">{actual[hover]-plan[hover]}.0%</b></span></div></section>
}

function SignalMap() {
  return <section className="panel p-4 lg:p-5"><p className="eyebrow">SIGNAL RELATIONSHIPS</p><h2 className="mt-1 text-lg font-medium">Materiality network</h2><div className="mt-5 flex min-h-60 items-center justify-center"><svg viewBox="0 0 380 250" className="w-full max-w-md"><g className="signal-links"><path d="M190 125L70 55M190 125L305 50M190 125L330 160M190 125L215 220M190 125L58 190"/></g><circle cx="190" cy="125" r="44" className="signal-core"/><text x="190" y="121" textAnchor="middle" className="signal-title">MARGIN</text><text x="190" y="140" textAnchor="middle" className="signal-sub">HIGH MATERIALITY</text>{[[70,55,'FREIGHT'],[305,50,'PRICING'],[330,160,'PIPELINE'],[215,220,'CAPACITY'],[58,190,'TALENT']].map(([x,y,l],i)=><g key={String(l)}><circle cx={Number(x)} cy={Number(y)} r={i<2?28:22} className={i<2?'risk-node':'data-node'}/><text x={Number(x)} y={Number(y)+4} textAnchor="middle" className="node-text">{l}</text></g>)}</svg></div><div className="flex justify-between border-t pt-3 font-mono text-[10px] text-muted-foreground"><span>16 CONNECTED SIGNALS</span><span>2 CROSS-FUNCTIONAL CONFLICTS</span></div></section>
}

function DecisionPipeline({ onDecision }: { onDecision:()=>void }) {
  const steps=[['SIGNAL','34'],['ANALYSIS','12'],['RECOMMEND','7'],['GOVERN','3'],['DECISION','3'],['OUTCOME','18']]
  return <section className="panel p-4 lg:p-5"><div className="flex justify-between"><div><p className="eyebrow">GOVERNED DECISION PIPELINE</p><h2 className="mt-1 text-lg font-medium">From signal to accountable outcome</h2></div><GitBranch className="size-5 text-primary"/></div><div className="mt-6 grid grid-cols-3 gap-2 lg:grid-cols-6">{steps.map(([s,n],i)=><button key={s} onClick={i>=3?onDecision:undefined} className={`pipeline-step ${i>=3?'govern-step':''}`}><span>{n}</span><small>{s}</small>{i<5&&<ChevronRight className="pipeline-arrow size-3"/>}</button>)}</div><div className="mt-5 grid gap-3 lg:grid-cols-3">{['Protect Q3 EBITDA floor','Approve delivery capacity release','Reset enterprise forecast'].map((x,i)=><button onClick={onDecision} key={x} className="flex items-center gap-3 rounded-md border bg-secondary/20 p-3 text-left"><span className="font-mono text-xs text-governance">0{i+1}</span><span className="text-xs">{x}</span><ArrowRight className="ml-auto size-3 text-muted-foreground"/></button>)}</div></section>
}

function Timeline() { return <section className="panel p-4 lg:p-5"><p className="eyebrow">MATERIAL CHANGE TIMELINE</p><div className="mt-4 flex flex-col gap-0">{[['09:42','CFO','Cash forecast downside widened to $4.2M'],['09:18','CRO Revenue','EMEA conversion moved above plan'],['08:56','COO','Delivery utilization breached threshold'],['07:30','CIO','Forecast model confidence recalibrated']].map(([t,e,d],i)=><div key={t} className="timeline-row"><span className="font-mono text-[10px] text-muted-foreground">{t}</span><span className={`timeline-dot ${i===0||i===2?'risk':''}`}/><span className="text-xs font-medium">{e}</span><span className="text-xs text-muted-foreground">{d}</span></div>)}</div></section> }

function Dashboard({ onDecision }: { onDecision:()=>void }) { return <main className="p-4 lg:p-6"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">EXECUTIVE DASHBOARD</p><h1 className="mt-2 text-2xl font-medium">Enterprise performance & decision flow</h1></div><AskBar label="Investigate performance, risk or executive signals"/></div><div className="mb-4 grid grid-cols-2 border md:grid-cols-5">{[['Revenue','$106M','+6.4%'],['EBITDA','18.2%','-1.1pp'],['Cash','$24.8M','13 wk'],['Pipeline','$184M','1.8×'],['Risk','2 High','+1']].map(([a,b,c],i)=><div key={a} className="metric-cell"><span>{a}</span><b>{b}</b><small className={i===1||i===4?'text-governance':'text-primary'}>{c}</small></div>)}</div><div className="grid gap-4 xl:grid-cols-[1.55fr_.85fr]"><PerformanceChart/><SignalMap/><div className="xl:col-span-2"><DecisionPipeline onDecision={onDecision}/></div><div className="xl:col-span-2"><Timeline/></div></div></main> }

function CashChart() { return <section className="panel p-4 lg:p-5"><div className="flex justify-between"><div><p className="eyebrow">13-WEEK CASH FORECAST</p><h2 className="mt-1 text-lg">Liquidity range & confidence</h2></div><span className="text-right"><b className="block text-xl">$24.8M</b><small className="text-governance">Low point W10</small></span></div><svg viewBox="0 0 620 245" className="mt-3 w-full"><rect x="35" y="175" width="555" height="35" fill="var(--governance-soft)"/><text x="43" y="199" className="threshold-label">LIQUIDITY THRESHOLD $20M</text>{[45,85,125,165,205].map(y=><line key={y} x1="35" x2="590" y1={y} y2={y} className="chart-grid"/>)}<path d="M35 70 C100 60 125 85 175 82 S260 115 310 105 385 145 435 160 520 132 590 120 L590 155 C520 165 475 185 435 190 370 175 345 145 310 150 240 140 210 118 175 120 110 115 75 100 35 110Z" fill="var(--intelligence-soft)"/><path d="M35 88 C105 78 125 100 175 99 S255 128 310 126 380 158 435 172 520 149 590 137" className="actual-line"/><line x1="35" x2="590" y1="175" y2="175" className="threshold-line"/>{Array.from({length:13},(_,i)=><text key={i} x={35+i*46} y="230" className="chart-label">W{i+1}</text>)}</svg><div className="grid grid-cols-3 border-t pt-3 text-xs"><span><small>Base case</small><b>$24.8M</b></span><span><small>Downside</small><b className="text-governance">$19.6M</b></span><span><small>Confidence</small><b>78%</b></span></div></section> }

function MarginChart() { const bars=[82,88,78,91,85,72,68,76]; return <section className="panel p-4 lg:p-5"><p className="eyebrow">MARGIN INTELLIGENCE</p><h2 className="mt-1 text-lg">Actual vs budget bridge</h2><div className="mt-6 flex h-48 items-end gap-3 border-b px-2">{bars.map((h,i)=><div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="relative flex w-full justify-center"><div className={`w-3/5 rounded-t-sm ${i>4?'bg-governance':'bg-primary'}`} style={{height:`${h*1.6}px`}}/><span className="absolute -top-5 font-mono text-[9px]">{(16+h/38).toFixed(1)}%</span></div><small className="font-mono text-[9px] text-muted-foreground">M{i+1}</small></div>)}</div><div className="mt-4 flex justify-between text-xs"><span>Budget <b className="ml-1">19.3%</b></span><span>Forecast <b className="ml-1 text-governance">18.2%</b></span></div></section> }

function WorkingCapital() { return <section className="panel p-4 lg:p-5"><p className="eyebrow">WORKING CAPITAL PRESSURE</p><h2 className="mt-1 text-lg">Cash conversion drivers</h2><div className="mt-5 flex flex-col gap-5">{[['AR DAYS',62,45,'$3.8M trapped'],['AP DAYS',38,45,'7 days headroom'],['INVENTORY',71,60,'$1.4M excess']].map(([l,v,t,n])=><div key={String(l)}><div className="mb-2 flex justify-between text-xs"><span>{l}</span><span>{n}</span></div><div className="relative h-2 rounded bg-secondary"><div className="h-full rounded bg-primary" style={{width:`${v}%`}}/><i className="absolute -top-1 h-4 w-px bg-governance" style={{left:`${t}%`}}/></div><div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground"><span>0</span><span>POLICY {t}</span><span>90</span></div></div>)}</div></section> }

function CFO({ onDecision }: { onDecision:()=>void }) { const [expanded,setExpanded]=useState(0); return <main className="p-4 lg:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-4"><div className="flex gap-4"><span className="flex size-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary"><CircleDollarSign/></span><div><p className="eyebrow text-primary">CFO INTELLIGENCE · ACTIVE</p><h1 className="mt-1 text-2xl font-medium">Financial command workspace</h1><p className="mt-1 text-xs text-muted-foreground">Cash, margin and working-capital decisions · confidence 91%</p></div></div><div className="w-full max-w-lg"><AskBar label="Ask CFO about financial performance"/></div></div><div className="mb-4 grid grid-cols-2 border md:grid-cols-6">{[['Revenue','$106M','+6.4%'],['EBITDA','18.2%','-1.1pp'],['Cash','$24.8M','-4.2M risk'],['Working Cap.','$31.6M','+8.2%'],['AR Days','62','+17'],['AP Days','38','-7']].map(([a,b,c],i)=><div key={a} className="metric-cell"><span>{a}</span><b>{b}</b><small className={i===0?'text-primary':i>1?'text-governance':''}>{c}</small></div>)}</div><div className="grid gap-4 xl:grid-cols-2"><CashChart/><MarginChart/><WorkingCapital/><section className="panel p-4 lg:p-5"><p className="eyebrow text-primary">WHAT CFO IS SEEING</p><h2 className="mt-1 text-lg">Material findings</h2><div className="mt-4">{[['Liquidity buffer narrows in week 10','Receivables concentration and tax timing create downside exposure.'],['Service margin below threshold','Utilization mix accounts for 68% of the forecast variance.'],['Vendor terms can release $1.1M','Seven strategic vendors remain below policy terms.']].map(([a,b],i)=><div key={a} className="border-b"><button onClick={()=>setExpanded(expanded===i?-1:i)} className="flex w-full items-center gap-3 py-4 text-left"><span className={i===0?'text-governance':'text-primary'}>0{i+1}</span><b className="text-sm font-medium">{a}</b><ChevronDown className={`ml-auto size-4 ${expanded===i?'rotate-180':''}`}/></button>{expanded===i&&<div className="pb-4 pl-8 text-xs leading-relaxed text-muted-foreground">{b}<button onClick={onDecision} className="mt-3 block text-governance">Open decision case →</button></div>}</div>)}</div></section><section className="panel p-4 xl:col-span-2"><div className="flex justify-between"><div><p className="eyebrow text-governance">OPEN DECISION CASES</p><h2 className="mt-1 text-lg">Awaiting human authority</h2></div><span className="count-badge">02</span></div><div className="mt-4 grid gap-3 md:grid-cols-2">{['Release $1.8M delivery capacity','Extend strategic vendor payment terms'].map((d,i)=><button key={d} onClick={onDecision} className="decision-case"><span className="font-mono text-[10px] text-governance">CFO-26-00{i+7}</span><b>{d}</b><p>{i===0?'Protects EBITDA floor; cash impact contained within policy.':'Releases $1.1M cash with low supplier continuity risk.'}</p><span className="mt-auto flex items-center text-xs text-governance">Review governed recommendation <ArrowRight className="ml-auto size-3"/></span></button>)}</div></section></div></main> }

function Inspector({ who, onClose, setView }: any) { const e=executives.find(x=>x.id===who) || executives[0]; return <div className="overlay"><button className="overlay-backdrop" onClick={onClose} aria-label="Close inspector"/><aside className="inspector"><div className="flex items-center justify-between border-b p-4"><span className="eyebrow">AGENT INSPECTOR</span><button onClick={onClose} aria-label="Close"><X className="size-4"/></button></div><div className="p-5"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><e.icon/></span><div><h2 className="text-xl font-medium">{e.id}</h2><p className="text-xs text-muted-foreground">{e.title} intelligence agent</p></div><span className="ml-auto font-mono text-xl text-primary">{e.score}</span></div><div className="my-5 rounded-md border bg-secondary/30 p-4"><p className="eyebrow">CURRENT MISSION</p><p className="mt-2 text-sm leading-relaxed">Continuously assess {e.focus.toLowerCase()} and surface material decisions requiring accountable human judgment.</p></div>{['Material signals','Recommendations','Decision cases','Sources & lineage','Recent intelligence'].map((x,i)=><button key={x} className="flex w-full items-center border-b py-4 text-sm"><span>{x}</span><span className="ml-auto font-mono text-xs text-muted-foreground">{[4,3,2,18,7][i]}</span><ChevronRight className="ml-2 size-3"/></button>)}<button onClick={()=>{if(e.id==='CFO')setView('cfo');onClose()}} className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground">Open {e.id} workspace <ArrowRight className="size-4"/></button></div></aside></div> }

function DecisionPreview({ onClose }: { onClose:()=>void }) { return <div className="overlay"><button className="overlay-backdrop" onClick={onClose} aria-label="Close decision"/><aside className="inspector wide"><div className="flex items-center justify-between border-b p-4"><span className="eyebrow text-governance">GOVERNED DECISION CASE · CFO-26-007</span><button onClick={onClose}><X className="size-4"/></button></div><div className="p-5"><h2 className="text-2xl font-medium">Release $1.8M delivery capacity</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Approve targeted contractor capacity to protect the Q3 EBITDA floor and reduce execution pressure on three critical teams.</p><div className="my-5 grid grid-cols-3 border"><div className="metric-cell"><span>EBITDA impact</span><b className="text-primary">+110bps</b></div><div className="metric-cell"><span>Cash impact</span><b>-$1.8M</b></div><div className="metric-cell"><span>Confidence</span><b>87%</b></div></div><p className="eyebrow">INTELLIGENCE CHAIN</p><div className="mt-3 flex items-center gap-2 overflow-x-auto">{['Signal','CFO analysis','COO challenge','Recommendation','Authority'].map((x,i)=><span key={x} className={`rounded border px-3 py-2 text-[10px] ${i===4?'border-governance/40 text-governance':'text-muted-foreground'}`}>{x}</span>)}</div><div className="mt-6 rounded-md border border-governance/30 bg-governance/5 p-4"><p className="eyebrow text-governance">HUMAN JUDGMENT REQUIRED</p><p className="mt-2 text-sm">BPAI recommends approval within policy. You remain accountable for the decision and outcome.</p></div><div className="mt-6 flex gap-2"><button className="flex-1 rounded-md border px-4 py-3 text-sm">Request challenge</button><button onClick={onClose} className="flex-1 rounded-md bg-governance px-4 py-3 text-sm font-semibold text-governance-foreground">Approve decision</button></div></div></aside></div> }

export default function BPAIApp() {
  const [view,setView]=useState('home'); const [inspector,setInspector]=useState<string|null>(null); const [decision,setDecision]=useState(false)
  return <div className="min-h-screen bg-background text-foreground"><Header view={view} setView={setView}/>{view==='home'&&<HomeView setView={setView} onInspector={setInspector} onDecision={()=>setDecision(true)}/>} {view==='dashboard'&&<Dashboard onDecision={()=>setDecision(true)}/>} {view==='cfo'&&<CFO onDecision={()=>setDecision(true)}/>}<button className="fixed bottom-5 right-5 flex items-center gap-2 rounded-full border bg-card px-4 py-3 text-xs shadow-xl md:hidden" onClick={()=>setView(view==='home'?'dashboard':view==='dashboard'?'cfo':'home')}><Layers3 className="size-4"/> Switch workspace</button>{inspector&&<Inspector who={inspector} onClose={()=>setInspector(null)} setView={setView}/>} {decision&&<DecisionPreview onClose={()=>setDecision(false)}/>}</div>
}
