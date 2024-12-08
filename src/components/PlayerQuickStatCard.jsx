import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import { playerWeeklySessions } from '../utils/getPlayerWeeklySessions';

import PlayerClassAndIcon from './PlayerClassAndIcon';
import PlayerGoalAndIcon from './PlayerGoalAndIcon';

export default function PlayerQuickStatCard({ player }) {
  const weeklySessions = playerWeeklySessions(player);

  return (
    <Link
      to={`/players/${player._id}`}
      className="max-h-fit min-w-fit rounded-md p-4 hover:bg-background-color-secondary hover:dark:bg-background-color-secondary-dark"
    >
      <div className="flex gap-4 text-text-primary dark:text-text-primary-dark">
        {player.icon ? (
          <img
            src={player.icon}
            alt={player.name}
            className="h-48 w-48 rounded-full"
          />
        ) : (
          <FontAwesomeIcon
            className="rounded-full text-5xl text-color-system-accent-pink"
            icon={byPrefixAndName.fad['circle-user']}
          />
        )}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{player.name}</h3>
          <PlayerClassAndIcon player={player} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1 text-text-primary dark:text-text-primary-dark">
        <div className="flex items-center gap-1 font-medium">
          <p className="min-w-fit">
            {weeklySessions.length}{' '}
            {weeklySessions.length === 1 ? 'Session' : 'Sessions'}
          </p>
          <FontAwesomeIcon
            className="mx-1 text-lg text-border-primary dark:text-border-primary-dark"
            icon={byPrefixAndName.fad['pipe']}
          />
          <p className="min-w-fit">{player.weekly.xp} XP</p>
          <FontAwesomeIcon
            className="mx-1 text-lg text-border-primary dark:text-border-primary-dark"
            icon={byPrefixAndName.fad['pipe']}
          />
          <p className="min-w-fit">Level {player.weekly.level}</p>
        </div>
        <PlayerGoalAndIcon player={player} />
      </div>
    </Link>
  );
}
