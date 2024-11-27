import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import UseAuthStore from '../store/authStore';
import UsePlayerStore from '../store/playerStore';
import { poster } from '../utils/http';

import Button from './Button';
import FormRadioButton from './FormRadioButton';
import FormInput from './FormInput';
import FormDatePicker from './FormDatePicker';
import Notification from './Notification';

export default function SessionForm() {
  const user = UseAuthStore((state) => state.user);
  const player = UsePlayerStore((state) => state.player);
  const setSession = UsePlayerStore((state) => state.addSession);

  const [intensity, setIntensity] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errMsg, setErrMsg] = useState('');
  const [hasLogged, setHasLogged] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) =>
      poster({
        url: `/sessions/players/${player._id}/sessions`,
        body: data.session,
        token: data.token,
      }),
    onSuccess: (data) => {
      setSession(data);
      setTitle('');
      setIntensity(null);
      setHasLogged(true);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrMsg('You must be logged in to add a session');
      return;
    }

    if (!intensity) {
      setErrMsg('You must set an intensity level');
      return;
    }

    const token = user.token;
    await mutate({
      session: {
        intensity,
        title,
        timestamp: date,
        syncTimestamp: null,
      },
      token: token,
    });
  };

  return (
    <>
      {hasLogged && (
        <div className="mx-auto max-h-fit w-full rounded-md border-border-primary bg-background-color-secondary px-4 py-8 dark:border-border-primary-dark dark:bg-background-color-secondary-dark">
          <h2 className="text-header-primary text-center text-2xl font-bold sm:text-3xl dark:text-text-header-dark">
            Your Session was Logged!
          </h2>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => setHasLogged(false)}>
              Log Another Session
            </Button>
          </div>
        </div>
      )}
      {!hasLogged && (
        <div className="mx-auto max-h-fit w-full rounded-md border-border-primary bg-background-color-secondary px-4 py-8 dark:border-border-primary-dark dark:bg-background-color-secondary-dark">
          <h2 className="text-header-primary text-center text-2xl font-bold sm:text-3xl dark:text-text-header-dark">
            Log Your Workout Session
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-4 flex w-full flex-col gap-4 sm:w-3/4"
          >
            <div className="mx-auto mt-4 flex w-full flex-wrap justify-between gap-4">
              <FormRadioButton
                label="Intensity"
                type="radio"
                name="intensity"
                value="Easy"
                onChange={() => setIntensity('Easy')}
              />
              <FormRadioButton
                label="Intensity"
                type="radio"
                name="intensity"
                value="Medium"
                onChange={() => setIntensity('Medium')}
              />
              <FormRadioButton
                label="Intensity"
                type="radio"
                name="intensity"
                value="Hard"
                onChange={() => setIntensity('Hard')}
              />
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <div className="xs:flex-grow xs:min-w-fit min-w-full">
                <FormInput
                  label="Workout title"
                  hideLabel
                  placeholder="Workout title..."
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="xs:min-w-fit min-w-full flex-grow sm:flex-grow-0">
                <FormDatePicker
                  label="Workout date"
                  type="date"
                  name="date"
                  value={date}
                  maxToday={true}
                  minThisWeek={true}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            {errMsg && <Notification type="error">{errMsg}</Notification>}
            {isError && (
              <Notification type="error">{error.message}</Notification>
            )}
            <Button disabled={isPending} type="primary">
              Log Workout
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
