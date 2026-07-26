import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { projects } from "@/data/projects";

export function FeaturedProject() {
  const project = projects[0];

  return (
    <article className="featured-project">
      <div className="featured-project-head">
        <p className="eyebrow">01 / Flagship product</p>
        <p className="featured-project-state">{project.detail}</p>
      </div>
      <div className="featured-project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <Link
        className="veritik-visual veritik-visual-real"
        href={project.href ?? "/work"}
        aria-label="View the Veritik case study"
      >
        <Image
          src="/images/work/veritik/banner-veritik.png"
          alt="Veritik candidate ranking, recruitment pipeline, and comparison product interface"
          fill
          priority
          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1200px) calc(100vw - 48px), 1180px"
        />
        <span className="real-visual-label">Veritik / Product overview</span>
      </Link>
      <div className="featured-project-foot">
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <Link className="project-case-link" href={project.href ?? "/work"}>
          View case study <ArrowUpRight className="inline-icon" />
        </Link>
      </div>
    </article>
  );
}
