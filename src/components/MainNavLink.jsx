import { NavLink } from 'react-router-dom';

export default function MainNavLink({ route, title, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive
          ? 'mx-auto w-2/3 min-w-fit rounded-md border-border-primary bg-background-color-button-primary px-6 py-2 font-medium text-text-alternate sm:mx-0 sm:w-full sm:rounded-none sm:border-0 sm:border-b sm:border-border-tertiary sm:bg-transparent sm:p-0 sm:px-2 sm:text-link-primary dark:border-border-primary-dark dark:bg-background-color-button-primary-dark dark:text-text-alternate-dark sm:dark:border-border-tertiary-dark sm:dark:bg-transparent sm:dark:text-link-primary-dark'
          : 'mx-auto w-2/3 min-w-fit rounded-md px-6 py-2 hover:bg-background-color-primary sm:mx-0 sm:w-full sm:rounded-none sm:px-2 sm:py-0 sm:hover:border-b hover:dark:bg-background-color-primary-dark'
      }
      to={route}
    >
      <li className="">{title}</li>
    </NavLink>
  );
}
