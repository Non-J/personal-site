import React, { FC } from 'react';

export const Footer: FC = () => {
  return (<>
    <footer className='w-full flex justify-center px-3 py-4 mt-auto bg-indigo-700 text-gray-100'>
      <div className='max-w-screen-md w-full flex'>
        <p className='text-xs'>
          Unless noted otherwise, content on this blog is licensed under <a
          className='underline italic transition-colors duration-300 hover:text-blue-400'
          href='https://creativecommons.org/licenses/by-sa/4.0/'>
          Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br/>
          For third-party license notices, see the repository at <a
          className='underline italic transition-colors duration-300 hover:text-blue-400'
          href='https://www.github.com/Non-J/personal-site'>
          https://www.github.com/Non-J/personal-site</a>.
        </p>
      </div>
    </footer>
  </>);
};