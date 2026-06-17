import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_THEME,
  SYSTEM_THEME_QUERY,
  SUPPORTED_THEMES,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/config/themeConfig";

const isTheme = (value: unknown): value is Theme => SUPPORTED_THEMES.includes(value as Theme);

const resolveThemeClass = (theme: Theme) => {
  if (theme === "system") {
    return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
  }
  return theme;
};

const applyThemeClass = (theme: Theme) => {
  const resolved = resolveThemeClass(theme);
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(resolved);
  html.dataset.theme = theme;
};

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : DEFAULT_THEME;
}

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return getStoredTheme();
}

export function setStoredTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyThemeClass(theme);
}

export function getPreferredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

export const themeScript = `(() => {
  try {
    const STORAGE_KEY = '${THEME_STORAGE_KEY}';
    const MEDIA_QUERY = '${SYSTEM_THEME_QUERY}';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(MEDIA_QUERY).matches;
    const theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    console.error(error);
  }
})();`;

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyThemeClass(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setStoredTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const media = window.matchMedia(SYSTEM_THEME_QUERY);
    const listener = () => applyThemeClass("system");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [mounted, theme]);

  const value = useMemo(() => ({ theme, setTheme, mounted }), [theme, mounted]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export type { Theme };
