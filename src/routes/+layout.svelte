<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { theme } from '$lib/stores/theme.js';
  import { onMount } from 'svelte';

  onMount(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', $theme);
  });
</script>

<svelte:head>
  <title>Emmanuel Okon - Developer Portfolio</title>
</svelte:head>

<div class="grid-bg" aria-hidden="true"></div>
<div class="aurora" aria-hidden="true"></div>
<CustomCursor />
<Nav />
<ThemeToggle />

<main id="main-content">
  <slot />
</main>

<style>
  main {
    position: relative;
    z-index: 1;
  }
</style>