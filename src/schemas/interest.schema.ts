import { z } from "zod";

export const InterestIconSchema = z.enum([
  "Workflow",
  "Shield",
  "Brain",
  "Cpu",
  "Code2",
  "Puzzle",
  "Rocket",
]);

export const InterestEntrySchema = z.object({
  title: z.string(),
  blurb: z.string(),
  icon: InterestIconSchema,
});

export const InterestsSchema = z.array(InterestEntrySchema);

export type InterestEntry = z.infer<typeof InterestEntrySchema>;
export type InterestIcon = z.infer<typeof InterestIconSchema>;
