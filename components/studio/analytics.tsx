"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
declare global {
  interface Window {
    va?: (event: string, payload: Record<string, unknown>) => void;
  }
}
export function AnalyticsEvents() {
  const path = usePathname();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") return;
    if (/^\/(id|en)\/work\/[^/]+$/.test(path))
      window.va?.("event", { name: "project_visit", data: { path } });
    const click = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.("[data-event]");
      const name = el?.getAttribute("data-event");
      if (name) window.va?.("event", { name, data: { path } });
    };
    const conversion = () =>
      window.va?.("event", { name: "form_submission", data: { path } });
    document.addEventListener("click", click);
    window.addEventListener("studio:conversion", conversion);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("studio:conversion", conversion);
    };
  }, [path]);
  return null;
}
