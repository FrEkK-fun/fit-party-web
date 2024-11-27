import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import useAuthStore from '../store/authStore';
import usePlayerStore from '../store/playerStore';
import { fetcher } from '../utils/http';
import { loadLocal } from '../utils/localStorage';
import { randomWelcome } from '../utils/welcomeMessages';

import HeroSection from '../components/HeroSection';
import Notification from '../components/Notification';
import CreatePlayerForm from '../components/CreatePlayerForm';
import SessionForm from '../components/SessionForm';

const Home = () => {
  const user = useAuthStore((state) => state.user) || loadLocal('user');
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const player = usePlayerStore((state) => state.player);
  const playerId = user?.players?.[0];

  const [welcomeTitle, setWelcomeTitle] = useState('');
  const [welcomeText, setWelcomeText] = useState('');

  // Fetch player data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/players/${playerId}`, user.token],
    queryFn: fetcher,
    enabled: !!playerId, // Only fetch if playerId is available
  });

  // Set player data in store and generate welcome message
  useEffect(() => {
    if (data) {
      setPlayer(data);
    }
  }, [data, setPlayer]);

  // Generate welcome message when player data is available
  useEffect(() => {
    if (player) {
      const welcome = randomWelcome(player.name);
      setWelcomeTitle(welcome.welcomeTitle);
      setWelcomeText(welcome.welcomeText);
    }
  }, [player]);

  // If user has no players, show create player form
  if (!user.players || user.players.length === 0) {
    return <CreatePlayerForm />;
  }

  return (
    <>
      {/* Info states */}
      {isLoading && (
        <div className="h-fit w-full">
          <Notification type="info">Loading player data...</Notification>
        </div>
      )}
      {isError && (
        <div className="h-fit w-full">
          <Notification type="error">Could not fetch player</Notification>
        </div>
      )}
      {/* Logging */}
      <section>
        {player && welcomeTitle && welcomeText && (
          <HeroSection title={welcomeTitle} text={welcomeText} h1="true" />
        )}
        {player && <SessionForm />}
      </section>
      {/* Quick stats */}
      <section>
        <HeroSection
          title="Performance Overview"
          text="Essential insights summarized"
        />
      </section>
      {/* Blog */}
      <section></section>
    </>
  );
};

export default Home;
