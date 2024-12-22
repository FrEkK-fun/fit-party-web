import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function SectionHeader({
  title,
  text,
  icon,
  h2,
  linkText,
  link,
}) {
  return (
    <div className="flex w-full flex-col gap-4 text-text-primary sm:flex-row sm:items-start dark:text-text-primary-dark">
      <div className="sm:w-1/2">
        {icon && (
          <FontAwesomeIcon
            icon={byPrefixAndName.fas[`${icon}`]}
            className="text-3xl text-color-system-accent-pink"
          />
        )}
        {!h2 && (
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h3>
        )}
        {h2 && <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>}
      </div>
      {(text || link) && (
        <div className="pt-10 sm:w-1/2">
          {text && <p className="mb-6">{text}</p>}
          {linkText && link && (
            <Link
              to={link}
              className="text-link-primary hover:underline dark:text-link-primary-dark"
            >
              {linkText}
              <span className="">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas[`chevron-right`]}
                  className="ml-2 text-sm text-link-secondary dark:text-link-secondary-dark"
                />
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
