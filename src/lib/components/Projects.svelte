<script>
  import { projects, categories } from '$lib/stores/data.js';
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';

  // ─── Type definitions ────────────────────────────────────
  /**
   * @typedef {Object} Project
   * @property {string} id
   * @property {string} title
   * @property {string} category
   * @property {string} description
   * @property {string} longDescription
   * @property {string[]} tech
   * @property {string} color
   * @property {string} accentColor
   * @property {string} demo
   * @property {string} github
   * @property {boolean} featured
   * @property {string} icon
   */

  // ─── State ───────────────────────────────────────────────
  /** @type {string} */
  let activeCategory = 'all';

  /** @type {Project | null} */
  let selectedProject = null;

  /** @type {HTMLElement | undefined} */
  let sectionEl;

  let visible = false;

  // ─── Reactive filtered list ─────────────────────────────
  $: filtered = activeCategory === 'all'
    ? /** @type {Project[]} */ (projects)
    : /** @type {Project[]} */ (projects).filter(p => p.category === activeCategory);

  // ─── Modal handlers ─────────────────────────────────────
  /**
   * @param {Project} project
   */
  function openProject(project) {
    selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    selectedProject = null;
    document.body.style.overflow = '';
  }

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === 'Escape') closeProject();
  }

  // ─── Lifecycle ───────────────────────────────────────────
  onMount(() => {
    const observer = new IntersectionObserver(
      (/** @type {IntersectionObserverEntry[]} */ entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);

    document.addEventListener('keydown', handleKeydown);

    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });

</script>

<svelte:window on:keydown={handleKeydown} />

<section id="projects" class="section projects-section" bind:this={sectionEl}>
  <div class="container">
    <div class="section-header" class:visible>
      <div class="section-label mono">02 — Projects</div>
      <h2 class="section-title">Things I've <span class="accent">Built</span></h2>
      <p class="section-desc">A selection of projects spanning products, tools, and experiments.</p>
    </div>

    <div class="filter-bar" class:visible role="tablist" aria-label="Filter projects by category">
      {#each categories as cat}
        <button
          class="filter-btn"
          class:active={activeCategory === cat.id}
          role="tab"
          aria-selected={activeCategory === cat.id}
          on:click={() => activeCategory = cat.id}
        >
          {cat.label}
          {#if activeCategory === cat.id}
            <span class="filter-count">{filtered.length}</span>
          {/if}
        </button>
      {/each}
    </div>

    <div class="projects-grid" role="list">
      {#each filtered as project, i (project.id)}
        <article
          class="project-card"
          class:visible
          class:featured={project.featured}
          style="--card-color: {project.color}; --card-accent: {project.accentColor}; --delay: {i * 0.1}s"
          role="listitem"
        >
          <div class="card-glow" aria-hidden="true"></div>

          <div class="card-top">
            <span class="card-emoji" aria-hidden="true"><Icon name={project.icon} size={22} strokeWidth={1.6} /></span>
            <div class="card-links">
              {#if project.github}
                <a href={project.github} target="_blank" rel="noopener noreferrer" class="card-link" aria-label="GitHub repo for {project.title}">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
              {/if}
              <a href={project.demo} target="_blank" rel="noopener noreferrer" class="card-link" aria-label="Live demo for {project.title}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L7 10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <h3 class="card-title">{project.title}</h3>
          <p class="card-desc">{project.description}</p>

          <div class="card-tech" aria-label="Technologies used">
            {#each project.tech.slice(0, 4) as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
            {#if project.tech.length > 4}
              <span class="tech-tag more">+{project.tech.length - 4}</span>
            {/if}
          </div>

          <button class="card-expand" on:click={() => openProject(project)} aria-label="Read more about {project.title}">
            Learn more
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Modal -->
{#if selectedProject}
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-label={selectedProject.title}>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={closeProject}></div>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="modal-content" on:click|stopPropagation style="--card-color: {selectedProject.color}; --card-accent: {selectedProject.accentColor}">
      <button class="modal-close" on:click={closeProject} aria-label="Close modal">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12"/>
        </svg>
      </button>

      <div class="modal-header">
        <span class="modal-emoji" aria-hidden="true"><Icon name={selectedProject.icon} size={28} strokeWidth={1.5} /></span>
        <div>
          <h2 class="modal-title">{selectedProject.title}</h2>
          <span class="modal-category mono">{selectedProject.category}</span>
        </div>
      </div>

      <p class="modal-desc">{selectedProject.longDescription}</p>

      <div class="modal-tech">
        <h3 class="modal-tech-label">Stack</h3>
        <div class="modal-tech-list">
          {#each selectedProject.tech as tech}
            <span class="tech-tag large">{tech}</span>
          {/each}
        </div>
      </div>

      <div class="modal-actions">
        <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" class="btn-primary">
          View Live Demo
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 12 12 4M6 4h6v6"/>
          </svg>
        </a>
        {#if selectedProject.github}
          <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" class="btn-secondary">
            GitHub
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .projects-section { padding: 8rem 0; }

  .section-header { margin-bottom: 3rem; }
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

  /* Filters */
  .filter-bar {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s var(--ease-out) 0.3s, transform 0.6s var(--ease-out) 0.3s;
  }
  .filter-bar.visible { opacity: 1; transform: none; }

  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .filter-btn:hover {
    border-color: var(--border-bright);
    color: var(--text-primary);
  }

  .filter-btn.active {
    background: var(--gradient-brand);
    border-color: transparent;
    color: white;
  }

  .filter-count {
    background: rgba(255,255,255,0.2);
    border-radius: 100px;
    padding: 0 6px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }

  /* Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 1.5rem;
    align-items: start;
  }

  /* Card */
  .project-card {
    position: relative;
    background: var(--bg-card);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-width: 0;
    justify-self: stretch;
    overflow: hidden;
    cursor: default;
    transition: all var(--transition-base);
    opacity: 0;
    transform: translateY(24px);
  }

  .project-card.visible {
    opacity: 1;
    transform: none;
    transition: opacity 0.6s var(--ease-out) var(--delay),
                transform 0.6s var(--ease-out) var(--delay),
                border-color var(--transition-base),
                background var(--transition-base);
  }

  .project-card:hover {
    background: var(--bg-card-hover);
    border-color: color-mix(in srgb, var(--card-color) 55%, transparent);
    transform: translateY(-4px);
    box-shadow: 0 24px 60px -16px color-mix(in srgb, var(--card-color) 45%, transparent);
  }

  .project-card.featured {
    grid-column: span 1;
  }

  .card-glow {
    position: absolute;
    top: 0; right: 0;
    width: 200px; height: 200px;
    background: radial-gradient(circle, color-mix(in srgb, var(--card-color) 15%, transparent) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .project-card:hover .card-glow { opacity: 1; }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    color: var(--card-accent);
    background: color-mix(in srgb, var(--card-color) 14%, transparent);
  }

  .card-links {
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(-4px);
    transition: all var(--transition-fast);
  }

  .project-card:hover .card-links {
    opacity: 1;
    transform: none;
  }

  .card-link {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    background: var(--bg-secondary);
    transition: all var(--transition-fast);
  }

  .card-link:hover {
    color: var(--card-accent);
    background: var(--border);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .card-desc {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
    flex: 1;
  }

  .card-tech {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .tech-tag {
    padding: 0.25rem 0.625rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    color: var(--text-muted);
    border: 1px solid var(--border);
    transition: all var(--transition-fast);
  }

  .tech-tag.large {
    font-size: 0.8rem;
    padding: 0.35rem 0.75rem;
  }

  .project-card:hover .tech-tag {
    border-color: color-mix(in srgb, var(--card-color) 40%, transparent);
    color: var(--card-accent);
  }

  .card-expand {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: none;
    border: none;
    color: var(--card-color);
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    padding: 0;
    transition: color var(--transition-fast);
  }

  .card-expand svg { transition: transform var(--transition-fast); }
  .card-expand:hover svg { transform: translateX(2px); }

  .card-expand:hover { color: var(--card-accent); }

  /* Modal */
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: transparent;
    border: none;
    cursor: default;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 6, 15, 0.85);
    backdrop-filter: blur(12px);
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: fadeIn 0.3s var(--ease-out);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: var(--bg-secondary);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid color-mix(in srgb, var(--card-color) 45%, var(--border));
    border-radius: var(--radius-xl);
    padding: 2.5rem;
    max-width: 600px;
    width: 100%;
    position: relative;
    animation: slideUp 0.4s var(--ease-out);
    box-shadow: 0 40px 100px -20px color-mix(in srgb, var(--card-color) 40%, transparent);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to { opacity: 1; transform: none; }
  }

  .modal-close {
    position: absolute;
    top: 1.25rem; right: 1.25rem;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.875rem;
    display: flex; align-items: center; justify-content: center;
    transition: all var(--transition-fast);
  }

  .modal-close:hover { color: var(--text-primary); background: var(--border); }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .modal-emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    border-radius: var(--radius-lg);
    color: var(--card-accent);
    background: color-mix(in srgb, var(--card-color) 14%, transparent);
  }

  .modal-title {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 0.25rem;
  }

  .modal-category {
    font-size: 0.8rem;
    color: var(--card-accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .modal-desc {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 2rem;
  }

  .modal-tech { margin-bottom: 2rem; }
  .modal-tech-label {
    font-size: 0.8rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }

  .modal-tech-list { display: flex; gap: 0.5rem; flex-wrap: wrap; }

  .modal-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(120deg, var(--card-color), var(--card-accent));
    color: white;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.9rem;
    transition: all var(--transition-base);
  }

  .btn-primary:hover { filter: brightness(1.2); transform: translateY(-1px); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--border-bright);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.9rem;
    transition: all var(--transition-base);
  }

  .btn-secondary:hover { border-color: var(--card-color); color: var(--card-accent); }

  @media (max-width: 640px) {
  .modal-content {
    padding: 1.25rem;
  }

  .modal-header {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .modal-emoji {
    width: 40px;
    height: 40px;
    margin-top: 0.1rem;
  }

  .modal-title {
    font-size: 1.1rem;
    line-height: 1.15;
    margin-bottom: 0.15rem;
  }

  .modal-category {
    font-size: 0.68rem;
    letter-spacing: 0.06em;
  }

  .modal-desc {
    font-size: 0.88rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

  @media (max-width: 900px) {
    .projects-section { padding: 5.5rem 0; }
    .projects-grid { grid-template-columns: 1fr; gap: 1.25rem; }
  }

  @media (max-width: 640px) {
    .projects-section { padding: 3.25rem 0; }
    .section-header { margin-bottom: 1.25rem; }
    .section-title { font-size: 1.8rem; margin-bottom: 0.4rem; }
    .section-desc { max-width: 100%; font-size: 0.95rem; line-height: 1.55; }
    .filter-bar { margin-bottom: 1.25rem; gap: 0.35rem; }
    .filter-btn { padding: 0.38rem 0.7rem; font-size: 0.78rem; }
    .projects-grid { gap: 0.85rem; }
    .project-card { padding: 1.1rem; border-radius: var(--radius-lg); gap: 0.75rem; width: 100%; min-width: 0; }
    .card-emoji { width: 36px; height: 36px; }
    .card-title { font-size: 1rem; }
    .card-desc { font-size: 0.82rem; line-height: 1.55; }
    .card-tech { gap: 0.3rem; }
    .tech-tag { font-size: 0.68rem; padding: 0.22rem 0.5rem; }
    .card-links { opacity: 1; transform: none; }
    .card-expand { font-size: 0.8rem; }
    .modal-actions { flex-direction: column; }
    .modal-actions a { justify-content: center; width: 100%; }
  }

  @media (max-width: 380px) {
    .project-card { padding: 1.1rem; }
    .card-title { font-size: 1.05rem; }
  }
</style>