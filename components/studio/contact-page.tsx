import { type Locale, pick, site, whatsappUrl } from "@/config/site";
import { inquiryConfig } from "@/lib/inquiry-config";
import { Intro } from "./shared";
import { InquiryForm } from "./inquiry-form";
export function ContactPage({
  locale,
  initialService,
}: {
  locale: Locale;
  initialService?: string;
}) {
  const config = inquiryConfig();
  const whatsapp = whatsappUrl(locale);
  return (
    <>
      <Intro
        eyebrow={pick(
          locale,
          "KONTAK / MULAI DARI PERCAKAPAN",
          "CONTACT / START WITH A CONVERSATION",
        )}
        title={pick(
          locale,
          "Ceritakan apa yang ingin Anda bangun.",
          "Tell me what you want to build.",
        )}
        description={pick(
          locale,
          "Tidak harus punya spesifikasi lengkap. Ceritakan tujuan, tantangan, atau ide awal Anda—kita tentukan langkah berikutnya bersama.",
          "You don’t need a finished specification. Share your goals, challenges, or early idea, and we’ll work out the next step together.",
        )}
      />
      <section className="section shell contact-layout">
        <aside>
          <p className="eyebrow">
            {pick(locale, "KONTAK LANGSUNG", "DIRECT CONTACT")}
          </p>
          <a
            className="contact-email"
            data-event="contact_cta"
            href={"mailto:" + site.email}
          >
            {site.email} ↗︎
          </a>
          <p>Jakarta, Indonesia · UTC+7</p>
          {whatsapp && (
            <a
              className="button secondary"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              data-event="whatsapp_cta"
            >
              WhatsApp ↗︎
            </a>
          )}
          <div className="contact-expectations">
            <h2>
              {pick(locale, "Setelah menghubungi saya", "What happens next")}
            </h2>
            <ol>
              <li>
                {pick(
                  locale,
                  "Saya meninjau kebutuhan dan konteks proyek Anda.",
                  "I review your needs and project context.",
                )}
              </li>
              <li>
                {pick(
                  locale,
                  "Kita klarifikasi lingkup dan prioritas.",
                  "We clarify scope and priorities.",
                )}
              </li>
              <li>
                {pick(
                  locale,
                  "Anda menerima usulan langkah berikutnya.",
                  "You receive a proposed next step.",
                )}
              </li>
            </ol>
            <p>
              {pick(
                locale,
                "Anggaran kecil tetap layak dibicarakan. Kita bisa mulai dari kebutuhan paling penting.",
                "Smaller budgets are welcome. We can start with the essentials.",
              )}
            </p>
          </div>
        </aside>
        <InquiryForm
          locale={locale}
          initialService={initialService}
          siteKey={config.siteKey}
          configured={config.ready}
        />
      </section>
    </>
  );
}
