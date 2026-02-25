import { useState, useEffect, useCallback } from 'react';
import './App.css';

/* =============================================
   HOOKS
============================================= */

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-64px 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

/* =============================================
   DATA
============================================= */

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'contact'];

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const RESUME_URL = process.env.PUBLIC_URL + '/resume.pdf';

const PROJECTS = [
  {
    id: 'raytrace',
    title: 'CPU Ray Tracer',
    description:
      'Physically-based ray tracer built from scratch. Implements recursive reflection and refraction, Phong shading, soft shadows, and accurate light transport across diffuse, specular, and transparent surfaces. All ray-scene intersection math written by hand — no rendering libraries.',
    tech: ['C++', 'OpenGL', 'Linear Algebra'],
    link: 'https://github.com/lucasbwein/CPU-Ray-Tracing',
    linkLabel: 'View on GitHub',
    image: process.env.PUBLIC_URL + '/demo-raytrace.jpg',
    featured: true,
  },
  {
    id: 'tcg',
    title: 'ORIGIN: Battle of the Ancients',
    description:
      'Strategic trading card game with 100+ unique cards, elemental creature evolution, and deep deck-building mechanics. Built a custom card rendering pipeline with shader-driven VFX, a full ability system routing 87 unique effects, AI opponents, and LAN multiplayer with host-authoritative state sync.',
    tech: ['GDScript', 'Godot 4.3', 'GLSL Shaders', 'ENet Networking'],
    link: null,
    linkLabel: null,
    image: process.env.PUBLIC_URL + '/demo-tcg.jpg',
    badge: 'In Development',
    featured: true,
  },
  {
    id: 'shell',
    title: 'Shell Texturing Fur Rendering',
    description:
      'Real-time fur rendering in OpenGL using the shell texturing technique. Generates volumetric fur with GPU-instanced shell layers, Perlin noise density functions for strand distribution, and per-fragment lighting for realistic shading at interactive frame rates.',
    tech: ['C++', 'GLSL', 'OpenGL', 'GPU Instancing'],
    link: 'https://github.com/lucasbwein/OpenGL-Shell-Texturing',
    linkLabel: 'View on GitHub',
    image: process.env.PUBLIC_URL + '/demo-shell.jpg',
  },
  {
    id: 'urge',
    title: 'Replace the Urge',
    description:
      'Behavioral change app that helps redirect unproductive urges into intentional actions. Tracks user patterns over time, surfaces personalized alternatives, and includes iOS Shortcuts integration for social media intention-setting.',
    tech: ['React', 'LocalStorage', 'iOS Shortcuts'],
    link: 'https://urge-replacer.vercel.app',
    linkLabel: 'Live Demo',
    image: process.env.PUBLIC_URL + '/demo-urge.jpg',
  },
  {
    id: 'rps',
    title: 'Multiplayer Game Server',
    description:
      'Concurrent TCP game server handling multiple simultaneous matches with I/O multiplexing via select(). Implements matchmaking, game state machines, graceful disconnect recovery, and protocol-level message framing — all without threading.',
    tech: ['C++', 'TCP Sockets', 'select()', 'State Machines'],
    link: 'https://github.com/lucasbwein/Rock-Paper-Scissors-Game',
    linkLabel: 'View on GitHub',
  },
];

const SKILLS = [
  {
    icon: '\u{1F4BB}',
    title: 'Languages',
    tags: ['C++', 'JavaScript', 'Python', 'Java', 'GLSL', 'GDScript'],
  },
  {
    icon: '\u{1F4A0}',
    title: 'Graphics & Rendering',
    tags: ['OpenGL', 'Shader Programming', 'GPU Instancing', 'Ray Tracing'],
  },
  {
    icon: '\u{1F3AE}',
    title: 'Game Dev & Tools',
    tags: ['Godot 4', 'GDScript', 'Custom UI Systems', 'LAN Multiplayer'],
  },
  {
    icon: '\u{2699}\uFE0F',
    title: 'Backend & Systems',
    tags: ['Node.js', 'MongoDB', 'TCP/UDP Sockets', 'REST APIs'],
  },
  {
    icon: '\u{1F3A8}',
    title: 'Frontend',
    tags: ['React', 'HTML/CSS', 'Responsive Design', 'UI/UX'],
  },
];

const HIGHLIGHTS = [
  { number: '5+', label: 'Projects Built' },
  { number: '6', label: 'Languages' },
  { number: '3', label: 'Focus Areas' },
  { number: 'Sony', label: 'Internship' },
];

/* =============================================
   APP
============================================= */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavVisible] = useState(false);

  useScrollReveal();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback(
    (e, id) => {
      e.preventDefault();
      setMenuOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  return (
    <>
      {/* Skip to content — keyboard accessibility */}
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <div className="animated-bg" aria-hidden="true" />

      {/* Navigation */}
      <nav className={`nav${navScrolled ? ' nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <a
            href="#hero"
            className="nav__logo"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="Lucas Weinstein — scroll to top"
          >
            lucas.
          </a>

          <button
            className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav__link${activeSection === id ? ' nav__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={RESUME_URL}
                className="nav__resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`nav__overlay${menuOpen ? ' nav__overlay--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Main content */}
      <main className="portfolio" id="main">
        {/* Hero */}
        <section className="hero" id="hero" aria-label="Introduction">
          <div className="hero__content">
            <p className="hero__status">Graphics Engineer &middot; Open to Opportunities</p>
            <h1>Lucas Weinstein</h1>
            <p className="hero__title">Graphics Programmer & Full-Stack Developer</p>
            <p className="hero__tagline">
              I write ray tracers from scratch, build multiplayer servers
              with raw sockets, and ship full-stack web apps.
            </p>
            <div className="hero__ctas">
              <a
                href="#projects"
                className="hero__cta hero__cta--primary"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="hero__cta hero__cta--secondary"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* About */}
        <section className="section" id="about" aria-label="About me">
          <h2 className="section__title reveal">
            About <span>Me</span>
          </h2>
          <div className="about__content">
            <div className="about__text reveal">
              <p>
                Graphics engineer specializing in real-time rendering, systems-level networking,
                and full-stack web development. Currently finishing my CS degree at San Diego
                State University.
              </p>
              <p>
                I started with React apps for behavioral change and meaningful conversation,
                then dove into systems programming — building multiplayer TCP servers with
                concurrent I/O, and recently into real-time graphics with OpenGL shader
                development, GPU instancing, and writing a ray tracer from scratch.
              </p>
              <p>
                I'm driven by understanding how things work under the hood — whether
                that's light transport through a scene, packet flow through a socket,
                or state management across a networked game.
              </p>
              <p className="about__currently">
                <strong>Currently exploring:</strong> PBR materials, shadow mapping
                techniques, and cross-network multiplayer via WebRTC.
              </p>
            </div>
            <div className="about__highlights reveal-stagger">
              {HIGHLIGHTS.map(({ number, label }) => (
                <div className="about__highlight-card" key={label}>
                  <span className="about__highlight-number">{number}</span>
                  <span className="about__highlight-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Projects */}
        <section className="section" id="projects" aria-label="Featured projects">
          <h2 className="section__title reveal">
            Featured <span>Projects</span>
          </h2>
          <div className="project-grid reveal-stagger">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className={`project-card project-card--${project.id}${project.featured ? ' project-card--featured' : ''}${project.image ? ' project-card--has-image' : ''}`}
              >
                {project.image && (
                  <div className="project-card__image-wrap">
                    <img
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      className="project-card__image"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                  </div>
                )}
                <div className="project-card__body">
                  <div className="project-card__header">
                    <h3 className="project-card__title">{project.title}</h3>
                    {project.badge && (
                      <span className="project-card__badge" aria-label={project.badge}>
                        <span className="project-card__badge-dot" aria-hidden="true" />
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="project-card__description">{project.description}</p>
                  <div className="project-card__tech" aria-label="Technologies used">
                    {project.tech.map((t) => (
                      <span key={t} className="project-card__tech-pill">{t}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link"
                    >
                      {project.linkLabel}
                      <span className="project-card__link-arrow" aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* Skills */}
        <section className="section" id="skills" aria-label="Skills and tools">
          <h2 className="section__title reveal">
            Skills & <span>Tools</span>
          </h2>
          <div className="skills-grid reveal-stagger">
            {SKILLS.map(({ icon, title, tags }) => (
              <div key={title} className="skill-card">
                <div className="skill-card__icon" aria-hidden="true">{icon}</div>
                <h3 className="skill-card__title">{title}</h3>
                <div className="skill-card__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="skill-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* Contact */}
        <section className="contact" id="contact" aria-label="Contact information">
          <h2 className="section__title reveal">
            Let's <span>Connect</span>
          </h2>
          <p className="contact__subtitle reveal">
            Open to roles, collaborations, and conversations about
            graphics programming and systems.
          </p>
          <div className="contact__buttons reveal">
            <a
              href="mailto:lucasbwein@gmail.com"
              className="contact__button"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/lucasweinstein"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__button"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/lucasbwein"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__button"
            >
              GitHub
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__button"
            >
              Resume
            </a>
          </div>
          <p className="contact__email reveal">lucasbwein@gmail.com</p>
        </section>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <span className="footer__copyright">
            &copy; {new Date().getFullYear()} Lucas Weinstein
          </span>
          <div className="footer__links">
            <a
              href="https://github.com/lucasbwein"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lucasweinstein"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
