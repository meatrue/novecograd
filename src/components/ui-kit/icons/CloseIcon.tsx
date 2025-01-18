import React from 'react';

import { IconProps } from './types';

export const CloseIcon: React.FC<IconProps> = ({ color, className }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M35.1229 0L20 15.0851L4.87713 0L0 4.87713L15.0851 20L0 35.1229L4.87713 40L20 24.9149L35.1229 40L40 35.1229L24.9149 20L40 4.87713L35.1229 0Z" fill={color ?? 'currentColor'} />
    </svg>
  );
};
