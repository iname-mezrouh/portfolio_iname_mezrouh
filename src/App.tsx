import { useState, useEffect, useRef } from 'react'

const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}images/`

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact']

// const SKILLS = {
//   'Machine Learning': ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'Hugging Face'],
//   'Data Engineering': ['Spark', 'Airflow', 'dbt', 'Kafka', 'PostgreSQL'],
//   'Languages': ['Python', 'SQL', 'R', 'TypeScript', 'Bash'],
//   'Infrastructure': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'MLflow'],
//   'Visualization': ['Matplotlib', 'Plotly', 'Tableau', 'D3.js', 'Streamlit'],
// }
const SKILLS = {
  'Programming Languages': ['Python', 'C++', 'C', 'JavaScript', 'R', 'SQL', 'Dart'],
  'AI & Machine Learning': ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch'],
  'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'Next.js', 'REST API'],
  'Mobile Development': ['Flutter', 'Dart', 'BLoC', 'Cubit', 'SQLite', 'Firebase', 'Supabase'],
  'Database': ['Advanced Database', 'MySQL', 'MongoDB', 'SQLite', 'Supabase'],
  'Tools & Development': ['Git', 'GitHub', 'VS Code', 'Figma', 'Excel'],
  'Data Science': ['Data Cleaning', 'Data Preprocessing', 'Data Visualization', 'EDA', 'Data Annotation', 'Dataset Preparation', 'Time Series'],
  'Other Technical Skills': ['Linear Algebra', 'Probability & Statistics', 'Optimization', 'Stochastic Modeling', 'Operations Research'],
  'DevOps & Infra': ['Docker', 'Docker Compose', 'Linux', 'Git / GitHub', 'CI/CD', 'REST API Deployment', 'Environment Config', 'Virtual Environments', 'AWS', 'Postman', 'Vercel'],
}

const PROJECTS = [
  {
    id: '01',
    title: 'Artificial Personal Workout Planner',
    tags: ['AI', 'Python', 'Recommendation System'],
    description:
      'AI-based planner that generates personalized workout routines based on user goals, fitness levels, and preferences using intelligent recommendation algorithms.',
    metric: 'Personalized AI',
    year: '2024',
    link: '#',
  },
  {
    id: '02',
    title: 'Te7wissa Tourism App',
    tags: ['Mobile App', 'React Native', 'Tourism'],
    description:
      'Tourism app helping foreign visitors in Algeria discover and book hotels, restaurants, and trips with real-time availability and local recommendations.',
    metric: '100+ Listings',
    year: '2024',
    link: '#',
  },
  {
    id: '03',
    title: 'Netflix Movies & Shows Platform',
    tags: ['React', 'API', 'Streaming'],
    description:
      'Netflix-inspired platform for browsing and exploring movies and TV shows with search, filtering, and watchlist features.',
    metric: '10K+ Movies',
    year: '2024',
    link: '#',
  },
  {
    id: '04',
    title: 'Storium – Inventory Management System',
    tags: ['Inventory', 'Management', 'Full-Stack'],
    description:
      'Comprehensive system for managing clients, products, inventory tracking, and multiple storage locations with real-time updates and analytics.',
    metric: 'Multi-warehouse',
    year: '2024',
    link: '#',
  },
  {
    id: '05',
    title: 'Vestium – Smart Digital Wardrobe App',
    tags: ['Mobile App', 'Flutter', 'Fashion Tech'],
    description:
      'Co-developed mobile app for digital wardrobe organization, outfit planning, and social fashion sharing with community features.',
    metric: 'Mobile development ',
    year: '2024',
    link: '#',
  },
  {
    id: '06',
    title: 'Arctic Sea Ice Extent Analysis',
    tags: ['Data Science', 'Python', 'Forecasting'],
    description:
      'Forecasted Arctic Sea Ice Extent trends using advanced data analysis, time series modeling, and predictive techniques to understand climate patterns.',
    metric: 'Time Series Forecasting',
    year: '2026',
    link: 'https://github.com/iname-mezrouh/Arctic-Sea-Ice-Extent-analysis',
  },
  {
    id: '07',
    title: 'Student Food Preference Analysis',
    tags: ['Data Mining', 'Python', 'Analytics'],
    description:
      'Data mining project analyzing students\' restaurant and food preferences using clustering and association rule mining techniques.',
    metric: '80+ Students',
    year: '2024',
    link: '#',
  },
  {
    id: '08',
    title: 'AI Model Inversion Attack & Defense',
    tags: ['AI Security', 'IoT', 'Privacy'],
    description:
      'Explored privacy attacks and defense mechanisms on AI models in IoT occupancy detection systems, analyzing vulnerability and mitigation strategies.',
    metric: 'Security Research',
    year: '2024',
    link: '#',
  },
  {
    id: '09',
    title: 'Security Monitoring System',
    tags: ['Security', 'Windows', 'Real-time'],
    description:
      'Built a real-time security monitoring and alert system for Windows environments with AI model protection and threat detection capabilities.',
    metric: 'Real-time Alerts',
    year: '2024',
    link: '#',
  },
  {
    id: '10',
    title: 'AI-Enhanced Research Collaboration Platform',
    tags: ['AI', 'Collaboration', 'Desktop App'],
    description:
      'Designed an AI-powered desktop platform connecting researchers and students for collaborative research, project sharing, and academic networking.',
    metric: 'AI-powered',
    year: '2024',
    link: '#',
  },
]

const EXPERIENCE = [
  {
    role: 'Intern',
    company: 'Algérie Télécom',
    period: 'Summer 2026',
    bullets: [
      'Worked on telecommunications infrastructure and network systems',
      'Gained hands-on experience with enterprise-level IT operations',
    ],
  },
  {
    role: 'Intern',
    company: 'Caisse Nationale des Assurances Sociales (CNAS) - Tissemsilt',
    period: 'Summer 2026',
    bullets: [
      'Assisted in social security administration and data management',
      'Contributed to improving internal processes and digital record-keeping',
    ],
  },
  {
    role: 'Engineering Student',
    company: 'École Nationale Supérieure d\'Intelligence Artificial  (ENSIA)',
    period: '2023 — Present',
    bullets: [
      'Pursuing engineering degree in Computer Science',
      'Focus on Artificial Intelligence, Data Science, and Software Engineering',
    ],
  },
  {
    role: 'High School Diploma - Mathematics',
    company: 'High School of Mathematics - Mouhamed Moukhbi, Kouba',
    period: '2020 — 2023',
    bullets: [
      'Specialized in Mathematics with strong analytical foundation',
      'Developed rigorous problem-solving and logical reasoning skills',
    ],
  },
]



const CERTIFICATIONS = [
  {
    name: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-ML-12345',
    link: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    image: `${IMAGE_BASE_URL}hack&train.png`,
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2023',
    credentialId: 'TF-DEV-67890',
    link: 'https://www.tensorflow.org/certificate',
    image: `${IMAGE_BASE_URL}etcversery.png`,
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'deeplearning.ai',
    date: '2023',
    credentialId: 'DL-12345',
    link: 'https://www.deeplearning.ai/courses/deep-learning-specialization/',
    image: `${IMAGE_BASE_URL}ai_fest.jpg`,
  },
  {
    name: 'Google Professional Data Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    credentialId: 'GCP-DE-54321',
    link: 'https://cloud.google.com/certification/data-engineering',
    image: `${IMAGE_BASE_URL}Introduction to Deep Learning with PyTorch_page-0001.jpg`,
  },
  {
    name: 'Google Professional Data Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    credentialId: 'GCP-DE-54321',
    link: 'https://cloud.google.com/certification/data-engineering',
    image: `${IMAGE_BASE_URL}mobai.jpg`,
  },
]

type Project = (typeof PROJECTS)[number] & { visible?: boolean }
type Certification = (typeof CERTIFICATIONS)[number] & { visible?: boolean }
type SkillsData = Record<string, string[]>

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return displayed
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationFrameId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const particles: {x: number, y: number, vx: number, vy: number, s: number, a: number}[] = []
    for(let i=0; i<60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        s: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.3 + 0.1
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if(p.x < 0) p.x = canvas.width
        if(p.x > canvas.width) p.x = 0
        if(p.y < 0) p.y = canvas.height
        if(p.y > canvas.height) p.y = 0
        
        ctx.fillStyle = `rgba(0, 229, 255, ${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fill()
      })
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// ─── Components ───────────────────────────────────────────────────────────────

// function Nav({ active }: { active: string }) {
//   const [open, setOpen] = useState(false)

//   return (
//     <header
//       style={{ fontFamily: 'var(--font-mono)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
//       className="fixed top-0 left-0 right-0 z-50 bg-[#040a18]/90 backdrop-blur-md"
//     >
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
//         <span className="text-[#00e5ff] text-sm font-semibold tracking-widest uppercase">
          
//         </span>

//         {/* Desktop */}
//         <nav className="hidden md:flex gap-8 items-center">
//           {NAV_LINKS.map((l) => (
//             <a
//               key={l}
//               href={`#${l.toLowerCase()}`}
//               className={`text-xs tracking-wider uppercase transition-colors duration-150 ${
//                 active === l.toLowerCase()
//                   ? 'text-[#00e5ff]'
//                   : 'text-[#6b7280] hover:text-[#e8eaed]'
//               }`}
//             >
//               {l}
//             </a>
//           ))}
//           <a
//             href="/resume.pdf"
//             className="text-xs tracking-wider uppercase px-4 py-1.5 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#040a18] transition-colors duration-150"
//           >
//             Resume ↗
//           </a>
//         </nav>

//         {/* Mobile toggle */}
//         <button
//           className="md:hidden text-[#9ca3af] text-xs tracking-widest uppercase"
//           onClick={() => setOpen((o) => !o)}
//         >
//           {open ? 'close' : 'menu'}
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden border-t border-[rgba(255,255,255,0.06)] px-6 py-4 flex flex-col gap-4">
//           {NAV_LINKS.map((l) => (
//             <a
//               key={l}
//               href={`#${l.toLowerCase()}`}
//               onClick={() => setOpen(false)}
//               className="text-xs tracking-wider uppercase text-[#9ca3af] hover:text-[#00e5ff] transition-colors"
//             >
//               {l}
//             </a>
//           ))}
//         </div>
//       )}
//     </header>
//   )
// }

function Nav({ active, toggleTheme, theme }: { active: string; toggleTheme: () => void; theme: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{ fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-light)' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-main-90)] backdrop-blur-md transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <span className="text-[var(--accent)] text-sm font-semibold tracking-widest uppercase">
          Mezrouh iname
        </span>

        {/* Desktop */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-xs tracking-wider uppercase transition-colors duration-150 ${
                active === l.toLowerCase()
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              {l}
            </a>
          ))}
          <a
            href="src/cv_mezrouh_iname.pdf"
            className="text-xs tracking-wider uppercase px-4 py-1.5 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-main)] transition-colors duration-150"
          >
            Resume ↗
          </a>
          <button 
            onClick={toggleTheme}
            className="text-xs tracking-wider uppercase text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-[var(--text-dim)] text-xs tracking-widest uppercase"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            className="text-[var(--text-muted)] text-xs tracking-widest uppercase"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border-light)] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-xs tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}


function Tag({ label }: { label: string }) {
  return (
    <span
      style={{ fontFamily: 'var(--font-mono)' }}
      className="text-[10px] tracking-wider uppercase px-2 py-0.5 border border-[var(--border-med)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150 cursor-default"
    >
      {label}
    </span>
  )
}

// function Hero() {
//   const typed = useTypewriter([
//     'machine learning engineer',
//     'data scientist',
//     'nlp researcher',
//     'ml systems builder',
//   ])

//   return (
//     <section
//       id="hero"
//       className="min-h-screen flex flex-col justify-center px-6 pt-14"
//       style={{
//         background:
//           'radial-gradient(ellipse 80% 50% at 60% 30%, var(--accent-alpha-4) 0%, transparent 70%)',
//       }}
//     >
//       <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-16 items-center">
//         <div>
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-6"
//           >
//             &gt; hello world
//           </div>

//           <h1
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.05 }}
//             className="text-[clamp(3rem,9vw,7rem)] font-black text-[var(--text-main)] mb-4"
//           >
//             MEZROUH Iname
//           </h1>

//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[clamp(1rem,2.5vw,1.5rem)] text-[var(--text-muted)] mb-8 h-8 flex items-center gap-2"
//           >
//             <span className="text-[var(--accent)]">$</span>
//             <span>{typed}</span>
//             <span className="inline-block w-0.5 h-5 bg-[var(--accent)] animate-pulse" />
//           </div>

//           <p
//             style={{ fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
//             className="text-[var(--text-dim)] text-base leading-relaxed mb-10"
//           >
//             MS Computer Science @ CMU. I build systems that learn from data — from raw pipelines
//             to production inference. Currently seeking full-time ML engineering roles for 2025.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <a
//               href="#projects"
//               className="px-6 py-3 bg-[var(--accent)] text-[var(--bg-main)] text-sm font-bold tracking-wide hover:bg-white transition-colors duration-150"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               ./projects
//             </a>
//             <a
//               href="#contact"
//               className="px-6 py-3 border border-[var(--border-strong)] text-[var(--text-muted)] text-sm tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               ./contact
//             </a>
//           </div>
//         </div>

//         {/* Stats column */}
//         <div className="hidden md:grid grid-rows-3 gap-px border border-[var(--border-light)]">
//           {[
//             { n: '6+', label: 'Projects shipped' },
//             { n: '2', label: 'ACL papers' },
//             { n: '94.2%', label: 'Best F1 score' },
//           ].map(({ n, label }) => (
//             <div
//               key={label}
//               className="px-8 py-6 border-b border-[var(--border-light)] last:border-0"
//             >
//               <div
//                 style={{ fontFamily: 'var(--font-display)' }}
//                 className="text-4xl font-black text-[var(--accent)] mb-1"
//               >
//                 {n}
//               </div>
//               <div
//                 style={{ fontFamily: 'var(--font-mono)' }}
//                 className="text-xs text-[var(--text-dim)] tracking-wider uppercase"
//               >
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div className="max-w-6xl mx-auto w-full mt-16 flex items-center gap-4">
//         <div className="w-8 h-px bg-[var(--accent)]" />
//         <span
//           style={{ fontFamily: 'var(--font-mono)' }}
//           className="text-[10px] text-[var(--text-dim)] tracking-[0.3em] uppercase"
//         >
//           scroll to explore
//         </span>
//       </div>
//     </section>
//   )
// }


// cirlce image 

// ------------------------------------------------
function Hero() {
  const typed = useTypewriter([
    'machine learning engineer',
    'data scientist',
    'nlp researcher',
    'ml systems builder',
  ])

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 pt-14"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 60% 30%, var(--accent-alpha-4) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-16 items-center">
        <div>
          <div
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-6"
          >
            &gt; hello world
          </div>

          <h1
            style={{ fontFamily: 'var(--font-display)', lineHeight: 1.05 }}
            className="text-[clamp(3rem,9vw,7rem)] font-black text-[var(--text-main)] mb-4"
          >
            MEZROUH Iname
          </h1>

          <div
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[clamp(1rem,2.5vw,1.5rem)] text-[var(--text-muted)] mb-8 h-8 flex items-center gap-2"
          >
            <span className="text-[var(--accent)]">$</span>
            <span>{typed}</span>
            <span className="inline-block w-0.5 h-5 bg-[var(--accent)] animate-pulse" />
          </div>

          <p
            style={{ fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
            className="text-[var(--text-dim)] text-base leading-relaxed mb-10"
          >
            AI Engineering Student @ ENSIA. I turn data into intelligent solutions — combining Data Science, Machine Learning, and software engineering to build practical systems from experimentation to deployment.

          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-6 py-3 bg-[var(--accent)] text-[var(--bg-main)] text-sm font-bold tracking-wide hover:bg-white transition-colors duration-150"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ./projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-[var(--border-strong)] text-[var(--text-muted)] text-sm tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ./contact
            </a>
          </div>
        </div>

        {/* Profile Image - Circular with theme color border */}
        <div className="relative flex justify-center md:block">
          <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80">
            {/* Glow effect behind image */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-20"
              style={{
                background: 'var(--accent)',
                transform: 'scale(1.1)',
              }}
            />
            
            {/* Image container with gradient border */}
            <div 
              className="relative w-full h-full rounded-full p-1"
              style={{
                background: 'conic-gradient(from 0deg, var(--accent), transparent 30%, var(--accent) 60%, transparent 80%, var(--accent))',
                animation: 'spin 8s linear infinite',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-card)]">
                <img
                  src={`${IMAGE_BASE_URL}iname_image.jpg`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Optional: Decorative ring pulse */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-[var(--accent)] opacity-30 animate-pulse"
              style={{ transform: 'scale(1.05)' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="max-w-6xl mx-auto w-full mt-16 flex items-center gap-4">
        <div className="w-8 h-px bg-[var(--accent)]" />
        <span
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-[10px] text-[var(--text-dim)] tracking-[0.3em] uppercase"
        >
          scroll to explore
        </span>
      </div>
    </section>
  )
}

// moustatil image 
//-----------------------------------------------------

// function Hero() {
//   const typed = useTypewriter([
//     'machine learning engineer',
//     'data scientist',
//     'nlp researcher',
//     'ml systems builder',
//   ])

//   return (
//     <section
//       id="hero"
//       className="min-h-screen flex flex-col justify-center px-6 pt-14"
//       style={{
//         background:
//           'radial-gradient(ellipse 80% 50% at 60% 30%, var(--accent-alpha-4) 0%, transparent 70%)',
//       }}
//     >
//       <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-16 items-center">
//         <div>
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-6"
//           >
//             &gt; hello world
//           </div>

//           <h1
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.05 }}
//             className="text-[clamp(3rem,9vw,7rem)] font-black text-[var(--text-main)] mb-4"
//           >
//             MEZROUH Iname
//           </h1>

//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[clamp(1rem,2.5vw,1.5rem)] text-[var(--text-muted)] mb-8 h-8 flex items-center gap-2"
//           >
//             <span className="text-[var(--accent)]">$</span>
//             <span>{typed}</span>
//             <span className="inline-block w-0.5 h-5 bg-[var(--accent)] animate-pulse" />
//           </div>

//           <p
//             style={{ fontFamily: 'var(--font-body)', maxWidth: '52ch' }}
//             className="text-[var(--text-dim)] text-base leading-relaxed mb-10"
//           >
//             MS Computer Science @ CMU. I build systems that learn from data — from raw pipelines
//             to production inference. Currently seeking full-time ML engineering roles for 2025.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <a
//               href="#projects"
//               className="px-6 py-3 bg-[var(--accent)] text-[var(--bg-main)] text-sm font-bold tracking-wide hover:bg-white transition-colors duration-150"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               ./projects
//             </a>
//             <a
//               href="#contact"
//               className="px-6 py-3 border border-[var(--border-strong)] text-[var(--text-muted)] text-sm tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150"
//               style={{ fontFamily: 'var(--font-mono)' }}
//             >
//               ./contact
//             </a>
//           </div>
//         </div>

//         {/* Profile Image - Rounded corners with theme color border (same as About section) */}
//         <div className="hidden md:block relative">
//           <div className="relative w-64 h-64 lg:w-80 lg:h-80">
//             {/* Glow effect behind image */}
//             <div 
//               className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
//               style={{
//                 background: 'var(--accent)',
//                 transform: 'scale(1.05)',
//               }}
//             />
            
//             {/* Image container with gradient border */}
//             <div 
//               className="relative w-full h-full rounded-2xl p-1"
//               style={{
//                 background: 'conic-gradient(from 0deg, var(--accent), transparent 30%, var(--accent) 60%, transparent 80%, var(--accent))',
//                 animation: 'spin 10s linear infinite',
//               }}
//             >
//               <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--bg-card)]">
//                 <img
//                   src="images\iname_photo.jpg"
//                   alt="Profile"
//                   className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
//                 />
//               </div>
//             </div>

//             {/* Decorative ring pulse */}
//             <div 
//               className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)] opacity-30 animate-pulse"
//               style={{ transform: 'scale(1.04)' }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div className="max-w-6xl mx-auto w-full mt-16 flex items-center gap-4">
//         <div className="w-8 h-px bg-[var(--accent)]" />
//         <span
//           style={{ fontFamily: 'var(--font-mono)' }}
//           className="text-[10px] text-[var(--text-dim)] tracking-[0.3em] uppercase"
//         >
//           scroll to explore
//         </span>
//       </div>
//     </section>
//   )
// }

// -----------------------  About section ---------------------------------------

// function About() {
//   const { ref, inView } = useInView()

//   return (
//     <section id="about" className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-main)]">
//       <div
//         ref={ref}
//         className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       >
//         <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
//           {/* Left: Section Label */}
//           <div>
//             <div
//               style={{ fontFamily: 'var(--font-mono)' }}
//               className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
//             >
//               01 / about
//             </div>
//             <h2
//               style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
//               className="text-5xl font-black text-[var(--text-main)]"
//             >
//               Who I am
//             </h2>
//           </div>

//           {/* Right: Bio Content */}
//           <div className="space-y-6">
//             <p 
//               style={{ fontFamily: 'var(--font-body)' }} 
//               className="text-[var(--text-muted)] text-lg leading-relaxed"
//             >
//               I'm a second-year MS student at Carnegie Mellon, where I split my time between the
//               NLP Lab and building things that actually ship. Before CMU I studied math and CS at
//               University of Michigan, where I fell down the statistics rabbit hole and never came
//               back up.
//             </p>
//             <p 
//               style={{ fontFamily: 'var(--font-body)' }} 
//               className="text-[var(--text-dim)] leading-relaxed"
//             >
//               My work sits at the intersection of systems and modeling — I care equally about
//               whether a model works and whether it works{' '}
//               <em className="text-[var(--text-muted)]">in production</em>. I've shipped ML systems that handle
//               millions of daily inferences, written papers on cross-lingual transfer, and built open
//               source tools used by hundreds of practitioners.
//             </p>
//             <p 
//               style={{ fontFamily: 'var(--font-body)' }} 
//               className="text-[var(--text-dim)] leading-relaxed"
//             >
//               When I'm not staring at loss curves, I'm playing competitive chess, reading about
//               economic history, or hiking somewhere with unreliable cell service.
//             </p>

//             {/* Info Cards */}
//             <div className="grid grid-cols-2 gap-3 pt-4">
//               {[
//                 ['Location', 'Pittsburgh, PA'],
//                 ['Status', 'Open to offers — Dec 2025'],
//                 ['Focus', 'ML Engineering · LLMs'],
//                 ['Education', 'MS CS @ CMU, 2025'],
//               ].map(([k, v]) => (
//                 <div 
//                   key={k} 
//                   className="border border-[var(--border-light)] px-4 py-3 relative overflow-hidden group bg-[var(--bg-card)] hover:border-[var(--accent-alpha-50)] transition-colors duration-300"
//                 >
//                   <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
//                   <div
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                     className="text-[10px] text-[var(--accent)] tracking-widest uppercase mb-1 relative z-10"
//                   >
//                     {k}
//                   </div>
//                   <div
//                     style={{ fontFamily: 'var(--font-body)' }}
//                     className="text-[var(--text-muted)] text-sm relative z-10"
//                   >
//                     {v}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-alt)]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left: Label + Quote */}
          <div className="md:sticky md:top-28">
            <div
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
            >
              01 / about
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
              className="text-5xl font-black text-[var(--text-main)] mb-6"
            >
              Who I am
            </h2>
            <blockquote className="border-l-2 border-[var(--accent)] pl-6 py-2">
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-[var(--text-muted)] text-lg italic leading-relaxed"
              >
                "Building systems that learn from data — from raw pipelines to production inference."
              </p>
            </blockquote>
          </div>

          {/* Right: Bio Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p 
                style={{ fontFamily: 'var(--font-body)' }} 
                className="text-[var(--text-main)] text-lg leading-relaxed font-medium"
              >
                I'm a fourth-year AI Engineering student at ENSIA, where I'm building my foundation in artificial intelligence, data science, and software engineering — and turning what I learn into projects that actually work.
              </p>
              <p 
                style={{ fontFamily: 'var(--font-body)' }} 
                className="text-[var(--text-dim)] leading-relaxed"
              >
                My journey started with a strong background in mathematics and computer science, and gradually grew into a deeper interest in data, machine learning, and intelligent systems. I enjoy exploring the full path from data and models to real applications, whether that's analyzing data, training ML models, or building the software around them.
                <em className="text-[var(--text-muted)]">in production</em>.
              </p>
              <p 
                style={{ fontFamily: 'var(--font-body)' }} 
                className="text-[var(--text-dim)] leading-relaxed"
              >
                I'm currently focused on growing as a Data Scientist and AI Engineer, while continuously improving my skills through academic work, personal projects, internships, and hands-on experimentation.
                    </p>
              <p 
                style={{ fontFamily: 'var(--font-body)' }} 
                className="text-[var(--text-dim)] leading-relaxed"
              >
           When I'm not working with data or code, I'm usually learning something new, working on a side project, exploring new technologies, or simply taking some time to recharge.
              </p>
            </div>

            {/* Info Cards - Horizontal */}
            {/* <div className="flex flex-wrap gap-4 pt-4">
              {[
                ['📍', 'Pittsburgh, PA'],
                ['🎯', 'ML Engineering · LLMs'],
                ['🎓', 'MS CS @ CMU, 2025'],
                ['💼', 'Open to offers — Dec 2025'],
              ].map(([icon, text]) => (
                <div 
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--border-light)] bg-[var(--bg-card)] hover:border-[var(--accent-alpha-50)] transition-colors duration-300"
                >
                  <span className="text-[var(--accent)]">{icon}</span>
                  <span
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-[var(--text-muted)] text-sm"
                  >
                    {text}
                  </span>
                </div>
              ))} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills({ skills }: { skills: SkillsData }) {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-main)]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-end justify-between mb-16">
          <div>
            <div
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
            >
              02 / skills
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
              className="text-5xl font-black text-[var(--text-main)]"
            >
              Tech stack
            </h2>
          </div>
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className="hidden md:block text-xs text-[var(--text-dim)] tracking-widest"
          >
            {Object.values(skills).flat().length} tools
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className="group bg-[var(--bg-card)] border border-[var(--border-light)] p-6 hover:border-[var(--accent)] hover:shadow-[0_0_30px_var(--accent-alpha-30)] transition-all duration-300 hover:-translate-y-1 rounded-sm"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-base font-bold text-[var(--text-main)] mb-5 transition-colors duration-300"
              >
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s, j) => (
                  <span
                    key={j}
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-xs text-[var(--text-dim)] bg-[var(--border-faint)] px-3 py-1.5 rounded-sm border border-[var(--border-lighter)] group-hover:border-[var(--accent-alpha-30)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent-alpha-4)] transition-colors duration-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



// --- IMPROVED PROJECT CARD COMPONENT ---
function ProjectCard({ p, index }: { p: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <a
        href={p.link || '#'}
        className="block h-full border border-[var(--border-light)] p-6 hover:border-[var(--accent)] transition-colors duration-200 group relative bg-[var(--bg-card)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className={`text-xs tracking-widest transition-colors duration-200 ${
              hovered ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]'
            }`}
          >
            {p.id || '00'}
          </span>
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[10px] text-[var(--text-dim)] tracking-wider"
          >
            {p.year || '2024'}
          </span>
        </div>

        <h3
          style={{ fontFamily: 'var(--font-display)' }}
          className={`text-xl font-bold mb-3 leading-tight transition-colors duration-200 ${
            hovered ? 'text-[var(--accent)]' : 'text-[var(--text-main)]'
          }`}
        >
          {p.title || 'Untitled Project'}
        </h3>

        <p
          style={{ fontFamily: 'var(--font-body)' }}
          className="text-[var(--text-dim)] text-sm leading-relaxed mb-5"
        >
          {p.description || 'No description available.'}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags && p.tags.length > 0 ? (
            p.tags.map((t) => (
              <Tag key={t} label={t} />
            ))
          ) : (
            <Tag label="No tags" />
          )}
        </div>

        {/* Metric */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className={`text-sm font-bold transition-colors duration-200 ${
              hovered ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
            }`}
          >
            {p.metric || 'N/A'}
          </span>
          <span
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-xs text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors"
          >
            view →
          </span>
        </div>
      </a>
    </div>
  )
}

// --- IMPROVED PROJECTS SECTION COMPONENT ---
function Projects({ projects }: { projects: Project[] }) {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="py-28 px-6 bg-[var(--bg-main)] relative overflow-hidden">
      {/* Subtle ambient glow in background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[var(--accent)] text-[11px] tracking-[0.3em] uppercase mb-4"
            >
              03 / projects
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
              className="text-4xl md:text-5xl font-black text-[var(--text-main)]"
            >
              Selected work
            </h2>
          </div>
          <a
            href="https://github.com/iname-mezrouh"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)' }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm text-[var(--text-dim)] tracking-wider hover:text-[var(--accent)] transition-colors uppercase"
          >
            View all on GitHub
            <span className="text-lg">↗</span>
          </a>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter((project) => project.visible !== false).map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}



function Experience() {
  const { ref, inView } = useInView()

  return (
    <section
      id="experience"
      className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-alt)]"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-16">
          <div
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
          >
            04 / experience & education
          </div>
          <h2
            style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
            className="text-5xl font-black text-[var(--text-main)]"
          >
            Experience & Education
          </h2>
        </div>

        <div className="space-y-0">
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[220px_1fr] gap-8 py-10 border-t border-[var(--border-light)]"
            >
              <div>
                <div
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="text-[10px] text-[var(--accent)] tracking-widest uppercase mb-2"
                >
                  {e.period}
                </div>
                <div
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-lg font-bold text-[var(--text-main)] leading-tight"
                >
                  {e.company}
                </div>
              </div>

              <div>
                <div
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-[var(--text-muted)] font-semibold mb-4"
                >
                  {e.role}
                </div>
                <ul className="space-y-2">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <span className="text-[var(--accent)] mt-1 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                        —
                      </span>
                      <span
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="text-[var(--text-dim)] text-sm leading-relaxed"
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------ certafication section --------------------------------


// function Certifications() {
//   const { ref, inView } = useInView()

//   return (
//     <section
//       id="certifications"
//       className="py-28 px-6 border-t border-[rgba(255,255,255,0.06)]"
//     >
//       <div
//         ref={ref}
//         className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       >
//         <div className="mb-16">
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[#00e5ff] text-xs tracking-[0.3em] uppercase mb-4"
//           >
//             05 / certifications
//           </div>
//           <h2
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
//             className="text-5xl font-black text-[#e8eaed]"
//           >
//             Certifications
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           {CERTIFICATIONS.map((cert, index) => (
//             <a
//               key={index}
//               href={cert.link}
//               target="_blank"
//               rel="noreferrer"
//               className="group block border border-[rgba(255,255,255,0.07)] p-6 hover:border-[#00e5ff] transition-all duration-300 hover:bg-[#00e5ff]/5"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="text-[#00e5ff] text-lg">📜</span>
//                     <h3
//                       style={{ fontFamily: 'var(--font-display)' }}
//                       className="text-lg font-bold text-[#e8eaed] group-hover:text-[#00e5ff] transition-colors"
//                     >
//                       {cert.name}
//                     </h3>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-4 text-sm">
//                     <span
//                       style={{ fontFamily: 'var(--font-mono)' }}
//                       className="text-[#6b7280]"
//                     >
//                       {cert.issuer}
//                     </span>
//                     <span className="text-[#3d4147]">•</span>
//                     <span
//                       style={{ fontFamily: 'var(--font-mono)' }}
//                       className="text-[#6b7280] text-xs tracking-wider"
//                     >
//                       {cert.date}
//                     </span>
//                     {cert.credentialId && (
//                       <>
//                         <span className="text-[#3d4147]">•</span>
//                         <span
//                           style={{ fontFamily: 'var(--font-mono)' }}
//                           className="text-[#3d4147] text-[10px] tracking-wider"
//                         >
//                           ID: {cert.credentialId}
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 <span className="text-[#6b7280] group-hover:text-[#00e5ff] transition-colors text-xs ml-4">
//                   ↗
//                 </span>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


// function Certifications() {
//   const { ref, inView } = useInView()

//   return (
//     <section
//       id="certifications"
//       className="py-28 px-6 border-t border-[rgba(255,255,255,0.06)]"
//     >
//       <div
//         ref={ref}
//         className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       >
//         <div className="mb-16">
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[#00e5ff] text-xs tracking-[0.3em] uppercase mb-4"
//           >
//             05 / certifications
//           </div>
//           <h2
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
//             className="text-5xl font-black text-[#e8eaed]"
//           >
//             Credentials
//           </h2>
//         </div>

//         <div className="space-y-0">
//           {CERTIFICATIONS.map((cert, index) => (
//             <div
//               key={index}
//               className="grid md:grid-cols-[180px_1fr_auto] gap-6 py-6 border-t border-[rgba(255,255,255,0.06)] items-center group hover:bg-[#00e5ff]/[0.02] transition-colors px-4 -mx-4"
//             >
//               <div
//                 style={{ fontFamily: 'var(--font-mono)' }}
//                 className="text-[10px] text-[#00e5ff] tracking-widest uppercase"
//               >
//                 {cert.date}
//               </div>
//               <div>
//                 <div
//                   style={{ fontFamily: 'var(--font-display)' }}
//                   className="text-[#e8eaed] font-bold group-hover:text-[#00e5ff] transition-colors"
//                 >
//                   {cert.name}
//                 </div>
//                 <div
//                   style={{ fontFamily: 'var(--font-body)' }}
//                   className="text-[#6b7280] text-sm"
//                 >
//                   {cert.issuer}
//                 </div>
//               </div>
//               <a
//                 href={cert.link}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-[#3d4147] hover:text-[#00e5ff] transition-colors text-sm"
//               >
//                 verify →
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function Certifications() {
//   const { ref, inView } = useInView()
//   const [flipped, setFlipped] = useState<number | null>(null)

//   const getIcon = (name: string) => {
//     if (name.includes('AWS')) return '☁️'
//     if (name.includes('Google') || name.includes('GCP')) return '🔵'
//     if (name.includes('TensorFlow')) return '🧠'
//     if (name.includes('Deep Learning')) return '🤖'
//     if (name.includes('Data')) return '📊'
//     return '📜'
//   }

//   return (
//     <section
//       id="certifications"
//       className="py-28 px-6 border-t border-[rgba(255,255,255,0.06)] bg-[#02050c]"
//     >
//       <div
//         ref={ref}
//         className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       >
//         <div className="mb-16">
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[#00e5ff] text-xs tracking-[0.3em] uppercase mb-4"
//           >
//             05 / certifications
//           </div>
//           <h2
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
//             className="text-5xl font-black text-[#e8eaed]"
//           >
//             Certifications
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {CERTIFICATIONS.map((cert, index) => (
//             <div
//               key={index}
//               className="relative group perspective-1000"
//               onMouseEnter={() => setFlipped(index)}
//               onMouseLeave={() => setFlipped(null)}
//             >
//               <div
//                 className={`transition-all duration-500 transform-style-3d ${
//                   flipped === index ? 'rotate-y-180' : ''
//                 }`}
//               >
//                 {/* Front */}
//                 <div className="border border-[rgba(255,255,255,0.07)] p-6 bg-[#040a18] hover:border-[#00e5ff] transition-colors">
//                   <div className="text-4xl mb-4">{getIcon(cert.name)}</div>
//                   <h3
//                     style={{ fontFamily: 'var(--font-display)' }}
//                     className="text-[#e8eaed] font-bold text-base mb-2"
//                   >
//                     {cert.name}
//                   </h3>
//                   <p
//                     style={{ fontFamily: 'var(--font-body)' }}
//                     className="text-[#6b7280] text-sm"
//                   >
//                     {cert.issuer}
//                   </p>
//                   <div className="mt-4 flex items-center justify-between">
//                     <span
//                       style={{ fontFamily: 'var(--font-mono)' }}
//                       className="text-[#3d4147] text-xs tracking-wider"
//                     >
//                       {cert.date}
//                     </span>
//                     <span className="text-[#6b7280] text-xs group-hover:text-[#00e5ff] transition-colors">
//                       hover to verify →
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Back (flip side) */}
//                 <div className="absolute inset-0 border border-[#00e5ff] p-6 bg-[#040a18] rotate-y-180 backface-hidden flex flex-col items-center justify-center text-center">
//                   <div className="text-[#00e5ff] text-3xl mb-3">✓</div>
//                   <p
//                     style={{ fontFamily: 'var(--font-body)' }}
//                     className="text-[#9ca3af] text-sm mb-4"
//                   >
//                     Verify this certification
//                   </p>
//                   <a
//                     href={cert.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="px-4 py-2 border border-[#00e5ff] text-[#00e5ff] text-xs hover:bg-[#00e5ff] hover:text-[#040a18] transition-colors"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     Verify →
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function Certifications() {
//   const { ref, inView } = useInView()
//   const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null)

//   const getIcon = (name: string) => {
//     if (name.includes('AWS')) return '☁️'
//     if (name.includes('Google') || name.includes('GCP')) return '🔵'
//     if (name.includes('TensorFlow')) return '🧠'
//     if (name.includes('Deep Learning')) return '🤖'
//     if (name.includes('Data')) return '📊'
//     return '📜'
//   }

//   const getColor = (issuer: string) => {
//     if (issuer.includes('AWS')) return 'border-[#ff9900] text-[#ff9900]'
//     if (issuer.includes('Google')) return 'border-[#4285f4] text-[#4285f4]'
//     if (issuer.includes('TensorFlow')) return 'border-[#ff6f00] text-[#ff6f00]'
//     if (issuer.includes('deeplearning')) return 'border-[#00bcd4] text-[#00bcd4]'
//     return 'border-[#00e5ff] text-[#00e5ff]'
//   }

//   return (
//     <section
//       id="certifications"
//       className="py-28 px-6 border-t border-[rgba(255,255,255,0.06)]"
//       style={{
//         background: 'radial-gradient(ellipse 60% 60% at 60% 100%, rgba(0,229,255,0.03) 0%, transparent 70%)',
//       }}
//     >
//       <div
//         ref={ref}
//         className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       >
//         <div className="mb-16 text-center">
//           <div
//             style={{ fontFamily: 'var(--font-mono)' }}
//             className="text-[#00e5ff] text-xs tracking-[0.3em] uppercase mb-4"
//           >
//             05 / certifications
//           </div>
//           <h2
//             style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
//             className="text-5xl font-black text-[#e8eaed]"
//           >
//             Professional Badges
//           </h2>
//           <p
//             style={{ fontFamily: 'var(--font-body)' }}
//             className="text-[#6b7280] mt-4 max-w-2xl mx-auto"
//           >
//             Click any certification to view the credential.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {CERTIFICATIONS.map((cert, index) => (
//             <div
//               key={index}
//               className="group cursor-pointer"
//               onClick={() => setSelectedCert(cert)}
//             >
//               <div
//                 className={`border-2 p-6 transition-all duration-300 ${
//                   getColor(cert.issuer)
//                 } hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] bg-[#040a18] h-full flex flex-col items-center text-center`}
//               >
//                 <span className="text-4xl mb-3">{getIcon(cert.name)}</span>
//                 <span
//                   style={{ fontFamily: 'var(--font-body)' }}
//                   className="font-semibold text-sm text-[#e8eaed] mb-2"
//                 >
//                   {cert.name}
//                 </span>
//                 <span
//                   style={{ fontFamily: 'var(--font-mono)' }}
//                   className="text-[#6b7280] text-[10px] tracking-wider"
//                 >
//                   {cert.issuer} · {cert.date}
//                 </span>
//                 <div className="mt-4 text-[#00e5ff] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
//                   Click to view →
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedCert && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
//           onClick={() => setSelectedCert(null)}
//         >
//           <div
//             className="bg-[#040a18] border-2 border-[#00e5ff] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(0,229,255,0.15)]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
//               <div>
//                 <div
//                   style={{ fontFamily: 'var(--font-mono)' }}
//                   className="text-[#00e5ff] text-xs tracking-wider"
//                 >
//                   {selectedCert.issuer}
//                 </div>
//                 <h3
//                   style={{ fontFamily: 'var(--font-display)' }}
//                   className="text-xl font-bold text-[#e8eaed]"
//                 >
//                   {selectedCert.name}
//                 </h3>
//               </div>
//               <button
//                 onClick={() => setSelectedCert(null)}
//                 className="text-[#6b7280] hover:text-[#00e5ff] transition-colors text-2xl"
//               >
//                 ✕
//               </button>
//             </div>
            
//             <div className="p-6">
//               <img
//                 src={selectedCert.image}
//                 alt={selectedCert.name}
//                 className="w-full h-auto object-contain max-h-[50vh] rounded"
//                 onError={(e) => {
//                   e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23040a18"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="monospace" font-size="16"%3E🔍 Certificate Image%3C/text%3E%3C/svg%3E'
//                 }}
//               />
              
//               <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
//                 <div>
//                   <span
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                     className="text-[#6b7280] text-xs tracking-wider block"
//                   >
//                     Credential ID
//                   </span>
//                   <span
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                     className="text-[#9ca3af] text-sm"
//                   >
//                     {selectedCert.credentialId || 'N/A'}
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <a
//                     href={selectedCert.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="px-6 py-2 bg-[#00e5ff] text-[#040a18] text-sm font-bold hover:bg-white transition-colors"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     Verify →
//                   </a>
//                   <button
//                     onClick={() => setSelectedCert(null)}
//                     className="px-6 py-2 border border-[rgba(255,255,255,0.15)] text-[#9ca3af] text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
//                     style={{ fontFamily: 'var(--font-mono)' }}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   )
// }
function Certifications({ certifications }: { certifications: Certification[] }) {
  const { ref, inView } = useInView()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const totalCerts = certifications.length

  useEffect(() => {
    if (currentIndex >= totalCerts) setCurrentIndex(Math.max(0, totalCerts - 1))
  }, [currentIndex, totalCerts])

  if (!totalCerts) {
    return (
      <section id="certifications" className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-main)]">
        <div className="max-w-6xl mx-auto"><div style={{ fontFamily: 'var(--font-mono)' }} className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4">05 / certifications</div><h2 style={{ fontFamily: 'var(--font-display)' }} className="text-5xl font-black text-[var(--text-main)]">Professional Badges</h2><p className="mt-6 text-[var(--text-dim)]">No certifications published yet.</p></div>
      </section>
    )
  }

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? totalCerts - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === totalCerts - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const openModal = (cert: Certification) => {
    setSelectedCert(cert)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isTransitioning])

  // Get the indices for the three visible items: previous, current, next
  const getVisibleIndices = () => {
    const prev = currentIndex === 0 ? totalCerts - 1 : currentIndex - 1
    const next = currentIndex === totalCerts - 1 ? 0 : currentIndex + 1
    return { prev, current: currentIndex, next }
  }

  const { prev, current, next } = getVisibleIndices()

  return (
    <section
      id="certifications"
      className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-main)]"
      style={{
        background: 'radial-gradient(ellipse 60% 60% at 60% 100%, var(--accent-alpha-4) 0%, transparent 70%)',
      }}
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-16">
          <div
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
          >
            05 / certifications
          </div>
          <h2
            style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}
            className="text-5xl font-black text-[var(--text-main)]"
          >
            Professional Badges
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Carousel Track */}
          <div className="relative overflow-hidden px-4 md:px-12">
            <div className="flex items-center justify-center min-h-[400px] md:min-h-[500px]">
              {/* Previous Card (peeking from left) */}
              <div 
                className="absolute left-0 md:left-8 w-[160px] md:w-[280px] opacity-40 scale-90 cursor-pointer transition-all duration-500 hover:opacity-60 hover:scale-95"
                onClick={goToPrevious}
                style={{
                  transform: 'translateX(-30%) scale(0.85)',
                  zIndex: 1,
                  pointerEvents: 'auto',
                }}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[var(--border-light)] bg-[var(--bg-card)]">
                  <img
                    src={certifications[prev].image}
                    alt={certifications[prev].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23040a18"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="monospace" font-size="16"%3E📜 Certificate%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--bg-main)] to-transparent p-4">
                    <p className="text-[var(--text-dim)] text-xs truncate">{certifications[prev].name}</p>
                  </div>
                </div>
              </div>

              {/* Current Card (centered, large, hovered) */}
              <div 
                className="relative z-10 cursor-pointer transition-all duration-500"
                style={{
                  transform: 'scale(1) translateX(0)',
                  width: '100%',
                  maxWidth: '500px',
                }}
                onClick={() => openModal(certifications[current])}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[var(--accent)] shadow-[0_0_60px_var(--accent-alpha-30)] bg-[var(--bg-card)]">
                  <img
                    src={certifications[current].image}
                    alt={certifications[current].name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23040a18"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2300e5ff" font-family="monospace" font-size="16"%3E📜 %3C/text%3E%3C/svg%3E'
                    }}
                  />
                  
                  {/* Hover overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-[var(--text-main)] font-bold text-lg">{certifications[current].name}</h3>
                      <p className="text-[var(--text-muted)] text-sm">{certifications[current].issuer}</p>
                      <span className="inline-block mt-2 text-[var(--accent)] text-xs">Click to view details →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Card (peeking from right) */}
              <div 
                className="absolute right-0 md:right-8 w-[160px] md:w-[280px] opacity-40 scale-90 cursor-pointer transition-all duration-500 hover:opacity-60 hover:scale-95"
                onClick={goToNext}
                style={{
                  transform: 'translateX(30%) scale(0.85)',
                  zIndex: 1,
                  pointerEvents: 'auto',
                }}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[var(--border-light)] bg-[var(--bg-card)]">
                  <img
                    src={certifications[next].image}
                    alt={certifications[next].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23040a18"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="monospace" font-size="16"%3E📜 Certificate%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--bg-main)] to-transparent p-4">
                    <p className="text-[var(--text-dim)] text-xs truncate">{certifications[next].name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all p-3 rounded-full shadow-lg"
            aria-label="Previous certification"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--bg-card)] border border-[var(--border-light)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all p-3 rounded-full shadow-lg"
            aria-label="Next certification"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-[var(--accent)]'
                    : 'w-2 h-2 bg-[var(--border-light)] hover:bg-[var(--text-dim)]'
                }`}
                aria-label={`Go to certification ${index + 1}`}
              />
            ))}
          </div>

          {/* Current Index Counter */}
          <div className="text-center mt-4">
            <span
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-[10px] text-[var(--text-faint)] tracking-widest"
            >
              {currentIndex + 1} / {totalCerts}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-[var(--bg-card)] border-2 border-[var(--accent)] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_var(--accent-alpha-30)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between">
              <div>
                <div
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="text-[var(--accent)] text-xs tracking-wider"
                >
                  {selectedCert.issuer}
                </div>
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-xl font-bold text-[var(--text-main)]"
                >
                  {selectedCert.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <img
                src={selectedCert.image}
                alt={selectedCert.name}
                className="w-full h-auto object-contain max-h-[50vh] rounded"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23040a18"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="monospace" font-size="16"%3E🔍 Certificate Image%3C/text%3E%3C/svg%3E'
                }}
              />
              
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-[var(--text-dim)] text-xs tracking-wider block"
                  >
                    Credential ID
                  </span>
                  <span
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-[var(--text-muted)] text-sm"
                  >
                    {selectedCert.credentialId || 'N/A'}
                  </span>
                </div>
                <div className="flex gap-3">
                  {/* <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2 bg-[var(--accent)] text-[var(--bg-main)] text-sm font-bold hover:bg-white transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Verify →
                  </a> */}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-6 py-2 border border-[var(--border-light)] text-[var(--text-muted)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


function Contact() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('mezrouhiname@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyPhone = () => {
    navigator.clipboard.writeText('+123782270603')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="py-28 px-6 border-t border-[var(--border-light)] bg-[var(--bg-main)]"
      style={{
        background: 'radial-gradient(ellipse 60% 60% at 40% 100%, var(--accent-alpha-5) 0%, transparent 70%)',
      }}
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="mb-4">
          <div
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4"
          >
            06 / contact
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: 'var(--font-display)', lineHeight: 1.05 }}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-[var(--text-main)] mb-6"
            >
              Let's connect
            </h2>
            <p
              style={{ fontFamily: 'var(--font-body)', maxWidth: '48ch' }}
              className="text-[var(--text-dim)] text-base leading-relaxed mb-6"
            >
              I'm always open to collaborating on exciting ML projects, research opportunities, 
              or just having a conversation about AI and data science. Feel free to reach out!
            </p>
            
            {/* Quick Response Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <span className="text-[var(--accent)]"></span>
                <span>Response within 24h</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <span className="text-[var(--accent)]"></span>
                <span>Open to remote & on-site</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 min-w-[280px]">
            {/* Email */}
            <button
              onClick={copyEmail}
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-left px-6 py-4 border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-sm tracking-wide bg-[var(--bg-card)] group flex items-center justify-between"
            >
              <span>{copied ? '✓ copied!' : 'mezrouhiname@gmail.com'}</span>
              <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">
                {copied ? '✓' : '↗'}
              </span>
            </button>

            {/* Phone */}
            <button
              onClick={copyPhone}
              style={{ fontFamily: 'var(--font-mono)' }}
              className="text-left px-6 py-4 border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-sm tracking-wide bg-[var(--bg-card)] group flex items-center justify-between"
            >
              <span> +123 782270603 </span>
              <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">
                copy
              </span>
            </button>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mezrouh-iname-518335324/"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: 'var(--font-mono)' }}
              className="px-6 py-4 border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-sm tracking-wide text-center bg-[var(--bg-card)] group flex items-center justify-between"
            >
              <span>LinkedIn</span>
              <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">↗</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/iname-mezrouh"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: 'var(--font-mono)' }}
              className="px-6 py-4 border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-sm tracking-wide text-center bg-[var(--bg-card)] group flex items-center justify-between"
            >
              <span>GitHub</span>
              <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">↗</span>
            </a>

            {/* Kaggle */}
            <a
              href="https://www.kaggle.com/inamestudentmezrouh"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: 'var(--font-mono)' }}
              className="px-6 py-4 border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-sm tracking-wide text-center bg-[var(--bg-card)] group flex items-center justify-between"
            >
              <span>Kaggle</span>
              <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="border-t border-[var(--border-light)] px-6 py-6 relative z-10 bg-[var(--bg-main)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span 
          style={{ fontFamily: 'var(--font-mono)' }} 
          className="text-xs text-[var(--text-faint)] tracking-widest"
        >
          © 2026 MEZROUH Iname
        </span>
      </div>
    </footer>
  )
}

function AdminDashboard({
  projects,
  skills,
  certifications,
  onProjectsChange,
  onSkillsChange,
  onCertificationsChange,
  onExit,
}: {
  projects: Project[]
  skills: SkillsData
  certifications: Certification[]
  onProjectsChange: (projects: Project[]) => void
  onSkillsChange: (skills: SkillsData) => void
  onCertificationsChange: (certifications: Certification[]) => void
  onExit: () => void
}) {
  const [section, setSection] = useState<'projects' | 'skills' | 'certifications'>('projects')
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]
  const [draft, setDraft] = useState<Project | null>(selectedProject ?? null)
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(skills)[0] ?? '')
  const [newCategory, setNewCategory] = useState('')
  const [selectedCertName, setSelectedCertName] = useState(certifications[0]?.name ?? '')
  const selectedCertification = certifications.find((cert) => cert.name === selectedCertName) ?? certifications[0]
  const [certDraft, setCertDraft] = useState<Certification | null>(selectedCertification ?? null)

  useEffect(() => {
    setDraft(selectedProject ?? null)
  }, [selectedProjectId, projects])

  useEffect(() => {
    setCertDraft(selectedCertification ?? null)
  }, [selectedCertName, certifications])

  const updateDraft = (field: keyof Project, value: string) => {
    if (draft) setDraft({ ...draft, [field]: value })
  }

  const saveProject = () => {
    if (!draft?.title.trim()) return
    const exists = projects.some((project) => project.id === draft.id)
    onProjectsChange(exists ? projects.map((project) => project.id === draft.id ? draft : project) : [...projects, draft])
    setSelectedProjectId(draft.id)
  }

  const addProject = () => {
    const id = `project-${Date.now()}`
    const newProject: Project = {
      id,
      title: 'New project',
      tags: ['New'],
      description: 'Add a short description for this project.',
      metric: 'In progress',
      year: '2026',
      link: '#',
    }
    onProjectsChange([...projects, newProject])
    setSelectedProjectId(id)
  }

  const deleteProject = () => {
    if (!draft) return
    const remaining = projects.filter((project) => project.id !== draft.id)
    onProjectsChange(remaining)
    setSelectedProjectId(remaining[0]?.id ?? '')
  }

  const toggleProjectVisibility = (projectId: string) => {
    onProjectsChange(projects.map((project) => project.id === projectId ? { ...project, visible: project.visible === false } : project))
  }

  const updateCategoryItems = (value: string) => {
    onSkillsChange({ ...skills, [selectedCategory]: value.split(',').map((item) => item.trim()).filter(Boolean) })
  }

  const addCategory = () => {
    const category = newCategory.trim()
    if (!category || skills[category]) return
    onSkillsChange({ ...skills, [category]: [] })
    setSelectedCategory(category)
    setNewCategory('')
  }

  const deleteCategory = () => {
    const nextSkills = { ...skills }
    delete nextSkills[selectedCategory]
    const nextCategory = Object.keys(nextSkills)[0] ?? ''
    onSkillsChange(nextSkills)
    setSelectedCategory(nextCategory)
  }

  const updateCertDraft = (field: keyof Certification, value: string) => {
    if (certDraft) setCertDraft({ ...certDraft, [field]: value })
  }

  const chooseCertificateImage = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/') || !certDraft) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCertDraft({ ...certDraft, image: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  const saveCertification = () => {
    if (!certDraft?.name.trim()) return
    onCertificationsChange(certifications.map((cert) => cert.name === certDraft.name ? certDraft : cert))
  }

  const addCertification = () => {
    const newCertification: Certification = {
      name: 'New certification',
      issuer: 'Issuer name',
      date: '2026',
      credentialId: '',
      link: '#',
      image: '',
    }
    onCertificationsChange([...certifications, newCertification])
    setSelectedCertName(newCertification.name)
  }

  const deleteCertification = () => {
    if (!certDraft) return
    const remaining = certifications.filter((cert) => cert.name !== certDraft.name)
    onCertificationsChange(remaining)
    setSelectedCertName(remaining[0]?.name ?? '')
  }

  const toggleCertificationVisibility = (name: string) => {
    onCertificationsChange(certifications.map((cert) => cert.name === name ? { ...cert, visible: cert.visible === false } : cert))
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] relative z-10">
      <header className="border-b border-[var(--border-light)] bg-[var(--bg-main-90)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)' }} className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase">Portfolio CMS</div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold">Admin workspace</h1>
          </div>
          <button onClick={onExit} className="border border-[var(--border-strong)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">View portfolio ↗</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside className="border-r border-[var(--border-light)] pr-6">
            <div style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-faint)] mb-4">Manage content</div>
            <div className="space-y-1">
              {(['projects', 'skills', 'certifications'] as const).map((item) => (
                <button key={item} onClick={() => setSection(item)} className={`w-full text-left px-3 py-3 text-sm uppercase tracking-wider transition-colors ${section === item ? 'bg-[var(--accent-alpha-4)] text-[var(--accent)] border-l-2 border-[var(--accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'}`}>
                  {item}
                  <span className="float-right text-xs text-[var(--text-faint)]">{item === 'projects' ? projects.length : item === 'skills' ? Object.keys(skills).length : certifications.length}</span>
                </button>
              ))}
            </div>
          </aside>

          <section>
            {section === 'projects' ? (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <div><div style={{ fontFamily: 'var(--font-mono)' }} className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-2">Content / projects</div><h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black">Project library</h2></div>
                  <button onClick={addProject} className="bg-[var(--accent)] text-[var(--bg-main)] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">+ New project</button>
                </div>
                <div className="grid xl:grid-cols-[280px_1fr] gap-6">
                  <div className="border border-[var(--border-light)] divide-y divide-[var(--border-light)] max-h-[560px] overflow-y-auto">
                    {projects.map((project) => <div key={project.id} className={`w-full flex items-center transition-colors ${selectedProjectId === project.id ? 'bg-[var(--accent-alpha-4)]' : 'hover:bg-[var(--border-faint)]'}`}><button onClick={() => setSelectedProjectId(project.id)} className="flex-1 text-left p-4"><span style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] text-[var(--accent)] block mb-1">{project.year}</span><span className={`text-sm font-semibold ${project.visible === false ? 'text-[var(--text-faint)] line-through' : 'text-[var(--text-main)]'}`}>{project.title}</span></button><button onClick={() => toggleProjectVisibility(project.id)} title={project.visible === false ? 'Show project in portfolio' : 'Hide project from portfolio'} aria-label={project.visible === false ? 'Show project in portfolio' : 'Hide project from portfolio'} className={`p-4 transition-colors ${project.visible === false ? 'text-[var(--text-faint)] hover:text-[var(--accent)]' : 'text-[var(--accent)] hover:text-white'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={project.visible === false ? 'M3 3l18 18M10.6 10.6a2 2 0 1 0 2.8 2.8M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.5 4.2 9.5 8a10.8 10.8 0 0 1-2.2 4.1M6.2 6.2C4.5 7.4 3.4 9.2 2.5 12c.5 2 1.6 3.7 3.2 5.1' : 'M2.5 12s3.5-8 9.5-8 9.5 8 9.5 8-3.5 8-9.5 8-9.5-8-9.5-8Z'} /><circle cx="12" cy="12" r="2.5" /></svg></button></div>)}
                  </div>
                  {draft && <div className="border border-[var(--border-light)] p-6 bg-[var(--bg-card)]">
                    <div className="flex items-center justify-between mb-6"><div style={{ fontFamily: 'var(--font-mono)' }} className="text-xs uppercase tracking-wider text-[var(--text-dim)]">Edit project</div><button onClick={deleteProject} className="text-xs uppercase tracking-wider text-red-300 hover:text-red-200">Delete</button></div>
                    <div className="grid md:grid-cols-2 gap-5">
                      {([['title', 'Title'], ['year', 'Year'], ['metric', 'Metric'], ['link', 'Project URL']] as const).map(([field, label]) => <label key={field} className="block"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">{label}</span><input value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)} className="w-full bg-[var(--bg-main)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]" /></label>)}
                      <label className="block md:col-span-2"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">Description</span><textarea value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} rows={4} className="w-full bg-[var(--bg-main)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)] resize-y" /></label>
                      <label className="block md:col-span-2"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">Tags <span className="normal-case text-[var(--text-faint)]">comma separated</span></span><input value={draft.tags.join(', ')} onChange={(event) => setDraft({ ...draft, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} className="w-full bg-[var(--bg-main)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]" /></label>
                    </div>
                    <button onClick={saveProject} className="mt-6 bg-[var(--accent)] text-[var(--bg-main)] px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">Save changes</button>
                  </div>}
                </div>
              </div>
            ) : section === 'skills' ? (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6"><div><div style={{ fontFamily: 'var(--font-mono)' }} className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-2">Content / skills</div><h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black">Skill taxonomy</h2></div></div>
                <div className="grid xl:grid-cols-[280px_1fr] gap-6">
                  <div className="border border-[var(--border-light)] divide-y divide-[var(--border-light)]">{Object.keys(skills).map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`w-full text-left p-4 text-sm transition-colors ${selectedCategory === category ? 'bg-[var(--accent-alpha-4)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>{category}<span className="float-right text-xs text-[var(--text-faint)]">{skills[category].length}</span></button>)}</div>
                  <div className="border border-[var(--border-light)] p-6 bg-[var(--bg-card)]"><div style={{ fontFamily: 'var(--font-mono)' }} className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-4">{selectedCategory || 'No category selected'}</div><label className="block"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">Skills <span className="normal-case text-[var(--text-faint)]">comma separated</span></span><textarea value={(skills[selectedCategory] ?? []).join(', ')} onChange={(event) => updateCategoryItems(event.target.value)} rows={6} className="w-full bg-[var(--bg-main)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)] resize-y" /></label><button onClick={deleteCategory} disabled={!selectedCategory} className="mt-6 text-xs uppercase tracking-wider text-red-300 hover:text-red-200 disabled:opacity-40">Delete category</button></div>
                </div>
                <div className="mt-6 flex gap-3"><input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="New category name" className="bg-[var(--bg-card)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]" /><button onClick={addCategory} className="border border-[var(--accent)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-main)] transition-colors">Add category</button></div>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6"><div><div style={{ fontFamily: 'var(--font-mono)' }} className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase mb-2">Content / certifications</div><h2 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black">Certification library</h2></div><button onClick={addCertification} className="bg-[var(--accent)] text-[var(--bg-main)] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">+ New certificate</button></div>
                <div className="grid xl:grid-cols-[280px_1fr] gap-6">
                  <div className="border border-[var(--border-light)] divide-y divide-[var(--border-light)] max-h-[560px] overflow-y-auto">{certifications.map((cert) => <div key={cert.name} className={`flex items-center transition-colors ${selectedCertName === cert.name ? 'bg-[var(--accent-alpha-4)]' : 'hover:bg-[var(--border-faint)]'}`}><button onClick={() => setSelectedCertName(cert.name)} className="flex-1 text-left p-4"><span style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] text-[var(--accent)] block mb-1">{cert.date}</span><span className={`text-sm font-semibold ${cert.visible === false ? 'text-[var(--text-faint)] line-through' : 'text-[var(--text-main)]'}`}>{cert.name}</span></button><button onClick={() => toggleCertificationVisibility(cert.name)} title={cert.visible === false ? 'Show certificate in portfolio' : 'Hide certificate from portfolio'} aria-label={cert.visible === false ? 'Show certificate in portfolio' : 'Hide certificate from portfolio'} className={`p-4 ${cert.visible === false ? 'text-[var(--text-faint)] hover:text-[var(--accent)]' : 'text-[var(--accent)] hover:text-white'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={1.8} strokeLinecap="round" d={cert.visible === false ? 'M3 3l18 18M10.6 10.6a2 2 0 1 0 2.8 2.8M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.5 4.2 9.5 8a10.8 10.8 0 0 1-2.2 4.1M6.2 6.2C4.5 7.4 3.4 9.2 2.5 12c.5 2 1.6 3.7 3.2 5.1' : 'M2.5 12s3.5-8 9.5-8 9.5 8 9.5 8-3.5 8-9.5 8-9.5-8-9.5-8Z'} /><circle cx="12" cy="12" r="2.5" /></svg></button></div>)}</div>
                  {certDraft && <div className="border border-[var(--border-light)] p-6 bg-[var(--bg-card)]"><div className="flex items-center justify-between mb-6"><div style={{ fontFamily: 'var(--font-mono)' }} className="text-xs uppercase tracking-wider text-[var(--text-dim)]">Edit certificate</div><button onClick={deleteCertification} className="text-xs uppercase tracking-wider text-red-300 hover:text-red-200">Delete</button></div><div className="grid md:grid-cols-2 gap-5">{([['name', 'Name'], ['issuer', 'Issuer'], ['date', 'Date'], ['credentialId', 'Credential ID'], ['link', 'Verification URL']] as const).map(([field, label]) => <label key={field} className="block"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">{label}</span><input value={certDraft[field]} onChange={(event) => updateCertDraft(field, event.target.value)} className="w-full bg-[var(--bg-main)] border border-[var(--border-light)] px-3 py-2 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent)]" /></label>)}<div className="md:col-span-2"><span className="text-xs uppercase tracking-wider text-[var(--text-dim)] block mb-2">Certificate image</span><div className="flex flex-wrap items-center gap-4"><label className="inline-flex cursor-pointer items-center gap-2 border border-[var(--accent)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-main)] transition-colors"><span>Choose image</span><input type="file" accept="image/*" onChange={(event) => chooseCertificateImage(event.target.files?.[0])} className="sr-only" /></label>{certDraft.image && <img src={certDraft.image} alt="Selected certificate preview" className="h-16 w-24 object-cover border border-[var(--border-light)]" />}<span className="text-xs text-[var(--text-faint)]">PNG, JPG, WEBP</span></div></div></div><button onClick={saveCertification} className="mt-6 bg-[var(--accent)] text-[var(--bg-main)] px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">Save changes</button></div>}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [theme, setTheme] = useState('dark')
  const [isAdmin, setIsAdmin] = useState(() => window.location.pathname === '/admin')
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('portfolio-projects') ?? 'null') ?? PROJECTS
    } catch {
      return PROJECTS
    }
  })
  const [skills, setSkills] = useState<SkillsData>(() => {
    try {
      return JSON.parse(localStorage.getItem('portfolio-skills') ?? 'null') ?? SKILLS
    } catch {
      return SKILLS
    }
  })
  const [certifications, setCertifications] = useState<Certification[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('portfolio-certifications') ?? 'null') ?? CERTIFICATIONS
    } catch {
      return CERTIFICATIONS
    }
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('portfolio-skills', JSON.stringify(skills))
  }, [skills])

  useEffect(() => {
    localStorage.setItem('portfolio-certifications', JSON.stringify(certifications))
  }, [certifications])

  useEffect(() => {
    const handleLocationChange = () => setIsAdmin(window.location.pathname === '/admin')
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])
  
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  if (isAdmin) {
    return (
      <>
        <ParticlesBackground />
        <AdminDashboard
          projects={projects}
          skills={skills}
          certifications={certifications}
          onProjectsChange={setProjects}
          onSkillsChange={setSkills}
          onCertificationsChange={setCertifications}
          onExit={() => {
            window.history.pushState({}, '', '/')
            setIsAdmin(false)
          }}
        />
      </>
    )
  }

  return (
    <div className="bg-[var(--bg-main)] min-h-screen relative text-[var(--text-main)] transition-colors duration-300">
      <ParticlesBackground />
      <Nav active={activeSection} toggleTheme={toggleTheme} theme={theme} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience />
        <Certifications certifications={certifications.filter((certification) => certification.visible !== false)} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
