type SectionHeadingProps = {
  index: string;
  label: string;
  title?: string;
};

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{index}</span> / {label}</p>
      {title ? <h2>{title}</h2> : null}
    </div>
  );
}
