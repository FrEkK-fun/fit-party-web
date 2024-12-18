import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import DocsSidebar from '../components/DocsSidebar';
import DocsOnThisPage from '../components/DocsOnThisPage';

export default function DocsLayout() {
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="flex min-h-full gap-12">
      {/* Left Sidebar - Navigation */}
      <nav className="hidden w-64 flex-shrink-0 border-r border-border-primary lg:block dark:border-border-primary-dark">
        <DocsSidebar />
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Right Sidebar - On This Page */}
      <nav className="hidden w-64 flex-shrink-0 xl:block">
        <DocsOnThisPage activeSection={activeSection} />
      </nav>
    </div>
  );
}
