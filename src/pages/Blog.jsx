import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../utils/http';
import useAuthStore from '../store/authStore';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import Notification from '../components/Notification';
import BlogPost from '../components/BlogPost';

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
          <HeroSection
            title="Fit Blog"
            h1="true"
            text="Keep up to date on the latest fitness party news!"
          />
        )}
      </section>
      {data && (
        <section className="text-text-primary dark:text-text-primary-dark">
          <BlogPost post={data[0]} />
        </section>
      )}
    </>
  );
}
