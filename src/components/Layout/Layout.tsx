import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Header } from '@/components/Header';
import { appLoaded } from '@/store/authorization';

export const Layout: React.FC = () => {
  const [
    loadApp,
  ] = useUnit([
    appLoaded,
  ]);
  React.useEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <>
      <div className="pt-[100px] grow flex flex-col">
        <Header />
        <main className="grow flex flex-col">
          <Outlet />
        </main>
      </div>

      <div id="modals"></div>
    </>
  );
};