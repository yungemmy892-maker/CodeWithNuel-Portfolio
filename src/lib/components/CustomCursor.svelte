<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let x = 0, y = 0;
  let dotX = 0, dotY = 0;
  let visible = false;
  let clicking = false;
  let hovering = false;

  onMount(() => {
    if (!browser || window.matchMedia('(pointer: coarse)').matches) return;

    /** @type {number} */
    let animFrame;

    /**
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    const lerp = (a, b, t) => a + (b - a) * t;

    function animate() {
      dotX = lerp(dotX, x, 0.12);
      dotY = lerp(dotY, y, 0.12);
      animFrame = requestAnimationFrame(animate);
    }

    animate();

    /**
     * @param {MouseEvent} e
     */
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      visible = true;
    };

    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    /**
     * @param {MouseEvent} e
     */
    const checkHover = (e) => {
      const el = /** @type {HTMLElement} */ (e.target);
      hovering = !!(el.closest('a, button, [role="button"], input, textarea, select, label'));
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  });
  
</script>

{#if visible}
  <div
    class="cursor-dot"
    class:clicking
    class:hovering
    style="transform: translate({x - 4}px, {y - 4}px)"
    aria-hidden="true"
  ></div>
  <div
    class="cursor-ring"
    class:clicking
    class:hovering
    style="transform: translate({dotX - 20}px, {dotY - 20}px)"
    aria-hidden="true"
  ></div>
{/if}

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    mix-blend-mode: normal;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--accent-bright);
    border-radius: 50%;
    transition: width 200ms, height 200ms, background 200ms;
  }

  .cursor-ring {
    width: 40px;
    height: 40px;
    border: 1.5px solid var(--accent-bright);
    border-radius: 50%;
    opacity: 0.6;
    transition: width 200ms var(--ease-out), height 200ms var(--ease-out), opacity 200ms, border-color 200ms;
  }

  .cursor-dot.clicking {
    width: 6px;
    height: 6px;
    background: white;
  }

  .cursor-ring.clicking {
    width: 30px;
    height: 30px;
    opacity: 0.9;
  }

  .cursor-dot.hovering {
    width: 12px;
    height: 12px;
    background: var(--accent-bright);
  }

  .cursor-ring.hovering {
    width: 52px;
    height: 52px;
    opacity: 0.3;
    border-color: var(--accent-bright);
  }

  @media (pointer: coarse) {
    .cursor-dot, .cursor-ring { display: none; }
  }
</style>
