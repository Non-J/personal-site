export enum PostType {
  ExternalLink = 'ExternalLink',
  Markdown = 'Markdown',
  HTML = 'HTML',
}

export type PostDataBase = {
  title: string,              // Title
  slug: string,               // Short string that refers to the post as part of the url
  listed: boolean,            // Marking whether this post should be listed or accessed via url only
  publish_time: number,       // Initial publish time as milliseconds since unix epoch
  revision_time?: number,     // Last time this post was revised as milliseconds since unix epoch
  authors: Array<string>,     // List of authors
  tags: Array<string>,        // List of tags
  features: Array<string>,    // Additional features the post needs during processing.
}

export type PostDataExternalLink = {
  type: PostType.ExternalLink,
  link: string
}

export type PostDataMarkdown = {
  type: PostType.Markdown,
  source: string              // location of source file
}

export type PostDataHTML = {
  type: PostType.HTML,
  source: string              // location of source file
}

export type PostData = PostDataBase & (PostDataExternalLink | PostDataMarkdown | PostDataHTML);


export const posts_data: Array<PostData> = [];
