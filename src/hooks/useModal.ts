import React from 'react';

export const useModal = () => {
  const [isOpen, setOpen] = React.useState(false);

  const open = React.useCallback((): void => {
    setOpen(true);
  }, []);

  const close = React.useCallback((): void => {
    setOpen(false);
  }, []);

  const handleEscKey = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close]
  );

  React.useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false);
    return () => {
      document.removeEventListener('keyup', handleEscKey, false);
    };
  }, [handleEscKey]);

  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return { isOpen, open, close };
};