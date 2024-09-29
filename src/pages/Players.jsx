import { useEffect, useState } from "react";
import backendURL from "../config";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import PlayersDetails from "../components/PlayersDetails";

const Players = () => {
	const [players, setPlayers] = useState(null);

	useEffect(() => {
		const fetchPlayers = async () => {
			const res = await fetch(`${backendURL}/api/players`);
			const json = await res.json();

			if (res.ok) {
				setPlayers(json);
			}
		};

		fetchPlayers();
	}, []);

	return (
		<main>
			<div className="teamWrapper">
				<h2>
					<span>
						<FontAwesomeIcon icon={faFlag} className="team-color-blue" />
					</span>
					Blue team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>
							{players &&
								players.filter((player) => player.team.teamName === "Blue")
									.length}{" "}
							players
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Blue")
									.reduce((acc, player) => acc + player.properties.xp, 0)}{" "}
							xp
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Blue")
									.reduce(
										(acc, player) => acc + player.sessions.length,
										0
									)}{" "}
							sessions
						</p>
					</div>
				</div>
				<div className="players">
					{players &&
						players
							.filter((player) => player.team.teamName === "Blue")
							.map((player) => (
								<PlayersDetails key={player._id} player={player} />
							))}
				</div>
			</div>
			<div className="teamWrapper">
				<h2>
					<span>
						<FontAwesomeIcon icon={faFlag} className="team-color-red" />
					</span>
					Red team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>
							{players &&
								players.filter((player) => player.team.teamName === "Red")
									.length}{" "}
							players
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Red")
									.reduce((acc, player) => acc + player.properties.xp, 0)}{" "}
							xp
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Red")
									.reduce(
										(acc, player) => acc + player.sessions.length,
										0
									)}{" "}
							sessions
						</p>
					</div>
				</div>
				<div className="players">
					{players &&
						players
							.filter((player) => player.team.teamName === "Red")
							.map((player) => (
								<PlayersDetails key={player._id} player={player} />
							))}
				</div>
			</div>
			<div className="teamWrapper">
				<h2>
					<span>
						<FontAwesomeIcon icon={faFlag} className="team-color-yellow" />
					</span>
					Yellow team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>
							{players &&
								players.filter((player) => player.team.teamName === "Yellow")
									.length}{" "}
							players
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Yellow")
									.reduce((acc, player) => acc + player.properties.xp, 0)}{" "}
							xp
						</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>
							{players &&
								players
									.filter((player) => player.team.teamName === "Yellow")
									.reduce(
										(acc, player) => acc + player.sessions.length,
										0
									)}{" "}
							sessions
						</p>
					</div>
				</div>
				<div className="players">
					{players &&
						players
							.filter((player) => player.team.teamName === "Yellow")
							.map((player) => (
								<PlayersDetails key={player._id} player={player} />
							))}
				</div>
			</div>
		</main>
	);
};

export default Players;
