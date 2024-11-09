import { useEffect, useState } from "react";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import backendURL from "../config";
import {
	getTeamPlayerCount,
	getTeamWeeklyXp,
	getTeamWeeklySessions,
} from "../utils/getTeamStats";

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

	const blueTeamCount = getTeamPlayerCount(players, "Blue");
	const redTeamCount = getTeamPlayerCount(players, "Red");
	const yellowTeamCount = getTeamPlayerCount(players, "Yellow");

	const blueTeamWeeklyXp = getTeamWeeklyXp(players, "Blue");
	const redTeamWeeklyXp = getTeamWeeklyXp(players, "Red");
	const yellowTeamWeeklyXp = getTeamWeeklyXp(players, "Yellow");

	const blueTeamWeeklySessions = getTeamWeeklySessions(players, "Blue");
	const redTeamWeeklySessions = getTeamWeeklySessions(players, "Red");
	const yellowTeamWeeklySessions = getTeamWeeklySessions(players, "Yellow");

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
						<p>{players && blueTeamCount} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && blueTeamWeeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && blueTeamWeeklySessions} sessions</p>
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
						<p>{players && redTeamCount} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && redTeamWeeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && redTeamWeeklySessions} sessions</p>
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
						<p>{players && yellowTeamCount} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && yellowTeamWeeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && yellowTeamWeeklySessions} sessions</p>
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
