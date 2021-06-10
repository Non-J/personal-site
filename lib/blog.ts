import { PostData, posts_data, PostType } from './posts_data';

export const getPostURL = (post: PostData): string => {
  switch (post.type) {
    case PostType.ExternalLink:
      return post.link;
    case PostType.Markdown:
    case PostType.HTML:
      return '/blog/' + post.slug;
  }
};

export const getFormattedPostAuthors = (post: PostData): string => {
  if (!post.authors || post.authors.length === 0) {
    return 'No Author Listed';
  }
  if (post.authors.length === 1) {
    return 'By ' + post.authors[0];
  }
  return 'By ' + post.authors.slice(0, post.authors.length - 1).join(', ') + ', and ' + post.authors[post.authors.length - 1];
};

// Return a map that with slug as its key and PostData as its value
export const getPostsByMappedSlug = (): Map<string, PostData> => {
  return new Map<string, PostData>(posts_data.map(item => [item.slug, item]));
};

export const getPostBySlug = (slug: string | undefined): PostData | undefined => {
  return posts_data.find(item => item.slug === slug);
};
