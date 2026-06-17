import { z } from "zod";

export const ProjectStatusSchema = z.enum([
  "Completed",
  "Research",
  "In Review",
  "OSS",
  "Live",
  "Shipped",
]);

export const ProjectAccentSchema = z.enum(["cyan", "violet", "pink"]);

export const ProjectTagSchema = z.enum(["AI", "DevOps", "Mobile", "IoT", "Research"]);

export const ProjectScreenshotSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const ProjectArchitectureSchema = z.object({
  overview: z.string().optional(),
  diagram: z.string().url().optional(),
  components: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),
});

export const ProjectDetailSchema = z.object({
  overview: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase kebab-case",
  }),
  description: z.string(),
  detail: ProjectDetailSchema.optional(),
  problem: z.array(z.string()).optional(),
  solution: z.array(z.string()).optional(),
  architecture: ProjectArchitectureSchema.optional(),
  features: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  futureEnhancements: z.array(z.string()).optional(),
  screenshots: z.array(ProjectScreenshotSchema).optional(),
  tags: z.array(ProjectTagSchema),
  stack: z.array(z.string()),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  status: ProjectStatusSchema,
  accent: ProjectAccentSchema,
});

export const ProjectsSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
export type ProjectAccent = z.infer<typeof ProjectAccentSchema>;
export type ProjectTag = z.infer<typeof ProjectTagSchema>;
export type ProjectScreenshot = z.infer<typeof ProjectScreenshotSchema>;
export type ProjectArchitecture = z.infer<typeof ProjectArchitectureSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
