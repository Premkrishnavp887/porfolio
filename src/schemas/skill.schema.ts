import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string(),
  level: z.number(),
});

export const SkillCategorySchema = z.object({
  category: z.string(),
  icon: z.string(),
  items: z.array(SkillSchema),
});

export const SkillsSchema = z.array(SkillCategorySchema);

export type Skill = z.infer<typeof SkillSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
