import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import { fetcher } from '../utils/http';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import Notification from '../components/Notification';
import BlogPost from '../components/BlogPost';

export default function BlogPostDetails() {
  const { postId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/blogs/${postId}`],
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
            <Notification type="error">
              Could not fetch blog post data
            </Notification>
          </div>
        )}
        {/* Hero title */}
        {data && (
          <div className="mb-12">
            <HeroSection
              title="Fit Blog"
              h1="true"
              text="Keep up to date on the latest Fit Party news!"
            />
            <div className="flex flex-col gap-4">
              <Link
                to={`/blog/`}
                className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
              >
                <span>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas[`chevron-left`]}
                    className="mr-2 text-xs text-link-secondary dark:text-link-secondary-dark"
                  />
                </span>
                Back to Blog
              </Link>
              <BlogPost post={data} />
              <Link
                to={`/blog/`}
                className="mb-4 text-center text-sm text-link-primary hover:underline dark:text-link-primary-dark"
              >
                <span>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas[`chevron-left`]}
                    className="mr-2 text-xs text-link-secondary dark:text-link-secondary-dark"
                  />
                </span>
                Back to Blog
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
