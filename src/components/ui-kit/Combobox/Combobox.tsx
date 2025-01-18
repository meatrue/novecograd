import React from 'react';
import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton
} from '@headlessui/react';
import clsx from 'clsx';

import { IComboboxOption } from '@/interfaces/utils';
import { CheckIcon, ChevronDownIcon } from '@/components/ui-kit';

interface IComboboxPropos {
  value: IComboboxOption | null;
  options: IComboboxOption[];
  width: number;
  disabled: boolean;
  onChange: (value: IComboboxOption) => void;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export const Combobox: React.FC<IComboboxPropos> = ({
  value,
  options=[],
  width,
  disabled,
  onChange,
  onInput,
  onClose,
}) => {
  return (
    <HeadlessCombobox
      value={value}
      onChange={onChange}
      onClose={onClose}
      disabled={disabled}
    >
      <div className="relative hover:shadow transition-shadow rounded-lg">
        <ComboboxInput
          className={clsx(
            'w-full py-2 pl-3 pr-10 rounded-lg text-sm/6 bg-white border border-slate-200 shadow-sm',
            'focus-visible:ring focus-visible:ring-opacity-50 focus:outline-none focus-visible:border-teal-600',
            'focus-visible:ring-teal-600/20 transition-shadow',
          )}
          displayValue={(option: IComboboxOption) => option?.label}
          onChange={onInput}
        />
        <ComboboxButton className="combobox-button group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-[200px] mt-1 py-1 text-sm md:text-base bg-white border border-slate-200 rounded-md',
          'shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  empty:invisible',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
        style={{ width }}
      >
        {options.map((option) => (
          <ComboboxOption
            key={option?.value}
            value={option}
            className={clsx(
              'group relative flex justify-start items-center gap-2 py-1.5 px-3 cursor-default select-none',
              'text-slate-900 data-[focus]:text-teal-600 data-[focus]:bg-teal-600/20',
              {
                'font-medium': option.value === value?.value,
                'font-normal': option.value !== value?.value,
              },
            )}
          >
            <CheckIcon className={clsx(
              'min-h-5 h-5 min-w-5 w-5 text-teal-600',
              {
                'visible': option.value === value?.value,
                'invisible': option.value !== value?.value,
              },
            )} />
            <div className="text-sm/6">{option?.label}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
};