import { projects } from "@/data/projects";

export function EnterpriseWork() {
  const professional = projects.slice(1, 3);
  const specialized = projects.slice(3);

  return (
    <>
      <div className="enterprise-work">
        {professional.map((project) => (
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
      <div className="specialized-work">
        <p className="eyebrow">Earlier / specialized engineering</p>
        {specialized.map((project) => (
          <article key={project.slug}>
            <div className="enterprise-work-meta"><span>{project.index}</span><span>{project.category}</span></div>
            <div><h3>{project.title}</h3><p>{project.description}</p></div>
            <p className="specialized-work-tech">{project.tags.join(" / ")}</p>
          </article>
        ))}
      </div>
    </>
  );
}
