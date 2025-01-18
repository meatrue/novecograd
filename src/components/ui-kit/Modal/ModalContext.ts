import React from 'react';

type CloseValue = React.Dispatch<React.SetStateAction<void>>;

type ModalContextValue = {
  isOpen: boolean;
  close: CloseValue;
};

export const ModalContext = React.createContext<ModalContextValue>({
  isOpen: false,
  close: (() => {}) as CloseValue,
});