import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-43505c22f8/icons';
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
	const [teamStats, setTeamStats] = useState({
		blue: { count: 0, weeklyXp: 0, weeklySessions: 0 },
		red: { count: 0, weeklyXp: 0, weeklySessions: 0 },
		yellow: { count: 0, weeklyXp: 0, weeklySessions: 0 },
	});

	useEffect(() => {
		const fetchPlayers = async () => {
			const res = await fetch(`${backendURL}/api/players`);
			const json = await res.json();

			if (res.ok) {
				setPlayers(json);
				setTeamStats({
					blue: {
						count: getTeamPlayerCount(json, "Blue"),
						weeklyXp: getTeamWeeklyXp(json, "Blue"),
						weeklySessions: getTeamWeeklySessions(json, "Blue"),
					},
					red: {
						count: getTeamPlayerCount(json, "Red"),
						weeklyXp: getTeamWeeklyXp(json, "Red"),
						weeklySessions: getTeamWeeklySessions(json, "Red"),
					},
					yellow: {
						count: getTeamPlayerCount(json, "Yellow"),
						weeklyXp: getTeamWeeklyXp(json, "Yellow"),
						weeklySessions: getTeamWeeklySessions(json, "Yellow"),
					},
				});
			}
		};

		fetchPlayers();
	}, []);

	return (
		<main>
			<div className="teamWrapper">
				<h2>
					<span>
						<FontAwesomeIcon className="team-color-blue" icon={byPrefixAndName.fas['flag']} />
					</span>
					Blue team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>{players && teamStats.blue.count} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.blue.weeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.blue.weeklySessions} sessions</p>
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
						<FontAwesomeIcon className="team-color-red" icon={byPrefixAndName.fas['flag']} />
					</span>
					Red team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>{players && teamStats.red.count} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.red.weeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.red.weeklySessions} sessions</p>
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
						<FontAwesomeIcon className="team-color-yellow" icon={byPrefixAndName.fas['flag']} />
					</span>
					Yellow team
				</h2>
				<div className="teamStats">
					<div className="flex flex-column">
						<p>{players && teamStats.yellow.count} players</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.yellow.weeklyXp} xp</p>
						<p>//</p>
					</div>
					<div className="flex flex-column">
						<p>{players && teamStats.yellow.weeklySessions} sessions</p>
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
