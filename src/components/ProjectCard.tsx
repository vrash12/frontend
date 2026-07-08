import { Link } from "react-router-dom";
import type { Project } from "../types";
import { getImageUrl } from "../api/client";

type ProjectImage = {
  id: number;
  project_id: number;
  image: string;
  caption?: string | null;
  created_at?: string;
};

type ProjectWithMedia = Project & {
  images?: ProjectImage[];
  video?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  featured?: number;
  published?: number;
};

type ProjectCardProps = {
  project: ProjectWithMedia;
};

function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.image || project.images?.[0]?.image || "";
  const hasVideo = Boolean(project.video);

  return (
    <article className="project-card neo-project-card hover-project-card">
      <div className="project-card-media">
  {coverImage ? (
  <img
    src={getImageUrl(coverImage)}
    alt={project.title}
    className="project-image"
  />
) : hasVideo && project.video ? (
  <video
    src={getImageUrl(project.video)}
    className="project-image project-video"
    controls
    muted
    preload="metadata"
  />
) : (
          <div className="project-placeholder">
            <span>{project.category || "Project"}</span>
          </div>
        )}

        <Link to={`/projects/${project.id}`} className="project-hover-overlay">
          <span className="project-hover-kicker">
            {hasVideo ? "Watch Build" : "Open Build"}
          </span>

          <span className="project-hover-button">Show Details</span>
        </Link>
      </div>

      <div className="project-card-content">
        <div className="blog-meta-row">
          <p className="project-category">{project.category}</p>

          {project.featured === 1 && (
            <span className="project-featured-pill">Featured</span>
          )}
        </div>

        <h2>{project.title}</h2>

        <p>{project.description}</p>

        {project.technologies && (
          <p className="project-tech">
            <strong>Tech:</strong> {project.technologies}
          </p>
        )}

        <div className="project-card-media-pills">
          {project.images && project.images.length > 0 && (
            <span>{project.images.length} image(s)</span>
          )}

          {hasVideo && <span>Video Demo</span>}
        </div>

        {(project.github_url || project.live_url) && (
          <div className="project-card-links">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                GitHub
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;