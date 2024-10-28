import moment from "moment";

// Format timestamps
export default function parseTimestamp(timestamp) {
	if (Date.parse(timestamp)) {
		return new Date(timestamp);
	} else {
		// Parse the timestamp with the format "DD.MM.YYYY HH.mm.ss"
		return moment(timestamp, "DD.MM.YYYY HH.mm.ss").toDate();
	}
}
