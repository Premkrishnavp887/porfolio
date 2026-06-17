import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Github, Linkedin, Mail, Moon, Sun, Laptop } from "lucide-react";
import { content, profile } from "@/data";
import { useTheme } from "@/lib/theme";
import { NAV_SECTIONS, NAV_SECTION_IDS } from "@/config/navigationConfig";
import { DURATIONS, EASE, SPRINGS } from "@/config/animationConfig";

const NAV = NAV_SECTIONS;

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_SECTION_IDS;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATIONS.SLOWER, ease: EASE }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-glass" : "glass"
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-2 px-3 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-aurora text-[11px] font-bold text-background">
            {profile.shortName[0]}
          </span>
          <span className="hidden text-foreground sm:inline">{profile.shortName}</span>
        </a>
        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface/15"
                    transition={SPRINGS.NAV_ACTIVE}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-1 hidden h-5 w-px bg-border md:block" />
        <button
          onClick={cycleTheme}
          aria-label={`${content.navigation.actionLabels.themeToggle}, current mode ${theme}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-surface/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={theme}
              initial={{ opacity: 0, y: -6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: DURATIONS.ICON_SWITCH, ease: EASE }}
              className="flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Laptop className="h-4 w-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          onClick={onOpenPalette}
          aria-label={content.navigation.actionLabels.commandPalette}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface/15 hover:text-foreground"
        >
          <Command className="h-3.5 w-3.5" />
          <kbd className="hidden font-mono text-[10px] sm:inline">
            {content.navigation.actionLabels.commandPaletteShortcut}
          </kbd>
        </button>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface/15 hover:text-foreground sm:inline-flex"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface/15 hover:text-foreground sm:inline-flex"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href={profile.socials.email}
          aria-label="Email"
          className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-aurora px-3 py-1.5 text-xs font-medium text-background transition-transform hover:scale-[1.03]"
        >
          <Mail className="h-3.5 w-3.5" />
          {content.navigation.actionLabels.hireMe}
        </a>
      </nav>
    </motion.header>
  );
}
