import { FC, PropsWithChildren } from 'react';


const Card: FC = (props: PropsWithChildren<{}>) => {
  return (<>
    <div className={
      'rounded-md p-4 my-2 ' +
      'border-4 border-blue-800 ' +
      'transition-shadow duration-300 hover:ring-4 ring-blue-500 ring-opacity-50 '}>
      {props.children}
    </div>
  </>);
};

export default Card;