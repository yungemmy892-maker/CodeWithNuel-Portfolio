<script>
  import { onMount } from 'svelte';

  // ─── EmailJS config ────────────────────────────────────────────────────────
  // 1. Sign up free at https://www.emailjs.com
  // 2. Add a Gmail service  →  copy your Service ID here
  // 3. Create a template with variables: {{from_name}}, {{from_email}}, {{message}}
  //    In the template, set "To Email" to yungemmy892@gmail.com
  // 4. Account → copy your Public Key
  const EMAILJS_SERVICE_ID  = 'service_si7sunn';   // e.g. 'service_abc123'
  const EMAILJS_TEMPLATE_ID = 'template_val0trw';  // e.g. 'template_xyz789'
  const EMAILJS_PUBLIC_KEY  = '0Jiz9CJbtld33vmmW';   // e.g. 'AbCdEfGhIjKlMnOp'
  // ──────────────────────────────────────────────────────────────────────────

  let sectionEl;
  let visible = false;
  let name = '';
  let email = '';
  let message = '';
  let status = ''; // 'sending' | 'sent' | 'error'
  let errorMsg = '';
  let errors = {};

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
    if (!message.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 10) errors.message = 'Message is too short';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    status = 'sending';
    errorMsg = '';

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  name.trim(),
            from_email: email.trim(),
            message:    message.trim(),
            to_email:   'yungemmy892@gmail.com'
          }
        })
      });

      if (res.ok) {
        status = 'sent';
        name = email = message = '';
      } else {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
    } catch (err) {
      status = 'error';
      errorMsg = 'Something went wrong. Please try again or email me directly at yungemmy892@gmail.com';
      console.error('[EmailJS error]', err);
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="contact" class="section contact-section" bind:this={sectionEl}>
  <div class="container">
    <div class="contact-grid" class:visible>
      <div class="contact-info">
        <div class="section-label mono">05 — Contact</div>
        <h2 class="section-title">Let's Build <span class="accent">Something</span></h2>
        <p class="contact-desc">
          Whether you have a project in mind, an opportunity, or just want to talk shop —
          I'd love to hear from you.
        </p>

        <div class="contact-links">
          <a href="mailto:yungemmy892@gmail.com" class="contact-link">
            <span class="link-icon" aria-hidden="true">◎</span>
            <div>
              <span class="link-label">Email</span>
              <span class="link-value">yungemmy892@gmail.com</span>
            </div>
          </a>
          <a href="https://github.com/yungemmy892-maker" target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="link-icon" aria-hidden="true">⌥</span>
            <div>
              <span class="link-label">GitHub</span>
              <span class="link-value">@yungemmy892-maker</span>
            </div>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="link-icon" aria-hidden="true">◈</span>
            <div>
              <span class="link-label">Tiktok</span>
              <span class="link-value">@CTRL_guy</span>
            </div>
          </a>
        </div>

        <div class="availability">
          <span class="avail-dot" aria-hidden="true"></span>
          <span>Available for freelance & full-time roles</span>
        </div>
      </div>

      <div class="contact-form-wrap">
        {#if status === 'sent'}
          <div class="success-state" role="status">
            <div class="success-icon" aria-hidden="true">✓</div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button class="btn-secondary" on:click={() => status = ''}>Send another</button>
          </div>
        {:else}
          <form
            on:submit|preventDefault={handleSubmit}
            novalidate
            aria-label="Contact form"
          >
            {#if status === 'error'}
              <div class="form-error-banner" role="alert">
                ⚠ {errorMsg}
              </div>
            {/if}

            <div class="form-row">
              <div class="field" class:has-error={errors.name}>
                <label for="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  bind:value={name}
                  placeholder="Your name"
                  autocomplete="name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {#if errors.name}
                  <span class="field-error" id="name-error" role="alert">{errors.name}</span>
                {/if}
              </div>

              <div class="field" class:has-error={errors.email}>
                <label for="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  bind:value={email}
                  placeholder="you@example.com"
                  autocomplete="email"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {#if errors.email}
                  <span class="field-error" id="email-error" role="alert">{errors.email}</span>
                {/if}
              </div>
            </div>

            <div class="field" class:has-error={errors.message}>
              <label for="contact-message">Message</label>
              <textarea
                id="contact-message"
                bind:value={message}
                placeholder="Tell me about your project, idea, or question..."
                rows="5"
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {#if errors.message}
                <span class="field-error" id="message-error" role="alert">{errors.message}</span>
              {/if}
            </div>

            <button
              type="submit"
              class="submit-btn"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {#if status === 'sending'}
                <span class="spinner" aria-hidden="true"></span>
                Sending…
              {:else}
                Send Message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              {/if}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container footer-inner">
    <span class="footer-brand">⬡ Emmanuel Okon</span>
    <span class="footer-copy mono">Built with SvelteKit & ❤</span>
    <span class="footer-year mono">{new Date().getFullYear()}</span>
  </div>
</footer>

<style>
  .contact-section { padding: 8rem 0 4rem; }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: start;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s var(--ease-out) 0.1s, transform 0.7s var(--ease-out) 0.1s;
  }
  .contact-grid.visible { opacity: 1; transform: none; }

  .section-label {
    font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent-bright); margin-bottom: 0.75rem; display: block;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em;
    margin-bottom: 1.25rem;
  }
  .accent { color: var(--accent-bright); }

  .contact-desc {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 2.5rem;
    max-width: 380px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
  }
  .contact-link:hover {
    border-color: var(--border-bright);
    background: var(--bg-card-hover);
    transform: translateX(4px);
  }

  .link-icon {
    font-size: 1.25rem;
    color: var(--accent-bright);
    width: 24px;
    text-align: center;
  }

  .link-label {
    display: block;
    font-size: 0.7rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .link-value {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .availability {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 100px;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.25);
    font-size: 0.85rem;
    color: #34d399;
    font-family: var(--font-mono);
  }

  .avail-dot {
    width: 7px; height: 7px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10b981;
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Form */
  .contact-form-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  form { display: flex; flex-direction: column; gap: 1.25rem; }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  input, textarea {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 0.9rem;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    resize: none;
  }

  input::placeholder, textarea::placeholder { color: var(--text-muted); }

  input:focus, textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
    outline: none;
  }

  .field.has-error input,
  .field.has-error textarea {
    border-color: #f87171;
  }

  .field-error {
    font-size: 0.75rem;
    color: #f87171;
    font-family: var(--font-mono);
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: 0 0 30px var(--accent-glow);
  }
  .submit-btn:hover:not(:disabled) {
    background: var(--accent-bright);
    transform: translateY(-1px);
  }
  .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success */
  .success-state {
    text-align: center;
    padding: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .success-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: rgba(16, 185, 129, 0.15);
    border: 2px solid #10b981;
    color: #10b981;
    font-size: 1.5rem;
    display: flex; align-items: center; justify-content: center;
  }

  .success-state h3 {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .success-state p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    max-width: 300px;
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border: 1px solid var(--border-bright);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    background: none;
    font-family: var(--font-display);
    transition: all var(--transition-fast);
    margin-top: 0.5rem;
  }
  .btn-secondary:hover {
    border-color: var(--accent-bright);
    color: var(--accent-bright);
  }

  /* Footer */
  .footer {
    padding: 2.5rem 0;
    border-top: 1px solid var(--border);
    margin-top: 4rem;
  }
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-brand {
    font-weight: 700;
    font-size: 1rem;
    color: var(--accent-bright);
  }
  .footer-copy, .footer-year {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .form-error-banner {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.4);
    border-radius: var(--radius-md);
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: #f87171;
    font-family: var(--font-mono);
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 640px) {
    .form-row { grid-template-columns: 1fr; }
  }
</style>