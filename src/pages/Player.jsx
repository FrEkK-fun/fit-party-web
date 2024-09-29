import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import backendURL from "../config";

// Components
import PlayerDetails from "../components/PlayerDetails";

const Player = () => {
	const { playerId } = useParams();
	const { player, dispatch } = usePlayerContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchPlayer = async () => {
			const res = await fetch(`${backendURL}/api/players/${playerId}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const json = await res.json();

			if (res.ok) {
				dispatch({ type: "SET_PLAYER", payload: json });
			}
		};

		if (user) {
			fetchPlayer();
		}
	}, [dispatch, playerId, user]);

	return (
		<main>
			<h2>Player</h2>
			<div className="player">
				{player && <PlayerDetails key={player._id} player={player} />}
			</div>
		</main>
	);
};

export default Player;
