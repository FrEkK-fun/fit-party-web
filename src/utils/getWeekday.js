// Date FNS
import { format } from "date-fns";

// Resolve today's weekday
export default function getWeekday(timestamp) {
	const date = timestamp;
	return format(date, "EEEE").toLocaleLowerCase();
}
