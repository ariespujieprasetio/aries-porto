import { type Locale, pick } from "@/config/site";

export function WebsitePackage({ locale }: { locale: Locale }) {
  const groups =
    locale === "id"
      ? [
          [
            "Termasuk dalam paket awal",
            [
              "Company profile hingga 3 halaman, misalnya Beranda, Tentang, dan Kontak.",
              "1 bahasa (Indonesia atau Inggris), tampilan responsif untuk ponsel dan desktop.",
              "1 putaran revisi terkoordinasi sesuai lingkup yang disepakati.",
              "Pemasangan teks, logo, dan gambar yang disediakan klien.",
              "Tautan WhatsApp/email, judul dan deskripsi SEO dasar, serta bantuan deployment awal.",
            ],
          ],
          [
            "Opsional, dengan penawaran terpisah",
            [
              "Halaman tambahan, bahasa kedua, CMS, atau penulisan konten.",
              "Formulir dengan pengiriman server, integrasi, katalog, atau transaksi online.",
              "Revisi tambahan dan pemeliharaan berkelanjutan.",
            ],
          ],
          [
            "Tidak termasuk biaya awal",
            [
              "Pembelian/perpanjangan domain, hosting berbayar, dan biaya layanan pihak ketiga.",
              "Pembuatan logo, fotografi, dan materi konten baru.",
              "Dukungan rutin setelah serah terima; disepakati terpisah jika diperlukan.",
            ],
          ],
        ]
      : [
          [
            "Included in the starting package",
            [
              "A company profile with up to 3 pages, such as Home, About, and Contact.",
              "1 language (Indonesian or English), responsive layouts for phones and desktops.",
              "1 consolidated revision round within the agreed scope.",
              "Placement of client-supplied text, logo, and images.",
              "WhatsApp/email links, basic SEO titles and descriptions, and initial deployment assistance.",
            ],
          ],
          [
            "Optional, quoted separately",
            [
              "Additional pages, a second language, a CMS, or copywriting.",
              "Server-delivered forms, integrations, a catalogue, or online transactions.",
              "Additional revisions and ongoing maintenance.",
            ],
          ],
          [
            "Excluded from the starting price",
            [
              "Domain registration/renewals, paid hosting, and third-party service fees.",
              "Logo design, photography, and new content production.",
              "Routine support after handover; agreed separately if needed.",
            ],
          ],
        ];
  return (
    <div className="package-scope">
      <h3>
        {pick(
          locale,
          "Paket awal untuk UMKM",
          "A starting package for small businesses",
        )}
      </h3>
      {groups.map(([title, items]) => (
        <div key={title as string}>
          <h4>{title}</h4>
          <ul>
            {(items as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="form-note">
        {pick(
          locale,
          "Konten disiapkan klien sebelum pengerjaan. Jumlah halaman, jadwal, dan penawaran akhir dikonfirmasi tertulis sebelum proyek dimulai.",
          "Clients supply content before work begins. Page count, schedule, and the final quotation are confirmed in writing before the project starts.",
        )}
      </p>
    </div>
  );
}
