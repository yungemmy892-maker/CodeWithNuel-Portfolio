<script>
  import { onMount, tick } from 'svelte';

  /** @type {HTMLInputElement | undefined} */
  let inputEl;
  /** @type {HTMLElement | undefined} */
  let terminalEl;
  let inputValue = '';
  /** @type {HTMLElement | undefined} */
  let sectionEl;
  let visible = false;

  const PROMPT = 'visitor@Emmanuel:~$ ';

  const bio = {
    name: 'Emmanuel Okon',
    title: 'Frontend Engineer & Creative Developer',
    location: 'Warri, Nigeria',
    email: 'yungemmy892@gmail.com',
    github: 'github.com/yungemmy892@-maker',
    twitter: '@CTRL_guy',
    status: 'Open to new opportunities'
  };

  const commands = {
    help: () => ({
      output: [
        { text: 'Available commands:', class: 'cmd-accent' },
        { text: '' },
        { text: '  whoami        — About me' },
        { text: '  skills        — Technical skills overview' },
        { text: '  projects      — List of projects' },
        { text: '  contact       — Get in touch' },
        { text: '  experience    — Work history' },
        { text: '  education     — Educational background' },
        { text: '  fun           — Something fun' },
        { text: '  clear         — Clear terminal' },
        { text: '  exit          — Close terminal (just kidding)' },
        { text: '' },
        { text: 'Pro tip: Use ↑/↓ to navigate history', class: 'cmd-muted' }
      ]
    }),
    whoami: () => ({
      output: [
        { text: '┌─────────────────────────────────────────┐', class: 'cmd-border' },
        { text: `│  ${bio.name}                        │`, class: 'cmd-border' },
        { text: `│  ${bio.title}  │`, class: 'cmd-border' },
        { text: '└─────────────────────────────────────────┘', class: 'cmd-border' },
        { text: '' },
        { text: `  ${bio.location}` },
        { text: `  ${bio.email}`, class: 'cmd-link' },
        { text: `  ${bio.github}`, class: 'cmd-link' },
        { text: `  ${bio.twitter}`, class: 'cmd-link' },
        { text: '' },
        { text: `Status: ${bio.status}`, class: 'cmd-accent' },
        { text: '' },
        { text: 'I build things for the web. I care deeply about performance,', class: 'cmd-muted' },
        { text: 'developer experience, and beautiful interfaces.', class: 'cmd-muted' }
      ]
    }),
    skills: () => ({
      output: [
        { text: 'FRONTEND', class: 'cmd-accent' },
        { text: '  Svelte / SvelteKit' },
        { text: ' TypeScript' },
        { text: ' CSS / Animation ' },
        { text: '  React / Next.js ' },
        { text: '' },
        { text: 'BACKEND', class: 'cmd-accent' },
        { text: ' Node.js / Bun ' },
        { text: ' Python / FastAPI' },
        { text: ' PostgreSQL ' },
        { text: '' },
        { text: 'INFRASTRUCTURE', class: 'cmd-accent' },
        { text: ' Docker / K8s ' },
        { text: ' Cloudflare / Vercel' }
      ]
    }),
    projects: () => ({
      output: [
        { text: 'Recent projects:', class: 'cmd-accent' },
        { text: '' },
        { text: '  Neuron Markets      — Real-time analytics dashboard', class: 'cmd-project' },
        { text: '  CollabFlow          — Modern real-time collaboration workspace', class: 'cmd-project' },
        { text: '  Invoice App         — Sleek invoice management platform', class: 'cmd-project' },
        { text: '  Whisper             — Encrypted real-time messaging experience', class: 'cmd-project' },
        { text: '  Lumen AI            — AI-powered webpage summarizer', class: 'cmd-project' },
        { text: '' },
        { text: 'Type "project neuron-markets" for more details', class: 'cmd-muted' }
      ]
    }),
    contact: () => ({
      output: [
        { text: '─── Ways to reach me ───', class: 'cmd-accent' },
        { text: '' },
        { text: `  Email:    ${bio.email}`, class: 'cmd-link' },
        { text: `  GitHub:   ${bio.github}`, class: 'cmd-link' },
        { text: `  Twitter:  ${bio.twitter}`, class: 'cmd-link' },
        { text: '' },
        { text: '  Or scroll down to the contact form ↓', class: 'cmd-muted' }
      ]
    }),
    experience: () => ({
      output: [
        { text: 'Work Experience', class: 'cmd-accent' },
        { text: '' },
        { text: '  2026–Present  Frontend Engineer @ CAYAHQ', class: 'cmd-job' },
        { text: '                Svelte, TypeScript, TailwindCSS, Motion UI', class: 'cmd-muted' }
      ]
    }),
    education: () => ({
      output: [
        { text: 'Education', class: 'cmd-accent' },
        { text: '' },
        { text: '  BS Computer Science', class: 'cmd-job' },
        { text: '  OU - 2020-2024', class: 'cmd-muted' },
        { text: '  Emphasis: Computer Science', class: 'cmd-muted' }
      ]
    }),
    fun: () => ({
      output: [
        { text: '  ████████████████████████', class: 'cmd-fun' },
        { text: '   Fun facts about me:', class: 'cmd-accent' },
        { text: '  ████████████████████████', class: 'cmd-fun' },
        { text: '' },
        { text: '    Music Lover' },
        { text: '    Rock climbing enthusiast' },
        { text: '    Coffee drinker' },
        { text: '    Currently reading always' },
        { text: '    Night owl, 11pm = peak productivity' },
      ]
    }),
    clear: () => ({ clear: true }),
    exit: () => ({
      output: [
        { text: "Nice try. There's no escaping this terminal.", class: 'cmd-accent' },
        { text: '(But you can scroll the page instead)' }
      ]
    })
  };

  let history = [
    {
      type: 'output',
      lines: [
        { text: '  _____ _             _____           ', class: 'cmd-art' },
        { text: ' |  _  | |           |     |___  ___  ', class: 'cmd-art' },
        { text: ' | |_| | |_____ ___  |   --|   || -_| ', class: 'cmd-art' },
        { text: ' |__|  |_____|_|___|  \\___||_|_||___| ', class: 'cmd-art' },
        { text: '' },
        { text: 'Interactive portfolio terminal v2.0.1', class: 'cmd-accent' },
        { text: 'Type "help" to see available commands.', class: 'cmd-muted' },
        { text: '' }
      ]
    }
  ];

   /** @type {string[]} */
  let cmdHistory = [];
  let histIdx = -1;

  /**
   * @param {string} raw
   */
  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    cmdHistory = [raw, ...cmdHistory.slice(0, 49)];
    histIdx = -1;

    // Now history accepts the input entry
    history = [...history, { type: 'input', text: raw }];

    if (cmd === 'clear') {
      history = [];
      return;
    }

    const fn = commands[cmd] || commands[cmd.split(' ')[0]];
    if (fn) {
      const result = fn(cmd);
      if (!result.clear) {
        history = [...history, { type: 'output', lines: result.output || [] }];
      }
    } else {
      history = [...history, {
        type: 'output',
        lines: [
          { text: `Command not found: ${cmd}`, class: 'cmd-error' },
          { text: 'Type "help" to see available commands.', class: 'cmd-muted' }
        ]
      }];
    }

    tick().then(() => {
      if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight;
    });
  }

  /**
   * @param {KeyboardEvent} e
   */
  function onKeydown(e) {
    if (e.key === 'Enter') {
      runCommand(inputValue);
      inputValue = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      histIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      inputValue = cmdHistory[histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx = Math.max(histIdx - 1, -1);
      inputValue = histIdx === -1 ? '' : cmdHistory[histIdx];
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (/** @type {IntersectionObserverEntry[]} */ entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          inputEl?.focus();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="terminal" class="section terminal-section" bind:this={sectionEl}>
  <div class="container">
    <div class="section-header" class:visible>
      <div class="section-label mono">04 — Interactive</div>
      <h2 class="section-title">Try the <span class="accent">Terminal</span></h2>
      <p class="section-desc">An interactive command-line interface. Type "help" to get started.</p>
    </div>

    <div class="terminal-wrapper" class:visible>
      <div class="terminal-titlebar" aria-hidden="true">
        <div class="titlebar-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span class="titlebar-title mono">portfolio — Emmanuel — zsh</span>
        <div style="width:52px"></div>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div
        class="terminal-body"
        bind:this={terminalEl}
        on:click={() => inputEl?.focus()}
        role="region"
        aria-label="Interactive terminal"
        aria-live="polite"
      >
        {#each history as entry}
          {#if entry.type === 'input'}
            <div class="terminal-line input-line">
              <span class="prompt mono">{PROMPT}</span>
              <span class="input-text mono">{entry.text}</span>
            </div>
          {:else}
            <div class="terminal-output" aria-live="off">
              {#each entry.lines as line}
                <div class="terminal-line output-line mono {line.class || ''}">{line.text || '\u00A0'}</div>
              {/each}
            </div>
          {/if}
        {/each}

        <div class="terminal-line input-line active-line">
          <span class="prompt mono">{PROMPT}</span>
          <input
            bind:this={inputEl}
            bind:value={inputValue}
            class="terminal-input mono"
            on:keydown={onKeydown}
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>

    <div class="terminal-hint mono" class:visible>
      Try: <button class="hint-cmd" on:click={() => { inputValue = 'whoami'; runCommand('whoami'); inputValue = ''; }}>whoami</button>
      <button class="hint-cmd" on:click={() => { runCommand('projects'); }}>projects</button>
      <button class="hint-cmd" on:click={() => { runCommand('fun'); }}>fun</button>
    </div>
  </div>
</section>

<style>
  .terminal-section { padding: 8rem 0; }

  .section-header { margin-bottom: 3rem; }
  .section-header.visible .section-label { opacity: 1; transform: none; }
  .section-header.visible .section-title { opacity: 1; transform: none; }
  .section-header.visible .section-desc { opacity: 1; transform: none; }

  .section-label {
    font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent-bright); margin-bottom: 0.75rem;
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  }
  .section-title {
    font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem;
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.6s var(--ease-out) 0.1s, transform 0.6s var(--ease-out) 0.1s;
  }
  .accent { color: var(--accent-bright); }
  .section-desc {
    font-size: 1.05rem; color: var(--text-secondary); max-width: 480px;
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.6s var(--ease-out) 0.2s, transform 0.6s var(--ease-out) 0.2s;
  }

  /* Terminal */
  .terminal-wrapper {
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border-bright);
    background: #0a0a12;
    box-shadow: 0 40px 80px -20px rgba(124, 58, 237, 0.25);
    max-width: 800px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s var(--ease-out) 0.3s, transform 0.7s var(--ease-out) 0.3s;
  }
  .terminal-wrapper.visible { opacity: 1; transform: none; }

  .terminal-titlebar {
    background: #141420;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }

  .titlebar-dots { display: flex; gap: 6px; }
  .dot {
    width: 12px; height: 12px;
    border-radius: 50%;
  }
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green { background: #28c840; }

  .titlebar-title {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  .terminal-body {
    padding: 1.25rem;
    min-height: 360px;
    max-height: 480px;
    overflow-y: auto;
    cursor: text;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .terminal-line {
    display: flex;
    align-items: baseline;
    gap: 0;
    min-height: 1.5rem;
    line-height: 1.5;
  }

  .prompt {
    color: var(--accent-bright);
    font-size: 0.8rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .input-text {
    color: #e0e0ff;
    font-size: 0.8rem;
  }

  .terminal-output {
    margin: 0.25rem 0;
  }

  .output-line {
    font-size: 0.8rem;
    color: #c0c0e0;
    white-space: pre;
  }

  .output-line.cmd-accent { color: var(--accent-bright); }
  .output-line.cmd-muted { color: #666690; }
  .output-line.cmd-link { color: var(--accent-secondary); }
  .output-line.cmd-error { color: #f87171; }
  .output-line.cmd-art { color: var(--accent-bright); opacity: 0.7; }
  .output-line.cmd-border { color: #555580; }
  .output-line.cmd-job { color: #a0a0d0; font-weight: 600; }
  .output-line.cmd-project { color: #c0c0ff; }
  .output-line.cmd-fun { color: var(--accent); }

  .active-line { margin-top: 0.25rem; }

  .terminal-input {
    background: none;
    border: none;
    outline: none;
    color: #e0e0ff;
    font-size: 0.8rem;
    font-family: var(--font-mono);
    flex: 1;
    caret-color: var(--accent-bright);
    width: 100%;
  }

  /* Hints */
  .terminal-hint {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.25rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    opacity: 0;
    transition: opacity 0.6s var(--ease-out) 0.6s;
  }
  .terminal-hint.visible { opacity: 1; }

  .hint-cmd {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.2rem 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-bright);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .hint-cmd:hover {
    background: rgba(124, 58, 237, 0.15);
    border-color: var(--accent-bright);
  }

  @media (max-width: 640px) {
    .terminal-body { min-height: 280px; }
    .output-line { white-space: pre-wrap; word-break: break-word; }
  }
</style>
