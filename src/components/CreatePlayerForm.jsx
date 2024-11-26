import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../store/authStore';
import { poster, patcher } from '../utils/http';
import { saveLocal } from '../utils/localStorage';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Button from './Button';
import Notification from './Notification';

const CreatePlayerForm = () => {
  const [name, setName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [team, setTeam] = useState('');
  const user = useAuthStore((state) => state.user);
  const addPlayer = useAuthStore((state) => state.addPlayer);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create player mutation
  const createPlayerMutation = useMutation({
    mutationFn: (newPlayer) =>
      poster({
        url: '/players',
        body: newPlayer,
      }),
    onSuccess: (data) => {
      // Update user document mutation
      updateUserMutation.mutate({
        playerId: data._id,
        token: user.token,
      });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (updateData) =>
      patcher({
        url: '/user/updateUserPlayers',
        body: updateData,
        token: user.token,
      }),
    onSuccess: (data) => {
      // Update auth store with new player
      addPlayer(data);

      // Update local storage
      const updatedUser = {
        ...user,
        players: [...(user.players || []), data._id],
      };
      saveLocal('user', updatedUser);

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['players'] });

      // Navigate to home
      navigate('/');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      userId: user.userId,
      icon: '',
      team: {
        teamName: team,
        isTeamLeader: false,
      },
      properties: {
        class: playerClass,
        level: 1,
        xp: 0,
        attack: 0,
        defence: 0,
      },
      weekly: {
        goal: { description: '', done: false },
        xp: 0,
        level: 0,
      },
      sessions: [],
    };

    createPlayerMutation.mutate(newPlayer);
  };

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="mx-auto mt-12 text-text-primary dark:text-text-primary-dark">
        <h1 className="mb-6 text-center text-5xl font-bold text-text-header dark:text-text-header-dark">
          Create New Player
        </h1>
        <p className="text-center">
          Create a new player to start your FrEkK Fit Party journey
        </p>
      </div>
      <form
        className="mx-auto flex w-full flex-col gap-6 sm:max-w-sm"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Player name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormSelect
          label="Class"
          value={playerClass}
          onChange={(e) => setPlayerClass(e.target.value)}
        >
          <option>--- SELECT ONE ---</option>
          <option value="Fighter">Fighter</option>
          <option value="Defender">Defender</option>
          <option value="Explorer">Explorer</option>
        </FormSelect>
        <FormSelect
          label="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option>--- SELECT ONE ---</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
        </FormSelect>
        <Button
          disabled={
            createPlayerMutation.isPending || updateUserMutation.isPending
          }
          type="submit"
        >
          Create Player
        </Button>
        {(createPlayerMutation.isError || updateUserMutation.isError) && (
          <div className="mt-6">
            <Notification type="error">
              {createPlayerMutation.error?.message ||
                updateUserMutation.error?.message}
            </Notification>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePlayerForm;
