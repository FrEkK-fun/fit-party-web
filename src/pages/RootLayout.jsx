import { Outlet } from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1536px] flex-grow flex-col px-4">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
