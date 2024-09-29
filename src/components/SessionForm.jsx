import { useState, useEffect } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import backendURL from "../config";

const SessionForm = () => {
	const { dispatch } = usePlayerContext();
	const { user } = useAuthContext();

	const [intensity, setIntensity] = useState(null);
	const [title, setTitle] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	// State for the selected day of the week
	const [selectedDay, setSelectedDay] = useState(getCurrentDay());

	// Get the current day (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
	function getCurrentDay() {
		const currentDate = new Date();
		let currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
		if (currentDay === 0) {
			currentDay = 6; // Convert Sunday to 6
		} else {
			currentDay -= 1; // Shift other days back by one
		}
		return currentDay;
	}

	// Generate an array of days of the week starting from the current day
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setError("You must be logged in to add a session");
			return;
		}

		if (!intensity) {
			setError("You must set an intensity level");
			return;
		}

		// Get the selected day based on the index
		const selectedDate = new Date();
		selectedDate.setDate(
			selectedDate.getDate() - (getCurrentDay() - selectedDay)
		);

		const session = {
			intensity,
			title,
			timestamp: selectedDate,
			syncTimestamp: null,
		};

		const res = await fetch(
			`${backendURL}/api/sessions/players/${user.players[0]}/sessions`,
			{
				method: "POST",
				body: JSON.stringify(session),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const json = await res.json();

		if (!res.ok) {
			setError(json.error);
		}
		if (res.ok) {
			setSuccess("Session added successfully!");
			dispatch({ type: "ADD_SESSION", payload: json });
			setError(null);
			setIntensity(null);
			setTitle("");
		}
	};

	useEffect(() => {
		if (success) {
			const timeoutId = setTimeout(() => {
				setSuccess(null);
			}, 5000);

			return () => clearTimeout(timeoutId);
		}
	}, [success]);

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add a new session</h3>

			<div className="flex flex--spaceBetween margin--top">
				<label className="hidden">Intensity:</label>

				<div className="radioButton">
					<input
						type="radio"
						id="Easy"
						value="Easy"
						checked={intensity === "Easy"}
						onChange={() => setIntensity("Easy")}
					/>
					<label htmlFor="Easy">Easy</label>
				</div>
				<div className="radioButton">
					<input
						type="radio"
						id="Medium"
						value="Medium"
						checked={intensity === "Medium"}
						onChange={() => setIntensity("Medium")}
					/>
					<label htmlFor="Medium">Medium</label>
				</div>
				<div className="radioButton ">
					<input
						type="radio"
						id="Hard"
						value="Hard"
						checked={intensity === "Hard"}
						onChange={() => setIntensity("Hard")}
					/>
					<label htmlFor="Hard">Hard</label>
				</div>
			</div>
			<label className="hidden">Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				placeholder="Title"
			/>
			{/* Day selection checkboxes */}
			<div className="flex flex--wrap flex--spaceAround flex--1 margin--top">
				{daysOfWeek.map((day, index) => (
					<div key={index} className="radioButton">
						<input
							type="radio"
							id={day}
							value={day}
							checked={selectedDay === index}
							onChange={() => setSelectedDay(index)}
							disabled={index > getCurrentDay()}
						/>
						<label
							htmlFor={day}
							className={index > getCurrentDay() ? "disabled" : ""}>
							{day}
						</label>
					</div>
				))}
			</div>

			<button>Add Session</button>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</form>
	);
};

export default SessionForm;
