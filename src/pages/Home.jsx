import { useAuthContext } from "../hooks/useAuthContext";
import CreatePlayerForm from "../components/CreatePlayerForm";

import { useEffect } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import backendURL from "../config";

// Components
import SessionForm from "../components/SessionForm";

const Home = () => {
	const { user } = useAuthContext();

	const { player, dispatch } = usePlayerContext();
	const playerId = user.players[0];

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

	// If the user has no players, show the create player form
	if (!user.players || user.players.length === 0) {
		return <CreatePlayerForm />;
	}

	console.log(backendURL);

	// If the user is logged in and has players, show the home content
	return (
		<main>
			<h2>Home</h2>
			<SessionForm />
		</main>
	);
};

export default Home;
