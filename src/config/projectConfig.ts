import { Award, BookOpen, Medal, Trophy } from "lucide-react";

export const PROJECT_ACCENT_GRADIENTS = {
  cyan: "from-cyan-400/30 via-sky-500/10 to-transparent",
  violet: "from-violet-400/35 via-fuchsia-500/10 to-transparent",
  pink: "from-pink-400/30 via-rose-500/10 to-transparent",
} as const;

export const PROJECT_STATUS_STYLES = {
  Live: "bg-emerald-400/15 text-emerald-300 border-emerald-300/20",
  Shipped: "bg-sky-400/15 text-sky-300 border-sky-300/20",
  Research: "bg-violet-400/15 text-violet-300 border-violet-300/20",
  "In Review": "bg-amber-400/15 text-amber-300 border-amber-300/20",
  OSS: "bg-pink-400/15 text-pink-300 border-pink-300/20",
  Completed: "bg-surface/15 text-muted-foreground border-surface/30",
} as const;

export const EXPERIENCE_TYPE_TONE = {
  Internship: "text-aurora-cyan",
  Freelance: "text-aurora-pink",
  "Open Source": "text-aurora-violet",
  Hackathon: "text-amber-300",
} as const;

export const ACHIEVEMENT_TYPE_ICON = {
  Certification: Award,
  Placement: Medal,
  Competition: Trophy,
  Research: BookOpen,
} as const;

export const GITHUB_HEAT_TONE = [
  "bg-surface/10",
  "bg-cyan-500/25",
  "bg-cyan-400/50",
  "bg-violet-400/70",
  "bg-violet-300",
] as const;
