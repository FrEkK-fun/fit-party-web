import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import useAuthStore from '../store/authStore';
import { poster, patcher, fetcher } from '../utils/http';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Notification from '../components/Notification';

export default function BlogForm() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: post } = useQuery({
    queryKey: [`/blogs/${postId}`],
    queryFn: fetcher,
    enabled: !!postId,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setVideoLink(post.videoLink);
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: (data) =>
      post
        ? patcher({
            url: `/blogs/${post._id}`,
            body: data.blog,
            token: data.token,
          })
        : poster({
            url: '/blogs',
            body: data.blog,
            token: data.token,
          }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      navigate('/blog');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      body,
      videoLink,
      author: user.userId,
    };

    mutation.mutate({
      blog: blogData,
      token: user.token,
    });
  };

  const handleCancel = () => {
    navigate('/blog');
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="mx-auto mt-12 text-text-primary dark:text-text-primary-dark">
        <h1 className="mb-6 text-center text-5xl font-bold text-text-header dark:text-text-header-dark">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
      </div>
      <form
        className="mx-auto mb-12 flex w-full flex-col gap-6 sm:max-w-2xl"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          label="Video Link ID"
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          placeholder="youtube.com/watch?v=VIDEO_ID"
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="body"
            className="text-text-primary dark:text-text-primary-dark"
          >
            Content
          </label>
          <p className="text-sm italic text-text-primary dark:text-text-primary-dark">
            The content supports{' '}
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
            >
              markdown formatting
            </a>
          </p>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[400px] rounded border border-border-primary bg-background-color-primary p-4 text-text-primary outline-none focus:outline-none focus:ring-2 focus:ring-border-tertiary dark:border-border-primary-dark dark:bg-background-color-primary-dark dark:text-text-primary-dark dark:focus:ring-border-tertiary-dark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending
              ? 'Saving...'
              : post
                ? 'Update Post'
                : 'Create Post'}
          </Button>
          <Button type="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        {mutation.isError && (
          <Notification type="error">{mutation.error.message}</Notification>
        )}
      </form>
    </div>
  );
}
