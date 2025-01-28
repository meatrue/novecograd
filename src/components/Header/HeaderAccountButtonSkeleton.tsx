import React from 'react';
import { Skeleton } from '@/components/ui-kit';

export const HeaderAccountButtonSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-10 h-10 overflow-hidden rounded-full">
        <Skeleton className="h-full" />
      </div>
      <Skeleton className="h-5 rounded-md" />
    </div>    
  );
};

