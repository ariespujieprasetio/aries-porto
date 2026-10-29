import { type Locale } from "@/config/site";
import { career } from "@/content/career";
export function Timeline({ locale }: { locale: Locale }) {
  return (
    <div className="timeline">
      {career(locale).map((role, i) => (
        <article key={role.company}>
          <div className="timeline-date">
            <span className={i === 0 ? "status-dot" : ""} />
            {role.period}
          </div>
          <div>
            <p className="eyebrow">{role.company}</p>
            <h2>{role.role}</h2>
            <p>{role.copy}</p>
            <p className="tech-line">{role.tech}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
