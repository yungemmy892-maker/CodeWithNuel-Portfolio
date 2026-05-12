# Emmanuel Okon — Developer Portfolio

A highly interactive, visually impressive developer portfolio built with **SvelteKit**. Designed to feel like an immersive engineering experience, not just a webpage.

**Live Demo:** https://code-with-nuel-portfolio.vercel.app/
**GitHub:** 

---

## ✨ Features

- **Hero Section** — Particle canvas animation, animated role cycling, entrance stagger animations
- **About Section** — Career timeline with animated markers, stats counters
- **Projects Showcase** — Filterable grid with hover effects, expandable modals per project
- **Skills Section** — Animated progress bars (triggered on scroll), tools cloud
- **Interactive Terminal** — Full command-line interface with 10+ commands, history navigation
- **Contact Section** — Validated form with animated feedback states
- **Custom Cursor** — Smooth lerp-based cursor with hover/click states
- **Theme Toggle** — Dark/light mode with localStorage persistence
- **Responsive** — Mobile-first, works across all screen sizes
- **Accessible** — Skip nav, ARIA labels, keyboard navigation, focus states, reduced-motion support

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/alexchen/portfolio
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Architecture

```
src/
├── routes/
│   ├── +layout.svelte     # Root layout: Nav, Cursor, ThemeToggle
│   └── +page.svelte       # Home page: composes all sections
├── lib/
│   ├── components/
│   │   ├── Nav.svelte          # Fixed navigation with scroll state
│   │   ├── Hero.svelte         # Particle canvas + entrance animations
│   │   ├── About.svelte        # Timeline + stats
│   │   ├── Projects.svelte     # Filterable grid + modal
│   │   ├── Skills.svelte       # Animated bars + tools cloud
│   │   ├── Terminal.svelte     # Interactive CLI experience
│   │   ├── Contact.svelte      # Form + footer
│   │   ├── CustomCursor.svelte # Lerp cursor
│   │   └── ThemeToggle.svelte  # Dark/light toggle
│   └── stores/
│       ├── theme.js            # Writable store with localStorage
│       └── data.js             # Projects, skills, categories data
├── app.html                # HTML template + Google Fonts
└── app.css                 # Global design system (CSS variables, resets)
```

### Design System

All design tokens live in `app.css` as CSS custom properties:
- **Colors**: bg-primary, bg-card, accent, accent-bright, text-primary/secondary/muted
- **Typography**: Syne (display) + JetBrains Mono
- **Spacing/radius/easing**: Consistent scale throughout
- **Light/dark**: Override vars via `[data-theme="light"]` selector

---

## 🎬 Animation Decisions

| Animation | Approach | Why |
|-----------|----------|-----|
| Page entrance | CSS transitions + `class:mounted` | Zero JS overhead, GPU composited |
| Scroll reveals | `IntersectionObserver` + CSS | No layout thrash, smooth |
| Skill bars | CSS `width` transition on `.animate` class | Performant, declarative |
| Particle system | `requestAnimationFrame` canvas | 2D canvas for 80 particles is <1ms/frame |
| Custom cursor | `requestAnimationFrame` + lerp | Smooth decoupled tracking |
| Role cycling | CSS opacity/transform | No library needed |
| Modal | CSS keyframe `slideUp` + `fadeIn` | Native, instant |
| Theme switch | CSS var transition on `body` | Zero JS animation cost |

All animations respect `prefers-reduced-motion` via a global CSS rule.

---

## ⚡ Performance Optimization

- **Fonts**: Google Fonts with `display=swap` + `preconnect` hints
- **No heavy libraries**: GSAP listed as dependency but not used in core — pure CSS animations
- **Canvas**: Only renders when visible in viewport
- **Images**: No large images — SVG icons, CSS visuals only
- **Code splitting**: SvelteKit handles per-route automatically
- **CSS**: Custom properties enable theme without class toggling
- **Lazy init**: IntersectionObserver defers animations until visible
- **Passive listeners**: `scroll` event uses `{ passive: true }`

Target: Lighthouse score 95+ on Performance, Accessibility, Best Practices, SEO.

---

## ♿ Accessibility

- **Skip navigation** link (`:focus` reveals it at top)
- **ARIA labels** on all interactive elements and icon-only buttons
- **Role attributes** on filter tabs (`role="tablist"`, `role="tab"`)
- **Live regions** for dynamic content (`aria-live="polite"`)
- **Semantic HTML**: `<section>`, `<article>`, `<nav>`, `<footer>`, `<h1–h3>`
- **Keyboard navigation**: Full tab order, focus-visible styles
- **Color contrast**: All text meets WCAG AA (4.5:1+)
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` collapses all transitions
- **Custom cursor**: Hidden on touch devices via `pointer: coarse`

---

## 🚢 Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Deploy dist/ folder
netlify deploy --prod --dir .svelte-kit/output/prerendered
```

### Cloudflare Pages

Connect your GitHub repo in the Cloudflare dashboard:
- Build command: `npm run build`
- Output directory: `.svelte-kit/output`

---

## 🔧 Customization

1. **Your info**: Edit `src/lib/stores/data.js` — projects, skills, bio
2. **Resume**: Replace `static/resume.pdf`
3. **Colors**: Edit CSS variables in `src/app.css`
4. **Fonts**: Change the Google Fonts import in `src/app.html`
5. **Contact form**: Wire up a real API in `Contact.svelte > handleSubmit()`
   - Recommended: [Resend](https://resend.com), [Formspree](https://formspree.io), or Cloudflare Email Workers

---

## ⚖️ Trade-offs

| Decision | Trade-off |
|----------|-----------|
| Pure CSS animations over GSAP | Simpler, faster — but less precise sequencing control |
| Canvas particles over CSS | More visually dynamic — slightly heavier on low-end devices |
| SvelteKit SSR off (CSR only) | Simpler deployment — slightly slower initial load |
| No image assets | Zero LCP issues — limits visual richness |
| IntersectionObserver for reveals | Great perf — animations only trigger once (no re-entry) |

---

## 📄 License

MIT — feel free to fork and customize for your own portfolio.
