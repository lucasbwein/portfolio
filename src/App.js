
import './App.css';

export default function App() {
  return (
    <div className="portfolio">
      <nav>
        {/* Lucas Weinstein */}
        <a href="#hero">Home</a>
        <a href="#about_me">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      
      <section className="hero-section" id="hero">
        <h1>Lucas Weinstein</h1>
        <p className="hero-subtitle">CS Student & Devloper</p>
        <p className="hero-tagline">Building tools that help people be more intentional in their lives</p>
      </section>

      <section className="about-section" id="about_me">
        <h2>About Me</h2>
        <p>
          {/* Senior at SDSU majoring in computer science. */}
          Computer Science senior at San Diego State University. I build React applications 
          that solve real problems - tools for behavioral change, meaningful conversation, 
          and intentional living. I believe the best software helps people and in my case,
          it helps people become more aware of their patterns and make better choices. I
          enjoy making applications that not only solve my problems, but can make an impact
          on other people's lives too.
        </p>
      </section>

      <section className="projects-section" id="projects">
        <h2>Projects</h2>

        <div className="project-card">
            <h3>Shell Texturing Fur Rendering</h3>
            <p>A real-time fur rendering implementation using the shell texturing technique in OpenGL.</p>
            <div className="project-tech">C++ • GLSL • OpenGL</div>
            <a href="https://github.com/lucasbwein/OpenGL-Shell-Texturing" target="_blank" rel="noopener noreferrer">Link →</a>
          </div>

        <div className="project-grid">
          <div className="project-card">
            <h3>Replace the Urge</h3>
            <p>Behavioral change app that helps redirect unproductive urges into intentional actions. Tracks patterns, provides alternatives, and includes iOS automation for social media intention-setting.</p>
            <div className="project-tech">React • LocalStorage • iOS Shortcuts</div>
            <a href="https://urge-replacer.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo →</a>
          </div>
          
          <div className="project-card">
            <h3>Questions Worth Asking</h3>
            <p>Conversation starter app with curated deep questions across categories. Helps facilitate meaningful connections beyond small talk.</p>
            <div className="project-tech">React • Vercel</div>
            <a href="https://authentic-conversation-starter.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo →</a>
          </div>
          
          <div className="project-card">
            <h3>Full Stack Todo</h3>
            <p>Complete CRUD application with user authentication and persistent storage.</p>
            <div className="project-tech">React • Node • MongoDB</div>
            <a href="https://full-stack-todo-app-3v3p.onrender.com" target="_blank" rel="noopener noreferrer">Live Demo →</a>
          </div>

          <div className="project-card">
            <h3>Rock, Paper, Scissors Multiplayer Game Server</h3>
            <p>TCP-based multiplayer game with match making and state management.</p>
            <div className="project-tech">C++ • select() • TCP Sockets</div>
            <a href="https://github.com/lucasbwein/Rock-Paper-Scissors-Game" target="_blank" rel="noopener noreferrer">Link →</a>
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Languages</h3>
            <div className="skill-tags">
              <span>Java</span>
              <span>C++</span>
              <span>Python</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-tags">
              <span>React</span>
              <span>HTML/CSS</span>
              <span>Responsive Design</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Tools</h3>
            <div className="skill-tags">
              <span>Git</span>
              <span>VS Code</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h2>Let's Connect</h2>
        <div className="contact-links">
          <a href="mailto:lucasbwein@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/lucasweinstein" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/lucasbwein" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="contact-email">lucasbwein@gmail.com</p>
      </section>
    </div>
  );
}

