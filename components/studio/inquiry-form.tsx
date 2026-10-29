"use client";
import { useRef, useState } from "react";
import { type Locale, pick, site } from "@/config/site";
import { projectTypes, validateInquiry } from "@/lib/inquiry";

export function InquiryForm({
  locale,
  configured,
  initialService,
}: {
  locale: Locale;
  configured: boolean;
  initialService?: string;
}) {
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "error" | "draft"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const status = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const typeLabels =
    locale === "id"
      ? [
          "Website bisnis",
          "Aplikasi web",
          "Aplikasi mobile",
          "API / integrasi",
          "Pemeliharaan",
          "Lainnya",
        ]
      : [
          "Business website",
          "Web application",
          "Mobile application",
          "API / integration",
          "Maintenance",
          "Other",
        ];
  const budgetValues = [
    "",
    "under-3m",
    "3-10m",
    "10-25m",
    "25-50m",
    "above-50m",
  ];
  const budgetLabels =
    locale === "id"
      ? [
          "Belum ditentukan",
          "Di bawah Rp3 juta",
          "Rp3–10 juta",
          "Rp10–25 juta",
          "Rp25–50 juta",
          "Di atas Rp50 juta",
        ]
      : [
          "Not decided yet",
          "Under Rp3 million",
          "Rp3–10 million",
          "Rp10–25 million",
          "Rp25–50 million",
          "Above Rp50 million",
        ];
  const emailHref =
    "mailto:" +
    site.email +
    "?subject=" +
    encodeURIComponent(
      pick(locale, "Konsultasi proyek — ARIES.", "Project inquiry — ARIES."),
    ) +
    "&body=" +
    encodeURIComponent(draft);
  const announce = () => requestAnimationFrame(() => status.current?.focus());

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const fieldErrors: Record<string, string> = {};
    for (const control of Array.from(form.elements)) {
      if (
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement ||
        control instanceof HTMLSelectElement
      ) {
        if (!control.checkValidity())
          fieldErrors[control.name] = pick(
            locale,
            "Periksa kolom ini.",
            "Please check this field.",
          );
      }
    }
    if (!String(payload.name || "").trim())
      fieldErrors.name = pick(
        locale,
        "Masukkan nama Anda.",
        "Enter your name.",
      );
    if (String(payload.description || "").trim().length < 20)
      fieldErrors.description = pick(
        locale,
        "Ceritakan kebutuhan Anda dalam minimal 20 karakter.",
        "Describe your project in at least 20 characters.",
      );
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setState("error");
      setMessage(
        pick(
          locale,
          "Periksa kolom yang ditandai sebelum melanjutkan.",
          "Check the marked fields before continuing.",
        ),
      );
      (
        form.elements.namedItem(Object.keys(fieldErrors)[0]) as HTMLElement
      )?.focus();
      return;
    }
    const data = validateInquiry({ ...payload, locale });
    if (!data) {
      setState("error");
      setMessage(
        pick(
          locale,
          "Periksa kembali nama, email, dan deskripsi Anda.",
          "Please check your name, email, and description.",
        ),
      );
      announce();
      return;
    }
    if (!configured) {
      const summary = [
        pick(
          locale,
          "Halo Aries, saya ingin mendiskusikan proyek berikut.",
          "Hi Aries, I would like to discuss the following project.",
        ),
        "",
        pick(locale, "Nama: ", "Name: ") + data.name,
        "Email: " + data.email,
        pick(locale, "Jenis proyek: ", "Project type: ") +
          typeLabels[projectTypes.indexOf(data.project)],
        ...(data.company
          ? [pick(locale, "Perusahaan: ", "Company: ") + data.company]
          : []),
        ...(data.phone
          ? [pick(locale, "Kontak: ", "Contact: ") + data.phone]
          : []),
        ...(data.budget
          ? [
              pick(locale, "Anggaran: ", "Budget: ") +
                budgetLabels[budgetValues.indexOf(data.budget)],
            ]
          : []),
        ...(data.timeline
          ? [pick(locale, "Target waktu: ", "Timeline: ") + data.timeline]
          : []),
        "",
        data.description,
      ].join("\n");
      setDraft(summary);
      setCopied(false);
      setState("draft");
      setMessage(
        pick(
          locale,
          "Draf siap. Buka aplikasi email atau salin ringkasan di bawah. Pesan belum dikirim.",
          "Your draft is ready. Open your email app or copy the brief below. Nothing has been sent.",
        ),
      );
      announce();
      return;
    }
    busy.current = true;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setState("error");
        setMessage(
          result.code === "rate_limit"
            ? pick(
                locale,
                "Terlalu banyak percobaan. Tunggu 10 menit atau hubungi saya melalui email.",
                "Too many attempts. Please wait 10 minutes or email me directly.",
              )
            : pick(
                locale,
                "Pesan belum terkirim. Isian Anda tetap tersimpan di halaman ini. Coba lagi atau hubungi saya melalui email.",
                "Your message was not sent. Your answers are still here. Try again or email me directly.",
              ),
        );
      } else {
        setState("success");
        setMessage(
          pick(
            locale,
            "Terima kasih. Pesan Anda sudah diterima untuk dikirim melalui email. Saya akan meninjau kebutuhan proyek Anda.",
            "Thank you. Your inquiry has been accepted for email delivery. I’ll review your project needs.",
          ),
        );
        form.reset();
        window.dispatchEvent(new CustomEvent("studio:conversion"));
      }
    } catch {
      setState("error");
      setMessage(
        pick(
          locale,
          "Koneksi terputus atau layanan belum merespons. Isian Anda tetap tersedia; coba lagi atau gunakan email langsung.",
          "The connection failed or the service did not respond. Your answers are preserved; try again or email me directly.",
        ),
      );
    } finally {
      busy.current = false;
      announce();
    }
  }
  const input = (
    name: string,
    label: string,
    type = "text",
    required = false,
    maxLength = 120,
  ) => (
    <label htmlFor={"inquiry-" + name}>
      {label}
      {required ? " *" : ""}
      <input
        id={"inquiry-" + name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "company"
                ? "organization"
                : name === "phone"
                  ? "tel"
                  : "off"
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? name + "-error" : undefined}
      />
      {errors[name] && (
        <span className="field-error" id={name + "-error"}>
          {errors[name]}
        </span>
      )}
    </label>
  );
  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      noValidate
      aria-busy={state === "sending"}
    >
      <div className="form-heading">
        <p className="eyebrow">
          {pick(locale, "RINGKASAN PROYEK", "YOUR PROJECT BRIEF")}
        </p>
        <h2>
          {pick(
            locale,
            "Mulai dari kebutuhan Anda.",
            "Start with what you need.",
          )}
        </h2>
        <p>
          {configured
            ? pick(
                locale,
                "Empat kolom utama untuk memulai percakapan. * Wajib diisi.",
                "Four essentials to start the conversation. * Required fields.",
              )
            : pick(
                locale,
                "Formulir ini menyiapkan draf email. Anda meninjau dan mengirimnya melalui aplikasi email Anda. * Wajib diisi.",
                "This form prepares an email draft. You review and send it from your email app. * Required fields.",
              )}
        </p>
      </div>
      <fieldset disabled={state === "sending"}>
        <legend className="sr-only">
          {pick(locale, "Detail proyek", "Project details")}
        </legend>
        <div className="form-grid">
          {input(
            "name",
            pick(locale, "Nama lengkap", "Full name"),
            "text",
            true,
          )}
          {input("email", "Email", "email", true, 254)}
        </div>
        <label htmlFor="inquiry-project">
          {pick(locale, "Jenis proyek", "Project type")} *
          <select
            id="inquiry-project"
            name="project"
            required
            defaultValue={
              projectTypes.includes(initialService ?? "") ? initialService : ""
            }
            aria-invalid={!!errors.project}
            aria-describedby={errors.project ? "project-error" : undefined}
          >
            <option value="" disabled>
              {pick(locale, "Pilih jenis proyek", "Select a project type")}
            </option>
            {projectTypes.map((v, i) => (
              <option value={v} key={v}>
                {typeLabels[i]}
              </option>
            ))}
          </select>
          {errors.project && (
            <span className="field-error" id="project-error">
              {errors.project}
            </span>
          )}
        </label>
        <label htmlFor="inquiry-description">
          {pick(
            locale,
            "Apa yang ingin Anda bangun?",
            "What would you like to build?",
          )}{" "}
          *
          <textarea
            id="inquiry-description"
            name="description"
            required
            minLength={20}
            maxLength={5000}
            rows={5}
            aria-invalid={!!errors.description}
            aria-describedby={
              "description-hint" +
              (errors.description ? " description-error" : "")
            }
            placeholder={pick(
              locale,
              "Ceritakan tujuan, kendala, dan siapa yang akan menggunakan aplikasinya.",
              "Share the goal, the challenge, and who will use it.",
            )}
          />
          <small id="description-hint">
            {pick(
              locale,
              "20–5.000 karakter. Jangan sertakan informasi rahasia.",
              "20–5,000 characters. Please omit confidential information.",
            )}
          </small>
          {errors.description && (
            <span className="field-error" id="description-error">
              {errors.description}
            </span>
          )}
        </label>
        <details className="optional-fields">
          <summary>
            {pick(
              locale,
              "Tambahkan konteks (opsional)",
              "Add more context (optional)",
            )}{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="form-grid">
            {input(
              "company",
              pick(locale, "Bisnis / perusahaan", "Business / company"),
            )}
            {input(
              "phone",
              pick(locale, "Nomor kontak", "Contact number"),
              "tel",
              false,
              40,
            )}
            <label htmlFor="inquiry-budget">
              {pick(locale, "Perkiraan anggaran", "Estimated budget")}
              <select id="inquiry-budget" name="budget" defaultValue="">
                {budgetValues.map((v, i) => (
                  <option value={v} key={v}>
                    {budgetLabels[i]}
                  </option>
                ))}
              </select>
            </label>
            {input(
              "timeline",
              pick(locale, "Target waktu", "Desired timeline"),
            )}
          </div>
        </details>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <p className="form-note">
          {pick(
            locale,
            "Informasi Anda hanya digunakan untuk menanggapi kebutuhan proyek ini.",
            "Your information is used only to respond to this project inquiry.",
          )}{" "}
          {configured &&
            pick(
              locale,
              "Pesan dikirim melalui penyedia layanan email.",
              "Messages pass through an email provider.",
            )}
        </p>
        <button className="button" type="submit" disabled={state === "sending"}>
          {state === "sending"
            ? pick(locale, "Mengirim…", "Sending…")
            : configured
              ? pick(locale, "Kirim kebutuhan proyek", "Send project inquiry")
              : pick(locale, "Siapkan draf email", "Prepare email draft")}{" "}
          <span aria-hidden="true">↗︎</span>
        </button>
      </fieldset>
      <div
        ref={status}
        tabIndex={-1}
        role={state === "error" ? "alert" : "status"}
        className={"form-status " + state}
      >
        {message}
      </div>
      {state === "draft" && (
        <div className="draft-preview">
          <label htmlFor="email-draft">
            {pick(locale, "Ringkasan untuk email", "Your email brief")}
            <textarea id="email-draft" value={draft} readOnly rows={6} />
          </label>
          <div className="actions">
            <a className="button" href={emailHref}>
              {pick(locale, "Buka aplikasi email", "Open email app")} ↗︎
            </a>
            <button
              className="text-link"
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(draft);
                  setCopied(true);
                } catch {
                  setMessage(
                    pick(
                      locale,
                      "Pilih dan salin ringkasan secara manual.",
                      "Select and copy the brief manually.",
                    ),
                  );
                }
              }}
            >
              {copied
                ? pick(locale, "Tersalin", "Copied")
                : pick(locale, "Salin ringkasan", "Copy brief")}
            </button>
          </div>
          <p className="form-note">
            {pick(
              locale,
              "Jika aplikasi email tidak terbuka, salin ringkasan dan kirim ke ",
              "If your email app does not open, copy the brief and send it to ",
            )}
            <a href={"mailto:" + site.email}>{site.email}</a>.
          </p>
        </div>
      )}
    </form>
  );
}
