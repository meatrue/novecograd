import React from 'react';

export const Loader: React.FC = () => {
  return (        
    <div className="absolute z-10 inset-0 flex justify-center items-center text-blue-400">
      <div className="absolute inset-0 bg-white opacity-80"></div>
      <span className="spinner w-14 h-14 border-2"></span>
    </div>
  );
};