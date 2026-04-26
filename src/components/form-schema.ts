import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title kamti ma 3 characters ko hunu parchha"),
  content: z.string().min(10, "Content kamti ma 10 characters ko hunu parchha"),
});

export type PostFormData = z.infer<typeof postSchema>;