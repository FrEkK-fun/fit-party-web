import { create } from 'zustand';

import { loadLocal } from '../utils/localStorage';

const useAuthStore = create((set) => ({
  user: loadLocal('user') || null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  addPlayer: (newPlayer) =>
    set((state) => ({
      user: {
        ...state.user,
        players: [newPlayer._id, ...(state.user?.players || [])],
      },
    })),
}));

export default useAuthStore;
