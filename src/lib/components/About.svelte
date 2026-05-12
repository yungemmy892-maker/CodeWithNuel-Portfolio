<script>
  import { onMount } from 'svelte';

  /** @type {HTMLElement | undefined} */
  let section;
  let visible = false;
  let profileImg = '/profile.jpg'; 

  const stats = [
    { value: '2+', label: 'Years Exp.' },
    { value: '10+', label: 'Projects' },
    { value: '∞', label: 'Coffees' }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (/** @type {IntersectionObserverEntry[]} */ entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.15 }
    );
    if (section) observer.observe(section);
    return () => observer.disconnect();
  });
</script>

<section id="about" class="about" bind:this={section} aria-label="About me">
  <div class="container">
    <div class="section-header" class:visible>
      <span class="section-label mono">01 — About</span>
      <h2 class="section-title">Building things<br /><em>that matter.</em></h2>
    </div>

    <div class="about-grid" class:visible>
      <!-- Left: text -->
      <div class="about-text">
        <p>
           I'm a frontend engineer who gravitated toward building for the web because I love turning ideas into experiences people can actually feel. 
          Over the past few years
        </p>
        <p>
          My focus sits at the intersection of <strong>clean engineering</strong> and <strong>intentional design</strong>
           I care about how systems scale just as much as how interfaces move, feel, and guide users. Performance, usability, 
           and motion are all part of the same conversation for me.
        </p>
        <p>
         Outside of shipping code, I'm building a Bible app called <strong>RhemaTrem</strong> 
          a tool designed to instantly identify and surface Bible verses in a meaningful and intuitive way. 
          I also experiment with motion design, study modern UI systems, and keep exploring better ways to build for the web.
        </p>

        <div class="about-tags">
          {#each ['SvelteKit', 'TypeScript', 'System Design', 'Web Performance', 'Creative Coding', 'Open Source'] as tag}
            <span class="tag mono">{tag}</span>
          {/each}
        </div>
      </div>

      <!-- Right: profile + stats -->
      <div class="about-visual">
        <!-- Profile card -->
        <div class="profile-card">
          <div class="avatar-wrap">
            {#if profileImg}
              <img src={profileImg} alt="Profile photo" class="avatar-img" />
            {:else}
              <div class="avatar-placeholder" aria-label="Profile photo placeholder">
                <span class="avatar-initials">EO</span>
              </div>
            {/if}
            <div class="avatar-ring" aria-hidden="true"></div>
            <!-- Upload hint shown only when no image -->
            {#if !profileImg}
              <div class="upload-hint" aria-hidden="true">
                <span>📷</span>
                <span class="hint-text">Add photo</span>
              </div>
            {/if}
          </div>

          <div class="profile-info">
            <p class="profile-name">Emmanuel Okon</p>
            <p class="profile-title mono">Frontend Engineer</p>
            <span class="avail-badge">
              <span class="avail-dot" aria-hidden="true"></span>
              Available
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
          {#each stats as stat}
            <div class="stat-card">
              <span class="stat-value">{stat.value}</span>
              <span class="stat-label mono">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about { padding: 8rem 0; }

  .section-header {
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  }
  .section-header.visible { opacity: 1; transform: none; }

  .section-label {
    display: block;
    font-size: 0.8rem;
    color: var(--accent-bright);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .section-title em { font-style: normal; color: var(--accent-bright); }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s 0.2s var(--ease-out), transform 0.8s 0.2s var(--ease-out);
  }
  .about-grid.visible { opacity: 1; transform: none; }

  /* Text */
  .about-text p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1.1rem;
  }
  .about-text strong { color: var(--text-primary); font-weight: 600; }

  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.75rem;
  }

  .tag {
    padding: 0.3rem 0.7rem;
    border-radius: 100px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    font-size: 0.75rem;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    cursor: default;
  }
  .tag:hover {
    border-color: var(--accent-bright);
    color: var(--accent-bright);
    background: rgba(124, 58, 237, 0.08);
  }

  /* Profile card */
  .about-visual {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-card {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 1.25rem 1.5rem;
    transition: border-color var(--transition-base);
  }
  .profile-card:hover { border-color: var(--border-bright); }

  .avatar-wrap {
    position: relative;
    flex-shrink: 0;
    width: 72px;
    height: 72px;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border-bright);
    display: block;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
    border: 2px solid var(--border-bright);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-initials {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--accent-bright);
  }

  .avatar-ring {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px dashed var(--border-bright);
    animation: spin 12s linear infinite;
    pointer-events: none;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Upload hint overlay */
  .upload-hint {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(124, 58, 237, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    opacity: 0;
    transition: opacity var(--transition-fast);
    cursor: pointer;
  }
  .avatar-wrap:hover .upload-hint { opacity: 1; }
  .hint-text {
    font-size: 0.55rem;
    font-family: var(--font-mono);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Profile info */
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .profile-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }

  .profile-title {
    font-size: 0.78rem;
    color: var(--text-secondary);
    line-height: 1.3;
  }

  .avail-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.35rem;
    font-size: 0.72rem;
    font-family: var(--font-mono);
    color: #34d399;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 100px;
    padding: 0.2rem 0.6rem;
    width: fit-content;
  }

  .avail-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 6px #10b981;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1rem 0.5rem;
    text-align: center;
    transition: all var(--transition-base);
  }
  .stat-card:hover {
    border-color: var(--border-bright);
    transform: translateY(-2px);
  }

  .stat-value {
    display: block;
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--accent-bright);
    letter-spacing: -0.03em;
  }
  .stat-label {
    display: block;
    font-size: 0.65rem;
    color: var(--text-muted);
    margin-top: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about-visual { order: -1; }
    .stats-grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
