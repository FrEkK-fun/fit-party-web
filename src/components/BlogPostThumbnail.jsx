import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

export default function BlogPostThumbnail({ post }) {
  const excerpt = post.body.split(' ').slice(0, 12).join(' ');

  return (
    <div className="max-h-fit min-w-fit rounded-md p-4 hover:bg-background-color-secondary hover:dark:bg-background-color-secondary-dark">
      <h3 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
        {post.title}
      </h3>
      <div className="flex flex-col gap-4 text-text-primary dark:text-text-primary-dark">
        <Markdown
          options={{
            overrides: {
              h1: {
                component: 'p',
                props: {
                  className: '',
                },
              },
              h2: {
                component: 'p',
                props: {
                  className: '',
                },
              },
              h3: {
                component: 'p',
                props: {
                  className: '',
                },
              },
              p: {
                component: 'p',
                props: {
                  className: '',
                },
              },
              a: {
                component: 'p',
                props: {
                  className: '',
                },
              },
            },
          }}
        >
          {excerpt + '...'}
        </Markdown>
        <Link
          to={`/blog/${post._id}`}
          className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
        >
          Read post
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`chevron-right`]}
              className="ml-2 text-xs text-link-secondary dark:text-link-secondary-dark"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
