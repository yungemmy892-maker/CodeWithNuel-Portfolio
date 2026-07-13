<script>
  /** @type {string} */
  export let name = '';
  /** @type {number} */
  export let size = 18;
  /** @type {number} */
  export let strokeWidth = 1.75;
</script>

{#if name === 'github'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
{:else if name === 'twitter'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M12.6 1.5h2.45l-5.35 6.12L16 14.5h-4.94l-3.87-5.06-4.43 5.06H.3l5.72-6.54L0 1.5h5.06l3.5 4.63L12.6 1.5Zm-.86 11.54h1.36L4.32 2.88H2.86l8.88 10.16Z"/>
  </svg>
{:else if name === 'tiktok'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M11.5 0h-2.4v10.6a2.2 2.2 0 1 1-1.56-2.1V5.98a4.7 4.7 0 1 0 3.96 4.64V5.4a5.5 5.5 0 0 0 3.3 1.1V4.1A3.1 3.1 0 0 1 11.5 1V0Z"/>
  </svg>
{:else if name === 'mail'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5"/>
    <path d="M2 4l6 5 6-5"/>
  </svg>
{:else if name === 'hexagon'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2 21 7v10L12 22 3 17V7z"/>
  </svg>
{:else if name === 'layers'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2 2 7l10 5 10-5-10-5Z"/>
    <path d="M2 12l10 5 10-5"/>
    <path d="M2 17l10 5 10-5"/>
  </svg>
{:else if name === 'server'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="7" rx="1.5"/>
    <rect x="2" y="14" width="20" height="7" rx="1.5"/>
    <path d="M6 6.5h.01M6 17.5h.01"/>
  </svg>
{:else if name === 'cloud'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.7A4.5 4.5 0 0 0 6.5 19h11Z"/>
  </svg>
{:else if name === 'tool'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.7 2.7-2-2 2.7-2.7Z"/>
  </svg>
{:else if name === 'camera'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 8h2.8L8.5 5h7l1.7 3H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/>
    <circle cx="12" cy="13.5" r="3.5"/>
  </svg>
{:else if name === 'check'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth + 0.25} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 12.5l5.5 5.5L20 7"/>
  </svg>
{:else if name === 'alert'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3 22 20H2L12 3Z"/>
    <path d="M12 10v4.5M12 17.5h.01"/>
  </svg>
{:else if name === 'arrow-right'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
{:else if name === 'arrow-up-right'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6"/>
  </svg>
{:else if name === 'external-link'}
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L7 10"/>
  </svg>
{:else if name === 'bar-chart'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 20V10M12 20V4M20 20v-7"/>
  </svg>
{:else if name === 'users'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2"/>
    <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0"/>
    <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.2"/>
    <path d="M15.6 14.2c2.7.4 4.7 2.4 5.6 5.8"/>
  </svg>
{:else if name === 'file-text'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"/>
    <path d="M14 2.5V7h4"/>
    <path d="M8 13h8M8 17h5"/>
  </svg>
{:else if name === 'message-circle'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20l1.05-5.4A8.5 8.5 0 1 1 21 11.5Z"/>
  </svg>
{:else if name === 'sparkles'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3v4M12 17v4M4.2 12H2M22 12h-2.2M6.5 6.5l1.4 1.4M16.1 16.1l1.4 1.4M17.5 6.5l-1.4 1.4M7.9 16.1l-1.4 1.4"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
{:else if name === 'sun'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5"/>
    <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
  </svg>
{:else if name === 'moon'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>
  </svg>
{:else if name === 'mic'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="9" y="2.5" width="6" height="11" rx="3"/>
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0"/>
    <path d="M12 17.5V21M9 21h6"/>
  </svg>
{:else if name === 'database'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="8" ry="3"/>
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/>
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
  </svg>
{/if}