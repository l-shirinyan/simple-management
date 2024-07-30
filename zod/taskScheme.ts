import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  published: z.boolean().optional(),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, "Tag name is required"),
      })
    )
    .optional(),
  users: z
    .array(
      z.object({
        userId: z.number().int().positive(),
      })
    )
    .optional(),
});
