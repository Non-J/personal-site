import Head from 'next/head';
import ColoredBackground from '../components/ColoredBackground';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Card from '../components/Card';

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
    <a className={'text-xl underline italic transition-colors duration-300 hover:text-blue-500'}
       href={decodedLink}>{props.children}</a>
  </>);
};


const StyledLink: FC<LinkProps> = (props: PropsWithChildren<LinkProps>) => {
  return (<>
    <a className={'underline italic transition-colors duration-300 hover:text-blue-500'}
       href={props.link}>{props.children}</a>
  </>);
};


const Home: FC = () => {
  return (<>
    <Head>
      <title>Jirawut's Personal Page</title>
    </Head>

    <ColoredBackground className={'fixed block w-full h-full overflow-hidden -z-10'} />
    <div className={'fixed block w-full h-full overflow-hidden -z-10 bg-white bg-opacity-70'} />

    <div className={'flex'}>
      <div className={'box-content p-12 mx-auto max-w-3xl'}>

        <h1 className={'font-handwriting text-6xl'}>Jirawut Thongraar</h1>

        <h3 className={'my-5 text-justify text-xl'}>
          Hi. Welcome to my homepage. I'm not the kind to write much about myself. I would rather let my past works
          speak
          for me. If you are interested, feel free to get in touch using the contacts below.
        </h3>

        <ul className={'mt-5 list-disc'}>
          <li><ContactLink link={'J0s6PC4LZAM4PxddLCNCMCgfTyk4SzIicQMuKTYgF0M1eQ8rLQ=='}>Email</ContactLink></li>
          <li><ContactLink link={'Il4nIClecUYmOgEEPzYPISIfTiVkSTw9dQ43GzA6A153IwQrLhdTLytY'}>Facebook</ContactLink>
          </li>
          <li><ContactLink link={'Il4nIClecUYmOgEEMDkfMCEXUy8nBDA/N0swBz4jKUAt'}>Instagram</ContactLink></li>
          <li><ContactLink link={'Il4nIClecUY2JAJCLDVCJy8dDgAlRH4a'}>GitHub</ContactLink></li>
        </ul>

        <p className={'mt-2 mb-5 text-justify'}>
          * Please be patient if it takes a while for me to reply. I'm a human too.
        </p>

        <p className={'mt-5 mb-2 text-justify text-xl'}>
          These are my past works or at least the ones that are not too embarrassing for the internet.
        </p>

        <div className={'mb-5'}>
          <Card>
            <h5 className={'text-xl'}>Demos: The Civic Life</h5>
            <p className={'text-justify pl-2'}>
              An online board game about the civic life in the Roman Republic, a part of the World History course at
              Kamnoetvidya Science Academy. This is the most ambitious project I have done at the time. This is also
              my
              first time using React and Docker. Let's just say that I learned my lesson about doing large projects
              alone.
            </p>
            <ul>
              <li><StyledLink link={'https://demos-game.jirawut.com/'}>The Game</StyledLink></li>
              <li><StyledLink link={'https://github.com/Non-J/demos-game'}>Code Repository</StyledLink></li>
            </ul>
          </Card>
          <Card>
            <h5 className={'text-xl'}>Trapping Insects with Ultrasonic Levitation</h5>
            <p className={'text-justify pl-2'}>
              A research project I did as part of my high school graduation requirements. Don't expect much tho, it is
              just a high school science project.
            </p>
            <ul>
              <li><StyledLink
                link={'https://files.jirawut.com/trapping_insects_with_ultrasonic_levitation.pdf'}>
                Full Paper
              </StyledLink></li>
              <li><StyledLink link={'https://github.com/Non-J/acoustic-simulator'}>Simulator App</StyledLink></li>
            </ul>
          </Card>
          <Card>
            <h5 className={'text-xl'}>KVIS International Science Fair</h5>
            <p className={'text-justify pl-2'}>
              Annual science fair hosted by Kamnoetvidya Science Academy. During grades 10 and 11, I mostly did
              behind-the-scene works, some of which can be seen on my GitHub account. For grade 12, I did a
              presentation
              for my research project (see the one above this).
            </p>
            <ul>
              <li><StyledLink link={'https://github.com/Non-J/kvis_sf_flutter'}>Flutter App (2020)</StyledLink></li>
              <li><StyledLink link={'https://github.com/Non-J/kvis_sf_webapp'}>Web App (2020)</StyledLink></li>
              <li><StyledLink link={'https://github.com/vzsky/APCYS-pwa'}>Web App (2019)</StyledLink></li>
            </ul>
          </Card>
        </div>

        <p className={'my-5 text-justify'}>
          Made with ❤. This site is powered by unicorn tears, magic, and generous open-source libraries. For the
          source
          code behind this site and third-party license notices, see the repository at <StyledLink
          link={'https://github.com/Non-J/personal-site'}>
          https://github.com/Non-J/personal-site</StyledLink>.
        </p>

      </div>
    </div>
  </>);
};

export default Home;
