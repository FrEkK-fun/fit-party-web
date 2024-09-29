import { useState, useEffect } from "react";
import useBlogContext from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
3;
import backendURL from "../config";

const CreateBlogForm = () => {
	const { blogs, dispatch } = useBlogContext();
	const { user } = useAuthContext();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const author = user.userId;

		const newBlog = {
			title: title,
			body: body,
			videoLink: videoLink,
			author: author,
		};

		const res = await fetch(`${backendURL}/api/blogs`, {
			method: "POST",
			body: JSON.stringify(newBlog),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await res.json();

		if (!res.ok) {
			setError(json.error);
		}
		if (res.ok) {
			setSuccess("Blog post added successfully!");
			dispatch({ type: "ADD_BLOG", payload: json });
			setError(null);

			// Clear the form
			setTitle("");
			setBody("");
			setVideoLink("");
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
		<form onSubmit={handleSubmit} className="blogFormWrapper">
			<h3>Add a blog post</h3>
			<div className="blogInputs">
				<label>
					<input
						type="text"
						value={title}
						placeholder="Blog title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label>
					<input
						type="string"
						value={videoLink}
						placeholder="Video link id (youtube.com/watch?v=)"
						onChange={(e) => setVideoLink(e.target.value)}
					/>
				</label>
			</div>
			<p className="margin--top italic">
				!! The blog body supports markdown formatting.
			</p>
			<label>
				<textarea
					className="blogFormTextarea"
					value={body}
					placeholder="Blog body"
					onChange={(e) => setBody(e.target.value)}
					required
				/>
			</label>
			<button type="submit">Create Blog Post</button>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</form>
	);
};

export default CreateBlogForm;
