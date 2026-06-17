import { z } from "zod";

export const PostEntrySchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readTime: z.string(),
  tag: z.string(),
  url: z.string().optional(),
});

export const PostsSchema = z.array(PostEntrySchema);

export type PostEntry = z.infer<typeof PostEntrySchema>;
