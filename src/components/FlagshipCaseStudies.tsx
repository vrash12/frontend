import { Link } from "react-router-dom";
import { getThumbnailUrl } from "../api/client";
import type { Project } from "../types";

type FlagshipCaseStudy = {
  matchTitle: string;
  projectId: number;
  fallbackImage: string;
  fallbackGithubUrl?: string;
  label: string;
  title: string;
  summary: string;
  problem: string;
  contribution: string;
  architecture: string;
  technologies: string[];
  delivery: string[];
  result: string;
  resultLabel: string;
  proofLabel: string;
};

const flagshipCaseStudies: FlagshipCaseStudy[] = [
  {
    matchTitle: "PGT Onboard",
    projectId: 11,
    fallbackImage: "1787360189802-fe4728fdd3e814b7f47ba680.png",
    label: "Award-winning mobility platform",
    title: "PGT Onboard",
    summary:
      "A connected public-transport platform for live vehicle tracking, passenger visibility, electronic ticketing, and day-to-day fleet operations.",
    problem:
      "Commuters lacked reliable arrival and occupancy information, while transport staff handled ticketing, top-ups, schedules, and vehicle monitoring through disconnected processes.",
    contribution:
      "I built the connected commuter and operations workflows, integrating live GPS and passenger data, ETA and schedule views, QR wallet ticketing, top-ups, announcements, and staff dashboards.",
    architecture:
      "React Native clients communicate with Flask services, MQTT carries live telemetry from Arduino-based bus hardware, and Google Maps turns location data into commuter and operations views.",
    technologies: [
      "React Native",
      "Flask",
      "Python",
      "MQTT",
      "Arduino",
      "Google Maps API",
    ],
    delivery: [
      "Role-separated commuter, teller, officer, and manager journeys",
      "Four recorded end-to-end demonstrations validate the core role flows",
      "Cloud-deployed backend connected to mobile clients and IoT hardware",
    ],
    result: "Best Capstone Project + 3rd Place",
    resultLabel:
      "Recognized at the 2026 university-wide STEM research competition",
    proofLabel: "View case study & 4 demos",
  },
  {
    matchTitle: "Barangay SOMS",
    projectId: 16,
    fallbackImage: "1787351715257-07e92bfed2c5386f9b4b4fd7.png",
    fallbackGithubUrl: "https://github.com/vrash12/barangay-repo",
    label: "Public-service operations platform",
    title: "Barangay SOMS",
    summary:
      "A secure Laravel system that brings resident records and front-line barangay services into one accountable, searchable workflow.",
    problem:
      "Resident, household, certificate, complaint, appointment, payment, and reporting records can become fragmented across paper files and separate spreadsheets, slowing service and weakening traceability.",
    contribution:
      "I designed and implemented the end-to-end system: resident-facing requests, staff processing, administrator controls, analytics, decision-support recommendations, notifications, reports, and exports.",
    architecture:
      "A Laravel 12 and MySQL application uses Blade, Tailwind CSS, Alpine.js, and Chart.js for responsive role-specific workflows, with scheduled jobs for notifications and dedicated reporting services.",
    technologies: [
      "Laravel 12",
      "PHP 8.2",
      "MySQL",
      "Tailwind CSS",
      "Alpine.js",
      "Chart.js",
    ],
    delivery: [
      "Granular role and permission checks, inactivity timeout, and audit logging",
      "62 automated test methods across 20 test files cover access and service workflows",
      "Validated requests plus PDF, CSV, and Excel reporting and export paths",
    ],
    result: "8 service areas · 3 user groups",
    resultLabel:
      "One system for records, requests, appointments, complaints, finance, reports, and communications",
    proofLabel: "Explore implementation",
  },
  {
    matchTitle: "AmoraCare",
    projectId: 14,
    fallbackImage: "1784701416782-345718058-amor1.png",
    label: "Enterprise-style case management",
    title: "AmoraCare",
    summary:
      "A role-based adoption and donation platform combining sensitive case operations with explainable, human-reviewed AI assistance.",
    problem:
      "Adoption work involves sensitive profiles, extensive document requirements, multi-stage reviews, matching decisions, donations, and legal guidance that are difficult to coordinate safely in disconnected tools.",
    contribution:
      "I developed the full-stack case, document, donation, reporting, and matching workflows, then integrated AI-assisted legal guidance and matching explanations without replacing human review.",
    architecture:
      "Laravel and MySQL manage operational data and role workflows. A separate Django REST service handles retrieval-assisted legal guidance and matching support through a containerized API deployed on Google Cloud Run.",
    technologies: [
      "Laravel",
      "MySQL",
      "Django REST",
      "Python",
      "OpenAI API",
      "Docker",
      "Google Cloud Run",
    ],
    delivery: [
      "Protected admin, prospective-parent, and external-reviewer journeys",
      "Case-level reviewer authorization and controlled private-document access",
      "AI failures preserve deterministic scores and route decisions back to human review",
    ],
    result: "2 connected services · 3 protected journeys",
    resultLabel:
      "Operational case management and AI assistance remain separated, maintainable, and independently deployable",
    proofLabel: "Review system architecture",
  },
];

type FlagshipCaseStudiesProps = {
  projects: Project[];
};

function findProject(projects: Project[], matchTitle: string) {
  const normalizedMatch = matchTitle.toLowerCase();

  return projects.find((project) =>
    project.title.toLowerCase().includes(normalizedMatch)
  );
}

function FlagshipCaseStudies({ projects }: FlagshipCaseStudiesProps) {
  return (
    <section
      className="flagship-case-studies"
      aria-labelledby="flagship-case-studies-title"
    >
      <div className="flagship-heading">
        <div>
          <p className="section-kicker flagship-kicker">Selected Work</p>

          <h2 id="flagship-case-studies-title">
            Three systems. Real engineering decisions.
          </h2>
        </div>

        <p>
          Recruiter-ready case studies covering the problem, my contribution,
          architecture, delivery practices, and evidence behind each build.
        </p>
      </div>

      <div className="flagship-list">
        {flagshipCaseStudies.map((caseStudy, index) => {
          const project = findProject(projects, caseStudy.matchTitle);
          const image =
            project?.image ||
            project?.images?.[0]?.image ||
            caseStudy.fallbackImage;
          const githubUrl =
            project?.github_url || caseStudy.fallbackGithubUrl || "";
          const projectId = project?.id || caseStudy.projectId;

          return (
            <article
              className={`flagship-card ${index % 2 === 1 ? "is-reversed" : ""}`}
              key={caseStudy.title}
            >
                <div className="flagship-visual">
                  <div className="flagship-visual-placeholder">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{caseStudy.title}</strong>
                  </div>

                  {image && (
                    <img
                      src={getThumbnailUrl(image, 1200)}
                      alt={`${caseStudy.title} interface preview`}
                      className={index === 0 ? "flagship-image-contain" : undefined}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  <div className="flagship-visual-topline">
                    <span>Case {String(index + 1).padStart(2, "0")}</span>
                    <span>{caseStudy.label}</span>
                  </div>

                  <div className="flagship-result-card">
                    <strong>{caseStudy.result}</strong>
                    <span>{caseStudy.resultLabel}</span>
                  </div>
                </div>

                <div className="flagship-content">
                  <p className="flagship-label">{caseStudy.label}</p>
                  <h3>{caseStudy.title}</h3>
                  <p className="flagship-summary">{caseStudy.summary}</p>

                  <div className="flagship-story-grid">
                    <section>
                      <span>01 · Business problem</span>
                      <p>{caseStudy.problem}</p>
                    </section>

                    <section>
                      <span>02 · My contribution</span>
                      <p>{caseStudy.contribution}</p>
                    </section>

                    <section className="flagship-architecture">
                      <span>03 · Architecture</span>
                      <p>{caseStudy.architecture}</p>
                    </section>
                  </div>

                  <div className="flagship-stack" aria-label="Technologies used">
                    {caseStudy.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <div className="flagship-delivery">
                    <span>Security, testing &amp; deployment</span>
                    <ul>
                      {caseStudy.delivery.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flagship-actions">
                    <Link to={`/projects/${projectId}`} className="btn">
                      {caseStudy.proofLabel}
                    </Link>

                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flagship-text-link"
                      >
                        GitHub repository <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    {project?.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flagship-text-link"
                      >
                        Live system <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
            </article>
          );
        })}
      </div>

      <div className="flagship-footer">
        <p>
          Want the broader picture? The archive includes healthcare, GIS,
          networking, commercial, and experimental systems.
        </p>
        <Link to="/projects" className="btn flagship-all-projects-btn">
          Explore all projects
        </Link>
      </div>
    </section>
  );
}

export default FlagshipCaseStudies;
