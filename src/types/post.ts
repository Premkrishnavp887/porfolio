import type { z } from "zod";
import { PostEntrySchema } from "@/schemas/post.schema";

export type PostEntry = z.infer<typeof PostEntrySchema>;
