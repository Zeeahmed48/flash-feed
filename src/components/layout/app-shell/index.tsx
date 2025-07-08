import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import './style.css';

const AppShell: FC = () => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <div className="page">
        <Header />
        <main className="content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppShell;
