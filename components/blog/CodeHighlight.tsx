import Highlight, { Language } from 'prism-react-renderer';
import lightTheme from 'prism-react-renderer/themes/vsLight';
import darkTheme from 'prism-react-renderer/themes/vsDark';
import { FC, useContext } from 'react';
import { ThemeContext, ThemeMode } from '../ThemeProvider';
import Prism from 'prismjs';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';

type CodeHighlightProps = {
  children: string,
  className?: string,
}

const CodeHighlight: FC<CodeHighlightProps> = ({ children, className }) => {
  const themeContext = useContext(ThemeContext);
  const language = (className?.match(/language-(.*?)(?:\s|$)/)?.[1] ?? 'none') as Language;

  return (
    <Highlight Prism={Prism as any} code={children} language={language}
               theme={themeContext.resultTheme === ThemeMode.light ? lightTheme : darkTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (

        <pre
          className={className + ' w-full overflow-x-auto py-4 px-1 my-4 shadow-lg ring-2 ring-black ring-opacity-10 dark:ring-white dark:ring-opacity-30 '}
          style={{ ...style }}>
          {tokens.map((line, i) => (

            <div key={i} {...((lineProps) => {
              lineProps.className += ' table-row ';
              return lineProps;
            })(getLineProps({ line, key: i }))}>

              {/* line numbering */}
              <span className='table-cell text-right select-none pr-0.5 border-r border-gray-500'>{i + 1}</span>

              {/* line content */}
              <span className='table-cell pl-2'>
                {line.map((token, key) => (
                  <code key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>

            </div>

          ))}
        </pre>

      )}
    </Highlight>
  );
};

export default CodeHighlight;
