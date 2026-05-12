export const projects = [
  {
    id: 'neuron-markets',
    title: 'Neuron Markets',
    category: 'frontend',
    description: 'A real-time analytics dashboard built with Vue 3, TypeScript, Pinia, and ECharts',
    longDescription: 'A production-grade real-time analytics dashboard built with Vue 3, TypeScript, Pinia, and ECharts. Simulates a live crypto/financial monitoring terminal with streaming data, interactive charts, and a polished dark UI.',
    tech: ['Vue', 'TypeScript', 'TailwindCSS', 'CSS', 'Pinia', 'ECharts'],
    color: '#7c3aed',
    accentColor: '#a855f7',
    demo: 'https://neuron-markets.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/Neuron-Markets.git',
    featured: true,
    emoji: '📈'
  },

  {
    id: 'collabflow',
    title: 'CollabFlow',
    category: 'fullstack',
    description: 'A modern collaboration workspace designed for teams to communicate, organize projects, and work together in real time.',
    longDescription: 'CollabFlow focuses on productivity and seamless collaboration with clean UI patterns, responsive layouts, and real-time interaction systems. Built with scalability and smooth user experience in mind, the platform streamlines teamwork through modern web technologies.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'PostgreSQL'],
    color: '#06b6d4',
    accentColor: '#22d3ee',
    demo: 'https://collabflow.vercel.app',
    github: 'https://github.com/yungemmy892-maker/Collabflow.git',
    featured: true,
    emoji: '🤝'
  },

  {
    id: 'invoice-app',
    title: 'Invoice App',
    category: 'frontend',
    description: 'A sleek invoice management application built for generating, tracking, and organizing invoices with a clean user experience.',
    longDescription: 'The Invoice App was designed with a strong focus on usability, responsive layouts, and intuitive workflows. It simplifies invoice creation while maintaining a premium dashboard feel with smooth interactions and organized financial tracking.',
    tech: ['React', 'TypeScript', 'CSS', 'LocalStorage', 'Vite'],
    color: '#10b981',
    accentColor: '#34d399',
    demo: 'https://invoice-app-kappa-pied.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/InvoiceApp.git',
    featured: true,
    emoji: '🧾'
  },

  {
    id: 'whisper',
    title: 'Whisper',
    category: 'creative',
    description: 'Every message is encrypted on your device before it leaves, and decrypted only on the recipient\'s device.',
    longDescription: 'Whisper explores modern communication design through elegant interfaces, responsive animations, and real-time messaging concepts. The project highlights frontend craftsmanship, UI consistency, and interactive user experiences.',
    tech: ['TypeScript', 'WebSockets', 'TailwindCSS'],
    color: '#ec4899',
    accentColor: '#f472b6',
    demo: 'https://whisper-iota-wine.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/Whisper.git',
    featured: false,
    emoji: '💬'
  },

  {
    id: 'lumen-ai',
    title: 'Lumen AI',
    category: 'tool',
    description: 'A Chrome Extension + Django backend that uses AI to instantly summarize any webpage into:  Bullet points, Key insights, Reading time, Highlights',
    longDescription: 'Lumen AI blends modern frontend architecture with AI-powered experiences to create a fast and intuitive productivity environment. The project focuses on clean design systems, responsive interactions, and scalable AI integration.',
    tech: ['Html', 'CSS', 'JavaScript', 'Python', 'Gemini API', 'Groq API'],
    color: '#f59e0b',
    accentColor: '#fbbf24',
    demo: 'https://lumen-ai-sand.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/LumenAI.git',
    featured: false,
    emoji: '✨'
  }
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tool', label: 'Tools' },
  { id: 'creative', label: 'Creative' }
];

export const skills = [
  {
    category: 'Frontend',
    icon: '⬡',
    items: [
      { name: 'Svelte / SvelteKit' },
      { name: 'TypeScript' },
      { name: 'React / Next.js' },
      { name: 'CSS / Animation'},
      { name: 'Three.js / WebGL'}
    ]
  },
  {
    category: 'Backend',
    icon: '◈',
    items: [
      { name: 'Node.js / Bun' },
      { name: 'Python / FastAPI' },
      { name: 'PostgreSQL', level: 88 }
    ]
  },
  {
    category: 'Infrastructure',
    icon: '◎',
    items: [
      { name: 'Docker / K8s', level: 82 },
      { name: 'Cloudflare / Vercel', level: 90 },
      { name: 'CI/CD Pipelines', level: 85 },
      { name: 'WebSockets / WebRTC', level: 88 }
    ]
  }
];
