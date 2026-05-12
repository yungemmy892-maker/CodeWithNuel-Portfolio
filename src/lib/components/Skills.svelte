<script>
  import { onMount } from 'svelte';

  /** @type {HTMLElement | undefined} */
  let sectionEl;
  let visible = false;

  const techGroups = [
    {
      category: 'Frontend',
      icon: '⬡',
      items: ['Svelte / SvelteKit', 'TypeScript', 'JavaScript', 'React', 'Next.js', 'HTML', 'CSS / SCSS', 'Three.js']
    },
    {
      category: 'Backend',
      icon: '◈',
      items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL']
    },
    {
      category: 'Infrastructure',
      icon: '◎',
      items: ['Docker', 'Vercel', 'GitHub Actions']
    },
    {
      category: 'Tools & More',
      icon: '◇',
      items: ['Git', 'Figma', 'GraphQL', 'Prisma','Zod', 'Playwright', 'Vitest', 'Webpack', 'Vite']
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (/** @type {IntersectionObserverEntry[]} */ entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });

</script>

<section id="skills" class="section skills-section" bind:this={sectionEl}>
  <div class="container">
    <div class="section-header" class:visible>
      <div class="section-label mono">03 — Skills</div>
      <h2 class="section-title">What I <span class="accent">Work With</span></h2>
      <p class="section-desc">Technologies and tools I use to bring ideas to life.</p>
    </div>

    <div class="tech-grid" class:visible>
      {#each techGroups as group, gi}
        <div class="tech-group" style="--group-delay: {gi * 0.1}s">
          <div class="group-header">
            <span class="group-icon" aria-hidden="true">{group.icon}</span>
            <h3 class="group-title">{group.category}</h3>
          </div>
          <div class="tag-cloud" role="list" aria-label="{group.category} technologies">
            {#each group.items as tech, ti}
              <span
                class="tech-tag"
                role="listitem"
                style="--tag-delay: {gi * 0.1 + ti * 0.04}s"
                class:show={visible}
              >{tech}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skills-section { padding: 8rem 0; }

  .section-header { margin-bottom: 3.5rem; }
  .section-header.visible .section-label { opacity: 1; transform: none; }
  .section-header.visible .section-title { opacity: 1; transform: none; }
  .section-header.visible .section-desc { opacity: 1; transform: none; }

  .section-label {
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent-bright);
    margin-bottom: 0.75rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  }
  .section-title {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 0.75rem;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s var(--ease-out) 0.1s, transform 0.6s var(--ease-out) 0.1s;
  }
  .accent { color: var(--accent-bright); }
  .section-desc {
    font-size: 1.05rem;
    color: var(--text-secondary);
    max-width: 480px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s var(--ease-out) 0.2s, transform 0.6s var(--ease-out) 0.2s;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.75rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s var(--ease-out) 0.2s, transform 0.7s var(--ease-out) 0.2s;
  }
  .tech-grid.visible { opacity: 1; transform: none; }

  .tech-group {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 1.75rem;
    transition: border-color var(--transition-base);
  }
  .tech-group:hover { border-color: var(--border-bright); }

  .group-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.25rem;
  }

  .group-icon {
    font-size: 1.25rem;
    color: var(--accent-bright);
    line-height: 1;
  }

  .group-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.35rem 0.8rem;
    border-radius: 100px;
    font-size: 0.82rem;
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border);
    transition: all var(--transition-fast);
    cursor: default;
    opacity: 0;
    transform: translateY(6px) scale(0.95);
  }

  .tech-tag.show {
    opacity: 1;
    transform: none;
    transition: opacity 0.4s var(--ease-out) var(--tag-delay),
                transform 0.4s var(--ease-out) var(--tag-delay),
                background var(--transition-fast),
                border-color var(--transition-fast),
                color var(--transition-fast);
  }

  .tech-tag:hover {
    color: var(--accent-bright);
    border-color: var(--border-bright);
    background: rgba(124, 58, 237, 0.1);
  }

  @media (max-width: 640px) {
    .tech-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .tech-grid { grid-template-columns: 1fr; }
  }
</style>
