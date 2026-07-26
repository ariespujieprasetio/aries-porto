import Link from "next/link";

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow">404 / Not found</p><h1>This path doesn’t lead to a system.</h1><p>The page may have moved or hasn’t been published.</p><Link className="button" href="/">Return home</Link></section>;
}
