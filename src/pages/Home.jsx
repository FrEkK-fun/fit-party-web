import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useAuthStore from '../store/authStore';
import usePlayerStore from '../store/playerStore';
import { fetcher } from '../utils/http';
import { loadLocal } from '../utils/localStorage';

import Notification from '../components/Notification';
import CreatePlayerForm from '../components/CreatePlayerForm';
import SessionForm from '../components/SessionForm';

const Home = () => {
  const user = useAuthStore((state) => state.user) || loadLocal('user');
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const player = usePlayerStore((state) => state.player);
  const playerId = user?.players?.[0];

  // Fetch player data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/players/${playerId}`, user.token],
    queryFn: fetcher,
    enabled: !!playerId, // Only fetch if playerId is available
  });

  // Set player data in store
  useEffect(() => {
    if (data) {
      setPlayer(data);
    }
  }, [data, setPlayer]);

  // If user has no players, show create player form
  if (!user.players || user.players.length === 0) {
    return <CreatePlayerForm />;
  }

  return (
    <>
      {isError && (
        <div className="h-fit w-full">
          <Notification type="error">Could not fetch player</Notification>
        </div>
      )}
      {player && <SessionForm />}
    </>
  );
};

export default Home;
