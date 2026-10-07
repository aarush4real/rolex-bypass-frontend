# Virtual Web Session — implementation plan

## Product shape
Virtual Web Session is a trust-forward landing page for a remote browser relay. The first screen sells the product in one glance, then the primary CTA transitions into a guarded workspace demo. The demo is intentionally honest: it visualizes the `rolexcoderz.in` target and the restricted interaction surface, but labels the backend as offline until a real WebSocket/Chromium service is connected.

## Implementation approach
- Use a lightweight Vite + React + TypeScript client so the Preview can start quickly with no server/database dependency.
- Keep the interaction layer in one `App.tsx` state machine for the demo: `landing -> connecting -> active`, with explicit return to `disconnected` when the user ends a demo session.
- Use the main page as a long-form product surface with anchor navigation for Product, Security and Deployment.
- Represent the future `VirtualCanvas` as a custom browser frame: native controls for back/forward/refresh, a locked target label, an extension badge, and a rendered target-site mock frame. No address field or host-browser chrome is exposed.
- Preserve the brief's real deployment story in copy and structured sections: Vercel frontend, dedicated container, Node.js/Express/WebSocket orchestration, headless Chromium, extension loading, navigation allowlist, popup/DevTools blocking and frame streaming.

## Project structure
- `src/App.tsx`: page composition, CTA/session state, workspace mock and inline icon primitives.
- `src/styles.css`: visual system, responsive layout, animation, workspace frame, and interaction states.
- `src/main.tsx`: React bootstrap.
- `public/manus-routes.json`: route manifest for the `/` page.
- `app.config.ts`: project logo metadata.
- `plan.md`: this implementation and design record.
- `TODO.md`: acceptance outcomes copied from the request.

## Design direction
### Design movement
**Editorial cybernetics** — a dark operator-console atmosphere softened by warm paper panels and sharp typographic rhythm. It should feel like a secure infrastructure product, not a generic SaaS dashboard.

### Core principles
1. **Trust is visible:** status, lock boundaries, session state, and offline/demo truth are always explicit.
2. **Signal over decoration:** high-contrast type and a restrained acid-green signal color direct attention.
3. **Tactile precision:** thin rules, compact metadata, and purposeful controls make the interface feel engineered.
4. **One decisive motion:** the primary CTA visibly hands the user from information mode into a contained workspace.

### Color philosophy
The near-black graphite background establishes control and privacy. Warm bone panels carry explanation and human readability. A single acid-lime signal (`#d7ff57`) marks active, allowed, or secure states. Muted violet-blue is reserved for the simulated target frame so it reads as a distinct external surface. Soft amber is used only for the honest "backend not connected" notice.

### Layout paradigm
A left-anchored editorial column and offset panels create a guided route down the page. The hero is split between a copy rail and a floating "relay card" rather than a centered marketing block. Architecture and security sections alternate full-bleed dark bands with pale reading surfaces.

### Signature elements
- A **relay mark**: two offset brackets around a central signal dot, reused in the wordmark, status chips and workspace chrome.
- **Signal rail**: a thin acid-green vertical rule that appears beside critical security copy.
- **Telemetry labels**: mono, uppercase microcopy with section numbers, target paths, and status timestamps.

### Interaction and animation
Buttons should feel immediate and mechanical: small lift, border brighten, and a lime glow on hover. The workspace transition uses a staged pulse: connecting status, progress rail, then a quick surface reveal. Decorative signal dots drift slowly; they never compete with the CTA. Respect reduced-motion preferences.

### Typography system
Use `Space Grotesk` for headlines and interface labels, with `DM Mono` for telemetry and technical strings. Headlines are dense, sentence case with occasional uppercase eyebrow labels. Body copy stays readable at 16–18px with generous line-height.

### Brand essence
**A private browser relay for teams that need the web surface without surrendering the environment.** Personality: guarded, lucid, exact.

### Brand voice
Headlines are direct and slightly provocative: “A browser inside your brand.” CTAs are concrete: “Open a safe session”. Microcopy explains boundaries instead of pretending magic: “The backend is the engine. This surface is the boundary.”

### Wordmark and logo
The wordmark is set as `V/WS` with a two-bracket relay mark and a single green signal dot. It reads like a compact operator console identifier rather than a default software logo.

### Signature brand color
Acid signal lime `#d7ff57` — ownable, high-visibility, and reserved for permission, activity and the one action that moves the user forward.
