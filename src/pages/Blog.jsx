import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import backendURL from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import useBlogContext from "../hooks/useBlogContext";
// Components
import CreateBlogForm from "../components/CreateBlogForm";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditBlogForm from "../components/EditBlogPost";

const Blog = () => {
	const { blogs, dispatch } = useBlogContext();
	const [editingBlog, setEditingBlog] = useState(null);
	const [expandedBlogId, setExpandedBlogId] = useState(null);
	const { user } = useAuthContext();

	// GET request
	useEffect(() => {
		const fetchBlogs = async () => {
			const res = await fetch(`${backendURL}/api/blogs`);
			const json = await res.json();

			if (res.ok) {
				// Reverse the blogs before dispatching the action
				const reversedBlogs = json.reverse();
				dispatch({ type: "SET_BLOGS", payload: reversedBlogs });

				// Expand the first blog
				if (json.length > 0) {
					setExpandedBlogId(json[json.length - 1]._id);
				}
			}
		};

		fetchBlogs();
	}, []);

	// DELETE request
	const handleDelete = async (id) => {
		const res = await fetch(`${backendURL}/api/blogs/${id}`, {
			method: "DELETE",
		});
		const json = await res.json();

		if (res.ok) {
			dispatch({ type: "DELETE_BLOG", payload: id });
		}
	};

	// EDIT a post
	const handleEdit = (id) => {
		const blogToEdit = blogs.find((blog) => blog._id === id);
		setEditingBlog(blogToEdit);
	};

	const addBlog = (newBlog) => {
		dispatch({ type: "ADD_BLOG", payload: newBlog });
	};

	return (
		<main>
			<h2>Blog</h2>
			{user.isAdmin && <CreateBlogForm addBlog={addBlog} />}

			{blogs &&
				blogs
					.slice()
					.reverse()
					.map((blog) => (
						<div key={blog._id} className="blogCard">
							<div
								className="flex flex--spaceBetween flex--center flex--wrap"
								id={blog._id}
								onClick={() => setExpandedBlogId(blog._id)}>
								<h2 className="blogTitle">{blog.title}</h2>
								{user.isAdmin && (
									<div className="flex">
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleEdit(blog._id);
											}}>
											Edit
										</button>
										<button
											className="btnDelete"
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(blog._id);
											}}>
											Delete
										</button>
									</div>
								)}
							</div>

							{expandedBlogId === blog._id && (
								<>
									<ReactMarkdown className={"blogBody"}>
										{blog.body}
									</ReactMarkdown>

									{blog.videoLink && (
										<h4 className="margin--top">Game replay</h4>
									)}
									{blog.videoLink && <YoutubeEmbed embedId={blog.videoLink} />}
								</>
							)}
						</div>
					))}
		</main>
	);
};

export default Blog;
