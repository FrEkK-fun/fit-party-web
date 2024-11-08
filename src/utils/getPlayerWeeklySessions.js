import getWeekNumber from "./getWeekNumber";

export function playerWeeklySessions(player) {
	const sessionsThisWeek = [];
	player.sessions.forEach((session) => {
		const sessionWeek = getWeekNumber(session.timestamp);
		const currentWeek = getWeekNumber(new Date());
		if (sessionWeek === currentWeek) {
			sessionsThisWeek.push(session);
		}
	});

	return sessionsThisWeek;
}

export function playerSessionsPerDay(player) {
	const sessionsThisWeek = playerWeeklySessions(player);
	const sessionsPerDay = [];
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	days.forEach((day) => {
		const sessions = sessionsThisWeek.filter((session) => {
			const sessionDay = new Date(session.timestamp).toLocaleString("en-US", {
				weekday: "long",
			});
			return sessionDay === day;
		});
		sessionsPerDay.push(sessions);
	});

	return sessionsPerDay;
}
