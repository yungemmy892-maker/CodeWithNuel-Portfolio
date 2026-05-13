<script>
  import { onMount } from 'svelte';

  let mounted = false;

  /** @type {HTMLCanvasElement} */
  let canvas;
  /** @type {number} */
  let animFrame;

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/yungemmy892-maker', icon: '⌥' },
    { label: 'Tiktok', href: 'https://tiktok.com/in/CTRL_guy', icon: '◈' },
    { label: 'Twitter', href: 'https://twitter.com/CTRL_guy', icon: '◇' },
    { label: 'Email', href: 'mailto:yungemmy892@gmail.com', icon: '◎' }
  ];

  const roles = ['Frontend Engineer', 'Frontend Architect', 'Creative Developer'];
  let roleIndex = 0;
  let displayRole = roles[0];
  let fading = false;

  class Particle {

    /**
   * @param {number} W - canvas width
   * @param {number} H - canvas height
   */

    constructor(W, H) {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.size = 0;
      this.opacity = 0;
      this.pulse = 0;
      this.W = W;
      this.H = H;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.W;
      this.y = Math.random() * this.H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) this.reset();
    }
    /** @param {CanvasRenderingContext2D} ctx */
    draw(ctx) {
      const o = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${o})`;
      ctx.fill();
    }
  }

  onMount(() => {
    mounted = true;

    const roleInterval = setInterval(() => {
      fading = true;
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        displayRole = roles[roleIndex];
        fading = false;
      }, 400);
    }, 3000);

    if (!canvas) return;

    const context = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

    /** @type {Particle[]} */
    let particles = [];
    let W = 0, H = 0;
    /** @type {(() => void) | null} */
    let removeResizeListener = null;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resize);
    removeResizeListener = () => window.removeEventListener('resize', resize);
    resize();

    for (let i = 0; i < 80; i++) particles.push(new Particle(W, H));

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(124, 58, 237, ${(1 - d / 100) * 0.15})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }
    }

    function loop() {
      context.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.update();
        p.draw(context);
      });
      drawLines();
      animFrame = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      clearInterval(roleInterval);
      if (removeResizeListener) removeResizeListener();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  });
</script>

<section id="hero" class="hero" aria-label="Introduction">
  <canvas bind:this={canvas} class="particles-canvas" aria-hidden="true"></canvas>

  <div class="hero-content container" class:mounted>
    <div class="hero-badge mono">
      <span class="status-dot" aria-hidden="true"></span>
      <span>Available for work</span>
    </div>

    <h1 class="hero-name">
      <span class="name-line">Emmanuel</span>
      <span class="name-line accent">Okon.</span>
    </h1>

    <div class="hero-role" aria-live="polite" aria-atomic="true">
      <span class="role-text" class:fading>{displayRole}</span>
    </div>

    <p class="hero-bio">
      I build <strong>high-performance web experiences</strong> at the intersection of
      engineering and design. From pixel-perfect interfaces to scalable architectures —
      I care about every layer of the stack.
    </p>

    <div class="hero-actions">
      <a href="#projects" class="btn-primary">
        View My Work
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="/resume.pdf" class="btn-secondary" download>
        Download CV
      </a>
    </div>

    <div class="hero-social">
      {#each socialLinks as link}
        <a
          href={link.href}
          class="social-link"
          aria-label={link.label}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <span aria-hidden="true">{link.icon}</span>
          <span class="social-label">{link.label}</span>
        </a>
      {/each}
    </div>
  </div>

  <div class="scroll-indicator" aria-hidden="true">
    <span class="mono">scroll</span>
    <div class="scroll-line">
      <div class="scroll-dot"></div>
    </div>
  </div>

  <div class="hero-decoration" aria-hidden="true">
    <div class="deco-ring ring-1"></div>
    <div class="deco-ring ring-2"></div>
    <div class="deco-ring ring-3"></div>
    <div class="deco-grid"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .particles-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding-top: 6rem;
    padding-bottom: 4rem;
  }

  /* Entrance animations */
  .hero-content > * {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
  }

  .hero-content.mounted > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0.1s; }
  .hero-content.mounted > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 0.25s; }
  .hero-content.mounted > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 0.4s; }
  .hero-content.mounted > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 0.55s; }
  .hero-content.mounted > *:nth-child(5) { opacity: 1; transform: none; transition-delay: 0.7s; }
  .hero-content.mounted > *:nth-child(6) { opacity: 1; transform: none; transition-delay: 0.85s; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.875rem;
    border-radius: 100px;
    border: 1px solid var(--border-bright);
    background: rgba(124, 58, 237, 0.08);
    font-size: 0.8rem;
    color: var(--accent-bright);
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10b981;
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
    50% { opacity: 0.7; box-shadow: 0 0 16px #10b981; }
  }

  .hero-name {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .name-line {
    display: block;
  }

  .name-line.accent {
    color: var(--accent-bright);
    text-shadow: 0 0 60px var(--accent-glow);
  }

  .hero-role {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    height: 2em;
    display: flex;
    align-items: center;
  }

  .role-text {
    transition: opacity 0.4s, transform 0.4s;
    font-family: var(--font-mono);
  }

  .role-text.fading {
    opacity: 0;
    transform: translateY(-8px);
  }

  .hero-bio {
    max-width: 500px;
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  .hero-bio strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: var(--accent);
    color: white;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all var(--transition-base);
    box-shadow: 0 0 30px var(--accent-glow);
  }

  .btn-primary:hover {
    background: var(--accent-bright);
    transform: translateY(-2px);
    box-shadow: 0 8px 40px var(--accent-glow);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 1.75rem;
    border: 1px solid var(--border-bright);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all var(--transition-base);
  }

  .btn-secondary:hover {
    background: var(--bg-card);
    border-color: var(--accent-bright);
    color: var(--accent-bright);
  }

  .hero-social {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-md);
    color: var(--text-muted);
    font-size: 0.875rem;
    transition: all var(--transition-fast);
    border: 1px solid transparent;
  }

  .social-link:hover {
    color: var(--accent-bright);
    background: rgba(124, 58, 237, 0.08);
    border-color: var(--border);
  }

  .social-label {
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .scroll-line {
    width: 1px;
    height: 50px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }

  .scroll-dot {
    width: 100%;
    height: 30%;
    background: var(--accent-bright);
    position: absolute;
    top: -30%;
    animation: scroll-anim 2s ease-in-out infinite;
  }

  @keyframes scroll-anim {
    0% { top: -30%; }
    100% { top: 130%; }
  }

  /* Decorative rings */
  .hero-decoration {
    position: absolute;
    right: -10%;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 0;
  }

  .deco-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid var(--border);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ring-1 { width: 300px; height: 300px; animation: spin 20s linear infinite; }
  .ring-2 { width: 500px; height: 500px; animation: spin 35s linear infinite reverse; border-style: dashed; opacity: 0.5; }
  .ring-3 { width: 700px; height: 700px; animation: spin 50s linear infinite; opacity: 0.25; }

  @keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @media (max-width: 768px) {
    .hero-decoration { display: none; }
    .scroll-indicator { display: none; }
  }
</style>
