import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [activeDemo, setActiveDemo] = useState(null)

  const transitions = [
    {
      id: 1,
      name: "Morphing Blob",
      description: "Organic blob shapes that morph and flow like liquid mercury. Perfect for hero sections and creative portfolios.",
      demo: "blob"
    },
    {
      id: 2,
      name: "Wave Distortion",
      description: "SVG-based wave animations with displacement filters creating a realistic water ripple effect on hover.",
      demo: "wave"
    },
    {
      id: 3,
      name: "Liquid Button",
      description: "Button fills with liquid-like animation using clip-path and elastic easing for premium interaction feel.",
      demo: "button"
    },
    {
      id: 4,
      name: "Gooey Effect",
      description: "SVG filters create cohesive liquid blobs that merge and separate smoothly using blur and contrast.",
      demo: "gooey"
    },
    {
      id: 5,
      name: "Magnetic Pull",
      description: "Cards that deform and stretch towards cursor with smooth spring physics, creating magnetic liquid feel.",
      demo: "magnetic"
    },
    {
      id: 6,
      name: "Viscous Scroll",
      description: "Smooth scroll with velocity-based elastic trailing effect that mimics thick liquid resistance.",
      demo: "scroll"
    },
    {
      id: 7,
      name: "Drip Loader",
      description: "Loading animation simulating liquid dripping with realistic drop formation and surface tension.",
      demo: "drip"
    },
    {
      id: 8,
      name: "Liquid Text",
      description: "Text that reveals through a liquid wipe transition with customizable flow direction and speed.",
      demo: "text"
    }
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Premium Liquid Transitions - Interactive Showcase</title>
        <meta name="description" content="Top-class liquid transition effects with live demos and code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Premium <span className={styles.gradient}>Liquid Transitions</span>
          </h1>
          <p className={styles.subtitle}>
            Elevate your website with these stunning fluid animations
          </p>
        </header>

        <div className={styles.grid}>
          {transitions.map((transition) => (
            <TransitionCard
              key={transition.id}
              transition={transition}
              isActive={activeDemo === transition.demo}
              onClick={() => setActiveDemo(activeDemo === transition.demo ? null : transition.demo)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function TransitionCard({ transition, isActive, onClick }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{transition.name}</h2>
        <p className={styles.description}>{transition.description}</p>
      </div>

      <div className={styles.demoContainer}>
        <DemoComponent type={transition.demo} />
      </div>

      <button
        className={styles.codeButton}
        onClick={onClick}
      >
        {isActive ? 'Hide Code' : 'View Code'}
      </button>

      {isActive && (
        <div className={styles.codeBlock}>
          <CodeBlock type={transition.demo} />
        </div>
      )}
    </div>
  )
}

function DemoComponent({ type }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  switch(type) {
    case 'blob':
      return (
        <div className={styles.demoBlob}>
          <div className={styles.blob}></div>
        </div>
      )

    case 'wave':
      return (
        <div className={styles.demoWave}>
          <svg className={styles.waveSvg}>
            <defs>
              <filter id="wave">
                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="turbulence">
                  <animate attributeName="baseFrequency" dur="10s" values="0.01 0.05;0.02 0.08;0.01 0.05" repeatCount="indefinite"/>
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" filter="url(#wave)"/>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.waveText}>Hover Me</div>
        </div>
      )

    case 'button':
      return (
        <div className={styles.demoButton}>
          <button
            className={styles.liquidButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className={styles.liquidButtonBg}></span>
            <span className={styles.liquidButtonText}>Click Me</span>
          </button>
        </div>
      )

    case 'gooey':
      return (
        <div className={styles.demoGooey}>
          <svg style={{display: 'none'}}>
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </defs>
          </svg>
          <div className={styles.gooeyContainer}>
            <div className={styles.gooeyBlob}></div>
            <div className={styles.gooeyBlob}></div>
            <div className={styles.gooeyBlob}></div>
          </div>
        </div>
      )

    case 'magnetic':
      return (
        <div
          className={styles.demoMagnetic}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={styles.magneticCard}
            style={isHovered ? {
              transform: `translate(${(mousePos.x - 150) * 0.2}px, ${(mousePos.y - 100) * 0.2}px) scale(1.05)`
            } : {}}
          >
            Magnetic Card
          </div>
        </div>
      )

    case 'scroll':
      return (
        <div className={styles.demoScroll}>
          <div className={styles.scrollContainer}>
            <div className={styles.scrollItem}>Item 1</div>
            <div className={styles.scrollItem}>Item 2</div>
            <div className={styles.scrollItem}>Item 3</div>
            <div className={styles.scrollItem}>Item 4</div>
          </div>
        </div>
      )

    case 'drip':
      return (
        <div className={styles.demoDrip}>
          <div className={styles.dripLoader}>
            <div className={styles.drop}></div>
            <div className={styles.drop}></div>
            <div className={styles.drop}></div>
          </div>
        </div>
      )

    case 'text':
      return (
        <div className={styles.demoText}>
          <div className={styles.liquidText}>
            <span>LIQUID</span>
          </div>
        </div>
      )

    default:
      return <div>Demo</div>
  }
}

function CodeBlock({ type }) {
  const codes = {
    blob: `/* CSS */
.blob {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: morph 8s ease-in-out infinite,
             rotate 15s linear infinite;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
}

@keyframes morph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  75% { border-radius: 70% 30% 40% 60% / 40% 70% 50% 30%; }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}`,

    wave: `/* HTML */
<svg>
  <defs>
    <filter id="wave">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.05"
        numOctaves="3">
        <animate
          attributeName="baseFrequency"
          dur="10s"
          values="0.01 0.05;0.02 0.08;0.01 0.05"
          repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        scale="15" />
    </filter>
  </defs>
  <rect
    width="100%"
    height="100%"
    fill="url(#gradient)"
    filter="url(#wave)"/>
</svg>`,

    button: `/* CSS */
.liquid-button {
  position: relative;
  padding: 16px 48px;
  border: 2px solid #6366f1;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
}

.liquid-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  transition: width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.liquid-button:hover .liquid-bg {
  width: 100%;
}`,

    gooey: `/* CSS */
.gooey-container {
  filter: url(#gooey);
}

/* SVG Filter */
<filter id="gooey">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
  <feColorMatrix
    mode="matrix"
    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" />
  <feComposite in="SourceGraphic" operator="atop"/>
</filter>

/* Blobs */
.gooey-blob {
  width: 60px;
  height: 60px;
  background: #6366f1;
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}`,

    magnetic: `/* JavaScript + CSS */
const card = document.querySelector('.magnetic-card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  card.style.transform = \`
    translate(\${x * 0.2}px, \${y * 0.2}px)
    scale(1.05)
  \`;
});

/* CSS */
.magnetic-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}`,

    scroll: `/* CSS */
.scroll-container {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.scroll-item {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* JavaScript */
let lastScroll = 0;
container.addEventListener('scroll', () => {
  const velocity = container.scrollTop - lastScroll;
  items.forEach((item, i) => {
    const delay = i * 0.1;
    item.style.transform = \`translateY(\${velocity * delay}px)\`;
  });
  lastScroll = container.scrollTop;
});`,

    drip: `/* CSS */
.drop {
  width: 20px;
  height: 20px;
  background: #6366f1;
  border-radius: 50% 50% 50% 0;
  animation: drip 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}

@keyframes drip {
  0% {
    transform: translateY(0) scaleY(1);
    opacity: 1;
  }
  20% {
    transform: translateY(5px) scaleY(1.2);
  }
  100% {
    transform: translateY(100px) scaleY(1.5);
    opacity: 0;
  }
}`,

    text: `/* CSS */
.liquid-text {
  position: relative;
  font-size: 64px;
  font-weight: bold;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: liquidWipe 3s ease-in-out infinite;
}

@keyframes liquidWipe {
  0%, 100% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}`
  }

  return (
    <pre className={styles.code}>
      <code>{codes[type]}</code>
    </pre>
  )
}
