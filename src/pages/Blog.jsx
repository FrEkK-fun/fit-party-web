import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import { fetcher } from '../utils/http';
import useAuthStore from '../store/authStore';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import Notification from '../components/Notification';
import BlogPost from '../components/BlogPost';
import BlogPostThumbnail from '../components/BlogPostThumbnail';

export default function Blog() {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['/blogs'],
    queryFn: fetcher,
  });

  return (
    <>
      {/* Info states */}
      <section>
        {isLoading && (
          <div className="mt-24 flex h-fit justify-center">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="mt-6 h-fit w-full">
            <Notification type="error">Could not fetch blog data</Notification>
          </div>
        )}
        {/* Hero title */}
        {data && (
          <>
            <HeroSection
              title="Fit Blog"
              h1="true"
              text="Keep up to date on the latest Fit Party news!"
            />
            {user?.isAdmin && (
              <div className="mb-6 flex w-full justify-end">
                <Link
                  to="/blog/new"
                  className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
                >
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['plus']}
                    className="mr-2"
                  />
                  Create New Post
                </Link>
              </div>
            )}
          </>
        )}
      </section>
      {data && (
        <>
          <section className="text-text-primary dark:text-text-primary-dark">
            <BlogPost post={data[0]} />
          </section>
          <section className="mb-12">
            <HeroSection title="Earlier Posts" text="Browse the archives" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.slice(1).map((post) => (
                <BlogPostThumbnail key={post._id} post={post} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
