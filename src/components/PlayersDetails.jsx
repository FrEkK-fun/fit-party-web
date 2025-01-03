import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-43505c22f8/icons";

import getPlayerClassIcon from "../utils/getPlayerClassIcon";
import getPlayerTeamIcon from "../utils/getPlayerTeamIcon";
import { playerWeeklySessions } from "../utils/getPlayerWeeklySessions";

const PlayersDetails = ({ player }) => {
	// Render player's weekly goal
	function renderPlayerGoal(player) {
		const currentGoal = player.weekly.goal.description;
		const goalDone = player.weekly.goal.done;
		if (!currentGoal) {
			return (
				<p>
					<span>
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["circle-exclamation"]}
							className="goalNotSet"
						/>
					</span>{" "}
					No goal set for this week.
				</p>
			);
		} else if (currentGoal && !goalDone) {
			return (
				<p>
					<span>
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["person-running"]}
							className="goalSet"
						/>
					</span>{" "}
					{currentGoal}
				</p>
			);
		} else if (goalDone) {
			return (
				<p>
					<span>
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["circle-check"]}
							className="goalDone"
						/>
					</span>{" "}
					{currentGoal} <span className="italic">(Completed!)</span>
				</p>
			);
		}
	}

	// Find sessions for the current week
	const sessionsThisWeek = playerWeeklySessions(player);

	return (
		<div className="players-details">
			<Link to={`/players/${player._id}`}>
				<h3 className="margin--bottom">
					{player.name}{" "}
					<span className="span-players-info">
						{player.weekly.xp} XP / level {player.weekly.level}
					</span>
				</h3>
				<p className="flex">
					{getPlayerTeamIcon(player.team.teamName)}
					Team: {player.team.teamName}{" "}
					{player.team.isTeamLeader && "(Team Leader)"}
				</p>
				<p className="flex">
					{getPlayerClassIcon(player.properties.class)} Class:{" "}
					{player.properties.class}
				</p>
				<p className="flex">
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["weight-hanging"]}
						className="class-icon"
					/>{" "}
					{sessionsThisWeek.length}{" "}
					{sessionsThisWeek.length > 1 ? "sessions" : "session"} this week
				</p>
				<div className="margin--top">{renderPlayerGoal(player)}</div>
			</Link>
		</div>
	);
};

export default PlayersDetails;
