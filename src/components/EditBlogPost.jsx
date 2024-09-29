import backendURL from "../config";
import { useState, useEffect } from "react";
import useBlogContext from "../hooks/useBlogContext";

const EditBlogForm = ({ blog, onEdit }) => {
	const { blogs, dispatch } = useBlogContext();
	const [title, setTitle] = useState(blog.title);
	const [body, setBody] = useState(blog.body);
	const [videoLink, setVideoLink] = useState(blog.videoLink);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const updatedBlog = {
			title: title,
			body: body,
			videoLink: videoLink,
		};

		const res = await fetch(`${backendURL}/api/blogs/${blog._id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedBlog),
		});
		const json = await res.json();

		if (!res.ok) {
			setError(json.error);
		}

		if (res.ok) {
			setSuccess("Post updated successfully!");
			onEdit(json);
			dispatch({ type: "UPDATE_BLOG", payload: json });
			setError(null);
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
			<h3>Edit post</h3>
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
			<button type="submit">Update</button>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</form>
	);
};

export default EditBlogForm;
