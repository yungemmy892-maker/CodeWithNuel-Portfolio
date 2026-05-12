<script>
  import { theme } from '$lib/stores/theme.js';
</script>

<button
  class="theme-toggle"
  on:click={theme.toggle}
  aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  title={$theme === 'dark' ? 'Light mode' : 'Dark mode'}
>
  <span class="icon" aria-hidden="true">
    {#if $theme === 'dark'}
      ☀
    {:else}
      ☾
    {/if}
  </span>
</button>

<style>
  .theme-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 200;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all var(--transition-base);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }

  .theme-toggle:hover {
    background: var(--accent-glow);
    border-color: var(--accent-bright);
    transform: scale(1.1) rotate(20deg);
  }

  .icon {
    line-height: 1;
    display: flex;
  }
</style>
