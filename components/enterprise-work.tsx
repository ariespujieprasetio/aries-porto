import { projects } from "@/data/projects";

export function EnterpriseWork() {
  return (
    <div className="enterprise-work">
      {projects.slice(1).map((project) => (
        <article className="enterprise-work-row" key={project.slug}>
          <div className="enterprise-work-meta">
            <span>{project.index}</span>
            <span>{project.category}</span>
          </div>
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className="enterprise-work-scope">
            <p>{project.tags.join(" / ")}</p>
            <span>Professional work · Limited detail</span>
          </div>
        </article>
      ))}
    </div>
  );
}
