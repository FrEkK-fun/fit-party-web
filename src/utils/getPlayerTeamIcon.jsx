import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-43505c22f8/icons";

// Function to select the appropriate icon based on the player's team
export default function getPlayerTeamIcon(teamName) {
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
			return null; // Return null if team doesn't match
	}
}
