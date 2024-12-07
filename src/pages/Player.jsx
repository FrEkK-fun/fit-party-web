import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import UseAuthStore from '../store/authStore';
import UsePlayerStore from '../store/playerStore';
import { fetcher } from '../utils/http';
import { playerWeeklySessions } from '../utils/getPlayerWeeklySessions';

import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';
import HeroSection from '../components/HeroSection';
import StatBox from '../components/StatBox';
import SessionForm from '../components/SessionForm';
import WeeklyGoal from '../components/WeeklyGoal';
import PlayerGoalAndIcon from '../components/PlayerGoalAndIcon';

export default function Player() {
  const user = UseAuthStore((state) => state.user);
  const { playerId } = useParams();
  const [team, setTeam] = useState('');
  const [teamIcon, setTeamIcon] = useState('');
  const [isSelf, setIsSelf] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/players/${playerId}`],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
    }

    if (user && data && user.players[0] === data._id) {
      setIsSelf(true);
    }

    if (data) {
      setTeam(data.team.teamIdMongo);
    }

    if (team && team.icon) {
      setTeamIcon(data.team.teamIdMongo.icon);
    }

    if (team && !team.icon) {
      setTeamIcon(`/img/Team${team.teamName}Icon.png`);
    }
  }, [data, team, user]);

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
            <Notification type="error">Could not fetch team data</Notification>
          </div>
        )}
        {/* Hero title */}
        {data && <HeroSection subtitle="Player" title={data.name} h1="true" />}
      </section>
      {data && team && (
        <div className="flex flex-col gap-12">
          {/* Total Player Stats */}
          <section>
            <div className="mt-12 flex w-full flex-col gap-4 text-text-primary sm:flex-row sm:items-center dark:text-text-primary-dark">
              <div className="flex flex-col items-start gap-2 sm:w-1/2">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas[`signal-bars-good`]}
                  className="text-3xl text-color-system-accent-pink"
                />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Total Player Stats
                </h2>
                <p>
                  This section presents the overall statistics, showcasing
                  cumulative data that highlights performance over time.
                </p>
              </div>
              <div className="sm:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  <StatBox title="Sessions" stat={data.sessions.length} />
                  <StatBox title="XP" stat="N/A" />
                  <StatBox title="Level" stat="N/A" />
                  <StatBox title="HP" stat="N/A" />
                </div>
              </div>
            </div>
          </section>
          {/* Team */}
          <section>
            <div className="flex flex-col py-12 xs:flex-row xs:items-center xs:px-6 xs:py-24">
              <div className="xs:min-w-1/3 mx-auto xs:mx-0">
                <img src={teamIcon} alt={data.teamName} className="h-48 w-48" />
              </div>
              <div className="xs:max-w-2/2 flex flex-col gap-4 text-text-primary dark:text-text-primary-dark">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Team</p>
                  <h1 className="text-4xl font-bold text-text-header sm:text-5xl dark:text-text-header-dark">
                    {team.teamName}
                  </h1>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 xs:gap-6 sm:gap-24">
                  <StatBox title="Players" stat={team.players.length} />
                  <StatBox title="Stars" stat={team.inventory.stars} />
                </div>
                <Link
                  to={`/teams/${team._id}`}
                  className="mt-4 text-sm text-link-primary hover:underline dark:text-link-primary-dark"
                >
                  View Team Page
                  <span>
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas[`chevron-right`]}
                      className="ml-2 text-xs text-link-secondary dark:text-link-secondary-dark"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </section>
          {/* Player Weekly Stats */}
          <section>
            <div className="mt-12 flex w-full flex-col gap-4 text-text-primary sm:flex-row sm:items-center dark:text-text-primary-dark">
              <div className="flex flex-col items-start gap-2 sm:w-1/2">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas[`calendar-days`]}
                  className="text-3xl text-color-system-accent-pink"
                />
                <h2 className="text-2xl font-bold sm:text-3xl">Weekly Stats</h2>
                <p>
                  This section presents the weekly statistics, showcasing the
                  performance of the team over the past week.
                </p>
              </div>
              <div className="sm:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  <StatBox
                    title="Sessions"
                    stat={playerWeeklySessions(data).length}
                  />
                  <StatBox title="XP" stat={data.weekly.xp} />
                  <StatBox title="Level" stat={data.weekly.level} />
                  <StatBox title="HP" stat="N/A" />
                  <StatBox title="Class" stat={data.properties.class} />
                </div>
              </div>
            </div>
          </section>
          {/* Logging and Goal */}
          <section className="flex flex-col gap-12">
            <div className="flex w-full flex-col gap-4 py-12 text-text-primary sm:flex-row sm:items-center dark:text-text-primary-dark">
              <div className="sm:w-1/2">
                <FontAwesomeIcon
                  icon={byPrefixAndName.fas[`bullseye`]}
                  className="text-3xl text-color-system-accent-pink"
                />
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Weekly Goal
                </h3>
              </div>
              <div className="sm:w-1/2">
                {isSelf && <WeeklyGoal player={data} />}
                {!isSelf && <PlayerGoalAndIcon player={data} />}
              </div>
            </div>
            {isSelf && <SessionForm />}
          </section>
        </div>
      )}
    </>
  );
}
