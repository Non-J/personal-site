import type { GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Language } from 'src/i18n/lang';

type MakeGetStaticPathsType = (lang: Language) => GetStaticPaths;
export interface BlogPostStaticPathType {
	// Indicates whether this blog post should be rendered, or should show as "not availiable in this language"
	should_render_post: boolean;
	post: CollectionEntry<'blog'>;
};

/**
 * Create the getStaticPaths functions to export for Astro dynamic path
 * @param lang The language
 * @returns getStaticPaths function to export
 */
export const makeGetStaticPaths = ((lang: Language) => {
	if (lang === defaultLocale) {
		// The function for default language
		return async () => {
			const allPosts = await getCollection('blog');

			// return posts whose slug doesn't have "/", which indicates default locale
			return allPosts
				.filter((post) => !post.slug.includes('/'))
				.map((post) => {
					return {
						params: { slug: post.slug },
						props: { should_render_post: true, post } satisfies BlogPostStaticPathType,
					};
				});
		};
	} else {
		// The function for non-default languages
		return async () => {
			const all_posts = await getCollection('blog');

			let found_posts: Set<string> = new Set();
			let result = [];

			// first add posts whose slug start with "${lang}/", which indicates the desired locale
			for (const post of all_posts) {
				if (post.slug.startsWith(lang + '/')) {
					const slug = post.slug.substring(lang.length + 1);
					found_posts.add(slug);

					result.push({
						params: { slug },
						props: {
							should_render_post: true,
							post,
						} satisfies BlogPostStaticPathType,
					});
				}
			}

			// then add missing default-locale posts, but with should render post marked as false
			for (const post of all_posts) {
				if (!post.slug.includes('/') && !found_posts.has(post.slug)) {
					result.push({
						params: { slug: post.slug },
						props: {
							should_render_post: false,
							post,
						} satisfies BlogPostStaticPathType,
					});
				}
			}

			return result;
		};
	}
}) satisfies MakeGetStaticPathsType;
