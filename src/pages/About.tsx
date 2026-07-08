import { useState } from "react";
import type { FormEvent } from "react";

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "JavaScript", "Java", "PHP", "C++"],
  },
  {
    title: "Frontend Development",
    items: ["HTML", "CSS", "React"],
  },
  {
    title: "Backend Development",
    items: ["Django", "Laravel", "Flask", "Node.js", "Spring Boot", "PHP"],
  },
  {
    title: "Mobile Development",
    items: ["React Native"],
  },
  {
    title: "Embedded Systems / IoT",
    items: ["Raspberry Pi", "Arduino"],
  },
  {
    title: "Networking & OS",
    items: ["Linux", "Windows", "Network Administration"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "Tools & Deployment",
    items: [
      "Git/GitHub",
      "Postman",
      "VS Code",
      "Figma",
      "Docker",
      "AWS",
      "Google Cloud Run",
      "ChatGPT/Copilot",
    ],
  },
];

const achievements = [
  "Candidate for Magna Cum Laude, July 31, 2026",
  "Best Capstone Project, 2026",
  "3rd Place, Saliksiklaban University-wide Undergraduate Research Competition, STEM Category, 2026",
];

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const emptyContactForm: ContactForm = {
  name: "",
  email: "",
  message: "",
};

function About() {
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [formNotice, setFormNotice] = useState("");

  function updateContactForm(field: keyof ContactForm, value: string) {
    setContactForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Portfolio Inquiry from ${contactForm.name}`;
    const body = `
Name: ${contactForm.name}
Email: ${contactForm.email}

Message:
${contactForm.message}
    `.trim();

    window.location.href = `mailto:vansuliva4@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFormNotice("Opening your email app...");
  }

  return (
    <main className="about-page neo-about-page">
      <section className="about-hero-neo about-hero-refined">
        <div className="about-hero-pattern" aria-hidden="true">
          <span className="about-plus about-plus-one">+</span>
          <span className="about-plus about-plus-two">+</span>
          <span className="about-plus about-plus-three">+</span>
          <span className="about-orbit about-orbit-one" />
          <span className="about-orbit about-orbit-two" />
        </div>

        <div className="about-hero-content">
          <p className="section-kicker">About Me</p>

          <h1>
            Van Rodolf
            <span>M. Suliva</span>
          </h1>

          <p>
            I’m an aspiring IT professional seeking a full-time role as a
            software developer where I can apply my technical knowledge,
            problem-solving skills, and passion for innovation.
          </p>

          <div className="about-hero-actions">
            <a href="mailto:vansuliva4@gmail.com" className="btn">
              Email Me
            </a>

            <a
              href="https://vrash12.github.io/van-portfolio/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              View Portfolio
            </a>
          </div>
        </div>

        <aside className="about-contact-form-card">
          <div className="about-contact-form-top">
            <span>Contact Form</span>
            <strong>Available</strong>
          </div>

          <h2>Let’s build something useful.</h2>

          <p>
            Send a short message about your project, collaboration, internship,
            or software development opportunity.
          </p>

          <form className="about-contact-form" onSubmit={handleContactSubmit}>
            <label>
              Name
              <input
                type="text"
                value={contactForm.name}
                onChange={(event) =>
                  updateContactForm("name", event.target.value)
                }
                placeholder="Your name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={contactForm.email}
                onChange={(event) =>
                  updateContactForm("email", event.target.value)
                }
                placeholder="your@email.com"
                required
              />
            </label>

            <label>
              Message
              <textarea
                rows={5}
                value={contactForm.message}
                onChange={(event) =>
                  updateContactForm("message", event.target.value)
                }
                placeholder="Tell me what you need help with..."
                required
              />
            </label>

            {formNotice && <p className="about-form-notice">{formNotice}</p>}

            <button type="submit" className="btn about-form-submit">
              Send Message
            </button>
          </form>

          <div className="about-contact-mini-grid">
            <div>
              <span>Email</span>
              <strong>vansuliva4@gmail.com</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>Tarlac, Philippines</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="about-summary-section">
        <div className="about-summary-card">
          <p className="section-kicker">Professional Summary</p>

          <h2>Building useful systems with purpose, discipline, and curiosity.</h2>

          <p>
            I am eager to contribute to building, improving, and maintaining
            software solutions while continuing to grow in programming, web
            development, databases, networking, and modern development
            practices.
          </p>
        </div>
      </section>


<section className="about-education-section enhanced-education-section">
  <div className="about-section-heading education-heading-enhanced">
    <p className="section-kicker">Education</p>
    <h2>Academic Background</h2>
    <p>
      My academic path focuses on information technology, software development,
      networking, and continuous professional growth.
    </p>
  </div>

  <div className="education-journey">
    <article className="education-card education-card-featured">
      <div className="education-card-marker">
        <span>01</span>
      </div>

      <div className="education-card-content">
        <div className="education-card-top">
          <span className="about-year-pill">Starting August 2026</span>
          <strong>Next Chapter</strong>
        </div>

        <h3>Tarlac State University</h3>

        <h4>Master in Information Technology</h4>

        <p>
          I will continue my graduate studies to deepen my knowledge in software
          development, information systems, networking, and modern technology
          solutions.
        </p>

        <div className="education-focus-grid">
          <span>Graduate Studies</span>
          <span>Information Systems</span>
          <span>Software Development</span>
          <span>Networking</span>
        </div>
      </div>
    </article>

    <article className="education-card">
      <div className="education-card-marker">
        <span>02</span>
      </div>

      <div className="education-card-content">
        <div className="education-card-top">
          <span className="about-year-pill">August 2022 - July 2026</span>
          <strong>Undergraduate</strong>
        </div>

        <h3>Tarlac State University</h3>

        <h4>
          Bachelor of Science in Information Technology specializing in Network
          and Administration
        </h4>

        <p>
          Built a strong foundation in programming, databases, systems,
          networking, web development, and IT project implementation.
        </p>

        <div className="about-achievement-list education-achievement-list">
          {achievements.map((achievement) => (
            <span key={achievement}>{achievement}</span>
          ))}
        </div>
      </div>
    </article>

    <article className="education-card">
      <div className="education-card-marker">
        <span>03</span>
      </div>

      <div className="education-card-content">
        <div className="education-card-top">
          <span className="about-year-pill">2020 - 2022</span>
          <strong>Senior High</strong>
        </div>

        <h3>St. Vincent School Foundation, Inc.</h3>

        <h4>STEM Strand</h4>

        <p>
          Developed academic discipline, problem-solving skills, and a stronger
          interest in science, technology, and analytical thinking.
        </p>

        <div className="education-focus-grid">
          <span>STEM</span>
          <span>Research</span>
          <span>Problem Solving</span>
        </div>
      </div>
    </article>
  </div>
</section>

      <section className="about-skills-section">
        <div className="about-section-heading center">
          <p className="section-kicker">Technical Skills</p>
          <h2>Tools, Languages, and Technologies</h2>

          <p>
            A focused technical stack across software development, backend
            systems, databases, networking, cloud deployment, and IoT.
          </p>
        </div>

        <div className="about-skills-grid">
          {skillGroups.map((group, index) => (
            <article className="about-skill-card" key={group.title}>
              <div className="about-skill-card-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{group.title}</strong>
              </div>

              <div className="about-skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-experience-section">
        <div className="about-section-heading">
          <p className="section-kicker">Experience</p>
          <h2>Work and Practical Background</h2>
        </div>

        <div className="about-experience-grid">
          <article className="about-experience-card featured">
            <span className="about-year-pill">February 2026 - May 2026</span>

            <h3>Software Developer Intern</h3>

            <p className="about-company">
              Municipal Agriculture Office, Ramos, Tarlac
            </p>

            <p>
              Developed and implemented a custom management system to centralize
              farmer profiles, rice seed distribution records, and cooperative
              data. The system included Google Maps API integration for land
              plotting and farm-location visualization to improve record
              tracking, reporting, and office workflows.
            </p>
          </article>

          <article className="about-experience-card">
            <span className="about-year-pill">2024 - Present</span>

            <h3>Freelance Software Developer</h3>

            <p className="about-company">Self-Employed</p>

            <p>
              Develop web and mobile applications for clients, from requirements
              gathering and UI/UX planning to development and deployment. I also
              provide documentation, bug fixes, and ongoing feature improvements.
            </p>
          </article>
        </div>
      </section>

      <section className="about-leadership-section">
        <div className="about-leadership-card refined-leadership-card">
          <div className="about-leadership-copy">
            <p className="section-kicker">Leadership</p>

            <h2>Serving through mentorship and community.</h2>
          </div>

          <div className="about-leadership-info">
            <h3>Youth Leader — Deep & Wide PH</h3>

            <p>
              I mentor and guide youth members through faith-based activities
              and group discussions, helping develop my communication,
              teaching, and leadership skills.
            </p>

            <span className="about-year-pill">2024 - Present</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;