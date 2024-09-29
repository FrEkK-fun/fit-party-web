import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

export const usePlayerContext = () => {
	const context = useContext(PlayerContext);
	if (!context) {
		throw new Error(
			"usePlayerContext must be used within a PlayerContextProvider"
		);
	}
	return context;
};
