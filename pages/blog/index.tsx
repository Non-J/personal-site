import React, { FC, Fragment, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { Header } from '../../components/blog/Header';
import { ThemeProvider } from '../../components/ThemeProvider';
import { BackgroundColor, PopupBackground } from '../../components/blog/BackgroundColor';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { PostData, posts_data } from '../../lib/posts_data';
import { getFormattedPostAuthors, getPostURL } from '../../lib/blog';
import { Footer } from '../../components/blog/Footer';

enum OrderOption {
  publishDate = 'publishDate',
  publishDateReverse = 'publishDateReverse',
  title = 'title',
  titleReverse = 'titleReverse',
}

const orderOptionConstant: Record<OrderOption, { name: string, }> = {
  [OrderOption.publishDate]: { name: 'Published Date (Latest First)' },
  [OrderOption.publishDateReverse]: { name: 'Published Date (Earliest First)' },
  [OrderOption.title]: { name: 'Title (Ascending)' },
  [OrderOption.titleReverse]: { name: 'Title (Descending)' },
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  return {
    props: { posts: posts_data.filter(post => post.listed) },
  };
};

type BlogIndexProps = {
  posts: Array<PostData>,
}

const BlogIndex: FC<BlogIndexProps> = ({ posts }) => {
  const [orderOption, setOrderOption] = useState(OrderOption.publishDate);

  // Compute filteredPost based on filter controls
  const filteredPost = useMemo(() => {
    let result = posts;
    switch (orderOption) {
      case OrderOption.publishDate:
        result.sort((a, b) => b.publish_time - a.publish_time);
        break;
      case OrderOption.publishDateReverse:
        result.sort((a, b) => a.publish_time - b.publish_time);
        break;
      case OrderOption.title:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case OrderOption.titleReverse:
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return result;
  }, [orderOption]);

  return (<>
    <Head>
      <title>Homepage - NonJ's Blog</title>
    </Head>

    <ThemeProvider>
      <BackgroundColor className='min-h-screen flex flex-col'>
        <Header hideOnScroll={false} />
        <div className='flex justify-center'>
          <div className='max-w-screen-md w-full px-3'>

            {/* Filter Controls */}
            <div className='flex flex-wrap items-center text-lg my-4'>
              <p className='mr-1'>Order by </p>
              <OrderOptionDropdown orderOption={orderOption} setOrderOption={setOrderOption} />
            </div>

            {/* Article List */}
            <main>
              {
                filteredPost.map(post => (<PostCard key={post.slug} post={post} />))
              }
            </main>

          </div>
        </div>
        <Footer />
      </BackgroundColor>
    </ThemeProvider>
  </>);
};

export default BlogIndex;

type OrderOptionDropdownProps = {
  orderOption: OrderOption,
  setOrderOption: (orderOption: OrderOption) => void,
}

const OrderOptionDropdown: FC<OrderOptionDropdownProps> = ({ orderOption, setOrderOption }) => {
  return (<Listbox as='div' className='relative' value={orderOption} onChange={setOrderOption}>
    {({ open }) => (<>
      <Listbox.Button>
        <PopupBackground
          className='py-1 px-2 w-72 flex items-center rounded shadow-none border-2 border-black dark:border-white'>
          {orderOptionConstant[orderOption].name}
          {open ? <ChevronUpIcon className='h-5 w-5 inline ml-auto' />
            : <ChevronDownIcon className='h-5 w-5 inline ml-auto' />}
        </PopupBackground>
      </Listbox.Button>
      <Transition
        as={Fragment}
        show={open}
        enter='transition-opacity duration-300 ease-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300 ease-out'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Listbox.Options static className='absolute w-full'>
          <PopupBackground className='py-1'>
            {Object.entries(orderOptionConstant).map((entry) => (
              <Listbox.Option value={entry[0]} key={entry[0]}>
                {({ active, selected }) => (
                  <div className={'block px-4 py-2 text-base' + (active ? ' text-gray-100 bg-indigo-700 ' : '')}>
                    <div
                      className={'pl-1 pr-3 border-l-4 border-transparent' + (selected ? ' border-yellow-500 ' : '')}>
                      {entry[1].name}
                    </div>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </PopupBackground>
        </Listbox.Options>
      </Transition>
    </>)}
  </Listbox>);
};

type PostCardProps = {
  post: PostData,
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (<>

    <PopupBackground className='w-full my-4 px-6 py-4'>
      <h2
        className='mb-2 text-2xl text-indigo-800 dark:text-indigo-200 whitespace-nowrap overflow-hidden overflow-ellipsis'>
        <a href={getPostURL(post)}>{post.title}</a>
      </h2>
      <p>
        <span className='block'>{getFormattedPostAuthors(post)}</span>
        <span className='block'>Published on {
          new Date(post.publish_time).toLocaleString('en-001', { dateStyle: 'long', timeStyle: 'short', hour12: false })
        }</span>
      </p>
      <div className='flex flex-wrap justify-starts items-center'>{
        post.tags.map(tag => (
          <div key={tag}
               className='text-xs mt-2 mr-2 py-1.5 px-3 dark:bg-indigo-700 shadow-md rounded-2xl ring-1 dark:ring-0 ring-indigo-600'>
            {tag}
          </div>
        ))
      }</div>
    </PopupBackground>

  </>);
};
