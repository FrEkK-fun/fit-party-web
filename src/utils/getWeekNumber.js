// Date FNS
import { getWeek, startOfWeek } from "date-fns";

import parseTimestamp from "./parseTimestamp";

// Resolve week numbers
export default function getWeekNumber(timestamp) {
	const date = parseTimestamp(timestamp);
	const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
	return getWeek(startOfWeekDate);
}
