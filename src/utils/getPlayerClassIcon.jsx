import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-43505c22f8/icons";

// Function to select the appropriate icon based on the player's class
export default function getPlayerClassIcon(playerClass) {
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
			return null; // Return null if class doesn't match
	}
}
