import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mx-auto my-12 flex w-full max-w-[1536px] flex-col items-center justify-center gap-12 px-4 text-text-primary dark:text-text-primary-dark">
      <img src="/frekkFitLogo.svg" alt="Frekk Fit Party logo" />
      <nav>
        <ul className="flex flex-col gap-4 text-center sm:flex-row">
          <li className="text-link-primary hover:underline dark:text-link-primary-dark">
            <Link to="/players">Player Insights</Link>
          </li>
          <li className="text-link-primary hover:underline dark:text-link-primary-dark">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="text-link-primary hover:underline dark:text-link-primary-dark">
            <Link to="/docs">Docs</Link>
          </li>
        </ul>
      </nav>
      <div className="w-2/3 border-b border-border-primary sm:w-full dark:border-border-primary-dark"></div>
      <div className="flex w-full flex-col gap-4 text-sm sm:flex-row-reverse sm:items-center sm:justify-between">
        <nav>
          <ul className="flex flex-col gap-4 text-center sm:flex-row">
            <li className="text-link-primary underline hover:no-underline dark:text-link-primary-dark">
              <Link to="/terms">Terms of Use</Link>
            </li>
            <li className="text-link-primary underline hover:no-underline dark:text-link-primary-dark">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
        <p className="mt-6 text-center text-text-primary sm:mt-0 sm:text-left dark:text-text-primary-dark">
          &copy; 2022 FrEkK Fit Party.{' '}
          <span className="block sm:inline"> All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}
0;
