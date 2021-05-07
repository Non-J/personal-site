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

  return (<>
    <a className={'text-xl underline italic transition-colors duration-300 hover:text-blue-400 py-1 pr-4'}
      href={decodedLink}>{props.children}</a>
  </>);
};


const StyledLink: FC<LinkProps> = (props: PropsWithChildren<LinkProps>) => {
  return (<>
    <a className={'underline italic transition-colors duration-300 hover:text-blue-400'}
      href={props.link}>{props.children}</a>
  </>);
};


const Home: FC = () => {
  return (<>
    <Head>
      <title>Jirawut's Personal Page</title>
    </Head>

    <div className={'fixed block w-full h-full overflow-hidden -z-10 bg-gray-800'} />

    <div className={'flex min-h-screen'}>
      <div className={'box-content m-auto p-12 max-w-3xl text-gray-100'}>

        <h1 className={'font-handwriting text-6xl'}>Jirawut Thongraar</h1>

        <h2 className={'mt-8 font-handwriting text-3xl'}>Contacts</h2>
        <ul className={'mt-2 list-disc space-y-1'}>
          <li><ContactLink link={'J0s6PC4LZAM4PxddLCNCMCgfTyk4SzIicQMuKTYgF0M1eQ8rLQ=='}>Email</ContactLink></li>
          <li><ContactLink link={'Il4nIClecUYmOgEEPzYPISIfTiVkSTw9dQ43GzA6A153IwQrLhdTLytY'}>Facebook</ContactLink></li>
          <li><ContactLink link={'Il4nIClecUYmOgEEMDkfMCEXUy8nBDA/N0swBz4jKUAt'}>Instagram</ContactLink></li>
          <li><ContactLink link={'Il4nIClecUYmOgEEPj4YLDUSDy0lR3weNQpzIw=='}>GitHub</ContactLink></li>
        </ul>

        <p className={'mt-2 mb-5 text-justify'}>
          * Please be patient if it takes a while for me to reply. I'm a human too.
        </p>

        <p className={'mt-10 text-justify'}>
          Made from ❤. This site is powered by unicorn tears, magic, and generous open-source libraries. For the
          source
          code behind this site and third-party license notices, see the repository at <StyledLink
            link={'https://www.github.com/Non-J/personal-site'}>
            https://www.github.com/Non-J/personal-site
          </StyledLink>.
        </p>

      </div>
    </div>
  </>);
};

export default Home;
