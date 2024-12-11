import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import { playerWeeklySessions } from '../utils/getPlayerWeeklySessions';
import { calcLevel } from '../utils/sessionsXpLevelUtils';

import PlayerQuickStatCard from './PlayerQuickStatCard';

export default function TeamStats({ team }) {
  const teamColor = team.teamName.toLowerCase();

  const teamXp = team.players.reduce((acc, player) => {
    return acc + player.weekly.xp;
  }, 0);

  return (
    <div
      className={[
        'flex flex-col gap-12 border-l pl-4 text-text-primary sm:flex-row sm:pl-6 dark:text-text-primary-dark',
        `border-team-color-${teamColor}`,
      ].join(' ')}
    >
      {/* Team block */}
      <div className="flex min-w-fit flex-col gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`chess-pawn`]}
              className={[
                'mr-2 text-2xl sm:text-3xl',
                `text-team-color-${teamColor}`,
              ].join(' ')}
            />
          </span>{' '}
          Team {team.teamName}
        </h2>
        <Link
          to={`/insights/teams/${team._id}`}
          className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
        >
          View Team Page
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`chevron-right`]}
              className="ml-2 text-xs text-link-secondary dark:text-link-secondary-dark"
            />
          </span>
        </Link>
        <p>
          <span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`chess-pawn`]}
              className={'mr-1 text-color-system-accent-pink'}
            />
          </span>{' '}
          {team.players.length}{' '}
          {team.players.length === 1 ? 'Player' : 'Players'}
        </p>
        {/* Workout stats */}
        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
          {/* XP */}
          <p>
            <span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas[`dumbbell`]}
                className={'mr-1 text-color-system-accent-pink'}
              />
            </span>{' '}
            {teamXp} XP
          </p>
          {/* Level */}
          <p>
            <span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas[`signal-bars-good`]}
                className={'mr-1 text-color-system-accent-pink'}
              />
            </span>{' '}
            Level {calcLevel(teamXp)}
          </p>
          {/* Sessions */}
          <p>
            <span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas[`person-running`]}
                className={'mr-1 text-color-system-accent-pink'}
              />
            </span>{' '}
            {team.players.reduce((acc, player) => {
              const playerSessions = playerWeeklySessions(player);
              return acc + playerSessions.length;
            }, 0)}{' '}
            {team.players.reduce((acc, player) => {
              const playerSessions = playerWeeklySessions(player);
              return acc + playerSessions.length;
            }, 0) === 1
              ? 'Session'
              : 'Sessions'}
          </p>
        </div>
        {/* Inventory */}
        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
          {/* Stars */}
          <div className="flex items-center gap-2">
            <img src="/img/StarIcon.png" alt="Star" className="mr-1 h-6 w-6" />
            <p>
              {team.inventory.stars}{' '}
              {team.inventory.stars === 1 ? 'Star' : 'Stars'}
            </p>
          </div>
          {/* Gold */}
          <div className="flex items-center gap-2">
            <img src="/img/CoinIcon.png" alt="Coins" className="mr-1 h-6 w-6" />
            <p>{team.inventory.gold} Gold</p>
          </div>
          {/* Wood */}
          <div className="flex items-center gap-2">
            <img
              src="/img/WoodIcon.png"
              alt="Wood logs"
              className="mr-1 h-6 w-6"
            />
            <p>{team.inventory.wood} Wood</p>
          </div>
          {/* Minerals */}
          <div className="flex items-center gap-2">
            <img
              src="/img/MineralIcon.png"
              alt="Mineral rocks"
              className="mr-1 h-6 w-6"
            />
            <p>{team.inventory.minerals} Minerals</p>
          </div>
        </div>
      </div>
      {/* Players block */}
      <div className="-ml-4 grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:-mt-4 sm:ml-0">
        {team.players.map((player) => (
          <PlayerQuickStatCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
}
