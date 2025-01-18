import React from 'react';

export const useModalsContainer = (): {modalsContainer: HTMLElement | null} => {
  const modalsContainerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    modalsContainerRef.current = document.getElementById('modals');
  }, []);

  return {
    modalsContainer: modalsContainerRef.current
  };
};