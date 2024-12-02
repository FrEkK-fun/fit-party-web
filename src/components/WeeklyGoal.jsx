import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import UseAuthStore from '../store/authStore';
import UsePlayerStore from '../store/playerStore';
import { patcher } from '../utils/http';

import FormInput from './FormInput';
import Button from './Button';
import Notification from './Notification';

export default function WeeklyGoal({ player }) {
  const user = UseAuthStore((state) => state.user);
  const changeGoal = UsePlayerStore((state) => state.changeGoal);
  const playerContext = UsePlayerStore((state) => state.player);
  const [goalDone, setGoalDone] = useState(player.weekly.goal.done);
  const [goalDesc, setGoalDesc] = useState(player.weekly.goal.description);
  const [errMsg, setErrMsg] = useState('');

  async function handleCheck() {
    if (!user) {
      setErrMsg('You must be logged in to check off a goal');
      return;
    }

    await mutate({
      done: !goalDone,
      description: goalDesc,
    });

    console.log(playerContext);
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
      changeGoal(data.weekly.goal);
      setGoalDesc(data.description);
      setGoalDone(data.done);
    },
  });

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
