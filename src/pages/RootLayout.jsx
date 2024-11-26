import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="flex flex-grow px-4">
        <Outlet />
      </main>
    </>
  );
}
