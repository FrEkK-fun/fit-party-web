import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreatePlayerForm = () => {
	const { dispatch, user } = useAuthContext();

	const [name, setName] = useState("");
	const [playerClass, setPlayerClass] = useState("");
	const [team, setTeam] = useState("");
	const [error, setError] = useState(null);

	const localStorageUser = JSON.parse(localStorage.getItem("user"));

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPlayer = {
			name: name,
			userId: "65df1acca34a41a5739908e2",
			icon: "",
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
				goal: { description: "", done: false },
				xp: 0,
				level: 0,
			},
			sessions: [],
		};

		const res = await fetch(
			`${process.env.REACT_APP_DEV_BACKEND_URL}/api/players`,
			{
				method: "POST",
				body: JSON.stringify(newPlayer),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const json = await res.json();

		if (!res.ok) {
			setError(json.error);
		}
		if (res.ok) {
			setError(null);
			dispatch({ type: "ADD_PLAYER", payload: json });

			const newPlayerId = json._id;
			const userToken = user.token;

			// Send a request to the backend to update the user's document
			const updateUserResponse = await fetch(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/api/user/updateUserPlayers`,
				{
					method: "PATCH",
					body: JSON.stringify({ playerId: newPlayerId, token: userToken }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const updatedUser = await updateUserResponse.json();
			// Update the user's players array
			localStorageUser.players = updatedUser.players;
			// Update the user in local storage
			localStorage.setItem("user", JSON.stringify(localStorageUser));
			// Update the user context
			dispatch({ type: "UPDATE_USER", payload: updatedUser });
		}
	};

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<h3 className="margin--bottom">Create a new player</h3>
				<label>Name:</label>
				<input
					className="margin--none"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<div className="flex flex--column">
					<label className="margin--top" htmlFor="class-select">
						Class:
					</label>
					<select
						className="margin--none"
						name="class"
						id="class-select"
						value={playerClass}
						onChange={(e) => setPlayerClass(e.target.value)}>
						<option>--- SELECT ONE ---</option>
						<option value="Fighter">Fighter</option>
						<option value="Defender">Defender</option>
						<option value="Explorer">Explorer</option>
					</select>
					<label className="margin--top" htmlFor="team-select">
						Team:
					</label>
					<select
						className="margin--none"
						name="team"
						id="team-select"
						value={team}
						onChange={(e) => setTeam(e.target.value)}>
						<option>--- SELECT ONE ---</option>
						<option value="Blue">Blue</option>
						<option value="Red">Red</option>
						<option value="Yellow">Yellow</option>
					</select>
				</div>
				<button className="margin--top" type="submit">
					Create player
				</button>
				{error && <p className="error">{error}</p>}
			</form>
		</main>
	);
};

export default CreatePlayerForm;
