import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import useAuthStore from '../store/authStore';
import { patcher, fetcher } from '../utils/http';

import LoadingSpinner from './LoadingSpinner';
import FormInput from './FormInput';
import Button from './Button';
import Notification from './Notification';

export default function WeeklyGoal() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [errMsg, setErrMsg] = useState('');

  const {
    data: player,
    isLoading,
    isError: isPlayerError,
    error: playerError,
  } = useQuery({
    queryKey: [`/players/${user.players[0]}`],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!user?.players[0],
  });

  const [goalDone, setGoalDone] = useState(player?.weekly?.goal?.done || false);
  const [goalDesc, setGoalDesc] = useState(
    player?.weekly?.goal?.description || ''
  );

  useEffect(() => {
    if (player?.weekly?.goal) {
      setGoalDone(player.weekly.goal.done);
      setGoalDesc(player.weekly.goal.description);
    }
  }, [player]);

  async function handleCheck() {
    if (!user) {
      setErrMsg('You must be logged in to check off a goal');
      return;
    }

    await mutate({
      done: !goalDone,
      description: goalDesc,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setErrMsg('You must be logged in to set a goal');
      return;
    }

    await mutate({
      done: false,
      description: e.target.goal.value,
    });
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) =>
      patcher({
        url: `/players/${player._id}/goal`,
        body: { goalObj: data },
        token: user.token,
      }),
    onSuccess: (data) => {
      setGoalDesc(data.weekly.goal.description);
      setGoalDone(data.weekly.goal.done);
      queryClient.invalidateQueries([`/players/${player._id}`]);
      queryClient.invalidateQueries(['/teams']);
    },
  });

  if (isLoading) {
    return (
      <div className="flex content-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPlayerError) {
    return (
      <Notification type="error">
        {`Could not fetch goal data ${playerError.message && ':' + playerError.message}`}
      </Notification>
    );
  }

  return (
    <div className="w-full rounded-sm border border-border-primary bg-background-color-secondary p-4 dark:border-border-primary-dark dark:bg-background-color-secondary-dark">
      {/* Goal not set */}
      {!goalDesc && (
        <div className="flex flex-col gap-4">
          <p>Oh no, you have not yet set a goal for this week!</p>
          <p>
            Reaching your goal at the end of the week grows your weekly level by
            +1.
          </p>
          <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormInput
              label="Set Weekly Goal:"
              name="goal"
              placeholder="Type your new goal.."
              type="text"
            />
            <Button disabled={isPending} wFull="true" type="submit">
              Set Goal
            </Button>
          </form>
        </div>
      )}
      {/* Goal set */}
      {goalDesc && (
        <div className="flex flex-row items-center gap-4">
          <label
            htmlFor="goal"
            className="flex flex-grow flex-row items-center gap-4 hover:cursor-pointer"
          >
            <FontAwesomeIcon
              icon={
                byPrefixAndName.fas[goalDone ? `party-horn` : `spinner-scale`]
              }
              className="text-3xl text-color-system-accent-pink"
            />
            <div className="flex flex-grow flex-col">
              <h4 className="font-semibold">
                {goalDone ? 'Goal reached!' : 'Still working on it'}
              </h4>
              <p className="italic">{goalDesc}</p>
            </div>
          </label>
          <input
            type="checkbox"
            name="goal"
            id="goal"
            checked={goalDone}
            onChange={handleCheck}
            className="h-5 w-5 rounded-md hover:cursor-pointer dark:accent-color-system-success-green"
          />
        </div>
      )}
      {errMsg && (
        <div className="mt-4">
          <Notification type="error">{errMsg}</Notification>
        </div>
      )}
      {isError && (
        <div className="mt-4">
          <Notification type="error">{error.message}</Notification>
        </div>
      )}
    </div>
  );
}
