"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Analytics, track, type BeforeSend } from "@vercel/analytics/react";

const subscribe = () => () => {};
function permitsAnalytics() {
  return (
    navigator.doNotTrack !== "1" &&
    !(navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  );
}
const knownPath =
  /^\/(id|en)(?:\/(?:services|about|experience|contact|resume|work(?:\/(?:velutara|veritik|enterprise|radiation-monitor))?))?\/?$/;
const beforeSend: BeforeSend = (event) => {
  if (!permitsAnalytics()) return null;
  const url = new URL(event.url);
  if (!knownPath.test(url.pathname)) return null;
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
};
export function AnalyticsEvents() {
  const path = usePathname();
  const permitted = useSyncExternalStore(
    subscribe,
    permitsAnalytics,
    () => false,
  );
  const enabled =
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && permitted;
  useEffect(() => {
    if (!enabled || !knownPath.test(path)) return;
    const click = (event: MouseEvent) => {
      if (!permitsAnalytics() || !(event.target instanceof Element)) return;
      const name = event.target
        .closest("[data-event]")
        ?.getAttribute("data-event");
      if (
        name &&
        ["contact_cta", "whatsapp_cta", "service_inquiry"].includes(name)
      )
        track(name, { path });
    };
    const conversion = () => {
      if (permitsAnalytics()) track("inquiry_submitted", { path });
    };
    document.addEventListener("click", click);
    window.addEventListener("studio:conversion", conversion);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("studio:conversion", conversion);
    };
  }, [enabled, path]);
  return enabled ? (
    <Analytics beforeSend={beforeSend} path={path} debug={false} />
  ) : null;
}
