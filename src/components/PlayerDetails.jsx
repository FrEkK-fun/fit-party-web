import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import SessionForm from "./SessionForm";
import WeeklyGoal from "./WeeklyGoal";
import backendURL from "../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-43505c22f8/icons";

// Moment
import moment from "moment";

// Date FNS
import { formatDistanceToNow, format, getWeek, startOfWeek } from "date-fns";

const PlayerDetails = ({ player }) => {
	const { dispatch } = usePlayerContext();
	const { user } = useAuthContext();

	const userHasAuthorization = user.players.includes(player._id);

	const handleClick = async (sessionId) => {
		if (!user) {
			return;
		}
		const res = await fetch(
			`${backendURL}/api/sessions/players/` +
				player._id +
				"/sessions/" +
				sessionId,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const json = await res.json();

		if (res.ok) {
			dispatch({ type: "DELETE_SESSION", payload: json });
		}
	};

	// Function to select the appropriate icon based on the player's class
	const getPlayerClassIcon = (playerClass) => {
		switch (playerClass) {
			case "Fighter":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["hand-fist"]}
						className="class-icon"
					/>
				);
			case "Defender":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["shield"]}
						className="class-icon"
					/>
				);
			case "Explorer":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["binoculars"]}
						className="class-icon"
					/>
				);
			default:
				return null; // Return null or a default icon if class doesn't match
		}
	};

	// Function to select the appropriate icon based on the player's team
	const getPlayerTeamIcon = (teamName) => {
		switch (teamName) {
			case "Blue":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["flag"]}
						className="team-color-blue"
					/>
				);
			case "Red":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["flag"]}
						className="team-color-red"
					/>
				);
			case "Yellow":
				return (
					<FontAwesomeIcon
						icon={byPrefixAndName.fas["flag"]}
						className="team-color-yellow"
					/>
				);
			default:
				return null; // Return null or a default icon if team doesn't match
		}
	};

	// Format timestamps
	function parseTimestamp(timestamp) {
		if (Date.parse(timestamp)) {
			return new Date(timestamp);
		} else {
			// Parse the timestamp with the format "DD.MM.YYYY HH.mm.ss"
			return moment(timestamp, "DD.MM.YYYY HH.mm.ss").toDate();
		}
	}

	// Resolve week numbers
	function getWeekNumber(timestamp) {
		const date = parseTimestamp(timestamp);
		const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
		return getWeek(startOfWeekDate);
	}

	return (
		<div className="players-details">
			<h3 className="margin--bottom">
				{player.name}{" "}
				<span className="spanData">
					{player.properties.xp} xp / level {player.properties.level}
				</span>
			</h3>
			<p>
				{getPlayerTeamIcon(player.team.teamName)} Current Team:{" "}
				{player.team.teamName}{" "}
				<span className="spanData">
					{player.team.isTeamLeader ? "(TEAM LEADER)" : ""}
				</span>
			</p>
			<p>
				{getPlayerClassIcon(player.properties.class)} Class:{" "}
				{player.properties.class}
			</p>
			<ul className="userPropertiesList">
				<li>
					<p>
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["sword"]}
							className="class-icon"
						/>{" "}
						Attack strength: {player.properties.attack}
					</p>
				</li>
				<li>
					<p>
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["shield"]}
							className="class-icon"
						/>{" "}
						Defense strength: {player.properties.defence}
					</p>
				</li>
			</ul>

			<h4>Weekly goal</h4>
			<WeeklyGoal player={player} />

			<div className="sessionCardsContainer">
				<h4>Sessions</h4>
				<p>{player.sessions.length} sessions total</p>
				<div className="border margin--bottom">
					{userHasAuthorization && <SessionForm />}
				</div>
				{/* Resolve week numbers */}
				{Object.entries(
					player.sessions.reduce((groups, session) => {
						const week = getWeekNumber(session.timestamp);
						if (!groups[week]) {
							groups[week] = [];
						}
						groups[week].push(session);
						return groups;
					}, {})
				)
					.reverse()
					// Group by week
					.map(([week, sessions]) => (
						<div className="sessionWeekCard" key={week}>
							<h4>Week {week}</h4>
							<p>{sessions.length} sessions total</p>
							{sessions
								.slice()
								.reverse()
								// Render session
								.map((session) => (
									<div className="sessions-details" key={session._id}>
										<p>
											{session.intensity === "Hard" ? (
												<FontAwesomeIcon
													icon={byPrefixAndName.fad["dial-max"]}
													size="lg"
													className="accent"
												/>
											) : session.intensity === "Medium" ? (
												<FontAwesomeIcon
													icon={byPrefixAndName.far["dial-med"]}
													size="lg"
													className="accent"
												/>
											) : (
												<FontAwesomeIcon
													icon={byPrefixAndName.fal["dial-min"]}
													size="lg"
													className="accent"
												/>
											)}{" "}
											<strong>{session.intensity}</strong> intensity{" "}
											<strong>{session.title}</strong>
										</p>
										<p className="italic">
											{formatDistanceToNow(parseTimestamp(session.timestamp), {
												addSuffix: true,
											})}{" "}
											({format(parseTimestamp(session.timestamp), "EEEE")})
										</p>
										{userHasAuthorization && (
											<span onClick={() => handleClick(session._id)}>
												<FontAwesomeIcon
													icon={byPrefixAndName.far["trash-can"]}
													size="lg"
													fixedWidth
												/>
											</span>
										)}
									</div>
								))}
						</div>
					))}
			</div>
		</div>
	);
};

export default PlayerDetails;
