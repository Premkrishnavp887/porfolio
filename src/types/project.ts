import type { z } from "zod";
import {
  ProjectAccentSchema,
  ProjectArchitectureSchema,
  ProjectSchema,
  ProjectScreenshotSchema,
  ProjectStatusSchema,
  ProjectTagSchema,
} from "@/schemas/project.schema";

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
export type ProjectAccent = z.infer<typeof ProjectAccentSchema>;
export type ProjectTag = z.infer<typeof ProjectTagSchema>;
export type ProjectScreenshot = z.infer<typeof ProjectScreenshotSchema>;
export type ProjectArchitecture = z.infer<typeof ProjectArchitectureSchema>;
