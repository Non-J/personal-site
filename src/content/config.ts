import { z, defineCollection } from 'astro:content';

export const blogSchema = z.object({
	title: z.string(),
	tagline: z.string(),
	tags: z.array(z.string()).optional(),
	hidden: z.boolean(),
	publication_date: z.coerce.date(),
	update_date: z.coerce.date().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema,
});

export const collections = {
	blog: blogCollection,
};
