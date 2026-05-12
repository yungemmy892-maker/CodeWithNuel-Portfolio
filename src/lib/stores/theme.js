import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
  const stored = browser ? localStorage.getItem('portfolio-theme') : null;
  const initial = stored || 'dark';

  // Store is already typed via inference (Writable<string>)
  const { subscribe, set, update } = writable(initial);

  if (browser) {
    document.documentElement.setAttribute('data-theme', initial);
  }

  return {
    subscribe,
    toggle() {
      update(current => {
        const next = current === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('portfolio-theme', next);
          document.documentElement.setAttribute('data-theme', next);
        }
        return next;
      });
    },
    /**
     * @param {string} value
     */
    set(value) {
      if (browser) {
        localStorage.setItem('portfolio-theme', value);
        document.documentElement.setAttribute('data-theme', value);
      }
      set(value);
    }
  };
}

export const theme = createThemeStore();