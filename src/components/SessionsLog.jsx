import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';

import {
  calcXpViewValue,
  groupSessionsByDay,
  bulkSessionsPerWeek,
  calcLevel,
} from '../utils/sessionsXpLevelUtils';
import useAuthStore from '../store/authStore';
import { deleter } from '../utils/http';

import Modal from './Modal';

export default function SessionsLog({ playerId, sessions }) {
  const user = useAuthStore((state) => state.user);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const queryClient = useQueryClient();
  const sessionsPerWeek = bulkSessionsPerWeek(sessions);

  const isSelf = user?.players[0] === playerId;

  const deleteMutation = useMutation({
    mutationFn: ({ playerId, sessionId, token }) =>
      deleter({
        url: `/sessions/players/${playerId}/sessions/${sessionId}`,
        token: token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([`/players/${playerId}`]);
      queryClient.invalidateQueries(['/teams']);
      setSessionToDelete(null);
    },
  });

  const handleDelete = (sessionId) => {
    deleteMutation.mutate({
      playerId,
      sessionId,
      token: user.token,
    });
  };

  const openDeleteModal = (session) => {
    setSessionToDelete(session);
  };

  const closeDeleteModal = () => {
    setSessionToDelete(null);
  };

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  }

  return (
    <div>
      {Object.entries(sessionsPerWeek)
        .reverse()
        .map(([weekNr, weekSessions]) => {
          const sessionsPerDay = groupSessionsByDay(weekSessions);
          return (
            <div
              key={weekNr}
              className={`${weekNr % 2 === 0 ? 'mb-12 flex w-full flex-col gap-y-12 px-4 sm:flex-row' : 'mb-12 flex w-full flex-col gap-y-12 bg-black/5 px-4 py-12 sm:flex-row dark:bg-black/10'}`}
            >
              <div className="flex w-full flex-col gap-4 sm:w-1/2">
                <h3 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">{`Week ${weekNr}`}</h3>
                <div className="flex flex-wrap gap-x-12 gap-y-2">
                  <p className="text-text-primary dark:text-text-primary-dark">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas[`dumbbell`]}
                      className="mr-4 text-color-system-accent-pink"
                    />
                    {`${calcXpViewValue(weekSessions)} XP`}
                  </p>
                  <p className="text-text-primary dark:text-text-primary-dark">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas[`signal-bars-good`]}
                      className="mr-4 text-color-system-accent-pink"
                    />
                    {`Level ${calcLevel(calcXpViewValue(weekSessions))}`}
                  </p>
                  <p className="text-text-primary dark:text-text-primary-dark">
                    <FontAwesomeIcon
                      icon={byPrefixAndName.fas[`person-running`]}
                      className="mr-4 text-color-system-accent-pink"
                    />
                    {`${weekSessions.length} Sessions`}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                {Object.keys(sessionsPerDay).map((day) => (
                  <div key={day} className="flex w-full gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <FontAwesomeIcon
                        icon={byPrefixAndName.fas[`calendar-day`]}
                        className="text-xl text-color-system-accent-pink"
                      />
                      <div className="mt-2 w-[2px] flex-grow bg-border-primary dark:bg-border-primary-dark"></div>
                    </div>
                    <div className="flex min-h-20 w-full flex-col gap-2">
                      <h4 className="font-semibold text-text-primary dark:text-text-primary-dark">
                        {getDayOfWeek(day)}
                      </h4>
                      <ul className="w-full list-disc flex-col pl-5 marker:text-color-system-accent-pink">
                        {sessionsPerDay[day].map((session) => (
                          <li
                            key={session._id}
                            className="w-full rounded-md p-2 hover:bg-background-color-secondary hover:dark:bg-background-color-secondary-dark"
                          >
                            <div className="group flex w-full items-center justify-between">
                              <p className="text-sm text-text-primary dark:text-text-primary-dark">
                                {session.intensity} intensity{' '}
                                {session.title.toLowerCase()}
                              </p>
                              {isSelf && (
                                <button
                                  onClick={() => openDeleteModal(session)}
                                  className=""
                                >
                                  <FontAwesomeIcon
                                    icon={byPrefixAndName.fas[`x`]}
                                    className="text-sm text-border-primary group-hover:text-color-system-accent-pink-dark dark:text-border-primary-dark"
                                  />
                                </button>
                              )}
                            </div>
                            {sessionToDelete && (
                              <Modal onClose={closeDeleteModal}>
                                <h3 className="text-xl font-bold">
                                  Delete Session
                                </h3>
                                <p>
                                  Are you sure you want to delete this session?
                                </p>
                                <div className="flex justify-end gap-4">
                                  <button
                                    onClick={() =>
                                      handleDelete(sessionToDelete._id)
                                    }
                                    disabled={deleteMutation.isPending}
                                    className={`rounded bg-background-color-error px-4 py-2 text-text-alternate hover:bg-text-error dark:bg-background-color-error-dark dark:hover:bg-text-error-dark ${
                                      deleteMutation.isPending
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                    }`}
                                  >
                                    {deleteMutation.isPending
                                      ? 'Deleting...'
                                      : 'Delete'}
                                  </button>
                                  <button
                                    onClick={closeDeleteModal}
                                    className="rounded bg-background-color-button-primary px-4 py-2 text-text-primary hover:bg-background-color-button-selected dark:bg-background-color-button-primary-dark dark:text-text-primary-dark dark:hover:bg-background-color-button-selected-dark"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
