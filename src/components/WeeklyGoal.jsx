import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleExclamation,
	faCircleCheck,
	faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";

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
			`${process.env.REACT_APP_DEV_BACKEND_URL}/api/players/${player._id}/goal`,
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
			`${process.env.REACT_APP_DEV_BACKEND_URL}/api/players/${player._id}/goal`,
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

	if (userHasAuthorization) {
		return currentGoal ? (
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
		) : (
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
	} else {
		if (!currentGoal) {
			return (
				<p>
					<span>
						<FontAwesomeIcon
							className="goalNotSet"
							icon={faCircleExclamation}
						/>
					</span>{" "}
					No goal set for this week.
				</p>
			);
		} else if (currentGoal && !goalDone) {
			return (
				<p>
					<span>
						<FontAwesomeIcon className="goalSet" icon={faPersonRunning} />
					</span>{" "}
					{currentGoal}
				</p>
			);
		} else if (goalDone) {
			return (
				<p>
					<span>
						<FontAwesomeIcon className="goalDone" icon={faCircleCheck} />
					</span>{" "}
					{currentGoal} <span className="italic">(Completed!)</span>
				</p>
			);
		}
	}
};

export default WeeklyGoal;
