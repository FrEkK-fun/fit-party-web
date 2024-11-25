import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      {/* Hamburger menu icon */}
      <FontAwesomeIcon
        icon={byPrefixAndName.fas['bars']}
        className="absolute right-4 top-4 text-2xl text-color-system-accent-pink sm:hidden"
      />

      <header className="mb-6 flex justify-between sm:p-4">
        <div className="flex w-full flex-col justify-between gap-6 shadow-md sm:flex-row sm:shadow-sm">
          <Link className="pl-4 pt-4 sm:pl-0 sm:pt-0" to="/">
            <img src="/frekkFitLogo.svg" alt="Frekk Fit Party logo" />
          </Link>
          <nav className="flex justify-between rounded-md bg-background-color-secondary p-6 text-text-primary sm:bg-background-color-primary sm:p-0 dark:bg-background-color-secondary-dark dark:text-text-primary-dark sm:dark:bg-background-color-primary-dark">
            {user && (
              <ul className="mx-auto flex w-full flex-col gap-4 text-center text-text-primary sm:flex-row sm:text-left dark:text-link-primary-dark">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/players">Player Insights</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/rules">Docs</Link>
                </li>
                <div className="mx-auto my-4 w-[80%] border-b border-border-primary sm:hidden dark:border-border-primary-dark"></div>
                {user.players && (
                  <li>
                    <Link to={`/players/${user.players[0]}`}>{user.email}</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleClick}>Log out</button>
                </li>
              </ul>
            )}
            {!user && (
              <ul className="flex">
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
