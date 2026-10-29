"use client";
import { usePathname } from "next/navigation";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const en = usePathname().startsWith("/en");
  return (
    <section className="shell error-page">
      <p className="eyebrow">ARIES.</p>
      <h1>{en ? "Something went wrong." : "Terjadi kendala."}</h1>
      <p>
        {en
          ? "Please try loading this page again."
          : "Silakan coba muat halaman ini kembali."}
      </p>
      <button className="button" onClick={reset}>
        {en ? "Try again" : "Coba lagi"}
      </button>
    </section>
  );
}
