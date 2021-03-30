import '../styles/globals.css';
import Head from 'next/head';
import App, { AppProps } from 'next/app';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='author' content='Jirawut Thongraar' />
      <meta name='description' content="Jirawut's Personal Page" />
      <meta name='keywords' content='portfolio,personal,contact' />
    </Head>
    <Component {...pageProps} />
  </>;
};

export default MyApp;
