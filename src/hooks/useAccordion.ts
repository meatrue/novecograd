import { useRef, useState, useEffect, useCallback } from 'react';

export const useAccordion = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const changeHeight = () => {
      if (isOpen) {
        setContentHeight(contentRef.current?.offsetHeight ?? 0);
        return;
      }
      setContentHeight(0);
    };
    changeHeight();
    window.addEventListener('resize', changeHeight);

    return () => {
      window.removeEventListener('resize', changeHeight);
    };
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return {
    contentRef,
    contentHeight,
    isOpen,
    toggle
  };
};