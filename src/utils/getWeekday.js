// Resolve today's weekday
export default function getWeekday(timestamp) {
	const date = parseTimestamp(timestamp);
	return format(date, "EEEE").toLocaleLowerCase();
}
