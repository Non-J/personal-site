import Head from 'next/head';
import ColoredBackground from '../components/ColoredBackground';
// import dynamic from 'next/dynamic';

// const InteractiveBackground = dynamic(() => import('../components/InteractiveBackground'));

export default function Page404() {
  return (
    <div>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <ColoredBackground className={'fixed block w-full h-full overflow-hidden -z-10'} />
      {/*<InteractiveBackground />*/}

      <div className={'flex min-h-screen'}>
        <div className={'m-auto'}>

          <h1 className={'font-handwriting text-8xl'}>404</h1>
          <h1>The page could not be found.</h1>

        </div>
      </div>
    </div>
  );
}
