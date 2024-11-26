import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useAuthStore from '../store/authStore';
import usePlayerStore from '../store/playerStore';
import { fetcher } from '../utils/http';
import { loadLocal } from '../utils/localStorage';

import CreatePlayerForm from '../components/CreatePlayerForm';
import SessionForm from '../components/SessionForm';
import WeeklyGoal from '../components/WeeklyGoal';

const Home = () => {
  const user = useAuthStore((state) => state.user) || loadLocal('user');
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const player = usePlayerStore((state) => state.player);
  const playerId = user?.players?.[0];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/players/${playerId}`, user.token],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (data) {
      setPlayer(data);
    }
  }, [data, setPlayer]);

  if (!user.players || user.players.length === 0) {
    return <CreatePlayerForm />;
  }

  return (
    <main>
      <h2>Home</h2>
      <div>
        {player && <SessionForm />}
        {player && player.weekly.goal.description === '' && (
          <div>
            <h3>Weekly goal</h3>
            <WeeklyGoal player={player} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
