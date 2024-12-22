import { NavLink } from 'react-router-dom';
import { docsData } from '../data/docs';

export default function DocsSidebar() {
  return (
    <div className="sticky top-0 h-screen overflow-y-auto px-2 py-12">
      {Object.entries(docsData).map(([category, { title, topics }]) => (
        <div key={category} className="mb-6">
          <h5 className="mb-2 font-bold text-text-highlight dark:text-text-highlight-dark">
            {title}
          </h5>
          <ul className="space-y-2">
            {Object.entries(topics).map(([slug, { title }]) => (
              <li key={slug}>
                <NavLink
                  to={`/docs/${slug}`}
                  className={({ isActive }) =>
                    `block rounded-md p-2 text-sm ${
                      isActive
                        ? 'bg-background-color-secondary text-color-system-accent-pink dark:bg-background-color-secondary-dark'
                        : 'text-text-primary hover:bg-background-color-secondary dark:text-text-primary-dark dark:hover:bg-background-color-secondary-dark'
                    }`
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
