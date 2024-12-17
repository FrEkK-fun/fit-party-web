import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../utils/http';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import SectionHeader from '../components/SectionHeader';
import Notification from '../components/Notification';
import TeamStats from '../components/TeamStats';

export default function PlayersInsights() {
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['/teams'],
    queryFn: fetcher,
  });

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
        <>
          <section className="mt-12">
            <div className="flex flex-col gap-12">
              {/* {teams.map((team) => (
                <TeamStats key={team._id} team={team} />
              ))} */}
              {teams.map((team, index) => (
                <div
                  key={team._id}
                  className={`${index % 2 === 0 ? null : 'bg-black/10 py-12'}`}
                >
                  <TeamStats team={team} />
                </div>
              ))}
            </div>
          </section>

          {/* Top 3 players */}
          <section className="my-24 flex flex-col gap-24">
            <HeroSection title="Meet our Top 3 Players" subtitle="Heroes" />
            <div className="-mt-24">
              <SectionHeader
                title="Absolute Legends"
                icon="stars"
                text="These are the players with the most sessions, XP and highest level in total."
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
