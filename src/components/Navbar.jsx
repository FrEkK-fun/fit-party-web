import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import useAuthStore from '../store/authStore';
import { useLogout } from '../hooks/useLogout';

import MainNavLink from './MainNavLink';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
  };

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth < 640) {
      setIsOpen(false); // Close menu on small screens
    }
  };

  // Ensure menu is always open on screens larger than 'sm'
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(true);
      } else {
        setIsOpen(false); // Close menu on small screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mb-6 w-full bg-background-color-secondary shadow-md dark:bg-background-color-secondary-dark">
      {/* Hamburger menu icon */}
      {user && (
        <FontAwesomeIcon
          icon={byPrefixAndName.fas[!isOpen ? 'bars' : 'x']}
          onClick={toggleMenu}
          className="absolute right-4 top-6 text-2xl text-color-system-accent-pink sm:hidden"
        />
      )}

      <header className="mx-auto flex max-w-[1536px] justify-between p-4">
        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <NavLink to="/">
            <img src="/frekkFitLogo.svg" alt="Frekk Fit Party logo" />
          </NavLink>
          {isOpen && (
            <nav
              ref={menuRef}
              className="flex justify-between rounded-lg p-6 text-text-primary sm:p-0 dark:text-text-primary-dark"
            >
              {user && (
                <ul className="mx-auto flex w-full flex-col gap-4 text-center text-text-primary sm:flex-row sm:items-center sm:text-left dark:text-link-primary-dark">
                  <MainNavLink
                    onClick={handleNavLinkClick}
                    route="/"
                    title="Home"
                  />
                  <MainNavLink
                    onClick={handleNavLinkClick}
                    route="/players"
                    title="Player Insights"
                  />
                  <MainNavLink
                    onClick={handleNavLinkClick}
                    route="/blog"
                    title="Blog"
                  />
                  <MainNavLink
                    onClick={handleNavLinkClick}
                    route="/docs"
                    title="Docs"
                  />
                  <div className="mx-auto my-4 w-[80%] border-b border-border-primary sm:hidden dark:border-border-primary-dark"></div>
                  {user.players && (
                    <MainNavLink
                      onClick={handleNavLinkClick}
                      route="/profile"
                      title="Profile"
                    />
                  )}
                  <li className="mx-auto min-w-fit sm:ml-auto">
                    <Button onClick={handleLogout} type="secondary">
                      Log Out
                    </Button>
                  </li>
                </ul>
              )}
              {/* <ul>
                <li>
                  <Button onClick={handleToggleTheme}>Theme</Button>
                </li>
              </ul> */}
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
