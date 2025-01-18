import React from 'react';
import clsx from 'clsx';

type InputColor = 'white' | 'gray';
type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const DEFAULT_COLOR: InputColor = 'gray';
const DEFAULT_SIZE: InputSize = 'md';

const inputColorClassNames: Record<InputColor, string> = {
  white: 'text-slate-800 bg-white placeholder:text-slate-600 hover:bg-slate-50 focus-within:bg-slate-50 focus-within:outline-none transition-colors duration-300',
  gray: 'text-slate-600 bg-slate-100 placeholder:text-slate-400 hover:bg-slate-200 focus-within:outline-slate-400 focus-within:bg-slate-200 transition-colors duration-300',
};

const inputSizeClassNames: Record<InputSize, string> = {
  xs: 'py-2.5 px-2.5 text-xs rounded-md',
  sm: 'py-3 px-3 text-sm rounded-md',
  md: 'py-4 px-4 text-base rounded-lg',
  lg: '',
  xl: '',
  // lg: 'py-5 px-20 text-lg rounded-20',
  // xl: 'py-7 px-25 text-2xl rounded-20',
};

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: InputColor;
  outlined?: boolean;
  sizeValue?: InputSize;
  icon?: React.ReactNode;
  label?: string;
  containerClassName?: string;
}

export const Input: React.FC<IInputProps> = ({
  id,
  type,
  label,
  color = DEFAULT_COLOR,
  outlined,
  icon,
  sizeValue = DEFAULT_SIZE,
  className,
  containerClassName,
  ...props
}) => {
  const withIcon = !!icon;

  return (
    <div className="flex flex-col gap-2">
      {!!label && <label htmlFor={id}>{label}</label>}
      <div className={clsx(containerClassName, 'relative')}>
        <input
          className={clsx(
            'block w-full text-base rounded-lg',
            {
              [inputSizeClassNames[sizeValue]]: sizeValue && inputSizeClassNames[sizeValue],
              [inputColorClassNames[color]]: color && inputColorClassNames[color],

            },
            // { 'border border-black-70': outlined },
            // { 'px-2.5': sizeValue === 'sm' && !withIcon },
            // { 'pl-13 pr-2.5': sizeValue === 'sm' && withIcon },
            // { 'px-5': sizeValue === 'base' && !withIcon },
            // { 'pl-[62px] pr-5': sizeValue === 'base' && withIcon },
            // className
          )}
          type={type ?? 'text'}
          id={id}
          {...props}
        />
        {withIcon && (
          <span
            className={clsx(
              'absolute top-0 bottom-0 my-auto w-8 h-8',
              color && inputColorClassNames[color]
                ? inputColorClassNames[color]
                : inputColorClassNames[DEFAULT_COLOR],
              { 'left-2.5': sizeValue === 'sm' },
              { 'left-5': sizeValue === 'md' }
            )}
          >
            {icon}
          </span>
        )}
        {/* {type === 'password' && (
          <button
            className={clsx(
              'absolute top-0 bottom-0 w-6 h-6 my-auto',
              color && inputColorClassNames[color]
                ? inputColorClassNames[color]
                : inputColorClassNames[DEFAULT_COLOR],
              { 'right-2.5': sizeValue === 'sm' },
              { 'right-5': sizeValue === 'base' }
            )}
            type="button"
          >
            
          </button>
        )} */}
      </div>
    </div>
  );
};
