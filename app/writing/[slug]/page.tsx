import { notFound } from "next/navigation";

export function generateStaticParams() {
  // A non-public sentinel keeps the dynamic article route exportable until
  // the first real Markdown/MDX post is added.
  return [{ slug: "__unpublished__" }];
}

export const dynamicParams = false;

export default function WritingArticlePage() {
  notFound();
}
