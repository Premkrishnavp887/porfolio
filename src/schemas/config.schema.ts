import { z } from "zod";

export const ThemeSchema = z.enum(["dark", "light", "system"]);

export const ThemeConfigSchema = z.object({
  storageKey: z.string(),
  systemQuery: z.string(),
  defaultTheme: ThemeSchema,
  supportedThemes: z.array(ThemeSchema),
});

export const AnimationSpringSchema = z.object({
  type: z.literal("spring"),
  stiffness: z.number(),
  damping: z.number(),
  mass: z.number().optional(),
});

export const AnimationConfigSchema = z.object({
  durations: z.record(z.number()),
  intervals: z.record(z.number()),
  ease: z.array(z.number()),
  springs: z.record(AnimationSpringSchema),
});

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
export type AnimationConfig = z.infer<typeof AnimationConfigSchema>;
