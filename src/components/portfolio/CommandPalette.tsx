import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Briefcase,
  Code2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Newspaper,
  Rocket,
  Trophy,
  User,
} from "lucide-react";
import { content, profile } from "@/data";
import { COMMAND_LINKS, COMMAND_NAV_ITEMS } from "@/config/navigationConfig";

const ICONS = {
  Briefcase,
  Code2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Newspaper,
  Rocket,
  Trophy,
  User,
} as const;

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  function go(id: string) {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (!open) return null;

  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 z-[90] grid place-items-start bg-background/70 px-4 pt-24 backdrop-blur-xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong w-full max-w-xl overflow-hidden rounded-2xl shadow-elevated animate-scale-in"
      >
        <Command label={content.commandPalette.label} className="">
          <div className="border-b border-glass-border px-4">
            <Command.Input
              value={q}
              onValueChange={setQ}
              autoFocus
              placeholder={content.commandPalette.placeholder}
              className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="p-4 text-sm text-muted-foreground">
              {content.commandPalette.emptyMessage}
            </Command.Empty>

            <Command.Group
              heading={content.commandPalette.navigateHeading}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {COMMAND_NAV_ITEMS.map((it) => {
                const Icon = ICONS[it.icon as keyof typeof ICONS] ?? Rocket;
                return (
                  <Command.Item
                    key={it.id}
                    onSelect={() => go(it.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground aria-selected:bg-surface/15"
                  >
                    <Icon className="h-4 w-4 text-aurora-cyan" />
                    {it.label}
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group
              heading={content.commandPalette.linksHeading}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {COMMAND_LINKS.map((item) => {
                const Icon = ICONS[item.icon as keyof typeof ICONS] ?? FileText;
                return (
                  <Command.Item
                    key={item.id}
                    onSelect={() => {
                      if (item.id === "github") window.open(profile.socials.github, "_blank");
                      if (item.id === "linkedin") window.open(profile.socials.linkedin, "_blank");
                      if (item.id === "email") window.location.href = `mailto:${profile.email}`;
                      if (item.id === "resume") window.open(profile.resumeUrl, "_blank");
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm aria-selected:bg-surface/15"
                  >
                    <Icon className="h-4 w-4" /> {item.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
