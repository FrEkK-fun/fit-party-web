import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import useAuthStore from '../store/authStore';
import usePlayerStore from '../store/playerStore';
import { fetcher } from '../utils/http';
import { loadLocal } from '../utils/localStorage';
import { randomWelcome } from '../utils/welcomeMessages';

import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from '../components/HeroSection';
import SectionHeader from '../components/SectionHeader';
import Notification from '../components/Notification';
import CreatePlayerForm from '../components/CreatePlayerForm';
import SessionForm from '../components/SessionForm';
import WeeklyGoal from '../components/WeeklyGoal';
import StatBox from '../components/StatBox';
import BlogPost from '../components/BlogPost';

const Home = () => {
  const user = useAuthStore((state) => state.user) || loadLocal('user');
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const player = usePlayerStore((state) => state.player);
  const playerId = user?.players?.[0];

  const [welcomeTitle, setWelcomeTitle] = useState('');
  const [welcomeText, setWelcomeText] = useState('');

  // Fetch player data
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/players/${playerId}`, user.token],
    queryFn: fetcher,
    enabled: !!playerId, // Only fetch if playerId is available
  });

  // Fetch teams data
  const { data: teamsData } = useQuery({
    queryKey: ['/teams'],
    queryFn: fetcher,
  });

  // Fetch Blog
  const { data: blogData } = useQuery({
    queryKey: ['/blogs'],
    queryFn: fetcher,
  });

  // Set player data in store and generate welcome message
  useEffect(() => {
    if (data) {
      setPlayer(data);
    }

    if (teamsData) {
      console.log(teamsData);
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
      <section>
        {/* Info states */}
        {isLoading && (
          <div className="mt-24 flex h-fit justify-center">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="mt-6 h-fit w-full">
            <Notification type="error">Could not fetch player</Notification>
          </div>
        )}
        {/* Logging & Goal */}
        {player && welcomeTitle && welcomeText && (
          <HeroSection title={welcomeTitle} text={welcomeText} h1="true" />
        )}
        {player && (
          <div className="flex flex-col gap-12">
            <SessionForm />
            <div className="flex w-full flex-col gap-4 text-text-primary sm:flex-row sm:items-center dark:text-text-primary-dark">
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
                <WeeklyGoal player={player} />
              </div>
            </div>
          </div>
        )}
      </section>
      {player && teamsData && (
        <section className="my-24">
          {/* Quick stats */}
          <HeroSection
            title="Performance Overview"
            text="Essential insights summarized"
          />
          {/* Player, weekly stats */}
          <div className="mt-12 flex flex-col gap-24">
            <div>
              <SectionHeader
                icon="chess-pawn"
                title="Your Weekly Performance Achievements"
                text="Stay motivated by tracking your personal stats! Here, you can focus solely on your progress. Celebrate your victories and identify areas for improvement."
                linkText="View all your stats"
                link="/"
              />
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatBox title="Class" stat={player.properties.class} />
                <StatBox title="Weekly XP" stat={player.weekly.xp} />
                <StatBox title="Weekly Level" stat={player.weekly.level} />
              </div>
            </div>
            {/* Team, star inventory */}
            <div>
              <SectionHeader
                icon="star"
                title="Team Star Inventory"
                text="Stay informed with essential stats showcasing all teams' performances. Our stats section offers a concise overview of crucial metrics that truly matter. Track your progress and inspire your teammates to achieve greater heights!"
                linkText="View all team stats"
                link="teams"
              />
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {teamsData.map((team) => (
                  <StatBox
                    key={team._id}
                    team={team.teamName.toLowerCase()}
                    title={`Team ${team.teamName} Stars`}
                    stat={team.inventory.stars}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Blog */}
      {player && blogData && (
        <section className="mb-12 flex flex-col items-center gap-6">
          <HeroSection
            title="Latest Game Updates"
            text="Stay updated with the latest post from the blog"
          />
          <BlogPost post={blogData[0]} />
          <Link
            to={`/blog`}
            className="text-sm text-link-primary hover:underline dark:text-link-primary-dark"
          >
            View All Blog Posts
            <span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas[`chevron-right`]}
                className="ml-2 text-xs text-link-secondary dark:text-link-secondary-dark"
              />
            </span>
          </Link>
        </section>
      )}
    </>
  );
};

export default Home;
