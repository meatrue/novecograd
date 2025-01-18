import React from 'react';
import clsx from 'clsx';
import { IconProps } from '../icons/types';

type ButtonColor = 'gray' | 'blue' | 'transparent';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const DEFAULT_COLOR: ButtonColor = 'blue';
const DEFAULT_SIZE: ButtonSize = 'md';

const buttonColorClassNames = {
  gray: 'text-black bg-gray-200 hover:bg-gray-300 border border-gray-300 hover:border-gray-400 disabled:hover:bg-gray-200 disabled:hover:border-gray-300',
  blue: 'text-white bg-blue-700 hover:bg-blue-800 focus-within:outline-none focus-within:bg-blue-900 disabled:hover:bg-blue-700',
  transparent: 'text-black bg-transparent hover:text-blue-600 focus-within:outline-none focus-within:text-blue-900 disabled:hover:text-black',
};

const outlinedClassNames = {
  xs: 'border-2 rounded',
  sm: 'border-2 rounded',
  md: 'border-2 rounded',
  lg: 'border-2 rounded',
  xl: 'border-2 rounded',
  gray: 'border-gray-300 hover:border-gray-400 disabled:hover:border-gray-300',
  blue: 'border-blue-700 hover:border-blue-800 disabled:hover:border-gray-300 focus-within:outline-none focus-within:border-blue-900 disabled:hover:border-blue-700',
  transparent: 'border-black hover:border-blue-600 focus-within:outline-none focus-within:border-blue-900 disabled:hover:border-black',
};

const buttonSizeClassNames = {
  xs: 'gap-2.5 py-2.5 px-7 text-xs rounded-md',
  sm: 'gap-3 py-3 px-8 text-sm rounded-md',
  md: 'gap-3 py-4 px-10 text-base rounded-lg',
  lg: '',
  xl: '',
  // lg: 'py-5 px-20 text-lg rounded-20',
  // xl: 'py-7 px-25 text-2xl rounded-20',
};

const iconSizeClassNames = {
  xs: 'w-7 h-7',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  // lg: 'py-5 px-20 text-lg rounded-20',
  // xl: 'py-7 px-25 text-2xl rounded-20',
};

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: React.FC<IconProps>;  
  outlined?: boolean;
  isVertical?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
  icon,
  outlined,
  className,
  children,
  isVertical,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'flex items-center justify-center tracking-wide transition-all duration-300 disabled:opacity-40',
        { 
          [buttonSizeClassNames[size]]: size && buttonSizeClassNames[size],
          [buttonColorClassNames[color]]: color && buttonColorClassNames[color],
          'flex gap-2.5 items-center justify-center': icon && !isVertical,
          [outlinedClassNames[size]]: outlined,
          [outlinedClassNames[color]]: outlined,
        }
      )}
    >
      {!!icon && (
        <span className={iconSizeClassNames[size]}>
          {icon({className: 'image-cover'})}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
