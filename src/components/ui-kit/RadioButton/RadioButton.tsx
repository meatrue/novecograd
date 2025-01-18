import React from 'react';
import clsx from 'clsx';

interface IRadioButtonProps {
  value: string | number;
  label: string;
  checked?: boolean;
  onChange: (value: string | number) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  value,
  label,
  checked,
  onChange,
}) => {
  const handleChange = () => {
    onChange(value);
  };
  return (
    <label className="group/radio flex gap-5 justify-between items-center py-3 cursor-pointer" onClick={handleChange}>
      <span
        className="group-hover/radio:text-gray-950 transition-colors duration-300"
      >
        {label}
      </span>
      <input
        type="radio"
        className="sr-only"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className={
        clsx(
          'relative w-6 h-6 border-2 border-teal-600 rounded-full',
          'transition-colors duration-300 group-hover/radio:border-teal-800',
          'after:absolute after:top-1/2 after:right-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:w-2 after:h-2',
          'after:rounded-full after:bg-teal-600 group-hover/radio:after:bg-teal-800 after:transition-[colors,opacity] after:duration-300',
          {
            'after:opacity-100': checked,
            'after:opacity-0': !checked,
          }
        )
      } />
    </label>
  );
};