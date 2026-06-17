import type { z } from "zod";
import { ContentSchema } from "@/schemas/content.schema";

export type Content = z.infer<typeof ContentSchema>;

export type NavigationLink = Content["navigation"]["links"][number];
export type NavigationActionLabels = Content["navigation"]["actionLabels"];
export type NavigationContent = Content["navigation"];

export type CommandPaletteNavigateItem = Content["commandPalette"]["navigateItems"][number];
export type CommandPaletteLink = Content["commandPalette"]["links"][number];
export type CommandPaletteContent = Content["commandPalette"];

export type HeroCtas = Content["hero"]["ctas"];
export type HeroContent = Content["hero"];
export type AboutContent = Content["about"];
export type SkillsContent = Content["skills"];
export type ProjectsModalContent = Content["projects"]["modal"];
export type ProjectsContent = Content["projects"];
export type ExperienceContent = Content["experience"];
export type AchievementsContent = Content["achievements"];
export type WhoAmIContent = Content["whoami"];
export type BlogContent = Content["blog"];

export type ContactLinkKey = Content["contact"]["links"][number]["key"];
export type ContactLink = Content["contact"]["links"][number];
export type ContactFormContent = Content["contact"]["form"];
export type ContactFooterContent = Content["contact"]["footer"];
export type ContactContent = Content["contact"];

export type ErrorMessage = Content["errors"]["notFound"];
export type ErrorsContent = Content["errors"];
export type MetaContent = Content["meta"];
