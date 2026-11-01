import { lazy, Suspense, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  LockKeyhole,
  Menu,
  MousePointer2,
  Network,
  Search,
  ShoppingBag,
  Sparkles,
  WandSparkles,
  X,
} from 'lucide-react'

const OrbitalScene = lazy(() => import('./OrbitalScene'))

const services = [
  {
    number: '01',
    title: 'Web design & development',
    copy: 'Digital experiences that make your brand unmistakable—and your next move effortless.',
    icon: Code2,
    tag: 'DESIGN · BUILD · GROW',
  },
  {
    number: '02',
    title: 'AI solutions',
    copy: 'Practical AI agents and automation, designed around the way your business actually works.',
    icon: Bot,
    tag: 'INTELLIGENCE, APPLIED',
  },
  {
    number: '03',
    title: 'SEO & digital growth',
    copy: 'Earn the right attention with search strategy, content and social that work together.',
    icon: Search,
    tag: 'BE SEEN · BE CHOSEN',
  },
  {
    number: '04',
    title: 'E-commerce',
    copy: 'A smoother path from discovery to checkout, built to turn more visits into value.',
    icon: ShoppingBag,
    tag: 'SELL WITH CONFIDENCE',
  },
  {
    number: '05',
    title: 'Hosting & maintenance',
    copy: 'Dependable infrastructure and ongoing care, so your digital presence stays ready.',
    icon: Network,
    tag: 'ALWAYS ON',
  },
  {
    number: '06',
    title: 'Website security',
    copy: 'Proactive auditing and protection shaped by decades of safeguarding the web.',
    icon: LockKeyhole,
    tag: 'BUILT ON TRUST',
  },
]

const stats = [
  ['28+', 'years of experience'],
  ['187+', 'awards'],
  ['50+', 'security audits passed'],
  ['20+', 'autonomous agents deployed'],
  ['1,400+', 'successful projects'],
]

const principles = [
  {
    no: '01',
    title: 'Design with intention.',
    description:
      'Brand, audience and business goals belong in the same conversation. We bring them together before a pixel is placed.',
    icon: WandSparkles,
  },
  {
    no: '02',
    title: 'Build for what’s next.',
    description:
      'From thoughtful engineering to practical AI, we create digital foundations that are ready to evolve with you.',
    icon: AudioLines,
  },
  {
    no: '03',
    title: 'Stay accountable.',
    description:
      'Performance, security and long-term care are part of the work—not a footnote after launch.',
    icon: Check,
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    )
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="3CS home" onClick={closeMenu}>
          <span className="brand-mark">3<span>C</span>S<span className="brand-dot">.</span></span>
          <span className="brand-caption">DIGITAL, WITH INTENT</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#showcase" onClick={closeMenu}>Showcase</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> SRI LANKA · WORKING EVERYWHERE</p>
            <h1>Make digital<br />mean <span>more.</span></h1>
            <p className="hero-description">
              We bring design, technology and a little bit of foresight together to make your next move matter.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#services">Explore what we do <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero-proof">
              <div className="proof-line" />
              <p><strong>28+ years</strong> turning ambitious ideas into useful digital things.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="An original animated 3D orbit illustration">
            <div className="art-glow" />
            <div className="art-grid" />
            <div className="orbit-label orbit-label-top"><span>01</span> DESIGN SYSTEMS</div>
            <div className="orbit-label orbit-label-bottom"><span>02</span> INTELLIGENT GROWTH</div>
            <Suspense fallback={<div className="orbital-loading" aria-hidden="true" />}>
              <OrbitalScene />
            </Suspense>
            <div className="orbit-tag tag-left"><span className="tag-icon"><Sparkles size={14} /></span> Human by design</div>
            <div className="orbit-tag tag-right"><span className="tag-pulse" /> Always evolving</div>
            <div className="hero-art-caption"><span>FIG. 01</span> PROGRESS, IN ORBIT</div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about 3CS">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={15} />
          </a>
          <div className="hero-index">COLOMBO <span>06°54&apos;N</span></div>
        </section>

        <section className="intro-section section-shell" id="about">
          <div className="section-kicker" data-reveal><span>01 / A LITTLE ABOUT US</span><span className="kicker-rule" /></div>
          <div className="intro-grid">
            <div className="intro-heading" data-reveal>
              <h2>Experience is<br />only the <em>beginning.</em></h2>
            </div>
            <div className="intro-copy" data-reveal>
              <p className="intro-lead">We’re 3CS. A digital partner built on decades of curiosity, craft and getting things done.</p>
              <p>For more than 28 years, we’ve helped ambitious organisations shape their online presence—from the first sketch to what comes after launch. Today, that means thoughtful web design, dependable technology and emerging tools like AI, all working in service of real people.</p>
              <a className="underlined-link" href="#approach">A little more about how we work <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="stats-strip" data-reveal>
            {stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong><span>{label}</span>
              </div>
            ))}
            <p className="stats-note">Figures as published by 3CS</p>
          </div>
        </section>

        <section className="services-section section-shell" id="services">
          <div className="section-kicker" data-reveal><span>02 / WHAT WE MAKE POSSIBLE</span><span className="kicker-rule" /></div>
          <div className="section-heading-row" data-reveal>
            <h2>Connected expertise.<br /><em>One thoughtful team.</em></h2>
            <p>Bring us a challenge. We’ll bring the right mix of creative, technical and strategic thinking to move it forward.</p>
          </div>
          <div className="service-grid">
            {services.map(({ number, title, copy, icon: Icon, tag }) => (
              <a className="service-card" href="#contact" key={number} data-reveal>
                <div className="service-card-top"><span>{number}</span><Icon size={20} strokeWidth={1.5} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="service-card-bottom"><span>{tag}</span><ArrowUpRight size={16} /></div>
              </a>
            ))}
          </div>
          <p className="services-footnote"><span className="tiny-spark">✳</span> From one focused project to a long-term digital partnership.</p>
        </section>

        <section className="approach-section section-shell" id="approach">
          <div className="section-kicker" data-reveal><span>03 / THE 3CS DIFFERENCE</span><span className="kicker-rule" /></div>
          <div className="approach-layout">
            <div className="approach-intro" data-reveal>
              <p className="eyebrow lime-eyebrow">GOOD WORK, BUILT TO LAST</p>
              <h2>Not more digital.<br /><em>More meaningful.</em></h2>
              <p>Our work lives where good ideas meet sound execution. The result is designed to feel right today—and keep working tomorrow.</p>
              <a className="button button-outline" href="#contact">Why 3CS <ArrowUpRight size={16} /></a>
            </div>
            <div className="principle-list">
              {principles.map(({ no, title, description, icon: Icon }) => (
                <article className="principle-card" key={no} data-reveal>
                  <span className="principle-no">{no}</span>
                  <div className="principle-main"><h3>{title}</h3><p>{description}</p></div>
                  <Icon className="principle-icon" size={22} strokeWidth={1.4} />
                </article>
              ))}
            </div>
          </div>
          <div className="edge-ribbon">
            <div><span className="ribbon-icon"><MousePointer2 size={17} /></span><strong>Performance</strong><span>Fast by design</span></div>
            <div><span className="ribbon-icon"><LockKeyhole size={17} /></span><strong>Security</strong><span>Protected by experience</span></div>
            <div><span className="ribbon-icon"><Globe2 size={17} /></span><strong>Reliability</strong><span>Ready for what’s next</span></div>
          </div>
        </section>

        <section className="capability-section section-shell">
          <div className="capability-panel" data-reveal>
            <div className="capability-graphic" aria-hidden="true">
              <div className="cap-orbit cap-orbit-one" />
              <div className="cap-orbit cap-orbit-two" />
              <div className="cap-center"><Sparkles size={28} /></div>
              <span className="cap-node node-one"><Bot size={16} /></span>
              <span className="cap-node node-two"><Code2 size={16} /></span>
              <span className="cap-node node-three"><Search size={16} /></span>
              <span className="cap-node node-four"><Network size={16} /></span>
            </div>
            <div className="capability-copy">
              <p className="eyebrow">HUMAN THINKING. SMARTER TOOLS.</p>
              <h2>Built for a web<br />that keeps <em>changing.</em></h2>
              <p>From robust web platforms to autonomous AI agents, we bring proven digital craft together with the tools shaping what comes next.</p>
              <div className="capability-tags"><span>Web & product</span><span>AI & automation</span><span>Growth & security</span></div>
            </div>
          </div>
        </section>

        <section className="showcase-section section-shell" id="showcase">
          <div className="section-kicker" data-reveal><span>04 / A SPACE FOR WHAT’S NEXT</span><span className="kicker-rule" /></div>
          <div className="section-heading-row showcase-heading" data-reveal>
            <h2>Ideas take shape<br /><em>before they go live.</em></h2>
            <p>Every great digital experience starts as a possibility. Here are a few visual explorations of where strategy and imagination can meet.</p>
          </div>
          <div className="concept-grid">
            <article className="concept-card concept-large" data-reveal>
              <div className="concept-art concept-art-one" aria-hidden="true">
                <div className="concept-sun" /><div className="concept-arc" />
                <span className="concept-stamp">A / 01</span>
                <span className="concept-float">A calmer kind<br />of commerce.</span>
              </div>
              <div className="concept-meta"><div><span>CONCEPTUAL SHOWCASE</span><h3>Commerce, considered.</h3></div><ArrowUpRight size={18} /></div>
            </article>
            <article className="concept-card" data-reveal>
              <div className="concept-art concept-art-two" aria-hidden="true">
                <div className="signal-ring signal-one" /><div className="signal-ring signal-two" /><div className="signal-core" />
                <span className="concept-stamp">B / 02</span><span className="signal-text">01—03 / CLEAR SIGNAL</span>
              </div>
              <div className="concept-meta"><div><span>CONCEPTUAL SHOWCASE</span><h3>Signals, made simple.</h3></div><ArrowUpRight size={18} /></div>
            </article>
          </div>
          <p className="concept-disclaimer">Illustrative design concepts created for this homepage—not commissioned client projects.</p>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-panel" data-reveal>
            <div className="contact-orb" aria-hidden="true"><div /><span /></div>
            <div className="contact-copy">
              <p className="eyebrow lime-eyebrow">05 / YOUR NEXT MOVE</p>
              <h2>Something good<br />starts <em>here.</em></h2>
              <p>Have a big idea, a knotty challenge or just a question? We’re always up for a thoughtful conversation.</p>
              <a className="button button-lime" href="mailto:info@3cs.lk">Talk to our team <ArrowUpRight size={17} /></a>
            </div>
            <a className="contact-direct" href="tel:+94759100662">
              <span>OR CALL US DIRECTLY</span><strong>+94 759 100 662</strong><ArrowUpRight size={16} />
            </a>
            <ChevronDown className="contact-chevron" size={20} />
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home" aria-label="3CS home">
              <span className="brand-mark">3<span>C</span>S<span className="brand-dot">.</span></span>
              <span className="brand-caption">DIGITAL, WITH INTENT</span>
            </a>
            <p>Thoughtful digital, made in Sri Lanka.<br />Built for everywhere.</p>
          </div>
          <div className="footer-column"><span className="footer-label">EXPLORE</span><a href="#about">About</a><a href="#services">Services</a><a href="#approach">Our approach</a><a href="#showcase">Showcase</a></div>
          <div className="footer-column"><span className="footer-label">SAY HELLO</span><a href="mailto:info@3cs.lk">info@3cs.lk</a><a href="tel:+94759100662">+94 759 100 662</a><p>352, Embuldeniya Road,<br />Sri Jayawardenepura Kotte</p></div>
          <a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={20} /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 3CS Asia (Private) Limited</span><a href="https://www.3cs.lk/" target="_blank" rel="noreferrer">Company information verified at 3cs.lk <ArrowUpRight size={12} /></a><span>Made with intention <span className="footer-heart">✳</span></span></div>
      </footer>
    </>
  )
}

export default App
