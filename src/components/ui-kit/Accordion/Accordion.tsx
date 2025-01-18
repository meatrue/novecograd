import React from 'react';
import clsx from 'clsx';

import { ChevronDownIcon } from '@/components/ui-kit/icons';
import { useAccordion } from '@/hooks/useAccordion';

interface IAccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<IAccordionProps> = ({
  title,
  content,
  className,
}) => {
  const {
    contentRef,
    contentHeight,
    isOpen,
    toggle
  } = useAccordion();

  return (
    <div className={clsx(
      'group py-4 px-5 bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300',
      className
    )}>
      <div
        onClick={toggle}
        className="flex gap-5 justify-between items-center py-4 px-5 font-semibold cursor-pointer group-hover:text-gray-950 transition-colors duration-300"
      >
        {title}
        <span className={clsx('transition-all duration-300', { '-rotate-180': isOpen })}>
          <ChevronDownIcon className="h-6 w-6 text-current" />
        </span>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-500 ease-in-out"
        style={{height: contentHeight}}
      >
        <div
          ref={contentRef}
          className={clsx(
            'pt-4 pb-4 px-5 transition-[transform,opacity] duration-300 delay-200',
            {'translate-y-4 opacity-0': !isOpen}
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
};