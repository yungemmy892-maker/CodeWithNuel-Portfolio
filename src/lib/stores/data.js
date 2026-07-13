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
    icon: 'bar-chart'
  },

  {
    id: 'collabflow',
    title: 'CollabFlow',
    category: 'fullstack',
    description: 'A modern collaboration workspace designed for teams to organize projects, and work together in real time.',
    longDescription: 'CollabFlow focuses on productivity and seamless collaboration with clean UI patterns, responsive layouts, and real-time interaction systems. Built with scalability and smooth user experience in mind, the platform streamlines teamwork through modern web technologies.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'PostgreSQL'],
    color: '#06b6d4',
    accentColor: '#22d3ee',
    demo: 'https://collabflow-kappa.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/Collabflow.git',
    featured: true,
    icon: 'users'
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
    icon: 'file-text'
  },

  {
    id: 'verseid',
    title: 'VerseID',
    category: 'fullstack',
    description: 'Shazam for Bible verses - speak or type any fragment and VerseID finds the exact book, chapter, verse and translation.',
    longDescription: 'VerseID identifies scripture from a spoken or typed fragment in seconds. Speech is transcribed locally in the browser, then matched against multiple translations (KJV, WEB, DRA, ASV) using fuzzy text matching and semantic search, returning a result with a confidence score. Built as a calm, fast daily-use tool rather than a reference app you have to dig through.',
    tech: ['React', 'TanStack Start', 'Django', 'MongoDB', 'FAISS', 'Web Speech API'],
    color: '#8b5cf6',
    accentColor: '#c4b5fd',
    demo: 'https://verseid.top',
    github: null,
    featured: true,
    icon: 'mic'
  },

  {
    id: 'querycraft',
    title: 'QueryCraft',
    category: 'tool',
    description: 'A browser-based visual SQL query builder and dataset explorer - build nested conditions and see the SQL and results update live.',
    longDescription: 'QueryCraft lets you explore a dataset schema and build complex, deeply nested AND/OR query conditions visually, without writing SQL by hand. A live SQL preview updates as the query is built, results run against the selected dataset, and past queries are kept in a searchable history. Supports importing and exporting query sets across multiple sample schemas.',
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    color: '#14b8a6',
    accentColor: '#2dd4bf',
    demo: 'https://query-craft-beta.vercel.app/',
    github: 'https://github.com/yungemmy892-maker/Query-Craft.git',
    featured: false,
    icon: 'database'
  }
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tool', label: 'Tools' }
];

export const skills = [
  {
    category: 'Frontend',
    icon: 'layers',
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
    icon: 'server',
    items: [
      { name: 'Node.js / Bun' },
      { name: 'Python / FastAPI' },
      { name: 'PostgreSQL', level: 88 }
    ]
  },
  {
    category: 'Infrastructure',
    icon: 'cloud',
    items: [
      { name: 'Docker / K8s', level: 82 },
      { name: 'Cloudflare / Vercel', level: 90 },
      { name: 'CI/CD Pipelines', level: 85 },
      { name: 'WebSockets / WebRTC', level: 88 }
    ]
  }
];