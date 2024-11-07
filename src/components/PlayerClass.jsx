import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-43505c22f8/icons";

import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import getPlayerClassIcon from "../utils/getPlayerClassIcon";
import backendURL from "../config";

export default function PlayerClass() {
	const { player, dispatch } = usePlayerContext();
	const { user } = useAuthContext();

	const [isEditing, setIsEditing] = useState(false);
	const [selectedClass, setSelectedClass] = useState(player.properties.class);

	const userHasAuthorization = user.players.includes(player._id);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleClassChange = async (e) => {
		const newClass = e.target.value;
		setSelectedClass(newClass);

		const response = await fetch(
			`${backendURL}/api/players/${player._id}/class`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ classStr: newClass }),
			}
		);

		if (response.ok) {
			const updatedPlayer = await response.json();
			dispatch({ type: "UPDATE_PLAYER", payload: updatedPlayer });
			setIsEditing(false);
		}
	};

	let content;

	if (!userHasAuthorization) {
		content = (
			<p>
				{getPlayerClassIcon(player.properties.class)} Class:{" "}
				{player.properties.class}
			</p>
		);
	}

	if (userHasAuthorization) {
		if (isEditing) {
			content = (
				<div className="flex flex--center">
					<select value={selectedClass} onChange={handleClassChange}>
						<option value="Fighter">Fighter</option>
						<option value="Defender">Defender</option>
						<option value="Explorer">Explorer</option>
					</select>
				</div>
			);
		} else {
			content = (
				<div>
					<p>
						{getPlayerClassIcon(selectedClass)} Class: {selectedClass}{" "}
						<FontAwesomeIcon
							icon={byPrefixAndName.fas["pen-to-square"]}
							className="class-icon class-change"
							onClick={handleEditClick}
						/>
					</p>
				</div>
			);
		}
	}

	return content;
}
