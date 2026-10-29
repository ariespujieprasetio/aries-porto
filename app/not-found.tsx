import Link from "next/link";
import { headers } from "next/headers";
import { pick } from "@/config/site";

export default async function NotFound() {
  const locale = (await headers()).get("x-studio-locale") === "en" ? "en" : "id";
  return <main className="shell error-page">
    <Link className="brand" href={"/"+locale}>ARIES<span>.</span></Link>
    <p className="eyebrow">404 / {pick(locale,"HALAMAN TIDAK DITEMUKAN","PAGE NOT FOUND")}</p>
    <h1>{pick(locale,"Halaman ini tidak tersedia.","This page could not be found.")}</h1>
    <p>{pick(locale,"Alamatnya mungkin berubah. Jelajahi karya saya atau kembali ke beranda.","The address may have changed. Explore my work or return to the homepage.")}</p>
    <div className="actions"><Link className="button" href={"/"+locale}>{pick(locale,"Kembali ke beranda","Back to home")} →</Link><Link className="text-link" href={"/"+locale+"/work"}>{pick(locale,"Lihat karya","Explore my work")} →</Link></div>
  </main>;
}
