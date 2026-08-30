import { Link } from "react-router-dom";
import { getThumbnailUrl } from "../api/client";
import {
  findProjectForCaseStudy,
  flagshipCaseStudies,
  PROJECT_OWNERSHIP_LABEL,
  PROJECT_OWNERSHIP_STATEMENT,
} from "../data/projectCaseStudies";
import type { Project } from "../types";

type FlagshipCaseStudiesProps = {
  projects: Project[];
};

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
          const project = findProjectForCaseStudy(projects, caseStudy);
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
                <div className="flagship-ownership-note">
                  <strong>{PROJECT_OWNERSHIP_LABEL}</strong>
                  <span>{PROJECT_OWNERSHIP_STATEMENT}</span>
                </div>
                <h3>{caseStudy.title}</h3>
                <p className="flagship-summary">{caseStudy.summary}</p>

                <div className="flagship-story-grid">
                  <section>
                    <span>01 · Business problem</span>
                    <p>{caseStudy.problem}</p>
                  </section>

                  <section>
                    <span>02 · Sole development</span>
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
