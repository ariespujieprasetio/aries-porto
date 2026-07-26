"use client";

import { Moon, Sun } from "@/components/icons";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const toggle = () => {
    const current = document.documentElement.dataset.theme as Theme;
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  };

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      <Sun className="icon theme-icon-light" />
      <Moon className="icon theme-icon-dark" />
    </button>
  );
}
