import React from 'react';

import { ModalContext } from './ModalContext';

export const ModalBackground: React.FC = () => {
  const { close } = React.useContext(ModalContext);
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black opacity-20"
      onClick={() => close()}
    ></div>
  );
};