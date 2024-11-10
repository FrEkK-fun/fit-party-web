export function getTeamPlayerCount(players, teamName) {
	return players.filter((player) => player.team.teamName === teamName).length;
}

export function getTeamWeeklyXp(players, teamName) {
	return players
		.filter((player) => player.team.teamName === teamName)
		.reduce((acc, player) => acc + player.weekly.xp, 0);
}

export function getTeamWeeklySessions(players, teamName) {
	return players
		.filter((player) => player.team.teamName === teamName)
		.reduce(
			(acc, player) =>
				acc + player.sessions.filter((session) => !session.isSynced).length,
			0
		);
}
