import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import MainNavLink from './MainNavLink';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef(null);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ensure menu is always open on screens larger than 'sm'
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Hamburger menu icon */}
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['bars']}
        onClick={toggleMenu}
        className="absolute right-4 top-4 text-2xl text-color-system-accent-pink sm:hidden"
      />

      <header className="mb-6 flex justify-between sm:p-4">
        <div className="flex w-full flex-col justify-between gap-6 shadow-md sm:flex-row sm:shadow-sm">
          <NavLink className="pl-4 pt-4 sm:pl-0 sm:pt-0" to="/">
            <img src="/frekkFitLogo.svg" alt="Frekk Fit Party logo" />
          </NavLink>
          {isOpen && (
            <nav
              ref={menuRef}
              className="flex justify-between rounded-lg bg-background-color-secondary p-6 text-text-primary sm:bg-background-color-primary sm:p-0 dark:bg-background-color-secondary-dark dark:text-text-primary-dark sm:dark:bg-background-color-primary-dark"
            >
              {user && (
                <ul className="mx-auto flex w-full flex-col gap-4 text-center text-text-primary sm:flex-row sm:text-left dark:text-link-primary-dark">
                  <MainNavLink onClick={toggleMenu} route="/" title="Home" />
                  <MainNavLink
                    onClick={toggleMenu}
                    route="/players"
                    title="Player Insights"
                  />
                  <MainNavLink
                    onClick={toggleMenu}
                    route="/blog"
                    title="Blog"
                  />
                  <MainNavLink
                    onClick={toggleMenu}
                    route="/docs"
                    title="Docs"
                  />
                  <div className="mx-auto my-4 w-[80%] border-b border-border-primary sm:hidden dark:border-border-primary-dark"></div>
                  {user.players && (
                    <MainNavLink
                      onClick={toggleMenu}
                      route="/profile"
                      title="Profile"
                    />
                  )}
                  <li className="mx-auto sm:ml-auto">
                    <button
                      onClick={handleLogout}
                      className="bg-color-system-error dark:bg-color-system-error-dark rounded px-4 py-2 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
