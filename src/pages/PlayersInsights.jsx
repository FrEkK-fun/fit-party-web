import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { fetcher } from '../utils/http';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import Notification from '../components/Notification';
import TeamStats from '../components/TeamStats';

export default function PlayersInsights() {
  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['/teams'],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (teams) {
      console.log(teams);
    }
  }, [teams]);

  return (
    <>
      <section>
        {/* Info states */}
        {isLoading && (
          <div className="mt-24 flex h-fit justify-center">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="mt-6 h-fit w-full">
            <Notification type="error">Could not fetch teams</Notification>
          </div>
        )}
        {/* Hero section */}
        {teams && (
          <HeroSection
            subtitle="Players"
            title="Players Performance Insights"
            text="Discover detailed stats and insights on each player's performance"
          />
        )}
      </section>
      {/* Team stats */}
      {teams && (
        <section>
          <div className="flex flex-col gap-24">
            {teams.map((team) => (
              <TeamStats key={team._id} team={team} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
