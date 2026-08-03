# Landing Page Design Instructions

## Project Context
A portfolio/agency landing page for a developer who builds websites and mobile apps. The site itself should demonstrate technical and design capability — it's a showcase piece as much as a business page.

## Visual Identity

- **Background:** Pure black (`#000000` or near-black `#0A0A0A`)
- **Primary color:** White (`#FFFFFF`) — text, key UI elements, line work
- **Accent usage:** Keep accents minimal — grayscale tones or a single subtle accent color (e.g. electric blue or lime) reserved for hover states, glow effects, and interactive highlights. Do not introduce a busy palette.
- **Typography:** Gilroy (all weights as needed — Light/Regular for body, SemiBold/Bold/ExtraBold for headings). Load as a self-hosted webfont (woff2). Fallback stack: `'Gilroy', -apple-system, 'Helvetica Neue', Arial, sans-serif`.
- **Overall mood:** Minimal, technical, premium — think Apple product pages crossed with a dev-tool aesthetic. Generous whitespace (black-space), sharp typography hierarchy, subtle grid/line details reminiscent of schematics or PCB traces.

## Structure / Sections

1. **Hero** — see "Hero 3D Animation" below. Headline + short subheadline (what you do: building web & mobile apps), primary CTA (e.g. "Start a project" / scroll cue).
2. **About** — short bio/positioning: who you are, your stack, what kind of clients/projects you take on. Can include a few stat/metric callouts (years of experience, technologies, projects shipped).
3. **Projects** — portfolio grid/list of past work (web + mobile). Each item: title, short description, tech stack tags, link/case study, optional screenshot or device mockup.
4. **Contact** — direct contact methods (email, Telegram, etc.), a simple contact form, and/or socials. Keep it low-friction — one clear primary action.

Sections should sit on a single continuous black canvas, no hard section dividers with contrasting backgrounds — separate sections with spacing, thin white/gray hairlines, or subtle grid marks instead.

## Hero 3D Animation (core interactive element)

- **Object:** A highly detailed 3D CPU/processor model — visible pins, die, heat-spreader lattice, circuit-trace-like surface detail. Rendered in white/grayscale/wireframe tones to match the black-and-white palette (avoid photoreal color; keep it monochrome/technical, e.g. brushed metal grays with white rim lighting, or a wireframe/x-ray look).
- **Hero state:** CPU is the dominant visual, center or slightly off-center, with subtle idle motion (slow auto-rotation and/or floating) and mouse-parallax response.
- **Scroll behavior (critical requirement):**
  - The CPU model does **not** disappear and does **not** stay pinned/static at the top of the viewport as the user scrolls.
  - Instead, it **persists across the whole page** (fixed/sticky in the viewport, layered behind or alongside content) while the **camera angle/framing changes progressively** as the user scrolls — e.g. rotating to reveal a different face of the chip, zooming into a specific detail (like the die or pins) for the About section, pulling back to a wide/abstract angle for Projects, and settling into a final resting orientation near Contact.
  - Implement via scroll-driven camera position/rotation interpolation (e.g. GSAP ScrollTrigger driving a Three.js/React Three Fiber camera or object transform), not via opacity fade-out/fade-in of the model itself.
  - Content (headlines, text blocks, project cards) scrolls normally on top of/alongside the persistent 3D scene.

## Suggested Tech Stack

- **React Three Fiber + Three.js** for the 3D CPU scene and rendering
- **GSAP + ScrollTrigger** for scroll-synced camera/object animation (proven approach from prior 3D scroll-animation project)
- **Framer Motion** (optional) for 2D UI element transitions (text reveals, hover states)
- Responsive: on mobile, consider simplifying the 3D scene (lower poly detail, simpler camera path, or a lighter fallback) to protect performance.

## Deliverable Notes for Claude

- Produce production-quality, well-commented component code (not just a mockup).
- Structure the 3D scene as its own component with clearly separated scroll-trigger "camera keyframes" so the sequence (hero angle → about angle → projects angle → contact angle) is easy to tune later.
- Keep all color/typography values as CSS variables/theme tokens for easy adjustment.
- Prioritize performance (avoid unnecessarily high poly counts, use `useMemo`/instancing where relevant, lazy-load heavy assets).
