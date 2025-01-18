import React from 'react';
import clsx from 'clsx';

export const ErrorMessage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx(
      'grow flex flex-col items-center gap-4 pt-10 px-3',
      className,
    )}>
      <div className="text-xl font-semibold">Ошибка</div>
      <div className="text-lg text-center font-semibold">
      Что-то пошло не так. <br />Пожалуйста, попробуйте перезагрузить страницу
      </div>
    </div>
  );
};