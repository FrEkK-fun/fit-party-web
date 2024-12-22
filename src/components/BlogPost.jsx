import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Markdown from 'markdown-to-jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import parseTimestamp from '../utils/parseTimestamp';
import useAuthStore from '../store/authStore';
import { deleter } from '../utils/http';

import YoutubeEmbed from './YoutubeEmbed';
import Modal from './Modal';

export default function BlogPost({ post }) {
  const user = useAuthStore((state) => state.user);
  const [timestamp, setTimestamp] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (post) {
      const parsedTimestamp = parseTimestamp(post.createdAt).toDateString();
      setTimestamp(parsedTimestamp);
    }
  }, [post]);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ postId, token }) =>
      deleter({
        url: `/blogs/${postId}`,
        token: token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      navigate('/blog');
    },
  });

  const handleDelete = () => {
    mutate({ postId: post._id, token: user.token });
    closeModal();
  };

  return (
    <>
      <article className="flex w-full flex-col border-b border-border-primary pb-12 dark:border-border-primary-dark">
        <div className="mb-6 flex flex-wrap items-center justify-between text-3xl">
          <h2 className="font-bold text-text-primary dark:text-text-primary-dark">
            {post.title}
          </h2>
          {user.isAdmin && (
            <div className="flex gap-4">
              <Link to={`/blog/${post._id}/edit`}>
                <FontAwesomeIcon
                  className="rounded-full text-color-system-accent-pink"
                  icon={byPrefixAndName.fad['file-pen']}
                />
              </Link>

              <button type="button" onClick={openModal}>
                <FontAwesomeIcon
                  className="rounded-full text-text-error dark:text-text-error-dark"
                  icon={byPrefixAndName.fad['trash-xmark']}
                />
              </button>
            </div>
          )}
        </div>
        <YoutubeEmbed embedId={post.videoLink} />
        <p className="mt-4 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          <span className="block font-normal">Published on</span>
          {timestamp}
        </p>
        <div className="prose mx-auto mt-6 max-w-[65ch] text-text-primary dark:text-text-primary-dark">
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
      {isOpen && (
        <Modal onClose={closeModal}>
          <h3 className="text-xl font-bold">Delete Post</h3>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className={`rounded bg-background-color-error px-4 py-2 text-text-alternate hover:bg-text-error dark:bg-background-color-error-dark dark:hover:bg-text-error-dark ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={closeModal}
              className="rounded bg-background-color-button-primary px-4 py-2 text-text-primary hover:bg-background-color-button-selected dark:bg-background-color-button-primary-dark dark:text-text-primary-dark dark:hover:bg-background-color-button-selected-dark"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
