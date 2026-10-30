import Image from "next/image";
import { type Locale, pick } from "@/config/site";
import agile from "@/public/images/achievements/agile-ranger-2024.webp";
import gnovation from "@/public/images/achievements/gnovation-2023-ceremony.webp";
import certificate from "@/public/images/achievements/inovy-2023-certificate.webp";

export function AchievementGallery({ locale }: { locale: Locale }) {
  const groups = [
    { title: "The Best Agile Ranger", issuer: "PT Global Service Indonesia", year: "2024", images: [
      { src: agile, caption: pick(locale, "Penyerahan penghargaan The Best Agile Ranger", "The Best Agile Ranger award presentation") },
    ] },
    { title: "1st Winner Full Year GNOVATION Award", issuer: "PT Global Service Indonesia", year: "2023", images: [
      { src: gnovation, caption: pick(locale, "Penyerahan penghargaan GNOVATION 2023", "GNOVATION 2023 award ceremony") },
    ] },
    { title: "Grand Finalist INOVY Competition", issuer: "Yayasan Karya Bakti United Tractors", year: "2023", images: [
      { src: certificate, caption: pick(locale, "Piagam Grand Finalist INOVY Competition 2023", "Grand Finalist INOVY Competition 2023 certificate") },
    ] },
  ];
  return (
    <section className="achievement-gallery" aria-labelledby="achievement-gallery-title">
      <div className="section-heading"><div>
        <p className="eyebrow">{pick(locale, "DOKUMENTASI PRESTASI", "AWARDS IN PICTURES")}</p>
        <h2 id="achievement-gallery-title">{pick(locale, "Momen dan pengakuan.", "Moments of recognition.")}</h2>
        <p>{pick(locale, "Pilih foto untuk melihat ukuran penuh.", "Select a photo to view it at full size.")}</p>
      </div></div>
      <div className="achievement-grid">
        {groups.map(group => <article className="achievement-card" key={group.title}>
          <p className="eyebrow">{pick(locale, "Desember ", "December ")}{group.year}</p>
          <h3>{group.title}</h3><p className="achievement-issuer">{group.issuer}</p>
          <div className="achievement-photos">{group.images.slice(0, 1).map(photo => <figure key={photo.src.src}>
            <a href={photo.src.src} target="_blank" rel="noopener noreferrer" aria-label={photo.caption + pick(locale, " (buka foto di tab baru)", " (open photo in a new tab)")}>
              <Image src={photo.src} alt={photo.caption} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 380px" />
            </a><figcaption>{photo.caption}</figcaption>
          </figure>)}</div>
        </article>)}
      </div>
    </section>
  );
}
