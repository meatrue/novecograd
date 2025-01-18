import React from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@/components/ui-kit/icons';
import clsx from 'clsx';

import { ISelectOption } from '@/interfaces/utils';

export interface ISelectProps {
  options: ISelectOption[];
  value: ISelectOption | null;
  defaultLabel?: string;
  className?: string;
  onChange: (value: ISelectOption) => void;
}

export const Select: React.FC<ISelectProps> = ({
  options,
  value,
  defaultLabel,
  className,
  onChange,
}) => {
  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <ListboxButton
            className="
              relative w-full py-2 pl-3 pr-10 text-left sm:text-sm cursor-default rounded-lg
              bg-white shadow-sm focus-visible:ring focus-visible:ring-opacity-50
              focus:outline-none border focus-visible:border-teal-600
              focus-visible:ring-teal-600/20 border-slate-200 hover:shadow transition-shadow"
          >
            <span className="block truncate">
              {value?.label ?? defaultLabel ?? 'Выберите вариант'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  className={({ focus }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      {
                        'bg-teal-600/20 text-teal-600': focus,
                        'text-slate-900': !focus
                      }
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={
                          clsx(
                            'block',
                            {
                              'font-medium': selected,
                              'font-normal': !selected,
                            },
                          )
                        }
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
