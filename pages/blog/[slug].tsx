import React, { FC, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Header } from '../../components/blog/Header';
import { BackgroundColor, PopupBackground } from '../../components/blog/BackgroundColor';
import { ThemeProvider } from '../../components/ThemeProvider';
import { getFormattedPostAuthors, getPostBySlug } from '../../lib/blog';
import { PostData, posts_data, PostType } from '../../lib/posts_data';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import { Footer } from '../../components/blog/Footer';
import dynamic from 'next/dynamic';

const CodeHighlight = dynamic(() => import('../../components/blog/CodeHighlight'));

const mdComponents = {
  p: (props: any) => <p className='text-justify my-2' {...props} />,
  h1: (props: any) => <h1 className='text-4xl mt-4 mb-1.5' {...props} />,
  h2: (props: any) => <h2 className='text-3xl mt-4 mb-1.5' {...props} />,
  h3: (props: any) => <h3 className='text-2xl mt-4 mb-1.5' {...props} />,
  h4: (props: any) => <h4 className='text-xl mt-3 mb-1' {...props} />,
  h5: (props: any) => <h5 className='text-xl mt-3 mb-1' {...props} />,
  h6: (props: any) => <h6 className='text-xl mt-3 mb-1' {...props} />,
  blockquote: (props: any) => <PopupBackground className='my-2 p-2'>
    <blockquote {...props} />
  </PopupBackground>,
  ul: (props: any) => <ul className='list-disc list-inside my-2' {...props} />,
  ol: (props: any) => <ol className='list-decimal list-inside my-2' {...props} />,
  li: (props: any) => <li className='pl-4' {...props} />,
  table: (props: any) => <table
    className='w-full table-auto border-collapse my-4 border-t-2 border-b-2 border-gray-900 dark:border-gray-100' {...props} />,
  thead: (props: any) => <thead className='border-b-2 border-gray-900 dark:border-gray-100' {...props} />,
  th: (props: any) => <th className='py-1 text-left' {...props} />,
  tr: (props: any) => <tr className='border-b border-gray-500' {...props} />,
  td: (props: any) => <td className='py-0.5' {...props} />,
  code: (props: any) => <CodeHighlight {...props} />,
  inlineCode: (props: any) => <code {...props} />,
  pre: (props: any) => <pre className='my-2' {...props} />,
  hr: (props: any) => <hr className='my-4' {...props} />,
  a: (props: any) => <a className='underline italic transition-colors duration-300 hover:text-blue-400' {...props} />,
};

type BlogPostProps = {
  post: PostData,
  content: string,
}

const BlogPost: FC<BlogPostProps> = ({ post, content }) => {
  useEffect(() => {
    // Conditionally import katex-css if the post requested 'maths' feature
    if (post.features.includes('maths')) {
      // @ts-ignore
      import('katex/dist/katex.min.css');
    }
  }, []);

  return (<>
    <Head>
      <title>{post.title} - NonJ's Blog</title>
    </Head>

    <ThemeProvider>
      <BackgroundColor className='min-h-screen flex flex-col'>
        <Header hideOnScroll={true} />

        <article id='blog-content' className='flex justify-center px-3 my-4'>
          <div className='max-w-screen-md w-full overflow-visible'>
            <h1 className='my-2 text-4xl md:text-5xl'>{post.title}</h1>
            <p className='md:text-lg'>
              <span className='author byline block'>{getFormattedPostAuthors(post)}.</span>
              <span className='dateline block'>
              Published on {new Date(post.publish_time).toLocaleString('en-001', {
                dateStyle: 'long',
                timeStyle: 'short',
                hour12: false,
              })}. {post.revision_time ? 'Updated on ' +
                new Date(post.revision_time).toLocaleString('en-001', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                  hour12: false,
                }) + '.' : ''}
              </span>
            </p>
            <hr className='my-4' />

            {
              post.type === PostType.HTML ?
                <div dangerouslySetInnerHTML={{ __html: content }} />
                : <MDXRemote compiledSource={content} components={mdComponents} />
            }
          </div>
        </article>

        <Footer />
      </BackgroundColor>
    </ThemeProvider>
  </>);
};

export default BlogPost;

type Params = {
  slug: string,
}

export const getStaticProps: GetStaticProps<BlogPostProps, Params> = async ({ params }) => {
  const post = getPostBySlug(params?.slug);
  if (!post) {
    throw new Error('Cannot render post that does not exists.');
  }
  if (post.type !== PostType.HTML && post.type !== PostType.Markdown) {
    throw new Error('Only HTML and Markdown PostType needs to be rendered.');
  }

  const file_content = await readFile(join(process.cwd(), post.source)).then(buf => buf.toString());

  return {
    props: {
      post,
      content: (
        post.type === PostType.Markdown
          ? (await serialize(file_content, {
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex, rehypeSlug],
            },
          })).compiledSource
          : file_content
      ),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths:
      posts_data
        .filter(item => item.type === PostType.HTML || item.type === PostType.Markdown)
        .map(item => item.slug)
        .map(slug => ({ params: { slug } })),
    fallback: false,
  };
};