import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowRight } from "@/components/icons";

export function ProjectList({ limit }: { limit?: number }) {
  return (
    <div className="project-list">
      {projects.slice(0, limit).map((project) => {
        const content = (
          <>
            <div className="project-meta">
              <span>{project.index}</span>
              <span>{project.category}</span>
            </div>
            <div className="project-main">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="project-aside">
              <p>{project.detail}</p>
              {project.href ? <ArrowRight className="project-arrow" /> : <span className="confidential">Private work</span>}
            </div>
          </>
        );
        return project.href ? (
          <Link className="project-row" href={project.href} key={project.slug}>{content}</Link>
        ) : (
          <article className="project-row" key={project.slug}>{content}</article>
        );
      })}
    </div>
  );
}
