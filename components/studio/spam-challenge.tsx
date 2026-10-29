"use client";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Locale, pick } from "@/config/site";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

export function SpamChallenge({
  locale,
  siteKey,
  onToken,
}: {
  locale: Locale;
  siteKey: string;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const [failed, setFailed] = useState(false);
  const render = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current !== undefined)
      return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      action: "project_inquiry",
      theme: "dark",
      // Compact fits narrow form columns without horizontal overflow.
      size: "compact",
      language: locale,
      "response-field": false,
      callback: (token: string) => {
        setFailed(false);
        onToken(token);
      },
      "expired-callback": () => onToken(""),
      "error-callback": () => {
        onToken("");
        setFailed(true);
      },
    });
  }, [locale, siteKey, onToken]);
  useEffect(() => {
    render();
    return () => {
      if (widget.current !== undefined)
        window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, [render]);
  return (
    <div className="spam-challenge">
      <p className="form-note">
        {pick(locale, "Verifikasi keamanan", "Security check")}
      </p>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={render}
        onError={() => {
          onToken("");
          setFailed(true);
        }}
      />
      <div ref={container} />
      {failed && (
        <p role="alert" className="field-error">
          {pick(
            locale,
            "Verifikasi tidak dapat dimuat. Muat ulang halaman atau gunakan email langsung.",
            "Verification could not load. Reload this page or use direct email.",
          )}
        </p>
      )}
    </div>
  );
}
