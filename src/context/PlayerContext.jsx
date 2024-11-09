import { createContext, useReducer } from "react";

export const PlayerContext = createContext();

export const playerReducer = (state, action) => {
	switch (action.type) {
		case "SET_PLAYER":
			return {
				...state,
				player: action.payload,
			};
		case "ADD_SESSION":
			return {
				...state,
				player: {
					...state.player,
					sessions: [action.payload.session, ...state.player.sessions],
					weekly: {
						...state.player.weekly,
						xp: action.payload.weeklyXp,
						level: action.payload.weeklyLevel,
					},
				},
			};
		case "DELETE_SESSION":
			return {
				...state,
				player: {
					...state.player,
					sessions: state.player.sessions.filter(
						(session) => session._id !== action.payload._id
					),
				},
			};
		case "UPDATE_PLAYER":
			return {
				...state,
				player: {
					...state.player,
					...action.payload,
				},
			};
		default:
			return state;
	}
};

export const PlayerContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(playerReducer, { player: null });

	return (
		<PlayerContext.Provider value={{ ...state, dispatch }}>
			{children}
		</PlayerContext.Provider>
	);
};
