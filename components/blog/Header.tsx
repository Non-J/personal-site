import { FC, Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext, ThemeMode } from '../ThemeProvider';
import { Menu, Transition } from '@headlessui/react';
import { LightBulbIcon } from '@heroicons/react/solid';
import { PopupBackground } from './BackgroundColor';

type HeaderProps = {
  hideOnScroll?: boolean,
}

export const Header: FC<HeaderProps> = ({ hideOnScroll = true }) => {
  const scrollY = useRef(0);
  const [displayHeader, setDisplayHeader] = useState<boolean>(true);

  useEffect(() => {
    if (hideOnScroll) {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  const onScroll: EventListener = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollY.current && currentScrollY > 50) {
      setDisplayHeader(false);
    } else {
      setDisplayHeader(true);
    }
    scrollY.current = currentScrollY;
  };

  return (<>
    <header
      className={'z-30 fixed w-full flex justify-center px-3 py-4 bg-indigo-700 text-gray-100 shadow-md transform transition-transform duration-300 '
      + (displayHeader ? '' : '-translate-y-full')}>
      <div className='max-w-screen-md w-full flex'>
        <h1><a className='text-xl font-handwriting' href='/blog'>Non-J's Blog</a></h1>
        <div className='ml-auto'><DarkModeSwitch forceHidePanel={!displayHeader} /></div>
      </div>
    </header>
    {/* Margin to prevent content from being blocked */}
    <div className='h-16' />
  </>);
};

const themeOptionConstant: Array<[ThemeMode, string]> = [
  [ThemeMode.system, 'Follow System Settings'],
  [ThemeMode.light, 'Light'],
  [ThemeMode.dark, 'Dark'],
];

type DarkModeSwitchProps = {
  forceHidePanel: boolean,
}

const DarkModeSwitch: FC<DarkModeSwitchProps> = ({ forceHidePanel }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (<>

        {/* Lighbulb Button */}
        <Menu.Button className='absolute h-7 w-7 -right-1/4' aria-label='Theme Switch'><LightBulbIcon /></Menu.Button>

        {/* Menu Panel */}
        <Transition
          as={Fragment}
          show={open && !forceHidePanel}
          enter='transition-opacity duration-300 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300 ease-out'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Menu.Items static className='absolute right-0 top-12 min-w-max'>
            <PopupBackground className='py-1'>
              {themeOptionConstant.map(item => (
                <Menu.Item key={item[0]}>
                  {({ active }) =>
                    <a className={'block px-4 py-2 ' + (active ? ' text-gray-100 bg-indigo-700 ' : '')}
                       onClick={() => {
                         themeContext.setTheme(item[0]);
                       }}>
                      <div
                        className={'pl-1 pr-3 border-l-4 border-transparent' + (themeContext.theme === item[0] ? ' border-yellow-500 ' : '')}>
                        {item[1]}
                      </div>
                    </a>
                  }
                </Menu.Item>
              ))}
            </PopupBackground>
          </Menu.Items>
        </Transition>

      </>)}
    </Menu>
  );
};
