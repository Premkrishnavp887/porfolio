export const THEME_STORAGE_KEY = "astro-portfolio-theme" as const;
export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)" as const;
export const DEFAULT_THEME = "system" as const;

export const SUPPORTED_THEMES = ["dark", "light", "system"] as const;
export type Theme = (typeof SUPPORTED_THEMES)[number];
