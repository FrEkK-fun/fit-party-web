export function xpPerDay(sessionsArr) {
	const xpPerDay = [];
	sessionsArr.forEach((day) => {
		let xp = 0;
		day.forEach((session) => {
			let sessionXp = 0;
			if (session.intensity === "Easy") {
				sessionXp = 1;
			}
			if (session.intensity === "Medium") {
				sessionXp = 2;
			}
			if (session.intensity === "Hard") {
				sessionXp = 3;
			}

			xp += sessionXp;
		});
		xp > 3 ? (xp = 3) : xp;
		xpPerDay.push(xp);
	});

	return xpPerDay;
}

export function xpThisWeek(xpPerDay) {
	return xpPerDay.reduce((acc, xp) => acc + xp, 0);
}
