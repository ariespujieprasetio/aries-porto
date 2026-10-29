"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { type Locale, pick, site } from "@/config/site";
import { SpamChallenge } from "./spam-challenge";
import { projectTypes, validateInquiry } from "@/lib/inquiry";

const subscribe = () => () => {};

export function InquiryForm({
  locale,
  configured,
  initialService,
  siteKey,
}: {
  locale: Locale;
  configured: boolean;
  initialService?: string;
  siteKey: string;
}) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");
  const [challengeVersion, setChallengeVersion] = useState(0);
  const attempt = useRef({ fingerprint: "", id: "" });
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
  const announce = () => requestAnimationFrame(() => status.current?.focus());

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !configured) return;
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
    if (!token) {
      setState("error");
      setMessage(
        pick(
          locale,
          "Selesaikan verifikasi keamanan sebelum mengirim.",
          "Complete the security check before sending.",
        ),
      );
      announce();
      return;
    }
    const fingerprint = JSON.stringify(data);
    if (attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    }
    busy.current = true;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token, requestId: attempt.current.id }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (
        !response.ok ||
        result.ok !== true ||
        result.delivery !== "accepted"
      ) {
        setState("error");
        setMessage(
          result.code === "verification" ||
            result.code === "verification_unavailable"
            ? pick(
                locale,
                "Verifikasi keamanan belum berhasil. Ulangi verifikasi lalu coba lagi. Isian Anda tetap tersedia.",
                "Security verification could not be completed. Complete the check again and retry. Your answers are preserved.",
              )
            : result.code === "not_configured"
              ? pick(
                  locale,
                  "Layanan formulir sedang tidak tersedia. Isian Anda tetap tersedia; silakan gunakan email atau WhatsApp.",
                  "The inquiry service is currently unavailable. Your answers are preserved; please use email or WhatsApp.",
                )
              : result.code === "origin"
                ? pick(
                    locale,
                    "Alamat halaman tidak diizinkan untuk pengiriman. Buka website resmi atau gunakan email langsung.",
                    "This page address is not permitted to submit inquiries. Open the official website or use direct email.",
                  )
                : result.code === "rate_limit"
                  ? pick(
                      locale,
                      "Terlalu banyak percobaan. Tunggu 10 menit atau hubungi saya melalui email.",
                      "Too many attempts. Please wait 10 minutes or email me directly.",
                    )
                  : pick(
                      locale,
                      "Pengiriman belum dapat dikonfirmasi. Isian Anda tetap tersedia. Ulangi verifikasi keamanan lalu coba lagi, atau hubungi saya melalui email.",
                      "Delivery could not be confirmed. Your answers are still here. Complete the security check again and retry, or email me directly.",
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
        attempt.current = { fingerprint: "", id: "" };
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
      setToken("");
      setChallengeVersion((v) => v + 1);
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
      method="post"
      action="/api/inquiry"
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
                "Formulir sedang tidak tersedia. Silakan hubungi saya melalui email atau WhatsApp.",
                "The inquiry form is currently unavailable. Please contact me by email or WhatsApp.",
              )}
        </p>
      </div>
      {!configured && (
        <a
          className="text-link"
          data-event="contact_cta"
          href={"mailto:" + site.email}
        >
          {site.email}
        </a>
      )}
      {configured && (
        <noscript>
          <p className="form-note">
            {pick(
              locale,
              "Formulir aman ini memerlukan JavaScript. Gunakan tautan email atau WhatsApp untuk menghubungi saya.",
              "JavaScript is required for the secure form. Please use the email or WhatsApp links instead.",
            )}
          </p>
        </noscript>
      )}
      {configured && (
        <fieldset disabled={!hydrated || state === "sending"}>
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
                projectTypes.includes(initialService ?? "")
                  ? initialService
                  : ""
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
          <SpamChallenge
            key={challengeVersion}
            locale={locale}
            siteKey={siteKey}
            onToken={setToken}
          />
          <p className="form-note">
            {pick(
              locale,
              "Informasi Anda hanya digunakan untuk menanggapi kebutuhan proyek ini.",
              "Your information is used only to respond to this project inquiry.",
            )}{" "}
            {configured &&
              pick(
                locale,
                "Pengiriman menggunakan Resend; verifikasi spam menggunakan Cloudflare Turnstile.",
                "Delivery uses Resend; spam verification uses Cloudflare Turnstile.",
              )}
          </p>
          <button
            className="button"
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending"
              ? pick(locale, "Mengirim…", "Sending…")
              : pick(
                  locale,
                  "Kirim kebutuhan proyek",
                  "Send project inquiry",
                )}{" "}
            <span aria-hidden="true">↗︎</span>
          </button>
        </fieldset>
      )}
      <div
        ref={status}
        tabIndex={-1}
        role={state === "error" ? "alert" : "status"}
        className={"form-status " + state}
      >
        {message}
      </div>
    </form>
  );
}
