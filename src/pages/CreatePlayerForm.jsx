import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../store/authStore';
import { poster, patcher } from '../utils/http';
import { saveLocal } from '../utils/localStorage';

import FormInput from '../components/FormInput';
import FormSelect from '../components//FormSelect';
import Button from '../components//Button';
import Notification from '../components//Notification';

const CreatePlayerForm = () => {
  const [name, setName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [team, setTeam] = useState('');
  const user = useAuthStore((state) => state.user);
  const loginUser = useAuthStore((state) => state.login);
  const addPlayer = useAuthStore((state) => state.addPlayer);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Team MongoDB IDs - hardcoded for now
  const teamMongoIds = {
    Blue: '674da219bd5c35fb1f9168d4',
    Red: '674da219bd5c35fb1f9168d4',
    Yellow: '674da506bd5c35fb1f9168d9',
  };

  // Create player mutation
  const createPlayerMutation = useMutation({
    mutationFn: (newPlayer) =>
      poster({
        url: '/players',
        body: newPlayer,
        token: user.token,
      }),
    onSuccess: (data) => {
      // Update team document
      updateTeamMutation.mutate({
        teamId: teamMongoIds[team],
        playerId: data._id,
        token: user.token,
      });

      // Update user document
      updateUserMutation.mutate({
        playerId: data._id,
        token: user.token,
      });
    },
  });

  // Update team mutation
  const updateTeamMutation = useMutation({
    mutationFn: (updateData) =>
      patcher({
        url: `/teams/${updateData.teamId}`, // Changed URL to match team route
        body: {
          $push: { players: updateData.playerId }, // Add player to team's players array
        },
        token: updateData.token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['/teams']); // Invalidate teams cache
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
        players: [...(user.players || []), data.players[0]],
        isAdmin: data.isAdmin,
      };
      saveLocal('user', updatedUser);

      // Log the user in with the updated user data
      loginUser(updatedUser);

      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({
        queryKey: [`/players/${data._id}`, user.token],
      });

      // Navigate to home page
      navigate('/');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      userId: '65df1acca34a41a5739908e2', // Hardcoded "game id" for Unity
      icon: '',
      team: {
        teamName: team,
        isTeamLeader: false,
        teamIdMongo: teamMongoIds[team].toString(),
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
