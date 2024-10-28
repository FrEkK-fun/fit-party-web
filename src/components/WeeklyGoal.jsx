import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleExclamation,
	faCircleCheck,
	faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import backendURL from "../config";
import getWeekday from "../utils/getWeekday";

const WeeklyGoal = ({ player }) => {
	const { user } = useAuthContext();
	const userHasAuthorization = user.players.includes(player._id);
	const [goal, setGoal] = useState("");
	const [currentGoal, setCurrentGoal] = useState(
		player.weekly.goal.description
	);
	const [goalDone, setGoalDone] = useState(player.weekly.goal.done);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(
			`${backendURL}/api/players/${player._id}/goal`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ goalObj: { description: goal, done: false } }),
			}
		);

		if (response.ok) {
			const updatedPlayer = await response.json();
			setGoal("");
			setCurrentGoal(updatedPlayer.weekly.goal.description);
			setGoalDone(updatedPlayer.weekly.goal.done);
		} else {
			const errorData = await response.json();
			console.error("Failed to save goal:", errorData.error);
		}
	};

	const handleGoalCompletion = async () => {
		const response = await fetch(
			`${backendURL}/api/players/${player._id}/goal`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					goalObj: { description: currentGoal, done: !goalDone },
				}),
			}
		);

		if (response.ok) {
			const updatedPlayer = await response.json();
			setGoalDone(updatedPlayer.weekly.goal.done);
		} else {
			const errorData = await response.json();
			console.error("Failed to update goal completion:", errorData.error);
		}
	};

	const today = getWeekday(Date.now());

	if (userHasAuthorization && currentGoal) {
		return (
			<div className="goalWrapper">
				<p>
					Your goal has been set - it cannot be changed.{" "}
					<span>Mark goal as done once completed.</span>
				</p>
				<input
					type="checkbox"
					id="goalDone"
					name="goalDone"
					checked={goalDone}
					onChange={handleGoalCompletion}
					className="goalCheckbox"
				/>
				<label htmlFor="goalDone">{currentGoal}</label>
			</div>
		);
	}

	if (
		userHasAuthorization &&
		!currentGoal &&
		(today === "monday" || today === "tuesday")
	) {
		return (
			<form className="goalInputForm" onSubmit={handleSubmit}>
				<label>
					<input
						type="text"
						value={goal}
						placeholder="Enter your weekly goal"
						onChange={(e) => setGoal(e.target.value)}
					/>
				</label>
				<button type="submit">Submit Goal</button>
			</form>
		);
	}

	if (
		userHasAuthorization &&
		!currentGoal &&
		(today !== "monday" || today !== "tuesday")
	) {
		return (
			<p>
				<span>
					<FontAwesomeIcon className="goalNotSet" icon={faCircleExclamation} />
				</span>{" "}
				No goal set for this week.
			</p>
		);
	}

	if (!userHasAuthorization && !currentGoal) {
		return (
			<p>
				<span>
					<FontAwesomeIcon className="goalNotSet" icon={faCircleExclamation} />
				</span>{" "}
				No goal set for this week.
			</p>
		);
	}

	if (!userHasAuthorization && currentGoal && !goalDone) {
		return (
			<p>
				<span>
					<FontAwesomeIcon className="goalSet" icon={faPersonRunning} />
				</span>{" "}
				{currentGoal}
			</p>
		);
	}

	if (!userHasAuthorization && currentGoal && goalDone) {
		return (
			<p>
				<span>
					<FontAwesomeIcon className="goalDone" icon={faCircleCheck} />
				</span>{" "}
				{currentGoal} <span className="italic">(Completed!)</span>
			</p>
		);
	}
};

export default WeeklyGoal;
