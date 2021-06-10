import { FC, PropsWithChildren } from 'react';

type BackgroundColorProps = {
  className?: string
}

export const BackgroundColor: FC<PropsWithChildren<BackgroundColorProps>> = ({ children, className }) => {
  return (<div
    className={'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ' + (className ?? '')}>
    {children}
  </div>);
};

export const PopupBackground: FC<PropsWithChildren<BackgroundColorProps>> = ({ children, className }) => {
  return (<div
    className={'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-md shadow-lg ring-2 ring-black ring-opacity-10 dark:ring-white dark:ring-opacity-30 ' + (className ?? '')}>
    {children}
  </div>);
};
