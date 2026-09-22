import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
category: z.string().min(1, "Category is required"),
author: z.string().min(1, "Author is required"),
content: z.string().min(1, "Content is required"),
thumbnail: z.instanceof(File, {message: "Thumbnail must be a file"}),
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
