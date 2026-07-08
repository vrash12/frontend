import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { api, getImageUrl } from "../api/client";
import type { BlogPost, Project } from "../types";

const skillPath = "/images/logos-skill";

const psalmPassage = {
  title: "Psalm 19",
  subtitle: "For the choir director: A psalm of David.",
  verses: [
    {
      number: 1,
      text: "The heavens proclaim the glory of God. The skies display his craftsmanship.",
    },
    {
      number: 2,
      text: "Day after day they continue to speak; night after night they make him known.",
    },
    {
      number: 3,
      text: "They speak without a sound or word; their voice is never heard.",
    },
    {
      number: 4,
      text: "Yet their message has gone throughout the earth, and their words to all the world.",
    },
  ],
};

const missionCards = [
  {
    title: "Software Development",
    label: "Build",
    description:
      "I design and develop web applications, dashboards, APIs, and full-stack systems that solve real problems.",
    image: `${skillPath}/logo2.png`,
    fallback: "💻",
    accent: "#ff7a00",
    tools: [
      { name: "React", image: `${skillPath}/logo2.png` },
      { name: "HTML5", image: `${skillPath}/logo4.png` },
      { name: "PHP", image: `${skillPath}/logo14.png` },
      { name: "Java", image: `${skillPath}/logo13.png` },
      { name: "Django", image: `${skillPath}/logo11.png` },
      { name: "Flask", image: `${skillPath}/logo17.png` },
      { name: "Docker", image: `${skillPath}/logo18.png` },
      { name: "Vite", image: `${skillPath}/logo20.png` },
    ],
  },
  {
    title: "Data Science",
    label: "Analyze",
    description:
      "I work with data cleaning, visualization, analysis, and machine learning workflows to turn raw data into useful insights.",
    image: `${skillPath}/logo10.png`,
    fallback: "📊",
    accent: "#0057ff",
    tools: [
      { name: "Python", image: `${skillPath}/logo10.png` },
      { name: "R", image: `${skillPath}/logo7.png` },
      { name: "Anaconda", image: `${skillPath}/logo15.png` },
      { name: "TensorFlow", image: `${skillPath}/logo6.png` },
      { name: "Docker", image: `${skillPath}/logo18.png` },
    ],
  },
  {
    title: "Artificial Intelligence",
    label: "Automate",
    description:
      "I explore AI-powered tools, intelligent systems, automation, and practical machine learning applications.",
    image: `${skillPath}/logo6.png`,
    fallback: "🤖",
    accent: "#7c3cff",
    tools: [
      { name: "TensorFlow", image: `${skillPath}/logo6.png` },
      { name: "Python", image: `${skillPath}/logo10.png` },
      { name: "C++", image: `${skillPath}/logo9.png` },
      { name: ".NET Core", image: `${skillPath}/logo3.png` },
      { name: "Flutter", image: `${skillPath}/logo12.png` },
    ],
  },
];

function PsalmPassage() {
  return (
    <div className="psalm-passage-card enhanced-psalm-card">
      <div className="psalm-card-top">
        <span className="psalm-label">{psalmPassage.title}</span>
        <span className="psalm-card-tag">NLT</span>
      </div>

      <p className="psalm-subtitle">{psalmPassage.subtitle}</p>

      <div className="psalm-verses">
        {psalmPassage.verses.map((verse) => (
          <p key={verse.number} className="psalm-verse-line">
            <sup>{verse.number}</sup>
            <span>{verse.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function FavoriteBibleVerseSection() {
  return (
    <section className="favorite-verse-section animated-verse-section enhanced-favorite-verse-section">
      <div className="verse-stars" aria-hidden="true">
        <span className="verse-star star-one" />
        <span className="verse-star star-two" />
        <span className="verse-star star-three" />
        <span className="verse-star star-four" />
        <span className="verse-star star-five" />
        <span className="verse-star star-six" />
      </div>

      <div className="shooting-star shooting-star-one" aria-hidden="true" />
      <div className="shooting-star shooting-star-two" aria-hidden="true" />

      <div className="verse-orbit verse-orbit-one" aria-hidden="true" />
      <div className="verse-orbit verse-orbit-two" aria-hidden="true" />

      <div className="verse-glow verse-glow-one" aria-hidden="true" />
      <div className="verse-glow verse-glow-two" aria-hidden="true" />

      <div className="favorite-verse-content enhanced-verse-content">
        <div className="favorite-verse-text enhanced-verse-text">
          <p className="section-kicker">My Favorite Bible Verse</p>

          <h2>
            The Heavens
            <span>Declare His Glory</span>
          </h2>

          <p>
            Psalm 19 reminds me that creation is not silent. The skies, the
            heavens, and the beauty of what God made all point back to His
            craftsmanship, purpose, and glory.
          </p>
        </div>

        <div className="enhanced-psalm-wrap">
          <PsalmPassage />
        </div>
      </div>
    </section>
  );
}
function getBlogCoverImage(post: BlogPost) {
  return post.image || post.images?.[0]?.image || "";
}

function Home() {
  const [isHeroFlipped, setIsHeroFlipped] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const [projectsLoading, setProjectsLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);

  const [projectsError, setProjectsError] = useState("");
  const [blogsError, setBlogsError] = useState("");

  useEffect(() => {
    api
      .get<Project[]>("/projects")
      .then((response) => {
        setProjects(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
        setProjectsError("Unable to load projects right now.");
      })
      .finally(() => {
        setProjectsLoading(false);
      });

    api
      .get<BlogPost[]>("/blogs")
      .then((response) => {
        setBlogs(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Failed to load blogs:", error);
        setBlogsError("Unable to load adventure logs right now.");
      })
      .finally(() => {
        setBlogsLoading(false);
      });
  }, []);

  return (
    <main className="space-theme">
      <section
        className={`hero-space animated-hero ${
          isHeroFlipped ? "hero-space-dark" : "hero-space-orange"
        }`}
      >
        <div className="space-doodle doodle-one">✦</div>
        <div className="space-doodle doodle-two">✺</div>
        <div className="space-doodle doodle-three">⌁</div>

        <div className="hero-star-field" aria-hidden="true">
          <span className="hero-star hero-star-one" />
          <span className="hero-star hero-star-two" />
          <span className="hero-star hero-star-three" />
          <span className="hero-star hero-star-four" />
        </div>

        <div
          className="hero-shooting-line hero-shooting-line-one"
          aria-hidden="true"
        />
        <div
          className="hero-shooting-line hero-shooting-line-two"
          aria-hidden="true"
        />

        <div className="hero-orbit-line hero-orbit-line-one" aria-hidden="true" />
        <div className="hero-orbit-line hero-orbit-line-two" aria-hidden="true" />

        <div className="hero-text">
          <p className="eyebrow">Developer in Orbit</p>

          <h1>
            Building Digital Systems
            <span className="highlight-text">from Earth to Orbit.</span>
          </h1>

          <p>
            I’m Van Rodolf Suiva, a developer focused on software development,
            data science, and artificial intelligence. I enjoy building
            practical, creative, and problem-solving driven projects.
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="btn">
              Launch Projects
            </Link>

            <Link to="/blogs" className="btn btn-outline">
              View Adventure Quests
            </Link>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div
            className={`hero-flip-card ${isHeroFlipped ? "is-flipped" : ""}`}
            tabIndex={0}
            role="button"
            aria-label="Flip portfolio image"
            onMouseEnter={() => setIsHeroFlipped(true)}
            onMouseLeave={() => setIsHeroFlipped(false)}
            onFocus={() => setIsHeroFlipped(true)}
            onBlur={() => setIsHeroFlipped(false)}
            onClick={() => setIsHeroFlipped((current) => !current)}
          >
            <div className="hero-flip-inner">
              <div className="hero-flip-face hero-flip-front">
                <img
                  src="/images/profile-space.png"
                  alt="Van Rodolf Suiva portfolio profile orange space theme"
                  className="hero-profile-image"
                />
              </div>

              <div className="hero-flip-face hero-flip-back">
                <img
                  src="/images/profile-space-dark.png"
                  alt="Van Rodolf Suiva portfolio profile dark space theme"
                  className="hero-profile-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="section-heading mission-heading">
          <p className="section-kicker">Mission Control</p>

          <h2>What I Build Around</h2>

          <p>
            My portfolio focuses on three core areas where I enjoy learning,
            experimenting, and building real technical projects. A focused view
            of the languages, frameworks, tools, and technologies I use across
            software development, data science, and artificial intelligence.
          </p>
        </div>

        <div className="mission-grid">
          {missionCards.map((card, index) => (
            <article
              className="mission-card mission-card-with-tools"
              key={card.title}
              style={
                {
                  "--mission-accent": card.accent,
                } as CSSProperties
              }
            >
              <div className="mission-card-top">
                <span className="mission-number">0{index + 1}</span>
                <span className="mission-label">{card.label}</span>
              </div>

              <div className="mission-icon">
                <img
                  src={card.image}
                  alt={card.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";

                    const parent = event.currentTarget.parentElement;

                    if (parent) {
                      parent.dataset.fallback = card.fallback;
                    }
                  }}
                />
              </div>

              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <div className="mission-tools">
                <span className="mission-tools-title">
                  Tools and Technologies
                </span>

                <div className="mission-tools-grid">
                  {card.tools.map((tool) => (
                    <div
                      className="mission-tool-pill"
                      key={`${card.title}-${tool.name}`}
                    >
                      <div className="mission-tool-icon">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


<section className="launchpad-section home-projects-section">
  <div className="section-heading light home-section-heading">
    <p className="section-kicker home-kicker-dark">Project Launchpad</p>

    <h2>Latest Builds</h2>

    <p>
      Selected projects pulled directly from your backend project manager.
    </p>
  </div>

  {projectsLoading ? (
    <p className="dynamic-section-message">Loading projects...</p>
  ) : projectsError ? (
    <p className="dynamic-section-message">{projectsError}</p>
  ) : projects.length === 0 ? (
    <p className="dynamic-section-message">
      No projects yet. Add your first project in the hidden admin page.
    </p>
  ) : (
    <div className="home-project-grid">
      {projects.map((project, index) => (
        <article className="home-project-card" key={project.id}>
          <div className="home-project-card-top">
            <span className="home-project-number">0{index + 1}</span>
            <span className="home-project-category">{project.category}</span>
          </div>

          {project.image && (
            <img
              src={getImageUrl(project.image)}
              alt={project.title}
              className="home-project-image"
            />
          )}

          <div className="home-project-content">
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            {project.technologies && (
              <p className="home-tech-line">
                <strong>Tech:</strong> {project.technologies}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  )}

  <div className="center-action">
    <Link to="/projects" className="btn home-section-btn">
      Explore All Projects
    </Link>
  </div>
</section>


<section className="blog-galaxy-section home-blogs-section">
  <div className="section-heading home-section-heading">
    <p className="section-kicker home-kicker-light">Adventure Logs</p>

    <h2>Latest Stories From the Road, Trail, and Journey</h2>

    <p>
      Fresh adventure logs pulled directly from your backend blog manager.
    </p>
  </div>

  {blogsLoading ? (
    <p className="dynamic-section-message dynamic-section-message-dark">
      Loading adventure logs...
    </p>
  ) : blogsError ? (
    <p className="dynamic-section-message dynamic-section-message-dark">
      {blogsError}
    </p>
  ) : blogs.length === 0 ? (
    <p className="dynamic-section-message dynamic-section-message-dark">
      No blogs yet. Add your first adventure log in the hidden admin page.
    </p>
  ) : (
    <div className="home-blog-grid">
      {blogs.map((blog, index) => {
        const coverImage = getBlogCoverImage(blog);

        return (
          <article className="home-blog-card" key={blog.id}>
            <div className="home-blog-media">
              {coverImage ? (
                <img
                  src={getImageUrl(coverImage)}
                  alt={blog.title}
                  className="home-blog-image"
                />
              ) : (
                <div className="home-blog-placeholder">
                  {blog.category || "Adventure"}
                </div>
              )}

              <span className="home-blog-number">0{index + 1}</span>
            </div>

            <div className="home-blog-content">
              {blog.category && (
                <span className="home-blog-category">{blog.category}</span>
              )}

              <h3>{blog.title}</h3>

              <p>{blog.description}</p>

              {blog.location && (
                <p className="blog-location">📍 {blog.location}</p>
              )}

              <Link to={`/blogs/${blog.id}`} className="read-more">
                Read adventure
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  )}

  <div className="center-action">
    <Link to="/blogs" className="btn btn-outline-dark home-section-btn">
      Read Adventure Logs
    </Link>
  </div>
</section>

      <FavoriteBibleVerseSection />




<section className="connect-portal moon-landing-section">
  <div className="moon-landing-stars" aria-hidden="true">
    <span className="landing-star star-one" />
    <span className="landing-star star-two" />
    <span className="landing-star star-three" />
    <span className="landing-star star-four" />
  </div>

  <div className="moon-landing-orbit" aria-hidden="true" />

  <div className="moon-surface-shape" aria-hidden="true" />

  <div className="moon-landing-content">
    <div className="moon-contact-copy">
      <p className="section-kicker moon-landing-kicker">Open a Transmission</p>

      <h2>Have a project, idea, or opportunity?</h2>

      <p>
        Let’s connect and build something useful, creative, and technical.
      </p>

      <div className="moon-contact-actions">
        <a href="mailto:your@email.com" className="btn moon-primary-btn">
          Email Me
        </a>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="btn moon-secondary-btn"
        >
          LinkedIn
        </a>
      </div>
    </div>

    <div className="moon-contact-visual" aria-hidden="true">
      <div className="moon-planet">
        <span className="moon-crater crater-one" />
        <span className="moon-crater crater-two" />
        <span className="moon-crater crater-three" />
        <span className="moon-crater crater-four" />
      </div>
    </div>
  </div>
</section>


    </main>
  );
}

export default Home;