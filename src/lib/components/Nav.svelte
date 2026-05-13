<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let scrolled = false;
  let menuOpen = false;

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#terminal', label: 'Terminal' },
    { href: '#contact', label: 'Contact' }
  ];

  onMount(() => {
    const handleScroll = () => { scrolled = window.scrollY > 50; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function closeMenu() { menuOpen = false; }
</script>

<a href="#main-content" class="skip-nav">Skip to main content</a>

<nav class="nav" class:scrolled aria-label="Main navigation">
  <div class="nav-inner container">
    <a href="/" class="logo" aria-label="Emmanuel — Home">
      <span class="logo-symbol">⬡</span>
      <span class="logo-text">EO</span>
    </a>

    <button
      class="menu-toggle"
      class:open={menuOpen}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      on:click={() => menuOpen = !menuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="nav-links" class:open={menuOpen} role="list">
      {#each navItems as item}
        <li>
          <a href={item.href} class="nav-link" on:click={closeMenu}>
            {item.label}
          </a>
        </li>
      {/each}
      <li>
        <a href="/resume.pdf" class="nav-cta" download aria-label="Download resume PDF">
          Resume ↗
        </a>
      </li>
    </ul>
  </div>
</nav>

<style>
  .skip-nav {
    position: fixed;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    z-index: 1000;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    transition: top var(--transition-fast);
  }
  .skip-nav:focus { top: 0; }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.25rem 0;
    transition: all var(--transition-base);
  }

  .nav.scrolled {
    padding: 0.75rem 0;
    background: rgba(6, 6, 15, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  :global([data-theme="light"]) .nav.scrolled {
    background: rgba(248, 248, 255, 0.85);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
  }

  .logo-symbol {
    color: var(--accent-bright);
    font-size: 1.25rem;
    line-height: 1;
  }

  .logo-text {
    color: var(--text-primary);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
  }

  .nav-link {
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color var(--transition-fast), background var(--transition-fast);
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--border);
  }

  .nav-cta {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--accent-bright);
    border: 1px solid var(--border-bright);
    transition: all var(--transition-fast);
    font-family: var(--font-mono);
  }

  .nav-cta:hover {
    background: var(--accent-glow);
    border-color: var(--accent-bright);
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .menu-toggle span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: all var(--transition-base);
    transform-origin: center;
  }

  .menu-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .menu-toggle.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .menu-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
      z-index: 101;
    }

    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100vh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;

      background: rgba(6, 6, 15, 0.96);
      backdrop-filter: blur(20px);

      transition: right 0.35s ease;
      z-index: 99;
    }

    :global([data-theme="light"]) .nav-links {
      background: rgba(248, 248, 255, 0.96);
    }

    .nav-links.open {
      right: 0;
    }

    .nav-link {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
</style>
