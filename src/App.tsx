import { useEffect, useState } from 'react'

type SessionState = 'landing' | 'connecting' | 'active' | 'disconnected'
type LiveSession = { socket: WebSocket; frameData: string; extensionEnabled: boolean }

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'https://rolex-bypass.onrender.com').replace(/\/$/, '')

type IconProps = {
  size?: number
  strokeWidth?: number
}

const iconDefaults = { size: 18, strokeWidth: 1.8 }

function ArrowUpRight({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
}

function Lock({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
}

function Shield({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 20 6v5c0 4.8-3.1 8.3-8 10-4.9-1.7-8-5.2-8-10V6l8-3Z"/><path d="m8.5 12 2.1 2.1 4.9-5"/></svg>
}

function RelayMark({ compact = false }: { compact?: boolean }) {
  return <span className={`relay-mark ${compact ? 'relay-mark--compact' : ''}`} aria-hidden="true"><span className="relay-bracket relay-bracket--left"/><span className="relay-dot"/><span className="relay-bracket relay-bracket--right"/></span>
}

function Check({ size = 16 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>
}

function External({ size = 14 }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 5h5v5"/><path d="m19 5-8 8"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>
}

function Chevron({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} /></svg>
}

function Refresh() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11a8.1 8.1 0 0 0-14.9-3L3 11"/><path d="M3 4v7h7"/><path d="M4 13a8.1 8.1 0 0 0 14.9 3L21 13"/><path d="M21 20v-7h-7"/></svg>
}

function StatusDot({ tone = 'green' }: { tone?: 'green' | 'amber' | 'muted' }) {
  return <span className={`status-dot status-dot--${tone}`} aria-hidden="true" />
}

function LandingHero({ onStart, onExplore, state }: { onStart: () => void; onExplore: () => void; state: SessionState }) {
  return <section className="hero" id="top">
    <div className="hero__copy">
      <div className="eyebrow"><span className="eyebrow__index">01</span><span>PRIVATE WEB RELAY</span><span className="eyebrow__line"/><span className="eyebrow__signal"><StatusDot /> ONLINE DEMO</span></div>
      <h1>A browser<br /><em>inside</em> your brand.</h1>
      <p className="hero__lede">Give people the web surface they need — without giving them the keys to the environment behind it.</p>
      <div className="hero__actions">
        <button className="button button--primary" onClick={onStart} disabled={state === 'connecting'}>{state === 'connecting' ? 'Preparing relay…' : 'Open a safe session'} <ArrowUpRight size={17} /></button>
        <button className="text-button" onClick={onExplore}>See how it works <Chevron /></button>
      </div>
      <div className="hero__footnote"><Lock size={14} /> <span>Constrained to a single rendered webpage surface</span></div>
    </div>
    <div className="hero__visual" aria-label="Secure relay product preview">
      <div className="orbit orbit--one"/><div className="orbit orbit--two"/>
      <div className="relay-card">
        <div className="relay-card__top"><div className="relay-card__identity"><RelayMark compact /><span>V/WS</span></div><span className="relay-card__mode"><StatusDot /> DEMO MODE</span></div>
        <div className="relay-card__body">
          <div className="relay-card__label">VIRTUAL WEB SESSION</div>
          <div className="relay-card__title">The boundary<br /><span>is the product.</span></div>
          <div className="relay-card__trace"><span className="trace-line"/><span className="trace-line trace-line--short"/><span className="trace-dot"/></div>
          <div className="relay-card__target"><span className="target-icon"><Lock size={14} /></span><div><small>GUARDED TARGET</small><strong>rolexcoderz.in</strong></div><External size={14} /></div>
        </div>
        <div className="relay-card__bottom"><span>SESSION 0001</span><span>ISOLATED / 01</span><span>⌁</span></div>
      </div>
      <div className="visual-note visual-note--top"><span>FRAME STREAM</span><strong>60 FPS</strong></div>
      <div className="visual-note visual-note--bottom"><span>EXTENSION</span><strong>ENABLED</strong></div>
    </div>
  </section>
}

function ArchitectureSection({ onStart }: { onStart: () => void }) {
  const layers = [
    { number: '01', label: 'FRONTEND', title: 'Vercel surface', copy: 'A fast, familiar landing page becomes the session boundary. State, controls and trust signals stay in your brand.', accent: 'lime', code: 'NEXT / VERCEL' },
    { number: '02', label: 'BACKEND', title: 'Isolated engine', copy: 'A dedicated Node.js/Express container orchestrates WebSockets, Puppeteer or Playwright, headless Chromium, and one private browser context per session.', accent: 'violet', code: 'NODE / WS / CHROMIUM' },
    { number: '03', label: 'SURFACE', title: 'Guarded frame', copy: 'Only the rendered target webpage is streamed back through a frame stream. No tabs, address bar, desktop, or arbitrary navigation.', accent: 'bone', code: 'CANVAS / INPUT / LOCK' },
  ]
  return <section className="architecture section-light" id="product">
    <div className="section-head section-head--dark"><div className="eyebrow"><span className="eyebrow__index">02</span><span>THE RELAY STACK</span></div><h2>One request.<br /><em>Three boundaries.</em></h2><p>Every session has a clear job. The frontend earns trust, the container does the work, and the frame keeps the user inside the surface.</p></div>
    <div className="layer-list">{layers.map((layer) => <div className={`layer-row layer-row--${layer.accent}`} key={layer.number}><div className="layer-row__number">{layer.number}</div><div className="layer-row__label">{layer.label}</div><div className="layer-row__content"><h3>{layer.title}</h3><p>{layer.copy}</p></div><span className="layer-row__code">{layer.code}</span><Chevron /></div>)}</div>
    <div className="architecture__footer"><span className="architecture__rule"/><span>THE BACKEND IS THE ENGINE. THIS SURFACE IS THE BOUNDARY.</span><button className="text-button text-button--dark" onClick={onStart}>Preview the boundary <ArrowUpRight size={15} /></button></div>
  </section>
}

function SecuritySection() {
  const protections = [
    ['Allowlisted navigation', 'Top-level redirects are intercepted and returned to the approved target pattern.'],
    ['Popup + DevTools block', 'New windows, inspect shortcuts and window-breaking surfaces never make it to the frame.'],
    ['Per-user isolation', 'Every connection receives its own browser context, extension state and lifecycle.'],
    ['Surface-only input', 'Clicks, scroll and field typing stay inside the rendered webpage area.'],
  ]
  return <section className="security section-dark" id="security"><div className="security__grid"><div className="section-head"><div className="eyebrow"><span className="eyebrow__index">03</span><span>SECURITY IS A UX LAYER</span></div><h2>Confinement,<br /><em>made legible.</em></h2><p>When the system says “locked”, the interface should show you exactly what that means. No mystery chrome. No invisible exceptions.</p><div className="security__callout"><Shield size={19} /><div><strong>Target allowlist active</strong><span>rolexcoderz.in · top-level frame only</span></div></div></div><div className="protection-list">{protections.map(([title, copy], index) => <div className="protection" key={title}><div className="protection__index">0{index + 1}</div><div><h3>{title}</h3><p>{copy}</p></div><Check /></div>)}</div></div></section>
}

function DeploymentSection({ onStart }: { onStart: () => void }) {
  return <section className="deployment section-light" id="deployment"><div className="deployment__intro"><div className="eyebrow eyebrow--dark"><span className="eyebrow__index">04</span><span>FROM DEMO TO DEPLOYMENT</span></div><h2>Connect the engine<br /><em>when you’re ready.</em></h2><p>The product surface is ready to preview now. A live session needs the dedicated backend container, its extension files, and a secure WebSocket origin.</p><button className="button button--dark" onClick={onStart}>Open the demo surface <ArrowUpRight size={17} /></button></div><div className="setup-card"><div className="setup-card__top"><span>REQUIRED ENVIRONMENT</span><StatusDot tone="amber" /></div><div className="setup-card__row"><span>FRONTEND_URL</span><strong>your-vercel-domain</strong></div><div className="setup-card__row"><span>BACKEND_URL</span><strong>your-container-origin</strong></div><div className="setup-card__row setup-card__row--extension"><span>EXTENSION ID</span><strong>hdoecnlghjglmnjpnhaaeofcgocdgkhd</strong></div><div className="setup-card__note"><span className="note-mark">!</span><p>Demo mode is active. Real sessions cannot operate until the backend is deployed, reachable, and configured with the extension.</p></div></div></section>
}

function Footer({ onStart }: { onStart: () => void }) {
  return <footer className="footer"><div className="footer__brand"><RelayMark compact /><span>V/WS</span></div><div className="footer__copy">A private browser relay for teams that need the web surface without surrendering the environment.</div><button className="text-button" onClick={onStart}>Open a safe session <ArrowUpRight size={15} /></button><div className="footer__meta"><span>SECURE WEB RELAY / 2026</span><span>BUILT FOR CONTAINED ACCESS</span></div></footer>
}

function ConnectingView({ onCancel }: { onCancel: () => void }) {
  return <main className="connecting-view"><div className="connecting-view__card"><div className="connecting-view__mark"><RelayMark /></div><div className="eyebrow"><span className="eyebrow__index">INIT</span><span>ALLOCATING PRIVATE SESSION</span></div><h1>Preparing your<br /><em>safe surface.</em></h1><p>The relay is reserving an isolated browser context and loading the approved target boundary.</p><div className="progress-track"><span /></div><div className="connecting-steps"><span className="step step--done"><Check /> Request signed</span><span className="step step--active"><StatusDot /> Starting Chromium</span><span className="step"><StatusDot tone="muted" /> Opening guarded frame</span></div><button className="text-button" onClick={onCancel}>Cancel request</button></div></main>
}

function Workspace({ onEnd, liveSession }: { onEnd: () => void; liveSession: LiveSession | null }) {
  const [notice, setNotice] = useState('')
  const [frameKey, setFrameKey] = useState(0)
  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2400) }
  const send = (message: Record<string, unknown>, fallback: string) => { if (liveSession?.socket.readyState === WebSocket.OPEN) liveSession.socket.send(JSON.stringify(message)); else showNotice(fallback) }
  return <main className="workspace-view"><div className="workspace-shell"><div className="workspace-head"><div><div className="eyebrow"><span className="eyebrow__index">LIVE</span><span>VIRTUAL WORKSPACE</span></div><h1>Guarded session <em>0001</em></h1></div><div className="workspace-head__right"><div className="session-status"><StatusDot /><span>ACTIVE / {liveSession ? 'LIVE' : 'DEMO'}</span></div><button className="text-button text-button--small" onClick={onEnd}>End session</button></div></div>{!liveSession && <div className="offline-banner"><StatusDot tone="amber" /><div><strong>Backend not connected — showing the contained UI demo.</strong><span>Check VITE_BACKEND_URL and Render CORS if this persists.</span></div><button onClick={() => showNotice('The live connection is created when you start a session.')}>Reconnect</button></div>}<div className="browser-shell"><div className="browser-toolbar"><div className="toolbar-controls"><button aria-label="Back" onClick={() => send({ type: 'back' }, 'Back is available after connecting to Render.')}><Chevron direction="left" /></button><button aria-label="Forward" onClick={() => send({ type: 'forward' }, 'Forward is available after connecting to Render.')}><Chevron /></button><button aria-label="Refresh" onClick={() => { send({ type: 'refresh' }, 'Refresh is available after connecting to Render.'); setFrameKey((key) => key + 1) }}><Refresh /></button></div><div className="target-lock"><Lock size={13} /><span>rolexcoderz.in</span><span className="target-lock__divider">/</span><span>SESSION SURFACE</span></div><div className="toolbar-meta"><span className="extension-chip"><StatusDot /> {liveSession?.extensionEnabled ? 'EXT ENABLED' : 'EXT OPTIONAL'}</span><button className="toolbar-menu" aria-label="Session details" onClick={() => showNotice('Only approved session details are available.')}>•••</button></div></div><div className="browser-frame" key={frameKey} onClick={(event) => { if (liveSession) { const rect = event.currentTarget.getBoundingClientRect(); send({ type: 'click', x: event.clientX - rect.left, y: event.clientY - rect.top }, '') } }} onWheel={(event) => send({ type: 'scroll', deltaY: event.deltaY }, 'Scroll is available after connecting to Render.')}>{liveSession?.frameData && <img className="live-frame" src={liveSession.frameData} alt="Live rendered target webpage" />}<div className="browser-frame__sitebar"><div className="site-logo"><span>R</span> ROLEXCODERZ</div><div className="site-links"><span>TOOLS</span><span>GUIDES</span><span>ABOUT</span></div><span className="site-menu">MENU</span></div><div className="browser-frame__body"><div className="site-kicker">DIGITAL CRAFT / 2026</div><h2>Build the<br /><span>unexpected.</span></h2><p>{liveSession ? 'Live Chromium frames from the approved target surface. Interactions stay inside this rendered area.' : 'A contained preview of the approved target surface. Interactions stay inside this frame — no URL field, no tabs, no escape hatch.'}</p><div className="site-actions"><button onClick={(event) => { event.stopPropagation(); send({ type: 'click', x: 420, y: 280 }, 'This click is contained inside the demo surface.') }}>Explore the work <ArrowUpRight size={15} /></button><span>SCROLL TO DISCOVER <Chevron /></span></div><div className="frame-decoration"><span>RZ</span><span>01</span><span>O</span></div></div><div className="browser-frame__footer"><span>RENDERED WEBPAGE AREA ONLY</span><span>FRAME {String(frameKey + 1).padStart(2, '0')} / {liveSession ? 'LIVE STREAM' : 'STREAM STANDBY'}</span></div></div></div><div className="workspace-foot"><div className="workspace-foot__item"><span>CONTEXT</span><strong>ISOLATED / PER USER</strong></div><div className="workspace-foot__item"><span>EXTENSION</span><strong>{liveSession?.extensionEnabled ? 'LOADED / AUTHORIZED' : 'NOT LOADED'}</strong></div><div className="workspace-foot__item"><span>INPUT</span><strong>CLICK · SCROLL · TYPE</strong></div><div className="workspace-foot__item workspace-foot__item--right"><Lock size={14} /> <strong>NO HOST ACCESS</strong></div></div></div>{notice && <div className="toast"><StatusDot /> {notice}</div>}</main>
}

function App() {
  const [sessionState, setSessionState] = useState<SessionState>('landing')
  const [liveSession, setLiveSession] = useState<LiveSession | null>(null)
  const startSession = async () => {
    setSessionState('connecting')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const response = await fetch(`${BACKEND_URL}/session`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      if (!response.ok) throw new Error(`Session request failed (${response.status})`)
      const { token } = await response.json() as { token: string }
      const socket = new WebSocket(`${BACKEND_URL.replace(/^http/, 'ws')}/ws?token=${encodeURIComponent(token)}`)
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as { type?: string; data?: string; mime?: string; extensionEnabled?: boolean }
        if (message.type === 'ready') setLiveSession((current) => ({ socket, frameData: current?.frameData || '', extensionEnabled: Boolean(message.extensionEnabled) }))
        if (message.type === 'frame' && message.data) setLiveSession((current) => ({ socket, frameData: `data:${message.mime || 'image/jpeg'};base64,${message.data}`, extensionEnabled: current?.extensionEnabled ?? false }))
      }
      socket.onopen = () => { setLiveSession({ socket, frameData: '', extensionEnabled: false }); setSessionState('active') }
      socket.onerror = () => { socket.close() }
      socket.onclose = () => { setLiveSession(null); setSessionState((current) => current === 'active' ? 'disconnected' : current) }
    } catch {
      setSessionState('disconnected')
    }
  }
  const endSession = () => { liveSession?.socket.close(); setLiveSession(null); setSessionState('disconnected'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const explore = () => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })
  if (sessionState === 'connecting') return <ConnectingView onCancel={() => setSessionState('landing')} />
  if (sessionState === 'active') return <Workspace onEnd={endSession} liveSession={liveSession} />
  return <div className="site-shell"><header className="site-header"><a className="wordmark" href="#top" aria-label="Virtual Web Session home"><RelayMark compact /><span>V<span>/</span>WS</span></a><nav className="site-nav" aria-label="Primary navigation"><a href="#product">Product</a><a href="#security">Security</a><a href="#deployment">Deployment</a></nav><div className="header-actions"><span className="header-status"><StatusDot tone={sessionState === 'disconnected' ? 'amber' : 'green'} /> {sessionState === 'disconnected' ? 'DEMO SAFE' : 'DEMO ONLINE'}</span><button className="button button--header" onClick={startSession}>{sessionState === 'disconnected' ? 'Reconnect demo' : 'Get started'} <ArrowUpRight size={15} /></button></div></header><LandingHero onStart={startSession} onExplore={explore} state={sessionState} />{sessionState === 'disconnected' && <div className="reconnect-strip"><StatusDot tone="amber" /><span>Your last session ended safely.</span><button onClick={startSession}>Reconnect demo <ArrowUpRight size={14} /></button></div>}<ArchitectureSection onStart={startSession} /><SecuritySection /><DeploymentSection onStart={startSession} /><Footer onStart={startSession} /></div>
}

export default App
