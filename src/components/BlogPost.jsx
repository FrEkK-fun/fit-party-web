import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import parseTimestamp from '../utils/parseTimestamp';
import useAuthStore from '../store/authStore';

import YoutubeEmbed from './YoutubeEmbed';

export default function BlogPost({ post }) {
  const user = useAuthStore((state) => state.user);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (post) {
      const parsedTimestamp = parseTimestamp(post.createdAt).toDateString();
      setTimestamp(parsedTimestamp);
    }
  }, [post, timestamp]);

  return (
    <article className="flex w-full flex-col border-b border-border-primary pb-12 dark:border-border-primary-dark">
      <h2 className="mb-6 text-3xl font-bold">{post.title}</h2>
      <YoutubeEmbed embedId={post.videoLink} />
      <p className="mt-4 text-sm font-semibold">
        <span className="block font-normal">Published on</span>
        {timestamp}
      </p>
      <div className="prose mx-auto mt-6 max-w-[65ch]">
        <Markdown
          options={{
            overrides: {
              h1: {
                component: 'h3',
                props: {
                  className: 'text-3xl font-bold mt-6 mb-4',
                },
              },
              h2: {
                component: 'h4',
                props: {
                  className: 'text-2xl font-bold mt-6 mb-4',
                },
              },
              h3: {
                component: 'h5',
                props: {
                  className: 'text-xl font-bold mt-6 mb-4',
                },
              },
              p: {
                component: 'p',
                props: {
                  className: 'mt-2 mb-4',
                },
              },
              a: {
                component: 'a',
                props: {
                  className:
                    'text-link-primary dark:text-link-primary-dark hover:underline',
                },
              },
              code: {
                component: 'code',
                props: {
                  className:
                    'bg-background-color-secondary dark:bg-background-color-secondary-dark p-1 rounded',
                },
              },
              ul: {
                component: 'ul',
                props: {
                  className: 'list-disc list-inside',
                },
              },
              ol: {
                component: 'ol',
                props: {
                  className: 'list-decimal list-inside',
                },
              },
              li: {
                component: 'li',
                props: {
                  className: 'mt-2',
                },
              },
              img: {
                component: 'img',
                props: {
                  className: 'mx-auto',
                },
              },
              blockquote: {
                component: 'blockquote',
                props: {
                  className:
                    'border-l-4 border-color-system-accent-pink dark:border-color-system-accent-pink p-4',
                },
              },
            },
          }}
        >
          {post.body}
        </Markdown>
      </div>
    </article>
  );
}
