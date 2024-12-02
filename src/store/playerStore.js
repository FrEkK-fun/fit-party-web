import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
  addSession: (session, weeklyXp, weeklyLevel) =>
    set((state) => ({
      player: {
        ...state.player,
        sessions: [session, ...state.player.sessions],
        weekly: {
          ...state.player.weekly,
          xp: weeklyXp,
          level: weeklyLevel,
        },
      },
    })),
  deleteSession: (sessionId) =>
    set((state) => ({
      player: {
        ...state.player,
        sessions: state.player.sessions.filter(
          (session) => session._id !== sessionId
        ),
      },
    })),
  changeGoal: (goal) =>
    set((state) => ({
      player: {
        ...state.player,
        weekly: {
          ...state.player.weekly,
          goal,
        },
      },
    })),
  updatePlayer: (updatedPlayer) => set({ player: updatedPlayer }),
}));

export default usePlayerStore;
