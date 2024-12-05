import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../utils/http';
import { playerWeeklySessions } from '../utils/getPlayerWeeklySessions';

import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';
import SectionHeader from '../components/SectionHeader';
import HeroSection from '../components/HeroSection';
import StatBox from '../components/StatBox';
import InventoryBox from '../components/InventoryBox';
import GameCard from '../components/GameCard';
import PlayerQuickStatCard from '../components/PlayerQuickStatCard';

export default function Team() {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [teamIcon, setTeamIcon] = useState('');

  // Fetch team data
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/teams/${teamId}`],
    queryFn: fetcher,
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      setTeamName(data.teamName);
    }

    if (data && data.icon) {
      setTeamIcon(data.icon);
    }

    if (data && !data.icon) {
      setTeamIcon(`/img/Team${data.teamName}Icon.png`);
    }
  }, [data]);

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
            <Notification type="error">Could not fetch team data</Notification>
          </div>
        )}
        {/* Hero title */}
        {data && (
          <div className="flex flex-col py-12 xs:flex-row xs:items-center xs:px-6 xs:py-24">
            <div className="xs:min-w-1/3 mx-auto xs:mx-0">
              <img src={teamIcon} alt={data.teamName} className="h-48 w-48" />
            </div>
            <div className="xs:max-w-2/2 flex flex-col gap-4 text-text-primary dark:text-text-primary-dark">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Team</p>
                <h1 className="text-4xl font-bold text-text-header sm:text-5xl dark:text-text-header-dark">
                  {teamName}
                </h1>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 xs:gap-6 sm:gap-24">
                <StatBox title="Players" stat={data.players.length} />
                <StatBox title="Stars" stat={data.inventory.stars} />
              </div>
            </div>
          </div>
        )}
      </section>
      {data && (
        <div className="flex flex-col gap-12">
          {/* Weekly stats */}
          <section>
            <SectionHeader
              title="Weekly Stats"
              icon="calendar-days"
              h2="true"
            />
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
              <StatBox
                title="Sessions"
                stat={data.players.reduce((acc, player) => {
                  const playerSessions = playerWeeklySessions(player);
                  return acc + playerSessions.length;
                }, 0)}
              />
              <StatBox
                title="XP"
                stat={data.players.reduce((acc, player) => {
                  return acc + player.weekly.xp;
                }, 0)}
              />
            </div>
          </section>
          {/* Inventory */}
          <section>
            <HeroSection title="Resources" sm="true" />
            <div className="grid grid-cols-2 gap-4 xs:grid-cols-4">
              <InventoryBox
                title="Stars"
                amount={data.inventory.stars}
                img="/img/StarIcon.png"
              />
              <InventoryBox
                title="Gold"
                amount={data.inventory.gold}
                img="/img/CoinIcon.png"
              />
              <InventoryBox
                title="Wood"
                amount={data.inventory.wood}
                img="/img/WoodIcon.png"
              />
              <InventoryBox
                title="Minerals"
                amount={data.inventory.minerals}
                img="/img/MineralIcon.png"
              />
            </div>
          </section>
          {/* Cards */}
          <section>
            <HeroSection title="Game Cards" sm="true" />
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 overflow-hidden">
              {data.inventory.cards.map((card) => (
                <GameCard key={card._id} card={card} />
              ))}
            </div>
          </section>
          {/* Team Members */}
          <section>
            <HeroSection
              title="Team Members"
              sm="true"
              subtitle={`Team ${data.teamName}`}
            />
          </section>
          <div className="-mt-24 mb-24 grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {data.players.map((player) => (
              <PlayerQuickStatCard key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
