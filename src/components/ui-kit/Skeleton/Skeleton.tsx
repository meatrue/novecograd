import React from 'react';
import clsx from 'clsx';

interface ISkeletonProps {
  className?: string;
  bgClassName?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({ className, bgClassName }) => {
  return (
    <div className={clsx(
      'w-full animate-pulse',
      className ?? 'h-6 rounded-md',
      bgClassName ?? 'bg-slate-200',
    )} />
  );
};