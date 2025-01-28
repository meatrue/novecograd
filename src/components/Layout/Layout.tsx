import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Header } from '@/components/Header';
import { $isAppLoaded } from '@/store/app';

export const Layout: React.FC = () => {
  const [
    isAppLoaded,
  ] = useUnit([
    $isAppLoaded,
  ]);
  return (
    <>
      <div className="pt-[100px] grow flex flex-col">
        <Header />
        <main className="grow flex flex-col">
          {isAppLoaded && <Outlet />}
        </main>
      </div>

      <div id="modals"></div>
    </>
  );
};