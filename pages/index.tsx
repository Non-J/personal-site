import Head from 'next/head';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const DecodeKey = 'J*SPZd^iQMv*YWlD@p!N';

type LinkProps = {
  link: string,
}

const ContactLink: FC<LinkProps> = (props: PropsWithChildren<LinkProps>) => {
  const [decodedLink, setDecodedLink] = useState<string>('');

  useEffect(() => {
    // Text is in base64 to prevent simple scraping.
    // It's impossible to stop all attempts to do so,
    // but at least the lazy attempts will fail.
    const b64decode = atob(props.link);
    let result = '';
    for (let i = 0; i < b64decode.length; i++) {
      result += String.fromCharCode(b64decode.charCodeAt(i) ^ DecodeKey.charCodeAt(i % DecodeKey.length));
    }
    setDecodedLink(result);
  }, [props.link]);

  return (
    <a className='underline italic transition-colors duration-300 hover:text-blue-400 py-3 pr-4'
       href={decodedLink}>{props.children}</a>
  );
};


const Home: FC = () => {
  return (<>
    <Head>
      <title>Jirawut's Personal Page</title>
    </Head>

    {/* This div is the background. Interactive background can use this div (if implemented in the future). */}
    <div className='fixed block w-full h-full overflow-hidden -z-10 bg-gray-800' />

    {/* These two nested divs center content on the screen with ample padding. */}
    <div className='flex min-h-screen'>
      <div className='box-content m-auto p-12 max-w-3xl text-gray-100'>

        <style jsx>{`
          .bounce-arrow {
            animation: bounce 1s infinite;

            @keyframes bounce {
              0%, 100% {
                transform: translateX(-1rem);
                animation-timing-function: ease-in;
              }
              50% {
                transform: translateX(0);
                animation-timing-function: ease-out;
              }
            }
          }
        `}</style>
        <h1 className='font-handwriting text-6xl'>Jirawut Thongraar</h1>

        {/* <a className='mt-8 flex font-handwriting text-3xl transition-colors duration-300 hover:text-blue-400'
           href='/blog'>
          <p className='bounce-arrow'>&gt;&gt;</p>
          <h2 className='ml-1 underline'>Visit My Blog</h2>
        </a> */}

        <h2 className='mt-8 font-handwriting text-3xl'>Contacts</h2>
        <ul className='mt-2 list-disc space-y-1 text-xl'>
          <li className='my-2'>
            <ContactLink link='J0s6PC4LZAM4PxddLCNCMCgfTyk4SzIicQMuKTYgF0M1eQ8rLQ=='>Email</ContactLink>
          </li>
          <li className='my-2'>
            <ContactLink link='Il4nIClecUYmOgEEPzYPISIfTiVkSTw9dQ43GzA6A153IwQrLhdTLytY'>Facebook</ContactLink>
          </li>
          <li className='my-2'>
            <ContactLink link='Il4nIClecUYmOgEEMDkfMCEXUy8nBDA/N0swBz4jKUAt'>Instagram</ContactLink>
          </li>
          <li className='my-2'>
            <ContactLink link='Il4nIClecUYmOgEEPj4YLDUSDy0lR3weNQpzIw=='>GitHub</ContactLink>
          </li>
        </ul>

        <p className='mt-2 mb-5 text-justify text-sm'>
          * Please be patient if it takes a while for me to reply. I'm a human too.
        </p>

        <p className='mt-10 text-justify text-xs'>
          Made from ❤. This site is powered by unicorn tears, magic, and generous open-source libraries.<br/>
          For the source code behind this site and third-party license notices, see the repository at <a
          className='underline italic transition-colors duration-300 hover:text-blue-400'
          href='https://www.github.com/Non-J/personal-site'>
          https://www.github.com/Non-J/personal-site</a>.
        </p>

      </div>
    </div>
  </>);
};

export default Home;
